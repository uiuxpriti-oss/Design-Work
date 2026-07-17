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
  /** Short outcome phrases shown as a dot-separated row on the card. */
  measures?: string[];
}

export const projects: Project[] = [
  {
    id: "project-ask-me",
    title: "Ask Me",
    description:
      "Rebuilding Lumenore's AI analytics tool into a guided, data-first experience.",
    href: "https://uiuxpriti.com/projects/ask-me",
    likes: 41,
    gradient: "from-blue-300 via-indigo-200 to-slate-200",
    measures: ["Guided AI-first flow", "Bring your own data", "2× faster insights"],
  },
  {
    id: "project-punjab-land-records",
    title: "Punjab Land Records",
    description: "Redesigning the digital land records experience.",
    href: "https://uiuxpriti.com/projects/punjab-land-records",
    likes: 32,
    image: "projects/punjab-land-records.jpg",
    gradient: "from-emerald-200 via-teal-100 to-slate-200",
    measures: ["Fewer agents needed", "Self-serve completions up", "Support load down"],
  },
  {
    id: "project-avoda",
    title: "Avoda",
    description: "A collaborative product journey from idea to launch.",
    href: "https://uiuxpriti.com/projects/avoda",
    likes: 28,
    image: "projects/avoda.jpg",
    gradient: "from-indigo-300 via-blue-200 to-sky-100",
    measures: ["Faster onboarding", "More complete profiles", "More employer contacts"],
  },
  {
    id: "project-baladi-express",
    title: "Baladi Express",
    description: "A fast multi-category delivery experience — food, grocery & more.",
    href: "https://uiuxpriti.com/projects/baladi-express",
    likes: 26,
    image: "projects/baladi.jpg",
    gradient: "from-orange-200 via-amber-100 to-rose-100",
    measures: ["Cross-category orders up", "Search that works", "One system, all verticals"],
  },
  {
    id: "project-cakes-celebrations",
    title: "Cakes & Celebrations",
    description: "A playful e-commerce experience for custom cakes and gifting.",
    href: "https://uiuxpriti.com/projects/cakes-and-celebrations",
    likes: 25,
    image: "projects/cakes.jpg",
    gradient: "from-pink-200 via-rose-100 to-fuchsia-100",
    measures: ["Guided customisation", "Gifting made easy", "Lower drop-off"],
  },
  {
    id: "project-tabnet-security",
    title: "Tabnet Security",
    description: "A trustworthy identity for a modern security product.",
    href: "https://uiuxpriti.com/projects/tabnet-security",
    likes: 21,
    image: "projects/tabnet-security.jpg",
    gradient: "from-slate-700 via-cyan-800 to-slate-900",
    measures: ["More demo requests", "Board-ready framing", "Trust, quantified"],
  },
  {
    id: "project-academic-web",
    title: "Academic Web",
    description: "A calm, content-first web experience for academia.",
    href: "https://uiuxpriti.com/projects/academic-web",
    likes: 19,
    image: "projects/academic-web.jpg",
    gradient: "from-amber-100 via-stone-100 to-neutral-200",
    measures: ["Reports in a few clicks", "Daily-first dashboard", "Higher admin adoption"],
  },
  {
    id: "project-leadsdemos",
    title: "LeadsDemos",
    description: "Streamlining CRM workflows into a single, clear surface.",
    href: "https://uiuxpriti.com/projects/leadsdemos",
    likes: 17,
    image: "projects/leadsdemos.jpg",
    gradient: "from-violet-300 via-purple-200 to-fuchsia-100",
    measures: ["Faster demo setup", "More reuse", "One clear hub"],
  },
  {
    id: "project-audio-transcript-analysis",
    title: "Audio Transcript Analysis",
    description: "Turning raw transcripts into insight, at a glance.",
    href: "https://uiuxpriti.com/projects/audio-transcript-analysis",
    likes: 22,
    image: "projects/audio-transcript-analysis.jpg",
    gradient: "from-rose-200 via-orange-100 to-amber-100",
    measures: ["Faster call reviews", "Readable sentiment", "More upsell actions"],
  },
];

// ---------------------------------------------------------------------------
// Case study detail content — one entry per project id.
// Draft copy written from each cover/domain; edit freely.
// ---------------------------------------------------------------------------

export interface CaseStudy {
  eyebrow: string;
  summary: string;
  /** Shows an "In progress" badge in the case study header when true. */
  inProgress?: boolean;
  /** Narrative intro paragraphs; wrap phrases in **…** to bold them. */
  intro: string[];
  /** Chip groups shown beside the intro. */
  tags: { role: string[]; status: string[]; type: string[]; tools: string[] };
  meta: { role: string; timeline: string; team: string; tools: string };
  overview: string;
  problem: {
    text: string;
    goals: string[];
    stats?: { value: string; label: string }[];
  };
  research: { text: string; findings: string[] };
  process: { step: string; text: string }[];
  solution: { text: string; highlights: { title: string; text: string }[] };
  /** Optional screen/mockup images shown in the solution section. */
  screens?: { src: string; caption: string }[];
  /** Optional before → after comparison shown as its own section. */
  beforeAfter?: {
    text?: string;
    before: { src: string; caption: string };
    after: { src: string; caption: string };
  };
  /**
   * Optional full designed case-study frames, shown as a long-form scroll.
   * When present, the structured research/process/solution sections are
   * replaced by these designed sections (click to view full size).
   */
  board?: { src: string; label: string }[];
  /**
   * Optional fully written, structured case-study sections. When present,
   * these replace the fixed research/process/solution/outcomes blocks and are
   * rendered as proper headings + text, with labelled image placeholders where
   * `image`/`gallery` is set (drop real images in later).
   */
  sections?: StudyBlock[];
  outcomes: { metrics: { value: string; label: string }[]; text: string };
}

/** A written case-study section. Text is authored; images are placeholders. */
export interface StudyBlock {
  id: string;
  eyebrow?: string;
  title: string;
  /** Lead paragraph (supports **bold**). */
  lead?: string;
  /** Body paragraphs. */
  body?: string[];
  /** Bullet list. */
  bullets?: string[];
  /** Two/three-column cards (e.g. personas, method vs. findings). */
  columns?: { heading: string; items: string[] }[];
  /** Big stat tiles. */
  stats?: { value: string; label: string }[];
  /** A single labelled image placeholder for this section. */
  image?: string;
  /** Multiple titled sub-screens, each with its own image placeholder. */
  gallery?: { heading: string; text: string; image: string }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "project-ask-me": {
    intro: [
      "**Ask Me** is Lumenore's AI-powered analytics tool — you talk to your business data in natural language and get answers back. Powerful, but the experience was complex, cluttered, and hard to start.",
      "People opened it and didn't know where to begin: no clear entry point, no way to bring their own data, and chat answers that felt disconnected from the data behind them. **89% of users struggled to use the product.**",
      "I rebuilt the experience around a **guided, AI-first, data-first flow** — one clear starting action, multiple ways to bring your own data, a transparent Data Pool, and structured insights you can act on.",
    ],
    inProgress: true,
    tags: {
      role: ["Product Designer", "UX Research"],
      status: ["Live project", "Hi-Fi + Prototype", "2026"],
      type: ["AI Analytics", "B2B SaaS", "Web & Mobile"],
      tools: ["Figma"],
    },
    eyebrow: "Product Design · AI Analytics",
    summary:
      "Rebuilding Ask Me — Lumenore's conversational BI tool — into a guided, data-first AI experience: one clear starting point, bring-your-own-data, a transparent Data Pool, and structured, actionable insights.",
    meta: {
      role: "Product Designer (end to end)",
      timeline: "Ongoing · 2026",
      team: "PM, engineering, data team",
      tools: "Figma",
    },
    overview:
      "Ask Me lets business users and data experts query data in plain language. The capability was strong, but the experience leaned on technical concepts (schemas, agents), offered no way to use your own data, and gave inconsistent, hard-to-trust answers. The goal: simplify complex data workflows, let people use their own data, and deliver a guided, AI-first experience that improves trust and decision-making.",
    problem: {
      stats: [
        { value: "89%", label: "of users struggled to use the product" },
        { value: "No", label: "way to upload or connect your own data" },
        { value: "Unclear", label: "starting point for first-time users" },
      ],
      text:
        "The old experience broke users' mental models: chat wasn't clearly tied to the data behind it, outputs were inconsistent, and the interface leaned on jargon like schemas and agents. Business users got stuck at the starting line; data experts hit walls of rigidity and low transparency.",
      goals: [
        "Give users one clear, guided way to start",
        "Let people bring their own data — upload files or connect sources",
        "Make the data behind every answer visible and trustworthy",
        "Turn insights into clear, actionable next steps",
      ],
    },
    research: {
      text:
        "I combined qualitative and evaluative methods — user interviews, focus groups, usability testing, heuristic evaluation, and think-aloud sessions — then mapped the journey for two very different users: Rohan, a business analyst who needs quick answers, and Priya, a data expert who needs control and transparency.",
      findings: [
        "89% of users struggled — with a heavy dependency on technical knowledge",
        "Business users stalled at the starting point; data experts hit rigidity and low control",
        "No data upload or external connections forced everyone into predefined schemas",
      ],
    },
    process: [
      { step: "Research & Discovery", text: "Interviews, focus groups, usability testing, heuristic evaluation, and journey mapping to surface gaps." },
      { step: "Understand", text: "Built personas (Rohan, Priya), user stories, and end-to-end user flows." },
      { step: "Opportunities", text: "Competitor analysis (ChatGPT, Julius AI, Formula Bot) and opportunity areas across entry points, trust, and UI." },
      { step: "Design", text: "Wireframes → a scalable design system → hi-fi solution and prototype, validated with A/B testing." },
    ],
    solution: {
      text:
        "A guided, data-first workflow with a clean, minimal interface (and dark mode). The homepage leads with one clear action; a chat-first Ask Me turns natural-language questions into structured insights and recommended next steps; and a central Data Pool makes every file, schema, and analysis visible in one place. Designed to balance ease for beginners with control for data experts.",
      highlights: [
        { title: "Conversational Ask Me", text: "Chat-first analysis: ask in natural language, get structured insights, charts, and recommended actions." },
        { title: "Bring your own data", text: "Upload files or connect 50+ sources — no longer forced into predefined schemas." },
        { title: "Data Pool", text: "One transparent workspace for files, datasets, and schemas — matching users' ‘my data in one place' model." },
      ],
    },
    sections: [
      {
        id: "intro",
        eyebrow: "Introduction",
        title: "What is Ask Me?",
        lead: "Ask Me is Lumenore's AI-powered BI tool — ask questions about your business data in plain language and get answers back.",
        bullets: [
          "What it is — an AI-powered BI tool for talking to your data.",
          "Who uses it — business users who need quick answers, and data experts who need depth and control.",
          "The goal — faster, smarter decision-making.",
        ],
      },
      {
        id: "current-design",
        eyebrow: "Before",
        title: "Current Design",
        lead: "The original Ask Me was powerful, but the experience was complex, confusing, and inaccessible for non-technical users.",
        bullets: [
          "Unclear starting point — no guidance on how to begin.",
          "Visual clutter — too many options with no hierarchy.",
          "Lack of guidance — users left to trial and error.",
          "No data visibility — no preview of what data was in play.",
          "Desktop-heavy, complex workflows.",
        ],
        image: "Current design screenshot (old UI)",
      },
      {
        id: "roadmap",
        eyebrow: "Approach",
        title: "UX Roadmap",
        lead: "I mapped the redesign end to end around four goals: simplify complex data workflows, let people use their own data, provide a guided AI-first experience, and improve trust, usability, and decision-making.",
        image: "UX roadmap",
      },
      {
        id: "research",
        eyebrow: "Research",
        title: "Research & Discovery",
        lead: "To understand the gaps, I combined qualitative and evaluative methods to capture both user behaviour and usability issues.",
        columns: [
          {
            heading: "Methods",
            items: ["User interviews", "Focus groups (BBS students)", "Usability testing", "Heuristic evaluation", "Think-aloud sessions"],
          },
          {
            heading: "Key findings",
            items: [
              "89% of users struggled to use the product",
              "High dependency on technical knowledge",
              "Business users stalled at the starting point",
              "Data experts hit inefficiency and lack of control",
            ],
          },
        ],
        stats: [{ value: "89%", label: "of users struggled to use the product" }],
      },
      {
        id: "personas",
        eyebrow: "Users",
        title: "Personas & Journey Mapping",
        lead: "Two users with opposite needs. I mapped each one's journey through the old experience to pinpoint where they hit friction.",
        columns: [
          {
            heading: "Rohan Sharma — Business Analyst",
            items: [
              "32 · 7+ yrs · medium tech comfort",
              "Wants quick insights without deep technical effort",
              "Pain: scattered data, rigid workflows, slow turnaround",
            ],
          },
          {
            heading: "Priya Verma — Data Analyst / Scientist",
            items: [
              "29 · 5+ yrs · high tech comfort",
              "Wants deep analysis with control and precision",
              "Pain: limited control, low transparency, tool switching",
            ],
          },
        ],
        image: "Persona 1 & 2 + journey mapping",
      },
      {
        id: "competitor",
        eyebrow: "Benchmark",
        title: "Competitor Analysis",
        lead: "I benchmarked Ask Me against ChatGPT, Julius AI, and Formula Bot across natural language, data connections, analysis depth, visualisations, context awareness, ease of use, and advanced controls — to find where Ask Me could win.",
        image: "Competitor analysis",
      },
      {
        id: "opportunities",
        eyebrow: "Opportunities",
        title: "Opportunity Areas",
        lead: "Where the redesign could create the most value:",
        bullets: [
          "Multiple data entry points — upload files, connect sources, use a schema or sample data.",
          "A central Data Pool as a single workspace.",
          "Data consent & privacy controls before analysis.",
          "Trust & transparency — step-by-step processing and explainable insights.",
          "A minimal, modern UI with dark mode.",
          "Actionable insights that flow into dashboards.",
          "AI-powered summarisation and a responsive layout.",
        ],
        image: "Opportunity areas",
      },
      {
        id: "problem",
        eyebrow: "The problem",
        title: "⚠️ Problem Statement",
        lead: "Users struggle to efficiently analyse data due to unclear workflows, lack of guidance, and the inability to use their own data.",
        bullets: [
          "No support for user data — people are forced into predefined schemas.",
          "Broken mental model — chat isn't clearly tied to the data behind it.",
          "Non-deterministic, inconsistent outputs reduce trust.",
          "Tech-heavy experience and excessive jargon (schemas, agents).",
          "High cognitive load and an unclear starting point.",
          "Disconnected data workflow with no data visibility.",
        ],
        image: "Problem statement",
      },
      {
        id: "user-stories",
        eyebrow: "User stories",
        title: "What users need",
        bullets: [
          "As a business user, I want a clear, guided way to start my analysis, so I don't feel confused about what to do first.",
          "As a data expert, I want to use and manage my own data (upload or connect), so I can perform accurate, relevant analysis.",
          "As a business user, I want simple, easy-to-understand insights, so I can make quick decisions without technical effort.",
        ],
      },
      {
        id: "user-flow",
        eyebrow: "Flow",
        title: "🔄 User Flow",
        lead: "A clear, step-by-step path from setup to results: log in → open Ask Me → connect a source, upload files, or use sample data → give data consent → analyse with agents and connectors → auto-create a Data Pool → ask a question → get insights.",
        image: "User flow",
      },
      {
        id: "design-system",
        eyebrow: "Foundations",
        title: "Design System",
        lead: "A scalable design system built for consistency, clarity, and efficiency across data-heavy, AI-driven workflows.",
        bullets: [
          "Typography — Inter, for clean readability and strong hierarchy.",
          "Colours — primary blue for actions, a gradient for AI, and semantic colours for states (error, success, info).",
          "Icons — minimal, consistent, and action-focused.",
          "Components — reusable cards, modals, loaders, and upload states.",
          "Interactions — clear feedback, guided flows, and context-aware actions.",
        ],
        image: "Design system",
      },
      {
        id: "wireframing",
        eyebrow: "Structure",
        title: "Wireframing",
        lead: "Low-fidelity flows to fix the unclear starting point and define a clear, guided structure before moving into visual design.",
        image: "Wireframing",
      },
      {
        id: "solution",
        eyebrow: "Solution",
        title: "Solution & Visual Design",
        lead: "A guided, data-first workflow with a clean, minimal interface (and dark mode) — balancing ease for beginners with control for experts. Combining improved flows, a simplified UI, and clear visual hierarchy to make analysis faster, easier, and more actionable.",
        gallery: [
          { heading: "Homepage", text: "Centralised input with every entry option, support for multiple data sources, and a minimal, distraction-free UI with dark mode — one clear starting action.", image: "Homepage (first-time & returning user, light + dark)" },
          { heading: "Processing", text: "Step-by-step system visibility — upload → detection → schema → Data Pool — for a transparent, trustworthy process.", image: "Processing screen" },
          { heading: "Response & Insights", text: "Structured insights with recommendations and clear next actions — turning answers into decisions.", image: "Response / insights screen" },
          { heading: "Data Pool", text: "A centralised workspace for files, schemas, and analyses — matching users' ‘my data in one place' model. Shown before → after.", image: "Data Pool (before / after)" },
          { heading: "Create Data Pool", text: "File upload and schema selection combined into one guided flow with real-time status and recovery.", image: "Create Data Pool" },
          { heading: "Manage Data Pool", text: "Files and analyses unified in one view with search, sort, and quick actions.", image: "Manage Data Pool" },
          { heading: "Mobile", text: "A mobile-first, minimal AI interface with clear entry points, quick CTAs, and a thumb-friendly bottom input bar.", image: "Mobile design (before / after)" },
        ],
      },
      {
        id: "ab-testing",
        eyebrow: "Validation",
        title: "🧪 A/B Testing",
        lead: "Two designs, measured head to head on task completion, time to insight, and satisfaction. Design 2 — the guided, chat-first approach — won on every metric and was selected for implementation.",
        stats: [
          { value: "90%", label: "Task completion (from 65%)" },
          { value: "18s", label: "Time to insight (from 38s)" },
          { value: "4.6/5", label: "User satisfaction" },
          { value: "+30%", label: "Feature adoption" },
        ],
        image: "A/B testing (Design 1 vs Design 2 + results)",
      },
      {
        id: "impact",
        eyebrow: "Impact",
        title: "What changed",
        bullets: ["Faster onboarding", "Increased engagement", "Reduced drop-offs", "Improved usability"],
      },
      {
        id: "future-scope",
        eyebrow: "What's next",
        title: "Future Scope",
        bullets: ["AI recommendations", "Personalisation", "Automation", "Advanced analytics"],
      },
      {
        id: "conclusion",
        eyebrow: "Conclusion",
        title: "The transformation",
        body: [
          "This redesign transformed a complex, tech-heavy analytics tool into a guided, data-first AI experience.",
          "By aligning the system with users' mental models, simplifying workflows, and improving transparency, the solution significantly enhanced usability, efficiency, and user confidence.",
        ],
      },
    ],
    outcomes: {
      metrics: [
        { value: "90%", label: "Task completion (up from 65%)" },
        { value: "18s", label: "Time to insight (down from 38s)" },
        { value: "4.6/5", label: "User satisfaction (A/B winner)" },
      ],
      text:
        "A/B testing validated the redesign: Design 2 lifted task completion from 65% to 90%, halved time-to-insight (38s → 18s), raised feature adoption by ~30%, and scored 4.6/5 satisfaction. The result turns a complex, tech-heavy tool into a guided, data-first AI experience aligned with how people actually think about their data. (Ongoing — future scope: AI recommendations, personalisation, and automation.)",
    },
  },
  "project-punjab-land-records": {
    intro: ["Getting a land record in Punjab usually means a trip to an agent. I watched people **give up on the official portal** and pay someone to do it for them.","The services exist — Jamabandi, Mutation, Fard — but the digital flow buried them under department names and long forms that failed without saying why.","I redesigned the experience around **what people actually want to do**, so a first-time user can find, request, and track a document without a middleman."],
    tags: {"role":["Lead Product Designer","UX Research"],"status":["Hi-Fi Prototype","2024"],"type":["GovTech","B2C","Web"],"tools":["Figma","Maze","Drupal"]},
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
      stats: [{"value":"80%","label":"couldn’t name the right service"},{"value":"1 in 3","label":"gave up and used an agent"},{"value":"#1 call","label":"‘where is my request?’"}],
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
    intro: ["Healthcare workers pick up shifts between long, exhausting days. The staffing apps they used **all looked the same** and asked for too much, too soon.","An employer needs to trust a candidate in seconds; a worker needs to sign up between rounds. The old flow front-loaded paperwork and hid what mattered.","I designed a profile that **leads with trust** — role, specialities, multi-source ratings — and an onboarding you can finish in under five minutes."],
    tags: {"role":["Product Designer","UX Research"],"status":["Hi-Fi Prototype","2024"],"type":["Healthcare","Staffing","Mobile App"],"tools":["Figma","Protopie","Maze"]},
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
      stats: [{"value":"3 in 5","label":"abandoned onboarding"},{"value":"70%","label":"distrusted a single rating"},{"value":"38%","label":"profiles left incomplete"}],
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
    intro: ["Ordering food, then groceries, then flowers usually means learning three different apps. Baladi wanted all of it in **one place** for the Qatar market.","The hard part isn't the catalogue — it's making one app feel coherent when the categories are this different, and keeping search from returning the wrong thing.","I built **one system** across every vertical: a scoped search, bright category tiles, and an identical cart and checkout on web and mobile."],
    tags: {"role":["Product Designer"],"status":["Hi-Fi Prototype","2024"],"type":["Q-Commerce","B2C","Web & Mobile"],"tools":["Figma","Framer","Maze"]},
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
      stats: [{"value":"61%","label":"got lost switching categories"},{"value":"1 in 4","label":"searches hit the wrong category"},{"value":"3→1","label":"apps users had to juggle"}],
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
    intro: ["Ordering a custom cake online is oddly stressful. Every site throws a **wall of options** at you and hides the part where you send it as a gift.","People shop for a moment — a birthday, an anniversary — not for a product grid. And gifting deserves its own obvious path.","I made customisation **playful and guided** — by occasion, shape, and design — with a built-in way to add a message and deliver it to someone you love."],
    tags: {"role":["Product Designer","Visual Design"],"status":["Hi-Fi Prototype","2024"],"type":["E-commerce","B2C","Web & Mobile"],"tools":["Figma","Illustrator","Maze"]},
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
      stats: [{"value":"58%","label":"felt overwhelmed by options"},{"value":"44%","label":"couldn’t find the gifting flow"},{"value":"33%","label":"abandoned the customiser"}],
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
    intro: ["Most security tools either look like toys or bury you in jargon. Tabnet quantifies cyber risk in **money a board can act on** — and the brand had to feel that precise.","Buyers here don't want adjectives; they want proof — the methodology, the outcomes, the numbers behind the score.","I built a **dark, high-precision identity** and a problem-to-outcome story that speaks to security leaders and executives at once."],
    tags: {"role":["Product Designer"],"status":["Hi-Fi Prototype","2024"],"type":["Cybersecurity","B2B","Web"],"tools":["Figma","Framer"]},
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
      stats: [{"value":"9/10","label":"wanted proof over adjectives"},{"value":"2×","label":"longer sales conversations"},{"value":"46%","label":"bounced on jargon-heavy pages"}],
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
    intro: ["School admins run on spreadsheets. The numbers that matter — attendance, fees — were **buried**, and monthly reports took hours to rebuild by hand.","I shadowed administrators through their day to see which metrics they actually check, and which reports they recreate every cycle.","The result is a **daily-first dashboard** with fast record search and clear trends, turning manual reporting into a few clicks."],
    tags: {"role":["Product Designer"],"status":["Hi-Fi Prototype","2024"],"type":["EdTech","B2B SaaS","Web"],"tools":["Figma","Maze"]},
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
      stats: [{"value":"4 hrs","label":"per monthly report, by hand"},{"value":"70%","label":"of data lived in spreadsheets"},{"value":"2","label":"metrics checked every day"}],
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
    intro: ["Sales teams rebuild the same demo over and over and **lose track of versions**. There was no single place to see, launch, or reuse what they'd already made.","Talking to sales engineers, the biggest unmet need was reuse — most demos were near-duplicates of an earlier one.","I designed a **visual My Sites hub** where every demo is a card with quick actions, plus a fast create-from-template path."],
    tags: {"role":["Product Designer"],"status":["Hi-Fi Prototype","2024"],"type":["SaaS","B2B","Web"],"tools":["Figma","Maze"]},
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
      stats: [{"value":"60%","label":"of demos were near-duplicates"},{"value":"0","label":"single place to find them"},{"value":"2.8×","label":"wasted rebuild effort"}],
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
    intro: ["AI can transcribe a support call in seconds — and then hand you **a wall of text you can't trust**. Managers needed the outcome, not the transcript.","I tested how support leads read calls today, and which sentiment visualisations they actually understood at a glance.","The workspace makes a whole call graspable in seconds: transcript, side-by-side summaries, **emoji-anchored sentiment**, and clear AI states."],
    tags: {"role":["Product Designer"],"status":["Hi-Fi Prototype","2024"],"type":["AI","Support Ops","Web"],"tools":["Figma","Framer","Maze"]},
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
      stats: [{"value":"55%","label":"of review time wasted"},{"value":"1 screen","label":"of untrusted AI text"},{"value":"30%","label":"of upsell signals missed"}],
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
  email: "mailto:uiuxpriti@gmail.com",
  emailAddress: "uiuxpriti@gmail.com",
  linkedin: "https://www.linkedin.com/in/priti-jani14/",
  behance: "https://www.behance.net/pritijani",
  cv: "Priti-Jani-CV.pdf",
};

export interface Experience {
  role: string;
  period: string;
  description: string;
  company: string;
  location: string;
  present?: boolean;
  /** Detailed responsibilities shown when the role is expanded. */
  bullets?: string[];
  /** Featured project called out above the bullets. */
  highlight?: { label: string; text: string };
  /** Monogram fallback tile; drop the real logo at `src` (under /public) to use it. */
  logo: { text: string; className: string; src?: string };
}

export const experience: Experience[] = [
  {
    role: "Product Designer",
    period: "June 2024 – Present",
    present: true,
    description:
      "Working on end-to-end product design for B2B SaaS data platforms, collaborating with cross-functional teams to improve workflows, usability, feature adoption, and overall user experience.",
    company: "Netlink Software Group America Inc",
    location: "Bhopal, India",
    highlight: {
      label: "Ask Me",
      text: "Led design for a chat-based data-analysis experience, running user interviews and usability testing to shape a natural, conversational way for people to explore and query their data.",
    },
    bullets: [
      "Designed UX for B2B SaaS data products — ETL workflows, dashboards, enterprise data interfaces, and conversational data-analysis experiences.",
      "Simplified complex workflows by improving information architecture, navigation patterns, and step-by-step task flows, helping users complete data operations more efficiently.",
      "Conducted UX research end-to-end — user interviews, usability testing, A/B testing, journey mapping, focus groups, and ideation workshops (Crazy 8s) — to identify pain points and validate design decisions.",
      "Built reusable UI components and micro design systems to improve consistency, scalability, and developer efficiency.",
      "Collaborated closely with product managers and engineering teams on feature planning, design handoff, and iterative product improvements.",
      "Delivered interactive prototypes and usability validations to ensure solutions met both user and business needs.",
    ],
    logo: { text: "N", className: "bg-[#1e56a0] text-white", src: "logos/netlink.png" },
  },
  {
    role: "Product Designer",
    period: "Jul 2023 – Jun 2024",
    description:
      "Designed a SaaS product end-to-end in an agile team, built a scalable design system, and translated client ideas into intuitive, user-tested flows while strengthening brand identity.",
    company: "Shanti Infosoft LLP",
    location: "Indore, India",
    bullets: [
      "Designed user experiences for B2B and B2C platforms across cybersecurity, rental, and astrology domains.",
      "Created responsive dashboards, product flows, and admin interfaces to support multi-role usage.",
      "Improved onboarding, feature accessibility, and task discoverability through UX research and iterative design.",
      "Delivered high-fidelity UIs, prototypes, and design specifications for engineering teams.",
      "Contributed to product-level decisions by aligning UX requirements with business priorities.",
    ],
    logo: { text: "S", className: "bg-[#e8502e] text-white", src: "logos/shanti.png" },
  },
  {
    role: "Product & Graphic Designer",
    period: "Aug 2022 – Jun 2023",
    description:
      "Delivered UI designs across web, mobile, e-commerce, and pitch decks with a focus on usability and brand impact.",
    company: "Incscale Technology",
    location: "Ahmedabad",
    bullets: [
      "Designed end-to-end UX for B2C applications across e-commerce, grocery, and education.",
      "Created pitch-deck designs that communicated product vision to clients and stakeholders.",
      "Conducted UX audits to identify friction points and propose design improvements.",
      "Built scalable UI kits and interaction components to unify mobile and web platforms.",
      "Collaborated cross-functionally with stakeholders to align on product scope and feature priorities.",
    ],
    logo: { text: "iS", className: "bg-white text-[#e8502e] ring-1 ring-border", src: "logos/incscale.png" },
  },
  {
    role: "Graphic Designer Intern",
    period: "Summer 2017",
    description:
      "Created engaging social media posters and graphics to support awareness campaigns.",
    company: "Aashman Foundation",
    location: "Remote",
    logo: { text: "A", className: "bg-[#29abe2] text-white", src: "logos/aashman.png" },
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
  /** Image under /public. Falls back to the gradient when missing. */
  image?: string;
}

export const creatives: Creative[] = [
  {
    name: "MySaloonTime",
    category: "App Marketing",
    image: "creatives/mysaloontime.webp",
    gradient: "from-orange-400/30 to-amber-500/30",
  },
  {
    name: "Neant Agency",
    category: "Social Carousel",
    image: "creatives/neant-agency.webp",
    gradient: "from-violet-500/30 to-purple-700/30",
  },
  {
    name: "Correl App",
    category: "App Icon",
    image: "creatives/correl-app.webp",
    gradient: "from-blue-500/30 to-indigo-700/30",
  },
  {
    name: "Career Crush",
    category: "Logo Design",
    image: "creatives/career-crush-logo.webp",
    gradient: "from-orange-400/30 to-rose-400/30",
  },
  {
    name: "Career Crush — Concept",
    category: "Brand Ideation",
    image: "creatives/career-crush-concept.webp",
    gradient: "from-amber-300/30 to-orange-400/30",
  },
  {
    name: "App Marketing Banners",
    category: "Banner Design",
    image: "creatives/app-marketing-banners.webp",
    gradient: "from-orange-400/30 to-rose-500/30",
  },
  {
    name: "Grocery App Banners",
    category: "Marketing Design",
    image: "creatives/grocery-app-banners.webp",
    gradient: "from-emerald-400/30 to-lime-500/30",
  },
  {
    name: "Data Correl",
    category: "Brand Identity",
    image: "creatives/data-correl-logo.webp",
    gradient: "from-blue-400/30 to-indigo-600/30",
  },
  {
    name: "6G Connectivity",
    category: "Social Carousel",
    image: "creatives/6g-connectivity.webp",
    gradient: "from-violet-500/30 to-indigo-700/30",
  },
  {
    name: "App Dev Trends 2024",
    category: "Social Carousel",
    image: "creatives/app-dev-trends-2024.webp",
    gradient: "from-indigo-400/30 to-purple-500/30",
  },
  {
    name: "Software Development",
    category: "Social Carousel",
    image: "creatives/software-dev-carousel.webp",
    gradient: "from-rose-400/30 to-violet-500/30",
  },
  {
    name: "Shanti Academy",
    category: "Marketing Campaign",
    image: "creatives/shanti-academy-campaign.webp",
    gradient: "from-sky-400/30 to-red-400/30",
  },
  {
    name: "Open to Work",
    category: "Social Carousel",
    image: "creatives/open-to-work-carousel.webp",
    gradient: "from-lime-400/30 to-violet-600/30",
  },
  {
    name: "Portfolio Promo",
    category: "Personal Branding",
    image: "creatives/open-to-work-poster.webp",
    gradient: "from-blue-500/30 to-indigo-600/30",
  },
];

export const aboutIntro =
  "Hi, I'm Priti — a Senior Product Designer at Lumenore, recovering chemical engineer, and lifelong tinkerer.";

export const learning: string[] = [
  "Shipping AI products at Lumenore.",
  "Prototyping with AI more than I expected.",
  "Training for the Kang Yatse II peak expedition.",
  "Reading more books.",
  "Learning development to build what I design.",
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
  "I'd travel, meet new people, and learn their kitchens — then settle in a quiet mountain town and open a small cafe. A cozy spot for travellers and locals, with a menu from everywhere I've been.",
  "The dream is the same as the work: connect with people, explore new ground, and build places where everyone feels at home.",
];

// Looping footer marquee phrases.
export const quotes: string[] = [
  "Grace under pressure",
  "Demonstrate, don't describe",
  "Design with conviction",
  "Systems over screens",
  "Details people feel",
];

// ---------------------------------------------------------------------------
// Awards & accolades — edit names/issuers and drop certificate images into
// /public/awards/. Card falls back to a gradient when no image is present.
// ---------------------------------------------------------------------------

export interface Award {
  title: string;
  issuer: string;
  year: string;
  description: string;
  /** Certificate image under /public. Falls back to the gradient when missing. */
  certificate?: string;
  gradient: string;
}

export const awards: Award[] = [
  {
    title: "Best Performer of the Quarter",
    issuer: "Lumenore",
    year: "2026",
    description:
      "Certificate of Achievement for Best Performer of the Quarter (Q1, Jan–Mar 2026) at Netlink | Lumenore — recognised for hard work and great efforts.",
    certificate: "awards/lumenore-best-performer.webp",
    gradient: "from-emerald-200 via-teal-100 to-green-100",
  },
  {
    title: "Emotional Well-Being with EaR",
    issuer: "EHAC & SSISM",
    year: "2021",
    description:
      "Certificate of Participation in an online training program on 'Emotional Well-Being with EaR' — 10 sessions, conducted by a BPS-licensed clinical psychologist.",
    certificate: "awards/emotional-wellbeing-ear.jpg",
    gradient: "from-sky-200 via-cyan-100 to-teal-100",
  },
  {
    title: "Digital Skills: User Experience",
    issuer: "Accenture (FutureLearn)",
    year: "2022",
    description:
      "Certificate of Achievement for completing 'Digital Skills: User Experience' — an introduction to UX and why it matters in an ever-evolving digital world.",
    certificate: "awards/accenture-ux.png",
    gradient: "from-fuchsia-200 via-pink-100 to-rose-100",
  },
  {
    title: "User Experience Design Essentials – Adobe XD UI UX Design",
    issuer: "Udemy",
    year: "2022",
    description:
      "Certificate of Completion for 'User Experience Design Essentials – Adobe XD UI UX Design' (9.5 hours) by Daniel Walter Scott.",
    certificate: "awards/udemy-ux-adobe-xd.png",
    gradient: "from-violet-200 via-indigo-100 to-blue-100",
  },
];
