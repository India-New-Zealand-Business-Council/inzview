import type { APIRoute } from 'astro';
import { createHmac, randomUUID } from 'node:crypto';

/*
 * Forwards a site contact-form submission to the platform's signed webhook receiver
 * (`POST /api/webhooks/wix/site-forms`, schemas/webhooks.md's contract, #45). Ownership split
 * per ADR-0007 and that contract doc: Paras (this file, the form UI and confirmation messaging)
 * / Bhanu (the receiver, the delivery secret's other half). The receiver requires an HMAC-SHA256
 * signature over `<timestamp>.<raw body>` using a secret shared between both sides
 * (`WIX_WEBHOOK_SECRET`) — that signing has to happen server-side, never in the browser, which is
 * the entire reason this route exists rather than the form fetching the receiver directly.
 *
 * **Not wired to a live receiver yet.** The platform API has no public host (#99, "Platform
 * hosting" is still an open decision in docs/decisions-needed.md) — `INZBC_API_BASE_URL` and
 * `WIX_WEBHOOK_SECRET` are unset until that lands and INZBC/the tech lead provision the shared
 * secret. Unset either one and this returns `{ ok: false, reason: 'not_configured' }` with 503,
 * which the form components use to fall back to the existing mailto flow rather than show a
 * broken "something went wrong."
 */

const FORM_TYPES = [
  'general_enquiry',
  'membership_enquiry',
  'event_registration',
  'trade_enquiry',
  'partnership_enquiry',
] as const;
type FormType = (typeof FORM_TYPES)[number];

interface SiteFormRequest {
  form_type: FormType;
  page_slug: string;
  contact_name: string;
  contact_email: string;
  organisation?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function isValidRequest(body: unknown): body is SiteFormRequest {
  if (typeof body !== 'object' || body === null) return false;
  const b = body as Record<string, unknown>;
  if (!FORM_TYPES.includes(b.form_type as FormType)) return false;
  if (typeof b.page_slug !== 'string' || !b.page_slug.startsWith('/') || b.page_slug.length > 120) return false;
  if (typeof b.contact_name !== 'string' || b.contact_name.trim().length === 0 || b.contact_name.length > 200) {
    return false;
  }
  // Same shape the receiver itself validates to (local@domain.tld, no whitespace) — not a full
  // RFC 5322 parse, just enough to reject obvious junk before it's signed and sent.
  if (typeof b.contact_email !== 'string' || !/^\S+@\S+\.\S+$/.test(b.contact_email) || b.contact_email.length > 320) {
    return false;
  }
  if (b.organisation !== undefined && (typeof b.organisation !== 'string' || b.organisation.length > 200)) return false;
  if (b.phone !== undefined && (typeof b.phone !== 'string' || b.phone.length > 60)) return false;
  if (b.subject !== undefined && (typeof b.subject !== 'string' || b.subject.length > 300)) return false;
  if (b.message !== undefined && (typeof b.message !== 'string' || b.message.length > 5000)) return false;
  return true;
}

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.WIX_WEBHOOK_SECRET as string | undefined;
  const receiverBaseUrl = import.meta.env.INZBC_API_BASE_URL as string | undefined;
  if (!secret || !receiverBaseUrl) {
    return Response.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, reason: 'invalid_request' }, { status: 400 });
  }
  if (!isValidRequest(body)) {
    return Response.json({ ok: false, reason: 'invalid_request' }, { status: 400 });
  }

  const payload = {
    event_id: randomUUID(),
    form_type: body.form_type,
    submitted_at: new Date().toISOString(),
    page_slug: body.page_slug,
    contact_name: body.contact_name.trim(),
    contact_email: body.contact_email.trim(),
    organisation: body.organisation?.trim() || null,
    phone: body.phone?.trim() || null,
    subject: body.subject?.trim() || null,
    message: body.message?.trim() || null,
  };
  const rawBody = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = `sha256=${createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex')}`;

  let receiverResponse: Response;
  try {
    receiverResponse = await fetch(`${receiverBaseUrl}/api/webhooks/wix/site-forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Wix-Webhook-Timestamp': timestamp,
        'X-Wix-Webhook-Signature': signature,
      },
      body: rawBody,
    });
  } catch {
    return Response.json({ ok: false, reason: 'receiver_unreachable' }, { status: 502 });
  }

  if (!receiverResponse.ok) {
    return Response.json({ ok: false, reason: 'receiver_refused' }, { status: 502 });
  }
  return Response.json({ ok: true }, { status: 200 });
};
