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
    gradient: "from-emerald-200 via-teal-100 to-slate-200",
  },
  {
    id: "project-avoda",
    title: "Avoda",
    description: "A collaborative product journey from idea to launch.",
    href: "https://uiuxpriti.com/projects/avoda",
    likes: 28,
    gradient: "from-indigo-300 via-blue-200 to-sky-100",
  },
  {
    id: "project-rabbithole",
    title: "Rabbithole",
    description: "A focused SaaS interface exploring depth over noise.",
    href: "https://uiuxpriti.com/projects/rabbithole",
    likes: 24,
    gradient: "from-zinc-800 via-neutral-700 to-stone-900",
  },
  {
    id: "project-tabnet-security",
    title: "Tabnet Security",
    description: "A trustworthy identity for a modern security product.",
    href: "https://uiuxpriti.com/projects/tabnet-security",
    likes: 21,
    gradient: "from-slate-700 via-cyan-800 to-slate-900",
  },
  {
    id: "project-academic-web",
    title: "Academic Web",
    description: "A calm, content-first web experience for academia.",
    href: "https://uiuxpriti.com/projects/academic-web",
    likes: 19,
    gradient: "from-amber-100 via-stone-100 to-neutral-200",
  },
  {
    id: "project-leadsdemos",
    title: "LeadsDemos",
    description: "Streamlining CRM workflows into a single, clear surface.",
    href: "https://uiuxpriti.com/projects/leadsdemos",
    likes: 17,
    gradient: "from-violet-300 via-purple-200 to-fuchsia-100",
  },
  {
    id: "project-audio-transcript-analysis",
    title: "Audio Transcript Analysis",
    description: "Turning raw transcripts into insight, at a glance.",
    href: "https://uiuxpriti.com/projects/audio-transcript-analysis",
    likes: 22,
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
  company: string;
  role: string;
  period: string;
  present?: boolean;
  /** Monogram tile: short text + Tailwind bg/text classes. Swap for a real logo later. */
  logo: { text: string; className: string };
  summary?: string;
  bullets?: string[];
}

export const experience: Experience[] = [
  {
    company: "tata 1mg",
    role: "senior product designer",
    period: "apr 2025 to present",
    present: true,
    logo: { text: "1mg", className: "bg-[#fb5a47] text-black" },
    summary: "Building AI product for internal workflow. Built Health insights from 1-10",
    bullets: [
      "Led end-to-end design of an AI health platform converting lab reports into actionable insights.",
      "Designed analysis and tracking systems, boosting DAU by 19×.",
      "Enabled conversational AI health assistance, cutting bounce rates by 25%.",
      "Scaled modular AI UX across diagnostics, pharmacy, and consultation verticals.",
      "Partnered cross-functionally to deliver a clinically accurate and scalable experience.",
    ],
  },
  {
    company: "district by zomato",
    role: "designer",
    period: "jan 2025 - apr 2025",
    logo: { text: "dist", className: "bg-[#6d28d9] text-white" },
    bullets: [
      "Designed discovery and booking flows for the events and dining experience.",
      "Shaped a cohesive visual language across a fast-moving consumer product.",
    ],
  },
  {
    company: "tata 1mg",
    role: "product designer 2",
    period: "2022 - 2025",
    logo: { text: "1mg", className: "bg-[#fb5a47] text-black" },
    bullets: [
      "Owned end-to-end design across diagnostics and pharmacy journeys.",
      "Built and maintained design-system components used org-wide.",
    ],
  },
  {
    company: "aarti industries",
    role: "process engineer",
    period: "2021 - 2022",
    logo: { text: "aa", className: "bg-gradient-to-br from-orange-500 to-rose-500 text-white" },
    bullets: [
      "Optimised plant processes and reporting before transitioning into product design.",
    ],
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
      "Systems Thinking",
      "User Research",
      "Information Architecture",
      "Design Systems",
      "Usability Testing",
      "UX Copywriting",
      "Product Positioning",
      "A/B Testing",
      "Journey Mapping",
    ],
  },
  {
    label: "Interaction & Prototyping",
    items: [
      "Wireframing",
      "Prototyping",
      "Motion & Micro-interactions",
      "Figma",
      "Figma Make",
      "Framer",
      "Protopie",
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
    items: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SCSS",
      "Drupal 11",
      "Bootstrap 5",
      "Git",
      "Pantheon",
    ],
  },
];

export interface Creative {
  name: string;
  gradient: string;
}

// Drop-in gradient placeholders for the Behance creative work.
export const creatives: Creative[] = [
  { name: "Nidavellir", gradient: "from-teal-400/30 to-indigo-500/30" },
  { name: "Commenda", gradient: "from-emerald-400/30 to-slate-500/30" },
  { name: "Atz", gradient: "from-sky-400/30 to-violet-500/30" },
  { name: "Mr. Kirana", gradient: "from-emerald-500/30 to-teal-700/30" },
  { name: "Business Icon Pack", gradient: "from-indigo-400/30 to-purple-500/30" },
  { name: "Neutron Star", gradient: "from-violet-500/30 to-indigo-700/30" },
  { name: "Chat Bubble AI", gradient: "from-cyan-400/30 to-blue-500/30" },
  { name: "Butterfly Mark", gradient: "from-fuchsia-400/30 to-rose-500/30" },
];

// Looping footer marquee phrases.
export const quotes: string[] = [
  "Grace under pressure",
  "Demonstrate, don't describe",
  "Design with conviction",
  "Systems over screens",
  "Details people feel",
];
