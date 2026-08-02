/* ============================================================
   Portfolio interactions + project data.
   To add a project later: append one object to PROJECTS below.
   ============================================================ */

const PROJECTS = [
  {
    title: "Renovation Quotation System",
    status: "live", // "live" | "soon"
    blurb:
      "An object-oriented cost-estimation engine for home renovations: dynamic " +
      "difficulty pricing, rental-yield analysis and one-click Word/PDF proposals — " +
      "plus a data-science track (EDA + a Random Forest that predicts quotes at R² = 0.94).",
    image: "assets/renovation.png",
    tags: ["Python", "OOP", "scikit-learn", "Streamlit", "Plotly", "PostgreSQL"],
    links: {
      demo: "https://renovation-quotation-system-ruydmxqk4nnfn7vdw5cpmv.streamlit.app",
      code: "https://github.com/wayneliu0297/renovation-quotation-system",
      notebook:
        "https://github.com/wayneliu0297/renovation-quotation-system/blob/main/notebooks/quotation_analysis.ipynb",
    },
  },
  {
    title: "Taipei Rental GIS Dashboard",
    status: "live",
    blurb:
      "An Airbnb-style interactive rental map of Greater Taipei: 220 synthetic listings " +
      "across 14 districts with live filters (city, price, room type, size, MRT distance), " +
      "price-pill map markers, photo cards and a fly-to detail view. Built on Streamlit + " +
      "Folium + SQLite, with a pytest suite and GitHub Actions CI.",
    image: "assets/taipei-gis.jpg",
    tags: ["Python", "Streamlit", "Folium", "SQLite", "pandas", "GIS"],
    links: {
      demo: "https://taipei-rental-gis-dashboard-ngtfxp5cvwa4cenpvpvuna.streamlit.app",
      code: "https://github.com/wayneliu0297/taipei-rental-gis-dashboard",
      notebook: "",
    },
  },
  {
    title: "Renovation Material Inventory Manager",
    status: "live",
    blurb:
      "A full-stack inventory manager for renovation materials: an analytics " +
      "dashboard (asset value, low-stock alerts, 6-month value trend), a " +
      "searchable/filterable inventory list, an append-only purchase/movement " +
      "ledger and full CRUD behind a read-only-vs-editor demo login. Built on " +
      "Streamlit + SQLite + Plotly, with 56 synthetic materials, a pytest suite " +
      "and GitHub Actions CI.",
    image: "assets/material-inventory.jpg",
    tags: ["Python", "Streamlit", "SQLite", "Plotly", "pandas", "CI"],
    links: {
      demo: "https://customized-material-inventory-management-tbv2nxhucsq7gmkjremhq.streamlit.app",
      code: "https://github.com/wayneliu0297/customized-material-inventory-management",
      notebook: "",
    },
  },
];

/* ---------- render project cards ---------- */
function linkHtml(href, label) {
  if (href) {
    return `<a href="${href}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span></a>`;
  }
  return `<a class="disabled" aria-disabled="true">${label}</a>`;
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((p) => {
    const media = p.image
      ? `<img src="${p.image}" alt="${p.title} screenshot" loading="lazy" />`
      : `<div class="card__placeholder">${p.title.charAt(0)}</div>`;
    const badge =
      p.status === "live"
        ? `<span class="badge badge--live">Live</span>`
        : `<span class="badge badge--soon">Coming soon</span>`;
    const tags = p.tags.map((t) => `<span>${t}</span>`).join("");
    const links = [
      p.links.demo ? linkHtml(p.links.demo, "Live demo") : "",
      linkHtml(p.links.code, "Code"),
      p.links.notebook ? linkHtml(p.links.notebook, "Notebook") : "",
    ]
      .filter(Boolean)
      .join("");
    return `
      <article class="card reveal">
        <div class="card__media">${media}</div>
        <div class="card__body">
          <div class="card__head">
            <h3 class="card__title">${p.title}</h3>
            ${badge}
          </div>
          <p class="card__blurb">${p.blurb}</p>
          <div class="card__tags">${tags}</div>
          <div class="card__links">${links}</div>
        </div>
      </article>`;
  }).join("");
}

/* ---------- theme toggle (respects system, persists choice) ---------- */
function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
}

/* ---------- reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- nav shadow on scroll ---------- */
function initNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderProjects();
  initReveal();
  initNav();
  document.getElementById("year").textContent = new Date().getFullYear();
});
