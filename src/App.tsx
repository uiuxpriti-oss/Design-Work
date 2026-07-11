import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Heart,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  Inbox,
  CircleUserRound,
  Sparkles,
  Mail,
  X,
  Info,
  Wand2,
  CornerDownRight,
  type LucideIcon,
} from "lucide-react";
import {
  projects,
  skillCategories,
  creatives,
  experience,
  quotes,
  links,
} from "./data/content";

// Number of case studies shown on the home page; the rest live on /all-projects.
const HOME_PROJECT_COUNT = 5;
const HOME_PROJECTS = projects.slice(0, HOME_PROJECT_COUNT);
import { playTap } from "./sound";

function useTapSound() {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // primary button / touch only
      playTap();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);
}

function Sparkle() {
  return <span className="text-xs">✦</span>;
}

const NAV: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "work", label: "Work", icon: Inbox },
  { id: "about", label: "About", icon: CircleUserRound },
  { id: "skills-tools", label: "Skills & Tools", icon: Sparkles },
];

const GLASS =
  "border border-white/50 bg-white/40 shadow-sm backdrop-blur-md";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  // While a click-driven scroll is in flight, ignore observer updates so the
  // clicked tab stays active instead of flickering through intervening sections.
  const lockUntil = useRef(0);
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);
  const selectActive = (id: string) => {
    lockUntil.current = Date.now() + 800;
    setActive(id);
  };
  return [active, selectActive] as const;
}

function Header({ onOpenAsk }: { onOpenAsk: () => void }) {
  // Drop a photo at /public/avatar.jpg (or set a URL) to replace the placeholder dot.
  const avatar = "";
  const [active, setActive] = useActiveSection(NAV.map((n) => n.id));
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="sticky top-0 z-30">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="shrink-0"
            aria-label="Back to top"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Priti Jani"
                className="h-8 w-8 rounded-full object-cover align-middle"
              />
            ) : (
              <span className="inline-block h-8 w-8 rounded-full bg-foreground align-middle" />
            )}
          </button>
          <div
            className={`flex items-center gap-0.5 rounded-full p-1 transition-colors duration-300 sm:gap-1 ${
              scrolled ? GLASS : "border border-transparent bg-foreground/[0.06]"
            }`}
          >
            {NAV.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setActive(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium leading-none outline-none transition duration-200 ease-out active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-1.5 sm:px-4 sm:py-2 sm:text-[15px] ${
                    isActive
                      ? "bg-background text-foreground shadow-sm active:bg-background"
                      : "text-foreground/70 hover:bg-foreground/[0.05] hover:text-foreground active:bg-foreground/[0.09]"
                  }`}
                >
                  {isActive && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {label}
                </a>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenAsk}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-foreground transition-colors duration-300 sm:px-3.5 ${
            scrolled
              ? `${GLASS} hover:bg-white/60`
              : "border border-transparent hover:opacity-70"
          }`}
        >
          <Sparkle /> <span className="hidden sm:inline">Ask AI</span>
        </button>
      </nav>
    </header>
  );
}

function SideNav() {
  const [active, selectActive] = useActiveSection(HOME_PROJECTS.map((p) => p.id));
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const reveal = `transition-all duration-300 ease-out ${
    show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
  }`;
  return (
    <aside
      className={`hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-20 ${
        show ? "" : "pointer-events-none"
      }`}
    >
      <ul className="space-y-3 text-[14px]">
        {HOME_PROJECTS.map((p, i) => {
          const isActive = active === p.id;
          return (
            <li
              key={p.id}
              className={reveal}
              style={{ transitionDelay: show ? `${i * 60}ms` : "0ms" }}
            >
              <a
                href={`#${p.id}`}
                onClick={() => selectActive(p.id)}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-3.5 rounded-md outline-none transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-foreground/20 ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground/60 hover:text-foreground"
                }`}
              >
                {/* Fixed-width marker area; lines share a left edge and the
                    active (longer) line extends to the right, per the reference. */}
                <span className="flex w-8 justify-start" aria-hidden="true">
                  <span
                    className={`rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? "w-8 h-0.5 bg-foreground"
                        : "w-4 h-px bg-muted-foreground/50 group-hover:w-6 group-hover:bg-foreground/70"
                    }`}
                  />
                </span>
                {p.title}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function Hero() {
  return (
    <section id="home" className="scroll-mt-24 py-20 sm:py-28 xl:py-36">
      <p className="text-sm font-medium text-foreground mb-4">Priti Jani</p>
      <p className="text-[17px] leading-relaxed text-foreground/90 max-w-xl">
        I'm a{" "}
        <span className="bg-foreground/10 px-1.5 py-0.5 rounded">UI/UX designer</span>{" "}
        with 3.5+ years of experience, focused on end-to-end product design for B2B
        SaaS and consumer products.
      </p>
      <p className="text-[17px] leading-relaxed text-foreground/90 max-w-xl mt-4">
        I turn complex requirements into simple, usable solutions — obsessing over the
        details people don't notice, but always feel.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <a
          href={links.cal}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Mail className="h-4 w-4" aria-hidden="true" /> Contact
        </a>
        <a
          href="#work"
          className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] px-4 py-2 text-sm text-foreground outline-none transition-all duration-200 ease-out hover:bg-foreground/[0.1] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Explore
        </a>
      </div>
    </section>
  );
}

function useLike(id: string, base: number) {
  const key = `like:${id}`;
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    try {
      setLiked(localStorage.getItem(key) === "1");
    } catch {
      /* localStorage unavailable */
    }
  }, [key]);
  const toggle = () =>
    setLiked((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(key, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  return { liked, count: base + (liked ? 1 : 0), toggle };
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const { liked, count, toggle } = useLike(project.id, project.likes);
  return (
    <article
      id={project.id}
      className="rounded-3xl bg-card p-4 sm:p-6 transition-colors hover:bg-card/80 scroll-mt-24"
    >
      <a href={project.href} target="_blank" rel="noreferrer" className="block">
        <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-background/40">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${project.gradient}`}
              aria-label={project.title}
            />
          )}
        </div>
      </a>
      <div className="mt-4 flex items-start justify-between gap-6 px-1">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={liked}
          aria-label={liked ? `Unlike ${project.title}` : `Like ${project.title}`}
          className="group/like flex items-center gap-2 rounded-full text-sm text-muted-foreground outline-none transition-colors hover:text-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ease-out ${
              liked
                ? "scale-110 fill-red-500 text-red-500"
                : "group-hover/like:text-foreground"
            }`}
            aria-hidden="true"
          />
          <span className={liked ? "text-foreground" : undefined}>{count}</span>
        </button>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View project
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
      <div className="mt-2 px-1">
        <h3 className="text-[15px] font-medium text-foreground">
          {project.title}
          <span className="text-muted-foreground font-normal"> — {project.description}</span>
        </h3>
      </div>
    </article>
  );
}

function Work({ onViewAll }: { onViewAll: () => void }) {
  return (
    <section id="work" className="space-y-6">
      {HOME_PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={onViewAll}
          className="group inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] px-5 py-2.5 text-sm font-medium text-foreground outline-none transition-all duration-200 ease-out hover:bg-foreground/[0.1] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all projects
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}

function CreativeGridCard({
  creative,
}: {
  creative: (typeof creatives)[number];
}) {
  return (
    <a
      href={links.behance}
      target="_blank"
      rel="noreferrer"
      className={`group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${creative.gradient} ring-1 ring-border transition-transform duration-300 hover:-translate-y-1`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-10 select-none text-[160px] font-bold leading-none text-foreground/[0.06]"
      >
        {creative.name[0]}
      </span>
      <ArrowUpRight
        className="absolute right-5 top-5 h-4 w-4 text-foreground/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col p-6">
        <p className="font-medium text-foreground">{creative.name}</p>
        <p className="text-[13px] text-muted-foreground">{creative.category}</p>
      </div>
    </a>
  );
}

function ProjectsPage({
  onBack,
  initialTab,
}: {
  onBack: () => void;
  initialTab: "case" | "creative";
}) {
  const [tab, setTab] = useState<"case" | "creative">(initialTab);
  const TABS = [
    { id: "case", label: "Case Studies" },
    { id: "creative", label: "Creatives" },
  ] as const;
  return (
    <>
      <header className="sticky top-0 z-30">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={onBack}
            className="shrink-0"
            aria-label="Back to home"
          >
            <span className="inline-block h-8 w-8 rounded-full bg-foreground align-middle" />
          </button>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.06] px-4 py-2 text-sm font-medium text-foreground outline-none transition-all duration-200 ease-out hover:bg-foreground/[0.1] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-6 pb-32">
        <section className="pt-16 pb-8">
          <SectionHeading eyebrow="Archive" title="all work" />
          <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-foreground/[0.06] p-1 text-sm">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                  tab === t.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {tab === "case"
            ? projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            : creatives.map((creative, i) => (
                <CreativeGridCard key={i} creative={creative} />
              ))}
        </section>
      </main>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

const ABOUT_PARAGRAPHS = [
  "I'm Priti, a 23-year-old UX-focused designer and developer. I've been designing in different forms since I was 11, driven by a curiosity for how digital products are built and experienced.",
  "I enjoy working across the full process — from early ideas to finished products — with a focus on creating solutions that are clear, usable, and visually considered.",
  "Outside of design, I enjoy gaming, building side projects, experiencing spirituality, and exploring new places through travel.",
];

function AboutReveal({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.82; // start lighting up when top passes 82% of viewport
      const end = vh * 0.34; // fully lit once it clears ~34%
      const span = start - end + rect.height * 0.5;
      const p = (start - rect.top) / span;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const total = paragraphs.reduce((n, p) => n + p.split(" ").length, 0);
  const revealed = progress * total;
  let idx = 0;
  return (
    <div
      ref={ref}
      className="mx-auto max-w-2xl space-y-6 text-center text-xl leading-relaxed text-foreground sm:text-[26px] sm:leading-[1.5]"
    >
      {paragraphs.map((para, pi) => (
        <p key={pi}>
          {para.split(" ").map((word, wi) => {
            const op = Math.min(1, Math.max(0, revealed - idx++));
            return (
              <span key={wi} style={{ opacity: 0.16 + 0.84 * op }}>
                {word}{" "}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

function ContactBadge() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="inline-flex max-w-xl flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-full border border-border bg-card px-5 py-3 text-sm text-muted-foreground shadow-sm">
        <span className="animate-wave mr-1 text-base" aria-hidden="true">
          👋
        </span>
        <span>Always happy to talk — reach out on</span>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          LinkedIn
        </a>
        <span>or at</span>
        <a
          href="mailto:uiuxpriti@gmail.com"
          className="font-medium text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          uiuxpriti@gmail.com
        </a>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mt-24 scroll-mt-24">
      <SectionHeading eyebrow="About" title="about me" />
      <div className="mt-12">
        <AboutReveal paragraphs={ABOUT_PARAGRAPHS} />
        <ContactBadge />
      </div>
    </section>
  );
}

function ExperienceList() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <ul>
      {experience.map((job, i) => {
        const open = openIdx === i;
        return (
          <li key={i} className="flex gap-4 sm:gap-5">
            <div className="flex flex-col items-center">
              <div
                className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-[11px] font-bold lowercase ${job.logo.className}`}
              >
                {job.logo.text}
                {job.present && (
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                )}
              </div>
              {i < experience.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-border" />
              )}
            </div>
            <div className="flex-1 pb-8">
              <button
                type="button"
                onClick={() => setOpenIdx(open ? -1 : i)}
                className="flex w-full items-start justify-between gap-4 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              >
                <div>
                  <p className="text-lg font-medium text-foreground">{job.company}</p>
                  <p className="text-muted-foreground">{job.role}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 pt-1 font-mono text-[13px] text-muted-foreground">
                  <span className="hidden sm:inline">{job.period}</span>
                  {job.bullets && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </button>
              <p className="mt-1 font-mono text-[12px] text-muted-foreground sm:hidden">
                {job.period}
              </p>
              {open && job.bullets && (
                <div className="mt-4 space-y-3">
                  {job.summary && (
                    <p className="text-[15px] text-foreground/85">{job.summary}</p>
                  )}
                  <ul className="space-y-2.5">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-[15px] text-foreground/80">
                        <span className="mt-0.5 text-foreground/40">✳</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ExperienceTimeline() {
  return (
    <ol className="relative ml-1 border-l border-border pl-6">
      {experience.map((job, i) => (
        <li key={i} className="relative pb-8 last:pb-0">
          <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-foreground ring-4 ring-background" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="font-medium text-foreground">
              {job.company}
              <span className="font-normal text-muted-foreground"> · {job.role}</span>
            </p>
            <p className="font-mono text-[13px] text-muted-foreground">{job.period}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Experience() {
  const [view, setView] = useState<"list" | "timeline">("list");
  return (
    <section id="experience" className="mt-24 scroll-mt-24">
      <div className="flex items-start justify-between gap-4">
        <SectionHeading eyebrow="Experience" title="where I have worked" />
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-foreground/[0.06] p-1 text-sm">
          {(["list", "timeline"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-full px-3.5 py-1.5 transition-colors ${
                view === v
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10">
        {view === "list" ? <ExperienceList /> : <ExperienceTimeline />}
      </div>
    </section>
  );
}

function SkillsAndTools() {
  return (
    <section id="skills-tools" className="mt-24 scroll-mt-24">
      <SectionHeading eyebrow="Skills & Tools" title="what I work with" />
      <div className="mt-8">
        {skillCategories.map((cat) => (
          <div
            key={cat.label}
            className="grid grid-cols-1 gap-2 border-t border-border py-6 sm:grid-cols-[190px_1fr] sm:gap-8"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {cat.label}
            </p>
            <p className="text-[15px] leading-relaxed text-foreground/85">
              {cat.items.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span className="mx-2 text-foreground/25">/</span>}
                  {item}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Creatives({ onViewAll }: { onViewAll: () => void }) {
  const row = [...creatives, ...creatives];
  return (
    <section id="creatives" className="mt-24 scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex items-start justify-between gap-4">
          <SectionHeading
            eyebrow="Creative"
            title={
              <>
                Beyond the <span className="italic">brief</span>
              </>
            }
          />
          <button
            type="button"
            onClick={onViewAll}
            className="group mt-1 inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground/[0.06] px-4 py-2 text-sm font-medium text-foreground outline-none transition-all duration-200 ease-out hover:bg-foreground/[0.1] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View all
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Logos, posters, and explorations — work that lives outside the sprint.
        </p>
      </div>
      <div className="marquee-track relative mt-10 overflow-hidden">
        <div className="animate-marquee marquee-anim flex w-max gap-5 px-2">
          {row.map((c, i) => (
            <a
              key={i}
              href={links.behance}
              target="_blank"
              rel="noreferrer"
              className={`group relative h-56 w-80 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${c.gradient} ring-1 ring-border transition-transform duration-300 hover:-translate-y-1`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-8 select-none text-[120px] font-bold leading-none text-foreground/[0.06]"
              >
                {c.name[0]}
              </span>
              <ArrowUpRight
                className="absolute right-4 top-4 h-4 w-4 text-foreground/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col p-5">
                <p className="text-base font-medium text-foreground">{c.name}</p>
                <p className="text-[13px] text-muted-foreground">{c.category}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingContact() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      // Hide once the footer enters the viewport so it never overlaps the footer.
      const nearFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight - 24
        : false;
      setShow(window.scrollY > window.innerHeight * 0.6 && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-6 z-40 flex justify-center px-6 transition-all duration-300 ease-out ${
        show
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      <a
        href={links.cal}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-lg shadow-black/15 outline-none transition duration-200 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Mail className="h-4 w-4" aria-hidden="true" /> Contact
      </a>
    </div>
  );
}

function Footer() {
  const line = [...quotes, ...quotes];
  return (
    <footer className="mt-24">
      <div className="marquee-track overflow-hidden border-y border-border py-6">
        <div className="animate-marquee marquee-anim flex w-max items-center gap-8">
          {line.map((quote, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap text-2xl italic text-foreground/60 sm:text-[28px]"
            >
              {quote}
              <span className="not-italic text-foreground/25">✳</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 pt-10 pb-28 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:pb-10 sm:text-left">
        <p className="text-xs uppercase tracking-wider">© 2026 Priti Jani.</p>
        <p className="italic">Designed with conviction, built with care.</p>
        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider sm:gap-5">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
          <a href={links.email} className="hover:text-foreground">
            Email
          </a>
          <a href={links.cv} className="hover:text-foreground">
            CV
          </a>
          <a href={links.coverLetter} className="hover:text-foreground">
            Cover Letter
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-card"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

const ASK_SUGGESTIONS = [
  "What's your strongest project?",
  "Tell me about the Punjab Land Records project",
  "Can you tell me more about yourself?",
  "What's your design + code background?",
];

// Grounded in the site's own content — no external AI backend.
function askReply(q: string): string {
  const t = q.toLowerCase();
  const match = projects.find((p) => t.includes(p.title.toLowerCase()));
  if (match) return `${match.title} — ${match.description} You can open it from the Work section.`;
  if (t.includes("strongest") || t.includes("best") || t.includes("project"))
    return `My most-liked project is ${projects[0].title} — ${projects[0].description} It's in the Work section.`;
  if (t.includes("yourself") || t.includes("about") || t.includes("who"))
    return ABOUT_PARAGRAPHS[0];
  if (t.includes("background") || t.includes("code") || t.includes("design") || t.includes("skill"))
    return "I'm a UI/UX designer who also builds — design in Figma, Framer & Protopie, and engineering in React, TypeScript, Tailwind and more. See the Skills & Tools section.";
  if (t.includes("experience") || t.includes("work") || t.includes("job"))
    return `Right now I'm a ${experience[0].role} at ${experience[0].company}. The Experience section has the full timeline.`;
  return "Thanks for asking! For anything specific, reach out via the Contact button — always happy to talk.";
}

function AskDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [popover, setPopover] = useState<null | "ask" | "browse">(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setInput("");
    setPopover(null);
    setMessages((m) => [...m, { role: "user", text: q }]);
    window.setTimeout(
      () => setMessages((m) => [...m, { role: "bot", text: askReply(q) }]),
      450,
    );
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/25 backdrop-blur-[1px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-label="Ask Priti"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-foreground" aria-hidden="true" />
            <span className="font-medium">Ask Priti</span>
            <span
              title="This is a demo assistant grounded in my case studies — check the project pages for the full story."
              className="flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-foreground/10 text-muted-foreground"
            >
              <Info className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div ref={bodyRef} className="flex-1 overflow-y-auto px-5 py-6">
          {messages.length === 0 ? (
            <>
              <h3 className="text-2xl font-semibold tracking-tight">Ask me anything.</h3>
              <ul className="mt-6 space-y-4">
                {ASK_SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => submit(s)}
                      className="group flex w-full items-start gap-3 text-left text-[15px] text-foreground/80 transition-colors hover:text-foreground"
                    >
                      <CornerDownRight className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40 group-hover:text-foreground" aria-hidden="true" />
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-background text-foreground/90"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative border-t border-border p-4">
          {popover && (
            <div className="absolute inset-x-4 bottom-full mb-2 rounded-2xl border border-border bg-background p-4 shadow-lg">
              <p className="mb-3 text-xs text-muted-foreground">
                {popover === "ask" ? "Try asking" : "Browse case studies"}
              </p>
              {popover === "ask" ? (
                <ul className="space-y-3">
                  {ASK_SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => submit(s)}
                        className="group flex w-full items-start gap-3 text-left text-[15px] text-foreground/80 hover:text-foreground"
                      >
                        <CornerDownRight className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40 group-hover:text-foreground" aria-hidden="true" />
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3">
                  {projects.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => submit(`Tell me about ${p.title}`)}
                        className="group flex w-full items-start gap-3 text-left"
                      >
                        <Inbox className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40 group-hover:text-foreground" aria-hidden="true" />
                        <span>
                          <span className="block text-[15px] font-medium text-foreground">{p.title}</span>
                          <span className="block text-[13px] text-muted-foreground">{p.description}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="rounded-2xl border border-border bg-background p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Priti…"
              className="w-full bg-transparent px-1 text-[15px] outline-none placeholder:text-muted-foreground"
            />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPopover((p) => (p === "ask" ? null : "ask"))}
                  aria-label="Suggested questions"
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                    popover === "ask" ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:bg-foreground/[0.06]"
                  }`}
                >
                  <Wand2 className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setPopover((p) => (p === "browse" ? null : "browse"))}
                  aria-label="Browse case studies"
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                    popover === "browse" ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:bg-foreground/[0.06]"
                  }`}
                >
                  <Inbox className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}

export default function App() {
  useTapSound();
  const [askOpen, setAskOpen] = useState(false);
  const [page, setPage] = useState<"home" | "projects">("home");
  const [projectsTab, setProjectsTab] = useState<"case" | "creative">("case");
  const openProjects = (tab: "case" | "creative") => {
    setProjectsTab(tab);
    setPage("projects");
  };
  useEffect(() => {
    // Jump to top on page change. Run after layout settles (double rAF) and
    // bypass the CSS smooth-scroll so it's an instant reset, not an animation.
    const jump = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(jump);
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [page]);
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {page === "home" ? (
        <>
          <Header onOpenAsk={() => setAskOpen(true)} />
          <SideNav />
          <main className="mx-auto max-w-3xl px-6">
            <Hero />
            <Work onViewAll={() => openProjects("case")} />
            <About />
            <Experience />
            <SkillsAndTools />
          </main>
          <Creatives onViewAll={() => openProjects("creative")} />
          <FloatingContact />
        </>
      ) : (
        <ProjectsPage onBack={() => setPage("home")} initialTab={projectsTab} />
      )}
      <Footer />
      <AskDrawer open={askOpen} onClose={() => setAskOpen(false)} />
    </div>
  );
}
