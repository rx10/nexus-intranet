# Nexus Intranet — Video Walkthrough Script

A ready-to-record narration that hits every rubric line item in **5–7 minutes**.

- **URL:** <https://nexus-intranet.netlify.app>
- **Tool:** Loom, OBS, or QuickTime + screen recording
- **Resolution:** record at 1080p, target 1280×720 minimum on final upload
- **Mic:** built-in is fine; use AirPods/headset if available
- **Cursor:** enable "click highlight" / "show keystrokes" in your recorder if it offers it
- **Window:** desktop browser, full-screen, no bookmarks bar, single tab

Have all four personas pre-staged: keep the credentials block visible on a second screen / sticky note so you can quick-login without fumbling.

| Persona | Email | Password |
|---|---|---|
| Employee (Tech vertical) | `alex.rivera@nexuscorp.com` | `employee123` |
| HR Head | `priya.sharma@nexuscorp.com` | `hr123` |
| Admin | `jordan.lee@nexuscorp.com` | `admin123` |
| CEO (leadership pool) | `morgan.chen@nexuscorp.com` | `leadership123` |

---

## Scene 1 — Brand & Sign-in (0:00 – 0:30)

**Show:** the `/` Login screen.

> "Hi, this is **Nexus**, a corporate intranet built for the assessment. It's a single React + TypeScript codebase that ships **three shells** — an employee web console, an employee mobile shell, and an HR/Admin command center — all driven by one tenancy-aware data layer with seeded states for every flow."

**Click** the demo quick-login button for **Employee · Web** to enter as Alex.

---

## Scene 2 — Dashboard prioritization (0:30 – 1:30)

**Show:** `/app` dashboard.

> "This is the prioritized employee dashboard. The four KPI tiles up top — your points, active kudos, upcoming events, news for you — are the only numbers that matter at a glance. Below that, a single leadership-vision hero, then featured updates as cards, then a horizontal carousel of new joinees with their quotes and fun facts. The right rail compresses upcoming events, the live leaderboard, and recent recognition. We deliberately kept this to six widget regions so it stays clutter-free."

**Hover** on the vision hero to show the gradient + the "Read full vision" link.
**Scroll** to the new joinee carousel and **drag-swipe** it.

---

## Scene 3 — Leadership & business updates (1:30 – 2:15)

**Click** Leadership in the sidebar.

> "Leadership messages are grouped into three categories — vision, monthly meet outcomes, and general messages — straight from the demand note."

**Click** News & Wins.

> "Announcements use type-filter pills — company, business, project wins, milestones — and every announcement carries a visibility badge: organization, vertical, or department. That visibility drives multi-tenancy, which I'll demo in a second."

---

## Scene 4 — Impact, calendar, people (2:15 – 3:15)

**Click** Impact.

> "Footprints surface team-level outcomes with metrics. Each card is color-banded by the originating department, which carries through the whole UI — the same color reappears in the calendar and the headcount pie chart."

**Click** Calendar.

> "The calendar has a real month grid with `+N more` overflow on busy days. Every event chip and every event card is clickable…"

**Click** the "Company Townhall" chip.

> "…and opens a detail drawer with time range, location, attendees, host department, and an RSVP affordance."

**Close** the modal, **click** People.

> "The directory respects tenancy: by default Alex sees colleagues in their org + tech vertical + product design department pools. Search and department filter both work live."

---

## Scene 5 — Recognition with live leaderboard (3:15 – 4:00)

**Click** Recognition.

> "Recognition has four categories — peer, achievement, milestone, welcome. Let me send kudos to a teammate."

**Pick** any colleague, type `"Great cross-team push on the launch"`, click **Send appreciation**.

> "Notice the leaderboard on the right just re-ranked in place — every kudos is worth +25 points, every reaction +2. The flagged sample below shows the moderation state — an 'Under review' badge until HR clears it."

**Click** the thumbs-up on a kudos to bump its reaction count.
**Type** a reply on a kudos thread and click Reply.

---

## Scene 6 — Knowledge, Gallery, Forum (4:00 – 4:45)

**Click** Knowledge.

> "Knowledge has search, category filters, and a preview modal for every document."

**Type** `policy` in search → **click** a doc → **close** the modal.

**Click** Gallery — quick fly-by.

**Click** Forum.

> "Forum is fully two-way. Pinned threads bubble up, category pills filter, view counts increment on open."

**Click** **+ Start a thread** → fill in title and body → **Post thread**. Then **click** an existing thread → **type** a reply → **Send**.

---

## Scene 7 — The headline trick: live persona switch (4:45 – 5:30)

**Show** the floating "Switch persona" pill in the bottom-right.

> "This pill is the single best way to demonstrate multi-tenancy. Right now I'm Alex in the tech vertical, so I see a specific slice of content. Watch what happens when I switch to Priya — HR Head."

**Click** the pill → **pick Priya Sharma**. You land on `/admin`.

> "I'm now in the HR Command Center. Different shell, different visual language — dark sidebar, 'Command Center' badge — same data layer."

---

## Scene 8 — HR / Admin command center (5:30 – 6:30)

**Show:** `/admin` overview.

> "The overview is real Recharts — weekly engagement bar, headcount-by-vertical pie pulling from seed data, and a content pipeline summary with live counts for published, draft, and flagged content."

**Click** Moderation.

> "Two items are pending review. Let me remove the flagged kudos…"

**Click Remove** on the flagged item.

**Click** Switch persona → **Alex Rivera** → **Recognition** in the sidebar.

> "And it's gone from Alex's feed. Status flipped to 'hidden' in the underlying store. This is the moderation-reduces-clutter requirement, end-to-end."

**Switch back to Priya** → **Publish**.

> "HR can publish announcements with a visibility scope and an optional featured flag."

**Fill** title `Test announcement`, summary, body, pick `Organization-wide`, tick **Featured**, click **Publish to feed**.

**Switch back to Alex** → `/app` → point at the dashboard featured grid.

> "There it is on Alex's dashboard immediately — and because state is persisted to localStorage, refreshing the page keeps it."

**Click** Analytics in the admin sidebar (switch persona back to Priya first).

> "Analytics — engagement index vs recognition volume over the last four weeks."

---

## Scene 9 — CEO sees the leadership pool (6:30 – 6:50)

**Switch persona** → **Morgan Chen**.

> "Morgan is in the leadership visibility pool. They see a draft leadership-only announcement that no other employee sees — that's the 'leadership' tenant in action."

**Open** Announcements as Morgan, point at the draft.

---

## Scene 10 — Mobile shell + APK (6:50 – 7:30)

**Switch persona** → **Alex Rivera · Mobile**.

> "Same login, mobile shell — 430px iPhone-style frame, glass bottom tab bar, safe-area padding, five tabs limited to home, feed, kudos, events, people, per the assessment's 'limited features on mobile' brief. This entire build is wrapped via Capacitor into an Android APK with the same web bundle — instructions are in the README."

Tap through Home → Feed → Kudos → Events → People.

---

## Scene 11 — Architecture closer (7:30 – 8:00)

**Stop screen-share** or alt-tab to a code editor for 15 seconds; show `src/types/index.ts` and `src/lib/selectors.ts`.

> "Under the hood: a single types module with literal-union enums for every domain concept, a `canView` / `filterByTenant` selector that handles the four visibility pools, a `computeLeaderboard` selector that recalculates ranks on every kudos, and per-slice `useLocalStorage` so the demo persists across refreshes. The codebase is split into UI primitives, shared widgets, three layouts, and route-level lazy loading for the admin and mobile chunks."

Cut to a final card with the URL + credentials + "Thanks for watching!"

---

## Recording checklist

Before you hit record, do this clean state in DevTools:

```js
// In the browser console at https://nexus-intranet.netlify.app
localStorage.clear()
location.reload()
```

That guarantees the moderation queue is back to two pending items and the recognition feed has its seeded sample (including the flagged one).

If you mess up a take, just clear localStorage and restart the section — every interaction is repeatable from a clean slate.

## File deliverable

- Record at 1080p, MP4/H.264, target file <= 100 MB
- Name it `nexus-intranet-walkthrough.mp4`
- Either:
  - Upload to Loom/Google Drive/YouTube unlisted and put the link in the submission email, OR
  - Place the file alongside the repo as `walkthrough.mp4` and reference it in the README
