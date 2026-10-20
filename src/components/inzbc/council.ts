/**
 * Executive Council content — the single source of truth for /executive-council.
 *
 * Originally copied verbatim from https://www.inzbc.org/executive-council on 12 Oct 2026 (see
 * git history for that pass). Restructured on 14 Oct 2026 on Sunil's direct instruction from
 * a meeting — this is INZBC's real current governance structure, which the live site hasn't
 * caught up to yet (checked again 14 Oct 2026: the live page still shows the old grouping),
 * so this is sourced from Sunil directly rather than the live page:
 *   - Board Members reordered to the hierarchy Sunil gave: Bharat, Tony, Sumant, Antje,
 *     Rachel, Edwin, Jenny, Sakthi. Sameer Handa wasn't named in that sequence — kept, not
 *     dropped, appended after the named eight rather than assuming he's been removed.
 *   - Executive Team trimmed to Sunil Kaushal only; his photo replaced with the one Sunil
 *     supplied (Drive upload 14 Oct 2026, "SUNIL (152) cropped.png").
 *   - Kanwaljit Singh Bakshi, Michael Henstock, Selwyn Thomas and Sreedhar Venkatram moved out
 *     of Executive Team into two new groups: Chapter Heads (Michael, Selwyn, Sreedhar) and Ex
 *     Officio (Kanwaljit, plus two MFAT representatives named for the first time here).
 *   - Rachael McGuckian and Alysha Bagasra are new additions, named by Sunil as ex-officio
 *     representatives (Alysha from MFAT; Rachael from NZTE, corrected 17 Oct 2026). Neither has a bio on file — their entries carry only the
 *     role Sunil stated, not an invented biography. Photos supplied by Sunil 16 Oct 2026.
 *
 * Three single-word spelling fixes were made to copied text in the 12 Oct pass (all other
 * wording, including two bios that drift from third person into first person mid-paragraph,
 * is left exactly as published — not this file's job to improve on it):
 *   - Selwyn Thomas's title: "Souther India Chapter Head" -> "Southern India Chapter Head"
 *   - Rachel Lynch's bio: "commericialisation" -> "commercialisation"
 *   - Sumant Khedkar's bio: "Enginering" -> "Engineering"
 *
 * Photos: all 14 original people have one. 10 were matched by filename to the live page's own
 * image filenames on 12 Aug 2026. The remaining four — Sameer Handa, Sakthi Ranganathan,
 * Kanwaljit Singh Bakshi and Selwyn Thomas — were missing because the account's Wix Media
 * Manager (checked 12 Oct 2026) doesn't hold them; their real photos were on the live
 * inzbc.org page itself all along and were downloaded directly from there on 13 Oct 2026,
 * same source as the other ten. Rachael McGuckian's and Alysha Bagasra's photos are colour,
 * supplied by Sunil 16 Oct 2026 — Council.tsx's grayscale filter still applies to them too.
 *
 * Colour: every one of the original 14 photos is already a black-and-white source file by
 * eye, not a colour photo; Sunil's replacement Sunil Kaushal photo is colour. Council.tsx
 * still applies a CSS grayscale filter to every photo regardless, so the page is guaranteed
 * black-and-white either way.
 */

export type CouncilMember = Readonly<{
  name: string;
  title: string;
  bio: string;
  photo?: string;
  /** CSS object-position for the grid thumbnail's `photo` crop (aspect-square). Only needed
      when the source isn't close to square — Alysha's is a tall portrait headshot
      (800x969), and a centred crop was cutting her head off. The bio dialog doesn't crop at
      all (object-contain, see Council.tsx), so this only affects the grid. Defaults to
      center when unset. */
  photoPosition?: string;
  linkedin?: string;
}>;

export type CouncilGroup = Readonly<{
  heading: string;
  members: readonly CouncilMember[];
}>;

export const COUNCIL: readonly CouncilGroup[] = [
  {
    heading: 'Board Members',
    members: [
      {
        name: 'Bharat Chawla',
        title: 'Chair',
        photo: '/council/bharat-chawla.jpg',
        linkedin: 'https://www.linkedin.com/in/bharat-chawla-959b7921/',
        bio: "Bharat has been a member of the India New Zealand Business Council board for the last two years. He is also a former member of the Institute of Directors, New Zealand, and a Chartered Manager (CMI UK) / Fellow at the Institute of Managers and Leaders, Australia and New Zealand. The Superdiversity Institute of Law and the Ministry of Ethnic Communities selected him as the Top Diverse board-ready director. With a career spanning two decades in the International education space, Bharat has travelled to more than 40 countries and cultures. His unwavering commitment to integrity is evident in his approach to building business through solid relationships and exceptional customer service. Looking ahead, Bharat's primary goal is to foster a robust education policy partnership between India and New Zealand. His vision involves establishing New Zealand Education delivery centres in India and strengthening the collaboration between the two countries, with education at the forefront. I follow a straightforward rule: 'Together, we can make a small initiative a big success.' I enjoy collaborating to help and improve the partnership.",
      },
      {
        name: 'Tony Martin',
        title: 'Deputy Chair',
        photo: '/council/tony-martin.png',
        linkedin: 'https://www.linkedin.com/in/tony-martin-30b5bb3/',
        bio: 'Tony Martin is the Chief Executive Officer of Prevar, a leading New Zealand-based horticultural intellectual property company. With a robust background in international trade, he previously served as New Zealand’s Trade Commissioner and Consul General in Vietnam, and as Regional Director for New Zealand Trade & Enterprise across India, the Middle East, and Africa. In addition to his executive role, Tony is a Senior Executive Coach with 2b Limitless, delivering strengths-based leadership and performance coaching across New Zealand, Australia, and Asia. He holds a Master of Business Studies (Hons) in International Marketing and is Certified with the International Coaching Federation.',
      },
      {
        name: 'Sumant Khedkar',
        title: 'Treasurer',
        photo: '/council/sumant-khedkar.jpg',
        linkedin: 'https://www.linkedin.com/in/sumant-khedkar-06a2191b/',
        // "Enginering" -> "Engineering" (spelling fix, see file header).
        bio: 'Sumant Khedkar (Master in Business Administration, BE - Chemical Engineering) is a Senior Partner at Bank of New Zealand with 20+ years’ experience spanning two continents (India and New Zealand). Known as a connector and bridge-builder, he creates powerful links between customers, colleagues, communities, and governments. He works closely with the Indian diaspora, driving opportunities that strengthen NZ–India ties in trade, culture, and business. His ability to navigate boardrooms and community halls with equal ease has made him a trusted voice in both spheres. A dynamic speaker, Sumant has shared insights at premier management institutes in India, inspiring future leaders on customer excellence, leadership, and cross-cultural collaboration. Guided by the values of excellence, respect, and ownership, he blends deep banking expertise with a genuine passion for empowering people. From closing high-value business deals to championing cultural celebrations, Sumant’s approach is the same connect people, spark ideas, and create outcomes that last.',
      },
      {
        name: 'Antje Fiedler',
        title: 'Board Member',
        photo: '/council/antje-fiedler.jpg',
        linkedin: 'https://www.linkedin.com/in/antje-fiedler/',
        bio: 'Antje Fiedler (PhD, University of Auckland, NZ) is Senior Lecturer in Management specialising in entrepreneurship and International Business. She is also the Director of the New Zealand Asia Institute (NZAI) at the University of Auckland Business School. She is also a Director of the Board of the Small Enterprise Association of Australia and New Zealand (SEAANZ). She is passionate about conducting research that is relevant to practice. Her research interests centre around how SMEs can productively engage with Asia. Her research has informed courses at the Business School (University of Auckland) and practitioner workshops around New Zealand. Antje has received three Excellence Awards for her Teaching at the University of Auckland Business School. She is an Editor of Small Business Economics, an Associate Editor for the Journal of Small Business Management, and serves on the editorial boards for other leading international journals, including Critical Perspectives on International Business (editorial review board), and Review of Managerial Science (editorial board) and Small Enterprise Research (Deputy Editor)',
      },
      {
        name: 'Rachel Lynch',
        title: 'Board Member',
        photo: '/council/rachel-lynch.jpg',
        linkedin: 'https://www.linkedin.com/in/rachel-lynch-b684a351/',
        // "commericialisation" -> "commercialisation" (spelling fix, see file header).
        bio: 'Rachel is Zespri’s Government and Community Affairs Manager and manages the team responsible for government engagement as well as policy, advocacy and trade strategy, along with Zespri’s New Zealand community investment programme. Over the past 12 years at Zespri, Rachel has led communications, media and engagement work, as well as a period in new cultivar commercialisation, and successfully led the industry’s response to the EPA’s reassessment of the widely-used agrichemical hydrogen cyanamide (Hi-Cane). Rachel has an extensive background in strategic communications and public engagement, with experience across local and national government.',
      },
      {
        name: 'Edwin Paul',
        title: 'Board Member',
        photo: '/council/edwin-paul.png',
        linkedin: 'https://www.linkedin.com/in/pauledwin/',
        bio: "Edwin is a fond father, old-school audiophile, voyeur of the future, passionate chef, empathetic leader, innovation driver, complex problem solver, incessant entrepreneur, and an angel investor...discovering his IKIGAI. Originally from Madras, Edwin has called Aotearoa home for over two decades. He is deeply committed to fostering commerce and trade between India and New Zealand, having founded and managed businesses in both nations. Edwin has accompanied New Zealand's prime minister and ministers on business and ministerial delegations to the sub-continent as a trailblazer in facilitating mutually beneficial bilateral business engagements. With an unbridled passion exceeded only by his connections and capability, Edwin is adept at delivering impactful collaborations between diverse stakeholders due to his extensive experience in government-to-government (G2G) and business-to-business (B2B) relations, providing commercial and social benefits across borders. Edwin's commitment to education is a part of his past and a driving force in his future. As a proud alumnus of the University of Auckland and the University of Oxford, he is passionate about transnational educational initiatives. Edwin looks forward to supporting organisations in the knowledge sector, helping them thrive and positively impact the communities they serve.",
      },
      {
        name: 'Jenny McGregor',
        title: 'Board Member',
        photo: '/council/jenny-mcgregor.jpg',
        // No LinkedIn link on the live page for Jenny - button intentionally omitted.
        bio: 'Jenny is a Senior Manager of Trade Strategy at Fonterra, responsible for driving Fonterra’s engagement and advocacy on key strategic global trade issues. A former New Zealand official, Jenny has held a number of roles across Government, including at the Ministry of Foreign Affairs and Trade (MFAT) and Ministry for Primary Industries (MPI), where she was Trade Policy Manager. In these roles, she has been a senior member of various New Zealand trade negotiating teams, leading agriculture negotiations during the CPTPP negotiations and representing New Zealand at the World Trade Organisation (WTO) in Geneva. Jenny joined Fonterra ten years ago and has worked closely on trade-related issues during this time, including as General Manager Trade Strategy. She has previously held roles on the Export NZ Advisory Board and on the NZ-US Business Council. Jenny is a graduate of the University of Auckland with a Bachelors degree in Arts and Commerce. She also holds an Honours degree in Political Studies from Victoria University of Wellington.',
      },
      {
        name: 'Sakthi Ranganathan',
        title: 'Board Member',
        photo: '/council/sakthi-ranganathan.png',
        linkedin: 'https://www.linkedin.com/in/sakthinz/',
        bio: 'Sakthi is a hands-on entrepreneur with expertise in digital design, cross-functional team development, human-computer interaction and extended reality technologies, including VR, AR and MR. He founded JIX Reality in 2017 after identifying a gap between XR research and its practical use in solving real-world business and industry problems. A maker at heart, Sakthi enjoys building ideas from concept to implementation. He brings creative foresight, technical understanding and commercial discipline to his work, with a strong focus on return on investment and practical outcomes. Through JIX Reality, he has established an XR lab in Christchurch where researchers, industry partners and students can test new ideas, explore emerging technologies and develop commercially viable prototypes. Sakthi is passionate about industry-academic collaboration and believes in using technology for good. He serves on the EdTech Executive Council and is committed to using innovation to improve how young people learn.',
      },
      {
        name: 'Sameer Handa',
        title: 'Board Member',
        photo: '/council/sameer-handa.jpg',
        linkedin: 'https://www.linkedin.com/in/sameerhanda/',
        bio: 'Sameer is a business leader with extensive experience in management, leadership and governance roles in various countries and industries. He is currently the managing director of Glowbal NZ Ltd & Three 60 Construction Ltd. Sameer Handa is a Member of the New Zealand Order of Merit (MNZM) for services to Business and New Zealand-India relations. Sameer is an experienced director with wide governance knowledge and is currently the Chairman on the board of Bank of India (NZ) Ltd, Trustee on the boards of Auckland Hospital Foundation and Trust for destruction of synthetic refrigerants. He is past Chair of India NZ Business Council and past co-chair of New Zealand Asian leaders (NZAL). He has also been part of a few ministerial trade delegations to India, Sri Lanka, Thailand & Philippines. Sameer is a mechanical engineer with an MBA from Sydney University. He uses his business, management and international trade experience to mentor entrepreneurs and guide those businesses wishing to make a mark in international markets.',
      },
    ],
  },
  {
    heading: 'Executive Team',
    members: [
      {
        name: 'Sunil Kaushal',
        title: 'Chief Executive',
        photo: '/council/sunil-kaushal.png',
        linkedin: 'https://www.linkedin.com/in/sunilkaushal/?originalSubdomain=nz',
        bio: 'Sunil Kaushal is a frequent media commentator on Business, Commerce, and International Trade particularly focusing on India. He has first-hand on-the-ground experience in guiding New Zealand firms to expand into India. Sunil has been the previous Chair of INZBC and has been providing strategic input to the organisation. He also serves on various boards of Not for Profit organisations and community groups. He is frequently invited by industry and academia for comments on New Zealand and India.',
      },
    ],
  },
  {
    heading: 'Chapter Heads',
    members: [
      {
        name: 'Michael Henstock',
        title: 'Christchurch Chapter Head',
        photo: '/council/michael-henstock.jpg',
        linkedin: 'https://www.linkedin.com/in/michael-henstock-ab4a651/',
        bio: 'Michael brings a wealth of experience in stakeholder engagement and communication across both private and public sectors. His expertise spans a diverse array of organisations, enabling him to effectively navigate complex environments and foster meaningful connections. He specialises in building and strengthening strategic partnerships between organisations and their key stakeholders, ensuring alignment and collaboration for long-term success. Michael’s career includes consulting and agency experience, significant roles in the Canterbury earthquake recovery efforts, as well as engagements with the New Zealand BLACKCAPS and Indian cricket teams, further showcasing his adaptability and leadership in high-stakes environments. With a deep understanding of the political and business landscapes in Canterbury, Michael is politically astute and maintains strong relationships across iwi, industry, and government networks throughout New Zealand.',
      },
      {
        name: 'Selwyn Thomas',
        // Was "Southern India Chapter Head" (itself a spelling fix of "Souther", see file
        // header). Renamed to Chennai Chapter Head on Sunil's instruction, 20 Oct 2026.
        title: 'Chennai Chapter Head',
        photo: '/council/selwyn-thomas.jpg',
        linkedin: 'https://www.linkedin.com/in/selwynthomas/',
        bio: 'Selwyn Thomas is an internationally recognised leader in people analytics, digital transformation and human resource management. He is President and CEO of Talent Tribe Global Consulting, headquartered in Auckland, with offices in Melbourne and Toronto, and a global support centre in Chennai, India. Across a 32-year career, Selwyn has held senior leadership roles across media, finance, insurance, consulting, manufacturing, hospitality, entertainment, NGOs and digital technology. He has also served as Associate Director, People and Infrastructure, Ernst & Young Asia Pacific, and HR Director for Alstom’s Transportation Division. Selwyn is a sought-after advisor, consultant and keynote speaker, with specialist expertise in organisational transformation, job grading, compensation review, performance systems and workforce strategy. He has also been a guest lecturer across key HR disciplines. He holds a Bachelor of Commerce from Madras Christian College and a Master’s in Human Resource Management from Bosco Institute for Social Sciences.',
      },
      {
        name: 'Sreedhar Venkatram',
        title: 'Mumbai Chapter Head',
        photo: '/council/sreedhar-venkatram.jpeg',
        linkedin: 'https://www.linkedin.com/in/sreedhar-venkatram-6b10b8321/',
        bio: 'Sreedhar Venkatram is Head of South Asia and India for BestSeat360 New Zealand and an Associate with QLBS New Zealand. He has deep experience across international trade, market entry, technology, sport, aviation, creative industries and services. He was previously Chief Executive Officer, South Asia for Playmaker Labs and CricHQ New Zealand. Before that, he spent nearly 11 years with New Zealand Trade and Enterprise in Mumbai as Senior Business Development Manager, including a period as Acting Trade Commissioner. During this time, he supported New Zealand companies to grow their commercial presence in India and Sri Lanka, managed the NZTE India Beachheads Programme, and supported Prime Ministerial and Ministerial missions to India. Earlier, Sreedhar worked with FedEx India as Regulatory Advisor and with Government of India Export Promotion Councils. He is Chapter Head for INZBC in Mumbai and holds a Master’s in International Business.',
      },
    ],
  },
  {
    heading: 'Ex Officio',
    members: [
      {
        name: 'Kanwaljit Singh Bakshi',
        title: 'Ex-Officio',
        photo: '/council/kanwaljit-singh-bakshi.jpg',
        linkedin: 'https://www.linkedin.com/in/kanwaljit-singh-bakshi-08873120/',
        bio: 'Kanwaljit has worked as a Member of Parliament in New Zealand for twelve years. During this time, he have had the opportunity to work with various communities, governmental sectors, and the public sector, as well as people from diverse backgrounds across the country. His lifelong goal has been to help people by identifying their concerns, addressing their issues, and contributing to building a better and more productive society. He wants to continue to contribute and is committed to continuing his efforts towards this end. As an immigrant who moved to New Zealand, he started a business from scratch and took it to a successful level, which has equipped me with a multitude of skills. His experience in business administration and organization, as well as my background as a Member of Parliament will be invaluable to the Business Council.',
      },
      // Photos supplied by Sunil 16 Oct 2026. Spelling corrected to "Alysha" by Sunil 17 Oct
      // 2026 — the supplied photo's filename ("Alyesha Bagasra.jpg") was misspelt, so the
      // image path keeps that spelling.
      // Rachael's organisation changed from MFAT to NZTE by Sunil 17 Oct 2026.
      {
        name: 'Rachael McGuckian',
        title: 'Ex-Officio (NZTE)',
        photo: '/council/rachael-mcguckian.jpg',
        linkedin: 'https://www.linkedin.com/in/rachaelmcguckian/',
        bio: 'Ex-officio representative to INZBC from New Zealand Trade and Enterprise (NZTE).',
      },
      {
        name: 'Alysha Bagasra',
        title: 'Ex-Officio (MFAT)',
        photo: '/council/alyesha-bagasra.jpg',
        photoPosition: '50% 8%',
        linkedin: 'https://www.linkedin.com/in/alyshab092/',
        bio: 'Ex-officio representative to INZBC from the Ministry of Foreign Affairs and Trade (MFAT).',
      },
    ],
  },
];
