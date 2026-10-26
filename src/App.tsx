import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import {
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
  Layers,
  Wand2,
  Zap,
  Send,
  Copy,
  Check,
  ExternalLink,
  X,
  Target,
  Route,
  FileText,
  Workflow,
  FlaskConical,
  Sun,
  Moon,
  Award,
  Image as ImageIcon,
  Linkedin,
  Play,
  Lock,
  Brain,
  Code2,
  BookOpen,
  Github,
  Mail,
  type LucideIcon,
  Shapes,
  BarChart3,
  SquareTerminal,
  ClipboardList,
} from "lucide-react";

// lucide has no Behance glyph — small inline mark.
function BehanceIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8.2 6.8c.8 0 1.5.07 2.13.22.63.14 1.16.37 1.6.68.44.31.78.72 1.02 1.24.24.51.36 1.15.36 1.9 0 .82-.19 1.5-.56 2.05-.37.54-.93.99-1.66 1.33.99.28 1.73.78 2.22 1.48.49.71.73 1.56.73 2.55 0 .8-.16 1.5-.47 2.08-.31.59-.73 1.07-1.26 1.44-.53.37-1.14.64-1.83.82-.68.17-1.39.26-2.11.26H1V6.8h7.2zM7.8 12.02c.66 0 1.2-.16 1.63-.47.42-.31.63-.82.63-1.53 0-.39-.07-.72-.21-.97-.14-.25-.33-.44-.57-.58-.24-.14-.51-.23-.82-.28-.31-.05-.63-.08-.96-.08H4.2v3.9h3.6zm.2 6.48c.37 0 .71-.04 1.04-.11.33-.07.62-.19.87-.36.25-.16.45-.39.6-.68.15-.29.22-.66.22-1.1 0-.87-.25-1.49-.74-1.86-.49-.37-1.15-.56-1.96-.56H4.2v4.67h3.8zM17.1 18.36c.44.43 1.08.65 1.9.65.6 0 1.11-.15 1.54-.45.43-.3.69-.62.79-.95h2.35c-.38 1.17-.95 2-1.72 2.51-.77.5-1.71.76-2.8.76-.76 0-1.45-.12-2.06-.37-.61-.24-1.13-.59-1.55-1.04-.42-.45-.75-.99-.97-1.61-.22-.62-.34-1.31-.34-2.05 0-.72.11-1.39.34-2.01.23-.63.55-1.17.97-1.63.42-.46.93-.82 1.51-1.08.59-.26 1.24-.39 1.95-.39.79 0 1.49.15 2.09.46.6.31 1.09.72 1.47 1.24.38.52.65 1.11.81 1.78.16.67.22 1.37.17 2.1h-6.87c0 .75.24 1.35.68 1.78zM20.8 13.6c-.35-.38-.92-.59-1.63-.59-.46 0-.85.08-1.15.24-.31.16-.55.35-.73.58-.18.23-.31.47-.38.72-.07.25-.11.47-.12.66h4.24c-.06-.68-.28-1.23-.63-1.61zM15.1 8.2h5.3v1.29h-5.3V8.2z" />
    </svg>
  );
}
import {
  projects,
  caseStudies,
  toolstack,
  creatives,
  motionWork,
  experience,
  awards,
  quotes,
  links,
  learning,
} from "./data/content";
import type { StudyBlock } from "./data/content";

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
                      ? "bg-foreground/[0.06] text-foreground active:bg-foreground/[0.08]"
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
          {scrolled && (
            <div className="hidden sm:block">
              <ContactButton
                align="right"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground outline-none transition-all duration-300 ease-out hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25 sm:px-3.5"
              >
                <Send className="h-4 w-4" aria-hidden="true" />{" "}
                <span className="hidden sm:inline">Contact</span>
              </ContactButton>
            </div>
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

const GREETINGS = ["Hola", "Bonjour", "नमस्ते", "Ciao", "Konnichiwa", "Hello"];
const HERO_PHRASES = [
  "opening Figma.",
  "sketching a solution.",
  "assuming what users need.",
  "designing a single screen.",
];

type SplashPhase = "show" | "leaving" | "done";

// Start-up window: cycles hello in six languages, then slides away.
function StartupSplash({ phase, onPhase }: { phase: SplashPhase; onPhase: (p: SplashPhase) => void }) {
  const [g, setG] = useState(0);
  useEffect(() => {
    if (phase !== "show") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t1 = 0;
    let t2 = 0;
    const iv = window.setInterval(() => {
      setG((cur) => {
        if (cur + 1 >= GREETINGS.length) {
          window.clearInterval(iv);
          t1 = window.setTimeout(() => {
            onPhase("leaving");
            t2 = window.setTimeout(() => onPhase("done"), 700);
          }, 500);
          return cur;
        }
        return cur + 1;
      });
    }, reduce ? 160 : 380);
    return () => {
      window.clearInterval(iv);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase, onPhase]);
  if (phase === "done") return null;
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
        transition: "opacity .7s ease, transform .7s cubic-bezier(.7,0,.2,1)",
        opacity: phase === "leaving" ? 0 : 1,
        transform: phase === "leaving" ? "translateY(-4%)" : "none",
        pointerEvents: phase === "leaving" ? "none" : "auto",
        fontFamily: "'Manrope', system-ui, sans-serif",
      }}
      aria-hidden="true"
    >
      <span
        key={g}
        style={{
          display: "inline-block",
          fontSize: "clamp(40px,4.6vw,56px)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          color: "var(--hr-strong)",
          animation: "heroIn .3s ease-out",
        }}
      >
        {GREETINGS[g]}
      </span>
    </div>
  );
}

function Hero({ ready }: { ready: boolean }) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const rot = useRef<number | undefined>(undefined);
  const restart = () => {
    window.clearInterval(rot.current);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      rot.current = window.setInterval(() => setI((n) => (n + 1) % HERO_PHRASES.length), 2800);
  };
  useEffect(() => {
    restart();
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }) + " local",
      );
    tick();
    const clock = window.setInterval(tick, 30000);
    return () => {
      window.clearInterval(rot.current);
      window.clearInterval(clock);
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
  const chip = "rounded px-1 py-px text-[13px] text-[var(--hr-chip-text)] bg-[var(--hr-chip)]";
  const status = (
    <div
      className="flex items-center gap-2.5 rounded-full border px-5 py-3"
      style={{
        background: "var(--hr-bg)",
        borderColor: "var(--hr-border)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(11px,0.95vw,12px)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--hr-mute)",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--hr-green)", animation: "heroPulse 2s infinite" }} />
      <span style={{ color: "var(--hr-green)", fontWeight: 500 }}>Open to work</span>
      <span>&middot; Full time &amp; contract &middot; {time}</span>
    </div>
  );
  return (
    <section
      id="home"
      className="hero-root relative flex flex-col overflow-hidden"
      style={{
        background: "var(--hr-bg)",
        color: "var(--hr-text)",
        fontFamily: "'Manrope', system-ui, sans-serif",
        padding: "clamp(112px,16vh,150px) 0 clamp(72px,10vh,110px)",
      }}
    >
      <div className="relative mx-auto flex w-full max-w-[72rem] flex-wrap items-end justify-between gap-12 px-4 sm:px-6">
        <div className="flex max-w-[880px] flex-col gap-8">
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
        className="relative mx-auto w-full max-w-[72rem] px-4 text-base sm:px-6 md:text-[15px]"
        style={{ margin: "clamp(56px,10vh,96px) auto 20px", color: "var(--hr-mute)" }}
      >
        Feel free to connect - I&rsquo;m always up for a good conversation.
      </p>
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: "var(--hr-border)" }} />
        <div className="relative mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href={links.linkedin} target="_blank" rel="noreferrer" className={btn}>
              LinkedIn <span className={chip}>↗</span>
            </a>
            <button type="button" onClick={copyEmail} className={`${btn} cursor-pointer`} style={{ font: "inherit" }}>
              {copied ? "Copied to clipboard" : "Copy email"} <span className={chip}>{copied ? "✓" : "⧉"}</span>
            </button>
            <a href={links.cv} target="_blank" rel="noreferrer" className={btn}>
              Resume <span className={chip}>↗</span>
            </a>
          </div>
          {status}
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

function ProjectCard({
  project,
  onOpen,
}: {
  project: (typeof projects)[number];
  onOpen: (id: string) => void;
}) {
  const [imgOk, setImgOk] = useState(true);
  const locked = !!PROTECTED_CASES[project.id] && !isUnlocked(project.id);
  return (
    <article id={project.id} className="scroll-mt-24">
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        aria-label={`Open ${project.title} case study`}
        className="group grid w-full gap-2.5 rounded-[32px] bg-foreground/[0.05] p-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-4 focus-visible:ring-offset-background md:grid-cols-2 dark:bg-white/[0.05]"
      >
        {/* Left panel — title, headline, description and tag */}
        <div className="flex flex-col justify-between gap-8 rounded-[24px] bg-white p-7 sm:p-9 dark:bg-card">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-muted-foreground">
              {project.title}
            </p>
            <h3 className="mt-3 text-[22px] font-semibold leading-[1.28] tracking-tight text-neutral-900 sm:text-[26px] dark:text-foreground">
              {project.headline ?? project.description}
            </h3>
            {project.headline && (
              <p className="mt-5 text-[15px] leading-relaxed text-neutral-500 dark:text-muted-foreground">
                {project.description}
              </p>
            )}
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-900 transition-colors duration-200 group-hover:bg-blue-100 dark:border-blue-300/25 dark:bg-blue-300/10 dark:text-blue-200 dark:group-hover:bg-blue-300/20">
            {locked && <LockFillIcon className="h-3.5 w-3.5" />}
            {locked ? "Unlock case study" : (project.tag ?? "Case study")}
          </span>
        </div>
        {/* Right panel — image fills the whole card, zooms on hover */}
        <div className="group/img relative overflow-hidden rounded-[24px] bg-white dark:bg-card">
          <div className="aspect-[16/11] w-full md:aspect-auto md:h-full">
            {project.image && imgOk ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                onError={() => setImgOk(false)}
                className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-105 ${
                  locked ? "scale-110 blur-xl" : ""
                }`}
              />
            ) : (
              <div
                className={`h-full w-full bg-gradient-to-br ${project.gradient} transition-transform duration-500 ease-out group-hover/img:scale-105 ${
                  locked ? "blur-xl" : ""
                }`}
                aria-label={project.title}
              />
            )}
          </div>
          {locked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 text-white">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-blue-900 shadow-xl ring-1 ring-black/5 transition-transform duration-300 group-hover/img:scale-105">
                <LockFillIcon className="h-7 w-7" />
              </span>
              <span className="rounded-full bg-black/40 px-3.5 py-1.5 text-[12px] font-medium tracking-wide backdrop-blur-sm">
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
      <div className="grid gap-6">
        {HOME_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} />
        ))}
      </div>
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

// Click-to-load YouTube player: shows the thumbnail first (fast, no tracking until played).
function YouTubeEmbed({ id, title, poster }: { id: string; title: string; poster?: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState<"maxresdefault" | "hqdefault">("maxresdefault");
  const [thumbFailed, setThumbFailed] = useState(false);
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="h-full w-full border-0"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
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

function MotionGrid() {
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
  const videos = motionWork.filter((m) => !m.image);
  const micro = motionWork.filter((m) => m.image);
  // One wide + one portrait video sit side by side with players of equal height.
  const paired = videos.length === 2 && videos.filter((v) => v.vertical).length === 1;

  const videoCard = (m: (typeof motionWork)[number]) => (
    <figure key={m.title} className="flex flex-col overflow-hidden rounded-3xl bg-foreground/[0.05] p-2.5">
      <div
        className={`overflow-hidden rounded-[20px] bg-black ${
          m.vertical
            ? "mx-auto aspect-[9/16] w-full max-w-[19rem] lg:max-w-none"
            : paired
              ? "aspect-video w-full lg:aspect-auto lg:h-[28rem]"
              : "aspect-video w-full"
        }`}
      >
        {m.youtube ? (
          <YouTubeEmbed id={m.youtube} title={m.title} poster={m.poster} />
        ) : m.src ? (
          <video
            src={assetUrl(m.src)}
            poster={m.poster ? assetUrl(m.poster) : undefined}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
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
            paired ? "lg:grid-cols-[minmax(0,1fr)_17rem]" : "sm:grid-cols-2"
          }`}
        >
          {paired ? [...videos].sort((x, y) => Number(!!x.vertical) - Number(!!y.vertical)).map(videoCard) : videos.map(videoCard)}
        </section>
      )}
      {micro.length > 0 && (
        <section className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {micro.map((m) => (
            <div key={m.title} className="aspect-square w-full overflow-hidden rounded-3xl border border-slate-100 bg-white">
              <img
                src={assetUrl(m.image!)}
                alt={`${m.title} — ${m.category}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </section>
      )}
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
      {tab === "case" && <SideNav items={projects} watchId="case-studies" />}
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
          <section id="case-studies" className="grid gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={onOpen} />
            ))}
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
      {eyebrow && (
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
        className={`group block w-full overflow-hidden rounded-2xl bg-card ring-1 ring-border outline-none transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-foreground/30 ${className}`}
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
        className="group relative overflow-hidden rounded-2xl bg-card ring-1 ring-border"
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
function StudySectionBlock({
  block,
  onZoom,
}: {
  block: StudyBlock;
  onZoom: (src: string) => void;
}) {
  // Editorial two-column row: small label left, content right (neat & clean).
  if (block.side) {
    return (
      <section
        id={`cs-${block.id}`}
        className={`scroll-mt-24 ${block.title ? "mt-16 border-t border-border pt-10" : "mt-12"}`}
      >
        <div className="grid gap-3 sm:grid-cols-[180px_1fr] sm:gap-12">
          <p className="text-[14px] font-semibold text-foreground">{block.title}</p>
          <div>
            {block.eyebrow && (
              <p className="mb-3 text-[15px] font-medium text-blue-900/50 dark:text-blue-300/70">
                {block.eyebrow}
              </p>
            )}
            {block.lead && (
              <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
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
            {block.stats && (
              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-5">
                {block.stats.map((st) => (
                  <div key={st.label}>
                    <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                      {st.value}
                    </p>
                    <p className="mt-1.5 max-w-[18ch] text-[13px] leading-snug text-muted-foreground">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {block.note && <StudyNote text={block.note} />}
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
              <div className="max-h-[75vh] overflow-y-auto overscroll-contain">
                <img
                  src={assetUrl(block.image)}
                  alt={block.title || block.eyebrow || ""}
                  loading="lazy"
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
      {block.bullets && <div className="mt-5">{<StudyBullets items={block.bullets} />}</div>}
      {block.video && (
        <div className="mt-6 overflow-hidden rounded-2xl bg-background/40 ring-1 ring-border">
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
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-[15px] font-semibold text-foreground">{c.heading}</p>
              <ul className="mt-3 space-y-2">
                {c.items.map((it, j) => (
                  <li
                    key={j}
                    className="flex gap-2.5 text-[14px] leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {block.cards && (
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
      {block.stats && (
        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-6 border-t border-border pt-8">
          {block.stats.map((st) => (
            <div key={st.label}>
              <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {st.value}
              </p>
              <p className="mt-2 max-w-[18ch] text-[14px] leading-snug text-muted-foreground">
                {st.label}
              </p>
            </div>
          ))}
        </div>
      )}
      {block.note && <StudyNote text={block.note} />}
      {block.image && (
        <div className="mt-6">
          <StudyMedia value={block.image} alt={block.title} onZoom={onZoom} />
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
        <div className="mt-8 space-y-10">
          {block.gallery.map((g, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-foreground">{g.heading}</h3>
              {g.text && (
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-foreground/85">
                  {g.text}
                </p>
              )}
              {g.bullets && <div className="mt-4">{<StudyBullets items={g.bullets} />}</div>}
              {g.subgroups?.map((sg, j) => (
                <div key={j} className="mt-4">
                  <p className="text-[14px] font-semibold text-foreground">{sg.heading}</p>
                  <div className="mt-2">
                    <StudyBullets items={sg.items} />
                  </div>
                </div>
              ))}
              {g.note && <StudyNote text={g.note} />}
              <div className="mt-5">
                <StudyMedia value={g.image} alt={g.heading} onZoom={onZoom} />
              </div>
            </div>
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
const PROTECTED_CASES: Record<string, string> = {
  "project-studycrux": CASE_PASSWORD_HASH,
  "project-tabnet-security": CASE_PASSWORD_HASH,
  "project-baladi-express": CASE_PASSWORD_HASH,
  "project-leadsdemos": CASE_PASSWORD_HASH,
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
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Protected work
            </p>
            <h1 className="mt-5 text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl">
              This case study is{" "}
              <span className="font-semibold italic">password protected.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.8] text-foreground/70">
              These write-ups contain client work I keep out of open search. If you have the
              password, enter it below. If you don&apos;t, email me at{" "}
              <a
                href={`${links.email}?subject=${encodeURIComponent(`Password for ${title}`)}`}
                className="text-foreground underline underline-offset-4 decoration-foreground/30 transition-colors hover:decoration-foreground"
              >
                {links.emailAddress}
              </a>{" "}
              and I&apos;ll send it over.
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
      <CaseStudyRail />
      <FloatingBack onBack={onBack} />
      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All work
      </button>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
            {cs.eyebrow}
          </p>
          {cs.inProgress && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/20 bg-blue-900/[0.06] px-2.5 py-1 text-[11px] font-medium text-blue-900 dark:border-blue-300/30 dark:bg-blue-300/10 dark:text-blue-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2E6B54]" />
              In progress
            </span>
          )}
        </div>
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

      <section id="cs-intro" className="mt-12 grid scroll-mt-24 gap-10 border-t border-border pt-10 md:grid-cols-[1fr_240px]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
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
                    alt={`${s.tag} — ${s.caption}`}
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
                  className="group block w-full overflow-hidden rounded-2xl bg-background/40 ring-1 ring-border outline-none transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-foreground/30"
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
        <StudySectionBlock key={block.id} block={block} onZoom={setZoom} />
      ))}

      {cs.board && !cs.sections && (
        <CaseSection id="cs-board" eyebrow="Case study" title="The full design">
          <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
            Every section from the original case study — research, personas, flows,
            the design system, and final screens. Tap any section to view it full size.
          </p>
          <div className="mt-8 space-y-5">
            {cs.board.map((frame) => (
              <button
                key={frame.src}
                type="button"
                onClick={() => setZoom(assetUrl(frame.src))}
                aria-label={`View ${frame.label} full size`}
                className="group block w-full overflow-hidden rounded-2xl bg-card ring-1 ring-border outline-none transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-foreground/30"
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
  const [openIdx, setOpenIdx] = useState(-1);
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
                  {job.roles && job.roles.length > 1 && (
                    <ol className="space-y-0 rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 dark:border-blue-400/25 dark:bg-blue-400/10">
                      {job.roles.map((r, ri) => (
                        <li key={r.title} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <span
                              className={`mt-1.5 h-2.5 w-2.5 rounded-full ${ri === 0 ? "bg-blue-500" : "bg-foreground/30"}`}
                              aria-hidden="true"
                            />
                            {ri < job.roles!.length - 1 && (
                              <span className="w-px flex-1 bg-foreground/15" aria-hidden="true" />
                            )}
                          </div>
                          <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3 pb-3 last:pb-0">
                            <p className="text-[15px] font-medium text-foreground">
                              {r.title}
                              {ri === 0 && (
                                <span className="ml-2 inline-block rounded-md border border-blue-300 bg-blue-100 px-2 py-0.5 align-middle text-[11px] font-medium text-blue-900 dark:border-blue-400/30 dark:bg-blue-400/20 dark:text-blue-200">
                                  Promoted
                                </span>
                              )}
                            </p>
                            <span className="font-mono text-[12px] text-muted-foreground">{r.period}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
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
    <section id="experience" className="mt-12 scroll-mt-24 border-t border-border pt-8 sm:mt-16">
      <h2 className="text-2xl font-semibold italic tracking-tight sm:text-3xl">
        So Far, So Good
      </h2>
      <span className="mt-3 block h-px w-40 bg-border" aria-hidden="true" />
      <p className="mt-4 text-[15px] text-muted-foreground">
        4+ years experience in design <span className="text-foreground/30">|</span> 3+
        years working with startups
      </p>
      <div className="mt-10">
        <ExperienceList />
      </div>
    </section>
  );
}

// Tools without a bundled logo get a brand-coloured initials tile (swap in a real mark in brands.tsx).
// Tools without a bundled logo get a brand-coloured initials tile (swap in a real mark in brands.tsx).
const TOOL_TILES: Record<string, { bg: string; fg: string; text: string }> = {
  ProtoPie: { bg: "#6D3CF5", fg: "#fff", text: "Pp" },
  Jira: { bg: "#2684FF", fg: "#fff", text: "Ji" },
  Confluence: { bg: "#1868DB", fg: "#fff", text: "Cf" },
  Maze: { bg: "#6B4EFF", fg: "#fff", text: "Mz" },
  Hotjar: { bg: "#FD3A5C", fg: "#fff", text: "Hj" },
  Miro: { bg: "#FFD02F", fg: "#050038", text: "Mi" },
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
  const Brand = BRAND_LOGOS[name];
  if (Brand) return <Brand className="h-8 w-8 shrink-0" />;
  const t = TOOL_TILES[name] ?? { bg: "#334155", fg: "#fff", text: name.slice(0, 2) };
  return (
    <span
      aria-hidden="true"
      style={{ background: t.bg, color: t.fg }}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold leading-none"
    >
      {t.text}
    </span>
  );
}

function Toolstack() {
  return (
    <section id="toolstack" className="mt-14 scroll-mt-24 sm:mt-24">
      <SkillsHeading eyebrow="Toolstack" title="What I work with" />
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-6 bg-[radial-gradient(circle,hsl(var(--border))_1px,transparent_1.5px)] [background-size:9px_9px] xl:flex-nowrap xl:justify-between xl:gap-x-3">
        {toolstack.map((group) => (
          <div
            key={group.label}
            className="max-w-full overflow-hidden rounded-2xl border border-black/[0.07] bg-background dark:border-white/10 xl:shrink-0"
          >
            <p className="whitespace-nowrap border-b border-black/[0.06] bg-foreground/[0.03] px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground dark:border-white/10">
              {group.label}
            </p>
            <ul className="flex flex-wrap">
              {group.tools.map((tool) => (
                <li
                  key={tool}
                  className="group relative flex h-16 w-16 items-center justify-center xl:h-14 xl:w-14 border-r border-black/[0.06] transition-colors duration-200 last:border-r-0 hover:bg-foreground/[0.04] dark:border-white/10"
                >
                  <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110">
                    <ToolGlyph name={tool} />
                  </span>
                  <span className="sr-only">{tool}</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100"
                  >
                    {tool}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight sm:text-[28px]">{title}</h2>
    </div>
  );
}

const SKILL_CARDS: { label: string; fact: string; Icon: LucideIcon }[] = [
  { label: "Product Design", fact: "4+ years in enterprise SaaS, AI and data", Icon: Shapes },
  { label: "Data & Dashboard Design", fact: "Dashboards, alerts and data workflows", Icon: BarChart3 },
  { label: "Design Systems", fact: "120+ components, 40% more reuse", Icon: Layers },
  { label: "Prototyping", fact: "Figma, Framer, ProtoPie", Icon: Play },
  { label: "AI Workflows", fact: "Ask Me, a GenAI analytics assistant", Icon: Wand2 },
  { label: "Interaction & Motion", fact: "Micro-interactions that guide", Icon: Zap },
  { label: "Figma to Code", fact: "Figma MCP and Claude Code", Icon: SquareTerminal },
  { label: "UX Research", fact: "Usability tests, WCAG audits on 80+ screens", Icon: ClipboardList },
];

// **bold** marks the words that stay dark; everything else starts light and fills in on scroll.
const SKILLS_STATEMENT =
  "I design **decision-centric products** for complex data workflows, work closely with **engineering teams** and obsess over **details that ship.**";

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
      className="text-xl font-light leading-[1.5] tracking-tight sm:text-[26px]"
    >
      {words.map((x, i) => {
        const lit = progress * words.length > i;
        return (
          <span
            key={i}
            className={`transition-colors duration-300 ${
              x.bold
                ? "font-medium text-foreground"
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

function SkillCard({ label, fact, Icon, tall = false }: (typeof SKILL_CARDS)[number] & { tall?: boolean }) {
  return (
    <li
      className={`group relative overflow-hidden rounded-xl bg-background transition-shadow duration-300 hover:shadow-lg ${
        tall ? "flex flex-col gap-6 p-5" : "flex items-center gap-3.5 px-4 py-4"
      }`}
    >
      <Icon className="h-6 w-6 shrink-0 text-foreground/55 transition-colors duration-300 group-hover:text-foreground" strokeWidth={1.5} aria-hidden="true" />
      <span className="text-[14px] font-normal tracking-tight text-foreground">{label}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-end bg-foreground p-5 text-[13px] leading-snug text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        {fact}
      </span>
    </li>
  );
}

function SkillsPanel() {
  return (
    <div className="grid gap-10 rounded-3xl bg-foreground/[0.035] p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
      <SkillsStatement />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SKILL_CARDS.map((c) => (
          <SkillCard key={c.label} {...c} />
        ))}
      </ul>
    </div>
  );
}

function SkillsAndTools() {
  return (
    <section id="skills-tools" className="mt-14 scroll-mt-24 sm:mt-24">
      <SkillsHeading eyebrow="Skills" title="What I do" />
      <div className="mt-8">
        <SkillsPanel />
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
          src={current.image}
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

const LEARNING_ICONS: LucideIcon[] = [Sparkles, FlaskConical, BookOpen, Code2, Brain, Workflow, Target];

const INTRO_BTN_PRIMARY =
  "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm outline-none transition-all hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-foreground/25";
const INTRO_BTN_GHOST =
  "inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-foreground/25";

// About intro — centered, airy, soft gradient wash with a glass stats bar.
function AboutIntro() {
  return (
    <section className="pt-8 sm:pt-12">
      <div className="relative rounded-[2rem] px-6 py-14 text-center sm:py-20">
        {/* Decorative wash — clipped on its own so popovers inside can overflow the card */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[2rem]">
          <span className="absolute inset-0 bg-gradient-to-b from-violet-100 via-fuchsia-50/60 to-transparent dark:from-violet-500/20 dark:via-indigo-500/10 dark:to-transparent" />
          <span className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-sky-200/60 blur-3xl dark:bg-sky-500/15" />
          <span className="absolute -right-10 top-24 h-64 w-64 rounded-full bg-pink-200/50 blur-3xl dark:bg-fuchsia-500/10" />
        </div>
        <div className="relative z-10">
        <img
          src={assetUrl("logo.png")}
          alt="Priti Jani"
          className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-white/80 shadow-xl dark:ring-white/10"
        />
        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Senior Product Designer · Netlink
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-light leading-[1.1] tracking-tight sm:text-6xl">
          I turn complex data into decisions people can{" "}
          <span className="font-semibold italic">trust.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.8] text-foreground/70">
          Four years across enterprise SaaS, AI and data. Today I shape Lumenore — from Ask Me, a
          GenAI analytics assistant, to dashboards and data workflows.
        </p>
        <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 divide-x divide-foreground/10 rounded-2xl border border-white/60 bg-white/60 py-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.05]">
          {[
            ["↓50%", "task time"],
            ["↓32%", "drop-off"],
            ["5,000+", "users"],
          ].map(([v, l]) => (
            <div key={v} className="px-3">
              <dt className="text-2xl font-medium tracking-tight sm:text-3xl">{v}</dt>
              <dd className="mt-1 text-[12px] text-muted-foreground">{l}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={links.cv} target="_blank" rel="noreferrer" className={INTRO_BTN_PRIMARY}>
            <FileText className="h-4 w-4" aria-hidden="true" /> Resume
          </a>
          <ContactButton align="left" className={INTRO_BTN_GHOST}>
            <Send className="h-4 w-4" aria-hidden="true" /> Say hello
          </ContactButton>
        </div>
        </div>
      </div>
    </section>
  );
}

function AboutNow() {
  return (
    <section className="mt-12 grid gap-8 border-t border-border pt-8 sm:mt-16 md:grid-cols-[10rem_1fr]">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Now
      </p>
      <div className="space-y-6">
        <p className="text-[15px] text-foreground/85">
          Senior Product Designer at <span className="font-medium text-foreground">Netlink Software Group</span>
          <span className="ml-2 inline-block rounded-md border border-blue-300 bg-blue-100 px-2 py-0.5 align-middle text-[11px] font-medium text-blue-900 dark:border-blue-400/30 dark:bg-blue-400/20 dark:text-blue-200">
            Promoted 2026
          </span>
        </p>
        <div>
          <p className="text-[13px] text-muted-foreground">Learning</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {learning.map((l, i) => {
              const Icon = LEARNING_ICONS[i % LEARNING_ICONS.length];
              return (
                <li
                  key={l}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[13.5px] text-foreground/85"
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  {l.replace(/\s+—.*$/, "").replace(/\.$/, "")}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AboutPhilosophy() {
  return (
    <section className="mt-12 grid gap-8 border-t border-border pt-8 sm:mt-16 md:grid-cols-[10rem_1fr]">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Philosophy
      </p>
      <div>
        <p className="max-w-2xl text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          Design is the bridge between complex technology and human emotion —{" "}
          <span className="italic text-muted-foreground">beyond pixels.</span>
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {["Research", "Rapid iteration with AI", "Micro-interactions"].map((t) => (
            <li key={t} className="rounded-full bg-foreground/[0.06] px-3.5 py-1.5 text-[13.5px] text-foreground/85">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <main className="mx-auto max-w-[72rem] px-6 pb-14 sm:pb-32">
        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:hidden"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
        </button>
        <AboutIntro />
        <AboutNow />
        <AboutPhilosophy />
        <Experience />
        <div className="mt-16">
          <ContactBadge />
        </div>
      </main>
    </>
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

function FooterCTA() {
  const socials = [
    { href: links.cv, label: "Resume", Icon: FileText },
    { href: links.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: links.behance, label: "Behance", Icon: BehanceIcon },
    { href: links.github, label: "GitHub", Icon: Github },
  ];
  return (
    <section id="contact" className="mt-16 scroll-mt-24 border-t border-border sm:mt-24">
      <div className="mx-auto max-w-[72rem] px-6 py-16 sm:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Contact
        </p>
        <div className="mt-6 grid gap-10 md:grid-cols-[1fr_16rem] md:items-start">
          <div>
            <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-5xl">
              If it&apos;s missing,{" "}
              <span className="italic text-brand-grad">
                I&apos;ll build it.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              I&apos;m open to Senior, Lead, and Staff product design roles, and
              selective consulting — BI, AI-assisted UX, complex enterprise tools,
              and teams that need more than screens.
            </p>
            <a
              href={links.email}
              className="group mt-8 inline-flex items-center gap-2.5 text-lg font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
            >
              <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              {links.emailAddress}
              <ArrowUpRight
                className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
          <div className="md:pt-1">
            {socials.map(({ href, label, Icon }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-center justify-between gap-4 border-b border-border py-4 text-[15px] font-medium text-foreground outline-none transition-colors hover:text-foreground/70 focus-visible:text-foreground/70 ${
                  i === 0 ? "border-t" : ""
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-[18px] w-[18px] text-muted-foreground" aria-hidden="true" />
                  {label}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
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
      <div className="mx-auto flex max-w-[72rem] flex-col items-center gap-4 px-6 pt-10 pb-28 text-center text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:pb-10 sm:text-left">
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
          <p className="text-[13px]">Designed, built &amp; deployed end to end — by me. 🛠️</p>
        </div>
        <div className="flex items-center gap-2.5">
          {[
            { href: links.linkedin, label: "LinkedIn", ext: true, Icon: Linkedin },
            { href: links.behance, label: "Behance", ext: true, Icon: BehanceIcon },
            { href: links.github, label: "GitHub", ext: true, Icon: Github },
            { href: links.email, label: "Email", ext: false, Icon: Mail },
            { href: links.cv, label: "Resume", ext: true, Icon: FileText },
          ].map(({ href, label, ext, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground outline-none transition-colors hover:border-foreground/30 hover:bg-card hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/25"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
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
                <Toolstack />
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
      <FloatingAsk />
    </div>
  );
}
