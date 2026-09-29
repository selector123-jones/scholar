/* ==========================================================================
   Site content.
   Every external reference to the previous site has been removed: no
   third-party host, no social profile, no partner subdomain, no hosted
   image. Imagery is generated locally as inline SVG (see `coverFor` /
   the component tree) so the app has no runtime dependency on any other site.

   To put your own details in: edit BRAND, CONTACT and SOCIAL_LINKS below —
   nothing else hard-codes them.
   ========================================================================== */

/* Channel artwork, trimmed to transparent PNGs by tools/make-icons.mjs. */
import phoneIcon from "../assets/icons/phone.png";
import whatsappIcon from "../assets/icons/whatsapp.png";
import instagramIcon from "../assets/icons/instagram.png";
import xIcon from "../assets/icons/x.png";
import youtubeIcon from "../assets/icons/youtube.png";
import emailIcon from "../assets/icons/email.png";

/* ------------------------------------------------------------------ brand */
export const BRAND = {
  name: "Scholaa",
  tagline: "Scholarships & Study Programs",
};

export const CONTACT = {
  phone: "0785282974",
  phoneHref: "tel:0785282974",
  /* Same number as the phone line. International form is derived below. */
  whatsapp: "0785282974",
  email: "scholars250@gmail.com",
  instagram: "scholaa1",
  instagramHref: "https://www.instagram.com/scholaa1/",
  hours: "Mon – Fri, 08:00 – 18:00",
  address: "Kigali, Rwanda",
};

/* wa.me needs the number without spaces or symbols, prefixed by the country
   code (250 for Rwanda). */
const waNumber = `250${CONTACT.whatsapp.replace(/\D/g, "")}`;

export const whatsappHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
  "Hello! I would like to ask about your scholarship opportunities."
)}`;

/* >>> EDIT THESE <<<
   Your X and YouTube handles. Leave the href empty and that channel is
   hidden everywhere, so you only fill in the ones you actually use. */
export const SOCIAL_LINKS = {
  x: { handle: "@scholaarw", href: "https://x.com/scholaarw" },
  youtube: { handle: "Scholaa", href: "https://www.youtube.com/@scholaa1" },
};

/* Primary "get in touch" action: opens the user's mail client with the
   message pre-filled. Swap for a form endpoint if you prefer. */
export const contactLink = (
  message,
  subject = "Enquiry from the website"
) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;

/* ------------------------------------------- locally generated artwork */
const PALETTES = [
  ["#0E77C2", "#083352"],
  ["#128FCB", "#0A3A62"],
  ["#0891B2", "#083352"],
  ["#1D6FB8", "#0B2A5B"],
  ["#0E77C2", "#0B4A3A"],
  ["#0A6EA8", "#083352"],
];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const svgUri = (svg) =>
  `data:image/svg+xml,${encodeURIComponent(svg.replace(/\s{2,}/g, " "))}`;

const CAP_PATH =
  "M-70 0 L0 -34 L70 0 L0 34 Z M-34 17 v26 c0 14 15 24 34 24 s34 -10 34 -24 v-26";

/* Card artwork: deterministic gradient + cap glyph + label. */
export function coverFor(label, seed = 0, kind = "Scholarship") {
  const [a, b] = PALETTES[Math.abs(seed) % PALETTES.length];
  const capId = `c${seed}`;
  return svgUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="640" height="400">
<defs>
<linearGradient id="${capId}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
</linearGradient>
</defs>
<rect width="640" height="400" fill="url(#${capId})"/>
<circle cx="575" cy="58" r="118" fill="#ffffff" opacity="0.07"/>
<circle cx="80" cy="362" r="92" fill="#FDC713" opacity="0.13"/>
<g transform="translate(320 158)" fill="none" stroke="#FDC713" stroke-width="9"
stroke-linejoin="round" stroke-linecap="round" opacity="0.95"><path d="${CAP_PATH}"/></g>
<text x="320" y="300" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif"
font-size="30" font-weight="700" fill="#ffffff" opacity="0.96">${esc(label)}</text>
<text x="320" y="344" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif"
font-size="17" font-weight="600" fill="#ffffff" opacity="0.62" letter-spacing="3.5">${esc(kind.toUpperCase())}</text>
</svg>`);
}

/* ------------------------------------------------------------------- nav */
export const NAV_MAIN = [
  { label: "Home", to: "/" },
  { label: "All Applications", to: "/applications" },
  { label: "News", to: "/news" },
  { label: "Courses", to: "/courses" },
  { label: "Success Stories", to: "/services" },
  { label: "About Us", to: "/about" },
];

export const NAV_MORE = [
  { label: "FAQ", to: "/faq" },
  { label: "Contact Us", to: "/contact" },
];

export const NAV_AUTH = [
  { label: "Login", to: "/login" },
  { label: "Sign Up", to: "/signup" },
];

/* Cross-links used at the foot of several pages. */
export const SECTIONS = [
  { label: "Scholarships", to: "/applications" },
  { label: "News", to: "/news" },
  { label: "Courses", to: "/courses" },
  { label: "Success Stories", to: "/services" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

/* ------------------------------------------------------------------ home */
export const STATS = [
  { value: "5,000+", label: "Students guided" },
  { value: "300+", label: "Scholarships listed" },
  { value: "40+", label: "Partner institutions" },
  { value: "12", label: "Years of experience" },
];

/* ---------------------------------------------------------- scholarships */
/* Awarding body and intake year for each listing, keyed by id, so every
   card and detail view carries a complete set of values. */
const SCHOLARSHIP_META = {
  1:  { university: "Commonwealth Scholarship Commission", year: "2026" },
  2:  { university: "Higher Education Council", year: "2026" },
  3:  { university: "Rwanda Polytechnic", year: "2026" },
  4:  { university: "University of Rwanda", year: "2026" },
  5:  { university: "East African Christian College", year: "2026" },
  6:  { university: "African Leadership College of Higher Education", year: "2027" },
  7:  { university: "Institute of Education Sciences", year: "2026" },
  8:  { university: "National Police College", year: "2026" },
  9:  { university: "Common Application member institutions", year: "2027" },
  10: { university: "National Institute for International Education", year: "2027" },
  11: { university: "Application support desk", year: "2026" },
  12: { university: "University of Cape Town", year: "2027" },
};

const img = (seed, label, kind) => coverFor(label, seed, kind);

export const SCHOLARSHIPS = [
  {
    id: 1,
    tag: "Fully funded",
    level: "Postgraduate",
    country: "United Kingdom",
    deadline: "2026-10-30",
    title:
      "2026 Commonwealth Scholarships in the United Kingdom for Rwandan Students",
    body: "Eligible citizens are invited to apply for the 2026 Commonwealth Master's and PhD Scholarships to pursue fully funded postgraduate study in the United Kingdom.",
    requirements: [
      "Citizenship with a valid national ID",
      "Completed Bachelor's degree with a minimum second-class pass",
      "English proficiency certificate (IELTS / TOEFL) where required",
      "At least two years of relevant work experience for most awards",
    ],
  },
  {
    id: 2,
    tag: "Government",
    level: "Undergraduate",
    country: "Algeria",
    deadline: "2026-11-12",
    title: "Algeria Government Scholarships 2026/2027 for Rwandan Students",
    body: "Applications are open for government-funded scholarships for the 2026/2027 academic year across a wide range of degree programmes.",
    requirements: [
      "Nationality certificate issued by a recognised authority",
      "Proof of secondary or tertiary qualification",
      "Copy of the national identity card",
      "Willingness to return home after completing studies",
    ],
  },
  {
    id: 3,
    tag: "Admissions",
    level: "Undergraduate",
    country: "Rwanda",
    deadline: "2026-10-20",
    title: "Polytechnic Opens Applications for the 2026–2027 Academic Year",
    body: "Year One applications are now open across all diploma and technical programmes for the 2026–2027 academic year.",
    requirements: [
      "Completed secondary education with a valid certificate",
      "National identity card and four passport photos",
      "Official transcript from previous school",
      "Entry requirement of the chosen programme met",
    ],
  },
  {
    id: 4,
    tag: "Admissions",
    level: "Undergraduate",
    country: "Rwanda",
    deadline: "2026-11-05",
    title:
      "University Opens Undergraduate Applications for 2026/2027 Academic Year",
    body: "Qualified students are invited to apply for admission into undergraduate academic programmes across all faculties for the 2026/2027 academic year.",
    requirements: [
      "Secondary school leaving certificate (O-Level / A-Level)",
      "Minimum grade average set by the target faculty",
      "Passport-size photos and national ID",
      "Application completed through the official admissions portal",
    ],
  },
  {
    id: 5,
    tag: "500 awards",
    level: "Undergraduate",
    country: "East Africa",
    deadline: "2026-10-15",
    title: "500 Scholarships for Bachelor's Degree Studies — 2026/2027",
    body: "Applications are open for 500 scholarships for Bachelor's degree studies. The opportunity is available to students who are financially disadvantaged but academically strong.",
    requirements: [
      "Secondary school certificate with a good pass rate",
      "Demonstrated financial need",
      "Statement of commitment for faith-based awards",
      "Completed application form with supporting documents",
    ],
  },
  {
    id: 6,
    tag: "Feb 2027",
    level: "Postgraduate",
    country: "Mauritius",
    deadline: "2026-11-30",
    title: "Mastercard Scholarship at a Leading College in Mauritius — February 2027",
    body: "Applications are open for the February 2027 intake of the Mastercard Foundation Scholars Program at a leading college of higher education in Mauritius.",
    requirements: [
      "Bachelor's degree from a recognised institution",
      "Strong academic record and leadership potential",
      "Commitment to community impact after graduation",
      "Fluent English; French proficiency is an advantage",
    ],
  },
  {
    id: 7,
    tag: "Aid",
    level: "Undergraduate",
    country: "Rwanda",
    deadline: "2026-10-08",
    title: "DirectAid Scholarship 2026/2027",
    body: "Applications are open for the DirectAid Scholarship for vulnerable and academically promising students who wish to pursue undergraduate studies.",
    requirements: [
      "Proof of vulnerability or financial hardship",
      "Strong academic performance at secondary level",
      "Recommendation letter from a school or community leader",
      "Completed scholarship application form",
    ],
  },
  {
    id: 8,
    tag: "Admissions",
    level: "Certificate",
    country: "Rwanda",
    deadline: "2026-10-25",
    title:
      "National Police: Applications Open for Studies at the Police College in Musanze",
    body: "Applications are open for citizens who wish to study at the National Police College. Eligible applicants are invited to submit their files.",
    requirements: [
      "Citizenship and age within the advertised range",
      "Physical fitness certificate",
      "Secondary school certificate",
      "Clean police records check",
    ],
  },
  {
    id: 9,
    tag: "Global",
    level: "Undergraduate",
    country: "USA / Canada / UK",
    deadline: "2026-11-20",
    title: "Common App 2027: Apply to Universities in the USA, Canada, UK and more",
    body: "Applications are open for 2027 university admission through the Common Application, allowing students to apply to participating institutions worldwide in a single application.",
    requirements: [
      "Secondary school records and transcripts",
      "English proficiency test scores",
      "Personal statement and extracurricular activities list",
      "Letters of recommendation and school counsellor submission",
    ],
  },
  {
    id: 10,
    tag: "Fully funded",
    level: "Undergraduate",
    country: "South Korea",
    deadline: "2026-11-01",
    title: "2027 Global Korea Scholarship (GKS-U) for Undergraduate Studies",
    body: "Applications are open for a fully funded Korean Government scholarship for international students seeking undergraduate study in South Korea.",
    requirements: [
      "Nationality of a country eligible for the programme",
      "Academic ability and healthy physical condition",
      "No criminal record and willingness to comply with rules",
      "Language certificate depending on the chosen track",
    ],
  },
  {
    id: 11,
    tag: "Guide",
    level: "All levels",
    country: "Worldwide",
    deadline: "2026-12-15",
    title: "Recommendation Letters for Applications: Everything You Need to Know",
    body: "A strong letter of recommendation can set you apart from other candidates. Here is how to choose a referee, what to give them, and when to follow up.",
    requirements: [
      "Choose a referee who knows you well",
      "Share your CV, targets and deadlines",
      "Draft bullet points of achievements they can reference",
      "Follow up politely one to two weeks before the deadline",
    ],
  },
  {
    id: 12,
    tag: "Fully funded",
    level: "Postgraduate",
    country: "South Africa",
    deadline: "2026-12-01",
    title: "Postgraduate Bursary Programme for African Students 2027",
    body: "A fully funded postgraduate bursary covering tuition, accommodation and a monthly stipend for students from across the African continent.",
    requirements: [
      "Bachelor's degree with a minimum 60% average",
      "Proof of financial need",
      "Academic referee reports and statement of purpose",
      "Valid passport with six months' validity",
    ],
  },
].map((s, i) => ({
  ...s,
  ...SCHOLARSHIP_META[s.id],
  image: img(i, s.country, s.level),
}));

export const LEVELS = [
  "All levels",
  "Undergraduate",
  "Postgraduate",
  "Certificate",
];

/* ------------------------------------------------------ writing services */
export const WRITING_SERVICES = [
  "Personal Statements & Essays",
  "Resume & CV",
  "Recommendation Letters",
  "Motivation Letters",
  "Cover Letters & Portfolios",
];

/* -------------------------------------------------------------- courses */
export const COURSES = [
  {
    id: 1,
    title: "Personal Statement Mastery",
    tagline: "Write one essay that gets you noticed",
    level: "Beginner",
    lessons: 18,
    weeks: 4,
    price: 45,
    blurb:
      "Build a personal statement from scratch: story structure, showing not telling, and the clichés that get cut in the first line.",
    outcomes: [
      "A repeatable framework for any application essay",
      "How to pick a narrative that supports your admissions case",
      "Line-by-line self-editing before submission",
    ],
  },
  {
    id: 2,
    title: "CV & Resume for Scholarships",
    tagline: "One document, every format",
    level: "Beginner",
    lessons: 12,
    weeks: 3,
    price: 35,
    blurb:
      "Academic CV, European CV and modern resume — what belongs in each, what to leave out, and how to fit to a single page.",
    outcomes: [
      "The right CV format for each region",
      "Impact phrasing for achievements and responsibilities",
      "A master document you can tailor in minutes",
    ],
  },
  {
    id: 3,
    title: "Finding & Filtering Scholarships",
    tagline: "Stop applying to the wrong things",
    level: "Beginner",
    lessons: 15,
    weeks: 3,
    price: 40,
    blurb:
      "A repeatable system for finding opportunities, checking eligibility in five minutes, and tracking deadlines you will not miss.",
    outcomes: [
      "Where real scholarships are posted, and where the scams are",
      "An eligibility checklist you can run in minutes",
      "A deadline tracker with alerts",
    ],
  },
  {
    id: 4,
    title: "Interview Preparation",
    tagline: "Answer well under pressure",
    level: "Intermediate",
    lessons: 20,
    weeks: 5,
    price: 60,
    blurb:
      "Common scholarship and admission interview questions, structured answer frameworks, and mock interviews with feedback.",
    outcomes: [
      "The STAR method, adapted for academic interviews",
      "How to handle 'tell me about yourself' honestly",
      "Recorded mock interview with written feedback",
    ],
  },
  {
    id: 5,
    title: "IELTS & TOEFL Readiness",
    tagline: "Target band scores, methodically",
    level: "Intermediate",
    lessons: 24,
    weeks: 6,
    price: 75,
    blurb:
      "Test strategy, timed practice for every section, and a vocabulary plan that actually moves your score.",
    outcomes: [
      "Section-by-section study plan from your diagnostic",
      "Writing and speaking templates you can adapt",
      "Timed practice sets with band-score feedback",
    ],
  },
  {
    id: 6,
    title: "University Application Timeline",
    tagline: "A plan from today to enrolment",
    level: "All levels",
    lessons: 10,
    weeks: 2,
    price: 25,
    blurb:
      "Work backwards from enrolment day and build a realistic schedule, including document collection, visas and funding.",
    outcomes: [
      "A dated, task-level application schedule",
      "Visa and travel-document checklist",
      "A plan for funding gaps and second choices",
    ],
  },
];

/* ----------------------------------------------------------------- about */
export const ABOUT_POINTS = [
  "Scholarships, study programs, jobs and internships from around the world",
  "Essay writing, proofreading and application document support",
  "Financial aid applications and test preparation coaching",
  "Interview coaching and step-by-step application guidance",
];

export const PROCESS = [
  {
    step: "01",
    title: "Tell us your goal",
    text: "Degree, country, budget and deadline. A short call is enough for us to know what fits.",
  },
  {
    step: "02",
    title: "Get a shortlist",
    text: "We send you a small, realistic list of opportunities you actually qualify for.",
  },
  {
    step: "03",
    title: "Prepare the documents",
    text: "Statement, CV, references and transcripts — drafted, edited and checked line by line.",
  },
  {
    step: "04",
    title: "Apply with support",
    text: "We review every form before submission and track each deadline until you hear back.",
  },
];

export const STATS_FULL = [
  { value: "5,000+", label: "Students guided" },
  { value: "300+", label: "Scholarships listed" },
  { value: "40+", label: "Partner institutions" },
  { value: "94%", label: "Application success rate" },
];

/* ---------------------------------------------------------- testimonials */
export const TESTIMONIALS = [
  {
    featured: true,
    text: "I sincerely thank the team for their outstanding support with my Italian university admission, scholarship and visa application. Thanks to their guidance, I, UWAYEZU Jeannette, successfully secured admission, a scholarship and a student visa, and I am now pursuing my Master's degree at the University of Parma, Italy. I deeply appreciate their professionalism and dedication.",
    name: "UWAYEZU Jeannette",
    role: "Master's Student",
    university: "University of Parma, Italy",
  },
  {
    text: "My name is NSABIMANA Moise, and I sincerely thank the team for their amazing support. With their guidance I gained admission to the University of Cassino and Southern Lazio, Italy, secured a scholarship, and obtained my visa. It was a pleasure working with you.",
    name: "NSABIMANA Moise",
    role: "University Student",
    university: "University of Cassino and Southern Lazio, Italy",
  },
  {
    text: "I am so grateful for the help I received in securing a fully funded Mastercard scholarship at the University of Rwanda. Their support and guidance made my dream come true. Thank you for believing in me and giving me a chance to achieve a brighter future.",
    name: "Uwera Peace",
    role: "Scholarship Recipient",
    university: "University of Rwanda",
  },
  {
    text: "I am Ifeoluwa Oyebadejo Desmond from Nigeria. I was guided throughout the entire application process for Bachelor of Medicine and Surgery at the University of Rwanda, including preparation for the UCAT entrance exam, which I successfully passed. I'm very grateful and happy our paths crossed.",
    name: "Ifeoluwa Oyebadejo Desmond",
    role: "Medicine Student",
    university: "University of Rwanda",
  },
  {
    text: "What helped most was the document review. Every form was read properly before it went out, so nothing came back for missing information. I got three interview invitations from a single, properly submitted application.",
    name: "IRAKIZA Diane",
    role: "Engineering Student",
    university: "University of Kigali",
  },
  {
    text: "I had been rejected twice before finding this service. The shortlist was short and realistic, which was refreshing — no list of fifty impossible options. I got a full ride for my Master's in Europe.",
    name: "HABIMANA Olivier",
    role: "Postgraduate Student",
    university: "TU Delft, Netherlands",
  },
];

/* ------------------------------------------------------------------- faq */
export const FAQS = [
  {
    q: "Is applying through this platform really free?",
    a: "Browsing scholarships, reading the requirements and contacting us is free. Paid services are optional shortlisting and document-preparation support, and we always tell you in advance what a service costs before you commit to it.",
  },
  {
    q: "How do I know a scholarship is genuine?",
    a: "Every listing shows the awarding body, the level of study, the deadline and the key eligibility requirements. We never ask for payment to 'unlock' an application, and we flag anything that cannot be verified against the awarding institution's own website.",
  },
  {
    q: "What do I need to apply?",
    a: "Usually a completed application form, academic transcripts, a personal statement, proof of nationality and one or two recommendation letters. Each listing spells out the specific requirements for that opportunity.",
  },
  {
    q: "Can you write my personal statement for me?",
    a: "We will help you build it and review it line by line. The writing has to be yours — an essay written for you is usually detectable and often disqualifying. Coaching gets you a better result than ghostwriting ever would.",
  },
  {
    q: "How long does the process take?",
    a: "A straightforward application can be ready in two to three weeks. More complex cases involving research statements, portfolios or multiple institutions usually take four to six weeks.",
  },
  {
    q: "Do you help with visas once I am accepted?",
    a: "Yes. Document checklists, appointment booking guidance and a review of your visa file before submission are all part of the support we offer to students who have already secured a place.",
  },
  {
    q: "Which countries do you cover?",
    a: "Most of our listings are for the United Kingdom, Europe, North America, East Asia and Africa. If a country is not represented, ask us — new opportunities are added every week.",
  },
  {
    q: "How do I get started?",
    a: "Create an account, tell us your degree level, target country and deadline, and we will send you a shortlist. You can also message us directly from any listing on this site.",
  },
];

/* --------------------------------------------------------------- channels */
/* Every channel renders the supplied artwork in src/assets/icons/ rather than
   an inline SVG. Channels with an empty href are filtered out. */
export const CHANNELS = [
  {
    id: "phone",
    label: "Phone",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    icon: phoneIcon,
    color: "#0e77c2",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Message on WhatsApp",
    href: whatsappHref,
    icon: whatsappIcon,
    color: "#25d366",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    value: `@${CONTACT.instagram}`,
    href: CONTACT.instagramHref,
    icon: instagramIcon,
    color: "#e1306c",
    external: true,
  },
  {
    id: "x",
    label: "X",
    value: SOCIAL_LINKS.x.handle,
    href: SOCIAL_LINKS.x.href,
    icon: xIcon,
    color: "#0f1419",
    external: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    value: SOCIAL_LINKS.youtube.handle,
    href: SOCIAL_LINKS.youtube.href,
    icon: youtubeIcon,
    color: "#ff0000",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: emailIcon,
    color: "#f4b942",
  },
].filter((c) => c.href);

export const SOCIAL_CHANNELS = CHANNELS.filter((c) => c.external);

/* ---------------------------------------------------------- icon library */
export const ICONS = {
  quote:
    "M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z",
  cap: "M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z",
  star: "M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794.641c.058-.17.301-.17.359 0l.406 1.162a1.89 1.89 0 0 0 1.199 1.199L7.02 3.41c.17.058.17.301 0 .359l-1.262.407a1.89 1.89 0 0 0-1.199 1.199L3.953 6.537c-.058.17-.301.17-.359 0L3.187 5.375a1.89 1.89 0 0 0-1.199-1.199L.726 3.769a.18.18 0 0 1 0-.359l1.262-.406a1.89 1.89 0 0 0 1.199-1.199z",
  calendar:
    "M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z",
  pen: "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z",
  file: "M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h1V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z",
  mail: "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z",
  chat: "M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1zM5 4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z",
  briefcase:
    "M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5M1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5z",
  arrow:
    "M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8",
  chevL: "M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0",
  chevR: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708",
  up: "M8 3.5a.5.5 0 0 1 .854.354L11.207 6H14.5a.5.5 0 0 1 .4.8l-6.5 7.5a.5.5 0 0 1-.8 0l-6.5-7.5a.5.5 0 0 1 .4-.8h3.293L7.146 3.854A.5.5 0 0 1 8 3.5z",
  check:
    "M16 11.03a1 1 0 0 1-1.4.9l-4.1-3.36a1 1 0 0 0-1.2 0L3.6 14.53a1 1 0 0 1-1.4-1.4l6.4-5.2a1 1 0 0 1 1.2 0l4.1 3.36 4.7-3.84a1 1 0 0 1 1.4.18z",
  info: "M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
  close:
    "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.292l2.646-2.646a.5.5 0 0 1 .708.708L8.708 8l2.646 2.646a.5.5 0 0 1-.708.708L8 8.708l-2.646 2.646a.5.5 0 0 1-.708-.708L7.292 8 4.646 5.354a.5.5 0 0 1 0-.708z",
  phone:
    "M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z",
  whatsapp:
    "M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.048 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.048-3.204-.007-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.06 1.277.261 2.148.558 2.913a4.9 4.9 0 0 0 1.384 2.126A4.9 4.9 0 0 0 4.14 22.37c.766.296 1.637.499 2.913.558C8.333 23.988 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558a4.9 4.9 0 0 0 2.127-1.384 4.9 4.9 0 0 0 1.384-2.127c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.668-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a4.9 4.9 0 0 0-1.384-2.126A4.9 4.9 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.259 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.047 1.17.054 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.033 1.266.046 1.646.046 4.85s-.015 3.585-.048 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.048-1.649.06-4.859.06-3.211 0-3.586-.015-4.859-.06-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.323 6.162 6.162 0 0 0 0-12.323zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  clock:
    "M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0zm7-3.25a.5.5 0 0 0-1 0v3.4c0 .16.08.31.21.4l2.5 1.8a.5.5 0 0 0 .58-.8L8.5 7.9V4.75z",
  filter: "M1.5 1h13a.5.5 0 0 1 .38.81L9 7.83V13a.5.5 0 0 1-.78.41l-2.5-1.5a.5.5 0 0 1-.22-.41V7.83L1.12 1.81A.5.5 0 0 1 1.5 1z",
  search:
    "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.44.31.98.85l3.127 3.127a.75.75 0 0 0 1.061-1.06l-3.127-3.128a5 5 0 0 0-.64-.582zM12.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z",
  play: "M11.596 8.49l-6.77 3.8a.5.5 0 0 1-.76-.43V4.14a.5.5 0 0 1 .76-.43l6.77 3.8a.5.5 0 0 1 0 .98z",
  globe:
    "M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM5.78 8.75a9.6 9.6 0 0 1 0-1.5h4.44a16.3 16.3 0 0 1 0 1.5zm.6 1.5a8.5 8.5 0 0 0 4.12 0l.68 1.02A6.7 6.7 0 0 1 7.4 14.4zm0-3a8.5 8.5 0 0 1-.68-1.5H2.22a6.7 6.7 0 0 1 3.4-2.97zM2.22 5.75h4.16a16.3 16.3 0 0 1 0-1.5 6.7 6.7 0 0 0-3.4 2.97zm6.52 5.02a6.7 6.7 0 0 1 3.4-2.97h-4.16a16.3 16.3 0 0 0 0 1.5zm-2.28-5.02a16.3 16.3 0 0 1 0-1.5H2.3a6.7 6.7 0 0 1 3.4-2.97 8.5 8.5 0 0 0 .68 1.5zm3.06.8h4.16a6.7 6.7 0 0 0-3.4 2.97 16.3 16.3 0 0 0 0-1.5zM7.4 1.6A6.7 6.7 0 0 0 4 4.57h4.16a16.3 16.3 0 0 0 0 1.5z",
  lock: "M4.5 3a3.5 3.5 0 1 1 4.78 3.24V8h.72a1.5 1.5 0 0 1 1.5 1.5v3.5A1.5 1.5 0 0 1 10 14.5H6a1.5 1.5 0 0 1-1.5-1.5V9.5A1.5 1.5 0 0 1 6 8h.72V6.24A3.5 3.5 0 0 1 4.5 3z",
  home: "M6.445 1.154a1.75 1.75 0 0 1 2.11 0L14.78 6.1a.75.75 0 0 1 .22.53v6.87a1.75 1.75 0 0 1-1.75 1.75H2.75A1.75 1.75 0 0 1 1 13.5V6.63a.75.75 0 0 1 .22-.53z",
};

/* --------------------------------------------------------------- helpers */
export const formatDate = (iso) => {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* Days remaining until a deadline; negative once it has passed. */
export const daysUntil = (iso) => {
  const d = new Date(`${iso}T23:59:59`);
  if (Number.isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
};

export const todayLong = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
