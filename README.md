# wayneliu0297.github.io

My personal portfolio & résumé site — plain HTML/CSS/JS, hosted free on GitHub Pages.

**Live:** https://wayneliu0297.github.io

## Add a new project

Append one object to the `PROJECTS` array in [`script.js`](script.js):

```js
{
  title: "Project name",
  status: "live",              // "live" or "soon"
  blurb: "One or two sentences.",
  image: "assets/your-shot.png", // or "" for a gradient placeholder
  tags: ["Python", "..."],
  links: { demo: "", code: "https://github.com/...", notebook: "" },
}
```

Drop the screenshot in `assets/`, commit, and push — GitHub Pages redeploys automatically.

## Structure

```
index.html   # all sections (hero, about, skills, projects, experience, contact)
style.css    # warm editorial theme, light + dark
script.js    # renders project cards, theme toggle, scroll reveals
assets/      # project screenshots
```
