# Nexus — Corporate Intranet

A **dynamic, interactive corporate intranet** built for a development assessment: employee web experience, mobile employee shell (APK-ready via Capacitor), and HR/Admin command center. Static seeded data with client-side state — no backend required.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** + **Recharts** + **Lucide icons**
- **React Router** for multi-shell routing

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and use demo logins on the sign-in screen.

```bash
npm run build
npm run preview
```

## Demo credentials

| Role | Email | Password | Shell |
|------|-------|----------|--------|
| Employee | alex.rivera@nexuscorp.com | employee123 | Web `/app` or Mobile `/mobile` |
| HR | priya.sharma@nexuscorp.com | hr123 | Admin `/admin` |
| Admin | jordan.lee@nexuscorp.com | admin123 | Admin `/admin` |

## Feature map

### Employee web (`/app`)
- **Dashboard** — prioritized vision, featured news, new joinees carousel, events, leaderboard
- **Leadership** — vision, messages, monthly meet outcomes
- **News & Wins** — announcements with multi-tenancy visibility (org / vertical / department)
- **Impact Footprints** — department metrics and quarterly impact
- **Engagement Calendar** — visual month grid + event list
- **People Directory** — discover colleagues with pool-based visibility
- **Recognition** — peer kudos, replies, reactions, gamification leaderboard
- **Knowledge Hub** — handbooks, policies, references
- **Gallery** — event photos/videos
- **Forum** — pinned threads, categories, tags

### Mobile employee (`/mobile`)
- Home, Feed, Kudos, Events, People (limited subset for field use)

### HR / Admin command center (`/admin`)
- Overview analytics (charts)
- Moderation queue (approve / remove)
- Publish announcements with visibility
- Engagement analytics trends

## Architecture

```
src/
  types/          # Domain schema (User, Announcement, Recognition, …)
  data/seed.ts    # Seeded data for all stages/states
  context/        # Auth session + mutable client state
  layouts/        # Web, Mobile, Admin shells
  pages/          # Feature routes
  components/     # UI primitives + shared widgets
```

**Multi-tenancy** is modeled via `visibility` + `verticalId` / `departmentId` on content, filtered by `canView()` and `filterByTenant()`.

## Deploy (static hosting)

Build and deploy `dist/` to Vercel, Netlify, GitHub Pages, or Azure Static Web Apps:

```bash
npm run build
# deploy dist/
```

## Mobile APK (Capacitor)

### Prerequisites (Windows)

1. **Node.js** 18+ (you already use this for the web app)
2. **Android Studio** — [developer.android.com/studio](https://developer.android.com/studio)
   - During setup, install **Android SDK**, **SDK Platform**, and **Android SDK Build-Tools**
3. **JDK 17** — usually bundled with Android Studio (Settings → Build → Gradle → JDK)

Set environment variable (PowerShell, once per machine):

```powershell
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
```

Restart the terminal after installing Android Studio.

### One-time setup

From the project folder:

```powershell
cd C:\Users\rx10\.cursor\projects\empty-window
npm install
npm run build
npx cap add android
```

(`capacitor.config.ts` and `base: './'` in Vite are already configured.)

### Build the APK

Every time you change the React app:

```powershell
npm run cap:sync
npm run cap:open
```

In **Android Studio**:

1. Wait for Gradle sync to finish.
2. **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. When done, click **locate** — the debug APK is typically at:
   `android\app\build\outputs\apk\debug\app-debug.apk`

Install on a phone: copy the APK, enable “Install unknown apps”, open the file.

### Release APK (for submission)

In Android Studio: **Build → Generate Signed Bundle / APK → APK**, create a keystore, choose **release**. Output: `android\app\build\outputs\apk\release\app-release.apk`.

### Mobile UX in the APK

The app loads the same React build as the website. After login, use **Employee Mobile** on the login screen, or sign in as `alex.rivera@nexuscorp.com` and navigate to `/mobile` (bottom tabs: Home, Feed, Kudos, Events, People).

### Troubleshooting

| Issue | Fix |
|--------|-----|
| Blank white screen | Run `npm run build` then `npm run cap:sync` again |
| Routes 404 on refresh | `androidScheme: 'https'` is set in `capacitor.config.ts` — do not remove it |
| Gradle / SDK errors | Open SDK Manager in Android Studio and install latest **Android 14 (API 34)** platform |
| `cap: command not found` | Use `npx cap` instead of `cap` |

## Assessment deliverables checklist

- [x] Git repo (initialize locally / push to remote)
- [x] `PROMPTS_AND_AI_LOG.txt` — scaffold + correction prompts
- [ ] Hosted public URL (deploy `dist`)
- [ ] Video walkthrough with narration

## License

Assessment submission — Nexus Corp fictional branding.
