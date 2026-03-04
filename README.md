## Ordinary Mystic Readings 2.0

Ordinary Mystic Readings 2.0 is the main website for grounded tarot and astrology—bookings, Notion templates, recommended resources, and SEO-friendly pages. Built with Next.js (static export for GitHub Pages), Tailwind, and markdown content.

---

### Tech stack

- **Next.js App Router** (TypeScript)
- **Tailwind CSS** (v4, mobile-first)
- **Markdown content** in `content/` with **gray-matter**
- **remark + remark-html** for markdown-to-HTML
- **lucide-react** for simple, clean icons

---

### Getting started

From the project root:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

### Project structure (key files)

- `src/app/layout.tsx` – global layout, nav, footer, and default metadata
- `src/app/page.tsx` – home page, booking-first layout
- `src/app/book/page.tsx` – booking hub (live vs. recorded)
- `src/app/blog/page.tsx` & `src/app/blog/[slug]/page.tsx` – blog index and posts
- `src/app/tools/page.tsx` & `src/app/tools/[slug]/page.tsx` – tools index and details
- `src/app/resources/page.tsx` – recommended resources
- `src/app/about/page.tsx` – about page
- `src/app/faq/page.tsx` – FAQ and reading philosophy
- `src/app/tulsa-tarot-reading/page.tsx` – Tulsa tarot SEO landing
- `src/app/tulsa-astrology-reading/page.tsx` – Tulsa astrology SEO landing
- `src/app/login/page.tsx` – future portal login stub
- `src/app/account/...` – future portal stubs (`/account`, `/account/profile`, `/account/sessions`)
- `src/app/sitemap.ts` – sitemap generation (includes static routes, blog posts, tools)
- `src/app/robots.ts` – robots.txt definition
- `src/lib/content.ts` – markdown content utilities
- `content/` – markdown content for blog, tools, resources
- `public/images/` – local placeholder images and simple illustrations

---

### Content: blog, tools, resources

All content is markdown-based and lives under `content/`:

- `content/blog/*.md`
- `content/tools/*.md`
- `content/resources/*.md`

Frontmatter for each type:

**Blog**

```yaml
---
title: "Clear Questions, Grounded Tarot"
date: "2026-02-10"
description: "How to approach tarot without the theatrics or vague mysticism."
tags:
  - tarot
  - grounded
image: "/images/blog-questions.svg" # optional, falls back if omitted
---
markdown content here...
```

**Tools**

```yaml
---
title: "Everyday Check-In Dashboard"
price: "$24"
description: "A simple Notion dashboard for tracking mood, focus, and energy."
ctaLabel: "View on Square"
ctaUrl: "https://squareup.com/placeholder/everyday-checkin"
featured: true
type: "Notion dashboard"
image: "/images/tool-checkin.svg" # optional, falls back if omitted
---
markdown content here...
```

**Resources**

```yaml
---
title: "Books & Learning Resources"
description: "Straightforward, research-friendly books and courses."
category: "Learning"
---
markdown content here...
```

The helper functions in `src/lib/content.ts` handle:

- Listing all entries by type (blog, tools, resources)
- Getting a single entry by slug
- Sorting blog posts (newest first)
- Sorting tools (featured first)
- Rendering markdown content to HTML via remark / remark-html
- Providing default images when `image` is not set

---

### Adding or editing content

#### Add a blog post

1. Create a new file under `content/blog/`, e.g.:

   - `content/blog/my-new-post.md`

2. Include the required frontmatter at the top (see blog example above).
3. Write your post in markdown below the frontmatter.

The new post will appear automatically on:

- `/blog` (index)
- `/blog/my-new-post` (detail page)
- The home page “Lately on the blog” section
- The sitemap (`/sitemap.xml`)

#### Add a tool (store item)

1. Create a file under `content/tools/`, e.g.:

   - `content/tools/new-tool.md`

2. Add the tools frontmatter, including:

   - `title`, `price`, `description`, `ctaLabel`, `ctaUrl`, `featured`, `type`, optional `image`

3. Add markdown body content with more details.

The new tool will appear on:

- `/tools` (index, with featured tools first)
- `/tools/new-tool` (detail page with CTA button)
- The sitemap (`/sitemap.xml`)
- Potentially the home page tools preview (if in the first two items)

#### Add a recommended resource

1. Create a file under `content/resources/`, e.g.:

   - `content/resources/new-resources-list.md`

2. Use the resources frontmatter (title, description, category).
3. Add markdown that includes your affiliate links or recommendations.

Resources are grouped by `category` on `/resources`.

---

### Images and placeholders

Local images live in `public/images/`. This prototype includes several simple SVG placeholders:

- `public/images/blog-questions.svg`
- `public/images/blog-astrology.svg`
- `public/images/tool-checkin.svg`
- `public/images/tool-reflection.svg`
- `public/images/placeholder-blog-1.svg`
- `public/images/placeholder-generic.svg`

You can:

- Replace these SVGs with your own assets (keeping the same filenames), or
- Add new images and reference them from frontmatter via `/images/your-file.ext`.

Content utilities provide defaults:

- Blog posts: fall back to `/images/placeholder-blog-1.svg`
- Tools: fall back to `/images/placeholder-tool-1.svg` (create this file if you want a specific tool placeholder)
- Resources: fall back to `/images/placeholder-generic.svg`

If you prefer JPG or PNG assets, simply add them under `public/images/` and point `image` fields at them (e.g. `/images/blog-cover.jpg`).

---

### Square links and checkout

Square links are **not live**; they are placeholders you can replace at any time:

- Booking hub:
  - `src/app/book/page.tsx` includes two constants:
    - `LIVE_SESSIONS_URL`
    - `RECORDED_READING_URL`
- Tools:
  - Each tool markdown file has a `ctaUrl` used for the “View on Square” / “Purchase via Square” buttons.

To wire in real Square URLs:

1. Update `LIVE_SESSIONS_URL` and `RECORDED_READING_URL` in `src/app/book/page.tsx`.
2. Update each tool’s `ctaUrl` frontmatter in `content/tools/*.md`.
3. Optionally embed a real intake form or Square form in the placeholder area on `/book`.

No runtime calls to external APIs are required—the site only links out to Square.

---

### SEO, sitemap, and robots

- Per-page metadata is defined via `export const metadata` in each page file.
- Tulsa local SEO pages include JSON-LD `LocalBusiness` schema:
  - `src/app/tulsa-tarot-reading/page.tsx`
  - `src/app/tulsa-astrology-reading/page.tsx`
- `src/app/sitemap.ts`:
  - Includes home, key static pages, Tulsa pages, portal stubs
  - Automatically includes all blog posts and tools
- `src/app/robots.ts`:
  - Allows all crawlers
  - Points to `/sitemap.xml`

---

### Deployment (high level)

This project is a standard Next.js App Router app and can be deployed anywhere that supports Next.js:

- **Vercel** (recommended / simplest):
  - Push the project to a Git repository.
  - Import it in Vercel.
  - Use the default Next.js settings.
- **Other platforms** (e.g., Netlify, Render, Fly.io):
  - Use `npm run build` as the build command.
  - Use `npm start` or the platform’s standard Next.js adapter.

Because all content is local markdown and there is no database or authentication yet, deployment is straightforward SSG/SSR with only file-based data.

---

### Notes and next steps

- Client portal pages (`/login`, `/account`, `/account/profile`, `/account/sessions`) are simple stubs that intentionally do not implement authentication or data access yet.
- You can adjust styling (colors, spacing) globally via Tailwind classes and `src/app/globals.css`.
- To change nav links or footer content, edit `src/app/layout.tsx`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
