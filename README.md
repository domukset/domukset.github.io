# DOMUKSET BLOG

Static website for the root address:

`https://domukset.github.io`

## Exact GitHub requirement

The GitHub user or organization must be named:

`domukset`

The repository must be named exactly:

`domukset.github.io`

The repository is published from the `main` branch and the root `/` directory.

## Repository structure

```text
domukset.github.io/
├── .nojekyll
├── index.html
├── styles.css
├── post-template.html
├── README.md
└── images/
```

`index.html` must be directly in the repository root. Do not put the website
inside a second folder.

## Add a post

1. Open `post-template.html`.
2. Copy its complete `<details class="post">...</details>` block.
3. Open `index.html`.
4. Paste the block directly below the `NEW POSTS GO HERE` comment.
5. Change the date, title, text, image filename, alternative text, and caption.
6. Commit the change.

Keep the newest post at the top.

## Upload a photograph

Upload the photograph into the `images` directory.

Use filenames such as:

- `storage-door-2026-07-01.jpg`
- `club-room-lock-2026-07-15.jpg`

Avoid spaces and special characters in filenames.

Reference the photo in `index.html` like this:

```html
<img
  src="images/club-room-lock-2026-07-15.jpg"
  alt="Damage to the club room lock"
  loading="lazy"
>
```

## Privacy

GitHub Pages is public. Do not upload private resident information, door codes,
apartment numbers, unverified accusations, or identifiable photographs without
an appropriate reason and permission.
