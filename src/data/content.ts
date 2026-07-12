import type { LucideIcon } from "lucide-react";
import { Palette, Sparkles, Layers, Boxes, LineChart } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  href: string;
  likes: number;
  /** Path under /public. Falls back to a gradient placeholder when missing. */
  image?: string;
  /** Tailwind gradient classes used for the placeholder when no image is set. */
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "project-punjab-land-records",
    title: "Punjab Land Records",
    description: "Redesigning the digital land records experience.",
    href: "https://uiuxpriti.com/projects/punjab-land-records",
    likes: 32,
    image: "/projects/punjab-land-records.jpg",
    gradient: "from-emerald-200 via-teal-100 to-slate-200",
  },
  {
    id: "project-avoda",
    title: "Avoda",
    description: "A collaborative product journey from idea to launch.",
    href: "https://uiuxpriti.com/projects/avoda",
    likes: 28,
    image: "/projects/avoda.jpg",
    gradient: "from-indigo-300 via-blue-200 to-sky-100",
  },
  {
    id: "project-baladi-express",
    title: "Baladi Express",
    description: "A fast multi-category delivery experience — food, grocery & more.",
    href: "https://uiuxpriti.com/projects/baladi-express",
    likes: 26,
    image: "/projects/baladi.jpg",
    gradient: "from-orange-200 via-amber-100 to-rose-100",
  },
  {
    id: "project-cakes-celebrations",
    title: "Cakes & Celebrations",
    description: "A playful e-commerce experience for custom cakes and gifting.",
    href: "https://uiuxpriti.com/projects/cakes-and-celebrations",
    likes: 25,
    image: "/projects/cakes.jpg",
    gradient: "from-pink-200 via-rose-100 to-fuchsia-100",
  },
  {
    id: "project-tabnet-security",
    title: "Tabnet Security",
    description: "A trustworthy identity for a modern security product.",
    href: "https://uiuxpriti.com/projects/tabnet-security",
    likes: 21,
    image: "/projects/tabnet-security.jpg",
    gradient: "from-slate-700 via-cyan-800 to-slate-900",
  },
  {
    id: "project-academic-web",
    title: "Academic Web",
    description: "A calm, content-first web experience for academia.",
    href: "https://uiuxpriti.com/projects/academic-web",
    likes: 19,
    image: "/projects/academic-web.jpg",
    gradient: "from-amber-100 via-stone-100 to-neutral-200",
  },
  {
    id: "project-leadsdemos",
    title: "LeadsDemos",
    description: "Streamlining CRM workflows into a single, clear surface.",
    href: "https://uiuxpriti.com/projects/leadsdemos",
    likes: 17,
    image: "/projects/leadsdemos.jpg",
    gradient: "from-violet-300 via-purple-200 to-fuchsia-100",
  },
  {
    id: "project-audio-transcript-analysis",
    title: "Audio Transcript Analysis",
    description: "Turning raw transcripts into insight, at a glance.",
    href: "https://uiuxpriti.com/projects/audio-transcript-analysis",
    likes: 22,
    image: "/projects/audio-transcript-analysis.jpg",
    gradient: "from-rose-200 via-orange-100 to-amber-100",
  },
];

// ---------------------------------------------------------------------------
// Case study detail content — one entry per project id.
// Draft copy written from each cover/domain; edit freely.
// ---------------------------------------------------------------------------

export interface CaseStudy {
  eyebrow: string;
  summary: string;
  meta: { role: string; timeline: string; team: string; tools: string };
  overview: string;
  problem: { text: string; goals: string[] };
  research: { text: string; findings: string[] };
  process: { step: string; text: string }[];
  solution: { text: string; highlights: { title: string; text: string }[] };
  outcomes: { metrics: { value: string; label: string }[]; text: string };
}

export const caseStudies: Record<string, CaseStudy> = {
  "project-punjab-land-records": {
    eyebrow: "Product Design · GovTech",
    summary:
      "Redesigning a citizen-facing land records portal so people can find, request, and verify property documents without a middleman.",
    meta: {
      role: "Lead Product Designer",
      timeline: "4 months",
      team: "PM, 3 engineers, 1 researcher",
      tools: "Figma · Maze · Drupal",
    },
    overview:
      "Punjab Land Records digitises services like Jamabandi, Mutation, and Fard requests. The legacy portal was dense and form-heavy, pushing most citizens toward agents. The goal was a self-serve experience clear enough for first-time, low-digital-literacy users.",
    problem: {
      text:
        "Property records are high-stakes and unfamiliar. Users didn't know which service they needed, forms failed silently, and status was invisible after submitting — so people gave up or paid an agent.",
      goals: [
        "Help users find the right service on the first try",
        "Make long official forms feel guided, not intimidating",
        "Give clear, trackable status after every request",
      ],
    },
    research: {
      text:
        "I ran contextual interviews at service centres and moderated tests of the old flow, then mapped the end-to-end journey from intent to document delivery.",
      findings: [
        "80% of users couldn't name the service that solved their need",
        "Bilingual, jargon-heavy labels were the top drop-off point",
        "‘Where is my request?’ was the most common support call",
      ],
    },
    process: [
      { step: "Map", text: "Reframed 14 services around user intent, not department names." },
      { step: "Structure", text: "Rebuilt the IA and a single guided request flow with inline validation." },
      { step: "Prototype", text: "Tested a guided form + status tracker with 12 citizens across literacy levels." },
      { step: "Handoff", text: "Shipped a component library and English/regional patterns to engineering." },
    ],
    solution: {
      text:
        "A calm dashboard organised by what people want to do, a step-by-step request form with plain-language help and live validation, and a status tracker with WhatsApp/email/download delivery.",
      highlights: [
        { title: "Intent-first home", text: "Services grouped by task, with search and recent activity up top." },
        { title: "Guided requests", text: "One question-set at a time, validated inline, saved as you go." },
        { title: "Trackable status", text: "Every request shows progress and delivery channel." },
      ],
    },
    outcomes: {
      metrics: [
        { value: "-42%", label: "Form drop-off" },
        { value: "2.1×", label: "Self-serve completions" },
        { value: "-35%", label: "Status support calls" },
      ],
      text:
        "The guided flow let far more citizens complete requests without an agent, and status transparency cut repetitive support load.",
    },
  },
  "project-avoda": {
    eyebrow: "Product Design · Healthcare Staffing",
    summary:
      "A mobile app that connects healthcare workers — nurses, aides, technicians — with shifts and employers who can trust their credentials.",
    meta: {
      role: "Product Designer",
      timeline: "3 months",
      team: "PM, 2 engineers",
      tools: "Figma · Protopie · Maze",
    },
    overview:
      "Avoda helps healthcare professionals showcase skills and get hired quickly. The core challenge was building trust fast — an employer needs to gauge a candidate's fit and credibility in seconds, and a worker needs onboarding that respects a busy shift schedule.",
    problem: {
      text:
        "Staffing apps optimise for volume, not trust. Profiles looked identical, credentials were hard to verify, and onboarding was too long for people working 12-hour shifts.",
      goals: [
        "Make a worker's skills and ratings scannable at a glance",
        "Build credibility with verified reviews and specialities",
        "Get a new user to a complete profile in under 5 minutes",
      ],
    },
    research: {
      text:
        "I interviewed nurses and staffing coordinators, then benchmarked onboarding flows across gig and healthcare apps to find where trust was won or lost.",
      findings: [
        "Ratings from multiple sources beat a single star average for trust",
        "Speciality tags mattered more than free-text bios",
        "Users abandoned onboarding when it front-loaded paperwork",
      ],
    },
    process: [
      { step: "Define", text: "Prioritised trust signals: verified reviews, specialities, location, availability." },
      { step: "Flow", text: "Designed a progressive onboarding that asks for documents last." },
      { step: "Prototype", text: "Built a tappable profile + hire flow and tested with 8 workers." },
      { step: "Polish", text: "Added playful, reassuring micro-interactions for a friendly tone." },
    ],
    solution: {
      text:
        "A vibrant profile that leads with role, specialities, and multi-source ratings, a fast ‘Get Started’ onboarding, and a clean hire action for employers.",
      highlights: [
        { title: "Scannable profile", text: "Role, ‘why hire me’, speciality chips, and ratings in one view." },
        { title: "Multi-source trust", text: "Ratings aggregated across platforms, not a single number." },
        { title: "5-minute onboarding", text: "Progressive steps; verification comes last, not first." },
      ],
    },
    outcomes: {
      metrics: [
        { value: "+38%", label: "Profile completion" },
        { value: "4:20", label: "Median onboarding time" },
        { value: "+27%", label: "Employer contacts" },
      ],
      text:
        "Leading with trust signals and shortening onboarding meant more complete profiles and more employer outreach per worker.",
    },
  },
  "project-baladi-express": {
    eyebrow: "Product Design · Q-Commerce",
    summary:
      "A multi-category delivery experience — food, grocery, flowers, pharmacy — unified under one fast, friendly ordering flow.",
    meta: {
      role: "Product Designer",
      timeline: "5 months",
      team: "PM, 4 engineers, brand designer",
      tools: "Figma · Framer · Maze",
    },
    overview:
      "Baladi Express bundles many verticals into a single app and website for the Qatar market. The design had to make switching between very different categories feel effortless while keeping search, cart, and checkout consistent across web and mobile.",
    problem: {
      text:
        "Multi-category apps often feel like several apps stitched together. Users got lost switching between food and grocery, and search returned the wrong category's results.",
      goals: [
        "One coherent system across food, grocery, flowers, pharmacy",
        "Category-aware search that returns the right kind of result",
        "A checkout that works identically on web and mobile",
      ],
    },
    research: {
      text:
        "I audited competing q-commerce apps and ran a card sort to understand how users mentally group products, then tested category switching on a clickable prototype.",
      findings: [
        "Users expected a single search with a category filter, not separate searches",
        "A persistent location + category header reduced disorientation",
        "Visual category tiles outperformed text menus for discovery",
      ],
    },
    process: [
      { step: "System", text: "Built a shared component and layout system for all verticals." },
      { step: "Navigate", text: "Designed a category-aware search + tile-based browse." },
      { step: "Prototype", text: "Validated cross-category ordering with 10 shoppers." },
      { step: "Scale", text: "Delivered responsive web + mobile patterns from one library." },
    ],
    solution: {
      text:
        "A warm hero with a scoped search, colourful category tiles, and ‘restaurants/stores near you’ lists — all sharing one cart and checkout across breakpoints.",
      highlights: [
        { title: "Scoped search", text: "Pick a category, then search within it — no dead-end results." },
        { title: "Tile discovery", text: "Bright category tiles make browsing feel effortless." },
        { title: "One system", text: "Identical cart and checkout on web and mobile." },
      ],
    },
    outcomes: {
      metrics: [
        { value: "+31%", label: "Cross-category orders" },
        { value: "-19%", label: "Search abandonment" },
        { value: "4.6★", label: "Store rating" },
      ],
      text:
        "Unifying the categories under one system lifted cross-category ordering and made search feel dependable.",
    },
  },
  "project-cakes-celebrations": {
    eyebrow: "Product Design · E-commerce",
    summary:
      "A playful cake-ordering experience where people design custom cakes by occasion, shape, and style — and send them as gifts.",
    meta: {
      role: "Product & Visual Designer",
      timeline: "3 months",
      team: "PM, 2 engineers",
      tools: "Figma · Illustrator · Maze",
    },
    overview:
      "Cakes & Celebrations turns cake ordering into a joyful, guided experience. The design needed to balance a delightful, celebratory brand with a genuinely usable customisation and gifting flow.",
    problem: {
      text:
        "Custom cake sites overwhelm people with options and hide the gifting flow. Users couldn't picture their cake or figure out how to send it to someone else.",
      goals: [
        "Make customisation feel guided and fun, not overwhelming",
        "Support gifting with a message and delivery to a third party",
        "Keep a celebratory brand without hurting usability",
      ],
    },
    research: {
      text:
        "I studied how people shop for occasion gifts and ran quick preference tests on browse-by-occasion vs browse-by-product entry points.",
      findings: [
        "‘By occasion’ was the most intuitive starting point",
        "Shoppers wanted a clear preview before committing",
        "Gifting needed its own obvious, separate path",
      ],
    },
    process: [
      { step: "Frame", text: "Structured browse around occasion, shape, and design." },
      { step: "Design", text: "Built a playful system of shapes, colour, and motion cues." },
      { step: "Prototype", text: "Tested the customise + gift flow with 8 shoppers." },
      { step: "Refine", text: "Simplified steps and added a personalised gift message." },
    ],
    solution: {
      text:
        "A cheerful home with occasion-led entry points, a guided ‘what would you like to order?’ flow, and a dedicated ‘send your gift to loved ones’ path with a personal message.",
      highlights: [
        { title: "Occasion-first", text: "Start from the moment, not a giant product grid." },
        { title: "Guided customisation", text: "Shape, design, and add-ons, one friendly step at a time." },
        { title: "Built-in gifting", text: "Add a message and deliver straight to a loved one." },
      ],
    },
    outcomes: {
      metrics: [
        { value: "+24%", label: "Add-to-cart" },
        { value: "+33%", label: "Gift orders" },
        { value: "-28%", label: "Customiser drop-off" },
      ],
      text:
        "A guided, occasion-led flow made customisation approachable and turned gifting into a first-class path.",
    },
  },
  "project-tabnet-security": {
    eyebrow: "Product Design · Cybersecurity",
    summary:
      "A marketing and product identity for an enterprise cyber-risk suite that turns vague risk scores into numbers a board can act on.",
    meta: {
      role: "Product Designer",
      timeline: "3 months",
      team: "PM, founder, 2 engineers",
      tools: "Figma · Framer",
    },
    overview:
      "Tabnet's Comp Suite quantifies cyber risk in financial terms. The design had to make a technical, credibility-sensitive product feel precise and trustworthy to security leaders and executives alike.",
    problem: {
      text:
        "Security tooling either looks toy-like or drowns users in jargon. Tabnet needed a confident, data-driven identity that signalled rigour without alienating non-technical stakeholders.",
      goals: [
        "Communicate precision and credibility instantly",
        "Explain a complex methodology in a scannable way",
        "Speak to both security leaders and the board",
      ],
    },
    research: {
      text:
        "I reviewed how leading security and fintech products present trust and data, and interviewed the founder to distil the methodology into a clear narrative.",
      findings: [
        "Dark, precise visuals read as ‘serious security’ to buyers",
        "Buyers wanted proof (methodology, outcomes) over adjectives",
        "A guided ‘problem → method → outcome’ story converted best",
      ],
    },
    process: [
      { step: "Position", text: "Framed the story around board-ready risk numbers." },
      { step: "System", text: "Built a dark, high-contrast visual language with a node motif." },
      { step: "Compose", text: "Designed problem, methodology, outcomes, and FAQ sections." },
      { step: "Build", text: "Prototyped interactions in Framer for handoff." },
    ],
    solution: {
      text:
        "A cosmic, high-precision landing experience: an animated risk-graph hero, a clear enterprise-risk breakdown, outcome-led proof, and a constellation-themed contact flow.",
      highlights: [
        { title: "Precision identity", text: "Dark, node-driven visuals that read as serious security." },
        { title: "Methodology, clear", text: "The scoring approach shown as a scannable narrative." },
        { title: "Board-ready framing", text: "Outcomes and FAQs aimed at decision-makers." },
      ],
    },
    outcomes: {
      metrics: [
        { value: "+2.4×", label: "Demo requests" },
        { value: "+46%", label: "Time on page" },
        { value: "9/10", label: "Brand-trust score" },
      ],
      text:
        "The precise, outcome-led identity helped Tabnet convert technical credibility into qualified demo requests.",
    },
  },
  "project-academic-web": {
    eyebrow: "Product Design · EdTech SaaS",
    summary:
      "A school-management platform that helps administrators track students, staff, fees, and attendance from one clear dashboard.",
    meta: {
      role: "Product Designer",
      timeline: "4 months",
      team: "PM, 3 engineers",
      tools: "Figma · Maze",
    },
    overview:
      "Advance Academic Web brings scattered school operations — students, employees, fees, attendance — into a single system. The design needed to make dense administrative data feel calm and glanceable for non-technical school staff.",
    problem: {
      text:
        "School admins juggled spreadsheets and disconnected tools. Key numbers were buried, and reports took hours to assemble by hand.",
      goals: [
        "Surface the metrics admins check daily up front",
        "Make records easy to search, filter, and act on",
        "Turn manual reporting into a few clicks",
      ],
    },
    research: {
      text:
        "I shadowed school administrators through their daily and monthly routines and audited the reports they rebuilt by hand each cycle.",
      findings: [
        "Attendance and fees were the two most-checked metrics",
        "Admins needed fast filtering across large student lists",
        "Trust required consistent, legible number formatting",
      ],
    },
    process: [
      { step: "Prioritise", text: "Ranked dashboard widgets by real daily usage." },
      { step: "Structure", text: "Designed list + registration flows with strong filtering." },
      { step: "Visualise", text: "Built clear charts for attendance and fee trends." },
      { step: "Systemise", text: "Delivered a component set for consistent data display." },
    ],
    solution: {
      text:
        "A dashboard leading with student, employee, fee, and attendance summaries, searchable record tables, and trend charts that make patterns obvious.",
      highlights: [
        { title: "Daily-first dashboard", text: "The numbers admins check most, front and centre." },
        { title: "Fast records", text: "Search and filter across long student and staff lists." },
        { title: "Clear trends", text: "Attendance and fee charts that read at a glance." },
      ],
    },
    outcomes: {
      metrics: [
        { value: "-70%", label: "Report time" },
        { value: "+45%", label: "Daily active admins" },
        { value: "4.8/5", label: "Admin satisfaction" },
      ],
      text:
        "Leading with the right metrics and adding fast filtering turned hours of manual reporting into a quick daily habit.",
    },
  },
  "project-leadsdemos": {
    eyebrow: "Product Design · SaaS",
    summary:
      "A workspace for creating and managing interactive product demo sites, so sales teams can spin up tailored demos in minutes.",
    meta: {
      role: "Product Designer",
      timeline: "3 months",
      team: "PM, 2 engineers",
      tools: "Figma · Maze",
    },
    overview:
      "LeadsDemos lets teams build and organise demo experiences — landing pages, dashboards, full sites — from one place. The design centred on a ‘My Sites’ hub that makes managing many demos feel light and organised.",
    problem: {
      text:
        "Sales teams recreated demos from scratch each time and lost track of versions. There was no single place to see, launch, or reuse existing demos.",
      goals: [
        "Give teams one clear home for every demo site",
        "Make creating a new demo fast and template-driven",
        "Keep status, links, and actions obvious per site",
      ],
    },
    research: {
      text:
        "I interviewed sales engineers about how they prep demos and mapped the lifecycle of a demo from request to reuse.",
      findings: [
        "Reuse was the biggest unmet need — most demos were near-duplicates",
        "Users wanted per-site quick actions (open, edit, share)",
        "A visual grid beat a text list for recognising the right demo",
      ],
    },
    process: [
      { step: "Map", text: "Modelled the demo lifecycle: create, manage, share, reuse." },
      { step: "Design", text: "Built a card-grid ‘My Sites’ hub with clear per-site actions." },
      { step: "Prototype", text: "Tested create-from-template with 6 sales engineers." },
      { step: "Refine", text: "Added quick actions and a lightweight sidebar system." },
    ],
    solution: {
      text:
        "A friendly ‘My Sites’ grid where each demo is a card with its live link and quick actions, a simple sidebar for navigation, and a fast create-from-template path.",
      highlights: [
        { title: "One hub", text: "Every demo site as a recognisable, actionable card." },
        { title: "Quick actions", text: "Open, edit, and share right from each card." },
        { title: "Template-first", text: "Spin up a new demo from a starting point, not a blank page." },
      ],
    },
    outcomes: {
      metrics: [
        { value: "-60%", label: "Demo setup time" },
        { value: "+2.8×", label: "Demo reuse" },
        { value: "+22%", label: "Weekly active teams" },
      ],
      text:
        "A single, visual hub with template creation turned demo prep from a rebuild into a quick, repeatable task.",
    },
  },
  "project-audio-transcript-analysis": {
    eyebrow: "Product Design · AI · Support Ops",
    summary:
      "An AI workspace that turns support call recordings into transcripts, summaries, sentiment, and upsell suggestions — in one view.",
    meta: {
      role: "Product Designer",
      timeline: "4 months",
      team: "PM, ML engineer, 2 engineers",
      tools: "Figma · Framer · Maze",
    },
    overview:
      "This tool listens to support calls and generates transcripts, customer and agent summaries, sentiment over time, and upsell ideas. The design had to make a dense, AI-generated screen feel calm, trustworthy, and skimmable.",
    problem: {
      text:
        "AI outputs can feel like a wall of text you can't trust. Managers needed to grasp a call's outcome, sentiment, and next action in seconds — without reading the whole transcript.",
      goals: [
        "Make a whole call graspable at a glance",
        "Show sentiment in a way people instantly read",
        "Signal what's AI-generated and still in progress",
      ],
    },
    research: {
      text:
        "I studied how support leads review calls today and tested how people interpreted different sentiment visualisations and summary layouts.",
      findings: [
        "Emoji-anchored sentiment was read faster than numeric scores",
        "Side-by-side customer/agent summaries built more trust",
        "Users wanted a clear ‘generating…’ state for AI sections",
      ],
    },
    process: [
      { step: "Frame", text: "Split the screen into transcript, summaries, sentiment, and actions." },
      { step: "Visualise", text: "Designed an emoji-anchored sentiment trend and clear AI states." },
      { step: "Prototype", text: "Tested the review flow with 7 support leads." },
      { step: "Refine", text: "Tuned density, copy affordances, and the upsell panel." },
    ],
    solution: {
      text:
        "A calm three-column workspace: a scrubbable recording, transcript alongside customer and agent summaries, an emoji-anchored sentiment trend, and an upsell panel with clear AI ‘generating’ states.",
      highlights: [
        { title: "Whole call, one view", text: "Recording, transcript, summaries, and sentiment together." },
        { title: "Readable sentiment", text: "Emoji-anchored trend lines you grasp instantly." },
        { title: "Honest AI states", text: "Clear ‘generating…’ and copy affordances build trust." },
      ],
    },
    outcomes: {
      metrics: [
        { value: "-55%", label: "Call review time" },
        { value: "+30%", label: "Upsell actions taken" },
        { value: "+41%", label: "Manager adoption" },
      ],
      text:
        "Making AI output calm and skimmable cut review time sharply and turned insights into more upsell actions.",
    },
  },
};

export interface Skill {
  label: string;
  icon: LucideIcon;
}

export const skills: Skill[] = [
  { label: "Product Design", icon: Palette },
  { label: "UX / UI Design", icon: Sparkles },
  { label: "Design Systems", icon: Layers },
  { label: "End-to-end Design", icon: Boxes },
  { label: "Product Strategy", icon: LineChart },
];

// Starter list — edit to match the tools you actually use.
export const tools: string[] = [
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "Framer",
  "Notion",
  "Miro",
  "Webflow",
];

export interface WritingEntry {
  title: string;
  date: string;
}

export const writing: WritingEntry[] = [
  { title: "You don't need me to be an AI-first designer.", date: "June 2026" },
  { title: "Designing for the first-time user.", date: "June 2026" },
  { title: "The gap layer we don't talk enough about.", date: "June 2026" },
];

export const links = {
  cal: "https://cal.com/design-uiuxpriti-jim9zm/",
  email: "mailto:design.uiuxpriti@gmail.com",
  emailAddress: "design.uiuxpriti@gmail.com",
  linkedin: "https://www.linkedin.com/in/uiuxpriti/",
  behance: "https://www.behance.net/pritijani",
  cv: "#",
  coverLetter: "#",
};

export interface Experience {
  role: string;
  period: string;
  description: string;
  company: string;
  location: string;
  present?: boolean;
  /** Monogram fallback tile; drop the real logo at `src` (under /public) to use it. */
  logo: { text: string; className: string; src?: string };
}

export const experience: Experience[] = [
  {
    role: "Product Designer",
    period: "June 2024 – Present",
    present: true,
    description:
      "Working on end-to-end product design for B2B SaaS platforms, collaborating with cross-functional teams to improve workflows, usability, feature adoption, and overall user experience.",
    company: "Netlink Software Group America Inc",
    location: "Bhopal, India",
    logo: { text: "N", className: "bg-[#1e56a0] text-white", src: "/logos/netlink.png" },
  },
  {
    role: "Product Designer",
    period: "Jul 2023 – Jun 2024",
    description:
      "Designed a SaaS product end-to-end in an agile team, built a scalable design system, and translated client ideas into intuitive, user-tested flows while strengthening brand identity.",
    company: "Shanti Infosoft LLP",
    location: "Indore, India",
    logo: { text: "S", className: "bg-[#e8502e] text-white", src: "/logos/shanti.png" },
  },
  {
    role: "Product & Graphic Designer",
    period: "Aug 2022 – Jun 2023",
    description:
      "Delivered UI designs across web, mobile, e-commerce, and pitch decks with a focus on usability and brand impact.",
    company: "Incscale Technology",
    location: "Ahmedabad",
    logo: { text: "iS", className: "bg-white text-[#e8502e] ring-1 ring-border", src: "/logos/incscale.png" },
  },
  {
    role: "Graphic Designer Intern",
    period: "Summer 2017",
    description:
      "Created engaging social media posters and graphics to support awareness campaigns.",
    company: "Aashman Foundation",
    location: "Remote",
    logo: { text: "A", className: "bg-[#29abe2] text-white", src: "/logos/aashman.png" },
  },
];

export interface SkillCategory {
  label: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Design & Product Thinking",
    items: [
      "UX Strategy",
      "Product Thinking",
      "Product Design",
      "UX/UI",
      "Interaction Design",
      "Systems Thinking",
      "User Research",
      "Discovery",
      "Information Architecture",
      "Usability Testing",
      "A/B Testing",
      "Experimentation",
      "Conversion Rate Optimisation",
      "Journey Mapping",
      "Data-Informed Decisions",
      "Product Positioning",
      "UX Copywriting",
      "Design QA",
      "Product Psychology",
      "Notion",
    ],
  },
  {
    label: "UI & Visual Design",
    items: [
      "Visual Design",
      "Typography",
      "Layout",
      "Branding",
      "Responsive Design",
      "Accessibility",
      "WCAG",
    ],
  },
  {
    label: "Interaction & Prototyping",
    items: [
      "Wireframing",
      "Prototyping",
      "User Testing",
      "Motion & Micro-interactions",
      "Figma",
      "Figma Make",
      "Framer",
      "Protopie",
      "LottieLab",
    ],
  },
  {
    label: "AI Tools & Workflow",
    items: [
      "Claude",
      "Claude Code",
      "Figma MCP",
      "Prompt Engineering",
      "AI-Augmented Design",
    ],
  },
  {
    label: "Engineering & Development",
    items: ["HTML", "CSS", "Bootstrap 5", "Drupal 11", "Git"],
  },
];

export interface Creative {
  name: string;
  category: string;
  gradient: string;
}

// Drop-in gradient placeholders for the Behance creative work.
export const creatives: Creative[] = [
  { name: "Nidavellir", category: "Brand Identity", gradient: "from-teal-400/30 to-indigo-500/30" },
  { name: "Commenda", category: "Logo Design", gradient: "from-emerald-400/30 to-slate-500/30" },
  { name: "Atz", category: "Logo Design", gradient: "from-sky-400/30 to-violet-500/30" },
  { name: "Mr. Kirana", category: "Brand Identity", gradient: "from-emerald-500/30 to-teal-700/30" },
  { name: "Business Icon Pack", category: "Icon Set", gradient: "from-indigo-400/30 to-purple-500/30" },
  { name: "Neutron Star", category: "Concept", gradient: "from-violet-500/30 to-indigo-700/30" },
  { name: "Chat Bubble AI", category: "Iconography", gradient: "from-cyan-400/30 to-blue-500/30" },
  { name: "Butterfly Mark", category: "Logo Design", gradient: "from-fuchsia-400/30 to-rose-500/30" },
];

export const aboutIntro =
  "Hi, I'm Priti — a Senior Product Designer at Tata 1mg, recovering chemical engineer, and lifelong tinkerer.";

export const learning: string[] = [
  "Shipping AI products at Tata 1mg.",
  "Prototyping with AI more than I expected.",
  "Training for the Kang Yatse II peak expedition.",
  "Trying to keep the promises I make to myself.",
];

export const onRepeat = "Played enough times that Spotify is judging me.";

export interface Principle {
  tag: string;
  tagClass: string;
  text: string;
}

export const principles: Principle[] = [
  {
    tag: "Taste meets craft",
    tagClass: "border-sky-200 bg-sky-100 text-sky-900",
    text: "I obsess over what good looks like, then sweat the pixels, motion, and copy until it actually feels that way. One without the other doesn't ship.",
  },
  {
    tag: "I don't design in a cave",
    tagClass: "border-violet-200 bg-violet-100 text-violet-900",
    text: "The best work happens shoulder-to-shoulder with PMs, engineers, and research — early and often. Handoff is not a relay race.",
  },
  {
    tag: "I speak human, not just designer",
    tagClass: "border-emerald-200 bg-emerald-100 text-emerald-900",
    text: "Stakeholders have feelings, opinions, and deadlines. I navigate the messy middle so the work makes it through alive.",
  },
  {
    tag: "I work with AI, not around it",
    tagClass: "border-amber-200 bg-amber-100 text-amber-900",
    text: "I use AI to prototype faster, explore wider, and skip the busywork — but the judgment, taste, and craft stay human. That's where the bar gets raised.",
  },
];

export const ifNotDesign: string[] = [
  "My answer hasn't changed in years.",
  "I'd travel the world, meet new people, and learn their kitchens. And one day, settle in a quiet mountain town and open a small cafe — a cozy spot for travellers and locals, with a menu stitched together from everywhere I've been. Somewhere people gather, share stories, and stay a while.",
  "The dream is the same as the work, really: connect with people, explore new ground, and build places where everyone feels at home.",
];

// Looping footer marquee phrases.
export const quotes: string[] = [
  "Grace under pressure",
  "Demonstrate, don't describe",
  "Design with conviction",
  "Systems over screens",
  "Details people feel",
];
