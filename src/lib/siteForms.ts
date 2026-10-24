/**
 * Shared submit helper for the site's two contact forms (Connect's `ContactForm`, Home's
 * quick-contact form) — posts to `/api/site-forms` (src/pages/api/site-forms.ts), which signs
 * and forwards to the platform's webhook receiver. Falls back to `onFallback` (each caller's
 * existing mailto draft) on a `not_configured` response or any network failure, rather than
 * showing a dead end — see api/site-forms.ts's own comment for why `not_configured` is the
 * current, expected state (#99, platform hosting not yet decided).
 */
export type SiteFormStatus = 'idle' | 'submitting' | 'sent' | 'fallback';

export interface SiteFormFields {
  form_type: 'general_enquiry';
  page_slug: string;
  contact_name: string;
  contact_email: string;
  organisation?: string;
  subject?: string;
  message?: string;
}

export async function submitSiteForm(fields: SiteFormFields, onFallback: () => void): Promise<SiteFormStatus> {
  try {
    const response = await fetch('/api/site-forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    if (response.ok) return 'sent';
    onFallback();
    return 'fallback';
  } catch {
    onFallback();
    return 'fallback';
  }
}
