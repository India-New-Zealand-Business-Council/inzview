---
target: INZBC homepage screenshot and live URL
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-13T05-37-23Z
slug: src-components-pages-homepage-tsx
---
# Homepage visual critique and correction record

## Design specificity

The NZ–India corridor, FTA status, diplomatic imagery, editorial serif, lime/plum palette,
and route language are strongly authored for INZBC. The biggest defects were execution,
not identity: kinetic words visually touched, the portal became an empty oversized stage,
and the globe repeated across reading sections until it competed with content.

The deterministic scan returned zero findings for `src/components/pages/HomePage.tsx`.

## Heuristic scores

| Heuristic | Score |
|---|---:|
| Visibility of system status | 3 |
| Match with the real world | 3 |
| User control and freedom | 3 |
| Consistency and standards | 3 |
| Error prevention | 2 |
| Recognition rather than recall | 3 |
| Flexibility and efficiency | n/a |
| Aesthetic and minimalist design | 2 |
| Error recovery | 2 |
| Help and documentation | n/a |
| **Total** | **21/32** |

## Priority findings

1. **P1 — kinetic heading spacing:** every major title lost visible spaces between animated
   words. Corrected by rendering real whitespace outside the inline-block animation wrapper.
2. **P1 — corridor portal composition:** the Sky Tower circle occupied a small part of an
   oversized purple panel and created a large visual pause. Corrected with a shorter, wide
   Otago Harbour-to-Ladakh split portal and a route crossing the two authentic locations.
3. **P2 — repeated 3D motif:** the central globe became wallpaper and intruded into multiple
   text zones. Corrected with chapter-aware visibility and off-centre partner/conversion poses.
4. **P2 — partner proof inconsistency:** polished marks and text substitutes still share the
   same grid. Normalize or source the remaining marks in a later content pass.
5. **P2 — competing conversions:** membership, FTA exploration, subscription and contact
   remain similarly weighted. A later strategy pass should choose the homepage's primary
   success event before changing factual copy or information architecture.

## Cognitive load and emotional journey

The hero and FTA evidence create a strong authority peak. The long publication/partner run
still creates an emotional valley before the final conversion. The repaired portal removes
the most visible pacing break, but the page would benefit from a later conversion strategy
and a smaller, uniform partner proof set.

## Persona red flags

- First-time visitors still meet unexplained acronyms such as FTA, MFAT and NZTE.
- The email-draft handoff depends on a configured local mail client and has limited recovery.
- Mobile visitors still traverse a long content sequence before the final conversion.

## Minor observations

- The Wix preview badge is a platform preview artifact, not part of the authored homepage.
- Metadata and source text remain small in several sections.
- The new imagery is localized, optimized and documented under the Pixabay Content License.

## Questions for a later strategy pass

- Is membership or FTA exploration the single primary homepage outcome?
- Which six partner marks most influence a prospect's decision?
- Can publication and partner inventories be summarized earlier and delegated to destination pages?
