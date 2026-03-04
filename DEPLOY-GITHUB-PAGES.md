# Deploy this site to GitHub Pages

This project is set up for **static export** and **GitHub Actions** deployment to GitHub Pages.

## What’s already done

- **Static export** – `next build` outputs static files to the `out/` folder (no Node server needed).
- **GitHub Actions workflow** – `.github/workflows/deploy-pages.yml` runs on every push to `main`: it builds the site and deploys the `out/` folder to GitHub Pages.
- **basePath** – The workflow sets `NEXT_PUBLIC_BASE_PATH` automatically:
  - **User/org site** (repo name `yourusername.github.io`) → site at `https://yourusername.github.io`
  - **Project site** (repo name e.g. `ordinary`) → site at `https://yourusername.github.io/ordinary/`
- **/resources** – Redirect is handled by a static page (client redirect to `/tools`) because server redirects don’t work with static export.

## What you need to do

### 1. Decide how you want to “replace” the current live site

**Option A – New repo for the new design (recommended)**  
- Create a **new** GitHub repo (e.g. `ordinary-mystic` or `ordinary-website`).
- Push **this** codebase to that new repo (see step 2).
- In **GitHub → Settings → Pages** for that repo, set **Source** to **GitHub Actions**.
- If you want this to be your **main** GitHub Pages site (e.g. `yourusername.github.io`), you have two sub-options:
  - **Rename the new repo** to `yourusername.github.io` (and move or archive the old one), **or**
  - **Use a custom domain** and point it to `yourusername.github.io/new-repo-name` (or to the new repo’s Pages URL).

**Option B – Replace the current repo’s content**  
- **Back up the old site:** clone the current live repo, push that clone to another repo (e.g. `old-site-backup`) or rename the current repo to something like `old-website`.
- Make the **live** repo empty or give it the same name as before (e.g. `yourusername.github.io`).
- Push **this** codebase to that repo (see step 2).
- In **Settings → Pages**, set **Source** to **GitHub Actions**.

### 2. Push this code to the chosen repo

From your machine (in this project folder):

```bash
git remote -v   # see current remote
```

If this folder is **not** yet a git repo, or you want to point it at the **new** repo:

```bash
git init
git add .
git commit -m "Initial commit: new Ordinary Mystic site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

If this folder **is** already a clone of another repo and you want to push to a **different** repo (e.g. the new one):

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Use your real GitHub username and the repo name you chose (e.g. `yourusername.github.io` or `ordinary`).

### 3. Turn on GitHub Pages from Actions

1. Open the repo on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. Save. The first deployment will run from the workflow on the next push (or you can run it from the **Actions** tab).

### 4. Set your real site URL (optional but recommended)

Right now `sitemap.ts` and `robots.ts` use `baseUrl = "https://ordinary.local"`. For production:

- Edit `src/app/sitemap.ts` and set `baseUrl` to your real URL (e.g. `https://yourusername.github.io` or `https://yourdomain.com`).
- Edit `src/app/robots.ts` and set `baseUrl` to the same value.

Then commit and push so the next deploy uses the correct URLs.

### 5. Custom domain (optional)

If you use a custom domain (e.g. `ordinarymystic.com`):

- In **Settings → Pages**, add the custom domain and follow GitHub’s DNS instructions.
- Update `baseUrl` in `sitemap.ts` and `robots.ts` to that domain (e.g. `https://ordinarymystic.com`).
- If your site is served at the **root** of that domain (not in a subpath), keep `NEXT_PUBLIC_BASE_PATH` unset / empty for that deployment (the workflow already does the right thing for `username.github.io` repos).

---

## Summary checklist

- [ ] Create or choose the repo that should be “live.”
- [ ] Push this project to that repo (`main` branch).
- [ ] **Settings → Pages** → Source = **GitHub Actions**.
- [ ] Update `baseUrl` in `src/app/sitemap.ts` and `src/app/robots.ts` to your real URL.
- [ ] Push again if you changed `baseUrl`; the workflow will deploy automatically.

If you tell me your GitHub username and the exact repo name you want to be live (e.g. `tyler.github.io` or `ordinary`), I can adapt the workflow or instructions for that case.
