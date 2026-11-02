import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Lenis from "lenis";
import Matter from "matter-js";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Inbox,
  CircleUserRound,
  Home,
  Menu,
  Send,
  Copy,
  Check,
  ExternalLink,
  X,
  Route,
  FileText,
  Sun,
  Moon,
  Award,
  Image as ImageIcon,
  Play,
  Lock,
  type LucideIcon,
  Calendar,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

import {
  projects,
  caseStudies,
  toolstack,
  creatives,
  motionWork,
  awards,
  links,
} from "./data/content";
import type { StudyBlock, Persona } from "./data/content";

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
  SkProductDesign,
  SkDataDriven,
  SkDesignSystems,
  SkPrototyping,
  SkAiWorkflows,
  SkInteraction,
  SkFigmaToCode,
  SkUxResearch,
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
    // Touch: a scroll also starts with pointerdown, so wait for pointerup and
    // only play when the finger stayed put (a real tap, not a swipe).
    const MOVE_TOLERANCE = 10; // px
    const TAP_MAX_MS = 700;
    let start: { x: number; y: number; t: number } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // primary button / touch only
      if (e.pointerType === "mouse") {
        playTap();
        return;
      }
      start = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!start) return;
      const moved = Math.hypot(e.clientX - start.x, e.clientY - start.y);
      const elapsed = e.timeStamp - start.t;
      start = null;
      if (moved <= MOVE_TOLERANCE && elapsed <= TAP_MAX_MS) playTap();
    };
    const onCancel = () => {
      start = null; // the browser took over for scrolling
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onCancel);
    document.addEventListener("scroll", onCancel, { passive: true, capture: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onCancel);
      document.removeEventListener("scroll", onCancel, { capture: true });
    };
  }, []);
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
        className={`absolute top-full z-50 mt-2 w-[24rem] max-w-[calc(100vw-2rem)] origin-top rounded-2xl bg-neutral-900 p-5 text-left text-white shadow-2xl ring-1 ring-white/10 transition-all duration-200 ease-out ${
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
const NAV_SOLID =
  "border border-[#EDEDED] bg-background transition-all duration-200 ease-out dark:border-[#2a2a2a]";

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
  onHome,
  onWork,
  onAbout,
}: {
  page: "home" | "projects" | "about" | "case";
  onHome: () => void;
  onWork: () => void;
  onAbout: () => void;
}) {
  // Transparent logo mark; falls back to the dot.
  const avatar = "logo.png";
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
      <nav className="mx-auto flex max-w-[72rem] items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onHome}
            aria-label="Home"
            className={`w-9 shrink-0 translate-x-0 scale-100 overflow-hidden opacity-100 transition-all duration-500 ease-out ${
              scrolled
                ? "sm:pointer-events-none sm:w-0 sm:-translate-x-1 sm:scale-90 sm:opacity-0"
                : ""
            }`}
          >
            {avatar && avatarOk ? (
              <img
                src={assetUrl(avatar)}
                alt="Priti Jani"
                onError={() => setAvatarOk(false)}
                className="block aspect-square h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-border"
              />
            ) : (
              <span className="inline-block h-8 w-8 rounded-full bg-foreground align-middle" />
            )}
          </button>
          <div
            className={`hidden items-center gap-0.5 rounded-full p-1 transition-all duration-500 ease-out sm:flex sm:gap-1 ${NAV_SOLID} ${
              scrolled ? "-ml-2 sm:-ml-4" : ""
            } ${
              // On a case study, the floating "All work" button replaces the tabs
              // once you start reading, so the header stays out of the way.
              page === "case" && scrolled
                ? "pointer-events-none -translate-y-1 opacity-0"
                : ""
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
                      ? "bg-[#FAFBFC] text-foreground shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] active:bg-[#FAFBFC] dark:bg-foreground/[0.08] dark:shadow-none"
                      : "text-foreground/70 hover:bg-[#FAFBFC] hover:text-foreground active:bg-[#FAFBFC] dark:hover:bg-foreground/[0.06]"
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
          <ContactButton
            align="right"
            className="inline-flex h-9 w-9 items-center justify-center gap-1.5 rounded-full bg-primary text-sm font-medium text-primary-foreground outline-none transition-all duration-300 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25 sm:h-auto sm:w-auto sm:px-3.5 sm:py-2"
          >
            <Send className="h-4 w-4" aria-hidden="true" />{" "}
            <span className="hidden sm:inline">Contact</span>
          </ContactButton>

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
                          ? "bg-[#FAFBFC] text-foreground dark:bg-foreground/[0.06]"
                          : "text-foreground/70 hover:bg-[#FAFBFC] dark:hover:bg-foreground/[0.04]"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      {label}
                    </button>
                  );
                })}
                <div className="my-1.5 h-px bg-border" />
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

const GREETINGS = ["नमस्ते", "Hola", "Bonjour", "你好", "Hello"];
const HERO_PHRASES = [
  "opening Figma.",
  "sketching a solution.",
  "assuming what users need.",
  "designing a single screen.",
];

type SplashPhase = "show" | "leaving" | "done";

// Start-up window: writes hello in five languages in frosted-glass script (~4s in total), then slides away.
function StartupSplash({ phase, onPhase }: { phase: SplashPhase; onPhase: (p: SplashPhase) => void }) {
  const [g, setG] = useState(0);
  // Keep the latest callback in a ref so a parent re-render never restarts the timers.
  const onPhaseRef = useRef(onPhase);
  onPhaseRef.current = onPhase;
  useEffect(() => {
    if (phase !== "show") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t1 = 0;
    const iv = window.setInterval(() => {
      setG((cur) => {
        const next = cur + 1;
        if (next >= GREETINGS.length - 1) {
          // Last word: let it finish writing, hold briefly, then leave.
          window.clearInterval(iv);
          if (!t1) t1 = window.setTimeout(() => onPhaseRef.current("leaving"), reduce ? 400 : 700);
        }
        return Math.min(next, GREETINGS.length - 1);
      });
    }, reduce ? 160 : 780);
    return () => {
      window.clearInterval(iv);
      window.clearTimeout(t1);
    };
  }, [phase]);
  // Once the splash starts leaving, remove it after its fade-out finishes.
  useEffect(() => {
    if (phase !== "leaving") return;
    const t = window.setTimeout(() => onPhaseRef.current("done"), 600);
    return () => window.clearTimeout(t);
  }, [phase]);
  if (phase === "done") return null;
  const last = g === GREETINGS.length - 1;
  return (
    <div
      className="hero-root"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: "var(--hr-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity .6s ease, transform .6s cubic-bezier(.7,0,.2,1)",
        opacity: phase === "leaving" ? 0 : 1,
        transform: phase === "leaving" ? "translateY(-4%)" : "none",
        pointerEvents: phase === "leaving" ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <span key={g} className="splash-glow" style={{ display: "inline-block" }}>
        <span
          className="splash-word"
          style={{
            display: "inline-block",
            animation: last
              ? "greetWrite .9s cubic-bezier(.4,0,.2,1) both"
              : "greetWrite .8s cubic-bezier(.4,0,.2,1) both, greetOut .25s ease-in-out .55s forwards",
          }}
        >
          {GREETINGS[g]}
        </span>
      </span>
    </div>
  );
}

function Hero({ ready }: { ready: boolean }) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const rot = useRef<number | undefined>(undefined);
  const restart = () => {
    window.clearInterval(rot.current);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      rot.current = window.setInterval(() => setI((n) => (n + 1) % HERO_PHRASES.length), 2800);
  };
  useEffect(() => {
    restart();
    return () => {
      window.clearInterval(rot.current);
    };
  }, []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.emailAddress);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  const words = ["Product", "Designer", "who", "asks", "the", "right", "questions", "\n", "before", "*"];
  const started = ready ? "on" : "off";
  const grad = {
    background: "var(--hr-grad)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
    animation: "heroIn .6s cubic-bezier(.2,.7,.2,1)",
  } as const;
  const btn =
    "flex items-center gap-2.5 rounded-full border border-[var(--hr-border)] bg-[var(--hr-bg)] px-4 py-2.5 text-base text-[var(--hr-link)] md:text-[15px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#A3A3A3] hover:text-[var(--hr-strong)] hover:shadow-[0_6px_16px_rgba(0,0,0,.06)]";
  const chip = "inline-flex h-6 w-6 items-center justify-center rounded-md text-[var(--hr-chip-text)] bg-[var(--hr-chip)]";
  const status = (
    <div
      className="flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-base md:text-[15px]"
      style={{
        background: "var(--hr-bg)",
        borderColor: "var(--hr-border)",
        color: "var(--hr-link)",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--hr-green)", animation: "heroPulse 2s infinite" }} />
      <span style={{ color: "var(--hr-green)", fontWeight: 500 }}>Open to work</span>
      <span>&middot; For new opportunities</span>
    </div>
  );
  return (
    <section
      id="home"
      className="hero-root relative flex flex-col overflow-hidden pb-6 pt-8 sm:pb-[clamp(72px,10vh,110px)] sm:pt-[clamp(112px,16vh,150px)]"
      style={{
        background: "var(--hr-bg)",
        color: "var(--hr-text)",
        fontFamily: "'Manrope', system-ui, sans-serif",
      }}
    >
      <div className="relative mx-auto flex w-full max-w-[72rem] flex-wrap items-end justify-between gap-12 px-4 sm:px-6">
        <div className="flex max-w-[880px] flex-col gap-5 sm:gap-8">
          <p style={{ margin: "0 0 -8px", fontSize: "clamp(20px,1.6vw,22px)", fontWeight: 500, letterSpacing: "-0.02em", color: "var(--hr-mute)" }}>
            Hi, I&apos;m <span style={{ color: "var(--hr-strong)" }}>Priti Jani</span>
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(34px,3.2vw,40px)",
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: "-0.025em",
              color: "var(--hr-text)",
            }}
          >
            {words.map((w, k) =>
              w === "\n" ? (
                // Fixed break so the headline is always two lines on desktop, whichever phrase is showing.
                <br key={started + k} className="hidden lg:block" />
              ) : (
                <span key={started + k}>
                  <span
                    style={{
                      display: "inline-block",
                      animation: `heroIn .7s cubic-bezier(.2,.7,.2,1) ${k * 0.08}s both`,
                    }}
                  >
                    {w === "*" ? (
                      <span
                        key={i}
                        onClick={() => {
                          setI((n) => (n + 1) % HERO_PHRASES.length);
                          restart();
                        }}
                        style={{ ...grad, cursor: "pointer" }}
                      >
                        {HERO_PHRASES[i]}
                      </span>
                    ) : (
                      w
                    )}
                  </span>
                  {k < words.length - 1 ? " " : null}
                </span>
              ),
            )}
          </h1>
        </div>
      </div>

      <p
        className="relative mx-auto mb-4 mt-8 w-full max-w-[72rem] px-4 text-base sm:mb-5 sm:mt-[clamp(56px,10vh,96px)] sm:px-6 md:text-[15px]"
        style={{ color: "var(--hr-mute)" }}
      >
        Feel free to connect, I&rsquo;m always up for a good conversation.
      </p>
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 hidden h-px sm:block" style={{ background: "var(--hr-border)" }} />
        <div className="relative mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href={links.linkedin} target="_blank" rel="noreferrer" className={btn}>
              LinkedIn <span className={chip}><ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
            </a>
            <button type="button" onClick={copyEmail} className={`${btn} cursor-pointer`} style={{ font: "inherit" }}>
              {copied ? "Copied to clipboard" : "Copy email"} <span className={chip}>{copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}</span>
            </button>
            <a href={links.cv} target="_blank" rel="noreferrer" className={btn}>
              Resume <span className={chip}><ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
            </a>
          </div>
          {status}
        </div>
      </div>
    </section>
  );
}

const SPECIALTIES = [
  "AI Powered UX",
  "Data Heavy Platforms",
  "Complex Workflows",
  "Decision Centric Design",
  "Design Systems",
  "Enterprise UX",
  "Design → Code",
  "BI Platforms",
  "AI Tooling",
  "Healthcare",
  "GovTech",
  "Ecommerce",
];

function FocusAreas() {
  const row = [...SPECIALTIES, ...SPECIALTIES];
  return (
    <section className="mt-6 overflow-hidden py-10">
      {/* Band + text tilt together (width-extended so it bleeds past both edges) → text stays inside the band on every screen width, no scale so it stays crisp */}
      <div className="-ml-[6%] w-[112%] -rotate-2">
        <div className="marquee-track overflow-hidden border-y border-white/10 bg-brand-grad py-4 shadow-lg">
          <div className="animate-marquee marquee-anim flex w-max items-center gap-6 [backface-visibility:hidden] [will-change:transform]">
            {row.map((s, i) => (
              <span
                key={i}
                className="flex items-center gap-6 whitespace-nowrap text-[15px] font-medium text-white/85"
              >
                {s}
                <span className="text-sky-200/80" aria-hidden="true">
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

function LockFillIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25V9H6a2.5 2.5 0 0 0-2.5 2.5v8A2.5 2.5 0 0 0 6 22h12a2.5 2.5 0 0 0 2.5-2.5v-8A2.5 2.5 0 0 0 18 9h-.75V6.75A5.25 5.25 0 0 0 12 1.5Zm3.25 7.5V6.75a3.25 3.25 0 0 0-6.5 0V9h6.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Sticky stack: each card pins under the header and the one it covers scales down and dims
// as the next card slides over it. Desktop only; reduced-motion users get plain cards.
function CaseStack({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const cards = [...root.querySelectorAll<HTMLElement>("[data-stack-card]")];
      cards.forEach((el, i) => {
        const next = cards[i + 1];
        let p = 0;
        if (next && window.innerWidth > 767) {
          const r = el.getBoundingClientRect();
          p = Math.min(1, Math.max(0, (r.top + r.height - next.getBoundingClientRect().top) / r.height));
        }
        el.style.transform = p ? `scale(${1 - p * 0.08})` : "";
        el.style.filter = p ? `brightness(${1 - p * 0.4})` : "";
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

const CARD_MIN_H = "clamp(240px, calc((100vh - 250px) / 1.5), 460px)";

function ProjectCard({
  project,
  onOpen,
  flip = false,
}: {
  project: (typeof projects)[number];
  onOpen: (id: string) => void;
  flip?: boolean;
}) {
  const [imgOk, setImgOk] = useState(true);
  const locked = !!PROTECTED_CASES[project.id] && !isUnlocked(project.id);
  return (
    <article
      id={project.id}
      data-stack-card
      className="scroll-mt-24 origin-top will-change-transform md:sticky md:top-[88px]"
    >
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        aria-label={`Open ${project.title} case study`}
        className="group grid w-full gap-2 rounded-[30px] border border-[#efeff1] bg-[#f7f7f8] p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/[0.05] md:grid-cols-2"
      >
        {/* Text panel — category, headline, description and pill */}
        <div
          className={`flex flex-col gap-3 rounded-[24px] bg-white px-7 pb-7 pt-8 sm:px-9 dark:bg-card ${flip ? "md:order-none" : "md:order-last"}`}
          style={{ minHeight: CARD_MIN_H }}
        >
          <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#8a8a93] dark:text-muted-foreground">
            {project.title}
          </span>
          <h3 className="text-pretty text-[22px] font-medium leading-[1.32] tracking-[-0.018em] text-[#18181b] sm:text-[24px] dark:text-foreground">
            {project.headline ?? project.description}
          </h3>
          {project.headline && (
            <p className="text-pretty text-[15px] leading-[1.65] text-[#71717a] dark:text-muted-foreground">
              {project.description}
            </p>
          )}
          <span className="min-h-3 flex-1" />
          <span className="inline-flex h-[42px] w-fit items-center gap-2 rounded-full border border-[#dbe4ff] bg-[#eff4ff] px-[18px] text-sm font-medium text-[#1e3a8a] transition-colors duration-200 group-hover:bg-[#e2eaff] dark:border-blue-300/25 dark:bg-blue-300/10 dark:text-blue-200 dark:group-hover:bg-blue-300/20">
            {locked && <LockFillIcon className="h-3.5 w-3.5" />}
            {locked ? "Unlock case study" : (project.tag ?? "Case study")}
          </span>
        </div>
        {/* Media panel — image zooms on hover; locked work blurs and shows the lock on hover */}
        <div
          className={`group/img relative order-first overflow-hidden rounded-[24px] bg-[#120d3a] ${flip ? "md:order-last" : "md:order-first"}`}
          style={{ minHeight: CARD_MIN_H }}
        >
          {project.image && imgOk ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              onError={() => setImgOk(false)}
              className={`absolute inset-0 h-full w-full scale-[1.04] object-cover transition-[transform,filter] duration-[800ms] ease-out group-hover:scale-[1.08] ${
                locked ? "group-hover:blur-[22px]" : ""
              }`}
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-[800ms] ease-out group-hover:scale-105 ${
                locked ? "group-hover:blur-[22px]" : ""
              }`}
              aria-label={project.title}
            />
          )}
          {locked && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[rgba(10,8,20,0.25)] text-white opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-blue-900 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <LockFillIcon className="h-7 w-7" />
              </span>
              <span className="rounded-full bg-[rgba(10,10,14,0.8)] px-3.5 py-1.5 text-[13px] font-medium">
                Password protected
              </span>
            </div>
          )}
        </div>
      </button>
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
      <div className="space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Selected Work
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Case studies
        </h2>
      </div>
      <CaseStack className="flex flex-col gap-6">
        {HOME_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} flip={i % 2 === 1} />
        ))}
      </CaseStack>
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={onViewAll}
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground outline-none transition-all duration-200 ease-out hover:bg-card active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all work
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
          className={`absolute inset-0 h-full w-full object-cover ${creative.center ? "object-center" : "object-top"} transition-transform duration-500 group-hover:scale-[1.04]`}
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

// Click-to-load YouTube player: shows the thumbnail first (fast, no tracking until played).
function YouTubeEmbed({ id, title, poster, onPlay }: { id: string; title: string; poster?: string; onPlay: () => void }) {
  const [thumb, setThumb] = useState<"maxresdefault" | "hqdefault">("maxresdefault");
  const [thumbFailed, setThumbFailed] = useState(false);
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play ${title}`}
      className="group relative block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
    >
      {/* Gradient shows while the thumbnail loads, or if YouTube can't be reached. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-violet-600 via-indigo-700 to-slate-900"
      />
      {poster ? (
        <img
          src={assetUrl(poster)}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        !thumbFailed && (
          <img
            src={`https://i.ytimg.com/vi/${id}/${thumb}.jpg`}
            alt=""
            loading="lazy"
            onLoad={(e) => {
              // YouTube serves a tiny grey placeholder (120px wide) when maxres doesn't exist.
              if (thumb === "maxresdefault" && e.currentTarget.naturalWidth <= 120) setThumb("hqdefault");
            }}
            onError={() => (thumb === "maxresdefault" ? setThumb("hqdefault") : setThumbFailed(true))}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-xl transition-transform group-hover:scale-105">
          <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

function VideoLightbox({ item, onClose }: { item: (typeof motionWork)[number]; onClose: () => void }) {
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
  const frame = item.vertical
    ? "aspect-[9/16] h-[min(86vh,52rem)] max-w-[92vw]"
    : item.square
      ? "aspect-square h-[min(84vh,46rem)] max-w-[92vw]"
      : "aspect-video w-[min(92vw,70rem)] max-h-[82vh]";
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <div onClick={(e) => e.stopPropagation()} className={`overflow-hidden rounded-2xl bg-black shadow-2xl ${frame}`}>
        {item.youtube ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : item.src ? (
          <video src={assetUrl(item.src)} poster={item.poster ? assetUrl(item.poster) : undefined} controls autoPlay playsInline className="h-full w-full object-contain" />
        ) : null}
      </div>
      <p className="text-center text-sm text-white/85">
        <span className="font-semibold text-white">{item.title}</span>
        <span className="mx-1.5 text-white/40">·</span>
        {item.category}
      </p>
    </div>
  );
}

function MotionGrid() {
  const [open, setOpen] = useState<(typeof motionWork)[number] | null>(null);
  if (motionWork.length === 0) {
    return (
      <section className="flex min-h-[18rem] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border px-6 py-16 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/[0.06] text-foreground">
          <Play className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-lg font-semibold tracking-tight">Animation &amp; video, coming soon</p>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
          Motion studies, prototypes and short videos will live here.
        </p>
      </section>
    );
  }
  const isMicro = (m: (typeof motionWork)[number]) => Boolean(m.image || m.loop);
  const videos = motionWork.filter((m) => !isMicro(m));
  const micro = motionWork.filter(isMicro);
  // One wide + one portrait video sit side by side with players of equal height;
  // any further videos (e.g. a square one) go in a row below.
  const wide = videos.find((v) => !v.vertical && !v.square);
  const tall = videos.find((v) => v.vertical);
  const square = videos.find((v) => v.square);
  const side = tall ?? square;
  const paired = Boolean(wide && side);
  const pairRow = paired ? [wide!, side!] : videos;
  const extras = paired ? videos.filter((v) => v !== wide && v !== side) : [];

  const videoCard = (m: (typeof motionWork)[number]) => (
    <figure key={m.title} className="flex flex-col overflow-hidden rounded-3xl bg-[#FAFBFC] p-2.5 dark:bg-white/[0.05]">
      <div
        className={`overflow-hidden rounded-[20px] bg-black ${
          m.vertical
            ? "mx-auto aspect-[9/16] w-full max-w-[19rem] lg:max-w-none"
            : m.square
              ? "aspect-square w-full"
              : paired && tall
              ? "aspect-video w-full lg:aspect-auto lg:h-[28rem]"
              : "aspect-video w-full"
        }`}
      >
        {m.youtube ? (
          <YouTubeEmbed id={m.youtube} title={m.title} poster={m.poster} onPlay={() => setOpen(m)} />
        ) : m.src ? (
          <button
            type="button"
            onClick={() => setOpen(m)}
            aria-label={`Play ${m.title}`}
            className="group relative block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            {m.poster && (
              <img src={assetUrl(m.poster)} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-xl transition-transform group-hover:scale-105">
                <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden="true" />
              </span>
            </span>
          </button>
        ) : (
          <a
            href={m.href}
            target="_blank"
            rel="noreferrer"
            className="group relative block h-full w-full"
            aria-label={`Watch ${m.title}`}
          >
            {m.poster && (
              <img src={assetUrl(m.poster)} alt="" className="h-full w-full object-cover" loading="lazy" />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-xl">
                <Play className="h-6 w-6 translate-x-0.5 fill-current" aria-hidden="true" />
              </span>
            </span>
          </a>
        )}
      </div>
      <figcaption className="px-3 pb-2 pt-4">
        <p className="text-[16px] font-semibold tracking-tight text-foreground">{m.title}</p>
        <p className="mt-0.5 text-[14px] text-muted-foreground">{m.category}</p>
        {m.description && (
          <p className="mt-2 text-[14px] leading-relaxed text-foreground/70">{m.description}</p>
        )}
      </figcaption>
    </figure>
  );

  return (
    <div className="space-y-14">
      {videos.length > 0 && (
        <section
          className={`grid grid-cols-1 gap-6 ${
            paired ? (tall ? "lg:grid-cols-[minmax(0,1fr)_17rem]" : "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]") : "sm:grid-cols-2"
          }`}
        >
          {pairRow.map(videoCard)}
        </section>
      )}
      {extras.length > 0 && (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">{extras.map(videoCard)}</section>
      )}
      {micro.length > 0 && (
        <section className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {micro.map((m) => (
            <div key={m.title} className="aspect-square w-full overflow-hidden rounded-3xl border border-slate-100 bg-white">
              {m.loop ? (
                <video
                  src={assetUrl(m.loop)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={`${m.title}: ${m.category}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={assetUrl(m.image!)}
                  alt={`${m.title}: ${m.category}`}
                  loading="lazy"
                  className={`h-full w-full object-cover ${m.image!.endsWith("ai-sparkle.webp") ? "sparkle-breathe" : ""}`}
                />
              )}
            </div>
          ))}
        </section>
      )}
      {open && <VideoLightbox item={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function ProjectsPage({
  initialTab,
  onOpen,
  onBack,
}: {
  initialTab: "case" | "creative" | "motion";
  onOpen: (id: string) => void;
  onBack: () => void;
}) {
  const [tab, setTab] = useState<"case" | "creative" | "motion">(initialTab);
  const [creativeOpen, setCreativeOpen] = useState<
    (typeof creatives)[number] | null
  >(null);
  const TABS = [
    { id: "case", label: "Case Studies" },
    { id: "creative", label: "Creatives" },
    { id: "motion", label: "Animation / Video" },
  ] as const;
  return (
    <>
      <main className="mx-auto max-w-[72rem] px-6 pb-14 sm:pb-32">
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
          <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-[#FAFBFC] p-1 text-sm dark:bg-foreground/[0.06]">
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
          <section id="case-studies">
            <CaseStack className="flex flex-col gap-6">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} onOpen={onOpen} flip={i % 2 === 1} />
              ))}
            </CaseStack>
          </section>
        ) : tab === "motion" ? (
          <MotionGrid />
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

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
// Process cards cycle through our blue palette: navy, soft blue, outlined white, bright blue.
const PROCESS_TONES = [
  { card: "bg-[#0f1530] dark:bg-[#0f1530]", badge: "bg-white text-[#0f1530]", title: "text-white", text: "text-[#c9d6ff]", tall: false, art: "hand" },
  { card: "bg-[#dbe7ff] dark:bg-[#1b2a5a]", badge: "bg-[#1e3a8a] text-white", title: "text-[#1e3a8a] dark:text-blue-100", text: "text-[#2f4a8f] dark:text-blue-200/80", tall: true, art: "face" },
  { card: "border border-border bg-white dark:bg-card", badge: "bg-gradient-to-b from-[#3b6cf6] to-[#2346c7] text-white", title: "text-[#2346c7] dark:text-blue-300", text: "text-foreground/70", tall: false, art: "legs" },
  { card: "bg-gradient-to-b from-[#3b6cf6] to-[#2346c7]", badge: "bg-white text-[#2346c7]", title: "text-white", text: "text-white/80", tall: true, art: "spark" },
] as const;

// Small playful doodles that hang off or sit inside the process cards.
function ProcessArt({ kind }: { kind: (typeof PROCESS_TONES)[number]["art"] }) {
  const base = "pointer-events-none absolute transition-transform duration-500 ease-out";
  if (kind === "hand")
    return (
      <svg viewBox="0 0 150 90" className={`${base} -bottom-[4.2rem] right-10 h-[5.4rem] w-[9.4rem] origin-top group-hover:rotate-3`} aria-hidden="true">
        <path d="M30 0 C30 42 46 66 92 66" fill="none" stroke="#0f1530" strokeWidth="14" strokeLinecap="round" />
        <path d="M86 48 C100 40 116 44 128 40 L146 26 C150 24 154 28 150 32 L138 46 C142 60 128 78 108 78 C94 78 84 70 82 62 Z" fill="#fff" stroke="#0f1530" strokeWidth="4" strokeLinejoin="round" />
        <path d="M104 60 C112 64 122 62 128 56" fill="none" stroke="#0f1530" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  if (kind === "face")
    return (
      <svg viewBox="0 0 120 110" className={`${base} right-6 top-6 h-[6.4rem] w-[7rem] group-hover:-rotate-6`} aria-hidden="true">
        <g fill="none" stroke="#0f1530" strokeWidth="5" strokeLinecap="round">
          <path d="M14 22 C24 8 40 8 48 16" />
          <path d="M78 16 C88 8 104 8 112 20" />
          <circle cx="32" cy="46" r="17" />
          <circle cx="86" cy="46" r="17" />
          <path d="M22 70 C34 62 50 62 60 70" />
        </g>
        <circle cx="38" cy="42" r="7" fill="#0f1530" />
        <circle cx="92" cy="42" r="7" fill="#0f1530" />
        <circle cx="62" cy="96" r="8" fill="#0f1530" />
      </svg>
    );
  if (kind === "legs")
    return (
      <svg viewBox="0 0 170 90" className={`${base} -bottom-[4.4rem] left-8 h-[5.6rem] w-[10.6rem] origin-top group-hover:-rotate-3`} aria-hidden="true">
        <g fill="none" stroke="#2346c7" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M60 0 C60 26 50 34 34 38" />
          <path d="M104 0 C108 28 118 40 130 44" />
        </g>
        <g fill="#fff" stroke="#2346c7" strokeWidth="5" strokeLinejoin="round">
          <ellipse cx="24" cy="52" rx="18" ry="24" />
          <ellipse cx="140" cy="58" rx="18" ry="22" transform="rotate(-20 140 58)" />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 120 110" className={`${base} right-6 top-6 h-[6rem] w-[6.6rem] group-hover:rotate-12`} aria-hidden="true">
      <path d="M52 8 C56 40 70 54 100 58 C70 62 56 76 52 108 C48 76 34 62 4 58 C34 54 48 40 52 8Z" fill="#fff" />
      <path d="M96 14 C97 24 102 28 112 30 C102 32 97 36 96 46 C95 36 90 32 80 30 C90 28 95 24 96 14Z" fill="#fff" opacity="0.7" />
    </svg>
  );
}


// Colourful numbered cards (used for the solution highlights).
function ColourCards({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol
      className={`-mx-4 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-4 pb-20 pt-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden ${
        items.length <= 4 ? "lg:grid lg:overflow-visible lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]" : ""
      }`}
      style={{ ["--n" as string]: items.length }}
    >
      {items.map((s, i) => {
        const t = PROCESS_TONES[i % PROCESS_TONES.length];
        return (
          <li
            key={i}
            className={`group relative flex w-[17.5rem] shrink-0 snap-start flex-col justify-between rounded-[32px] p-6 transition-transform duration-300 ease-out hover:-translate-y-1 sm:w-[19rem] lg:w-auto ${
              t.tall ? "min-h-[24rem]" : "min-h-[19rem]"
            } ${t.card}`}
          >
            <span className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-semibold tracking-wide ${t.badge}`}>
              {ROMAN[i] ?? i + 1}
            </span>
            <ProcessArt kind={t.art} />
            <div className="relative z-10 mt-10">
              <p className={`text-[22px] font-semibold leading-tight tracking-tight ${t.title}`}>{s.title}</p>
              <p className={`mt-3 text-[14.5px] leading-[1.6] ${t.text}`}>{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const TIMELINE_BARS = [
  { bar: "bg-gradient-to-b from-[#3b6cf6] to-[#2346c7] text-white", pill: "bg-white" },
  { bar: "bg-[#8b7bff] text-white", pill: "bg-white" },
  { bar: "bg-[#cfe0ff] text-[#0f1530]", pill: "bg-[#0f1530]" },
  { bar: "bg-white text-[#0f1530]", pill: "bg-[#0f1530]" },
  { bar: "bg-[#38bdf8] text-[#0f1530]", pill: "bg-[#0f1530]" },
];

// Design-process section: numbered phases on top, and a dark timeline below whose bars
// load in one after another (the phase text above lights up in step with them).
function ProcessTimeline({ steps, bars }: { steps: { step: string; text: string }[]; bars?: string[] }) {
  const labels = bars && bars.length > 0 ? bars : steps.map((x) => x.step);
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers: number[] = [];
    const play = () => {
      timers.forEach(clearTimeout);
      timers = [];
      if (reduce) return setShown(labels.length);
      setShown(0);
      labels.forEach((_, i) => timers.push(window.setTimeout(() => setShown(i + 1), 500 + i * 650)));
    };
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) play();
        else {
          timers.forEach(clearTimeout);
          setShown(0);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [labels]);

  const n = steps.length;
  const nb = labels.length;
  const w = Math.min(34, (100 / nb) * 1.5);
  return (
    <section id="cs-process" className="mt-14 scroll-mt-24 border-t border-border pt-10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-9 overflow-hidden rounded-full" aria-hidden="true">
            <span className="h-full w-2/3 bg-[#3b6cf6]" />
            <span className="h-full w-1/3 bg-foreground" />
          </span>
          <h2 className="text-xl font-medium tracking-tight text-muted-foreground sm:text-2xl">Design Process</h2>
        </div>
        <span className="rounded-full bg-[#dbe7ff] px-3.5 py-1.5 text-[12px] font-medium text-[#1e3a8a] dark:bg-blue-300/15 dark:text-blue-200">
          Timeline
        </span>
      </div>

      <ol
        className="mt-10 grid gap-8 sm:gap-6 lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
        style={{ ["--n" as string]: n }}
      >
        {steps.map((s, i) => {
          // A phase lights up once the first timeline bar that belongs to it has loaded.
          const on = shown > Math.floor((i * nb) / n);
          return (
            <li key={s.step} className="relative">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-medium transition-colors duration-500 ${
                  on ? "bg-gradient-to-b from-[#3b6cf6] to-[#2346c7] text-white" : "bg-[#dbe7ff] text-[#1e3a8a] dark:bg-blue-300/15 dark:text-blue-200"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-5 text-[22px] font-semibold tracking-tight text-foreground">{s.step}</p>
              <p
                className={`mt-4 text-[14.5px] leading-[1.65] transition-colors duration-500 ${
                  on ? "text-foreground" : "text-muted-foreground/60"
                }`}
              >
                {s.text}
              </p>
            </li>
          );
        })}
      </ol>

      <div
        ref={ref}
        className="relative mt-10 h-[24rem] overflow-hidden rounded-[28px] bg-[#0a0c14] sm:h-[27rem]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex">
          {Array.from({ length: 10 }).map((_, k) => (
            <span key={k} className="h-full flex-1 border-l border-white/[0.04]" />
          ))}
        </div>
        {labels.map((label, i) => {
          const t = TIMELINE_BARS[i % TIMELINE_BARS.length];
          const left = nb === 1 ? 6 : 5 + (i * (90 - w)) / (nb - 1);
          const on = shown > i;
          return (
            <div
              key={label}
              className={`absolute flex h-[3rem] origin-left items-center gap-3 rounded-2xl pl-3 pr-4 text-[13px] font-medium shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:h-[3.6rem] sm:text-[15px] ${t.bar}`}
              style={{
                left: `${left}%`,
                width: `${w}%`,
                top: `${7 + i * (nb > 1 ? 72 / (nb - 1) : 0)}%`,
                opacity: on ? 1 : 0,
                transform: on ? "scaleX(1)" : "scaleX(0.15) translateX(-12px)",
              }}
            >
              <span className={`h-5 w-1.5 shrink-0 rounded-full sm:h-6 ${t.pill}`} />
              <span className="truncate">{label}</span>
            </div>
          );
        })}
      </div>
    </section>
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
    <section id={id} className="mt-14 scroll-mt-24 border-t border-border pt-10">
      {eyebrow && !title && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}

const isImagePath = (s: string) => /^projects\//.test(s) || /\.(jpg|jpeg|png|webp)$/i.test(s);

// Renders a real image (click to zoom) when given a path, else a labelled
// placeholder box.
function StudyMedia({
  value,
  alt,
  onZoom,
  className = "",
}: {
  value: string;
  alt: string;
  onZoom: (src: string) => void;
  className?: string;
}) {
  if (isImagePath(value)) {
    return (
      <button
        type="button"
        onClick={() => onZoom(assetUrl(value))}
        aria-label={`View ${alt} full size`}
        className={`group block w-full cursor-zoom-in overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 ${className}`}
      >
        <img src={assetUrl(value)} alt={alt} loading="lazy" className="w-full" />
      </button>
    );
  }
  return (
    <div
      className={`flex min-h-[200px] w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-border bg-card/40 p-6 text-center ${className}`}
    >
      <ImageIcon className="h-6 w-6 text-muted-foreground/60" aria-hidden="true" />
      <span className="rounded-md bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground ring-1 ring-border">
        Image placeholder
      </span>
      <span className="max-w-sm text-[13px] leading-snug text-muted-foreground">{value}</span>
    </div>
  );
}

// Highlighted takeaway callout (the deck's "👉 …" notes).
function StudyNote({ text }: { text: string }) {
  return (
    <div className="mt-6 rounded-xl bg-blue-900/[0.05] px-4 py-3 text-[14px] font-medium leading-relaxed text-blue-900 ring-1 ring-blue-900/10 dark:bg-blue-300/10 dark:text-blue-300 dark:ring-blue-300/20">
      {text}
    </div>
  );
}

function StudyBullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((b, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
          {b}
        </li>
      ))}
    </ul>
  );
}

// Wireframe → visual design: the second image fades in on hover (tap on touch).
function HoverRevealMedia({
  base,
  reveal,
  alt,
  onZoom,
}: {
  base: string;
  reveal: string;
  alt: string;
  onZoom: (src: string) => void;
}) {
  const [shown, setShown] = useState(false);
  return (
    <figure>
      <div
        className="group relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <img src={assetUrl(base)} alt={alt} loading="lazy" className="w-full" />
        <img
          src={assetUrl(reveal)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-out ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Tap target for touch devices + zoom on click */}
        <button
          type="button"
          onClick={() => onZoom(assetUrl(shown ? reveal : base))}
          onTouchStart={() => setShown((v) => !v)}
          aria-label={`View ${alt} full size`}
          className="absolute inset-0 h-full w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
        />
        <span
          className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-foreground/85 px-4 py-1.5 text-[12px] font-medium text-background shadow-lg backdrop-blur-sm transition-opacity duration-300 ${
            shown ? "opacity-0" : "opacity-100"
          }`}
        >
          Hover to see the visual design
        </span>
      </div>
    </figure>
  );
}

// A fully written case-study section.
// Count a stat up from zero once it scrolls into view ("-42%", "2.1×", "+38%", "24 hrs").
// Values with a colon or slash (4:20, 4.6/5) are shown as written.
function useCountUp(value: string, run: boolean) {
  const m = /^([^\d]*?)(\d+(?:\.\d+)?)([^\d:].*|)$/.exec(value);
  const [out, setOut] = useState(value);
  useEffect(() => {
    if (!m || value.includes(":")) return setOut(value);
    if (!run) return setOut(`${m[1]}0${m[3]}`);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setOut(value);
    const target = parseFloat(m[2]);
    const dec = (m[2].split(".")[1] ?? "").length;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      const v = target * (1 - Math.pow(1 - k, 3));
      setOut(`${m[1]}${v.toFixed(dec)}${m[3]}`);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, run]);
  return out;
}

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function StatCard({ stat, tone, run }: { stat: { value: string; label: string }; tone: "light" | "dark"; run: boolean }) {
  const shown = useCountUp(stat.value, run);
  return (
    <div
      className={`flex min-h-[15rem] flex-col justify-between rounded-[28px] p-7 sm:min-h-[17rem] ${
        tone === "dark" ? "bg-[#0a0c14] text-white" : "border border-border bg-[#f5f6f8] text-foreground dark:bg-white/[0.05]"
      }`}
    >
      <p className={`font-medium leading-none tracking-[-0.05em] tabular-nums ${/\d/.test(stat.value) ? "text-[clamp(44px,6vw,72px)]" : "text-[clamp(30px,3.4vw,46px)]"}`}>{shown}</p>
      <p className={`max-w-[22ch] text-[16px] leading-snug ${tone === "dark" ? "text-white/75" : "text-foreground/70"}`}>{stat.label}</p>
    </div>
  );
}

// Segmented progress ring for a percentage stat.
function RingCard({ stat, run }: { stat: { value: string; label: string }; run: boolean }) {
  const pct = Math.min(100, Math.abs(parseFloat(stat.value.replace(/[^\d.]/g, "")) || 0));
  const SEG = 30;
  const filled = Math.round((pct / 100) * SEG);
  const shown = useCountUp(stat.value, run);
  return (
    <div className="flex min-h-[19rem] flex-col rounded-[28px] border border-border bg-[#f5f6f8] p-7 dark:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-[12ch] text-[20px] font-medium leading-tight tracking-tight">{stat.label}</p>
      </div>
      <div className="relative mx-auto mt-4 h-44 w-44">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true">
          {Array.from({ length: SEG }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="14"
              x2="100"
              y2="38"
              strokeWidth="9"
              strokeLinecap="round"
              transform={`rotate(${(i * 360) / SEG} 100 100)`}
              className={i < filled ? "stroke-[#3b6cf6]" : "stroke-foreground/10"}
              style={{
                opacity: i < filled ? (run ? 1 : 0.15) : 1,
                transition: `opacity .4s ${i * 45}ms`,
              }}
            />
          ))}
        </svg>
        <p className="absolute inset-0 grid place-items-center text-[34px] font-medium tracking-[-0.04em] tabular-nums">{shown}</p>
      </div>
    </div>
  );
}

// "What I achieved": big-number tiles (the middle one dark), an optional ring for a
// percentage result, and the summary text beside it.
// Bento layout for four headline numbers: one big tile with a progress ring, one wide dark tile,
// and two small tiles. Numbers count up when the grid scrolls into view.
function BentoStats({ stats, run }: { stats: { value: string; label: string }[]; run: boolean }) {
  const [a, b, c, d] = stats;
  const va = useCountUp(a.value, run);
  const vb = useCountUp(b.value, run);
  const vc = useCountUp(c.value, run);
  const vd = useCountUp(d.value, run);
  const pct = Math.min(100, parseFloat(a.value.replace(/[^\d.]/g, "")) || 0);
  const SEG = 36;
  const filled = Math.round((pct / 100) * SEG);
  const tile = "relative flex flex-col justify-between overflow-hidden rounded-[26px] p-6 transition-transform duration-300 hover:-translate-y-1";
  return (
    <div className="mt-8 grid auto-rows-[10.5rem] grid-cols-2 gap-3 md:grid-cols-4">
      <div className={`${tile} col-span-2 row-span-2 bg-[#eef3ff] dark:bg-[#1b2a5a]`}>
        <svg viewBox="0 0 200 200" className="pointer-events-none absolute right-6 top-1/2 h-[13rem] w-[13rem] -translate-y-1/2 -rotate-90 sm:h-[15rem] sm:w-[15rem]" aria-hidden="true">
          {Array.from({ length: SEG }).map((_, i) => (
            <line
              key={i}
              x1="100" y1="10" x2="100" y2="30"
              strokeWidth="7" strokeLinecap="round"
              transform={`rotate(${(i * 360) / SEG} 100 100)`}
              className={i < filled ? "stroke-[#3b6cf6]" : "stroke-foreground/10"}
              style={{ opacity: i < filled ? (run ? 1 : 0.1) : 1, transition: `opacity .4s ${i * 40}ms` }}
            />
          ))}
        </svg>
        <p className="relative text-[clamp(52px,6.5vw,84px)] font-medium leading-none tracking-[-0.05em] tabular-nums text-[#1e3a8a] dark:text-blue-100">{va}</p>
        <p className="relative max-w-[16ch] text-[16px] leading-snug text-[#2f4a8f] dark:text-blue-200/80">{a.label}</p>
      </div>
      <div className={`${tile} col-span-2 bg-[#0a0c14] text-white`}>
        <p className="text-[clamp(40px,5vw,64px)] font-medium leading-none tracking-[-0.05em] tabular-nums">{vb}</p>
        <p className="max-w-[24ch] text-[15px] leading-snug text-white/70">{b.label}</p>
      </div>
      <div className={`${tile} border border-border bg-white dark:bg-card`}>
        <p className="text-[clamp(30px,3.4vw,44px)] font-medium leading-none tracking-[-0.04em] tabular-nums text-foreground">{vc}</p>
        <p className="text-[14px] leading-snug text-muted-foreground">{c.label}</p>
      </div>
      <div className={`${tile} bg-gradient-to-b from-[#3b6cf6] to-[#2346c7] text-white`}>
        <p className="text-[clamp(30px,3.4vw,44px)] font-medium leading-none tracking-[-0.04em] tabular-nums">{vd}</p>
        <p className="text-[14px] leading-snug text-white/80">{d.label}</p>
      </div>
    </div>
  );
}

function OutcomeShowcase({
  heading = "What I achieved",
  text,
  stats,
  note,
}: {
  heading?: string;
  text?: string;
  stats: { value: string; label: string }[];
  note?: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  const cards = stats.slice(0, 4);
  const ringStat = stats.find((x) => /%/.test(x.value)) ?? null;
  return (
    <div ref={ref}>
      <div className="flex items-center gap-3">
        <span className="flex h-2 w-9 overflow-hidden rounded-full" aria-hidden="true">
          <span className="h-full w-2/3 bg-[#3b6cf6]" />
          <span className="h-full w-1/3 bg-foreground" />
        </span>
        <h3 className="text-xl font-medium tracking-tight text-muted-foreground sm:text-2xl">{heading}</h3>
      </div>
      {text && <p className="mt-8 max-w-2xl text-[15px] leading-[1.7] text-foreground">{renderRich(text)}</p>}
      {cards.length === 4 && !text ? (
        <BentoStats stats={cards} run={seen} />
      ) : (
        cards.length > 0 && (
          <div className={`mt-10 grid gap-4 ${cards.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
            {cards.map((st, i) => (
              <StatCard key={st.label} stat={st} tone={i === 1 ? "dark" : "light"} run={seen} />
            ))}
          </div>
        )
      )}
      {ringStat && !(cards.length === 4 && !text) && (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="sm:col-start-2">
            <RingCard stat={ringStat} run={seen} />
          </div>
          {note && <p className="self-center text-[15px] leading-[1.7] text-foreground/70 sm:col-start-3">{renderRich(note)}</p>}
        </div>
      )}
      {(!ringStat || (cards.length === 4 && !text)) && note && <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-foreground/70">{renderRich(note)}</p>}
    </div>
  );
}

// A single percentage finding drawn as 100 dots — one per user — that fill in when scrolled
// into view. Hover a dot to see who it is; the legend filters between the two groups.
function DotStat({ value, label }: { value: string; label: string }) {
  const pct = Math.min(100, Math.max(0, parseInt(value, 10) || 0));
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const [focus, setFocus] = useState<"all" | "yes" | "no">("all");
  const [hover, setHover] = useState<number | null>(null);
  const shown = useCountUp(value, seen);
  // Fixed shuffle so the "got through" dots are scattered the same way on every visit.
  const order = useMemo(() => {
    const idx = Array.from({ length: 100 }, (_, i) => i);
    let seed = 7;
    for (let i = idx.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx; // idx[k] = grid position of the k-th user
  }, []);
  const struggledAt = useMemo(() => {
    const set = new Set<number>();
    order.slice(0, pct).forEach((pos) => set.add(pos));
    return set;
  }, [order, pct]);
  const kOf = useMemo(() => {
    const m = new Map<number, number>();
    order.forEach((pos, k) => m.set(pos, k));
    return m;
  }, [order]);
  return (
    <div ref={ref} className="grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-14">
      <div>
        <div className="grid grid-cols-10 gap-2" onMouseLeave={() => setHover(null)}>
          {Array.from({ length: 100 }).map((_, pos) => {
            const bad = struggledAt.has(pos);
            const dim = focus !== "all" && (focus === "no") !== bad;
            const delay = (kOf.get(pos) ?? pos) * 14;
            return (
              <span
                key={pos}
                onMouseEnter={() => setHover(pos)}
                className="relative block h-[18px] w-[18px] cursor-default rounded-full transition-[transform,opacity,background-color] duration-500 hover:scale-150 sm:h-[22px] sm:w-[22px]"
                style={{
                  backgroundColor: seen ? (bad ? "#f4475a" : "#bfdbfe") : "hsl(var(--foreground) / 0.08)",
                  opacity: dim ? 0.18 : 1,
                  transitionDelay: seen ? `${delay}ms, 0ms, ${delay}ms` : "0ms",
                }}
              >
                {hover === pos && (
                  <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background">
                    User {(kOf.get(pos) ?? 0) + 1} · {bad ? "Struggled" : "Got through"}
                  </span>
                )}
              </span>
            );
          })}
        </div>
        <div className="mt-4 flex gap-5 text-[13px] text-foreground/80">
          <button
            type="button"
            onClick={() => setFocus(focus === "no" ? "all" : "no")}
            aria-pressed={focus === "no"}
            className={`inline-flex items-center gap-2 outline-none transition-opacity ${focus === "yes" ? "opacity-40" : ""}`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#f4475a]" /> Struggled
          </button>
          <button
            type="button"
            onClick={() => setFocus(focus === "yes" ? "all" : "yes")}
            aria-pressed={focus === "yes"}
            className={`inline-flex items-center gap-2 outline-none transition-opacity ${focus === "no" ? "opacity-40" : ""}`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#bfdbfe]" /> Got through
          </button>
        </div>
      </div>
      <div>
        <p className="text-[clamp(64px,10vw,120px)] font-bold leading-none tracking-[-0.05em] tabular-nums text-[#f4475a]">{shown}</p>
        <p className="mt-4 max-w-md text-[clamp(20px,2.4vw,28px)] font-medium leading-snug tracking-tight text-foreground">{label}</p>
      </div>
    </div>
  );
}

function StatItem({ value, label, run, small }: { value: string; label: string; run: boolean; small: boolean }) {
  const shown = useCountUp(value, run);
  return (
    <div>
      <p className={`font-semibold tabular-nums tracking-tight text-foreground ${small ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}>{shown}</p>
      <p className={`mt-1.5 max-w-[18ch] leading-snug text-muted-foreground ${small ? "text-[13px]" : "text-[14px]"}`}>{label}</p>
    </div>
  );
}

function StudyStats({ stats, small = false }: { stats: { value: string; label: string }[]; small?: boolean }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  if (stats.length === 1 && /^\d{1,3}%$/.test(stats[0].value.trim())) {
    return (
      <div className="mt-10">
        <DotStat value={stats[0].value.trim()} label={stats[0].label} />
      </div>
    );
  }
  return (
    <div ref={ref} className={small ? "mt-6 flex flex-wrap gap-x-10 gap-y-5" : "mt-8 flex flex-wrap gap-x-14 gap-y-6"}>
      {stats.map((st) => (
        <StatItem key={st.label} value={st.value} label={st.label} run={seen} small={small} />
      ))}
    </div>
  );
}


const INFO_TONES = [
  { card: "bg-[#eef3ff] dark:bg-[#1b2a5a]", head: "text-[#1e3a8a] dark:text-blue-100", badge: "bg-[#1e3a8a] text-white", chip: "bg-white text-[#1e3a8a] dark:bg-white/10 dark:text-blue-100", row: "border-[#1e3a8a]/10 text-[#2f4a8f] dark:text-blue-100/80", num: "text-[#2346c7] dark:text-blue-300" },
  { card: "bg-[#0f1530]", head: "text-white", badge: "bg-white text-[#0f1530]", chip: "bg-white/10 text-white", row: "border-white/10 text-[#c9d6ff]", num: "text-[#7da2ff]" },
  { card: "border border-border bg-white dark:bg-card", head: "text-foreground", badge: "bg-gradient-to-b from-[#3b6cf6] to-[#2346c7] text-white", chip: "bg-[#eef3ff] text-[#1e3a8a] dark:bg-white/10 dark:text-blue-100", row: "border-border text-foreground/75", num: "text-[#2346c7] dark:text-blue-300" },
  { card: "bg-gradient-to-b from-[#3b6cf6] to-[#2346c7]", head: "text-white", badge: "bg-white text-[#2346c7]", chip: "bg-white/15 text-white", row: "border-white/15 text-white/85", num: "text-white" },
] as const;

// Titled list card. Short items (e.g. research methods) become chips; longer ones
// (e.g. key findings) become numbered rows.
function InfoColumn({ heading, items, tone }: { heading: string; items: string[]; tone: number }) {
  const t = INFO_TONES[tone % INFO_TONES.length];
  const short = items.every((x) => x.length <= 34);
  return (
    <div className={`rounded-[28px] p-6 transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:p-7 ${t.card}`}>
      <div className="flex items-center justify-between gap-3">
        <p className={`text-[18px] font-semibold tracking-tight ${t.head}`}>{heading}</p>
        <span className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[12px] font-semibold tabular-nums ${t.badge}`}>
          {items.length}
        </span>
      </div>
      {short ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {items.map((it) => (
            <li key={it} className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[14px] font-medium ${t.chip}`}>
              <Check className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
      ) : (
        <ol className="mt-4">
          {items.map((it, j) => (
            <li key={it} className={`flex items-start gap-4 border-t py-3.5 text-[15px] leading-snug first:border-t-0 ${t.row}`}>
              <span className={`pt-0.5 text-[13px] font-semibold tabular-nums ${t.num}`}>{String(j + 1).padStart(2, "0")}</span>
              <span>{it}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// Paper-note look: folded top-left corner, soft paper shadow, a slight tilt that straightens on hover.
function StickyShell({
  bg,
  fold,
  tilt = 0,
  className = "",
  style,
  children,
}: {
  bg: string;
  fold: string;
  tilt?: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className="sticky-note" style={{ ["--tilt" as string]: `${tilt}deg`, ...style }}>
      <div
        className={`sticky-face relative h-full ${className}`}
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 30%), ${bg}`,
          borderRadius: 20,
        }}
      >
        <span
          aria-hidden="true"
          className="sticky-fold pointer-events-none absolute left-0 top-0"
          style={{
            background: `linear-gradient(225deg, ${fold} 0%, ${fold} 55%, rgba(0,0,0,0.2) 100%)`,
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            borderBottomRightRadius: 14,
          }}
        />
        {children}
      </div>
    </div>
  );
}

const NOTE_COLOURS = [
  { bg: "#ff9f98", fold: "#d97a74" },
  { bg: "#ffb868", fold: "#d99443" },
  { bg: "#6ec1fb", fold: "#4a97d1" },
  { bg: "#cfaaf8", fold: "#a883d4" },
];

// Sticky-note cards with a folded top-left corner. Colours cycle salmon, orange, blue, purple;
// each note tilts slightly straight on hover, and they rise in one after another on scroll.
function StickyNotes({ notes, tone = "mixed" }: { notes: { title: string; items: string[]; takeaway?: string }[]; tone?: "mixed" | "pink" }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  const TILTS = [-1.2, 0.8, -0.6, 1.1];
  return (
    <div ref={ref} className="mt-8 flex flex-wrap justify-center gap-6">
      {notes.map((n, i) => {
        const col = tone === "pink" ? NOTE_COLOURS[0] : NOTE_COLOURS[i % NOTE_COLOURS.length];
        return (
          <div
            key={n.title}
            className={`w-full sm:w-[calc(50%-12px)] ${tone === "pink" ? "lg:w-[calc(33.333%-16px)]" : "lg:w-[calc(25%-18px)]"}`}
          >
          <StickyShell
            bg={col.bg}
            fold={col.fold}
            tilt={TILTS[(i + Math.floor(i / 4)) % TILTS.length]}
            className="min-h-[15rem] px-6 pb-7 pt-12 text-[#1f1d2b]"
            style={{
              opacity: seen ? 1 : 0,
              translate: seen ? "0 0" : "0 18px",
              transition: `opacity .5s ${(i % 4) * 70 + Math.floor(i / 4) * 120}ms, translate .5s ${(i % 4) * 70 + Math.floor(i / 4) * 120}ms, transform .3s`,
              width: undefined,
            }}
          >
            <p className="text-[16px] font-semibold leading-snug tracking-tight">{n.title}</p>
            <ul className="mt-4 space-y-2">
              {n.items.map((it) => (
                <li key={it} className="flex gap-2.5 text-[13.5px] leading-snug text-[#2b2940]">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#2b2940]/60" />
                  {it}
                </li>
              ))}
            </ul>
            {n.takeaway && (
              <p className="mt-5 rounded-xl bg-white/55 px-3 py-2.5 text-[13px] font-medium leading-snug text-[#2b2940]">
                {n.takeaway}
              </p>
            )}
          </StickyShell>
          </div>
        );
      })}
    </div>
  );
}

const STORY_RE = /^As an? (.+?), I want (.+?), so (?:that )?(.+?)\.?$/i;

// "As a …, I want …, so I can …" stories as three cards: who, what they want, why.
function StoryCards({ items }: { items: string[] }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const parsed = items.map((x) => STORY_RE.exec(x.trim()));
  const TONES = [
    { card: "bg-[#eef3ff] dark:bg-[#1b2a5a]", who: "bg-[#1e3a8a] text-white", want: "text-[#14245f] dark:text-blue-50", why: "bg-white text-[#2f4a8f] dark:bg-white/10 dark:text-blue-100", mark: "text-[#2346c7]/25 dark:text-blue-300/30" },
    { card: "bg-[#0f1530]", who: "bg-white text-[#0f1530]", want: "text-white", why: "bg-white/10 text-[#c9d6ff]", mark: "text-white/15" },
    { card: "border border-border bg-white dark:bg-card", who: "bg-gradient-to-b from-[#3b6cf6] to-[#2346c7] text-white", want: "text-foreground", why: "bg-[#eef3ff] text-[#1e3a8a] dark:bg-white/10 dark:text-blue-100", mark: "text-[#2346c7]/15" },
  ];
  return (
    <div ref={ref} className="mt-8 grid gap-4 md:grid-cols-3">
      {items.map((raw, i) => {
        const m = parsed[i];
        const t = TONES[i % TONES.length];
        const role = m ? m[1] : "User";
        const want = m ? m[2] : raw;
        const why = m ? m[3].replace(/^I can /i, "I can ") : "";
        return (
          <div
            key={i}
            className={`relative flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-[28px] p-6 transition-[transform,opacity] duration-500 ease-out hover:-translate-y-1 sm:p-7 ${t.card}`}
            style={{ opacity: seen ? 1 : 0, transform: seen ? undefined : "translateY(18px)", transitionDelay: seen ? `${i * 110}ms` : "0ms" }}
          >
            <span aria-hidden="true" className={`pointer-events-none absolute -right-1 -top-6 select-none text-[130px] font-bold leading-none ${t.mark}`}>&ldquo;</span>
            <div className="relative">
              <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] ${t.who}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                {role}
              </span>
              <p className={`mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] opacity-60 ${t.want}`}>I want</p>
              <p className={`mt-2 text-[20px] font-semibold leading-snug tracking-tight ${t.want}`}>{want.charAt(0).toUpperCase() + want.slice(1)}</p>
            </div>
            {why && (
              <p className={`relative mt-6 rounded-2xl px-4 py-3 text-[14px] leading-snug ${t.why}`}>
                <span className="mr-1.5 font-semibold">So that</span>
                {why.replace(/^I can /i, "I can ").replace(/^I /, "I ")}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Interactive list of design decisions: pick one on the left, read the one-liner on the right.
// Cycles on its own while on screen until you touch it.
function DecisionExplorer({ cards }: { cards: { heading: string; short?: string; tag?: string }[] }) {
  const [active, setActive] = useState(0);
  const cur = cards[active];
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
      <ul className="flex flex-col" role="tablist" aria-label="Design decisions">
        {cards.map((c, i) => {
          const on = i === active;
          return (
            <li key={c.heading}>
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center gap-4 border-l-2 py-3 pl-4 text-left text-[16px] outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-foreground/25 ${
                  on ? "border-[#2346c7] font-semibold text-foreground" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.heading}
              </button>
            </li>
          );
        })}
      </ul>
      <div key={active} className="rounded-[24px] bg-[#f4f6fb] p-7 dark:bg-white/[0.05] sm:p-8" style={{ animation: "aboutRise .4s cubic-bezier(.2,.7,.2,1) both" }}>
        {cur.tag && <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2346c7] dark:text-blue-300">{cur.tag}</span>}
        <p className="mt-3 text-[22px] font-semibold leading-snug tracking-tight text-foreground">{cur.heading}</p>
        <p className="mt-3 text-[16px] leading-[1.6] text-foreground/70">{cur.short}</p>
      </div>
    </div>
  );
}



// Conclusion: one big statement, the three things that changed, and what users got.
function ConclusionPanel() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className="rounded-[24px] bg-gradient-to-br from-[#f1f5ff] to-white p-6 dark:from-white/[0.05] dark:to-transparent sm:p-8"
      style={{ opacity: seen ? 1 : 0, transform: seen ? undefined : "translateY(14px)", transition: "opacity .6s ease, transform .6s ease" }}
    >
      <p className="max-w-2xl text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.3] tracking-[-0.02em] text-foreground">
        A hard-to-start, technical tool became a <span className="text-[#2563eb] dark:text-blue-300">simple, guided</span> experience.
      </p>
      <div className="mt-5 flex flex-wrap gap-2 text-[13px]">
        {["Easier to use", "Faster", "More trusted"].map((r) => (
          <span key={r} className="rounded-full bg-white px-3.5 py-1.5 font-medium text-[#1e3a8a] ring-1 ring-[#2563eb]/15 dark:bg-white/10 dark:text-blue-100 dark:ring-white/10">
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

// A winding road down the page with one stop per phase. Cards alternate sides; the road draws
// itself and the stops pop in one after another when scrolled into view. On phones it becomes a
// simple vertical list.
type RoadStop = { title: string; color: string; items: string[] };
const ROAD_GROUPS = [
  { label: "Understand", from: 0, to: 3 },
  { label: "Design", from: 4, to: 5 },
  { label: "Prove", from: 6, to: 7 },
  { label: "Next", from: 8, to: 9 },
];

// A. Gantt: a project-management style timeline that builds up as you scroll. The section is
// tall and its panel sticks to the screen; each stretch of scrolling brings in the next phase's
// bar, moves the dotted "now" line and opens that phase's detail card. Hover a bar to revisit it.
function RoadGantt({ stops }: { stops: RoadStop[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const n = stops.length;
  const ROW = 60;
  const LEN = 3.1;
  const start = (i: number) => (i * (n - LEN)) / (n - 1);
  const groupOf = (i: number) => ROAD_GROUPS.findIndex((g) => i >= g.from && i <= g.to);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(n - 1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh * 0.75;
      const p = Math.min(1, Math.max(0, (vh * 0.2 - r.top) / Math.max(1, total)));
      setStep(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [n]);
  const sel = hover ?? step;
  const cur = stops[sel];
  const curEnd = start(sel) + LEN;
  const cardLeft = curEnd / n > 0.62;
  return (
    <div ref={wrap} className="relative mt-8 hidden md:block" style={{ height: `${n * 46 + 80}vh` }}>
      <div className="sticky top-20 overflow-hidden rounded-[32px] border border-border bg-white shadow-[0_30px_60px_-40px_rgba(20,30,60,0.35)] dark:bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2563eb]">
              <span className="h-3.5 w-3.5 rounded-full bg-white" />
            </span>
            <p className="text-[19px] font-semibold tracking-tight text-foreground">Ask Me roadmap</p>
          </div>
          <span className="rounded-md bg-[#fff4d6] px-2.5 py-1.5 text-[13px] font-medium tabular-nums text-[#b7791f]">
            Phase {step + 1} of {n}
          </span>
        </div>

        <div className="relative">
          <div className="h-[4.5rem] border-b border-border">
            <div className="grid h-8" style={{ gridTemplateColumns: ROAD_GROUPS.map((g) => `${g.to - g.from + 1}fr`).join(" ") }}>
              {ROAD_GROUPS.map((g, gi) => (
                <span key={g.label} className={`flex items-center border-l border-border/60 pl-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors first:border-l-0 ${groupOf(sel) === gi ? "text-[#2563eb]" : "text-foreground/40"}`}>{g.label}</span>
              ))}
            </div>
            <div className="grid h-12" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
              {stops.map((_, i) => (
                <span key={i} className="flex items-center justify-center">
                  <span className={`grid h-8 min-w-8 place-items-center rounded-lg px-1.5 text-[13.5px] font-medium tabular-nums transition-all duration-300 ${sel === i ? "bg-[#2563eb] text-white shadow-[0_6px_14px_-6px_#2563eb]" : "text-muted-foreground"}`}>{String(i + 1).padStart(2, "0")}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative" style={{ height: n * ROW }}>
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }} aria-hidden="true">
              {stops.map((_, i) => (
                <span key={i} className={`border-l border-border/50 transition-colors duration-300 ${i === sel ? "bg-[#2563eb]/[0.05]" : groupOf(i) % 2 === 1 ? "bg-foreground/[0.02]" : ""}`} />
              ))}
            </div>
            <span aria-hidden="true" className="absolute top-0 h-full border-l-2 border-dotted border-[#2563eb]/80 transition-all duration-500" style={{ left: `${((sel + 0.5) / n) * 100}%` }} />
            {stops.map((s, i) => {
              const shown = i <= step;
              const on = i === sel;
              return (
                <div
                  key={s.title}
                  onMouseEnter={() => shown && setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className="absolute flex items-center overflow-hidden rounded-full"
                  style={{
                    top: i * ROW + 8,
                    height: ROW - 16,
                    left: `${(start(i) / n) * 100}%`,
                    width: shown ? `${(LEN / n) * 100}%` : "0%",
                    transition: "width .8s cubic-bezier(.2,.7,.2,1), box-shadow .3s",
                    background: s.color,
                    boxShadow: on ? `0 10px 20px -8px ${s.color}` : "none",
                    opacity: on ? 1 : 0.62,
                  }}
                >
                  <span className="truncate pl-4 pr-2 text-[14.5px] font-medium" style={{ color: s.color === "#f5c400" || s.color === "#4fd1d1" || s.color === "#34bdf2" ? "#0f1530" : "#fff" }}>{s.title}</span>
                  <span className="ml-auto mr-3.5 shrink-0 rounded-full bg-black/10 px-2.5 py-0.5 text-[12px] font-semibold tabular-nums" style={{ color: s.color === "#f5c400" || s.color === "#4fd1d1" || s.color === "#34bdf2" ? "#0f1530" : "#fff" }}>{s.items.length} pts</span>
                </div>
              );
            })}

            <div
              key={sel}
              className="absolute z-10 w-[21rem] rounded-2xl bg-white p-5 shadow-[0_22px_44px_-16px_rgba(20,30,60,0.4)] ring-1 ring-black/5 dark:bg-card"
              style={{
                top: Math.min(Math.max(sel * ROW - 6, 6), n * ROW - 250),
                ...(cardLeft ? { left: "2%" } : { left: `${(curEnd / n) * 100 + 1.5}%` }),
                animation: "aboutRise .35s ease both",
              }}
            >
              {!cardLeft && <span aria-hidden="true" className="absolute top-6 h-3 w-3 rotate-45 bg-white ring-1 ring-black/5 dark:bg-card" style={{ left: -6 }} />}
              <div className="relative flex gap-2.5">
                <span className="mt-0.5 h-6 w-1 shrink-0 rounded-full" style={{ background: cur.color }} />
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Phase {sel + 1} · {ROAD_GROUPS[groupOf(sel)]?.label}</p>
                  <p className="mt-1.5 text-[18px] font-semibold leading-tight text-foreground">{cur.title}</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {cur.items.map((it) => (
                      <li key={it} className="text-[14px] leading-snug text-muted-foreground">{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Phones: the same phases as a plain list that fades in as you scroll.
function RoadList({ stops }: { stops: RoadStop[] }) {
  return (
    <ul className="mt-8 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border md:hidden">
      {stops.map((s, i) => (
        <li key={s.title} className="flex gap-3 px-5 py-3">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10px] font-bold text-white" style={{ background: s.color }}>{i + 1}</span>
          <div>
            <p className="text-[14px] font-medium text-foreground">{s.title}</p>
            <p className="mt-0.5 text-[12.5px] text-muted-foreground">{s.items.join(" · ")}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// B. Stages: a dark roadmap with stage headings, one long track whose striped progress block
// grows to the chosen phase, and the phase names listed under each stage.
function RoadStages({ stops }: { stops: RoadStop[] }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const n = stops.length;
  useEffect(() => {
    if (!seen || !auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % n), 2600);
    return () => window.clearInterval(t);
  }, [seen, auto, n]);
  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const cur = stops[active];
  return (
    <div ref={ref} className="relative mt-8 overflow-hidden rounded-[32px] bg-[#0d0d1f] p-6 text-white sm:p-10">
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,#3b6cf6_0%,transparent_70%)] opacity-30" />
      <div className="relative text-center">
        <p className="bg-gradient-to-b from-white to-[#9cc0ff] bg-clip-text text-[clamp(34px,5vw,56px)] font-bold leading-none tracking-[-0.03em] text-transparent">Roadmap</p>
        <p className="mx-auto mt-3 max-w-md text-[14px] text-white/45">From first question to final outcome: how the redesign came together.</p>
      </div>
      <div className="-mx-6 mt-10 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div className="min-w-[44rem]">
          <div className="grid" style={{ gridTemplateColumns: ROAD_GROUPS.map((g) => `${g.to - g.from + 1}fr`).join(" ") }}>
            {ROAD_GROUPS.map((g, gi) => {
              const inGroup = active >= g.from && active <= g.to;
              return (
                <div key={g.label} className="border-l border-dotted border-white/15 pl-4 first:border-l-0 first:pl-0">
                  <p className={`text-[20px] font-semibold tracking-tight transition-colors ${inGroup ? "text-[#60a5fa]" : "text-[#60a5fa]/55"}`}>Stage #{gi + 1}</p>
                  <p className="mt-1 text-[13px] text-white/45">{g.label} · {g.to - g.from + 1} phases</p>
                </div>
              );
            })}
          </div>
          <div className="relative mt-6 h-24 rounded-[22px] bg-white/[0.06] p-2.5">
            <div
              className="relative h-full overflow-hidden rounded-[16px] transition-[width] duration-700 ease-out"
              style={{ width: `${((active + 1) / n) * 100}%`, minWidth: "4.5rem", background: "repeating-linear-gradient(115deg, #7ee8d2 0 34px, #3a355e 34px 64px)", boxShadow: "inset 0 -30px 40px -20px rgba(59,130,246,0.55)" }}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-[#25254a] px-3.5 py-2 text-[14px] font-medium tabular-nums transition-[left] duration-700 ease-out"
              style={{ left: `calc(${((active + 1) / n) * 100}% + 18px)` }}
            >
              {String(active + 1).padStart(2, "0")} / {n}
            </span>
          </div>
          <div className="mt-6 grid" style={{ gridTemplateColumns: ROAD_GROUPS.map((g) => `${g.to - g.from + 1}fr`).join(" ") }}>
            {ROAD_GROUPS.map((g) => (
              <div key={g.label} className="border-l border-dotted border-white/15 pl-4 first:border-l-0 first:pl-0">
                <ul className="space-y-2">
                  {stops.slice(g.from, g.to + 1).map((s, k) => {
                    const i = g.from + k;
                    return (
                      <li key={s.title}>
                        <button type="button" onClick={() => pick(i)} onMouseEnter={() => pick(i)} className={`text-left text-[15px] leading-snug outline-none transition-colors ${i === active ? "font-semibold text-white" : i < active ? "text-white/75" : "text-white/30 hover:text-white/60"}`}>
                          {s.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div key={active} className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5" style={{ animation: "aboutRise .4s ease both" }}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">{String(active + 1).padStart(2, "0")} · {cur.title}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-white/65">{cur.items.join("  ·  ")}</p>
      </div>
    </div>
  );
}

function RoadMap({ stops }: { stops: RoadStop[] }) {
  let v = 1;
  try {
    v = Number(new URLSearchParams(window.location.search).get("road")) || 1;
  } catch {
    /* no query */
  }
  if (v === 2) return <RoadStages stops={stops} />;
  return (
    <>
      <RoadGantt stops={stops} />
      <RoadList stops={stops} />
    </>
  );
}

// Ask Me user flow, drawn in code. When it scrolls into view the nodes pop in and the connectors
// draw themselves in order, so the path reads as it is being connected.
type FlowNode = { id: string; x: number; y: number; r?: number; w?: number; h?: number; kind: "circle" | "rect" | "diamond"; fill: string; text?: string[]; dark?: boolean; at: number };
type FlowEdge = { d: string; at: number; arrow?: { x: number; y: number; rot: number }; muted?: boolean };

const FLOW_NODES: FlowNode[] = [
  { id: "login", x: 79, y: 344, r: 45, kind: "circle", fill: "#16a34a", text: ["Login"], at: 0 },
  { id: "ask", x: 224, y: 344, w: 105, h: 80, kind: "rect", fill: "#e4d3fb", text: ["Ask me"], dark: true, at: 500 },
  { id: "d1", x: 342, y: 344, r: 24, kind: "diamond", fill: "#fde9b5", at: 950 },
  { id: "upload", x: 510, y: 129, r: 45, kind: "circle", fill: "#2f7df6", text: ["Upload", "Files"], at: 1900 },
  { id: "connect", x: 510, y: 262, r: 45, kind: "circle", fill: "#2f7df6", text: ["Connect", "data source"], at: 2050 },
  { id: "sample", x: 510, y: 488, r: 45, kind: "circle", fill: "#2f7df6", text: ["Sample", "data"], at: 2200 },
  { id: "send", x: 689, y: 344, r: 45, kind: "circle", fill: "#2f7df6", text: ["Send"], at: 3050 },
  { id: "d2", x: 822, y: 344, r: 24, kind: "diamond", fill: "#fde9b5", at: 3500 },
  { id: "on", x: 1000, y: 222, r: 48, kind: "circle", fill: "#2f7df6", text: ["Advance", "Capabilities", "on"], at: 4300 },
  { id: "off", x: 1000, y: 540, r: 48, kind: "circle", fill: "#2f7df6", text: ["Advance", "Capabilities", "off"], at: 4450 },
  { id: "unstr", x: 1274, y: 103, r: 50, kind: "circle", fill: "#2f7df6", text: ["Unstructured", "+ Structure", "data"], at: 5400 },
  { id: "agent", x: 1272, y: 222, r: 45, kind: "circle", fill: "#2f7df6", text: ["Multiple", "Agent"], at: 5500 },
  { id: "tools", x: 1272, y: 334, r: 45, kind: "circle", fill: "#2f7df6", text: ["Tools/", "Connectors"], at: 5600 },
  { id: "only1", x: 1272, y: 478, r: 45, kind: "circle", fill: "#2f7df6", text: ["Unstructu", "red Data", "Only"], at: 5550 },
  { id: "one", x: 1272, y: 601, r: 45, kind: "circle", fill: "#2f7df6", text: ["Only one", "agent at a", "time"], at: 5650 },
  { id: "shared", x: 1518, y: 222, r: 48, kind: "circle", fill: "#2f7df6", text: ["Data will be", "shared with", "AI"], at: 6500 },
  { id: "pool", x: 1505, y: 546, r: 45, kind: "circle", fill: "#2f7df6", text: ["Auto", "DataPool", "creation"], at: 7000 },
];

const FLOW_EDGES: FlowEdge[] = [
  { d: "M124 344 H160", at: 250, arrow: { x: 166, y: 344, rot: 0 }, muted: true },
  { d: "M278 344 H312", at: 800, arrow: { x: 318, y: 344, rot: 0 } },
  { d: "M368 344 H640", at: 1250, arrow: { x: 646, y: 344, rot: 0 } },
  { d: "M372 344 H395 Q415 344 415 324 V150 Q415 129 436 129 H460", at: 1500, arrow: { x: 466, y: 129, rot: 0 } },
  { d: "M415 344 V283 Q415 262 436 262 H460", at: 1650, arrow: { x: 466, y: 262, rot: 0 } },
  { d: "M415 344 V467 Q415 488 436 488 H460", at: 1800, arrow: { x: 466, y: 488, rot: 0 } },
  { d: "M556 129 H578 Q600 129 600 151 V344", at: 2450 },
  { d: "M556 262 H578 Q600 262 600 284 V344", at: 2600 },
  { d: "M556 488 H578 Q600 488 600 466 V344", at: 2750 },
  { d: "M735 344 H790", at: 3250, arrow: { x: 796, y: 344, rot: 0 } },
  { d: "M848 344 H878 Q900 344 900 322 V244 Q900 222 922 222 H946", at: 3800, arrow: { x: 952, y: 222, rot: 0 } },
  { d: "M900 344 V518 Q900 540 922 540 H946", at: 3950, arrow: { x: 952, y: 540, rot: 0 } },
  { d: "M1048 222 H1220", at: 4750, arrow: { x: 1226, y: 222, rot: 0 } },
  { d: "M1136 222 V125 Q1136 103 1158 103 H1220", at: 4900, arrow: { x: 1226, y: 103, rot: 0 } },
  { d: "M1136 222 V312 Q1136 334 1158 334 H1220", at: 5050, arrow: { x: 1226, y: 334, rot: 0 } },
  { d: "M1048 540 H1096 Q1118 540 1118 518 V500 Q1118 478 1140 478 H1220", at: 4900, arrow: { x: 1226, y: 478, rot: 0 } },
  { d: "M1118 540 V579 Q1118 601 1140 601 H1220", at: 5050, arrow: { x: 1226, y: 601, rot: 0 } },
  { d: "M1322 103 H1376 Q1398 103 1398 125 V200 Q1398 222 1420 222 H1466", at: 6000, arrow: { x: 1472, y: 222, rot: 0 } },
  { d: "M1316 222 H1466", at: 6100 },
  { d: "M1316 334 H1376 Q1398 334 1398 312 V244 Q1398 222 1420 222", at: 6200 },
];
const FLOW_LABELS = [
  { x: 522, y: 344, t: "Type the question and hit send", at: 1500 },
  { x: 900, y: 283, t: "Ask for data consent", at: 4000 },
  { x: 1123, y: 222, t: "can use", at: 4900 },
];

function FlowDiagram() {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  const [hot, setHot] = useState<string | null>(null);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const k = reduce ? 0 : 0.7;
  const ease = "cubic-bezier(.2,.7,.2,1)";
  return (
    <div ref={ref} className="mt-8 overflow-x-auto rounded-[28px] bg-[#eef5ff] p-3 dark:bg-white/[0.05] sm:p-5">
      <svg viewBox="0 0 1600 700" className="h-auto w-full min-w-[46rem]" role="img" aria-label="Ask Me user flow">
        <g fill="none" stroke="#6b6b75" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {FLOW_EDGES.map((e, i) => (
            <g key={i}>
              <path
                d={e.d}
                pathLength={1}
                stroke={e.muted ? "#b6b6c0" : "#6b6b75"}
                style={{ strokeDasharray: 1, strokeDashoffset: seen ? 0 : 1, transition: `stroke-dashoffset ${600 * k + 1}ms ${ease} ${e.at * k}ms` }}
              />
              {e.arrow && (
                <path
                  d="M-12 -10 L0 0 L-12 10"
                  transform={`translate(${e.arrow.x} ${e.arrow.y}) rotate(${e.arrow.rot})`}
                  stroke={e.muted ? "#b6b6c0" : "#6b6b75"}
                  style={{ opacity: seen ? 1 : 0, transition: `opacity 200ms ${(e.at + 520) * k}ms` }}
                />
              )}
            </g>
          ))}
        </g>
        {FLOW_LABELS.map((l) => (
          <g key={l.t} style={{ opacity: seen ? 1 : 0, transition: `opacity 400ms ${(l.at + 300) * k}ms` }}>
            <rect x={l.x - l.t.length * 4.1 - 10} y={l.y - 15} width={l.t.length * 8.2 + 20} height="30" rx="6" fill="#eef5ff" />
            <text x={l.x} y={l.y + 5} textAnchor="middle" fontSize="15" fill="#2b2b35" fontFamily="Inter, system-ui, sans-serif">{l.t}</text>
          </g>
        ))}
        {FLOW_NODES.map((n) => {
          const on = hot === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${n.x} ${n.y})`}
              onMouseEnter={() => setHot(n.id)}
              onMouseLeave={() => setHot(null)}
              style={{ cursor: "default" }}
            >
              <g style={{ opacity: seen ? 1 : 0, transform: `scale(${seen ? (on ? 1.08 : 1) : 0.4})`, transformBox: "fill-box", transformOrigin: "center", transition: `opacity 400ms ${n.at * k}ms, transform 450ms ${ease} ${n.at * k}ms` }}>
                {n.kind === "circle" && <circle r={n.r} fill={n.fill} />}
                {n.kind === "rect" && <rect x={-(n.w ?? 0) / 2} y={-(n.h ?? 0) / 2} width={n.w} height={n.h} rx="8" fill={n.fill} />}
                {n.kind === "diamond" && <rect x={-(n.r ?? 0)} y={-(n.r ?? 0)} width={(n.r ?? 0) * 2} height={(n.r ?? 0) * 2} rx="4" fill={n.fill} transform="rotate(45)" />}
                {n.text && (
                  <text textAnchor="middle" fontSize="13.5" fill={n.dark ? "#2b2b35" : "#fff"} fontFamily="Inter, system-ui, sans-serif" fontWeight="500">
                    {n.text.map((t, i) => (
                      <tspan key={t} x="0" y={(i - (n.text!.length - 1) / 2) * 16 + 5}>{t}</tspan>
                    ))}
                  </text>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PersonaHead({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.12em] text-foreground/70">
      <span className="h-3.5 w-1 rounded-full bg-[#2563eb]" />
      {label}
    </p>
  );
}


const MOOD: Record<string, number> = { "😕": 3, "😰": 2, "😵": 1, "😩": 1, "😔": 2 };

const STAGE_HEAD = ["#ffe29a", "#ffb9dc", "#d6c0fb", "#a9d7ff", "#b5efc5"];
const STAGE_SOFT = ["#fff6dc", "#ffe8f3", "#f0e7fd", "#e4f2ff", "#e6f8ec"];
const MOOD_AXIS = ["🙂", "🤔", "😐", "😕", "🙁"];

// Journey map as one tidy table: grey row labels, a pastel colour per stage, and a mood curve
// with an emoji scale where the "emotion" row would be.
function JourneyMap({ persona, seen }: { persona: Persona; seen: boolean }) {
  const j = persona.journey;
  const [stage, setStage] = useState<number | null>(null);
  const n = j.stages.length;
  const levels = j.feelings.map((f) => MOOD[f.emoji] ?? 3);
  const yOf = (lvl: number) => 12 + ((5 - lvl) / 4) * 68;
  const pts = levels.map((l, i) => ({ x: ((i + 0.5) / n) * 100, y: yOf(l) }));
  let d = `M0,${pts[0].y} L${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const m = (pts[i].x + pts[i + 1].x) / 2;
    d += ` C${m},${pts[i].y} ${m},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`;
  }
  d += ` L100,${pts[n - 1].y}`;
  const cols = "grid-cols-[9.5rem_repeat(5,minmax(0,1fr))]";
  const dim = (i: number) => (stage === null || stage === i ? 1 : 0.45);
  const label = (t: string) => (
    <div className="p-1">
      <p className="h-full rounded-lg bg-[#f0f0f2] px-4 py-3 text-[14px] font-semibold text-foreground dark:bg-white/10">{t}</p>
    </div>
  );
  const row = (t: string, key: "action" | "goals" | "pains" | "ideas", ri: number) => (
    <div key={key} className={`grid ${cols}`}>
      {label(t)}
      {j.stages.map((_, i) => (
        <div key={i} className="p-1">
          <div
            onMouseEnter={() => setStage(i)}
            onMouseLeave={() => setStage(null)}
            className="h-full rounded-lg px-4 py-3"
            style={{
              background: STAGE_SOFT[i],
              opacity: seen ? dim(i) : 0,
              transform: seen ? undefined : "translateY(10px)",
              transition: `opacity .5s ${seen ? 100 + ri * 80 + i * 40 : 0}ms, transform .5s ${100 + ri * 80 + i * 40}ms`,
            }}
          >
            <ul className="space-y-2">
              {j[key][i].map((it) => (
                <li key={it} className="text-[14px] leading-[1.5] text-[#2a2a33]">{it}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="-mx-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
      <div className="min-w-[64rem]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em] text-foreground">{persona.name.split(" ")[0]}&rsquo;s journey map</p>
            <p className="mt-2 text-[16px] text-foreground/80"><span className="font-semibold text-foreground">Goal: </span>{persona.goal}</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-[#f0f0f2] py-2.5 pl-2.5 pr-5 dark:bg-white/10">
            <img src={assetUrl(persona.avatar)} alt="" className="h-11 w-11 rounded-full object-cover" />
            <div>
              <p className="text-[15px] font-semibold text-foreground">{persona.name}</p>
              <p className="text-[13px] text-foreground/70">{persona.role}, age {persona.facts.find((f) => f.label === "Age")?.value}</p>
            </div>
          </div>
        </div>

        <div className={`mt-8 grid ${cols}`}>
          <span />
          {j.stages.map((st, i) => (
            <div key={st} className="p-1">
              <button
                type="button"
                onMouseEnter={() => setStage(i)}
                onMouseLeave={() => setStage(null)}
                className="flex h-11 w-full items-center rounded-lg px-4 text-left text-[14px] font-semibold text-[#22222b] outline-none"
                style={{ background: STAGE_HEAD[i], opacity: seen ? dim(i) : 0, transform: seen ? undefined : "translateY(-8px)", transition: `opacity .5s ${seen ? i * 70 : 0}ms, transform .5s ${i * 70}ms` }}
              >
                {st}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-1 space-y-0">
          {row("Actions", "action", 0)}
          {row("Wants", "goals", 1)}

          <div className={`grid ${cols}`}>
            <div className="p-1">
              <div className="relative h-full rounded-lg bg-[#f0f0f2] px-4 py-3 dark:bg-white/10">
                <p className="absolute bottom-3 left-4 text-[14px] font-semibold text-foreground">Feelings</p>
                <div className="absolute inset-x-0 top-0 h-[10.5rem]">
                  {[12, 29, 46, 63, 80].map((y, k) => (
                    <span key={y} className="absolute right-3 -translate-y-1/2 text-[20px]" style={{ top: `${y}%` }}>{MOOD_AXIS[k]}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative col-span-5 p-1">
              <div className="absolute inset-1 grid grid-cols-5" aria-hidden="true">
                {j.stages.map((_, i) => (
                  <span key={i} style={{ background: STAGE_SOFT[i], opacity: seen ? dim(i) : 0, transition: "opacity .4s" }} className="mx-1 rounded-lg" />
                ))}
              </div>
              <div className="relative">
                <div className="relative h-[10.5rem]">
                  {[12, 29, 46, 63, 80].map((y) => (
                    <span key={y} className="absolute inset-x-0 border-t border-dashed border-black/10" style={{ top: `${y}%` }} />
                  ))}
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true" style={{ clipPath: seen ? "inset(-20% 0 -20% 0)" : "inset(-20% 100% -20% 0)", transition: "clip-path 2.2s cubic-bezier(.4,0,.2,1) .4s" }}>
                    <path d={d} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity="0.9" />
                  </svg>
                  {pts.map((pt, i) => (
                    <span
                      key={i}
                      onMouseEnter={() => setStage(i)}
                      onMouseLeave={() => setStage(null)}
                      className="absolute grid h-11 w-11 place-items-center rounded-full bg-white text-[24px] shadow-[0_6px_16px_-8px_rgba(20,30,60,0.4)] ring-1 ring-black/5"
                      style={{ left: `${pt.x}%`, top: `${pt.y}%`, transform: `translate(-50%, -50%) scale(${seen ? (stage === i ? 1.2 : 1) : 0})`, transition: `transform .5s cubic-bezier(.2,.8,.2,1) ${seen ? 600 + i * 380 : 0}ms` }}
                    >
                      {j.feelings[i].emoji}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-5 pb-3">
                  {j.feelings.map((f, i) => (
                    <ul key={i} className="space-y-1.5 px-4" style={{ opacity: seen ? dim(i) : 0, transition: `opacity .5s ${seen ? 900 + i * 200 : 0}ms` }}>
                      {f.lines.map((l) => (
                        <li key={l} className="text-[13.5px] leading-snug text-[#2a2a33]">{l}</li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {row("Pain points", "pains", 3)}
          {row("Opportunities", "ideas", 4)}
        </div>
      </div>
    </div>
  );
}

// Persona + journey map, built in code. Switch between the two personas; the map below shows
// five stages with what the person does, wants, feels, struggles with and what we could improve.
// Hover a stage (or a column) to follow it down the rows.
function PersonaExplorer({ personas }: { personas: Persona[] }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  const [who, setWho] = useState(0);
  const p = personas[who];
  return (
    <div ref={ref} className="mt-10">
      <div className="inline-flex rounded-full bg-foreground/[0.05] p-1" role="tablist" aria-label="Persona">
        {personas.map((x, i) => (
          <button
            key={x.name}
            type="button"
            role="tab"
            aria-selected={who === i}
            onClick={() => {
              setWho(i);
            }}
            className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[14px] font-medium outline-none transition-all ${who === i ? "bg-white text-foreground shadow-sm dark:bg-white/15" : "text-muted-foreground hover:text-foreground"}`}
          >
            <img src={assetUrl(x.avatar)} alt="" className="h-7 w-7 rounded-full object-cover" />
            {x.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div key={who} className="mt-10" style={{ animation: "aboutRise .45s cubic-bezier(.2,.7,.2,1) both" }}>
        <div className="rounded-[32px] bg-[#eef0f4] p-3 dark:bg-white/[0.05] sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,4fr)]">
            {/* Left: who they are */}
            <div className="flex flex-col gap-3">
              <div className="grid place-items-center rounded-[24px] bg-white p-6 dark:bg-card">
                <img src={assetUrl(p.avatar)} alt={p.name} className="h-40 w-40 rounded-full object-cover ring-4 ring-[#2563eb]/80 ring-offset-4 ring-offset-white dark:ring-offset-card" />
              </div>
              <div className="flex flex-1 flex-col rounded-[24px] bg-white p-7 dark:bg-card">
                <p className="text-[clamp(30px,3.4vw,40px)] font-bold leading-none tracking-[-0.03em] text-foreground">{p.name.split(" ")[0]}</p>
                <p className="mt-2 text-[14px] font-medium text-[#2563eb] dark:text-blue-300">{p.role}</p>
                <dl className="mt-6 space-y-2 text-[14px]">
                  {p.facts.filter((f) => f.label !== "Tech comfort").map((f) => (
                    <div key={f.label}>
                      <dt className="inline font-semibold text-foreground">{f.label}: </dt>
                      <dd className="inline text-foreground/70">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                {(() => {
                  const tc = p.facts.find((f) => f.label === "Tech comfort");
                  if (!tc) return null;
                  const lvl = /high/i.test(tc.value) ? 3 : /med/i.test(tc.value) ? 2 : 1;
                  return (
                    <div className="mt-5">
                      <p className="flex justify-between text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        Tech comfort <span className="normal-case tracking-normal text-foreground/70">{tc.value}</span>
                      </p>
                      <div className="mt-2 flex gap-1.5">
                        {[1, 2, 3].map((n) => (
                          <span key={n} className="h-1.5 flex-1 rounded-full transition-colors duration-500" style={{ background: n <= lvl ? "#2563eb" : "hsl(var(--foreground) / 0.1)" }} />
                        ))}
                      </div>
                    </div>
                  );
                })()}
                <p className="relative mt-8 pt-6 text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-[-0.02em] text-foreground/75">
                  <span aria-hidden="true" className="absolute -top-2 left-0 select-none text-[64px] font-bold leading-none text-foreground/10">&ldquo;</span>
                  {p.quote.replace(/[\u201c\u201d]/g, "")}
                </p>
              </div>
            </div>

            {/* Middle: bio and what goes on in their head */}
            <div className="flex flex-col gap-3">
              <div className="flex-1 rounded-[24px] bg-white p-7 dark:bg-card">
                <PersonaHead label="Bio" />
                <p className="mt-5 text-[15px] leading-[1.85] text-foreground/75">{p.bio}</p>
              </div>
              <div className="rounded-[24px] bg-white p-7 dark:bg-card">
                <PersonaHead label="Thoughts & feelings" />
                <ul className="mt-5 space-y-3">
                  {p.thoughts.map((t) => (
                    <li key={t} className="text-[14.5px] leading-snug text-foreground/75">{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: goals and pain points */}
            <div className="flex flex-col gap-3">
              <div className="rounded-[24px] bg-white p-7 dark:bg-card">
                <PersonaHead label="Goals" />
                <ul className="mt-5 space-y-3">
                  {p.goals.map((t) => (
                    <li key={t} className="flex gap-3 text-[14.5px] leading-snug text-foreground/75">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 rounded-[24px] bg-white p-7 dark:bg-card">
                <PersonaHead label="Pain points" />
                <ul className="mt-5 space-y-3">
                  {p.pains.map((t) => (
                    <li key={t} className="flex gap-3 text-[14.5px] leading-snug text-foreground/75">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0645a]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20" />
        <JourneyMap persona={p} seen={seen} />
      </div>
    </div>
  );
}

function StudySectionBlock({
  block,
  onZoom,
  fallbackStats = [],
}: {
  block: StudyBlock;
  onZoom: (src: string) => void;
  fallbackStats?: { value: string; label: string }[];
}) {
  if (block.id === "conclusion" && block.pillars) {
    return (
      <section id={`cs-${block.id}`} className="mt-16 scroll-mt-24 border-t border-border pt-10">
        {block.eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">{block.eyebrow}</p>}
        <div className="mt-4">
          <ConclusionPanel />
        </div>
      </section>
    );
  }
  // Short qualitative impact lists ("Faster onboarding", "Reduced drop-offs") use the same template:
  // the first word is the big headline, the rest is the label.
  if (block.id === "impact" && block.stats && block.stats.length > 0) {
    return (
      <section id={`cs-${block.id}`} className="mt-16 scroll-mt-24 border-t border-border pt-10">
        <OutcomeShowcase heading={block.title || "What changed"} stats={block.stats} />
      </section>
    );
  }
  if (block.id === "impact" && block.bullets && block.bullets.length > 0 && block.bullets.every((b) => b.split(" ").length <= 4)) {
    const stats = block.bullets.map((b) => {
      const [first, ...rest] = b.split(" ");
      const label = rest.join(" ");
      return { value: first, label: label ? label.charAt(0).toUpperCase() + label.slice(1) : first };
    });
    return (
      <section id={`cs-${block.id}`} className="mt-16 scroll-mt-24 border-t border-border pt-10">
        <OutcomeShowcase heading={block.title || "What changed"} stats={stats} />
      </section>
    );
  }
  // Outcome sections share one "what I achieved" template.
  if (block.id === "outcome") {
    return (
      <section id={`cs-${block.id}`} className="mt-16 scroll-mt-24 border-t border-border pt-10">
        <OutcomeShowcase text={block.lead} stats={block.stats ?? fallbackStats} note={block.note} />
      </section>
    );
  }
  // Editorial two-column row: small label left, content right (neat & clean).
  if (block.side) {
    return (
      <section
        id={`cs-${block.id}`}
        className={`scroll-mt-24 ${block.title ? "mt-16 border-t border-border pt-10" : "mt-12"}`}
      >
        <div className={block.title ? "grid gap-3 sm:grid-cols-[180px_1fr] sm:gap-12" : ""}>
          {block.title && <p className="text-[14px] font-semibold text-foreground">{block.title}</p>}
          <div>
            {block.eyebrow && !block.title && (
              <p
                className={
                  block.title
                    ? "mb-3 text-[15px] font-medium text-blue-900/50 dark:text-blue-300/70"
                    : "mx-auto mb-3 max-w-2xl text-center text-[20px] font-semibold tracking-tight text-foreground sm:text-[22px]"
                }
              >
                {block.eyebrow}
              </p>
            )}
            {block.lead && (
              <p className={`text-[15px] leading-relaxed text-foreground/85 ${block.title ? "max-w-2xl" : "mx-auto max-w-xl text-center"}`}>
                {renderRich(block.lead)}
              </p>
            )}
            {block.body?.map((p, i) => (
              <p
                key={i}
                className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/85"
              >
                {renderRich(p)}
              </p>
            ))}
            {block.bullets && (
              <div className="mt-4">
                <StudyBullets items={block.bullets} />
              </div>
            )}
            {block.stats && <StudyStats stats={block.stats} small />}
            {block.note && (
              <div className={block.title ? "" : "mx-auto max-w-xl text-center"}>
                <StudyNote text={block.note} />
              </div>
            )}
            {/* Narrow: the image stays inside the text column */}
            {block.narrow && block.image && (
              <div className="mt-5">
                <StudyMedia
                  value={block.image}
                  alt={block.title || block.eyebrow || ""}
                  onZoom={onZoom}
                />
              </div>
            )}
            {block.narrow && block.images && (
              <div className="mt-5 space-y-4">
                {block.images.map((src, i) => (
                  <StudyMedia
                    key={i}
                    value={src}
                    alt={block.title || block.eyebrow || ""}
                    onZoom={onZoom}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Wireframe → colour reveal, full breakout width */}
        {block.image && block.hoverImage && !block.narrow && (
          <div className="relative left-1/2 mt-6 w-[min(max(72vw,100%),68rem)] -translate-x-1/2">
            <HoverRevealMedia
              base={block.image}
              reveal={block.hoverImage}
              alt={block.title || block.eyebrow || ""}
              onZoom={onZoom}
            />
          </div>
        )}
        {/* Images break out of the text column — ~72vw, centered on the page */}
        {block.image && block.scroller && !block.narrow && !block.hoverImage && (
          <figure className="relative left-1/2 mt-6 w-[min(max(72vw,100%),68rem)] -translate-x-1/2">
            <div className="overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </span>
                <span className="mx-auto rounded-full bg-foreground/[0.06] px-4 py-1 text-[12px] text-muted-foreground">
                  {block.scroller.label ?? "capitalfi.com"}
                </span>
              </div>
              {/* The full page — scrolls inside the frame */}
              <div data-lenis-prevent className="max-h-[75vh] min-h-[16rem] overflow-y-auto overscroll-contain">
                <img
                  src={assetUrl(block.image)}
                  alt={block.title || block.eyebrow || ""}
                  decoding="async"
                  className="w-full align-top"
                />
              </div>
            </div>
            <figcaption className="mt-2.5 text-[13px] text-muted-foreground">
              Scroll inside the frame to walk the full page.
            </figcaption>
          </figure>
        )}
        {block.image && !block.scroller && !block.narrow && !block.hoverImage && (
          <div className="relative left-1/2 mt-6 w-[min(max(72vw,100%),68rem)] -translate-x-1/2">
            <StudyMedia value={block.image} alt={block.title || block.eyebrow || ""} onZoom={onZoom} />
          </div>
        )}
        {block.images && !block.narrow && (
          <div className="relative left-1/2 mt-6 w-[min(max(72vw,100%),68rem)] -translate-x-1/2 space-y-6">
            {block.images.map((src, i) => (
              <StudyMedia key={i} value={src} alt={block.title || block.eyebrow || ""} onZoom={onZoom} />
            ))}
          </div>
        )}
      </section>
    );
  }
  return (
    <CaseSection id={`cs-${block.id}`} eyebrow={block.eyebrow ?? ""} title={block.title}>
      {block.lead && (
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
          {renderRich(block.lead)}
        </p>
      )}
      {!block.cards &&
        block.body?.map((p, i) => (
          <p key={i} className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/85">
            {renderRich(p)}
          </p>
        ))}
      {block.bullets &&
        (block.bullets.length > 0 && block.bullets.every((b) => STORY_RE.test(b.trim())) ? (
          <StoryCards items={block.bullets} />
        ) : (
          <div className="mt-5">
            <StudyBullets items={block.bullets} />
          </div>
        ))}
      {block.video && (
        <div className="mt-6 overflow-hidden rounded-2xl">
          <video
            src={assetUrl(block.video)}
            controls
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full"
            aria-label={block.title}
          />
        </div>
      )}
      {block.columns && (
        <div
          className={`mt-6 grid gap-4 ${
            block.columns.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {block.columns.map((c, i) => (
            <InfoColumn key={i} heading={c.heading} items={c.items} tone={i % 4} />
          ))}
        </div>
      )}
      {block.flow && <FlowDiagram />}
      {block.personas && <PersonaExplorer personas={block.personas} />}
      {block.road && <RoadMap stops={block.road} />}
      {block.notes && <StickyNotes notes={block.notes} tone={block.noteTone} />}
      {block.cards && block.cards.every((c) => c.short) && <DecisionExplorer cards={block.cards} />}
      {block.cards && !block.cards.every((c) => c.short) && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {block.cards.map((c, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-[15px] font-semibold text-foreground">{c.heading}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      )}
      {block.cards &&
        block.body?.map((p, i) => (
          <p key={i} className="mt-6 max-w-2xl text-[15px] leading-relaxed text-foreground/85">
            {renderRich(p)}
          </p>
        ))}
      {block.stats && <StudyStats stats={block.stats} />}
      {block.note && <StudyNote text={block.note} />}
      {block.image && !block.road && !block.flow && (
        <div className="mt-6">
          <div style={block.imageBleed ? { width: `${block.imageBleed.width}%`, marginLeft: `${block.imageBleed.left}%` } : undefined}>
            <StudyMedia value={block.image} alt={block.title} onZoom={onZoom} />
          </div>
        </div>
      )}
      {block.images && (
        <div className="mt-6 space-y-4">
          {block.images.map((src, i) => (
            <StudyMedia key={i} value={src} alt={block.title} onZoom={onZoom} />
          ))}
        </div>
      )}
      {block.gallery && (
        <div className="mt-8 space-y-12">
          {block.gallery.map((g, i) => (
            <figure key={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[15px] font-medium text-foreground">{g.heading}</h3>
                {g.text && <p className="text-[14px] text-muted-foreground sm:text-right">{g.text}</p>}
              </div>
              {g.bullets && <div className="mt-3"><StudyBullets items={g.bullets} /></div>}
              {g.note && <StudyNote text={g.note} />}
              <div className="mt-4">
                <StudyMedia value={g.image} alt={g.heading} onZoom={onZoom} />
              </div>
            </figure>
          ))}
        </div>
      )}
    </CaseSection>
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
    <div className="grid grid-cols-[5rem_1fr] items-start gap-4 border-t border-border/70 py-4 first:border-t-0 first:pt-0 last:pb-0">
      <p className="pt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t) => {
          const Brand = BRAND_LOGOS[t];
          return (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.05] px-3 py-1.5 text-[13px] text-foreground/85"
            >
              {Brand && <Brand className="h-3.5 w-3.5" />}
              {t === "In progress" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2E6B54]" />}
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Floating "All work" button — slides in once the header scrolls away.
function FloatingBack({ onBack }: { onBack: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-50 sm:top-[1.15rem]">
      <div className="mx-auto max-w-[72rem] px-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to all work"
          className={`group pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-sm outline-none transition-all duration-300 ease-out hover:bg-card active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25 ${
            show
              ? "translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-3 opacity-0"
          }`}
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back
        </button>
      </div>
    </div>
  );
}

// Case studies that require a password. Only a SHA-256 hash is stored here, and the
// unlock lives in sessionStorage — this is a casual gate for a static site, not real
// access control (the page content is still part of the public bundle).
const CASE_PASSWORD_HASH =
  "1aede9f588ca5083ae9ffd28200ce6c4e1a9e66e98ac9d699b686b948c2c8b7d";
// Master switch: false = every case study is open (no lock icons, no password page).
// Set to true to turn the password protection back on for the cases listed below.
const PASSWORD_GATE_ON = true;
const PROTECTED_CASES: Record<string, string> = !PASSWORD_GATE_ON ? {} : {
  "project-studycrux": CASE_PASSWORD_HASH,
  "project-tabnet-security": CASE_PASSWORD_HASH,
  "project-baladi-express": CASE_PASSWORD_HASH,
  "project-leadsdemos": CASE_PASSWORD_HASH,
  "project-ask-me": CASE_PASSWORD_HASH,
  "project-capitalfi": CASE_PASSWORD_HASH,
  "project-cakes-celebrations": CASE_PASSWORD_HASH,
  "project-audio-transcript-analysis": CASE_PASSWORD_HASH,
};

async function sha256Hex(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const unlockKey = (id: string) => `unlocked:${id}`;
function isUnlocked(id: string) {
  if (!PROTECTED_CASES[id]) return true;
  try {
    return sessionStorage.getItem(unlockKey(id)) === "1";
  } catch {
    return false;
  }
}

function PasswordGate({
  id,
  title,
  onUnlock,
  onBack,
}: {
  id: string;
  title: string;
  onUnlock: () => void;
  onBack: () => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [shake, setShake] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || busy) return;
    setBusy(true);
    let ok = false;
    try {
      ok = (await sha256Hex(value)) === PROTECTED_CASES[id];
    } catch {
      ok = false;
    }
    setBusy(false);
    if (ok) {
      try {
        sessionStorage.setItem(unlockKey(id), "1");
      } catch {
        /* storage unavailable — unlock for this view only */
      }
      setLeaving(true);
      window.setTimeout(onUnlock, 380);
    } else {
      setError(true);
      setShake((n) => n + 1);
    }
  };
  return (
    <main className="mx-auto max-w-[72rem] px-6 pb-14 sm:pb-32">
      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-1.5 self-start text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20 sm:hidden"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
      </button>
      <section className="pt-8 sm:pt-12">
        <div
          className={`animate-gate-in relative rounded-[2rem] px-6 py-14 text-center transition-all duration-[380ms] ease-out sm:py-24 ${
            leaving ? "scale-[0.98] opacity-0 blur-sm" : ""
          }`}
        >
          <div className="relative z-10 mx-auto max-w-xl">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-border text-foreground">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </span>
            <h1 className="mt-6 text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl">
              This case study is{" "}
              <span className="font-semibold italic">password protected.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-[1.8] text-foreground/70">
              Client work, kept private. Enter the password, or email{" "}
              <a
                href={`${links.email}?subject=${encodeURIComponent(`Password for ${title}`)}`}
                className="text-foreground underline underline-offset-4 decoration-foreground/30 transition-colors hover:decoration-foreground"
              >
                {links.emailAddress}
              </a>{" "}
              for access. I can also walk you through it in an interview.
            </p>
            <form onSubmit={submit} className="mx-auto mt-8 max-w-sm">
              <div key={shake} className={shake ? "animate-gate-shake" : ""}>
              <label htmlFor="case-password" className="sr-only">
                Password
              </label>
              <input
                id="case-password"
                type="password"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                aria-invalid={error}
                autoFocus
                className={`w-full rounded-full border bg-background px-5 py-3 text-center text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-foreground/25 ${
                  error ? "border-red-500" : "border-border"
                }`}
              />
              {error && (
                <p role="alert" className="mt-2 text-[13px] text-red-600 dark:text-red-400">
                  Incorrect password. Please try again.
                </p>
              )}
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground outline-none transition-all hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25 disabled:opacity-60"
                >
                  Unlock <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-foreground/25"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
                </button>
              </div>
              <p className="mt-6 text-[12px] tracking-wide text-muted-foreground">
                Private · shared on request
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
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
  const [zoom, setZoom] = useState<string | null>(null);
  useEffect(() => setImgOk(true), [id]);
  useEffect(() => setZoom(null), [id]);
  const [, setTick] = useState(0);
  if (!project || !cs) return null;
  if (!isUnlocked(id)) {
    return (
      <PasswordGate
        id={id}
        title={project.title}
        onUnlock={() => setTick((t) => t + 1)}
        onBack={onBack}
      />
    );
  }
  const idx = projects.findIndex((p) => p.id === id);
  const next = projects[(idx + 1) % projects.length];
  return (
    <main className="mx-auto max-w-[72rem] px-6 pb-14 sm:pb-32">
      <FloatingBack onBack={onBack} />
      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All work
      </button>

      <header className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
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
        ) : cs.sections ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 bg-card/40">
            <ImageIcon className="h-7 w-7 text-muted-foreground/60" aria-hidden="true" />
            <span className="rounded-md bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground ring-1 ring-border">
              Image placeholder
            </span>
            <span className="text-[13px] text-muted-foreground">Cover / hero image</span>
          </div>
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${project.gradient}`} />
        )}
      </div>

      <section id="cs-intro" className="mt-12 grid scroll-mt-24 items-start gap-10 border-t border-border pt-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
            <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
            Intro
          </p>
          <div className="mt-6">
            {cs.intro.map((para, i) =>
              i === 0 ? (
                <p key={i} className="text-[clamp(22px,2.5vw,30px)] font-medium leading-[1.3] tracking-[-0.02em] text-foreground">
                  {renderRich(para)}
                </p>
              ) : (
                <p key={i} className="mt-6 max-w-xl border-l-2 border-[#2563eb]/30 pl-5 text-[16px] leading-[1.7] text-foreground/70">
                  {renderRich(para)}
                </p>
              ),
            )}
          </div>
        </div>
        <aside className="self-start">
          {(() => {
            // The category line that used to sit above the title (e.g. "Product Design · AI Analytics"),
            // minus anything already listed under Role or Type.
            const have = new Set([...cs.tags.role, ...cs.tags.type].map((x) => x.toLowerCase()));
            const cat = cs.eyebrow.split("·").map((x) => x.trim()).filter((x) => x && !have.has(x.toLowerCase()));
            return cat.length > 0 ? <TagGroup label="Category" items={cat} /> : null;
          })()}
          <TagGroup label="Role" items={cs.tags.role} />
          <TagGroup label="Status" items={cs.inProgress ? ["In progress", ...cs.tags.status] : cs.tags.status} />
          <TagGroup label="Type" items={cs.tags.type} />
          <TagGroup label="Tools" items={cs.tags.tools} />
        </aside>
      </section>

      {!cs.sections && (
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
      )}

      {!cs.board && !cs.sections && (
      <>
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

      <ProcessTimeline steps={cs.process} bars={cs.timeline} />

      {cs.beforeAfter && (
        <CaseSection id="cs-beforeafter" eyebrow="Before → After" title="What changed">
          {cs.beforeAfter.text && (
            <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
              {cs.beforeAfter.text}
            </p>
          )}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { ...cs.beforeAfter.before, tag: "Before", tone: "rose" as const },
              { ...cs.beforeAfter.after, tag: "After", tone: "emerald" as const },
            ].map((s) => (
              <figure key={s.tag} className="overflow-hidden rounded-2xl ring-1 ring-border">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-background/40">
                  <img
                    src={assetUrl(s.src)}
                    alt={`${s.tag}: ${s.caption}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                      s.tone === "rose"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                    }`}
                  >
                    {s.tag}
                  </span>
                </div>
                <figcaption className="bg-card px-4 py-2.5 text-[13px] text-muted-foreground">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </CaseSection>
      )}

      <CaseSection id="cs-solution" eyebrow="Solution" title="The solution">
        <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
          {cs.solution.text}
        </p>
        <div className="mt-8">
          <ColourCards items={cs.solution.highlights.map((h) => ({ title: h.title, text: h.text }))} />
        </div>
        {/* Screen slots — real mockups when provided, else gradient placeholders. */}
        {cs.screens && cs.screens.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cs.screens.map((s) => (
              <figure key={s.src} className="overflow-hidden rounded-2xl">
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
        ) : !cs.gallery ? (
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
        ) : null}
      </CaseSection>
      </>
      )}

      {cs.gallery && !cs.sections && (
        <CaseSection
          id="cs-screens"
          eyebrow="Screens"
          title={cs.gallery.title ?? "The flow"}
        >
          {cs.gallery.text && (
            <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
              {cs.gallery.text}
            </p>
          )}
          <div className="mt-6 space-y-6">
            {cs.gallery.shots.map((shot) => (
              <figure key={shot.src}>
                <button
                  type="button"
                  onClick={() => setZoom(assetUrl(shot.src))}
                  aria-label={`View ${shot.caption} full size`}
                  className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                >
                  <img
                    src={assetUrl(shot.src)}
                    alt={shot.caption}
                    loading="lazy"
                    className="w-full transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </button>
                <figcaption className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </CaseSection>
      )}

      {cs.sections && cs.sections.map((block) => (
        <StudySectionBlock key={block.id} block={block} onZoom={setZoom} fallbackStats={cs.outcomes.metrics} />
      ))}

      {cs.board && !cs.sections && (
        <CaseSection id="cs-board" eyebrow="Case study" title="The full design">
          <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
            Every section from the original case study: research, personas, flows,
            the design system, and final screens. Tap any section to view it full size.
          </p>
          <div className="mt-8 space-y-5">
            {cs.board.map((frame) => (
              <button
                key={frame.src}
                type="button"
                onClick={() => setZoom(assetUrl(frame.src))}
                aria-label={`View ${frame.label} full size`}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
              >
                <img
                  src={assetUrl(frame.src)}
                  alt={frame.label}
                  loading="lazy"
                  className="w-full"
                />
              </button>
            ))}
          </div>
        </CaseSection>
      )}

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Case study section preview"
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-auto bg-black/85 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={() => setZoom(null)}
            aria-label="Close preview"
            className="fixed right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <img
            src={zoom}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="h-auto w-full max-w-[1100px] rounded-lg shadow-2xl"
          />
        </div>
      )}

      {!cs.sections && (
      <section id="cs-impact" className="mt-14 scroll-mt-24 border-t border-border pt-10">
        <OutcomeShowcase text={cs.outcomes.text} stats={cs.outcomes.metrics} />
      </section>
      )}

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

// Real brand marks (SVG files in /public/tools) sit on a brand-coloured tile.
// Tools with a bundled inline logo (Figma, Framer, Notion, HTML…) use BRAND_LOGOS instead.
const TOOL_TILES: Record<string, { bg: string; src?: string; text?: string; fg?: string; pad?: number }> = {
  Claude: { bg: "#D97757", src: "tools/claude.svg" },
  ChatGPT: { bg: "#000000", src: "tools/openai.svg" },
  Lovable: { bg: "#0B0B12", src: "tools/lovable.svg" },
  Jira: { bg: "#0052CC", src: "tools/jira.svg" },
  Confluence: { bg: "#1868DB", src: "tools/confluence.svg" },
  Maze: { bg: "#2B5BFF", src: "tools/maze.svg" },
  Hotjar: { bg: "#FF3C00", src: "tools/hotjar.svg" },
  LottieLab: { bg: "transparent", src: "tools/lottielab.svg", pad: 0 },
  Miro: { bg: "#FFD02F", src: "tools/miro.svg" },
};

function ToolGlyph({ name }: { name: string }) {
  if (name === "Claude Code")
    return (
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#1f1e1d] text-[12px] font-bold leading-none text-[#d97757]"
      >
        &gt;_
      </span>
    );
  const t = TOOL_TILES[name];
  if (t) {
    return (
      <span
        aria-hidden="true"
        style={{ background: t.bg, color: t.fg }}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold leading-none"
      >
        {t.src ? <img src={assetUrl(t.src)} alt="" className={t.pad === 0 ? "h-8 w-8 rounded-[10px]" : "h-[18px] w-[18px]"} draggable={false} /> : t.text}
      </span>
    );
  }
  const Brand = BRAND_LOGOS[name];
  if (Brand) return <Brand className="h-8 w-8 shrink-0" />;
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-slate-700 text-[11px] font-bold leading-none text-white"
    >
      {name.slice(0, 2)}
    </span>
  );
}

const SKILL_CARDS: { label: string; fact: string; Icon: (p: { className?: string }) => ReactNode }[] = [
  { label: "Product Design", fact: "4+ years in enterprise SaaS, AI and data", Icon: SkProductDesign },
  { label: "Data driven Design", fact: "Dashboards, alerts and data workflows", Icon: SkDataDriven },
  { label: "Design Systems", fact: "120+ components, 40% more reuse", Icon: SkDesignSystems },
  { label: "Prototyping", fact: "Figma, Framer, ProtoPie", Icon: SkPrototyping },
  { label: "AI Workflows", fact: "Ask Me, a GenAI analytics assistant", Icon: SkAiWorkflows },
  { label: "Interaction Design", fact: "Micro interactions that guide", Icon: SkInteraction },
  { label: "Figma to Code", fact: "Figma MCP and Claude Code", Icon: SkFigmaToCode },
  { label: "UX Research", fact: "Usability tests, WCAG audits on 80+ screens", Icon: SkUxResearch },
];

// **bold** marks the words that stay dark; everything else starts light and fills in on scroll.
const SKILLS_STATEMENT =
  "I design **decision centric products** for complex data workflows, work closely with **engineering teams** and obsess over **details that ship.**";

function SkillsStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(1);
  const words = SKILLS_STATEMENT.split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .flatMap((part) =>
      part.startsWith("**")
        ? part.slice(2, -2).split(" ").map((w) => ({ w, bold: true }))
        : part.split(" ").filter(Boolean).map((w) => ({ w, bold: false })),
    );
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setProgress(Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.45))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <p
      ref={ref}
      className="text-lg font-light leading-[1.6] tracking-tight sm:text-[22px]"
    >
      {words.map((x, i) => {
        const lit = progress * words.length > i;
        return (
          <span
            key={i}
            className={`transition-colors duration-300 ${
              x.bold
                ? "font-semibold text-foreground"
                : lit
                  ? "text-foreground/45"
                  : "text-foreground/20"
            }`}
          >
            {x.w}{" "}
          </span>
        );
      })}
    </p>
  );
}

function SkillCard({ label, Icon }: (typeof SKILL_CARDS)[number]) {
  return (
    <li className="skill-card group flex cursor-default items-center gap-4 rounded-[2px] bg-white px-5 py-6 sm:last:rounded-br-[24px] dark:bg-card transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)]">
      <Icon className="skill-icon h-7 w-7 shrink-0 text-foreground/80 transition-colors duration-300" />
      <span className="skill-label text-[15px] font-medium tracking-tight text-foreground">{label}</span>
    </li>
  );
}

// Tool logos that drop into the empty space of the Skills panel and pile up (physics via matter-js).
const PILE_TOOLS = toolstack.flatMap((g) => g.tools);

function ToolPile() {
  const wrap = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const els = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!started || size.w < 120 || size.h < 120) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tile = size.w < 360 ? 46 : 54;
    const { Engine, Bodies, Body, Composite } = Matter;
    const engine = Engine.create({ enableSleeping: true });
    engine.gravity.y = 0.7;
    const wall = { isStatic: true, friction: 0.6 } as const;
    const t = 80;
    Composite.add(engine.world, [
      Bodies.rectangle(size.w / 2, size.h + t / 2, size.w + t * 2, t, wall),
      Bodies.rectangle(-t / 2, size.h / 2, t, size.h * 4, wall),
      Bodies.rectangle(size.w + t / 2, size.h / 2, t, size.h * 4, wall),
    ]);
    const bodies: Matter.Body[] = [];
    const timers: number[] = [];
    let raf = 0;
    let last = performance.now();
    let running = true;
    const draw = () => {
      bodies.forEach((b, i) => {
        const node = els.current[i];
        if (node) node.style.transform = `translate(${b.position.x - tile / 2}px, ${b.position.y - tile / 2}px) rotate(${b.angle}rad)`;
      });
    };
    const loop = (now: number) => {
      if (!running) return;
      Engine.update(engine, Math.min(32, now - last));
      last = now;
      draw();
      raf = requestAnimationFrame(loop);
    };
    PILE_TOOLS.forEach((_, i) => {
      const x = tile / 2 + 8 + Math.random() * Math.max(10, size.w - tile - 16);
      const b = Bodies.rectangle(x, reduce ? size.h - tile / 2 - (i % 6) * tile : -tile - 10, tile, tile, {
        chamfer: { radius: 14 },
        restitution: 0.28,
        friction: 0.5,
        frictionAir: 0.01,
        angle: (Math.random() - 0.5) * 0.7,
      });
      bodies.push(b);
      const add = () => {
        Composite.add(engine.world, b);
        Body.setVelocity(b, { x: (Math.random() - 0.5) * 2, y: 1 });
      };
      if (reduce) add();
      else timers.push(window.setTimeout(add, 250 + i * 150));
    });
    if (reduce) {
      for (let k = 0; k < 120; k++) Engine.update(engine, 16);
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [started, size.w, size.h]);

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0 overflow-hidden" aria-label="Tools I use">
      {PILE_TOOLS.map((name, i) => (
        <div
          key={name}
          ref={(n) => {
            els.current[i] = n;
          }}
          title={name}
          className="pointer-events-auto absolute left-0 top-0 flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.05)] dark:bg-card"
          style={{ transform: "translate(-200px,-200px)", willChange: "transform" }}
        >
          <ToolGlyph name={name} />
        </div>
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="rounded-[32px] bg-[#FAFBFC] p-6 sm:pb-2 sm:pl-10 sm:pr-2 sm:pt-10 dark:bg-white/[0.05]">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Skills</p>
      <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-8">
        <div className="relative flex max-w-[34rem] flex-col lg:max-w-none lg:pr-6">
          <ToolPile />
          <div className="relative z-10 max-w-[34rem]">
            <SkillsStatement />
          </div>
          <div aria-hidden="true" className="min-h-[15rem] flex-1" />
        </div>
        <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-20">
          {SKILL_CARDS.map((c) => (
            <SkillCard key={c.label} {...c} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SkillsAndTools() {
  return (
    <section id="skills-tools" className="mt-14 scroll-mt-24 sm:mt-24">
      <SkillsPanel />
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
              src={assetUrl(a.certificate ?? "")}
              alt={`${a.title} certificate`}
              onError={() => setImgOk(false)}
              loading="lazy"
              decoding="async"
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
        src={assetUrl(award.certificate ?? "")}
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
                src={assetUrl(c.image)}
                alt={c.name}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover ${c.center ? "object-center" : "object-top"} transition-transform duration-500 group-hover:scale-[1.04]`}
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

      {/* Prev / next arrows — fixed in the margin, outside the image */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="Previous creative"
        className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40 sm:left-5 sm:h-11 sm:w-11"
      >
        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="Next creative"
        className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40 sm:right-5 sm:h-11 sm:w-11"
      >
        <ChevronRight className="h-6 w-6" aria-hidden="true" />
      </button>
      {current.image && (
        <img
          key={current.image}
          src={assetUrl(current.image)}
          alt={current.name}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[78vh] max-w-[calc(100vw-7rem)] rounded-lg object-contain shadow-2xl sm:max-w-[calc(100vw-9rem)]"
        />
      )}
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
      <div className="mx-auto max-w-[72rem] px-6">
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
          Logos, posters, and explorations, work that lives outside the sprint.
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


const ABOUT_GRAD =
  "bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent";
const ABOUT_WASH =
  "bg-[radial-gradient(60%_90%_at_0%_0%,#dbe7ff_0%,transparent_60%),radial-gradient(55%_90%_at_100%_100%,#d6ecff_0%,transparent_60%)] bg-[#eef3ff] dark:bg-[radial-gradient(60%_90%_at_0%_0%,rgba(59,108,246,0.22)_0%,transparent_60%),radial-gradient(55%_90%_at_100%_100%,rgba(96,165,250,0.12)_0%,transparent_60%)] dark:bg-white/[0.04]";
const ABOUT_BLUE_BTN =
  "bg-gradient-to-b from-[#3b6cf6] to-[#2346c7] text-white shadow-[0_8px_20px_-8px_rgba(47,91,232,0.7)]";

const ABOUT_SLIDES = [
  {
    label: "Currently learning",
    text: "Seven things on the bench right now.",
    facts: [
      "Shipping AI products at Lumenore",
      "Prototyping with AI more than I expected",
      "Reading more books",
      "Learning development to build what I design",
      "Psychology",
      "Service design",
      "Trying to keep the promises I make to myself",
    ],
  },
];

const ABOUT_TRAITS = [
  { title: "Problem Solver", img: "problem", bg: "#cfdcff", fg: "#1f3a9e", quip: "Solving problem. Oh solved it!", text: "Before I call something a 'problem,' I always ask myself, does this really need a solution? My curiosity helps me find a better one when it turns out to be a real issue." },
  { title: "Calm & Compose", img: "calm", bg: "#dcd6ff", fg: "#3b2b9e", quip: "I bring peace", text: "Deadlines move, scope shifts, I stay steady and keep the team moving." },
  { title: "Detail Oriented", img: "detail", bg: "#cbe4ff", fg: "#124e8a", quip: "After 52 attempts, now all details are covered.", text: "Because that one flow gap always gives a headache." },
  { title: "UX Researcher", img: "research", bg: "#c4d0ff", fg: "#1f2f8f", quip: "I want to know everything.", text: "I always love to dig deep to truly understand the core of the requirement." },
  { title: "Well Organized", img: "organized", bg: "#d3dbf5", fg: "#22306e", quip: "Not just perfect. Monica perfect!", text: "Actually a Designer OCD. Just to make everything in my way, perfect!! Like Monica (FRIENDS) hah! I knowwwww!" },
  { title: "Empathetic Listener", img: "listener", bg: "#dcd9ff", fg: "#3a2a8c", quip: "Yeah, I'm listening", text: "Oh, I'm really great at this, clients just love how well I listen and this helps me to empathise with them to get what they want." },
];

type AboutJob = {
  company: string;
  role: string;
  logo: string;
  location: string;
  dates: string;
  s: number;
  e: number;
  desc: string;
  roles?: { title: string; period: string }[];
  highlight?: { label: string; text: string };
  metrics?: { v: string; l: string }[];
  bullets?: string[];
};

const ABOUT_JOBS: AboutJob[] = [
  {
    company: "Netlink Software Group", role: "Senior Product Designer", logo: "logos/netlink.png",
    location: "Bhopal, India", dates: "Jul 2024 – Present", s: 42, e: 70,
    desc: "Promoted from Associate UI/UX Designer to Senior Product Designer in 2026. Designing Lumenore, a BI & AI platform spanning conversational analytics, data management, dashboards, and enterprise workflows.",
    roles: [{ title: "Senior Product Designer", period: "2026 – Present" }, { title: "Associate UI/UX Designer", period: "Jul 2024 – 2026" }],
    highlight: { label: "ASK ME", text: "Designed Lumenore Ask Me, a GenAI conversational analytics assistant (agentic RAG, MCP integrations): natural language querying, streaming answer states, uncertainty and error handling, and confirmation before users act on model output." },
    metrics: [{ v: "↓50%", l: "task completion time" }, { v: "↓32%", l: "onboarding drop-off" }, { v: "5,000+", l: "active users" }, { v: "120+", l: "design system components" }, { v: "+40%", l: "component reuse" }, { v: "80+", l: "screens audited, WCAG 2.1 AA" }],
    bullets: [
      "Own end to end design across Ask Me, Data Magnet, dashboards, alerts, scheduler, and data management workflows, from discovery through design QA and release.",
      "Run user testing sessions with enterprise customers, including moderated walkthroughs, task based scenarios, and post release follow ups.",
      "Reduced task completion time by up to 50% by simplifying complex analytics workflows for nontechnical users.",
      "Shipped 3 major features, reducing onboarding drop-off by 32% and support queries by 20%, reaching 5,000+ active users.",
      "Built and governed a design system of 120+ components, variants, states, and tokens, increasing reuse by 40%.",
      "Ran usability studies and WCAG 2.1 AA audits across 80+ screens; mobile first validation improved task completion by 25%.",
      "Partner with product, engineering, QA, and business stakeholders to align design with OKRs, KPIs, and technical constraints.",
    ],
  },
  {
    company: "Shanti Infosoft LLP", role: "UI/UX Designer", logo: "logos/shanti.png",
    location: "Indore, India", dates: "Jul 2023 – Jun 2024", s: 30, e: 42,
    desc: "Owned product design across SaaS, B2C, healthcare, and audit products, from discovery through live release.",
    metrics: [{ v: "6", l: "products shipped end to end" }, { v: "+35%", l: "task success (Maze)" }, { v: "↓30%", l: "dev clarification time" }, { v: "↓20%", l: "user errors" }],
    bullets: [
      "Shipped 6 end to end products across web, mobile, and tablet, covering research, flows, interaction design, prototyping, and developer handoff.",
      "Validated mobile first healthcare and audit workflows through Maze studies, improving task success by 35%.",
      "Created reusable Figma systems and clearer specs, cutting developer clarification time by 30% and reducing user errors by 20%.",
    ],
  },
  {
    company: "Incscale Technologies", role: "UI/UX & Graphic Designer", logo: "logos/incscale.png",
    location: "Indore, India", dates: "Aug 2022 – Jun 2023", s: 19, e: 30,
    desc: "Designed mobile first B2C applications, ecommerce journeys, landing pages, and responsive websites.",
    metrics: [{ v: "↓15%", l: "bounce rate" }, { v: "↓25%", l: "design review cycles" }],
    bullets: [
      "Used Hotjar insights to reduce bounce rate by 15%; interactive prototypes cut design review cycles by 25%.",
      "Created wireframes, user flows, and high fidelity prototypes for client validation and development handoff; supported AI assisted front end prototyping.",
    ],
  },
  {
    company: "Aashman Foundation", role: "Graphic Designer (Volunteer)", logo: "logos/aashman.png",
    location: "Remote", dates: "2021 – 2022", s: 0, e: 24,
    desc: "Designed campaign and social media creatives supporting outreach programs for underprivileged communities.",
  },
];

const ABOUT_YEARS = ["2021", "2022", "2023", "2024", "2025", "2026"];

const ABOUT_ARROW_BTN =
  "grid h-9 w-9 place-items-center rounded-full text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-foreground/25";

function AboutStat({ pre, n, suf, label, run }: { pre: string; n: number; suf: string; label: string; run: boolean }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setP(1);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1600);
      setP(1 - Math.pow(1 - k, 3));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[34px] font-medium tabular-nums tracking-[-0.04em] sm:text-[40px]">
        {pre}
        {Math.round(n * p).toLocaleString("en-US")}
        {suf}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    </div>
  );
}

function AboutHero() {
  const [slide, setSlide] = useState(0);
  const [run, setRun] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = statsRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setRun(true);
      return;
    }
    let t = 0;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        t = window.setTimeout(() => setRun(true), 700);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  const n = ABOUT_SLIDES.length;
  const s = ABOUT_SLIDES[slide];
  const words = ["I", "turn", "complex", "data", "into", "decisions", "people", "can", "trust."];
  return (
    <section className="flex flex-col gap-12 pb-24 pt-14 sm:gap-16 sm:pb-32 sm:pt-20">
      <div className="flex flex-col gap-6">
        <h1 className="max-w-[55rem] text-[clamp(34px,3.2vw,40px)] font-medium leading-[1.3] tracking-[-0.025em] text-[#262626] dark:text-[#e5e5e5]">
          {words.map((w, i) => (
            <span key={i}>
              <span
                className={`about-rise inline-block ${i >= 6 ? ABOUT_GRAD : ""}`}
                style={{
                  animationDelay: `${0.1 + i * 0.07}s`,
                  ...(i >= 6 ? { backgroundSize: "300% 100%", backgroundPosition: `${(i - 6) * 50}% 0` } : null),
                }}
              >
                {w}
              </span>{" "}
            </span>
          ))}
        </h1>
        <p className="about-rise max-w-[34rem] text-pretty text-base leading-[1.7] text-[#a3a3a3] md:text-[15px]" style={{ animationDelay: "0.75s" }}>
          Four years across enterprise SaaS, AI and data. Today I shape Lumenore, from Ask Me, a
          GenAI analytics assistant, to dashboards and data workflows.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-7">
        <div ref={statsRef} className="about-rise flex flex-wrap gap-x-10 gap-y-5" style={{ animationDelay: "0.9s" }}>
          <AboutStat pre="↓" n={50} suf="%" label="Task time" run={run} />
          <AboutStat pre="↓" n={32} suf="%" label="Drop off" run={run} />
          <AboutStat pre="" n={5000} suf="+" label="Users" run={run} />
        </div>
      </div>
      <div className={`about-rise relative flex min-h-[320px] flex-col justify-between gap-9 overflow-hidden rounded-[28px] p-6 sm:p-10 ${ABOUT_WASH}`} style={{ animationDelay: "1.15s" }}>
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {ABOUT_SLIDES.map((x, i) => (
              <button
                key={x.label}
                type="button"
                onClick={() => setSlide(i)}
                aria-pressed={i === slide}
                className={`h-8 rounded-full border border-white px-3.5 text-[11px] font-medium uppercase tracking-[0.18em] outline-none transition-all focus-visible:ring-2 focus-visible:ring-foreground/25 dark:border-white/10 ${
                  i === slide ? "bg-white text-[#2346c7] dark:bg-white/15 dark:text-blue-200" : "bg-white/45 text-muted-foreground dark:bg-white/[0.05]"
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
          {n > 1 && <div className="flex gap-1.5">
            <button type="button" aria-label="Previous" onClick={() => setSlide((slide + n - 1) % n)} className={`${ABOUT_ARROW_BTN} border border-white bg-white/85 text-foreground hover:bg-white dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15`}>←</button>
            <button type="button" aria-label="Next" onClick={() => setSlide((slide + 1) % n)} className={`${ABOUT_ARROW_BTN} ${ABOUT_BLUE_BTN}`}>→</button>
          </div>}
        </div>
        <div key={slide} className="about-rise relative flex flex-col gap-6" style={{ animationDuration: "0.5s" }}>
          <p className="max-w-[51rem] text-pretty text-[clamp(22px,3vw,34px)] font-medium leading-[1.3] tracking-[-0.03em]">{s.text}</p>
          {s.facts.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {s.facts.map((f, i) => (
                <li key={f} className="flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2.5 text-[14px] text-foreground/80 dark:border-white/10 dark:bg-white/[0.08] sm:text-[15px]">
                  <span className="text-[12px] font-semibold text-[#2f5be8]">{String(i + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

// Alternating tilt and a staggered vertical drift so the row reads as a wave, not a rigid strip.
const ABOUT_TILT = [-3, 2.5, -2, 3, -2.5, 2];
const ABOUT_DROP = [0, 22, 6, 26, 2, 20];
const ABOUT_QUIP = [
  "-top-12 right-0 -rotate-3",
  "-top-12 left-0 rotate-2",
  "-top-12 right-0 rotate-2",
  "-top-12 left-0 -rotate-2",
  "-top-12 right-0 -rotate-2",
  "-top-12 left-0 rotate-3",
];

function AboutTraitCard({ t, i }: { t: (typeof ABOUT_TRAITS)[number]; i: number }) {
  const k = i % ABOUT_TRAITS.length;
  return (
    <div className="w-[300px] flex-none pb-[50px] pt-5 sm:w-[360px]" style={{ paddingTop: 20 + ABOUT_DROP[k] }}>
      <div
        className="relative h-[450px] rounded-[30px] p-3 shadow-[0_26px_40px_-30px_rgba(35,70,199,0.55)] transition-[transform,box-shadow] duration-500 ease-out [transform:rotate(var(--r))] hover:shadow-[0_40px_60px_-30px_rgba(35,70,199,0.65)] hover:[transform:translateY(-14px)_scale(1.04)] dark:shadow-[0_26px_40px_-30px_rgba(0,0,0,0.8)] sm:h-[480px]"
        style={{ ["--r" as string]: `${ABOUT_TILT[k]}deg`, background: `linear-gradient(105deg, ${t.bg} 0%, ${t.bg} 55%, #f4f7ff 115%)` }}
      >
        <div className="relative flex h-full flex-col gap-3.5 overflow-hidden rounded-[22px] border-[1.5px] border-dashed border-white/90 px-[22px] pt-[26px]">
          <span className="text-[25px] font-bold tracking-[-0.025em]" style={{ color: t.fg }}>{t.title}</span>
          <p className="text-pretty text-[15px] leading-[1.6] text-[#2a2a35]">{t.text}</p>
          <div className="relative mx-auto mt-auto h-[220px] w-[230px]">
            <div className="absolute inset-0 rounded-t-full bg-white/45" />
            <div className="absolute inset-x-[26px] bottom-0 top-7 overflow-hidden rounded-t-full bg-white">
              <img src={assetUrl(`about/traits/${t.img}.webp`)} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover" />
            </div>
            <span className={`pointer-events-none absolute max-w-[175px] ${ABOUT_QUIP[k]} rounded-[14px] bg-white px-3.5 py-2.5 text-[13px] font-bold leading-[1.35] text-[#1a1a1f] shadow-[0_10px_22px_-10px_rgba(0,0,0,0.35)]`}>
              {t.quip}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutTraits() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const hold = useRef(false);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const resume = useRef(0);

  // Slow auto-drift that stops while the pointer is over the row or a finger is on it.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      if (!hold.current) {
        pos.current += 0.6;
        el.scrollLeft = pos.current;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resume.current);
    };
  }, []);

  // Keep the loop seamless in both directions and track manual scrolling.
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft <= 0) el.scrollLeft += half;
    if (hold.current) pos.current = el.scrollLeft;
    else pos.current = Math.max(pos.current % half, 0);
  };

  const touchHold = (on: boolean) => {
    clearTimeout(resume.current);
    if (on) hold.current = true;
    else resume.current = window.setTimeout(() => (hold.current = false), 1800);
  };

  return (
    <section className="flex flex-col gap-6 pb-24 sm:gap-8 sm:pb-32">
      <h2 className="text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[44px]">
        How I am as <span className={ABOUT_GRAD}>a Designer</span>
      </h2>
      <div
        ref={ref}
        onScroll={onScroll}
        onMouseEnter={() => (hold.current = true)}
        onMouseLeave={() => {
          if (!drag.current) hold.current = false;
        }}
        onTouchStart={() => touchHold(true)}
        onTouchEnd={() => touchHold(false)}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          e.currentTarget.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        className="relative -mx-6 cursor-grab select-none overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [mask-image:linear-gradient(90deg,transparent_0,#000_6%,#000_94%,transparent_100%)] active:cursor-grabbing sm:mx-[calc(50%-50vw)] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max items-start gap-9 px-[18px]">
          {[...ABOUT_TRAITS, ...ABOUT_TRAITS].map((t, i) => (
            <AboutTraitCard key={i} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutJourney() {
  const [sel, setSel] = useState(0);
  return (
    <section className="flex scroll-mt-24 flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-2.5">
        <h2 className="text-[34px] font-bold italic tracking-[-0.04em] sm:text-[44px]">So Far, So Good</h2>
        <span className="text-[15px] text-muted-foreground sm:text-[16px]">
          4+ years experience in design · 3+ years working with startups
        </span>
      </div>

      <ol className="flex flex-col gap-3 md:hidden">
        {ABOUT_JOBS.map((j) => (
          <li key={j.company} className="rounded-3xl border border-border p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-xl border border-border bg-white p-1">
                <img src={assetUrl(j.logo)} alt="" className="h-full w-full object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold leading-snug">{j.company}</p>
                <p className="text-[13px] text-muted-foreground">{j.role}</p>
                <p className="mt-1 text-[12px] text-muted-foreground/80">{j.dates}</p>
              </div>
            </div>
            <div
              className="relative mt-4 h-2 rounded-full bg-foreground/[0.06]"
              aria-hidden="true"
            >
              <span
                className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#3b6cf6] to-[#2346c7]"
                style={{ left: `${(j.s / 72) * 100}%`, width: `${((j.e - j.s) / 72) * 100}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground/70" aria-hidden="true">
              {ABOUT_YEARS.map((y) => (
                <span key={y}>{y}</span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden flex-col overflow-x-auto rounded-3xl border border-border px-5 pb-3 pt-5 md:flex">
        <div className="grid min-w-[620px] grid-cols-[minmax(200px,260px)_minmax(380px,1fr)] gap-4 px-1.5 pb-2.5">
          <span />
          <div className="grid grid-cols-6 text-[11px] font-medium text-muted-foreground/70">
            {ABOUT_YEARS.map((y) => (
              <span key={y} className="border-l border-border pl-1.5">{y}</span>
            ))}
          </div>
        </div>
        {ABOUT_JOBS.map((j, i) => (
          <button
            key={j.company}
            type="button"
            onClick={() => setSel(i)}
            onMouseEnter={() => setSel(i)}
            aria-pressed={i === sel}
            className={`grid min-w-[620px] grid-cols-[minmax(200px,260px)_minmax(380px,1fr)] items-center gap-4 rounded-xl border-0 border-t border-border/60 px-1.5 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-foreground/25 ${
              i === sel ? "bg-[#fafaff] dark:bg-white/[0.04]" : "bg-transparent"
            }`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 flex-none place-items-center overflow-hidden rounded-[10px] border border-border bg-white p-1">
                <img src={assetUrl(j.logo)} alt="" className="h-full w-full object-contain" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[15px] font-semibold">{j.company}</span>
                <span className="text-[13px] text-muted-foreground">{j.role}</span>
              </span>
            </div>
            <div
              className="relative h-8"
              style={{ background: "repeating-linear-gradient(90deg, transparent 0, transparent calc(16.666% - 1px), hsl(var(--border) / 0.6) calc(16.666% - 1px), hsl(var(--border) / 0.6) 16.666%)" }}
            >
              <div
                className={`absolute bottom-[5px] top-[5px] rounded-full transition-all duration-300 ${
                  i === sel ? "bg-gradient-to-r from-[#3b6cf6] to-[#2346c7] shadow-[0_6px_16px_-6px_rgba(47,91,232,0.6)]" : "bg-[#dfe3ee] dark:bg-[#2a3042]"
                }`}
                style={{ left: `${(j.s / 72) * 100}%`, width: `${((j.e - j.s) / 72) * 100}%` }}
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <main className="mx-auto max-w-[72rem] px-6">
      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:hidden"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
      </button>
      <AboutHero />
      <AboutTraits />
      <AboutJourney />
    </main>
  );
}

function FloatingAsk() {
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
  const visible = show;
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
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background shadow-lg outline-none transition-all duration-200 ease-out hover:bg-card active:scale-95 focus-visible:ring-2 focus-visible:ring-foreground/25"
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

// Behance mark (SVG Repo) — drawn with currentColor so it follows the text colour.
function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 -0.5 25 25" fill="none" className={`${className ?? ""} scale-[1.3]`} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 12V6H8.5C10.1569 6 11.5 7.34315 11.5 9C11.5 10.6569 10.1569 12 8.5 12C10.1569 12 11.5 13.3431 11.5 15C11.5 16.6569 10.1569 18 8.5 18H5.5V12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 15C19.5 13.3431 18.1569 12 16.5 12C14.8431 12 13.5 13.3431 13.5 15H19.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 11.25C5.08579 11.25 4.75 11.5858 4.75 12C4.75 12.4142 5.08579 12.75 5.5 12.75V11.25ZM8.5 12.75C8.91421 12.75 9.25 12.4142 9.25 12C9.25 11.5858 8.91421 11.25 8.5 11.25V12.75ZM14.25 15C14.25 14.5858 13.9142 14.25 13.5 14.25C13.0858 14.25 12.75 14.5858 12.75 15L14.25 15ZM15.4295 17.8024L15.1619 18.5031L15.4295 17.8024ZM19.295 17.5C19.5712 17.1913 19.5447 16.7172 19.236 16.441C18.9273 16.1648 18.4532 16.1913 18.177 16.5L19.295 17.5ZM18.5 10.75C18.9142 10.75 19.25 10.4142 19.25 10C19.25 9.58579 18.9142 9.25 18.5 9.25V10.75ZM14.5 9.25C14.0858 9.25 13.75 9.58579 13.75 10C13.75 10.4142 14.0858 10.75 14.5 10.75V9.25ZM5.5 12.75H8.5V11.25H5.5V12.75ZM12.75 15C12.75 16.5548 13.7095 17.9483 15.1619 18.5031L15.6971 17.1018C14.8257 16.7689 14.25 15.9328 14.25 15L12.75 15ZM15.1619 18.5031C16.6143 19.0578 18.2584 18.6588 19.295 17.5L18.177 16.5C17.5551 17.1953 16.5686 17.4347 15.6971 17.1018L15.1619 18.5031ZM18.5 9.25H14.5V10.75H18.5V9.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

type FooterLink = { href: string; label: string; hint: string; Icon: React.ComponentType<{ className?: string }>; mail?: boolean };

function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async (e: ReactMouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(links.emailAddress);
    } catch {
      window.location.href = links.email;
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return { copied, copy };
}

const GLASS =
  "border border-white/15 bg-white/[0.07] backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/[0.13]";
const BLUE_PILL =
  "bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#60a5fa] text-white shadow-[0_8px_30px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(59,130,246,0.5)]";

// Variant H — a round "say hi" badge with rotating text, flanked by icon circles.
// Round "Book a call" badge — sits on the footer's top edge, half outside it.
function FooterCallBadge({ href }: { href: string }) {
  return (
    <div className="pointer-events-none sticky top-36 z-30 h-0">
      <div className="mx-auto flex max-w-[72rem] justify-center px-4 sm:justify-end sm:px-6">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="Book a call"
          className="group pointer-events-auto relative -translate-y-1/2 flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#05060b] shadow-[0_20px_50px_-20px_rgba(37,99,235,0.6)] ring-1 ring-white/10 transition-transform duration-300 hover:scale-105 sm:h-32 sm:w-32"
        >
          <svg viewBox="0 0 200 200" className="footer-spin absolute inset-0 h-full w-full text-white" aria-hidden="true">
            <defs>
              <path id="ftr-circle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
            </defs>
            <text fontSize="15" fontWeight="600" fill="currentColor" fontFamily="'JetBrains Mono', monospace">
              <textPath href="#ftr-circle" textLength="506" lengthAdjust="spacing">BOOK A CALL • SAY HELLO • LET'S TALK • </textPath>
            </text>
          </svg>
          <span className={`flex h-[72px] w-[72px] items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20 ${BLUE_PILL}`}>
            <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  );
}

function FooterLinks({ list }: { list: FooterLink[] }) {
  const { copied, copy } = useCopyEmail();
  const rest = list.filter((l) => l.label !== "Book a call");
  return (
    <div className="mt-12 grid gap-3 sm:mt-14 sm:grid-cols-2">
      {rest.map(({ href, label, hint, Icon, mail }, i) => (
        <a
          key={label}
          href={href}
          onClick={mail ? copy : undefined}
          {...(mail ? {} : { target: "_blank", rel: "noreferrer" })}
          className={`group flex items-center justify-between gap-4 rounded-full py-2.5 pl-2.5 pr-6 text-white/90 hover:text-white ${GLASS} ${
            i === rest.length - 1 && rest.length % 2 === 1 ? "sm:col-span-2" : ""
          }`}
        >
          <span className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-gradient-to-br group-hover:from-[#2563eb] group-hover:to-[#60a5fa]">
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="text-[15px]">{label}</span>
          </span>
          <span className="text-[12px] text-white/65 group-hover:text-white/90">{mail && copied ? "Copied ✓" : hint}</span>
        </a>
      ))}
    </div>
  );
}

function SiteFooter() {
  const link: FooterLink[] = [
    { href: links.linkedin, label: "LinkedIn", hint: "Say hi, or follow my work", Icon: Linkedin },
    { href: links.cv, label: "Resume", hint: "PDF, 2 pages", Icon: FileText },
    { href: links.behance, label: "Behance", hint: "Case studies and creatives", Icon: BehanceIcon },
    { href: links.github, label: "GitHub", hint: "Code and experiments", Icon: Github },
    { href: links.email, label: "Email", hint: "Click to copy my address", Icon: Mail, mail: true },
    { href: links.cal, label: "Book a call", hint: "30 minutes, free", Icon: Calendar },
  ];
  return (
    <div className="relative mt-24 sm:mt-32">
    <FooterCallBadge href={links.cal} />
    <footer id="contact" className="footer-dark relative scroll-mt-24 overflow-hidden bg-[#05060b] text-white">
      {/* Moving blue gradient — slow, blurred blobs plus a fine grain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="footer-blob footer-blob-a" />
        <span className="footer-blob footer-blob-b" />
        <span className="footer-blob footer-blob-c" />
        <span className="footer-grain absolute inset-0" />
      </div>
      <div className="relative mx-auto max-w-[72rem] px-4 pb-10 pt-24 sm:px-6 sm:pt-24">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">Let&apos;s connect</p>
        </div>
        <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight text-white/90 sm:text-5xl">
          Let&rsquo;s turn <span className="italic text-white/70">&ldquo;huh?&rdquo;</span> into{" "}
          <span className="footer-grad-text">&ldquo;oh, nice.&rdquo;</span>
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-white/75">
          I&rsquo;m open to Mid, Senior design roles, and selective consulting: BI, AI-assisted UX, complex
          enterprise tools, and teams that need more than screens.
        </p>
        <FooterLinks list={link} />
        <div className="mt-24 flex flex-wrap items-end justify-between gap-4 sm:mt-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/65">
            &copy;2026 / Priti Jani &middot; All rights reserved
          </p>
          <p className="text-[12px] text-white/65">Designed, built &amp; deployed end to end, by me.</p>
        </div>
      </div>
    </footer>
    </div>
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
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
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
    <div ref={ref} aria-hidden="true" className={`cursor-dot ${on ? "is-on" : ""}`} />
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
  | { page: "projects"; projectsTab: "case" | "creative" | "motion" }
  | { page: "about" }
  | { page: "case"; caseId: string };

function pathForRoute(r: Route): string {
  if (r.page === "about") return ROUTE_BASE + "about";
  if (r.page === "projects")
    return (
      ROUTE_BASE +
      (r.projectsTab === "creative" ? "creatives" : r.projectsTab === "motion" ? "animation" : "work")
    );
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
  if (seg[0] === "animation") return { page: "projects", projectsTab: "motion" };
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
  const [route0] = useState(routeFromPath);
  // The start-up window only plays when the site opens on the home page.
  const [splash, setSplash] = useState<SplashPhase>(() => (routeFromPath().page === "home" ? "show" : "done"));
  const [page, setPage] = useState<"home" | "projects" | "about" | "case">(
    route0.page,
  );
  const [projectsTab, setProjectsTab] = useState<"case" | "creative" | "motion">(
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
  const openProjects = (tab: "case" | "creative" | "motion") => {
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
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    };
    // Don't let the browser restore the previous page's scroll offset on its own.
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(jump);
    });
    // Second pass once the new page's images and fonts have settled the layout.
    const late = window.setTimeout(jump, 250);
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      window.clearTimeout(late);
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
    let t = "Priti Jani: Product & UX Designer";
    if (page === "case" && caseId) {
      const pr = projects.find((p) => p.id === caseId);
      if (pr) t = `${pr.title}: Case Study · Priti Jani`;
    } else if (page === "projects") {
      t = "Work: Priti Jani";
    } else if (page === "about") {
      t = "About: Priti Jani";
    }
    document.title = t;
  }, [page, caseId]);
  return (
    <div className="isolate min-h-screen bg-background text-foreground antialiased">
      <StartupSplash phase={splash} onPhase={setSplash} />
      <CursorDots />
      <div>
        <Header
          page={page}
          onHome={goHome}
          onWork={() => openProjects("case")}
          onAbout={goAbout}
        />
        {page === "home" ? (
          <>
            <SideNav />
            <main>
              <Hero ready={splash !== "show"} />
              <FocusAreas />
              <div className="mx-auto max-w-[72rem] px-6">
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
        <SiteFooter />
      </div>
      <FloatingAsk />
    </div>
  );
}
