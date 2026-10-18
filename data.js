
/* ============================================================
   SITE CONTENT — this is the only file you should need to edit
   for day‑to‑day updates (new paper, new talk, new award...).
   Everything below is plain JavaScript objects and arrays.
   Keep the commas between entries, and you can't break anything
   the HTML/CSS relies on.
   ============================================================ */

const SITE = {
  name: "Ankana Dey",
  title: "Ph.D. Researcher",
  dept: "Department of Mathematics and Statistics",
  university: "University of Ottawa",
  office: "STEM Complex (STM) 507",
  email_formatted: "adey098-at-uottawa-dot-ca",
  tagline: "Ecological Statistics · Statistical Learning · Bayesian Networks · Spatiotemporal Modeling",
  location: "Ottawa, Ontario, Canada",
  email: "",
  phone: "",
  lastUpdated: "October 03, 2026",
  links: {
    scholar: "",
    github: "",
    cv: "assets/Ankana_Dey_CV.pdf",
    orcid: "",
    linkedin: ""
  },
  about: [
    "My research focuses on statistical learning and ecological applications, with particular interests in Bayesian networks, spatiotemporal modeling, species-distribution modeling, and scalable scientific computing."
  ],
  openings: ""
};

// ---- Research interests -------------------------------------------------
const RESEARCH_AREAS = [
  {
  title: "Ecological & Environmental Statistics",
  body: "Statistical modeling of forest disturbances, species distributions, environmental risk and management, and ecological dynamics across space and time."
},
  {
    title: "Statistical & Machine Learning",
    body: "Interpretable and uncertainty-aware predictive modeling, graphical models, Bayesian networks, reinforcement learning, and data-driven decision-making."
  },
  {
    title: "Computational Statistics for Complex Data",
    body: "Analysis of large geospatial and spatiotemporal datasets, scalable data integration, high-performance computing, and reproducible workflows for scientific applications."
},
];

// ---- News (short-form, most recent first) --------------------------------
// Add a new object to the TOP of this array whenever something happens.
const NEWS = [
  {
    date: "2026-10",
    text: "Oral presentation accepted for 69th National Forest Pest Management Forum, organized by Natural Resources Canada (NRCan) and the Canadian Institute of Forestry (CIF)."
  },
  {
    date: "2026-09",
    text: "Elected Vice-President, Media and Communication of the Mathematics and Statistics Graduate Student Association (MSGSA), University of Ottawa."
  },
  {
    date: "2026-08",
    text: "Oral presentation accepted for ISEC 2027: Early-Season Forecasting of Forest Defoliation and Its Key Drivers."
  },
  {
    date: "2026-08",
    text: "Completed a research internship at the University of Toronto under the supervision of Prof. Jude Dzevela Kong, focusing on presence-only species distribution modeling and machine learning."
  },
  {
    date: "2026-02",
    text: "Completed an Inter Math-AI Program internship at Natural Resources Canada (NRCan) under the supervision of Jean-Noël Candau, working on remote sensing, geospatial data, and machine learning."
  },
  {
    date: "2025-09",
    text: "Successfully completed the Advanced Comprehensive Examination in the Ph.D. program at the University of Ottawa."
  },
  {
    date: "2024-09",
    text: "Received the Inter Math-AI Program Fellowship through the CREATE Interdisciplinary Math and Artificial Intelligence Program."
  },
  {
    date: "2023-09",
    text: "Started the Ph.D. program at the University of Ottawa."
  },
  {
    date: "2023-08",
    text: "Successfully defended my research-based M.Sc. thesis at Université de Sherbrooke."
  },
  {
    date: "2023-03",
    text: "Abstract accepted for a contributed talk at the Statistical Society of Canada Annual Meeting."
  },
  {
    date: "2023-05",
    text: "Received the Québec Centre for Biodiversity Science Excellence Award."
  }
];

// ---- Education ------------------------------------------------------------
const EDUCATION = [
  {
    degree: "Ph.D. in Statistics",
    school: "Department of Mathematics and Statistics, University of Ottawa, Canada",
    schoolUrl: "https://www.uottawa.ca/faculty-science/mathematics-statistics",
    years: "2023–Present",
    detail: "Research interests: Statistical ecology, Machine learning, Reinforcement learning and Large-scale data analysis.",
    advisor: "Prof. Frithjof Lutscher",
    advisorUrl: "https://uniweb.uottawa.ca/sites/Frithjof-Lutscher"
  },
  {
  degree: "Research-based M.Sc. in Mathematics (Pathway in Statistics)",
  school: "Département de mathématiques, Université de Sherbrooke, Canada",
  schoolUrl: "https://www.usherbrooke.ca/mathematiques/",
  years: "2021–2023",
  detail: "Thesis: Adapting Metacommunity Theory for the Human Microbiome.\nResearch interests: Metacommunity theory, mathematical and statistical modelling, Bayesian inference, and differential equations.",
  advisor: "Prof. F. Guillaume Blanchet",
  advisorUrl: "https://www.usherbrooke.ca/biologie/nous-joindre/personnel/corps-professoral/ecologie-terrestre/guillaume-blanchet"
},
  {
    degree: "B.Sc.–M.Sc. in Mathematics",
    school: "Visva-Bharati University, India",
    schoolUrl: "https://www.visvabharati.ac.in/",
    years: "2015–2020",
    detail: "",
    advisor: "",
    advisorUrl: ""
  }
];

// ---- Appointments / research experience (for the timeline) ---------------
const APPOINTMENTS = [
  {
    role: "Internship | University of Toronto, Canada",
    place: "Presence-Only Species Distribution Modeling and Machine Learning",
    placeUrl: "",
    location: "",
    years: "May–Aug 2026"
  },
  {
    role: "Internship | Inter Math-AI Program, Natural Resources Canada",
    place: "Remote Sensing Geospatial Data and Machine Learning",
    placeUrl: "",
    location: "",
    years: "Oct 2025–Feb 2026"
  },
  {
    role: "IMA CREATE Fellow",
    place: "University of Ottawa",
    roleUrl: "https://intermath.ai/",
    location: "Canada",
    years: "Sept 2024–Aug 2026"
  },
  {
    role: "Working Group Researcher | University of British Columbia, Canada",
    place: "Canadian Institute of Ecology and Evolution – Living Data Project",
    roleUrl: "https://www.ciee-icee.ca/wg4.html",
    location: "",
    years: "20–24 Feb 2023"
  },
  {
    role: "Summer Student | Mont Orford National Park, Canada",
    place: "BIOS2 Summer School",
    roleUrl: "https://bios2.usherbrooke.ca/2022/10/27/summer-2022/",
    location: "",
    years: "22–26 Aug 2022"
  }
];


// ---- Publications -----------------------------------------------------
// type: "journal" | "review" | "preprint"
const PUBLICATIONS = [
  {
    type: "preprint",
    authors: "Dey, A., Blanchet, F. G.",
    title: "Adapting metacommunity theory to the human gastrointestinal microbiome",
    venue: "Preprint",
    year: 2026,
    url: ""
  },
  {
    type: "preprint",
    authors: "Dey, A., Movahedi Nia, Z., Kong, J. D.",
    title: "When Urban Predictors Predict Surveillance: Rethinking Presence-Only Suitability Models for Anopheles stephensi in Africa",
    venue: "Preprint",
    year: 2026,
    url: ""
  }
];

// ---- Presentations & Invited Talks (most recent first) --------------------
const PRESENTATIONS = [
  {
    title: "Early-Season Forecasting of Forest Defoliation and Its Key Drivers (Upcoming)",
    venue: "The International Statistical Ecology Conference (ISEC), University of Yucatán, México",
    kind: "Talk",
    year: 2027
  },
  {
    title: "What Do Urban Predictors Really Capture in  <em>Anopheles stephensi</em> Suitability Models? (Upcoming)",
    venue: "Artificial Intelligence and Mathematical Modelling Lab (AIMMLab), University of Toronto, Canada",
    kind: "Invited",
    year: 2026
  },
  {
    title: "Predicting Eastern Spruce Budworm defoliation risk: What 40 years of data tell us about its key drivers (Upcoming)",
    venue: " 69-th National Forest Pest Management Forum, Ottawa, Canada",
    kind: "Talk",
    year: 2026
  },
  {
    title: "When Urban Predictors Predict Surveillance: Rethinking Presence-Only Suitability Models for <em>Anopheles stephensi</em> in Africa (Upcoming)",
    venue: "Applied Math Seminar, University of Ottawa, Canada",
    kind: "Talk",
    year: 2026
  },
  {
    title: "New challenges and new faces in mathematical ecology (Minisymposia)",
    venue: "Canadian Society of Applied and Industrial Mathematics Annual Meeting, Queen’s University, Canada",
    kind: "Talk",
    year: 2024
  },
  {
    title: "Metacommunity Theory : Adapting for the Human Microbiome",
    venue: "Canadian Mathematical Society Summer Meeting, University of Ottawa, Canada",
    kind: "Talk",
    year: 2023
  },
  {
    title: "Modelling the Human Microbiome using Metacommunity Theory",
    venue: "Statistical Society of Canada Annual Meeting, Carleton University, Canada",
    kind: "Talk",
    year: 2023
  }
];

// ---- Teaching ---------------------------------------------------------
// To link a future course webpage, add: page: "courses/stat-151.html"
const TEACHING = [
  { course: "Calculus I (MAT1320)", place: "Department of Mathematics and Statistics, University of Ottawa", term: "Fall 2026", role: "Teaching Assistant" },
  { course: "Introduction to Dynamical Systems (MAT3130)", place: "Department of Mathematics & Statistics, University of Ottawa", term: "Fall 2026", role: "Grader" },

  { course: "Calculus II (MAT1322)", place: "Department of Mathematics and Statistics, University of Ottawa", term: "Summer 2026", role: "Teaching Assistant" },
  { course: "Calculus for the Life Sciences II (MAT1332)", place: "Department of Mathematics & Statistics, University of Ottawa", term: "Summer 2026", role: "Grader" },

  { course: "Calculus for the Life Sciences II (MAT1332)", place: "Department of Mathematics and Statistics, University of Ottawa", term: "Winter 2026", role: "Teaching Assistant" },

  { course: "Calculus for the Life Sciences I (MAT1330)", place: "Department of Mathematics and Statistics, University of Ottawa", term: "Fall 2025", role: "Teaching Assistant" },

  { course: "Applied Linear Algebra (MAT3341)", place: "Department of Mathematics & Statistics, University of Ottawa", term: "Summer 2024", role: "Grader" },
  { course: "Ordinary Differential Equations (MAT2384)", place: "Department of Mathematics & Statistics, University of Ottawa", term: "Winter 2024", role: "Grader" },

  { course: "Introduction of Linear Algebra (MAT1341)", place: "Department of Mathematics & Statistics, University of Ottawa", term: "Fall 2023, Winter 2024, Winter 2026", role: "Grader" },

  { course: "Introduction of Linear Algebra (MAT1341)", place: "Department of Mathematics & Statistics, University of Ottawa", term: "Fall 2023, Winter 2024", role: "Teaching Assistant" },

  { course: "Integral Calculus", place: "Département de mathématiques, Université de Sherbrooke", term: "Summer 2023", role: "Grader" },
  { course: "Elements of Mathematics", place: "Département de mathématiques, Université de Sherbrooke", term: "Fall 2022", role: "Grader" }
];

const TEACHING_CERTS = [];

// ---- Mentorship ---------------------------------------------------------
const MENTORSHIP = [];

// ---- Photo gallery -------------------------------------------------------


const GALLERY = [
  {
    image: "assets/gallery/CAIMSFrithjofLab.jpg",
    alt: "Group photo from the IVADO Thematic Semester 2026 in Montréal",
    caption: "Lutscher Lab at CAIMS - theoretical ecologists in action! (June, 2024)"
  },
  {
    image: "assets/gallery/ConvocationAnkanaMSC.jpg",
    alt: "Photo with Bei Jiang and Linglong Kong",
    caption: "Convocation day at Université de Sherbrooke. (September, 2024)"
  },
  {
    image: "assets/gallery/ssc2023.jpg",
    alt: "Photo with Bei Jiang and Linglong Kong",
    caption: "The UdeS Statistics team at the Statistical Society of Canada Annual Meeting. (May, 2023)"
  },
  {
    image: "assets/gallery/dinner defence.jpg",
    alt: "Photo with PhD supervisor Éric Marchand",
    caption: "Cherishing the Journey: Toasting to graduation. Capturing this moment, we embrace the end of one journey and the beginning of the next, surrounded by the wisdom and warmth of our beloved professors. (August, 2023)"
  },
  {
    image: "assets/gallery/lab defence.jpg",
    alt: "PhD convocation at the Université de Sherbrooke",
    caption: "Celebrating the successful defense of my Master's thesis with this incredible team of thinkers (Laboratoire de Biologie Quantitative). (August, 2023)"
  },
  {
    image: "assets/gallery/ssc1.png",
    alt: "Blackboard during a research visit to Rutgers University",
    caption: "Gala dinner at the SSC Annual Meeting with friends from Université de Sherbrooke - a fun evening together! (May, 2023)"
  },
  {
    image: "assets/gallery/CIEEImg.jpg",
    alt: "Jiang–Kong Lab members at a hot pot dinner in Edmonton",
    caption: "At the CIEE Living Data Project in Vancouver, British Columbia, working on the theme Linking Species Distributions and Traits to Understand Ecosystem Functioning. (February 2023)"
  },
  {
    image: "assets/gallery/BIOS2Img.jpeg",
    alt: "Discussion meeting with Ed",
    caption: "At the BIOS² Summer School in Mont-Orford National Park, Québec, Canada. (August 2022)"
  }
];

// ---- Awards & Honors (grouped) ------------------------------------------
const AWARDS = {
  "Scholarships & Fellowships": [
    "Inter Math-AI Program Fellowship, Interdisciplinary Math and Artificial Intelligence Program (CREATE) (2024–2026)",
    "Doctoral Admission Scholarship, Department of Mathematics & Statistics, University of Ottawa (2023–2027)",
    "International Admission Scholarship, Department of Mathematics & Statistics, University of Ottawa (2023–2028)"
  ],
  "Awards & Distinctions": [
    "Québec Centre for Biodiversity Science Excellence Award, Centre de la Science de la Biodiversité du Québec (2023)",
    "Valorisation des travaux étudiants: concours, Département de mathématiques, Université de Sherbrooke (2023)"
  ],
  "Travel Awards & Grants": [
    "Institut des sciences mathématiques (ISM) Travel Grant, UQAM, Montréal (2022)",
    "Computational Biodiversity Science and Services (BIOS2) Travel Award, BIOS2 (2022–2023)"
  ]
};

// ---- Service, grants, outreach -------------------------------------------
const SERVICE = [
  "Vice-President, Media and Communication, Mathematics and Statistics Graduate Student Association (MSGSA) (2026–2027)",
  "Member, Mathematics and Statistics Graduate Student Association (MSGSA) (2023–2028)",
  "Independent Fellow, Computational Canada Biodiversity Science and Services (BIOS2) (2021–2023)",
  "Student Member, Québec Center for Biodiversity Science Canada (2021–2023)",
  "Volunteer, National Service Scheme, India (2013–2018)"
];

const GRANTS = [];

const OUTREACH = [];

const MEMBERSHIPS = [];

