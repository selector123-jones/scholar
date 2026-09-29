/* ==========================================================================
   News & announcements.

   Every item carries the five fields the admin form manages:
     country, university, upload (cover image), text, year

   The seed list below is what ships with the site. Anything added or edited
   in /admin is stored in the browser (see src/store/newsStore.js) and layered
   on top of this list, so the seed data stays intact after a reset.
   ========================================================================== */

import { coverFor } from "./site";

const NEWS = [
  {
    id: "n1",
    country: "United Kingdom",
    university: "University of Edinburgh",
    year: "2026",
    title: "Commonwealth Scholarships open for 2026 intake",
    text: "Applications are open for the 2026 Commonwealth Master's and PhD Scholarships. The Higher Education Council shortlists Rwandan citizens with a Bachelor's degree and at least two years of relevant work experience. English certification is required where the awarding institution asks for it.",
    upload: coverFor("United Kingdom", 0, "University"),
    featured: true,
    date: "2026-09-25",
  },
  {
    id: "n2",
    country: "Algeria",
    university: "Universités d'Algérie",
    year: "2026",
    title: "Government scholarships open across all faculties",
    text: "Government-funded places are available for the 2026/2027 academic year across degree programmes. Applicants need a nationality certificate, proof of their last qualification and a copy of their national identity card.",
    upload: coverFor("Algeria", 1, "University"),
    featured: false,
    date: "2026-09-25",
  },
  {
    id: "n3",
    country: "Rwanda",
    university: "Rwanda Polytechnic",
    year: "2026",
    title: "Year One applications now open",
    text: "Diploma and technical programmes are open for Year One for the 2026–2027 academic year. Bring your secondary certificate, official transcript, national identity card and four passport photos.",
    upload: coverFor("Rwanda", 2, "University"),
    featured: false,
    date: "2026-09-24",
  },
  {
    id: "n4",
    country: "South Korea",
    university: "Korean Government Scholarship (GKS-U)",
    year: "2027",
    title: "Fully funded undergraduate awards for 2027",
    text: "A fully funded Korean Government scholarship covering tuition, living costs and settlement allowance. Open to international students who meet the academic and health requirements for the programme track.",
    upload: coverFor("South Korea", 3, "University"),
    featured: true,
    date: "2026-09-15",
  },
  {
    id: "n5",
    country: "Mauritius",
    university: "African Leadership College of Higher Education",
    year: "2027",
    title: "February 2027 intake now accepting applications",
    text: "Applications are open for the February 2027 intake of the Mastercard Foundation Scholars Program. A Bachelor's degree, a strong academic record and a commitment to community impact are expected.",
    upload: coverFor("Mauritius", 4, "University"),
    featured: false,
    date: "2026-09-18",
  },
  {
    id: "n6",
    country: "South Africa",
    university: "University of Cape Town",
    year: "2027",
    title: "Postgraduate bursary programme for African students",
    text: "A fully funded bursary covering tuition, accommodation and a monthly stipend. Applicants need a Bachelor's degree with a minimum 60% average, proof of financial need and two academic referee reports.",
    upload: coverFor("South Africa", 5, "University"),
    featured: false,
    date: "2026-09-12",
  },
];

/* Sorted alphabetically at load so the admin dropdown can never drift out of
   order as countries are added. "Other" is pinned to the bottom because it is
   a fallback, not a place. */
const COUNTRY_LIST = [
  "Algeria",
  "Australia",
  "Canada",
  "China",
  "France",
  "Germany",
  "Ireland",
  "Japan",
  "Kenya",
  "Mauritius",
  "Netherlands",
  "Nigeria",
  "Rwanda",
  "South Africa",
  "South Korea",
  "United Kingdom",
  "United States",
  "Other",
];

export const NEWS_COUNTRIES = [
  ...COUNTRY_LIST.filter((c) => c !== "Other").sort((a, b) => a.localeCompare(b)),
  "Other",
];

export const NEWS_YEARS = ["2026", "2027", "2028", "2029"];

export const EMPTY_NEWS = {
  id: "",
  title: "",
  country: "Rwanda",
  university: "",
  year: "2026",
  text: "",
  upload: "",
  featured: false,
  date: new Date().toISOString().slice(0, 10),
};

/* The shape the admin form validates against. Keep this list in sync with
   the form fields in src/pages/Admin.jsx. */
export const NEWS_FIELDS = [
  { key: "title", label: "Headline", type: "text", required: true },
  { key: "country", label: "Country", type: "select", required: true },
  { key: "university", label: "University", type: "text", required: true },
  { key: "year", label: "Year", type: "select", required: true },
  { key: "text", label: "Details", type: "textarea", required: true },
  { key: "upload", label: "Cover image", type: "image", required: true },
];

export default NEWS;
