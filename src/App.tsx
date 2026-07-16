import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Lenis from "lenis";
import {
  Heart,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
  CircleUserRound,
  Home,
  Menu,
  Sparkles,
  Send,
  Copy,
  Check,
  ExternalLink,
  X,
  Info,
  Wand2,
  CornerDownRight,
  RotateCcw,
  Play,
  Pause,
  Target,
  Network,
  Search,
  ListTree,
  Boxes,
  ClipboardCheck,
  PenLine,
  Compass,
  GitCompare,
  Route,
  Frame,
  MousePointerClick,
  Zap,
  Figma,
  Framer,
  Component,
  Terminal,
  Plug,
  MessageSquareText,
  FileCode,
  Braces,
  LayoutGrid,
  Droplets,
  GitBranch,
  TrendingUp,
  Type,
  Palette,
  Layout,
  Accessibility,
  FileText,
  Users,
  MessagesSquare,
  Workflow,
  Megaphone,
  Layers,
  ShieldCheck,
  Coins,
  FlaskConical,
  Smartphone,
  Lightbulb,
  Sun,
  Moon,
  Award,
  type LucideIcon,
} from "lucide-react";
import {
  projects,
  caseStudies,
  skillCategories,
  creatives,
  experience,
  awards,
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
import {
  FigmaLogo,
  FramerLogo,
  Html5Logo,
  Css3Logo,
  BootstrapLogo,
  SassLogo,
  DrupalLogo,
  GitLogo,
  ClaudeLogo,
  NotionLogo,
  LottieLabLogo,
} from "./brands";

type BrandLogo = (props: { className?: string }) => JSX.Element;

const BRAND_LOGOS: Record<string, BrandLogo> = {
  Figma: FigmaLogo,
  "Figma Make": FigmaLogo,
  "Figma MCP": FigmaLogo,
  Framer: FramerLogo,
  Claude: ClaudeLogo,
  "Claude Code": ClaudeLogo,
  HTML: Html5Logo,
  CSS: Css3Logo,
  "Bootstrap 5": BootstrapLogo,
  SCSS: SassLogo,
  "Drupal 11": DrupalLogo,
  Git: GitLogo,
  Notion: NotionLogo,
  LottieLab: LottieLabLogo,
};

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
  return (
    <span className="inline-block text-xs transition-transform group-hover:animate-sparkle">
      ✦
    </span>
  );
}

const LINKEDIN_HANDLE = "@priti-jani14";

/**
 * Contact trigger + "Get in touch" popover (email with copy, LinkedIn link).
 * `align` controls which edge the popover hangs from the button.
 */
function ContactButton({
  className,
  align = "right",
  children,
}: {
  className: string;
  align?: "left" | "right";
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.emailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={className}
      >
        {children}
      </button>
      <div
        role="dialog"
        aria-label="Get in touch"
        className={`absolute top-full z-50 mt-2 w-[24rem] max-w-[calc(100vw-2rem)] origin-top rounded-2xl bg-neutral-900 p-5 text-white shadow-2xl ring-1 ring-white/10 transition-all duration-200 ease-out ${
          align === "right" ? "right-0" : "left-0"
        } ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
            : "pointer-events-none opacity-0 -translate-y-1 scale-[0.98]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-medium text-white/60">Get in touch</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-white/50 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] text-white/45">Email</p>
            <p className="truncate text-[15px] font-semibold">{links.emailAddress}</p>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email copied" : "Copy email"}
            className="shrink-0 rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <Check className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            ) : (
              <Copy className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] text-white/45">LinkedIn</p>
            <p className="truncate text-[15px] font-semibold">{LINKEDIN_HANDLE}</p>
          </div>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Open LinkedIn profile"
            className="shrink-0 rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Mobile "Get in touch" as a bottom sheet (the desktop popover is awkward on
// small screens), with the same email-copy + LinkedIn actions.
function ContactSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.emailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div
      className={`fixed inset-0 z-[80] sm:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-label="Get in touch"
        className={`absolute inset-x-0 bottom-0 rounded-t-3xl bg-neutral-900 p-6 pb-8 text-white shadow-2xl ring-1 ring-white/10 transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/20" />
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-medium text-white/60">Get in touch</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-white/50 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] text-white/45">Email</p>
            <p className="truncate text-[15px] font-semibold">{links.emailAddress}</p>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email copied" : "Copy email"}
            className="shrink-0 rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <Check className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            ) : (
              <Copy className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] text-white/45">LinkedIn</p>
            <p className="truncate text-[15px] font-semibold">{LINKEDIN_HANDLE}</p>
          </div>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Open LinkedIn profile"
            className="shrink-0 rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

const NAV: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Inbox },
  { id: "about", label: "About", icon: CircleUserRound },
];

// Solid pill for the scrolled nav — opaque so it stays readable over content
// (glassmorphism washed out against the page cards).
const NAV_SOLID = "border border-border bg-card shadow-lg";

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

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);
  return { dark, toggle: () => setDark((v) => !v) };
}

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 outline-none transition-colors duration-300 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20 ${NAV_SOLID}`}
    >
      {dark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}

function Header({
  page,
  onOpenAsk,
  onHome,
  onWork,
  onAbout,
}: {
  page: "home" | "projects" | "about" | "case";
  onOpenAsk: () => void;
  onHome: () => void;
  onWork: () => void;
  onAbout: () => void;
}) {
  // Drop a photo at /public/avatar.jpg to show it here; falls back to the dot.
  const avatar = "avatar.jpg";
  const [avatarOk, setAvatarOk] = useState(true);
  const active =
    page === "projects" || page === "case"
      ? "work"
      : page === "about"
        ? "about"
        : "home";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id: string) => {
    setMenuOpen(false);
    if (id === "home") onHome();
    else if (id === "work") onWork();
    else onAbout();
  };
  return (
    <header className="sticky top-0 z-30">
      <nav className="mx-auto flex max-w-[52rem] items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onHome}
            aria-label="Home"
            className={`w-8 shrink-0 translate-x-0 scale-100 overflow-hidden opacity-100 transition-all duration-500 ease-out ${
              scrolled
                ? "sm:pointer-events-none sm:w-0 sm:-translate-x-1 sm:scale-90 sm:opacity-0"
                : ""
            }`}
          >
            {avatar && avatarOk ? (
              <img
                src={avatar}
                alt="Priti Jani"
                onError={() => setAvatarOk(false)}
                className="h-9 w-9 rounded-full object-cover align-middle shadow-lg ring-2 ring-card"
              />
            ) : (
              <span className="inline-block h-8 w-8 rounded-full bg-foreground align-middle" />
            )}
          </button>
          <div
            className={`hidden items-center gap-0.5 rounded-full p-1 transition-all duration-500 ease-out sm:flex sm:gap-1 ${NAV_SOLID} ${
              scrolled ? "-ml-2 sm:-ml-4" : ""
            }`}
          >
            {NAV.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => go(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium leading-none outline-none transition duration-200 ease-out active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-1.5 sm:px-4 sm:py-2 sm:text-[15px] ${
                    isActive
                      ? "bg-background text-foreground shadow-sm ring-1 ring-black/[0.06] active:bg-background dark:ring-white/10"
                      : "text-foreground/70 hover:bg-foreground/[0.05] hover:text-foreground active:bg-foreground/[0.09]"
                  }`}
                >
                  {isActive && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <a
            href={links.cv}
            target="_blank"
            rel="noreferrer"
            className={`hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-foreground/25 sm:inline-flex sm:px-3.5 ${NAV_SOLID}`}
          >
            <FileText className="h-4 w-4" aria-hidden="true" /> Resume
          </a>
          {scrolled ? (
            <div className="hidden sm:block">
              <ContactButton
                align="right"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm outline-none transition-all duration-300 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25 sm:px-3.5"
              >
                <Send className="h-4 w-4" aria-hidden="true" />{" "}
                <span className="hidden sm:inline">Contact</span>
              </ContactButton>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAsk}
              className={`group hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-foreground transition-colors duration-300 sm:inline-flex sm:px-3.5 ${NAV_SOLID}`}
            >
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <Sparkle /> <span className="hidden sm:inline">Ask AI</span>
              </span>
            </button>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-foreground/20 sm:hidden ${NAV_SOLID}`}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* Mobile dropdown menu */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 sm:hidden"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-60 origin-top-right rounded-2xl border border-border bg-card p-2 shadow-xl sm:hidden">
                {NAV.map(({ id, label, icon: Icon }) => {
                  const isActive = active === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => go(id)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium transition-colors ${
                        isActive
                          ? "bg-foreground/[0.06] text-foreground"
                          : "text-foreground/70 hover:bg-foreground/[0.04]"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      {label}
                    </button>
                  );
                })}
                <div className="my-1.5 h-px bg-border" />
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenAsk();
                  }}
                  className="flex w-full items-center rounded-xl px-3 py-2.5 text-left hover:bg-foreground/[0.04]"
                >
                  <span className="inline-flex items-center gap-3 text-[15px] font-semibold text-foreground">
                    <Sparkle /> Ask AI
                  </span>
                </button>
                <a
                  href={links.cv}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-foreground/80 hover:bg-foreground/[0.04]"
                >
                  <FileText className="h-[18px] w-[18px]" aria-hidden="true" /> Resume
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(true);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-foreground/80 hover:bg-foreground/[0.04]"
                >
                  <Send className="h-[18px] w-[18px]" aria-hidden="true" /> Contact
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
      <ContactSheet open={contactOpen} onClose={() => setContactOpen(false)} />
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
  const current = experience[0];
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, on: false });
  const [mailCopied, setMailCopied] = useState(false);
  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText(links.emailAddress);
      setMailCopied(true);
      window.setTimeout(() => setMailCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const MAX = 20;
    setTilt({ rx: -py * MAX, ry: px * MAX, on: true });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, on: false });
  return (
    <section id="home" className="scroll-mt-24 pt-8 pb-14 sm:pt-10">
      <div className="mx-auto max-w-[52rem] px-4 sm:px-6 [perspective:850px]">
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.on ? 1.05 : 1})`,
            transition: tilt.on
              ? "transform 80ms ease-out, box-shadow 300ms ease-out"
              : "transform 500ms ease-out, box-shadow 300ms ease-out",
          }}
          className="group relative overflow-hidden rounded-[28px] bg-[#11332a] px-7 py-9 shadow-lg will-change-transform [transform-style:preserve-3d] hover:shadow-2xl sm:px-12 sm:py-12 lg:px-14 lg:py-14"
        >
          {/* desktop: full composite with camera + journal stickers */}
          <img
            src="hero-card.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-right lg:block"
          />
          {/* mobile: faint grid + journal peeking at the bottom-right */}
          <div className="pointer-events-none absolute inset-0 lg:hidden" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
            <img
              src="hero-journal.webp"
              alt=""
              className="absolute -bottom-7 right-0 w-[50%] max-w-[210px] translate-x-20"
            />
          </div>
          <div className="relative max-w-2xl lg:max-w-[34rem]">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-[2.75rem]">
              Priti Jani
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-[17px] font-medium text-[#E3A64A]">Product Designer</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Open to work
              </span>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-white/75 sm:text-[17px] sm:leading-[1.75]">
              Product Designer with 4+ years designing enterprise and B2B SaaS
              products at scale. I turn complex, data-heavy requirements into
              simple, usable flows — obsessing over the details people
              don&apos;t notice, but always feel.
            </p>

            <p className="mt-7 text-[15px] text-white/55">
              Reach out via{" "}
              <button
                type="button"
                onClick={copyMail}
                aria-label={mailCopied ? "Email copied" : "Copy email address"}
                className="group/mail inline-flex items-center font-medium text-[#E3A64A] underline underline-offset-4 transition-colors hover:text-[#efba63]"
              >
                {mailCopied ? "copied" : "mail"}
                {mailCopied ? (
                  <Check
                    className="ml-1 h-3.5 w-3.5 text-emerald-400"
                    aria-hidden="true"
                  />
                ) : (
                  <Copy
                    className="ml-0 h-0 w-0 opacity-0 transition-all duration-200 group-hover/mail:ml-1 group-hover/mail:h-3.5 group-hover/mail:w-3.5 group-hover/mail:opacity-100"
                    aria-hidden="true"
                  />
                )}
              </button>{" "}
              or on{" "}
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group/li inline-flex items-center font-medium text-[#E3A64A] underline underline-offset-4 transition-colors hover:text-[#efba63]"
              >
                LinkedIn
                <ArrowUpRight
                  className="ml-0 h-0 w-0 opacity-0 transition-all duration-200 group-hover/li:ml-1 group-hover/li:h-3.5 group-hover/li:w-3.5 group-hover/li:opacity-100"
                  aria-hidden="true"
                />
              </a>
            </p>

            <div className="mt-7 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <span className="text-[13px] text-white/60">Currently at</span>
                <span className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-md bg-white ring-1 ring-white/20">
                  <img
                    src={current.logo.src}
                    alt=""
                    className="h-full w-full object-contain p-0.5"
                  />
                </span>
                <span className="text-[13px] font-medium text-white/85">
                  Netlink Software Group America Inc
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SPECIALTIES = [
  "AI-Powered UX",
  "Data-Heavy Platforms",
  "Complex Workflows",
  "Decision-Centric Design",
  "Design Systems",
  "Enterprise UX",
  "Design → Code",
  "BI Platforms",
  "AI Tooling",
  "Healthcare",
  "GovTech",
  "E-commerce",
];

function FocusAreas() {
  const row = [...SPECIALTIES, ...SPECIALTIES];
  return (
    <section className="mt-6 overflow-hidden py-10">
      {/* Band + text tilt together (width-extended so it bleeds past both edges) → text stays inside the band on every screen width, no scale so it stays crisp */}
      <div className="-ml-[6%] w-[112%] -rotate-2">
        <div className="marquee-track overflow-hidden border-y border-white/10 bg-[#11332a] py-4 shadow-lg">
          <div className="animate-marquee marquee-anim flex w-max items-center gap-6 [backface-visibility:hidden] [will-change:transform]">
            {row.map((s, i) => (
              <span
                key={i}
                className="flex items-center gap-6 whitespace-nowrap text-[15px] font-medium text-white/85"
              >
                {s}
                <span className="text-[#E3A64A]/75" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
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

function ProjectCard({
  project,
  onOpen,
}: {
  project: (typeof projects)[number];
  onOpen: (id: string) => void;
}) {
  const { liked, count, toggle } = useLike(project.id, project.likes);
  const [imgOk, setImgOk] = useState(true);
  return (
    <article
      id={project.id}
      className="rounded-3xl bg-card p-4 sm:p-6 transition-colors hover:bg-card/80 scroll-mt-24"
    >
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        aria-label={`Open ${project.title} case study`}
        className="block w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-background/40">
          {project.image && imgOk ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              onError={() => setImgOk(false)}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${project.gradient}`}
              aria-label={project.title}
            />
          )}
        </div>
      </button>
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
        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View project
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="mt-2 px-1">
        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="text-left text-[15px] font-medium text-foreground hover:opacity-80 transition-opacity"
        >
          {project.title}
          <span className="text-muted-foreground font-normal"> — {project.description}</span>
        </button>
        {project.measures && project.measures.length > 0 && (
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground">
            {project.measures.map((m, i) => (
              <span key={m} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-foreground/25" aria-hidden="true">•</span>}
                {m}
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}

function Work({
  onViewAll,
  onOpen,
}: {
  onViewAll: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <section id="work" className="mt-14 sm:mt-24 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Selected Work
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Case studies
          </h2>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground/[0.06] px-4 py-2 text-sm font-medium text-foreground outline-none transition-all duration-200 ease-out hover:bg-foreground/[0.1] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
      {HOME_PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} onOpen={onOpen} />
      ))}
    </section>
  );
}

function CreativeGridCard({
  creative,
  onOpen,
}: {
  creative: (typeof creatives)[number];
  onOpen: (c: (typeof creatives)[number]) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(creative)}
      aria-label={`View ${creative.name}`}
      className={`group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br ${creative.gradient} text-left ring-1 ring-border transition-transform duration-300 hover:-translate-y-1`}
    >
      {creative.image ? (
        <img
          src={creative.image}
          alt={creative.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-10 select-none text-[160px] font-bold leading-none text-foreground/[0.06]"
        >
          {creative.name[0]}
        </span>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <ArrowUpRight
        className="absolute right-5 top-5 h-4 w-4 text-white/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col p-6">
        <p className="font-medium text-white">{creative.name}</p>
        <p className="text-[13px] text-white/70">{creative.category}</p>
      </div>
    </button>
  );
}

function ProjectsPage({
  initialTab,
  onOpen,
  onBack,
}: {
  initialTab: "case" | "creative";
  onOpen: (id: string) => void;
  onBack: () => void;
}) {
  const [tab, setTab] = useState<"case" | "creative">(initialTab);
  const [creativeOpen, setCreativeOpen] = useState<
    (typeof creatives)[number] | null
  >(null);
  const TABS = [
    { id: "case", label: "Case Studies" },
    { id: "creative", label: "Creatives" },
  ] as const;
  return (
    <>
      {tab === "case" && <SideNav items={projects} watchId="case-studies" />}
      <main className="mx-auto max-w-[52rem] px-6 pb-14 sm:pb-32">
        <section className="pt-10 pb-8">
          <button
            type="button"
            onClick={onBack}
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </button>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            All Work
          </p>
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
              <ProjectCard key={project.id} project={project} onOpen={onOpen} />
            ))}
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {creatives.map((creative, i) => (
              <CreativeGridCard
                key={i}
                creative={creative}
                onOpen={setCreativeOpen}
              />
            ))}
          </section>
        )}
      </main>
      {creativeOpen && (
        <CreativeLightbox
          item={creativeOpen}
          onClose={() => setCreativeOpen(null)}
        />
      )}
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

function CaseSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-24">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {eyebrow}
      </p>
      {title && (
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}

// Renders **…** spans in bold; everything else as plain text.
function renderRich(text: string) {
  return text.split("**").map((seg, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {seg}
      </strong>
    ) : (
      <span key={i}>{seg}</span>
    ),
  );
}

function TagGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((t) => {
          const Brand = BRAND_LOGOS[t];
          return (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.06] px-3 py-1.5 text-[13px] text-foreground/85"
            >
              {Brand && <Brand className="h-3.5 w-3.5" />}
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const CASE_SECTIONS = [
  { id: "cs-intro", label: "Intro" },
  { id: "cs-problem", label: "The challenge" },
  { id: "cs-research", label: "Research" },
  { id: "cs-process", label: "Process" },
  { id: "cs-solution", label: "Solution" },
  { id: "cs-impact", label: "Impact" },
];

// Always-visible scroll-spy rail for the case study detail page.
function CaseStudyRail() {
  const [active, selectActive] = useActiveSection(CASE_SECTIONS.map((s) => s.id));
  return (
    <aside className="hidden xl:block fixed left-8 top-1/2 z-20 -translate-y-1/2">
      <ul className="space-y-3 text-[14px]">
        {CASE_SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => selectActive(s.id)}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-3.5 rounded-md outline-none transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-foreground/20 ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground/60 hover:text-foreground"
                }`}
              >
                <span className="flex w-8 justify-start" aria-hidden="true">
                  <span
                    className={`rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? "h-0.5 w-8 bg-foreground"
                        : "h-px w-4 bg-muted-foreground/50 group-hover:w-6 group-hover:bg-foreground/70"
                    }`}
                  />
                </span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function CaseStudyPage({
  id,
  onBack,
  onOpen,
}: {
  id: string;
  onBack: () => void;
  onOpen: (id: string) => void;
}) {
  const project = projects.find((p) => p.id === id);
  const cs = caseStudies[id];
  const [imgOk, setImgOk] = useState(true);
  useEffect(() => setImgOk(true), [id]);
  if (!project || !cs) return null;
  const idx = projects.findIndex((p) => p.id === id);
  const next = projects[(idx + 1) % projects.length];
  return (
    <main className="mx-auto max-w-[52rem] px-6 pb-14 sm:pb-32">
      <CaseStudyRail />
      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All work
      </button>

      <header className="mt-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {cs.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-foreground/85">
          {cs.summary}
        </p>
      </header>

      <div className="mt-8 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-background/40 ring-1 ring-border">
        {project.image && imgOk ? (
          <img
            src={assetUrl(project.image)}
            alt={project.title}
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${project.gradient}`} />
        )}
      </div>

      <section id="cs-intro" className="mt-12 grid scroll-mt-24 gap-10 border-t border-border pt-10 md:grid-cols-[1fr_240px]">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Intro
          </p>
          <div className="mt-5 space-y-5 text-[16px] leading-relaxed text-foreground/85">
            {cs.intro.map((para, i) => (
              <p key={i}>{renderRich(para)}</p>
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          <TagGroup label="Role" items={cs.tags.role} />
          <TagGroup label="Status" items={cs.tags.status} />
          <TagGroup label="Type" items={cs.tags.type} />
          <TagGroup label="Tools" items={cs.tags.tools} />
        </aside>
      </section>

      <CaseSection id="cs-problem" eyebrow="The problem" title="The challenge">
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
          {cs.problem.text}
        </p>
        <ul className="mt-6 space-y-3">
          {cs.problem.goals.map((g) => (
            <li key={g} className="flex gap-3 text-[15px] text-foreground/85">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              {g}
            </li>
          ))}
        </ul>
        {cs.problem.stats && cs.problem.stats.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-3">
            {cs.problem.stats.map((st) => (
              <div key={st.label}>
                <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {st.value}
                </p>
                <p className="mt-2 text-[14px] leading-snug text-muted-foreground">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </CaseSection>

      <CaseSection id="cs-research" eyebrow="Research" title="What I learned">
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
          {cs.research.text}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {cs.research.findings.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-4 text-[14px] leading-relaxed text-foreground/85"
            >
              {f}
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection id="cs-process" eyebrow="Process" title="How I got there">
        <ol className="space-y-5">
          {cs.process.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-[13px] font-semibold text-background">
                {i + 1}
              </span>
              <div>
                <p className="text-[15px] font-medium text-foreground">{s.step}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-foreground/80">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection id="cs-solution" eyebrow="Solution" title="The solution">
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
          {cs.solution.text}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {cs.solution.highlights.map((h) => (
            <div key={h.title} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-[15px] font-semibold text-foreground">{h.title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                {h.text}
              </p>
            </div>
          ))}
        </div>
        {/* Screen slots — real mockups when provided, else gradient placeholders. */}
        {cs.screens && cs.screens.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cs.screens.map((s) => (
              <figure key={s.src} className="overflow-hidden rounded-2xl ring-1 ring-border">
                <div className="aspect-[16/10] w-full overflow-hidden bg-background/40">
                  <img
                    src={assetUrl(s.src)}
                    alt={s.caption}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="bg-card px-4 py-2.5 text-[13px] text-muted-foreground">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[2, 3].map((n) => (
              <div
                key={n}
                className={`flex aspect-[16/10] items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient} ring-1 ring-border`}
              >
                <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-foreground/40">
                  Screen {n}
                </span>
              </div>
            ))}
          </div>
        )}
      </CaseSection>

      <CaseSection id="cs-impact" eyebrow="Impact" title="Outcomes">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cs.outcomes.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-3xl font-semibold tracking-tight text-foreground">
                {m.value}
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-foreground/85">
          {cs.outcomes.text}
        </p>
      </CaseSection>

      <button
        type="button"
        onClick={() => onOpen(next.id)}
        className="group mt-20 flex w-full items-center justify-between gap-6 rounded-3xl border border-border bg-card p-6 text-left outline-none transition-colors hover:bg-card/70 focus-visible:ring-2 focus-visible:ring-foreground/20 sm:p-8"
      >
        <span>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Next project
          </span>
          <span className="mt-1 block text-xl font-semibold text-foreground sm:text-2xl">
            {next.title}
          </span>
        </span>
        <ArrowRight
          className="h-6 w-6 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
          aria-hidden="true"
        />
      </button>
    </main>
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
                <div className="mt-4 space-y-4">
                  <p className="text-[15px] leading-relaxed text-foreground/85">
                    {job.description}
                  </p>
                  {job.highlight && (
                    <div className="rounded-xl border border-violet-200 bg-violet-50/70 p-3.5 dark:border-violet-500/25 dark:bg-violet-500/10">
                      <span className="inline-block rounded-md border border-violet-200 bg-violet-100 px-2 py-0.5 text-[12px] font-medium text-violet-900 dark:border-violet-500/30 dark:bg-violet-500/20 dark:text-violet-200">
                        Featured · {job.highlight.label}
                      </span>
                      <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
                        {job.highlight.text}
                      </p>
                    </div>
                  )}
                  {job.bullets && job.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {job.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/85"
                        >
                          <span
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-foreground/40"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
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
    <section id="experience" className="mt-14 sm:mt-24 scroll-mt-24">
      <SectionHeading eyebrow="Experience" title="where I have worked" />
      <div className="mt-10">
        <ExperienceList />
      </div>
    </section>
  );
}

const SKILL_ICONS: Record<string, LucideIcon> = {
  // Design & Product Thinking
  "UX Strategy": Target,
  "Product Thinking": Lightbulb,
  "Product Design": Boxes,
  "UX/UI": Layout,
  "Interaction Design": MousePointerClick,
  "Systems Thinking": Network,
  "User Research": Search,
  Discovery: Compass,
  "Information Architecture": ListTree,
  "Usability Testing": ClipboardCheck,
  "A/B Testing": GitCompare,
  Experimentation: FlaskConical,
  "Conversion Rate Optimisation": TrendingUp,
  "Journey Mapping": Route,
  "Data-Informed Decisions": TrendingUp,
  "Product Positioning": Compass,
  "UX Copywriting": PenLine,
  "Design QA": ShieldCheck,
  "Product Psychology": Users,
  // Design Systems
  Tokens: Coins,
  "Component Libraries": Layers,
  Governance: ShieldCheck,
  Documentation: FileText,
  "Multi-brand Systems": Boxes,
  // UI & Visual Design
  "Visual Design": Palette,
  Typography: Type,
  Layout: LayoutGrid,
  Branding: Palette,
  "Responsive Design": Smartphone,
  Accessibility: Accessibility,
  WCAG: Accessibility,
  // Collaboration & Leadership
  "Cross-Functional Collaboration": Users,
  "Stakeholder Communication": MessagesSquare,
  "Design-Engineering Handoff": Workflow,
  "Campaign & Growth Design": Megaphone,
  // Interaction & Prototyping
  Wireframing: Frame,
  Prototyping: MousePointerClick,
  "User Testing": ClipboardCheck,
  "Motion & Micro-interactions": Zap,
  Figma: Figma,
  "Figma Make": Wand2,
  Framer: Framer,
  Protopie: Component,
  // AI Tools & Workflow
  Claude: Sparkles,
  "Claude Code": Terminal,
  "Figma MCP": Plug,
  "Prompt Engineering": MessageSquareText,
  "AI-Augmented Design": Wand2,
  // Engineering & Development
  HTML: FileCode,
  CSS: Braces,
  "Bootstrap 5": LayoutGrid,
  "Drupal 11": Droplets,
  Git: GitBranch,
};

function SkillsAndTools() {
  return (
    <section id="skills-tools" className="mt-14 sm:mt-24 scroll-mt-24">
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
              {cat.items.map((item) => {
                const Brand = BRAND_LOGOS[item];
                const Icon = SKILL_ICONS[item] ?? Sparkles;
                return (
                  <span
                    key={item}
                    className="inline-flex cursor-default select-none items-center gap-1.5 rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-[14px] text-foreground/85 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:rotate-[-1.5deg] hover:border-foreground hover:bg-foreground hover:text-background hover:shadow-sm"
                  >
                    {Brand ? (
                      <Brand className="h-4 w-4 shrink-0" />
                    ) : (
                      <Icon className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                    )}
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AwardRow({
  a,
  n,
  onOpen,
}: {
  a: (typeof awards)[number];
  n: number;
  onOpen: (a: (typeof awards)[number]) => void;
}) {
  const [imgOk, setImgOk] = useState(true);
  const hasImg = Boolean(a.certificate) && imgOk;
  return (
    <div className="group relative border-t border-border">
      <button
        type="button"
        onClick={() => hasImg && onOpen(a)}
        aria-label={`View ${a.title} certificate`}
        className={`grid w-full grid-cols-1 gap-x-8 gap-y-3 py-8 text-left outline-none transition-colors focus-visible:bg-foreground/[0.02] sm:grid-cols-[1fr_1fr] sm:items-start ${
          hasImg ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="flex gap-4">
          <span className="pt-1 text-[13px] tabular-nums text-muted-foreground/70">
            {String(n).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground transition-[font-style] group-hover:italic sm:text-2xl">
              {a.title}
            </h3>
            <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {a.issuer}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-between gap-6 sm:pl-2">
          <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground">
            {a.description}
          </p>
          <span className="hidden shrink-0 items-center gap-1 pt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground sm:inline-flex">
            View
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </button>

      {/* Certificate preview — floats in on hover (desktop) */}
      <div className="pointer-events-none absolute right-0 top-1/2 z-20 hidden w-[300px] -translate-y-1/2 translate-x-6 scale-95 overflow-hidden rounded-xl bg-card opacity-0 shadow-2xl ring-1 ring-border transition-all duration-200 ease-out group-hover:translate-x-2 group-hover:scale-100 group-hover:opacity-100 xl:block">
        <div className="aspect-[16/11] w-full overflow-hidden">
          {hasImg ? (
            <img
              src={a.certificate}
              alt={`${a.title} certificate`}
              onError={() => setImgOk(false)}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${a.gradient}`}>
              <Award className="h-8 w-8 text-foreground/30" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CertificateLightbox({
  award,
  onClose,
}: {
  award: (typeof awards)[number];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${award.title} certificate`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close certificate"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <img
        src={award.certificate}
        alt={`${award.title} certificate`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
      />
      <p className="text-center text-sm text-white/80">
        <span className="font-semibold text-white">{award.title}</span>
        <span className="mx-1.5 text-white/40">·</span>
        {award.issuer} · {award.year}
      </p>
    </div>
  );
}

function Awards() {
  const [open, setOpen] = useState<(typeof awards)[number] | null>(null);
  return (
    <section id="awards" className="mt-14 sm:mt-24 scroll-mt-24">
      <SectionHeading eyebrow="Recognition" title="Awards & accolades" />
      <div className="mt-8 border-b border-border">
        {awards.map((a, i) => (
          <AwardRow key={a.title} a={a} n={i + 1} onOpen={setOpen} />
        ))}
      </div>
      {open && (
        <CertificateLightbox award={open} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}

function CreativeMarqueeRow({
  reverse,
  onOpen,
}: {
  reverse: boolean;
  onOpen: (c: (typeof creatives)[number]) => void;
}) {
  const items = reverse ? [...creatives].reverse() : creatives;
  const line = [...items, ...items];
  return (
    <div className="marquee-track overflow-hidden">
      <div
        className={`marquee-anim flex w-max gap-6 [--marquee-duration:68s] sm:[--marquee-duration:40s] ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {line.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onOpen(c)}
            aria-label={`View ${c.name}`}
            className={`group relative block h-72 w-[26rem] shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br ${c.gradient} text-left ring-1 ring-border transition-transform duration-300 hover:-translate-y-1`}
          >
            {c.image ? (
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-10 select-none text-[160px] font-bold leading-none text-foreground/[0.06]"
              >
                {c.name[0]}
              </span>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <ArrowUpRight
              className="absolute right-5 top-5 h-5 w-5 text-white/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col p-6">
              <p className="text-lg font-medium text-white">{c.name}</p>
              <p className="text-[14px] text-white/70">{c.category}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CreativeLightbox({
  item,
  onClose,
}: {
  item: (typeof creatives)[number];
  onClose: () => void;
}) {
  const startIdx = Math.max(
    0,
    creatives.findIndex((c) => c === item),
  );
  const [idx, setIdx] = useState(startIdx);
  const go = (d: number) =>
    setIdx((i) => (i + d + creatives.length) % creatives.length);
  const current = creatives[idx];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${current.name} preview`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Image with prev / next arrows hugging its edges (not the screen edges) */}
      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label="Previous creative"
          className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white outline-none backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:ring-2 focus-visible:ring-white/40 sm:left-3 sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        {current.image && (
          <img
            key={current.image}
            src={current.image}
            alt={current.name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[78vh] max-w-[86vw] rounded-lg object-contain shadow-2xl"
          />
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label="Next creative"
          className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white outline-none backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:ring-2 focus-visible:ring-white/40 sm:right-3 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-white/80"
      >
        <span className="font-semibold text-white">{current.name}</span>
        <span className="text-white/40">·</span>
        <span>{current.category}</span>
        <a
          href={links.behance}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-medium text-white transition-colors hover:bg-white/20"
        >
          View on Behance
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

function Creatives({ onViewAll }: { onViewAll: () => void }) {
  const [open, setOpen] = useState<(typeof creatives)[number] | null>(null);
  return (
    <section id="creatives" className="mt-14 sm:mt-24 scroll-mt-24">
      <div className="mx-auto max-w-[52rem] px-6">
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
      {/* Full-bleed, two opposing rows of larger cards */}
      <div className="mt-10 space-y-6">
        <CreativeMarqueeRow reverse={false} onOpen={setOpen} />
        <CreativeMarqueeRow reverse={true} onOpen={setOpen} />
      </div>
      {open && <CreativeLightbox item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

const SONG_TITLE = "The Winner Takes It All";
const SONG_ARTIST = "ABBA";
const SONG_SRC = "on-repeat.mp3";

function OnRepeatCard() {
  const [playing, setPlaying] = useState(false);
  const mediaRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    const m = mediaRef.current;
    if (!m) return;
    if (playing) {
      m.pause();
      setPlaying(false);
      return;
    }
    m.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  useEffect(() => () => mediaRef.current?.pause(), []);

  return (
    <div
      className="w-full rounded-3xl border border-border p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:text-left"
      style={{ backgroundColor: "rgba(238, 241, 245, 0.3)" }}
    >
      {/* Hidden audio element plays the track when the vinyl is clicked. */}
      <audio
        ref={mediaRef}
        src={SONG_SRC}
        loop
        preload="metadata"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        className="pointer-events-none absolute h-px w-px opacity-0"
        aria-hidden="true"
      />
      {/* The vinyl is the control: click it to drop the tonearm and play. */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={`${playing ? "Pause" : "Play"} ${SONG_TITLE} by ${SONG_ARTIST}`}
        className="group relative mx-auto block h-24 w-24 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-4 focus-visible:ring-offset-card sm:mx-0"
      >
        {/* Warm glow while playing */}
        <span
          className={`pointer-events-none absolute -inset-1.5 rounded-full bg-rose-500/25 blur-md transition-opacity duration-500 ${
            playing ? "animate-pulse opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
        <div
          className={`relative h-full w-full rounded-full transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 group-active:scale-95 ${
            playing ? "animate-record" : ""
          }`}
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
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 ring-2 ring-black/50" />
        {/* Play/pause hint that pops in on hover */}
        <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
          {playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px]" aria-hidden="true" />
          )}
        </span>
        {/* White tonearm — swings onto the record while the song plays. */}
        <span
          className={`pointer-events-none absolute -right-1.5 h-16 w-1.5 origin-top rounded-full bg-neutral-300 shadow-sm transition-all duration-500 ease-out ${
            playing ? "-top-2 rotate-[26deg]" : "-top-4 rotate-[-8deg]"
          }`}
        >
          <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-neutral-400" />
        </span>
      </button>
      <div className="mt-5 flex items-center justify-center gap-2 sm:justify-start">
        <h3 className="text-lg font-semibold">On repeat</h3>
        {playing && (
          <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-foreground/70 animate-eq"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        )}
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
        {onRepeat}
      </p>
    </div>
  );
}

function AboutMeSection() {
  return (
    <section className="grid items-start gap-10 pt-16 md:grid-cols-[1fr_260px]">
      <div>
        <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          About
        </p>
        <div>
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
    <section className="mt-14 sm:mt-24">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        How it is to be working with me?
      </h2>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_300px]">
        <div className="space-y-7">
          {principles.map((p) => (
            <p key={p.tag} className="text-[15px] leading-relaxed text-foreground/85">
              <span
                className={`mr-2 inline-block rounded-md border px-2 py-0.5 text-[15px] font-medium ${p.tagClass}`}
              >
                {p.tag}
              </span>
              {p.text}
            </p>
          ))}
        </div>
        <div className="aspect-[3/4] w-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 ring-1 ring-border">
          <img
            src="about/workspace.webp"
            alt="My desk — a mood-board wall, a fairy-lit Ganesha idol, and a laptop open to work."
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function IfNotDesign() {
  const stack = [
    "about/travel-1.webp",
    "about/travel-2.webp",
    "about/travel-3.webp",
    "about/travel-4.webp",
    "about/travel-5.webp",
  ];
  const [active, setActive] = useState(0);
  return (
    <section className="mt-14 sm:mt-24">
      <div className="grid items-stretch gap-8 rounded-3xl border border-border bg-card p-8 sm:p-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold italic">If not design, then what?</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85">
            {ifNotDesign.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="relative h-72 w-full min-w-0 overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-border md:h-full">
          {/* Big preview — the selected photo, crossfading between choices */}
          {stack.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Gradients keep the label and thumbnails legible over any photo */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute left-4 top-4 text-sm font-medium text-white drop-shadow">
            Somewhere in the mountains ⛰️
          </span>
          {/* Thumbnails — click to swap into the big view */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-3">
            {stack.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-pressed={i === active}
                className={`h-11 w-11 shrink-0 overflow-hidden rounded-lg outline-none ring-2 transition-all duration-200 focus-visible:ring-white ${
                  i === active
                    ? "scale-105 ring-white"
                    : "opacity-70 ring-white/40 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
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
      <main className="mx-auto max-w-[52rem] px-6 pb-14 sm:pb-32">
        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:hidden"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
        </button>
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
      className={`fixed inset-x-0 bottom-6 z-40 flex items-center justify-center gap-3 px-6 transition-all duration-300 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      <button
        type="button"
        onClick={onOpenAsk}
        className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium shadow-lg shadow-black/25 ring-1 ring-white/10 outline-none transition duration-200 ease-out hover:bg-neutral-800 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="inline-flex items-center gap-2 text-white">
          <Sparkle /> Ask AI
        </span>
      </button>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background shadow-lg outline-none transition-all duration-200 ease-out hover:bg-card active:scale-95 focus-visible:ring-2 focus-visible:ring-foreground/25"
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function FooterCTA() {
  return (
    <section className="relative mt-12 overflow-hidden sm:mt-24">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-100/70 via-background to-emerald-100/70 opacity-80 dark:from-orange-500/10 dark:via-background dark:to-emerald-500/10 dark:opacity-100"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[52rem] px-6 py-20 text-center sm:py-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Let&apos;s build something together{" "}
          <span className="text-foreground/50" aria-hidden="true">
            ✦
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
          Whether you have a product that needs a refresh, a new idea that needs
          shaping, or just want to talk design — I&apos;d love to hear from you.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={links.cal}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-6 py-3 text-sm font-medium text-white shadow-sm outline-none transition-all duration-200 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25"
          >
            Book a call
          </a>
          <a
            href={links.email}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground outline-none transition-colors duration-200 hover:bg-card focus-visible:ring-2 focus-visible:ring-foreground/25"
          >
            Send an email
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const line = [...quotes, ...quotes];
  return (
    <footer>
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
      <div className="mx-auto flex max-w-[52rem] flex-col items-center gap-4 px-6 pt-10 pb-28 text-center text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:pb-10 sm:text-left">
        <div className="space-y-1">
          <p className="whitespace-nowrap text-[13px]">
            © 2026. Made by{" "}
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Priti Jani
            </a>
          </p>
          <p className="text-[13px]">Created with lots of Procrastination 🥲 &amp; Inspiration ☕️</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider sm:gap-5">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={links.email}
            className="cursor-pointer underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Email
          </a>
          <a
            href={links.cv}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Resume
          </a>
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
    return "I'm a product designer who also builds — design in Figma, Framer & Protopie, and engineering in React, TypeScript, Tailwind and more. See the Skills & Tools section.";
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
          <span className="inline-flex items-center text-foreground">
            <Sparkle />
          </span>
          <span className="text-[15px] font-semibold text-foreground">
            Ask AI
          </span>
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
                <div className="flex max-w-[85%] items-center gap-2.5 rounded-2xl bg-background px-4 py-3">
                  <span className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 animate-loader-pulse rounded-[3px] bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                    <span className="h-2.5 w-2.5 animate-loader-pulse rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 [animation-delay:0.16s]" />
                    <span className="inline-flex rotate-45">
                      <span className="block h-2.5 w-2.5 animate-loader-pulse rounded-[2px] bg-gradient-to-br from-pink-500 to-indigo-500 [animation-delay:0.32s]" />
                    </span>
                  </span>
                  <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 bg-clip-text text-[13px] font-medium text-transparent">
                    Generating response…
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

function CursorDots() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -500, y: -500 });
  const pos = useRef({ x: -500, y: -500 });
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setOn(true);
    };
    const leave = () => setOn(false);
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      const el = ref.current;
      if (el) {
        el.style.setProperty("--mx", `${pos.current.x}px`);
        el.style.setProperty("--my", `${pos.current.y}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className={`cursor-dots ${on ? "is-on" : ""}`} />
  );
}

// --- Real-URL routing -------------------------------------------------------
// Each view has its own path (/, /work, /work/<slug>, /about) so search
// engines can index case studies as individual pages. On a static host a deep
// link 404s, so 404.html stashes the path in sessionStorage and bounces to the
// app root; we restore it here AFTER the bundle (and its relative assets) load.
if (typeof window !== "undefined") {
  try {
    const saved = sessionStorage.getItem("spaPath");
    if (saved) {
      sessionStorage.removeItem("spaPath");
      window.history.replaceState(null, "", saved);
    }
  } catch {
    /* sessionStorage unavailable */
  }
}

// Served at "/" on the custom domain and "/Design-Work/" on GitHub Pages.
const ROUTE_BASE =
  typeof window !== "undefined" &&
  window.location.pathname.startsWith("/Design-Work")
    ? "/Design-Work/"
    : "/";

const slugForId = (id: string) => id.replace(/^project-/, "");
const idForSlug = (slug: string) => `project-${slug}`;

// Root-absolute asset URL. Relative paths (base "./") break on multi-segment
// routes like /work/<slug>, where they'd resolve against /work/. Prefixing with
// ROUTE_BASE keeps images correct on both the custom domain and GitHub Pages.
const assetUrl = (p: string) =>
  /^https?:\/\//.test(p) ? p : ROUTE_BASE + p.replace(/^\/+/, "");

type Route =
  | { page: "home" }
  | { page: "projects"; projectsTab: "case" | "creative" }
  | { page: "about" }
  | { page: "case"; caseId: string };

function pathForRoute(r: Route): string {
  if (r.page === "about") return ROUTE_BASE + "about";
  if (r.page === "projects")
    return ROUTE_BASE + (r.projectsTab === "creative" ? "creatives" : "work");
  if (r.page === "case") return ROUTE_BASE + "work/" + slugForId(r.caseId);
  return ROUTE_BASE;
}

function routeFromPath(): Route {
  if (typeof window === "undefined") return { page: "home" };
  let p = window.location.pathname;
  if (ROUTE_BASE !== "/" && p.startsWith(ROUTE_BASE))
    p = "/" + p.slice(ROUTE_BASE.length);
  const seg = p.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  if (seg[0] === "work") {
    if (seg[1]) {
      const id = idForSlug(seg[1]);
      if (projects.some((pr) => pr.id === id)) return { page: "case", caseId: id };
    }
    return { page: "projects", projectsTab: "case" };
  }
  if (seg[0] === "creatives") return { page: "projects", projectsTab: "creative" };
  if (seg[0] === "about") return { page: "about" };
  return { page: "home" };
}

export default function App() {
  useTapSound();
  // Buttery smooth momentum scrolling (disabled for reduced-motion / touch)
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    )
      return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      anchors: true,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  const [askOpen, setAskOpen] = useState(false);
  const [route0] = useState(routeFromPath);
  const [page, setPage] = useState<"home" | "projects" | "about" | "case">(
    route0.page,
  );
  const [projectsTab, setProjectsTab] = useState<"case" | "creative">(
    route0.page === "projects" ? route0.projectsTab : "case",
  );
  const [caseId, setCaseId] = useState<string | null>(
    route0.page === "case" ? route0.caseId : null,
  );
  // Push a new browser URL for a route (no-op if we're already there).
  const pushRoute = (r: Route) => {
    const path = pathForRoute(r);
    if (window.location.pathname !== path)
      window.history.pushState(null, "", path);
  };
  // When navigating back to the home page, scroll to this section (else top).
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const openProjects = (tab: "case" | "creative") => {
    setProjectsTab(tab);
    setPage("projects");
    pushRoute({ page: "projects", projectsTab: tab });
  };
  const openCase = (id: string) => {
    setCaseId(id);
    setPage("case");
    pushRoute({ page: "case", caseId: id });
    // Track which case study was opened (visible in GA4 → Events).
    const title = projects.find((p) => p.id === id)?.title ?? id;
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.(
      "event",
      "case_study_open",
      { case_id: id, case_title: title },
    );
  };
  const goAbout = () => {
    setPage("about");
    pushRoute({ page: "about" });
  };
  const goHome = () => {
    if (page === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setScrollTarget(null);
      setPage("home");
      pushRoute({ page: "home" });
    }
  };
  useEffect(() => {
    // On page change, jump to the target section (or top). Run after layout
    // settles (double rAF) and bypass CSS smooth-scroll for an instant reset.
    const jump = () => {
      if (page === "home" && scrollTarget) {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
          setScrollTarget(null);
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    };
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(jump);
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [page, caseId, scrollTarget]);
  // Sync app state when the user uses the browser back/forward buttons.
  useEffect(() => {
    const onPop = () => {
      const r = routeFromPath();
      setScrollTarget(null);
      setPage(r.page);
      if (r.page === "projects") setProjectsTab(r.projectsTab);
      if (r.page === "case") setCaseId(r.caseId);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  // Keep the document title in step with the route (helps sharing + SEO).
  useEffect(() => {
    let t = "Priti Jani — Product & UX Designer";
    if (page === "case" && caseId) {
      const pr = projects.find((p) => p.id === caseId);
      if (pr) t = `${pr.title} — Case Study · Priti Jani`;
    } else if (page === "projects") {
      t = "Work — Priti Jani";
    } else if (page === "about") {
      t = "About — Priti Jani";
    }
    document.title = t;
  }, [page, caseId]);
  return (
    <div className="isolate min-h-screen bg-background text-foreground antialiased">
      <CursorDots />
      <div
        className={`transition-[padding] duration-300 ease-out ${
          askOpen ? "lg:pr-[28rem]" : ""
        }`}
      >
        <Header
          page={page}
          onOpenAsk={() => setAskOpen(true)}
          onHome={goHome}
          onWork={() => openProjects("case")}
          onAbout={goAbout}
        />
        {page === "home" ? (
          <>
            <SideNav />
            <main>
              <Hero />
              <FocusAreas />
              <div className="mx-auto max-w-[52rem] px-6">
                <Work onViewAll={() => openProjects("case")} onOpen={openCase} />
                <SkillsAndTools />
                <Awards />
              </div>
            </main>
            <Creatives onViewAll={() => openProjects("creative")} />
          </>
        ) : page === "projects" ? (
          <ProjectsPage initialTab={projectsTab} onOpen={openCase} onBack={goHome} />
        ) : page === "case" && caseId ? (
          <CaseStudyPage
            id={caseId}
            onBack={() => openProjects("case")}
            onOpen={openCase}
          />
        ) : (
          <AboutPage onBack={goHome} />
        )}
        <FooterCTA />
        <Footer />
      </div>
      <FloatingAsk onOpenAsk={() => setAskOpen(true)} hidden={askOpen} />
      <AskPanel open={askOpen} onClose={() => setAskOpen(false)} />
    </div>
  );
}
