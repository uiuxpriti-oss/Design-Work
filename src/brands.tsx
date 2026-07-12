// Hand-authored brand logos for the technologies in the Skills & Tools section.
// Each renders as a self-contained, correctly-colored SVG so the real marks show
// even offline. Sized by the `className` passed in (default h-4 w-4).

type P = { className?: string };
const box = "h-4 w-4";

export function FigmaLogo({ className = box }: P) {
  return (
    <svg viewBox="0 0 38 57" className={className} aria-hidden="true">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}

export function FramerLogo({ className = box }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#0055FF" d="M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z" />
    </svg>
  );
}

export function Html5Logo({ className = box }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#E34F26"
        d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
      />
    </svg>
  );
}

export function Css3Logo({ className = box }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#1572B6"
        d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"
      />
    </svg>
  );
}

export function BootstrapLogo({ className = box }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#7952B3" />
      <path
        fill="#fff"
        d="M12.2 6.4H7.5v11.2h5c2.7 0 4.3-1.3 4.3-3.5 0-1.6-1.1-2.8-2.8-3v-.1c1.2-.2 2.2-1.3 2.2-2.6 0-1.9-1.4-2.9-3.9-2.9zm-2.5 1.8h1.9c1.1 0 1.7.5 1.7 1.4 0 1-.7 1.5-2 1.5H9.7V8.2zm0 4.5h2c1.4 0 2.1.5 2.1 1.6s-.7 1.6-2.1 1.6H9.7v-3.2z"
      />
    </svg>
  );
}

export function SassLogo({ className = box }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#CC6699" />
      <path
        fill="#fff"
        d="M15 9.1c-.6-.5-1.5-.9-2.6-.9-2 0-3.3 1-3.3 2.5 0 1.3.9 2 2.8 2.5 1.5.4 1.9.7 1.9 1.3 0 .6-.6 1-1.6 1s-2-.4-2.7-1.1l-1 1.5c.9.8 2.2 1.2 3.6 1.2 2.2 0 3.6-1.1 3.6-2.7 0-1.4-.9-2.1-3-2.7-1.4-.4-1.8-.6-1.8-1.2 0-.5.5-.9 1.4-.9.8 0 1.6.3 2.1.8z"
      />
    </svg>
  );
}

export function DrupalLogo({ className = box }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#0678BE"
        d="M15.8 6.6C14.3 5.1 12.9 3.7 12 2c-.9 1.7-2.3 3.1-3.8 4.6C6 8.9 3.7 11.4 3.7 14.9 3.7 19.4 7.4 22 12 22s8.3-2.6 8.3-7.1c0-3.5-2.3-6-4.5-8.3zM7.3 16.9c-.5 0-1.9-1.9-.1-3.9l1.4 1.5c.1.1.1.3-.1.4-.5.4-1 1-1 1.6 0 .2-.1.4-.2.4zm4.7 3.1c-1.6 0-2.9-1.1-2.9-2.7 0-1.5 1.1-2.6 2.1-3.7l.8-.8c.2.3.4.5.7.8 1 1 2.2 2 2.2 3.5 0 1.6-1.3 2.9-2.9 2.9z"
      />
    </svg>
  );
}

export function GitLogo({ className = box }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#F05032"
        d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-3.004-2.002l-2.48-2.48v6.526a1.837 1.837 0 1 1-1.51-.057V8.755a1.838 1.838 0 0 1-1-2.412L7.636 3.7.24 11.096a1.55 1.55 0 0 0 0 2.19l10.48 10.477a1.55 1.55 0 0 0 2.186 0l10.43-10.43a1.55 1.55 0 0 0 .01-2.403z"
      />
    </svg>
  );
}

export function NotionLogo({ className = box }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#fff" stroke="#e5e5e5" />
      <path
        fill="#000"
        d="M8 7.2 7 7.1v9.3l1.4-.1v-6l4.4 6.2 1.5-.1V7l-1.4.1v5.8L8.5 7.1z"
      />
    </svg>
  );
}

export function LottieLabLogo({ className = box }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ll" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00C6AE" />
          <stop offset="1" stopColor="#3B5BFF" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ll)" />
      <path fill="#fff" d="M9 7.5v9l7.5-4.5z" />
    </svg>
  );
}

export function ClaudeLogo({ className = box }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="#D97757"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4M12 4.5 10.7 12l1.3 7.5M12 4.5 13.3 12 12 19.5M4.5 12l7.5-1.3 7.5 1.3M4.5 12l7.5 1.3 7.5-1.3" />
    </svg>
  );
}
