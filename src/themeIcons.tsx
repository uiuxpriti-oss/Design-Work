import type { ReactElement } from "react";
import type { ThemeId } from "./footerScenes";

// Small glossy "3D" tiles, one landmark per theme. Drawn with gradients, bevels and soft shadows.
const Gloss = ({ id, a, b }: { id: string; a: string; b: string }) => (
  <>
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={a} />
        <stop offset="1" stopColor={b} />
      </linearGradient>
      <linearGradient id={`${id}-gl`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="1.6" stdDeviation="1.1" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx="13" fill={`url(#${id}-bg)`} />
    <rect x="2" y="2" width="44" height="44" rx="13" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1" />
    <path d="M2 15C2 8 8 2 15 2h18c7 0 13 6 13 13v5C32 25 16 25 2 20z" fill={`url(#${id}-gl)`} />
  </>
);

const India = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className="h-full w-full">
    <Gloss id="in" a="#ffb26b" b="#e8590c" />
    <defs>
      <linearGradient id="in-w" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" />
        <stop offset="0.6" stopColor="#f3e6d6" />
        <stop offset="1" stopColor="#d9bfa3" />
      </linearGradient>
    </defs>
    <g filter="url(#in-sh)">
      <rect x="9" y="19" width="3.2" height="19" rx="1.2" fill="url(#in-w)" />
      <rect x="35.8" y="19" width="3.2" height="19" rx="1.2" fill="url(#in-w)" />
      <path d="M9 19.5l1.6-3 1.6 3z M35.8 19.5l1.6-3 1.6 3z" fill="#f3e6d6" />
      <rect x="14" y="27" width="20" height="11" rx="1.5" fill="url(#in-w)" />
      <path d="M17 27c0-9 3-12 7-12s7 3 7 12z" fill="url(#in-w)" />
      <path d="M24 10.5v5" stroke="#f3e6d6" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M21.5 38v-5.5a2.5 2.5 0 015 0V38z" fill="#b88a64" />
      <rect x="7" y="37.5" width="34" height="2.6" rx="1.2" fill="#fff4e6" />
    </g>
  </svg>
);

const Japan = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className="h-full w-full">
    <Gloss id="jp" a="#ffb3c7" b="#e0457b" />
    <defs>
      <linearGradient id="jp-f" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6f8ff0" />
        <stop offset="1" stopColor="#2b3f9e" />
      </linearGradient>
    </defs>
    <circle cx="33" cy="14" r="5" fill="#fff" fillOpacity="0.9" />
    <g filter="url(#jp-sh)">
      <path d="M3 38L20 14h8l17 24z" fill="url(#jp-f)" />
      <path d="M20 14h8l3 4.2-3-1.2-2 2-2-2-2 2-2-2-3 1.2z" fill="#fff" />
      <path d="M28 14l17 24H33z" fill="#1d2b75" fillOpacity="0.35" />
    </g>
    <circle cx="9" cy="35" r="3" fill="#fff" fillOpacity="0.9" />
    <circle cx="14" cy="38" r="2.2" fill="#ffd3e0" />
  </svg>
);

const Paris = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className="h-full w-full">
    <Gloss id="fr" a="#9ab6ff" b="#4a3fc9" />
    <defs>
      <linearGradient id="fr-t" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" />
        <stop offset="1" stopColor="#c9c4f2" />
      </linearGradient>
    </defs>
    <g filter="url(#fr-sh)">
      <path d="M24 6v6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 11c-1.6 0-2.2 6-3 13-.4 3-1.8 5.6-4.4 8.5L12 40h7l2.5-7h5L29 40h7l-4.6-7.5c-2.6-2.9-4-5.5-4.4-8.5-.8-7-1.4-13-3-13z" fill="url(#fr-t)" />
      <path d="M20.2 21h7.6v2h-7.6zM17.6 30h12.8v2H17.6z" fill="#8d86d6" />
      <path d="M21.5 33l2.5-5 2.5 5z" fill="#6a63c2" fillOpacity="0.8" />
    </g>
    <rect x="8" y="39.5" width="32" height="2.4" rx="1.2" fill="#fff" fillOpacity="0.85" />
  </svg>
);

const SanFrancisco = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className="h-full w-full">
    <Gloss id="sf" a="#ffc27a" b="#e8602a" />
    <defs>
      <linearGradient id="sf-r" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ff6a4a" />
        <stop offset="1" stopColor="#b3231a" />
      </linearGradient>
    </defs>
    <path d="M2 36h44v7a3 3 0 01-3 3H5a3 3 0 01-3-3z" fill="#2a5db0" fillOpacity="0.85" />
    <path d="M2 32c8 3 14 3 22 3s14 0 22-3" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" fill="none" />
    <g filter="url(#sf-sh)">
      <rect x="12" y="10" width="4.4" height="26" rx="1" fill="url(#sf-r)" />
      <rect x="31.6" y="10" width="4.4" height="26" rx="1" fill="url(#sf-r)" />
      <rect x="12" y="17" width="4.4" height="1.8" fill="#8f1b14" />
      <rect x="31.6" y="17" width="4.4" height="1.8" fill="#8f1b14" />
      <path d="M3 29Q9 29 14 11Q24 31 34 11Q39 29 45 29" stroke="#ff8a63" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <rect x="3" y="30" width="42" height="2.4" rx="1.2" fill="#ffd8bd" />
    </g>
  </svg>
);

const Netherlands = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className="h-full w-full">
    <Gloss id="nl" a="#7ec8ff" b="#2468d8" />
    <defs>
      <linearGradient id="nl-b" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#c7d6ee" />
      </linearGradient>
    </defs>
    <path d="M2 38h44v5a3 3 0 01-3 3H5a3 3 0 01-3-3z" fill="#2fae6a" />
    <g filter="url(#nl-sh)">
      <path d="M18 38l2.6-17h6.8l2.6 17z" fill="url(#nl-b)" />
      <path d="M19.4 21c0-3 2-5 4.6-5s4.6 2 4.6 5z" fill="#d6483a" />
      <path d="M24 17.6L11 9M24 17.6L37 27M24 17.6L35 8M24 17.6L13 27" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="17.6" r="2.1" fill="#6b4a33" />
      <rect x="22.4" y="30" width="3.2" height="8" rx="1.4" fill="#a8744a" />
    </g>
    <path d="M8 38v-4M8 34c-2 0-2.6-2-2.6-3.4C7 31 8 31.6 8 34zM8 34c2 0 2.6-2 2.6-3.4C9 31 8 31.6 8 34z" fill="#ff4f7a" stroke="#ff4f7a" strokeWidth="1" />
    <path d="M40 38v-4M40 34c-2 0-2.6-2-2.6-3.4C39 31 40 31.6 40 34zM40 34c2 0 2.6-2 2.6-3.4C41 31 40 31.6 40 34z" fill="#ffd23f" stroke="#ffd23f" strokeWidth="1" />
  </svg>
);

export const THEME_ICONS: Record<ThemeId, () => ReactElement> = {
  india: India,
  japan: Japan,
  paris: Paris,
  sf: SanFrancisco,
  nl: Netherlands,
};
