# 🎨 Snaglet — Interactive Prototype

> Where kids' artwork comes to life — and every purchase helps the classroom.

This is a fully interactive PWA (Progressive Web App) prototype of Snaglet. It runs in any mobile browser and can be saved to your iPhone or Android home screen like a native app.

---

## 📱 Add to Your Phone (No App Store Needed)

### iPhone (Safari)
1. Open the live URL in **Safari** (not Chrome)
2. Tap the **Share** button (box with arrow at bottom)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add** — Snaglet icon appears on your home screen
5. Open it — it runs fullscreen like a native app ✅

### Android (Chrome)
1. Open the live URL in **Chrome**
2. Tap the **⋮ menu** (top right)
3. Tap **"Add to Home Screen"**
4. Tap **Add** ✅

---

## 🚀 Deploy to Vercel (Free — 5 Minutes)

This is the fastest way to get a live URL:

### Option A — Vercel Web UI (No terminal needed)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `snaglet` GitHub repository
4. Click **Deploy** — done! You get a URL like `snaglet.vercel.app`

### Option B — Vercel CLI
```bash
npm install -g vercel
cd snaglet
vercel
```

### Option C — Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the entire `snaglet` folder onto the deploy area
3. Live URL in 30 seconds — no account needed for drag-drop

---

## 📂 File Structure

```
snaglet/
├── index.html      ← All screens and modals
├── style.css       ← Full design system and component styles
├── app.js          ← All interactions, navigation, and state
├── manifest.json   ← PWA configuration (name, icons, colors)
├── sw.js           ← Service worker (offline support + caching)
├── icons/
│   ├── icon-192.png   ← App icon (replace with real artwork)
│   ├── icon-512.png   ← App icon large
│   └── icon.svg       ← Source SVG icon
└── README.md
```

---

## 🎭 Prototype Features

All screens are fully interactive:

| Screen | What to try |
|---|---|
| **Onboarding** | Switch between Teacher / Student / Family roles |
| **Teacher Home** | Tap ＋ to post artwork, tap artwork stats |
| **Students** | See roster, tap "Resend SMS" on pending |
| **Moderation** | Approve or Reject flagged comments |
| **Family Feed** | React with emoji, comment, open GIF picker |
| **AI Animation** | Tap "Bring to Life" — watch the 4-step Grok flow |
| **Notifications** | Tap items to navigate to feed |
| **Profile** | See pricing card and classroom fund |

---

## 🛠 Tech Stack (This Prototype)

- **Vanilla HTML/CSS/JS** — zero dependencies, zero build step
- **PWA** — works offline, installable, push-notification ready
- **Fonts** — Nunito + Nunito Sans via Google Fonts
- **Icons** — Inline SVG

---

## 🏗 Production Build (Next Steps)

To turn this prototype into a real app, you'll need:

| Layer | Recommended |
|---|---|
| Frontend | React + TypeScript |
| Backend | Supabase (auth, database, storage) |
| Payments | Stripe (subscriptions + usage billing) |
| SMS | Twilio |
| AI Animation | xAI Grok Imagine API (`grok-imagine-video`) |
| AI Moderation | OpenAI Moderation API + Claude |
| GIFs | Giphy Kids API |
| Push Notifications | Firebase Cloud Messaging |
| Classroom Fund | DonorsChoose API (v2) |
| Hosting | Vercel or Netlify |

---

## 📋 Replace Before Launch

- `icons/icon-192.png` and `icons/icon-512.png` — replace with real Snaglet icon artwork
- Update `manifest.json` with your real domain in `start_url`
- Remove prefilled demo data from `index.html` inputs

---

## 📄 License

Prototype — all rights reserved. Built for Snaglet product development.
