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
    id: "project-rabbithole",
    title: "Rabbithole",
    description: "A focused SaaS interface exploring depth over noise.",
    href: "https://uiuxpriti.com/projects/rabbithole",
    likes: 24,
    image: "/projects/rabbithole.jpg",
    gradient: "from-zinc-800 via-neutral-700 to-stone-900",
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
    label: "Design Systems",
    items: [
      "Tokens",
      "Component Libraries",
      "Governance",
      "Documentation",
      "Multi-brand Systems",
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
    label: "Collaboration & Leadership",
    items: [
      "Cross-Functional Collaboration",
      "Stakeholder Communication",
      "Design-Engineering Handoff",
      "Campaign & Growth Design",
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
