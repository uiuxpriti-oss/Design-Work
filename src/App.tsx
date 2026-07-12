import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Heart,
  ArrowUpRight,
  ArrowRight,
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
  RotateCcw,
  Play,
  Pause,
  CornerDownLeft,
  type LucideIcon,
} from "lucide-react";
import {
  projects,
  skillCategories,
  creatives,
  experience,
  quotes,
  links,
  learning,
  onRepeat,
  principles,
  ifNotDesign,
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

// Solid pill for the scrolled nav — opaque so it stays readable over content
// (glassmorphism washed out against the page cards).
const NAV_SOLID = "border border-border bg-background shadow-sm";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  // While a click-driven scroll is in flight, ignore updates so the clicked
  // tab stays active instead of flickering through intervening sections.
  const lockUntil = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      const line = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, the last section is always the active one — even
      // if it's too short to reach the line (e.g. Skills & Tools).
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  const selectActive = (id: string) => {
    lockUntil.current = Date.now() + 800;
    setActive(id);
  };
  return [active, selectActive] as const;
}

function Header({
  onOpenAsk,
  onOpenAbout,
}: {
  onOpenAsk: () => void;
  onOpenAbout: () => void;
}) {
  // Drop a photo at /public/avatar.jpg to show it here; falls back to the dot.
  const avatar = "/avatar.jpg";
  const [avatarOk, setAvatarOk] = useState(true);
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
            {avatar && avatarOk ? (
              <img
                src={avatar}
                alt="Priti Jani"
                onError={() => setAvatarOk(false)}
                className="h-8 w-8 rounded-full object-cover align-middle"
              />
            ) : (
              <span className="inline-block h-8 w-8 rounded-full bg-foreground align-middle" />
            )}
          </button>
          <div
            className={`flex items-center gap-0.5 rounded-full p-1 transition-colors duration-300 sm:gap-1 ${
              scrolled ? NAV_SOLID : "border border-transparent bg-foreground/[0.06]"
            }`}
          >
            {NAV.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={id === "about" ? "#" : `#${id}`}
                  onClick={(e) => {
                    if (id === "about") {
                      e.preventDefault();
                      onOpenAbout();
                    } else {
                      setActive(id);
                    }
                  }}
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
        {scrolled ? (
          <a
            href={links.cal}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm outline-none transition-all duration-300 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25 sm:px-3.5"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />{" "}
            <span className="hidden sm:inline">Contact</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={onOpenAsk}
            className="inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-sm text-foreground transition-colors duration-300 hover:opacity-70 sm:px-3.5"
          >
            <Sparkle /> <span className="hidden sm:inline">Ask AI</span>
          </button>
        )}
      </nav>
    </header>
  );
}

function SideNav({
  items = HOME_PROJECTS,
  watchId = "work",
}: {
  items?: typeof projects;
  watchId?: string;
} = {}) {
  const [active, selectActive] = useActiveSection(items.map((p) => p.id));
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(watchId);
      if (!el) return setShow(false);
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Only while the tracked (case studies) section spans the viewport.
      setShow(r.top < vh * 0.4 && r.bottom > vh * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [watchId]);
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
        {items.map((p, i) => {
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
          View work
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

function SubPageTopBar({
  onBack,
  width = "max-w-4xl",
}: {
  onBack: () => void;
  width?: string;
}) {
  return (
    <div className="sticky top-0 z-30 bg-background/85 backdrop-blur-sm">
      <div
        className={`mx-auto flex ${width} items-center justify-between px-6 py-5`}
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] px-4 py-2 text-sm font-medium text-foreground outline-none transition-all duration-200 ease-out hover:bg-foreground/[0.1] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          <CornerDownLeft className="h-4 w-4" aria-hidden="true" />
          Return
        </button>
        <a
          href={links.cal}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none transition-all duration-200 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Contact
        </a>
      </div>
    </div>
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
      <SubPageTopBar onBack={onBack} width="max-w-3xl" />
      {tab === "case" && <SideNav items={projects} watchId="case-studies" />}
      <main className="mx-auto max-w-3xl px-6 pb-32">
        <section className="pt-10 pb-8">
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
        {tab === "case" ? (
          <section id="case-studies" className="space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {creatives.map((creative, i) => (
              <CreativeGridCard key={i} creative={creative} />
            ))}
          </section>
        )}
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

function ExperienceLogo({ job }: { job: (typeof experience)[number] }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative z-10 h-12 w-12 shrink-0">
      {job.logo.src && ok ? (
        <img
          src={job.logo.src}
          alt={job.company}
          onError={() => setOk(false)}
          className="h-12 w-12 rounded-2xl bg-white object-contain p-1 ring-1 ring-border"
        />
      ) : (
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-[13px] font-bold ${job.logo.className}`}
        >
          {job.logo.text}
        </div>
      )}
      {job.present && (
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
      )}
    </div>
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
              <ExperienceLogo job={job} />
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
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </div>
              </button>
              <p className="mt-1 font-mono text-[12px] text-muted-foreground sm:hidden">
                {job.period}
              </p>
              {open && (
                <div className="mt-4 space-y-2">
                  <p className="text-[15px] leading-relaxed text-foreground/85">
                    {job.description}
                  </p>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Experience() {
  return (
    <section id="experience" className="mt-24 scroll-mt-24">
      <SectionHeading eyebrow="Experience" title="where I have worked" />
      <div className="mt-10">
        <ExperienceList />
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
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="cursor-default select-none rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-[14px] text-foreground/85 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:rotate-[-1.5deg] hover:border-foreground hover:bg-foreground hover:text-background hover:shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
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
        <div className="marquee-track relative mt-10 overflow-hidden rounded-2xl">
          <div className="animate-marquee marquee-anim flex w-max gap-5">
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
      </div>
    </section>
  );
}

const SONG_TITLE = "Nothing's Gonna Change My Love for You";
const SONG_ARTIST = "George Benson";
const SONG_URL =
  "https://open.spotify.com/search/Nothing's%20Gonna%20Change%20My%20Love%20for%20You%20George%20Benson";

function OnRepeatCard() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      // Drop the track at /public/on-repeat.mp3 to play it inline.
      const a = new Audio("/on-repeat.mp3");
      a.loop = true;
      a.addEventListener("ended", () => setPlaying(false));
      audioRef.current = a;
    }
    const a = audioRef.current;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // No local audio file — open the track on Spotify instead.
        window.open(SONG_URL, "_blank", "noopener,noreferrer");
      });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={`${playing ? "Pause" : "Play"} ${SONG_TITLE} by ${SONG_ARTIST}`}
      className="group w-full rounded-3xl border border-border bg-card p-8 text-center outline-none transition-colors hover:bg-card/70 focus-visible:ring-2 focus-visible:ring-foreground/20 sm:text-left"
    >
      <div className="relative mx-auto h-28 w-28 sm:mx-0">
        <div
          className={`h-full w-full rounded-full ${playing ? "animate-record" : ""}`}
          style={{
            background:
              "radial-gradient(circle at center, #e11d48 0 9%, #0a0a0a 9% 13%, #1c1c1c 13% 100%)",
          }}
        >
          <span className="absolute left-1/2 top-[16%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/25" />
        </div>
        <span
          className="pointer-events-none absolute inset-2 rounded-full"
          style={{
            background:
              "repeating-radial-gradient(circle at center, rgba(255,255,255,0.05) 0 1px, transparent 1px 4px)",
          }}
        />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 ring-2 ring-black/50" />
        <span
          className={`absolute -right-2 h-20 w-1.5 origin-top rounded-full bg-neutral-300 transition-transform duration-300 ${
            playing ? "-top-3 rotate-[26deg]" : "-top-4 rotate-[10deg]"
          }`}
        />
        <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
          {playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px]" aria-hidden="true" />
          )}
        </span>
      </div>
      <h3 className="mt-6 text-xl font-semibold">On repeat</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        {onRepeat}
      </p>
      <p className="mt-3 text-[13px] font-medium text-foreground/80">
        {playing ? "♫ Now playing" : "▶ Tap to play"} — {SONG_TITLE}
        <span className="text-muted-foreground"> · {SONG_ARTIST}</span>
      </p>
    </button>
  );
}

function AboutMeSection() {
  return (
    <section className="grid items-start gap-10 pt-16 md:grid-cols-[1fr_300px]">
      <div>
        <SectionHeading eyebrow="About" title="about me" />
        <p className="mt-8 text-[17px] leading-relaxed text-foreground/85">
          Hi, I'm Priti — a Senior Product Designer at Tata 1mg, recovering
          chemical engineer, and lifelong tinkerer.
        </p>
        <div className="mt-8">
          <p className="text-[15px] font-semibold text-foreground">
            these days I'm learning:
          </p>
          <ul className="mt-3 space-y-2 text-[15px] text-foreground/85">
            {learning.map((l) => (
              <li key={l} className="flex gap-2">
                <span className="text-foreground/40">•</span>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <OnRepeatCard />
    </section>
  );
}

function WorkingWithMe() {
  return (
    <section className="mt-24">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        How it is to be working with me?
      </h2>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_300px]">
        <div className="space-y-7">
          {principles.map((p) => (
            <p key={p.tag} className="text-[16px] leading-relaxed text-foreground/85">
              <span
                className={`mr-2 inline-block rounded-md border px-2 py-0.5 text-[15px] font-medium ${p.tagClass}`}
              >
                {p.tag}
              </span>
              {p.text}
            </p>
          ))}
        </div>
        <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 ring-1 ring-border" />
      </div>
    </section>
  );
}

function IfNotDesign() {
  const stack = [
    "from-slate-300 to-slate-500",
    "from-emerald-200 to-emerald-400",
    "from-amber-200 to-orange-300",
    "from-sky-200 to-indigo-300",
    "from-rose-200 to-pink-300",
  ];
  return (
    <section className="mt-24">
      <div className="grid items-center gap-8 rounded-3xl border border-border bg-card p-8 sm:p-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold italic">If not design, then what?</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85">
            {ifNotDesign.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-b from-sky-200 via-sky-100 to-slate-100 ring-1 ring-border">
          <span className="absolute left-4 top-4 text-sm text-slate-500">
            Somewhere in the mountains ⛰️
          </span>
          <div className="absolute bottom-3 right-3 flex">
            {stack.map((g, i) => (
              <div
                key={i}
                className={`h-12 w-12 rounded-lg bg-gradient-to-br ${g} ring-2 ring-background`}
                style={{ transform: `rotate(${(i - 2) * 6}deg)`, marginLeft: i ? "-10px" : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <SubPageTopBar onBack={onBack} width="max-w-4xl" />
      <main className="mx-auto max-w-4xl px-6 pb-32">
        <AboutMeSection />
        <Experience />
        <WorkingWithMe />
        <IfNotDesign />
        <div className="mt-16">
          <ContactBadge />
        </div>
      </main>
    </>
  );
}

function FloatingAsk({
  onOpenAsk,
  hidden,
}: {
  onOpenAsk: () => void;
  hidden?: boolean;
}) {
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
  const visible = show && !hidden;
  return (
    <div
      className={`fixed inset-x-0 bottom-6 z-40 flex justify-center px-6 transition-all duration-300 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      <button
        type="button"
        onClick={onOpenAsk}
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-lg shadow-black/15 outline-none transition duration-200 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Sparkle /> Ask AI
      </button>
    </div>
  );
}

function Footer() {
  const line = [...quotes, ...quotes];
  return (
    <footer className="mt-24">
      <div className="marquee-track overflow-hidden border-y border-border py-4">
        <div className="animate-marquee marquee-anim flex w-max items-center gap-6">
          {line.map((quote, i) => (
            <span
              key={i}
              className="flex items-center gap-6 whitespace-nowrap text-[15px] italic text-foreground/55"
            >
              {quote}
              <span className="not-italic text-foreground/25">✳</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 pt-10 pb-28 text-center text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:pb-10 sm:text-left">
        <div className="space-y-1">
          <p className="whitespace-nowrap text-xs uppercase tracking-wider">© 2026 Priti Jani.</p>
          <p className="text-[13px]">Created with lots of Procrastination 🥲 &amp; Inspiration ☕️</p>
        </div>
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

const ASK_FOLLOWUPS = [
  "What got you into product design?",
  "Which project are you proudest of?",
  "What's it like working with you?",
  "How do you use AI in your work?",
  "What are you learning these days?",
];

function pickFollowups(asked: string): string[] {
  const a = asked.toLowerCase();
  return ASK_FOLLOWUPS.filter((f) => f.toLowerCase() !== a).slice(0, 3);
}

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

function AskPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [popover, setPopover] = useState<null | "ask" | "browse">(null);
  const [followups, setFollowups] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, followups, typing]);

  const submit = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setInput("");
    setPopover(null);
    setFollowups([]);
    setMessages((m) => [...m, { role: "user", text: q }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", text: askReply(q) }]);
      setFollowups(pickFollowups(q));
    }, 1100);
  };

  const reset = () => {
    setMessages([]);
    setFollowups([]);
    setInput("");
    setPopover(null);
    setTyping(false);
  };

  return (
    <aside
      role="dialog"
      aria-label="Ask Priti"
      className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-foreground" aria-hidden="true" />
          <span className="text-[15px] font-medium">Ask Priti</span>
          <span className="group relative flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-foreground/10 text-muted-foreground">
            <Info className="h-3 w-3" aria-hidden="true" />
            <span className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-64 -translate-x-1/4 rounded-xl bg-foreground px-3.5 py-2.5 text-[13px] leading-relaxed text-background opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
              This is an AI trained on my real case studies. It can occasionally
              get things wrong — check the project pages for the full story.
            </span>
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={reset}
            aria-label="Reset conversation"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

        <div ref={bodyRef} className="flex-1 overflow-y-auto px-5 py-6">
          {messages.length === 0 ? (
            <>
              <h3 className="text-xl font-semibold tracking-tight">Ask me anything.</h3>
              <ul className="mt-6 space-y-4">
                {ASK_SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => submit(s)}
                      className="group flex w-full items-start gap-3 text-left text-[14px] text-foreground/80 transition-colors hover:text-foreground"
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
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-background text-foreground/90"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="flex max-w-[85%] items-center gap-2 rounded-2xl bg-background px-4 py-3">
                  <span className="text-[13px] text-muted-foreground">Priti AI is thinking</span>
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" />
                  </span>
                </div>
              )}
              {followups.length > 0 && (
                <div className="pt-2">
                  <p className="text-[13px] text-muted-foreground">Keep exploring</p>
                  <ul className="mt-3 space-y-3">
                    {followups.map((f) => (
                      <li key={f}>
                        <button
                          type="button"
                          onClick={() => submit(f)}
                          className="group flex w-full items-start gap-3 text-left text-[14px] text-foreground/80 transition-colors hover:text-foreground"
                        >
                          <CornerDownRight className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40 group-hover:text-foreground" aria-hidden="true" />
                          {f}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
  );
}

export default function App() {
  useTapSound();
  const [askOpen, setAskOpen] = useState(false);
  const [page, setPage] = useState<"home" | "projects" | "about">("home");
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
      <div
        className={`transition-[padding] duration-300 ease-out ${
          askOpen ? "lg:pr-[28rem]" : ""
        }`}
      >
      {page === "home" ? (
        <>
          <Header
            onOpenAsk={() => setAskOpen(true)}
            onOpenAbout={() => setPage("about")}
          />
          <SideNav />
          <main className="mx-auto max-w-3xl px-6">
            <Hero />
            <Work onViewAll={() => openProjects("case")} />
            <SkillsAndTools />
          </main>
          <Creatives onViewAll={() => openProjects("creative")} />
        </>
      ) : page === "projects" ? (
        <ProjectsPage onBack={() => setPage("home")} initialTab={projectsTab} />
      ) : (
        <AboutPage onBack={() => setPage("home")} />
      )}
      <Footer />
      </div>
      <FloatingAsk onOpenAsk={() => setAskOpen(true)} hidden={askOpen} />
      <AskPanel open={askOpen} onClose={() => setAskOpen(false)} />
    </div>
  );
}
