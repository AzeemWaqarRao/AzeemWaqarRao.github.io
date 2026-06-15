# Azeem Waqar — Portfolio

A clean, minimal, single-page portfolio site built with plain HTML, CSS, and vanilla
JavaScript. No build step, no dependencies — just static files.

## Structure

```
.
├── index.html        # All page content (edit copy here)
├── css/styles.css    # Theme & layout (colors live in :root variables at the top)
├── js/main.js        # Mobile nav, scroll reveal, contact form handling
├── assets/
│   └── AzeemWaqarResume.pdf   # Powers the "Download Resume" button
├── .nojekyll         # Tells GitHub Pages to serve files as-is
└── README.md
```

## Preview locally

Open `index.html` directly in a browser, or serve it (recommended, so paths behave):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Enable the contact form

Out of the box the form works with **no backend**: submitting opens the visitor's email
app with a prefilled message to you (mailto fallback).

To receive submissions without the visitor needing an email client:

1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint
   (looks like `https://formspree.io/f/abcdwxyz`).
2. Open `js/main.js` and paste it into the `FORMSPREE_ENDPOINT` constant at the top:
   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/abcdwxyz";
   ```

That's it — the form will now POST to Formspree and show a success message inline.

## Deploy to GitHub Pages

1. Create a new GitHub repo and push these files:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/AzeemWaqarRao/<repo-name>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment**.
3. Set **Source** = *Deploy from a branch*, **Branch** = `main`, folder = `/ (root)`,
   then **Save**.
4. Your site goes live at `https://AzeemWaqarRao.github.io/<repo-name>/` in a minute or two.

> Tip: name the repo `AzeemWaqarRao.github.io` to host it at the root domain
> `https://AzeemWaqarRao.github.io/`.

## Editing content

All text — about, experience, projects, skills, certifications, contact — lives in
`index.html`. To add real links to your projects, replace the project card markup or add
anchor tags around the headings in the **Projects** section. To change the color scheme,
edit the CSS variables under `:root` in `css/styles.css` (start with `--accent`).
