# Priti Jani — Portfolio

A faithful rebuild of the [port-perfect-clone](https://port-perfect-clone.lovable.app)
portfolio as a clean **Vite + React + TypeScript + Tailwind CSS** app.

## Stack

- **Vite** — build tooling & dev server
- **React 18** + **TypeScript**
- **Tailwind CSS** with shadcn-style CSS variable theme tokens (`--background`,
  `--foreground`, `--card`, `--primary`, `--muted-foreground`, `--border`)
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Project structure

```
index.html
src/
  main.tsx          # React entry
  App.tsx           # full page (Header, SideNav, Hero, Work, About, Writing, Footer)
  index.css         # Tailwind layers + theme tokens
  data/content.ts   # projects, expertise, writing entries, links
tailwind.config.js
```

## Project images

Project cards render a gradient placeholder by default. To use the real
screenshots, drop image files into `public/projects/` and set the `image`
field for each entry in `src/data/content.ts`, e.g.:

```ts
{
  id: "project-avoda",
  title: "Avoda",
  image: "/projects/avoda.jpg",
  // ...
}
```

All editorial content, links, and copy live in `src/data/content.ts` and
`src/App.tsx` for easy editing.
