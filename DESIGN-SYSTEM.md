# StudyCrux Admin — Design System

The working vocabulary behind Student, Teacher, Coordinator, Speaker, Roles & Access and the platform Dashboard.
Every value here is taken from shipped screens, not invented for the doc.

**Live reference:** `design-system.html`

| | |
|---|---|
| Modules | 6 |
| Status colours | 8 |
| 360° tabs (max) | 21 |
| Accent colours | 1 |

---

## 1. Principles

**Warm, not clinical**
Surfaces are warm off-whites — `#FAF9F5` and `#FCFBF7`, never pure grey. Admin tools are lived in all day; the paper tone keeps long sessions comfortable.

**One accent, earned**
Teal `#0E9384` marks the single most useful action on a screen. If two things are teal, one of them is wrong.

**Status is colour-coded, always**
Eight fixed pairs cover every state across every module. A green pill means the same thing in Payouts as it does in Roles & Access.

**Density with air**
Tables run tight — 10 to 12px cells — because admins scan hundreds of rows; the cards around them breathe at 18 to 22px so the page never feels like a spreadsheet.

---

## 2. Colour

### Core palette

| Token | Hex | Used for |
|---|---|---|
| Sidebar navy | `#0B1F3E` | Sidebar, toast, score cards — the only dark surface |
| Navy line | `#1B3358` | Dividers inside dark surfaces |
| Ink | `#0F2A47` | All primary text and numerals |
| Body | `#475467` | Secondary copy, table cells |
| Muted | `#98A2B3` | Meta, timestamps, placeholders |
| Page | `#FAF9F5` | Application background |
| Card | `#FFFFFF` | Every raised surface |
| Subtle | `#FCFBF7` | Table headers, inset panels, zebra rows |
| Border | `#ECEAE2` | Card outline — the workhorse border |
| Hairline | `#F5F3EE` | Row dividers inside a card |
| Accent | `#0E9384` | Primary buttons, active tabs, progress fill |
| Accent dark | `#0B7A6E` | Hover on accent, links, ghost-button text |

### Status palette — `BDG`

Every pill, dot and chip in the product resolves to one of these eight pairs. Background first, foreground second.

| Key | Background | Foreground | Used for |
|---|---|---|---|
| `green` | `#E7F7EE` | `#15803D` | Success, approved, verified, on-target |
| `amber` | `#FEF3E2` | `#B45309` | Warning, pending action, approaching a threshold |
| `red` | `#FDE8E8` | `#B42318` | Critical, failed, blocked, overdue |
| `grey` | `#F1F3F5` | `#667085` | Neutral, inactive, not started, not applicable |
| `blue` | `#E9F1FD` | `#1D4ED8` | Informational, scheduled, in review |
| `violet` | `#F0EAFD` | `#6D28D9` | Elevated scope, recorded content, special tier |
| `teal` | `#E6F4F1` | `#0B7A6E` | Live delivery, assigned, in progress |
| `orange` | `#FDF0E7` | `#C2410C` | Event formats, content categories |

```js
const BDG = {
  green:  ['#E7F7EE','#15803D'],
  amber:  ['#FEF3E2','#B45309'],
  red:    ['#FDE8E8','#B42318'],
  grey:   ['#F1F3F5','#667085'],
  blue:   ['#E9F1FD','#1D4ED8'],
  violet: ['#F0EAFD','#6D28D9'],
  teal:   ['#E6F4F1','#0B7A6E'],
  orange: ['#FDF0E7','#C2410C']
};
```

---

## 3. Typography

**Inter** · base 14px · modular scale 1.125
Negative tracking scales with size — tighter as type grows.

| Token | Size | rem | Weight | Tracking | Applied to |
|---|---|---|---|---|---|
| Heading / Large | 45px | 3.214 | 500 | −4% | Design-system hero; marketing-scale moments |
| Heading / Medium | 32px | 2.286 | 400 | −3% | Empty-state headlines, onboarding splash |
| Heading / Small | 25px | 1.786 | 400 | −3% | KPI numerals, score values |
| Heading / Extra-small | 22px | 1.571 | 600 | −3% | Page titles in every module header |
| Subheading | 20px | 1.429 | 400 | −2% | Section intros inside a 360° tab |
| Subheading | 18px | 1.286 | 400 | −2% | Supporting section copy |
| Subheading (Medium) | 18px | 1.286 | 500 | −2% | Modal titles |
| Subheading (Semibold) | 18px | 1.286 | 600 | −2% | Card titles, banner event name |
| Body / Large | 16px | 1.143 | 400 | −2% | Page subtitles, descriptive copy |
| Body / Large (Medium) | 16px | 1.143 | 500 | −2% | Emphasised inline values |
| **Body / Medium** | **14px** | **1.000** | 400 | −2% | **Base value** — default body, table cells, field values |
| Body / Medium (Medium) | 14px | 1.000 | 500 | −2% | Filter labels, secondary buttons |
| Body / Medium (Semibold) | 14px | 1.000 | 600 | −2% | Primary buttons, row primary text |
| Body / Small | 12px | 0.857 | 400 | −2% | Meta, timestamps, helper text |
| Body / Small (Medium) | 12px | 0.857 | 500 | −2% | Status pills, chips, badges |
| Label | 10px | 0.714 | 600 | +8% | Table headers, section eyebrows — uppercase |

---

## 4. Spacing, radii & elevation

### Spacing

Gaps between siblings always use flex/grid `gap`, never margins on children.

| Value | Used for |
|---|---|
| `40px` | Page gutter on the doc; 32px in app screens |
| `24px` | Between major page sections |
| `22px` | Card inner padding, generous |
| `16px` | Grid gap between cards |
| `13px` | Grid gap between KPI cards |
| `10px` | Gap between inline controls |
| `7px` | Gap between chips and pills |

### Corner radius

Radius scales with the size of the surface it wraps.

| Value | Used for |
|---|---|
| `999px` | Pills, chips, avatars, status badges |
| `16px` | Modal shell |
| `14px` | Primary card |
| `12px` | Nested card, KPI tile |
| `9px` | Buttons, inputs, selects |
| `6px` | Micro chips inside calendar cells |

### Elevation

Shadows are navy-tinted, never neutral grey.

| Name | CSS |
|---|---|
| Card hover | `0 8px 22px rgba(11,31,62,.06)` |
| Popover / dropdown | `0 18px 44px rgba(11,31,62,.16)` |
| Modal | `0 24px 64px rgba(11,31,62,.22)` |

---

## 5. Page shell

| Region | Spec | Note |
|---|---|---|
| Sidebar | `262px` | Fixed navy rail, own scroll, active item on `#14335C` |
| Header | `24px 32px 16px` | Title, subtitle, search, then actions right-aligned |
| Content | `flex:1 · overflow-y:auto` | Padding `4px 32px 40px` — the only scrolling region |
| KPI grid | `auto-fit · minmax(178px,1fr)` | Never a fixed column count; reflows under 1200px |
| Wide table | `min-width + overflow-x` | Wide tables scroll horizontally, the page never does |

---

## 6. Breakpoints & responsive rules

The product is desktop-first. Layouts reflow with `auto-fit` and `minmax()` rather than hard media queries, so these are behaviour thresholds, not CSS breakpoints.

| Range | Name | KPI columns | What changes |
|---|---|---|---|
| ≥ 1440px | Wide | 6–8 | Full KPI rows, 3-column card grids, every table column visible |
| 1200–1439px | Desktop | 4–6 | The reference width. Wide tables begin to scroll horizontally |
| 1024–1199px | Laptop | 3–4 | KPI grids reflow to 3 across, two-column card rows stack |
| 768–1023px | Tablet | 2–3 | Sidebar stays but content columns collapse; filter selects wrap |
| < 768px | Narrow | 1–2 | Not a supported admin target — tables are horizontally scrolled |

### Rules

**auto-fit, never fixed columns** — KPI and card grids declare a minimum tile width and let the browser decide the count. A 6-card row becomes 4, then 3, with no media query.
```css
repeat(auto-fit, minmax(178px, 1fr))
```

**One scroll region** — Only the content column scrolls. The sidebar has its own overflow, the header is fixed. The page body never scrolls.
```css
flex:1; overflow-y:auto
```

**Tables scroll, pages do not** — Wide tables get a min-width and sit inside an overflow-x wrapper, so the layout around them stays put.
```css
min-width:1200px + overflow-x:auto
```

**min-width:0 on every flex child** — Without it a long name refuses to shrink and pushes siblings out of the card.
```css
min-width:0; text-wrap:pretty
```

**Truncate identity, wrap prose** — Names, IDs and dates get ellipsis and nowrap. Descriptions, reasons and notes wrap.
```css
white-space:nowrap; text-overflow:ellipsis
```

**Two-column cards collapse together** — Side-by-side card pairs use auto-fit with a 300–340px floor so they stack as a pair rather than squeezing.
```css
repeat(auto-fit, minmax(330px, 1fr))
```

---

## 7. Component specs

### Buttons

Height is fixed per context; width is always content-driven.

| Variant | Height | Padding | Radius | Type | Used for |
|---|---|---|---|---|---|
| Primary | 38px | `0 18px` | 10px | 14 / 700 | Page header CTA, modal submit |
| Secondary | 38px | `0 16px` | 10px | 14 / 600 | Export, Reset, Cancel |
| Accent ghost | 38px | `0 16px` | 10px | 14 / 700 | View Course, Open module |
| Destructive | 38px | `0 16px` | 10px | 14 / 600 | Revoke, Suspend, Delete |
| Table action | 30px | `0 12–13px` | 8px | 12 / 600 | Row-level Open, Extend, Manage |
| Icon only | 32px | — | 9px | — | Close, prev/next, overflow menu |
| Compact icon | 28px | — | 8px | — | Calendar nav, inline toggles |

**Colours**

| Variant | Background | Border | Text | Hover |
|---|---|---|---|---|
| Primary | `#0E9384` | none | `#fff` | `#0B7A6E` |
| Secondary | `#fff` | `#E5E3DC` | `#344054` | `#F6F5F0` |
| Accent ghost | `#EEF6F5` | `#BFE3DC` | `#0B7A6E` | `#E2F1EE` |
| Destructive | `#fff` | `#F0D2CF` | `#B42318` | `#FEF7F6` |

### Inputs & selects

1px border unless in edit state.

| Variant | Height | Padding | Radius | Type |
|---|---|---|---|---|
| Text input | 40px | `0 13px` | 9px | 13.5 / 400 |
| Select | 40px | `0 12px` | 9px | 13.5 / 400 |
| Filter select | 34–36px | `0 8–10px` | 8px | 12–12.5 / 400 |
| Search field | 38px | `0 15px` (`0 34px` with icon) | 999px | 13 / 400 |
| Edit state | 40px | `0 13px` | 9px | 13.5 / 500 |
| Read-only value | 40px min | `0 13px` | 9px | 13.5 / 400 |
| Textarea | 96–110px min | `11px 13px` | 9px | 13.5 / 400 |

- Edit state is marked by a **1.5px `#0E9384`** border.
- Read-only values sit on `#FCFBF7` with a `#F0EEE7` border.

### Pills, chips & badges

Radius is always `999px`.

| Variant | Padding | Type |
|---|---|---|
| Status pill | `3–4px 9–11px` | 11 / 700 |
| Micro pill | `2px 7–8px` | 9.5–10 / 700 |
| Filter chip | `0 13–14px` · h 31–34px | 12–12.5 / 500–700 |
| Count badge | `0 6px` · h 18px min | 10.5 / 700 |
| Legend chip | `4–6px 10–12px` | 11–12.5 / 600 |

### Tables

Header row always `#FCFBF7`.

| Cell | Padding | Type | Note |
|---|---|---|---|
| Header cell | `10–11px 13px` (20px edge) | 10–10.5 / 700 / .05em | Uppercase, `#7A8699` |
| Body cell | `10–12px 13px` (20px edge) | 12–12.5 / 400 | `#475467`, 1px `#F5F3EE` divider |
| Primary cell | `11–12px 20px` | 13.5 / 600 + 10.5 meta | Name + monospace ID beneath |
| Zebra row | — | — | Odd `#FCFBF7`, even `#fff` |
| Hover row | — | — | `#FCFBF7` or `#F7FBFA` |

### Icons & avatars

Stroke icons at 2–2.4 weight.

| Element | Size | Note |
|---|---|---|
| Nav icon | 17 × 17 | Sidebar items, stroke 2 |
| KPI icon | 18 × 18 | Inside a tinted 40 × 40 tile, radius 11px |
| Inline icon | 13–15px | Buttons and chips, stroke 2.1–2.4 |
| Status dot | 7–8px | Alert and legend markers, radius 50% |
| Avatar | 36–40px | Initials on tinted fill, 12.5 / 700 |

---

## 8. 360° tab contract

| Tab | Student | Teacher | Coordinator | Speaker |
|---|:---:|:---:|:---:|:---:|
| Overview | ✓ | ✓ | ✓ | ✓ |
| Employment & Recruitment | — | ✓ | ✓ | ✓ |
| Personal & Professional | ✓ | ✓ | ✓ | ✓ |
| Learning & Products | ✓ | ✓ | ✓ | ✓ |
| Course & Batch | ✓ | ✓ | ✓ | ✓ |
| Performance & Reports | — | ✓ | ✓ | ✓ |
| Ratings & Reviews | ✓ | ✓ | ✓ | ✓ |
| Attendance & Leave | ✓ | ✓ | ✓ | ✓ |
| Schedule | ✓ | ✓ | ✓ | ✓ |
| Finance & Payroll | — | ✓ | ✓ | ✓ |
| Documents | ✓ | ✓ | ✓ | ✓ |
| Communications | ✓ | ✓ | ✓ | ✓ |
| Logins | ✓ | ✓ | ✓ | ✓ |
| Devices | ✓ | ✓ | ✓ | ✓ |
| Activity Timeline | ✓ | ✓ | ✓ | ✓ |
| Internal Notes | — | ✓ | ✓ | ✓ |

Module-specific tabs sit after the shared set:

- **Teacher** — Achievements
- **Coordinator** — Teachers, Tasks & Alerts, Permissions
- **Speaker** — Events, Coordinator, Content, Tasks & Alerts

---

## 9. Do & don't

| Topic | ✓ Do | ✕ Don't |
|---|---|---|
| Accent usage | Give one action per screen the teal fill — the thing the admin came to do. | Fill three buttons teal in the same header. The eye stops choosing and the accent stops meaning anything. |
| Status colour | Resolve every state through the eight `BDG` pairs so green means the same thing everywhere. | Invent a new hex for one badge because it "reads better" on that particular card. |
| Spacing | Space siblings with flex/grid `gap` so drag-reorder and delete keep their rhythm. | Add `margin-bottom` to each child and a negative margin on the last one. |
| Density | Keep table cells at 10–12px and let the card around them breathe at 18–22px. | Pad table rows to 20px — three rows fill the viewport and scanning dies. |
| Truncation | Ellipsis identity fields; wrap prose with `text-wrap:pretty`. | Let a long course name push the status pill off the right edge of the card. |
| Empty states | Say what is missing and what to change next. | Ship a bare "No data" with no route forward. |

---

## 10. Voice

| ✓ We write | ✕ Not |
|---|---|
| 4 batches have no teacher assigned | Warning: `teacher_id` is null for 4 records |
| Revoking removes access immediately and cannot be undone from here. | Are you sure you want to proceed with this action? |
| Access extended — Rahul Kumar · new expiry 30 Nov | Update successful |
| Attendance below 60% for three weeks | Student flagged by rule `ATT_RULE_03` |
| Owner: Legal & Finance Admin · exit condition: Contract Signed | Stage 2 pending |

---

## Conventions worth naming

- **Filter bar above every table** — search on the left, selects in an auto-fit grid, Reset and Export on the right. The active-filter count sits as a teal badge beside the word Filters.
- **Destructive actions demand a reason** — Revoke, suspend and delete open a confirmation with a mandatory reason field. The reason is echoed into the audit-trail toast.
- **Row click opens, buttons act** — clicking a table row opens the record. Buttons inside the row perform an action and stop propagation — never both on one target.
- **Before / after for every change** — configuration changes render the old value as a red struck-through pill followed by a green pill. Used in audit logs, activity feeds and approval history.
- **Lifecycle-aware overviews** — a 360° overview swaps its KPI set by phase: pre-event shows registration and readiness, live shows participants and engagement, post shows attendance, finance and closure.
