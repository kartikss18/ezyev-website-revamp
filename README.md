# EzyEV website

Next.js 16 + Tailwind v4. Light theme by default, dark theme via the toggle in the nav (saved per visitor).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages
`/` home (landing) · `/product` · `/what-we-do` · `/careers` · `/contact` · `/privacy` · `/terms` · branded 404

## Where to edit content
- `content/site.ts` – company facts, nav, offices, FAQ, impact counter inputs
- `content/careers.ts` – open roles (empty list shows a "no open roles" view)
- `app/globals.css` – design tokens for both themes

## Contact form
Set `CONTACT_WEBHOOK_URL` (Zapier, Make, Slack, Google Apps Script or a CRM webhook) so enquiries are forwarded as JSON.
Without it, development logs leads to the console and production shows the visitor an error asking them to email info@ezyev.in.

## Before launch
- Confirm the impact counter inputs in `content/site.ts` (150 batteries, 70 km a day, since 1 Jan 2026) with ops.
- Have counsel review `/privacy` and `/terms` (drafts).
- Add real customer testimonials or logos when available.
