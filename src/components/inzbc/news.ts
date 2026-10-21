/**
 * The 12 most recent posts from inzbc.org/news (newest first), copied verbatim from each
 * post's own page on 12 October 2026, plus any media release Sunil supplies directly (each
 * noted on its own entry). This is the one file to edit when Sunil wants an
 * article's wording changed - NewsBody (bodies.tsx) and the Home "Latest news" section both
 * render from this data and never need to change for a text edit.
 *
 * Body text uses a tiny inline link syntax, [label](https://example.com), parsed by
 * renderInline() in bodies.tsx - this keeps real hyperlinks (opened in a new tab, since
 * every one of them points off-site) without resorting to dangerouslySetInnerHTML.
 *
 * Two typo fixes made against the live copy, both listed here rather than silently applied:
 * - Post 6 (NZ Parliament Passes India FTA): "High Commission of India" -> "High Commissioner
 *   of India" (the sentence is introducing a person by title, Muanpuii Saiawi, not the
 *   institution).
 * Everything else, including any date or status wording, is reproduced exactly as published -
 * even where a quoted speaker's grammar is imperfect (post 5's "the FTA give us the tools"),
 * since that's a direct quote, not copy to correct.
 *
 * Dates: each sortKey is the post's own publish date (not necessarily the date of the event
 * it describes - see bodies.tsx's INZBC_EVENTS for event dates). Post 1's exact publish date
 * isn't stated anywhere on inzbc.org as a calendar date - the news listing said "2 days ago"
 * and the post page itself said "7 hours ago" at the moment this was pulled (12 Oct 2026,
 * loading live view-counts rather than a fixed date) - so 2026-10-10 here is computed from
 * "2 days ago" relative to 12 Oct 2026, not a date the source stated directly. Flagged for
 * Sunil rather than guessed past that.
 */
export type NewsBlock = { type: 'p'; text: string } | { type: 'h'; text: string } | { type: 'ul'; items: string[] };

export type NewsPost = {
  slug: string;
  title: string;
  /** Display date, as given on the source (day month year). */
  date: string;
  /** YYYY-MM-DD, for sorting. */
  sortKey: string;
  /** Filename in public/blog/, or undefined where inzbc.org has no real cover for this post. */
  cover?: string;
  alt: string;
  excerpt: string;
  body: NewsBlock[];
  /** The post's page on inzbc.org. Unset for posts that were never published there. */
  sourceUrl?: string;
};

export const NEWS_POSTS: readonly NewsPost[] = [
  {
    // Sunil's op-ed in Newsroom (20 Oct 2026), added 21 Oct 2026. The article is paywalled, so
    // only the headline, standfirst and opening lines Sunil supplied are reproduced here, with
    // a link out to the full piece. Headline, standfirst, byline and date checked against the
    // Newsroom page itself. Cover is INZBC's own Delhi delegation photo, not Newsroom's image.
    slug: 'the-india-fta-is-here-are-nz-businesses-looking-in-the-wrong-places',
    title: 'The India FTA is here – are NZ businesses looking in the wrong places?',
    date: '20 October 2026',
    sortKey: '2026-10-20',
    cover: 'nz-india-business-delegation-delhi-2026.jpg',
    alt: 'New Zealand business delegation in Delhi, 2026',
    excerpt: 'Free trade with India will be about far more than wood and wool, as digital services company Valocity is proving. By INZBC Chief Executive Sunil Kaushal, in Newsroom.',
    body: [
      { type: 'p', text: 'By Sunil Kaushal, Chief Executive of the India New Zealand Business Council. Published in Newsroom, 20 October 2026.' },
      { type: 'p', text: 'The real measure of this agreement goes beyond whether New Zealand sells more of today’s products to India. The free trade agreement changes the rules. What New Zealand businesses do with them will decide what the agreement is worth.' },
      { type: 'p', text: '[Read the full article on Newsroom](https://newsroom.co.nz/2026/10/20/the-india-fta-is-here-are-nz-businesses-looking-in-the-wrong-places/) (subscriber content).' },
    ],
  },
  {
    // Media release supplied by Sunil via Drive ("Latest News" folder, "NZ India FTA Goes Live
    // 20 October 25.docx") on 17 Oct 2026, copied verbatim. The document's own header line,
    // "EMBARGOED UNTIL 12:01 AM NZDT, TUESDAY 20 OCTOBER 2026", is left off the page; Sunil
    // chose to publish ahead of it. Not on inzbc.org, so no sourceUrl. Cover is the signing
    // photo supplied alongside it ("Copy of FTA Signing (13).jpg"), byte-identical to the
    // file already in public/blog/.
    slug: 'nz-india-fta-enters-into-force-opening-new-opportunities-for-business',
    title: 'NZ India FTA Enters Into Force, Opening New Opportunities for Business',
    date: '20 October 2026',
    sortKey: '2026-10-20',
    cover: 'fta-signing-document-exchange-27-apr-2026.jpg',
    alt: 'India’s Minister of Commerce and Industry Piyush Goyal and New Zealand’s Minister for Trade and Investment Todd McClay holding the signed FTA documents',
    excerpt: 'The New Zealand-India Free Trade Agreement enters into force today, marking a new phase in the economic relationship between the two countries.',
    body: [
      { type: 'p', text: 'MEDIA RELEASE' },
      { type: 'p', text: 'The New Zealand-India Free Trade Agreement enters into force today, marking a new phase in the economic relationship between the two countries. The agreement improves market access across a wide range of sectors and gives greater certainty for businesses looking to trade, invest and build long-term commercial partnerships in India.' },
      { type: 'p', text: 'India New Zealand Business Council (INZBC) Chair Bharat Chawla said the agreement is an important milestone and kicks off the next phase of the relationship.' },
      { type: 'p', text: '"The agreement improves the conditions for businesses to operate but the real value will come from the commercial partnerships, investment and trade that grow from here," says Mr Chawla.' },
      { type: 'p', text: "From today, 57 percent of New Zealand's current exports to India become tariff free, rising to 82 percent as the agreement is implemented. Tariffs will also be reduced on a further 13 percent of current exports." },
      { type: 'p', text: 'Two-way trade between New Zealand and India was worth NZ$3.95 billion in the year ended December 2025 and last year Prime Minister Christopher Luxon and Prime Minister Narendra Modi set an aspirational goal of growing trade to NZ$7 billion by 2030.' },
      { type: 'p', text: 'INZBC Chief Executive Sunil Kaushal said the agreement creates new opportunities across sectors but success will depend on businesses taking advantage of them.' },
      { type: 'p', text: '"Market access is important but long-term success in India comes from understanding the market, building trusted relationships and committing for the long term.' },
      { type: 'p', text: "\"India is one of the world's fastest-growing major economies. New Zealand businesses have strengths in areas such as food and beverage, technology, education, advanced manufacturing and professional services that are highly valued in that market.\"" },
      { type: 'p', text: 'The agreement delivers immediate benefits, with more than 95 percent of forestry exports tariff free into India from day one, alongside sheep meat, wool and coal. The agreement also includes commitments aimed at improving customs processes and reducing barriers to trade.' },
      { type: 'p', text: "Mr Kaushal said INZBC's focus now shifts from supporting the case for an agreement to helping businesses turn the opportunities it creates into commercial outcomes." },
      { type: 'p', text: '"We have spent many years building momentum in the relationship. The agreement gives businesses access and the next stage is about implementation.' },
      { type: 'p', text: '"INZBC is committed to helping businesses understand the opportunities available, make the right connections and build the relationships that underpin successful trade between New Zealand and India."' },
      { type: 'p', text: 'ENDS' },
      { type: 'h', text: 'About INZBC' },
      { type: 'p', text: 'The India New Zealand Business Council has worked since 1988 to strengthen trade, investment and economic cooperation between India and New Zealand. INZBC is an independent, member-based organisation that supports businesses, exporters, importers and investors across the bilateral relationship.' },
      { type: 'p', text: 'Media contact: Sunil Kaushal, Chief Executive, INZBC, 021 280 4189, [sunil@inzbc.org](mailto:sunil@inzbc.org)' },
    ],
  },
  {
    slug: 'registrations-are-open-new-zealand-india-business-sport-and-innovation-summit',
    title: 'Registrations are Open: New Zealand–India Business, Sport and Innovation Summit',
    date: '10 October 2026 (approximate — see note in news.ts)',
    sortKey: '2026-10-10',
    // Replaced the old sliver crop (980x326, cropping both the title block and most of the
    // Taj Mahal) with the real complete banner Sunil supplied via Drive ("Main page" folder,
    // NZINDIA26_Hero_SQ.jpg) on 17 Oct 2026 — pillarboxed to this card's 16:10 box so nothing
    // in the 1:1 original gets cropped.
    cover: 'registrations-are-open-new-zealand-india-business-sport-and-innovation-summit.jpg',
    alt: 'Promotional banner for the New Zealand–India Business, Sport and Innovation Summit',
    excerpt: "You're invited to the New Zealand–India Business, Sport and Innovation Summit, taking place in Tāmaki Makaurau, Auckland, on 12 and 13 November 2026.",
    body: [
      { type: 'p', text: "You're invited to the New Zealand–India Business, Sport and Innovation Summit, taking place in Tāmaki Makaurau, Auckland, on 12 and 13 November 2026." },
      { type: 'p', text: "Supported by the New Zealand Ministry of Foreign Affairs and Trade, and brought to you by Tātaki Auckland Unlimited, the region's cultural, events and destination agency, in partnership with Sport New Zealand, the New Zealand–India Business, Sport and Innovation Summit will convene senior leaders from business, government, sport, technology and education to advance the next chapter of the Aotearoa New Zealand–India relationship." },
      { type: 'p', text: 'The Summit programme has been shaped through the valued contributions from New Zealand Trade and Enterprise, Auckland Council, New Zealand India Business Council, Auckland University of Technology, Education New Zealand, Auckland Business Chamber, Tourism New Zealand, and New Zealand Central Indian Association.' },
      { type: 'p', text: 'Set against the backdrop of a fast-evolving New Zealand–India relationship, the programme will explore practical ways to strengthen partnerships, connect people and markets, and create new opportunities across trade, innovation, technology, tourism, food and beverage, education and talent, while examining the growing role of sport as an economic and strategic connector.' },
      { type: 'p', text: 'This is an opportunity to join a senior-level conversation focused on shaping the next chapter of the New Zealand–India relationship and advancing meaningful opportunities for future collaboration.' },
      { type: 'h', text: 'Event details' },
      { type: 'ul', items: ['Date: 12 and 13 November 2026', 'Location: Auckland University of Technology (12 November) and the New Zealand International Convention Centre (13 November), Tāmaki Makaurau, Auckland', 'Register: [nzindiasummit.com/registration](https://www.nzindiasummit.com/registration)'] },
    ],
    sourceUrl: 'https://www.inzbc.org/post/registrations-are-open-new-zealand-india-business-sport-and-innovation-summit',
  },
  {
    slug: 'new-zealand-india-fta-business-opportunities',
    title: 'New Zealand India FTA: From Agreement to Business',
    date: '24 September 2026',
    sortKey: '2026-09-24',
    cover: 'new-zealand-india-fta-business-opportunities.jpeg',
    alt: 'Attendees at the INZBC fireside conversation on the New Zealand India FTA',
    excerpt: 'The New Zealand India Free Trade Agreement will enter into force on 20 October 2026. For exporters, investors and service providers, the immediate question is how to turn improved market access into commercial results.',
    body: [
      { type: 'p', text: 'The New Zealand India Free Trade Agreement will enter into force on 20 October 2026. For exporters, investors and service providers, the immediate question is how to turn improved market access into commercial results.' },
      { type: 'p', text: 'That question was at the centre of a standing-room-only fireside conversation hosted by the India New Zealand Business Council at BNZ Place in Auckland on 23 September.' },
      { type: 'p', text: 'The event brought together Hon Todd McClay, Minister for Trade and Investment, and H.E. Ms Muanpuii Saiawi, High Commissioner of India to New Zealand.' },
      { type: 'p', text: "It was also the High Commissioner's first engagement with INZBC members in Auckland." },
      { type: 'p', text: 'The discussion, moderated by INZBC Chief Executive Sunil Kaushal, focused on what must happen after the FTA. It considered how businesses can use the agreement, develop trusted partnerships and build a stronger commercial relationship between the two countries.' },
      { type: 'h', text: 'The FTA creates new opportunities' },
      { type: 'p', text: 'The agreement provides a stronger framework for trade between New Zealand and India.' },
      { type: 'p', text: "From the day it enters into force, almost 57 per cent of New Zealand's current exports to India will be tariff-free. This will increase to 82 per cent when the agreement is fully implemented. A further 13 per cent of exports will benefit from significant tariff reductions." },
      { type: 'p', text: "The agreement will eliminate or reduce tariffs on 95 per cent of New Zealand's current exports to India. Estimated tariff savings begin at $43 million in the first year and increase to $62 million when fully implemented, based on current trade levels." },
      { type: 'p', text: 'The benefits extend beyond tariffs. The FTA provides greater certainty for businesses and supports opportunities across goods, services, technology, education, investment and professional expertise.' },
      { type: 'h', text: 'India must be approached market by market' },
      { type: 'p', text: 'One of the central themes of the evening was the need for New Zealand businesses to understand the scale and diversity of India.' },
      { type: 'p', text: 'India cannot be treated as one uniform national market. Its states differ in their economies, industries, regulations, consumer preferences and business cultures.' },
      { type: 'p', text: 'A successful market strategy should identify the right state, city, sector and commercial partner. This is especially important for small and medium-sized New Zealand businesses with limited resources.' },
      { type: 'p', text: 'Businesses should focus on the part of India where their products, services and expertise have the strongest fit. A targeted approach is more practical than attempting to enter the whole country at once.' },
      { type: 'h', text: 'India can also be a global business partner' },
      { type: 'p', text: 'The opportunity is not limited to selling products and services within India.' },
      { type: 'p', text: 'Indian businesses have extensive networks across Asia, the Middle East, Africa, Europe and North America. Partnerships with Indian companies can give New Zealand businesses access to skills, capital, technology, manufacturing capacity and international distribution networks.' },
      { type: 'p', text: 'New Zealand can provide Indian businesses with trusted partnerships, specialist expertise and a base for engagement with the Pacific.' },
      { type: 'p', text: 'This two-way opportunity should shape the next phase of the commercial relationship.' },
      { type: 'h', text: 'Government support remains important' },
      { type: 'p', text: 'Signing and ratifying the agreement are major achievements. They do not complete the government’s role.' },
      { type: 'p', text: 'Businesses will need clear information about tariff schedules, rules of origin, customs requirements, standards and regulatory processes. They will also need market intelligence, introductions and support to identify credible partners.' },
      { type: 'p', text: 'Government agencies, industry organisations and INZBC must work together to ensure that businesses of all sizes can use the agreement.' },
      { type: 'p', text: 'This support will be particularly important for medium-sized businesses. Many have the expertise and ambition to enter India but may not have the resources of large exporters.' },
      { type: 'h', text: 'What businesses should do now' },
      { type: 'p', text: 'Companies considering India should begin preparing before the FTA enters into force.' },
      { type: 'ul', items: [
        'Become an INZBC Member',
        'Confirm whether your goods or services are covered by the agreement.',
        'Check the tariff classification and implementation schedule for your products.',
        'Review the applicable rules of origin and supporting documentation.',
        'Understand Indian customs, labelling, registration and regulatory requirements.',
        'Select the state, city and customer group that best fits your offer.',
        'Identify credible distributors, customers, investors or joint-venture partners.',
        'Review pricing, payment terms, foreign exchange and trade-finance arrangements.',
        'Prepare a long-term market plan rather than relying on one-off transactions.',
      ] },
      { type: 'h', text: "INZBC's role in the next phase" },
      { type: 'p', text: 'INZBC Chair Bharat Chawla said the turnout demonstrated the level of business interest in the next stage of the relationship.' },
      { type: 'p', text: '"The standing room only attendance showed that businesses are ready to move from discussing the agreement to acting on it. The FTA gives us a stronger platform, but commercial results will depend on preparation, trusted partnerships and sustained engagement. INZBC will help businesses connect with the right people and turn this opportunity into long-term value."' },
      { type: 'p', text: 'INZBC Chief Executive Sunil Kaushal said implementation must now become the priority.' },
      { type: 'p', text: '"Government has opened the door. Business must now walk through it. Our focus will be on helping companies understand the agreement, identify practical opportunities and build relationships that can succeed over time. This is especially important for small and medium sized businesses that have the capability to work with India but need support taking the first step."' },
      { type: 'p', text: 'INZBC will continue working with its members, partners and government agencies to support FTA education, market preparation, commercial connections and two-way investment.' },
      { type: 'h', text: 'From agreement to business' },
      { type: 'p', text: 'The New Zealand India FTA is an important milestone, but the agreement itself will not create commercial outcomes.' },
      { type: 'p', text: 'Those outcomes will come from businesses that prepare early, understand their market and invest in strong relationships.' },
      { type: 'p', text: 'The next phase of the India New Zealand relationship is about implementation. It is about converting access into trade, investment, partnerships and measurable results.' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/new-zealand-india-fta-business-opportunities',
  },
  {
    slug: 'india-new-zealand-from-agreement-to-business',
    title: 'India New Zealand: From Agreement to Business',
    date: '23 September 2026',
    sortKey: '2026-09-23',
    // The source graphic (600x170) is wider than every card box that shows it (16:10 or
    // 16:9), so object-fit: cover was cropping both edges — the flower logo on the left,
    // "FREE TRADE AGREEMENT" on the right. Letterboxed to 16:10 in the file itself (17 Oct
    // 2026) with the banner's own dark corner colour as the fill, so cover is a no-op now.
    cover: 'india-new-zealand-from-agreement-to-business.png',
    alt: 'INZBC graphic marking the FTA entering into force on 20 October',
    excerpt: 'The New Zealand India Free Trade Agreement will enter into force on 20 October 2026. This moves the relationship from negotiation to implementation.',
    body: [
      { type: 'p', text: 'The New Zealand India Free Trade Agreement will enter into force on 20 October 2026.' },
      { type: 'p', text: 'This moves the relationship from negotiation to implementation, and businesses on both sides now need to focus on how to use the agreement commercially.' },
      { type: 'p', text: "From 20 October, tariffs on 57% of New Zealand's current exports to India will be eliminated immediately. This rises to 82% once the agreement is fully implemented, with a further 13% of current exports benefiting from significant tariff reductions." },
      { type: 'p', text: 'For INZBC members already trading with India, sourcing from India, providing services, investing, or considering market entry, we encourage you to start preparing now.' },
      { type: 'h', text: 'Key steps for businesses' },
      { type: 'ul', items: [
        'Check whether your products or services are covered by the FTA and when the relevant tariff reductions take effect.',
        'Confirm the correct tariff classification and rules of origin for your products.',
        'Review the documentation required to claim preferential tariff treatment.',
        'Check customs, labelling, regulatory and certification requirements in both markets.',
        'Speak with your importer, distributor, customs broker or in market partner before 20 October.',
        'Review your pricing and margins. A tariff reduction does not automatically create a commercial advantage unless it is reflected in your market strategy.',
        'Consider whether the FTA changes the business case for entering India, expanding into another Indian state, sourcing from India, or developing new partnerships.',
      ] },
      { type: 'p', text: 'The agreement also goes beyond tariffs. It includes measures covering customs procedures, services, investment, movement of professionals, education and wider economic cooperation. Indian Customs has committed to releasing goods within 48 hours, and to endeavour to release perishable goods and express consignments within 24 hours.' },
      { type: 'h', text: 'Useful FTA resources' },
      { type: 'ul', items: [
        '[MFAT: New Zealand India FTA information](https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-concluded-but-not-in-force/new-zealand-india-free-trade-agreement)',
        '[MFAT Tariff Finder](https://www.tariff-finder.govt.nz/)',
        '[NZTE: What the NZ India FTA means for exporters](https://my.nzte.govt.nz/article/20260220-what-the-nz-india-fta-means-for-exporters)',
        '[NZTE India Market Guide](https://my.nzte.govt.nz/article/20260203-india-market-guide)',
        '[NZTE India programme](https://my.nzte.govt.nz/article/20260812-illuminate-india-programme)',
        '[Government announcement](https://www.beehive.govt.nz/release/new-zealand-and-india-ratify-free-trade-agreement)',
        '[India Trade Portal — Trade Services, High Commission of India, Wellington](https://www.hciwellington.gov.in/page/trade-services/)',
      ] },
      { type: 'h', text: "INZBC's role" },
      { type: 'p', text: 'The FTA creates the framework. Businesses will still need market knowledge, trusted relationships and the right partners to turn preferential access into actual trade.' },
      { type: 'p', text: 'INZBC has worked across the New Zealand India business relationship since 1988. As implementation begins, we will continue to connect members with businesses, government agencies, industry organisations and partners in India and New Zealand. We will also provide practical information and events focused on how companies can use the agreement.' },
      { type: 'p', text: 'If your business is considering India, expanding its existing presence, looking for an Indian partner, or trying to understand how the FTA may affect you, please contact the INZBC team.' },
      { type: 'p', text: 'The agreement opens the door. The next stage is about businesses walking through it.' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/india-new-zealand-from-agreement-to-business',
  },
  {
    slug: 'the-nz-india-fta-is-now-ratified-from-20-october-it-becomes-business',
    title: 'The NZ India FTA is now ratified. From 20 October, it becomes business.',
    date: '22 September 2026',
    sortKey: '2026-09-22',
    cover: 'the-nz-india-fta-is-now-ratified-from-20-october-it-becomes-business.jpg',
    alt: 'Formal document exchange confirming ratification of the New Zealand India FTA',
    excerpt: 'INZBC was pleased to be at Parliament today as Trade and Investment Minister Hon Todd McClay and India’s High Commissioner to New Zealand, H.E. Muanpuii Saiawi, exchanged the formal documents confirming ratification of the New Zealand India Free Trade Agreement.',
    body: [
      { type: 'p', text: 'INZBC was pleased to be at Parliament today as Trade and Investment Minister Hon Todd McClay and India’s High Commissioner to New Zealand, H.E. Muanpuii Saiawi, exchanged the formal documents confirming ratification of the New Zealand India Free Trade Agreement, in the presence of Prime Minister Christopher Luxon.' },
      { type: 'p', text: 'The FTA will enter into force on 20 October 2026. From day one, 57% of New Zealand exports to India will be tariff free, including sheep meat, wool and more than 95% of forestry and wood exports. Apples, kiwifruit and albumin will gain preferential quota access. A second round of tariff reductions follows on 1 January 2027.' },
      { type: 'p', text: 'This is an important distinction. Signing created the framework. Ratification gives businesses certainty. Entry into force is when exporters can start using it.' },
      { type: 'p', text: 'The opportunity also extends beyond goods. The agreement provides greater certainty for services exporters, investors and New Zealand companies looking to establish or expand their presence in India.' },
      { type: 'p', text: 'For INZBC, the focus now moves firmly to implementation. Businesses need to understand the tariff schedules, rules, market opportunities and, importantly, find the right partners on the ground.' },
      { type: 'p', text: 'After 38 years of strengthening commercial relationships between New Zealand and India, this is a significant moment. But the measure of this FTA will ultimately be the trade, investment and partnerships that businesses create from it.' },
      { type: 'p', text: '20 October. The next chapter begins.' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/the-nz-india-fta-is-now-ratified-from-20-october-it-becomes-business',
  },
  {
    slug: 'inzbc-announces-new-leadership-team-focus-shifts-to-fta-implementation',
    title: 'INZBC Announces New Leadership Team, Focus Shifts to FTA Implementation',
    date: '17 September 2026',
    sortKey: '2026-09-17',
    cover: 'inzbc-announces-new-leadership-team-focus-shifts-to-fta-implementation.jpg',
    alt: 'INZBC leadership announcement graphic',
    excerpt: 'The India New Zealand Business Council (INZBC) has announced the results of its Board elections, with Bharat Chawla, Sameer Handa and Sakthi Ranganathan elected to the Board for the 2026–2029 term.',
    body: [
      { type: 'p', text: 'INZBC ANNOUNCES NEW LEADERSHIP TEAM, FOCUS SHIFTS TO FTA IMPLEMENTATION' },
      { type: 'p', text: '16 September 2026' },
      { type: 'p', text: 'The India New Zealand Business Council (INZBC) has announced the results of its Board elections, with Bharat Chawla, Sameer Handa and Sakthi Ranganathan elected to the Board for the 2026–2029 term.' },
      { type: 'p', text: 'Sameer Handa and Sakthi Ranganathan joined the Board as new members, while Bharat Chawla was re-elected for a further term. Following the election, the Board confirmed its office bearers:' },
      { type: 'ul', items: ['Chair: Bharat Chawla', 'Deputy Chair: Tony Martin', 'Treasurer: Sumant Khedkar'] },
      { type: 'p', text: 'Mr Chawla is a former Chair of INZBC and an experienced international business leader with more than two decades of experience across education, trade and market development. He has been a member of the Council for the past decade and has played a longstanding role in strengthening commercial and educational links between India and New Zealand.' },
      { type: 'p', text: 'The appointments come at a significant time in the India-New Zealand relationship, following the entry into force of the [India-New Zealand Free Trade Agreement](https://www.beehive.govt.nz/release/india-fta-passes-significant-majority) and increased engagement between businesses, governments and institutions in both countries.' },
      { type: 'p', text: 'Incoming Chair Bharat Chawla said the next phase of the relationship is about businesses turning the opportunities created by the agreement into commercial outcomes.' },
      { type: 'p', text: '"We’ve spent many years building towards this moment. The FTA give us the tools but the real work starts now. Success will be measured by the partnerships formed, the investment attracted and the businesses that grow because they’re working more closely with counterparts in India and New Zealand.' },
      { type: 'p', text: '"India is one of the world’s fastest-growing major economies and New Zealand has strengths that are highly valued in that market. INZBC’s role is to help businesses navigate opportunities, make connections, share experience and build the trusted relationships that underpin long-term success.' },
      { type: 'p', text: '"We have strong momentum in the relationship. Our focus now is ensuring members are well positioned to turn that momentum into practical outcomes."' },
      { type: 'p', text: 'Mr Chawla also acknowledged the contribution of outgoing Chair Edwin Paul.' },
      { type: 'p', text: '"Edwin has provided strong leadership during an important period for both the Council and the wider bilateral relationship. Under his leadership, INZBC continued to advocate for a closer economic partnership between India and New Zealand, supported business engagement on both sides of the relationship and played a constructive role during the period leading up to the conclusion of the Free Trade Agreement.' },
      { type: 'p', text: '"He also championed initiatives such as the development of the Christchurch-Chennai sister city relationship, helping create new connections between our communities and institutions. On behalf of the Board, I thank Edwin for his commitment and contribution."' },
      { type: 'p', text: 'The Council says the year ahead will focus on helping businesses understand and access opportunities created by the FTA, strengthening commercial links between sectors and supporting greater trade and investment between the two countries.' },
      { type: 'p', text: 'INZBC will continue working closely with governments, trade agencies, chambers of commerce and industry organisations to support bilateral trade and investment.' },
      { type: 'h', text: 'Further information' },
      { type: 'p', text: 'About INZBC — Established in 1988, the India New Zealand Business Council is New Zealand’s leading organisation dedicated to supporting trade, investment and business relationships between India and New Zealand. INZBC works with businesses, government agencies and industry partners in both countries to strengthen bilateral economic engagement and create commercial opportunities for its members.' },
      { type: 'p', text: 'Sameer Handa is a former Chair of INZBC and brings extensive experience in New Zealand–India business engagement. Having served on the Council for several years, he has strongly advocated expanding trade and commercial connections between the two countries and sees significant opportunities arising from the Free Trade Agreement.' },
      { type: 'p', text: 'Sakthi Ranganathan is a New Zealand-based entrepreneur working in deep technology and innovation. He brings experience across technology, research, education, industry and government, with a particular interest in strengthening collaboration in science, technology, innovation and entrepreneurship between India and New Zealand.' },
      { type: 'p', text: 'ENDS' },
      { type: 'p', text: 'Media enquiries: Sunil Kaushal, CEO, India New Zealand Business Council, 021 280 4189, [secretariat@inzbc.org](mailto:secretariat@inzbc.org), [www.inzbc.org](http://www.inzbc.org)' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/inzbc-announces-new-leadership-team-focus-shifts-to-fta-implementation',
  },
  {
    slug: 'nz-parliament-passes-india-fta-turning-agreement-into-business-opportunity',
    title: 'NZ Parliament Passes India FTA: Turning Agreement into Business Opportunity',
    date: '16 September 2026',
    sortKey: '2026-09-16',
    // Same source graphic as the "From Agreement to Business" cover (600x170, wider than
    // every card box that shows it) — letterboxed to 16:10 in the file itself, same fix,
    // 17 Oct 2026.
    cover: 'nz-parliament-passes-india-fta-turning-agreement-into-business-opportunity.png',
    alt: 'INZBC graphic marking the New Zealand Parliament passing the India FTA legislation',
    excerpt: 'The NZ Parliament passed the legislation for the NZ–India FTA. INZBC welcomes this important milestone, but for New Zealand businesses the real work starts when the agreement enters into force.',
    body: [
      { type: 'p', text: 'The NZ Parliament passed the legislation for the NZ–India FTA.' },
      { type: 'p', text: 'INZBC welcomes this important milestone, but for New Zealand businesses the real work starts when the agreement enters into force.' },
      { type: 'p', text: "From day one, 57% of New Zealand's current exports to India will become duty free. Once fully implemented, tariffs will be eliminated or significantly reduced on 95% of our exports. The Government estimates the kiwifruit sector alone could save around NZ$125 million in tariffs over five years." },
      { type: 'p', text: 'But the opportunity is wider than tariffs. Faster border clearance, services access and stronger commercial engagement give New Zealand businesses a better platform in one of the world’s largest and fastest growing economies.' },
      { type: 'p', text: 'The challenge now is implementation.' },
      { type: 'p', text: 'An FTA creates access, but it does not create customers. Exporters still need the right market strategy, distribution partners, relationships and understanding of how business is done in India.' },
      { type: 'p', text: 'For INZBC, this is where our focus now shifts. After 38 years of advocating for stronger commercial ties between India and New Zealand, our priority is helping businesses turn the agreement into trade, investment and long-term partnerships.' },
      { type: 'p', text: 'The target is NZ$7 billion in two-way trade by 2030. Today takes us another important step closer.' },
      { type: 'p', text: 'We look forward to hosting Minister Todd McClay and the High Commissioner of India, Wellington, New Zealand H.E. Ms. Muanpuii Saiawi at the SOLD OUT event next week.' },
      { type: 'p', text: 'Read More: [beehive.govt.nz](https://www.beehive.govt.nz/release/india-fta-passes-significant-majority)' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/nz-parliament-passes-india-fta-turning-agreement-into-business-opportunity',
  },
  {
    slug: 'inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event',
    title: 'Inside the NZ–India FTA with Vangelis Vitalis – Auckland Event',
    date: '11 June 2026',
    sortKey: '2026-06-11',
    cover: 'inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event.png',
    alt: 'Event flyer for Inside the NZ India FTA with Vangelis Vitalis',
    excerpt: "INZBC invites you to our Auckland event on Tuesday, 23 June from 5.30 pm to 7 pm, with New Zealand's Chief Trade Negotiator Vangelis Vitalis.",
    body: [
      { type: 'p', text: 'Kia ora and Namaste,' },
      { type: 'p', text: 'INZBC invites you to our Auckland event on Tuesday, 23 June from 5.30 pm to 7 pm.' },
      { type: 'p', text: "Join the India New Zealand Business Council for a rare opportunity to hear directly from Vangelis Vitalis, New Zealand's Chief Trade Negotiator and the person who led the negotiations for the landmark New Zealand India Free Trade Agreement." },
      { type: 'p', text: 'Vangelis will take attendees behind the scenes of one of New Zealand’s most significant trade agreements, sharing how the deal was negotiated, the challenges that had to be overcome, the key breakthroughs achieved, and what the agreement means for Kiwi businesses looking to grow in India.' },
      { type: 'p', text: 'Learn about the new opportunities emerging across trade, investment, services and market access, and what businesses should be doing now to prepare for the next phase of New Zealand’s economic relationship with India.' },
      { type: 'p', text: 'The session will conclude with an audience Q&A.' },
      { type: 'h', text: 'Event details' },
      { type: 'ul', items: ['Date: Tuesday, 23 June 2026', 'Time: Arrivals from 5.00pm | Event 5.30 pm to 7.00 pm', 'Venue: Deloitte Building, Level 20, 1 Queen Street, Commercial Bay, Auckland CBD'] },
      { type: 'p', text: 'This event is free to attend. Registration is essential as places are limited.' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event',
  },
  {
    slug: 'india-new-zealand-free-trade-agreement-signals-new-era-for-business-inzbc',
    title: 'India–New Zealand Free Trade Agreement Signals New Era for Business – INZBC',
    date: '27 April 2026',
    sortKey: '2026-04-27',
    cover: 'india-new-zealand-free-trade-agreement-signals-new-era-for-business-inzbc.jpg',
    alt: 'Delegation photograph accompanying the FTA signing article',
    excerpt: 'INZBC welcomes the India–New Zealand Free Trade Agreement signed in New Delhi today as a game-changer in the trading relationship between the two countries.',
    body: [
      { type: 'p', text: 'FOR IMMEDIATE RELEASE' },
      { type: 'p', text: 'INZBC welcomes the India–New Zealand Free Trade Agreement signed in New Delhi today as a game-changer in the trading relationship between the two countries, improving market access and certainty for business.' },
      { type: 'p', text: 'INZBC Chair Edwin Paul said the signing reflects many years of hard work and goodwill between government and industry in both countries and shows how strong commercial partnerships can build durable trade relationships.' },
      { type: 'p', text: '"We know that trade agreements only work when they’re underpinned by trusted business-to-business relationships. The Council has worked alongside members and partners over the past few years to support collaboration projects, build market understanding and strengthen New Zealand’s long-term value proposition in India."' },
      { type: 'p', text: 'The agreement delivers significant market access provisions, improving New Zealand export competitiveness at a time of heightened global trade uncertainty and allowing for greater market diversification.' },
      { type: 'p', text: 'Minister for Trade and Investment, Hon Todd McClay, stated that New Zealand and India share connections through people, education, democratic values, and enterprise. Commercial relationships have expanded beyond traditional trade into technology, services, research, sustainability, and advanced manufacturing over the past decade.' },
      { type: 'p', text: 'The agreement reflects sector-level cooperation, with horticulture serving as an example. Zespri collaborated with officials from both nations over several years to develop the Kiwifruit Action Plan, demonstrating how industry-led initiatives support broader trade cooperation.' },
      { type: 'p', text: 'Current two-way India-New Zealand trade totals approximately NZ$3.7 billion annually. India is projected to become the world’s third-largest economy in coming years, representing substantial opportunity for New Zealand businesses.' },
      { type: 'p', text: 'Once fully implemented, the FTA will eliminate or reduce tariffs on approximately 95 percent of New Zealand exports, enhancing business certainty and reducing historical trade barriers with India.' },
      { type: 'p', text: 'Paul emphasized that realizing full benefits requires sustained commitment from both government and industry. "India remains a complex and highly competitive market, and success for New Zealand lies in sustained commitment, local partnerships and a long-term approach."' },
      { type: 'p', text: "Both governments received acknowledgment, particularly New Zealand Trade Minister Todd McClay and India's Minister of Commerce and Industry Piyush Goyal." },
      { type: 'p', text: 'On the same day, INZBC signed a Memorandum of Understanding with The Associated Chambers of Commerce and Industry of India (ASSOCHAM). Established in 1920, ASSOCHAM represents over 450,000 members across various sectors, including MSMEs, headquartered in New Delhi. The agreement enables member interactions and business growth opportunities between organizations.' },
      { type: 'p', text: 'Media Contact: Sunil Kaushal – Chief Executive Officer, India New Zealand Business Council. Ph/WhatsApp: +64 21 280 4189. Email: [sunil@inzbc.org](mailto:sunil@inzbc.org)' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/india-new-zealand-free-trade-agreement-signals-new-era-for-business-inzbc',
  },
  {
    slug: 'india-new-zealand-business-council-welcomes-landmark-nz-india-free-trade-agreement',
    title: 'India New Zealand Business Council Welcomes Landmark NZ–India Free Trade Agreement',
    date: '22 December 2025',
    sortKey: '2025-12-22',
    // inzbc.org still doesn't carry a cover image for this post (checked again 17 Oct 2026).
    // This announcement is specifically about the FTA Todd McClay and Piyush Goyal signed —
    // using the real photo of that signing (same one used elsewhere for the 27 Apr 2026
    // ceremony) rather than leaving the card blank.
    cover: 'fta-signing-document-exchange-27-apr-2026.jpg',
    alt: 'India’s Minister of Commerce and Industry Piyush Goyal and New Zealand’s Minister for Trade and Investment Todd McClay exchanging signed FTA documentation, 27 April 2026',
    excerpt: "The India New Zealand Business Council (INZBC) warmly welcomes the announcement of the New Zealand–India Free Trade Agreement (FTA), a milestone that marks a new era of partnership and opportunity for both nations.",
    body: [
      { type: 'p', text: 'FOR IMMEDIATE RELEASE' },
      { type: 'p', text: 'The India New Zealand Business Council (INZBC) warmly welcomes the announcement of the New Zealand–India Free Trade Agreement (FTA), a milestone that marks a new era of partnership and opportunity for both nations.' },
      { type: 'p', text: "INZBC Chair Edwin Paul says the agreement reduces tariffs on 95% of New Zealand's exports – among the highest of any Indian FTA - and opens new opportunities for trade, investment, and innovation across horticulture, lamb, apples and wine, while acknowledging a disappointing outcome for dairy with no substantive new access." },
      { type: 'p', text: '"We’re thrilled to see many New Zealand exporters on an equal or better footing than our global competitors across sectors, with greater access to India’s rapidly expanding middle class.' },
      { type: 'p', text: '"This agreement is the result of years of hard work and commitment from governments and the business communities in both countries coming together for a common goal of shared prosperity."' },
      { type: 'p', text: "This agreement is not just about market access—it's about building enduring partnerships that benefit both nations. Collaboration projects are planned in kiwifruit, apples and honey under the Horticulture Memorandum of Cooperation, which was signed during the Prime Minister's delegation to India earlier this year." },
      { type: 'p', text: '"The Council acknowledges the hard work of New Zealand and India negotiators and the drive and commitment of both Trade Ministers - Hon Todd McClay and Hon Piyush Goyal - to getting us here now.' },
      { type: 'p', text: 'INZBC also acknowledges the significant work of our member, Zespri, in supporting the delivery of this FTA.' },
      { type: 'p', text: '"INZBC has been clear about the importance of building the overall relationship and showing a clear value proposition to India to grow our trading relationship, and Zespri has been at the forefront of this. Zespri has been working alongside the Biosciences Economy Institute for several years on an opportunity for a mutually beneficial partnership between the Indian and New Zealand kiwifruit industries, helping to create a platform for the relationship and to build support in India.' },
      { type: 'p', text: '"These partnerships will help ensure the relationship between India and New Zealand continues to strengthen, and it is encouraging to see such a strong outcome for that sector in the FTA," says Mr Paul.' },
      { type: 'p', text: 'The FTA sets the stage for deeper collaboration across sectors, from horticulture to technology, education, and beyond. It is a testament to the strength of the India–New Zealand relationship and the ambitious plans for a shared prosperous future.' },
      { type: 'p', text: 'The INZBC Board extends its congratulations to the governments of New Zealand and India, industry partners, and all those who contributed to this historic achievement. INZBC looks forward to supporting members and stakeholders as they seize the new opportunities created by the FTA.' },
      { type: 'p', text: 'Media Contact: Sunil Kaushal, Chief Executive, India New Zealand Business Council. Email: [sunil@inzbc.org](mailto:sunil@inzbc.org). Phone/WhatsApp: +64 21 280 4189.' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/india-new-zealand-business-council-welcomes-landmark-nz-india-free-trade-agreement',
  },
  {
    slug: 'for-immediate-release-india-new-zealand-business-council-announces-new-office-bear',
    title: 'India New Zealand Business Council Announces New Office Bearers and Welcomes Newly Elected Board Members',
    date: '14 August 2025',
    sortKey: '2025-08-14',
    // The only image inzbc.org has for this post is a plain colour-gradient banner with no
    // photo content (checked 12 Oct 2026) - left uncovered rather than used as a fake cover.
    cover: undefined,
    alt: '',
    excerpt: 'India New Zealand Business Council (INZBC) welcomed three newly elected members to its Board at its AGM earlier this week and confirmed Edwin Paul as the new Chair.',
    body: [
      { type: 'p', text: 'India New Zealand Business Council Announces New Office Bearers and Welcomes Newly Elected Board Members' },
      { type: 'p', text: 'Auckland, Thursday, 14 August 2025' },
      { type: 'p', text: 'India New Zealand Business Council (INZBC) welcomed three newly elected members to its Board at its AGM earlier this week and confirmed Edwin Paul as the new Chair, Tony Martin in the newly-created role of Deputy Chair and Jonathan Manuel continued as Treasurer.' },
      { type: 'p', text: 'The newly elected Board members are Prevar CEO and former Regional Trade Commissioner Tony Martin, University of Auckland senior lecturer and Director of the NZ Asia Institute Dr Antje Fiedler and BNZ senior partner Sumant Khedkar.' },
      { type: 'p', text: "As the newly elected Chair, Mr Paul's vision is to position INZBC as the leading catalyst for India–New Zealand trade and innovation." },
      { type: 'p', text: '"With 2026 set to become one of the most significant years in the relationship between the two nations, now is the time for the Council to step up and be the bridge between New Zealand and India. We have a strong Board with a great combination of talent, experience and diversity. With its support and guidance, we can build these opportunities into value for members and for both nations."' },
      { type: 'p', text: '"The Board would like to thank and acknowledge outgoing Chair Bharat Chawla for his valuable service over the past year and also thank outgoing members, Earl Rattray and Jay Changlani, for their contributions to the council and its members," says Mr Paul.' },
      { type: 'p', text: 'The appointments come at a pivotal time for India–New Zealand relations, with opportunities for deeper collaboration across trade, culture, education, and innovation.' },
      { type: 'p', text: 'Mr Khedkar noted that the "New Zealand–India relationship is set to grow stronger, driven by trade, cultural exchange, and empowered communities, fostering mutual respect, deeper understanding, and shared prosperity for both nations in the years ahead."' },
      { type: 'p', text: 'Mr Martin reflected on the importance of this moment, observing that "There has never been a more important time for India and New Zealand ties to be strengthened and enhanced, as the two countries work together to progress their economic, cultural, sporting, and educational connections that span decades but still have significant room for growth."' },
      { type: 'p', text: "Dr Fiedler highlighted the role of the Indian diaspora, noting that \"It already plays an important part in New Zealand's innovation and growth, and that closer government-to-government ties can strengthen and extend this impact.\"" },
      { type: 'p', text: 'Outgoing Chair Bharat Chawla congratulated Edwin Paul on his election, calling him an exceptional leader with a long-standing connection to INZBC. He expressed confidence that Edwin would strengthen the relationship between India and New Zealand, excel in his new role, and continue to advance the organisation’s mission.' },
      { type: 'h', text: 'About the India New Zealand Business Council (INZBC)' },
      { type: 'p', text: 'The India New Zealand Business Council is the premier trade advocacy organisation for India–New Zealand business relations. Established in 1988, INZBC works with industry leaders, policymakers, and stakeholders to promote trade, investment, and strategic collaboration between the two countries. With over 200 members representing a broad cross-section of goods and services industries, INZBC plays a vital role in shaping the future of bilateral economic engagement.' },
      { type: 'p', text: 'Media Contact: Sunil Kaushal, General Manager, India New Zealand Business Council. Email: [gm@inzbc.org](mailto:gm@inzbc.org). Phone: 0212804189.' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/for-immediate-release-india-new-zealand-business-council-announces-new-office-bear',
  },
  {
    slug: 'boardroom-to-border-a-leadership-dialogue-on-strategy-trade-india-nz-opportunities',
    title: 'Boardroom to Border: A Leadership Dialogue on Strategy, Trade & India-NZ Opportunities',
    date: '16 June 2025',
    sortKey: '2025-06-16',
    cover: 'boardroom-to-border-a-leadership-dialogue-on-strategy-trade-india-nz-opportunities.png',
    alt: 'Event flyer for Boardroom to Border: A Leadership Dialogue on Strategy, Trade & India-NZ Opportunities',
    excerpt: 'India New Zealand Business Council in collaboration with the University of Canterbury, cordially invites you to Boardroom to Border, a leadership dialogue on strategy, trade and the India–New Zealand opportunity.',
    body: [
      { type: 'p', text: 'India New Zealand Business Council in collaboration with the University of Canterbury, cordially invites you to Boardroom to Border. A Leadership Dialogue on Strategy Trade & the India–New Zealand Opportunity.' },
      { type: 'p', text: 'Join us for an insightful afternoon of high-level dialogue exploring strategic opportunities in trade, investment, and collaboration between India and New Zealand. This forum will bring together thought leaders, policymakers, and business executives to discuss cross-border partnerships and innovation-led growth.' },
      { type: 'h', text: 'Event details' },
      { type: 'ul', items: ['Date: Thursday, 26 June 2025', 'Time: 3:30 PM – 6:00 PM', 'Venue: Drawing Room – Rātā 222 and 223, University of Canterbury, Ilam Campus, Christchurch'] },
      { type: 'p', text: 'Seats are limited – [Register now](https://forms.office.com/r/NSrSxGCnsW)' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/boardroom-to-border-a-leadership-dialogue-on-strategy-trade-india-nz-opportunities',
  },
  {
    slug: 'breakfast-dialogue-with-nz-high-commissioners-patrick-rata-david-pine-6-june-7-30am',
    title: 'Breakfast Dialogue with NZ High Commissioners Patrick Rata & David Pine',
    date: '20 May 2025',
    sortKey: '2025-05-20',
    // 1080x1350 portrait flyer, narrower than every card box that shows it — was scaling to
    // full width and cropping the header/date off the top and the sponsor logos off the
    // bottom, showing only the lower half of both headshots in between. Pillarboxed to 16:10
    // in the file itself (17 Oct 2026); the flyer's own background is already white, so the
    // padding is invisible rather than a visible bar.
    cover: 'breakfast-dialogue-with-nz-high-commissioners-patrick-rata-david-pine-6-june-7-30am.png',
    alt: 'Event flyer for the Breakfast Dialogue with NZ High Commissioners Patrick Rata and David Pine',
    excerpt: 'The India New Zealand Business Council, in association with the New Zealand Nepal Chamber of Commerce and the Sri Lanka Business Association in New Zealand, hosts an exclusive morning briefing with two of New Zealand’s senior diplomats in South Asia.',
    body: [
      { type: 'p', text: 'The India New Zealand Business Council (INZBC), in association with the New Zealand Nepal Chamber of Commerce and the Sri Lanka Business Association in New Zealand, is pleased to host an exclusive Morning Briefing featuring two of New Zealand’s senior diplomats in South Asia.' },
      { type: 'p', text: 'Join us for an insightful breakfast session with:' },
      { type: 'ul', items: ['Patrick Rata, New Zealand High Commissioner to India & Nepal', 'David Pine, New Zealand High Commissioner to Sri Lanka & Maldives'] },
      { type: 'p', text: "This is a unique opportunity to hear directly from the High Commissioners on New Zealand's evolving diplomatic and trade relations with key South Asian nations. Attendees will gain valuable perspectives on regional opportunities, strategic developments, and how businesses in New Zealand can better engage with these dynamic markets." },
      { type: 'h', text: 'Event details' },
      { type: 'ul', items: ['Date: Friday, 6 June 2025', 'Time: 7:30 AM – 9:00 AM', 'Venue: BNZ Place, Level 18, 80 Queen Street, Auckland'] },
      { type: 'p', text: 'Seats are limited – [Register now](https://forms.office.com/r/qsWMRx3V34)' },
      { type: 'p', text: "This event is supported by our valued partners and sponsors, and is a part of INZBC's ongoing efforts to foster meaningful engagement between New Zealand and South Asia." },
      { type: 'p', text: 'For enquiries, please contact: [secretariat@inzbc.org](mailto:secretariat@inzbc.org)' },
    ],
    sourceUrl: 'https://www.inzbc.org/post/breakfast-dialogue-with-nz-high-commissioners-patrick-rata-david-pine-6-june-7-30am',
  },
];
