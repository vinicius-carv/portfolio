// Azulejo panel: 16 tiles from a few geometric motifs, randomly rotated.
(function tiles() {
  const el = document.getElementById("tiles");
  if (!el) return;
  // Colours come from CSS classes (tile-w/a/s/i) so tiles follow the theme.
  const motifs = [
    `<rect width="100" height="100" class="tw"/><path d="M0 0H100L0 100Z" class="ta"/>`,
    `<rect width="100" height="100" class="ta"/><circle cx="0" cy="0" r="100" class="tw"/><circle cx="0" cy="0" r="50" class="ts"/>`,
    `<rect width="100" height="100" class="tw"/><path d="M0 0H50V100H0Z" class="ti"/><circle cx="50" cy="50" r="25" class="tw"/>`,
    `<rect width="100" height="100" class="ts"/><path d="M0 100A100 100 0 0 1 100 0V100Z" class="ta"/>`,
    `<rect width="100" height="100" class="tw"/><rect x="0" y="0" width="50" height="50" class="ta"/><rect x="50" y="50" width="50" height="50" class="ts"/>`,
    `<rect width="100" height="100" class="tw"/><circle cx="50" cy="50" r="30" class="tr" stroke-width="12"/>`,
  ];
  const html = [];
  for (let i = 0; i < 16; i++) {
    const m = motifs[Math.floor(Math.random() * motifs.length)];
    const r = 90 * Math.floor(Math.random() * 4);
    html.push(`<svg viewBox="0 0 100 100"><g class="t" style="--r:${r}deg;transform-origin:50px 50px;transition-delay:${i * 40}ms">${m}</g></svg>`);
  }
  el.innerHTML = html.join("");
  el.classList.add("pre");
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("pre")));
})();

// PT / EN toggle.
const EN = {
  skip: "Skip to content",
  "nav.exp": "Experience", "nav.proj": "Projects", "nav.contact": "Contact",
  lede: "Full stack developer in Brasília, Brazil. I build portals, APIs and apps — Java and Spring Boot on the back end, React and React Native on the front, with LLMs wired in where they help.",
  email: "Email",
  "h.about": "About",
  "about.1": "I'm a full stack developer. I build portals and systems for the public sector, international organizations, professional associations and private companies — usually end to end: data modeling, Java and Spring Boot back ends, React or Angular front ends, deployment and production follow-up.",
  "about.2": "I was the technical lead of a partnership-management platform for an international organization. I defined the architecture (Angular, Spring Boot and MySQL), the permission model, the certification workflows, the public transparency portal and the server monitoring, and I was the main contributor to both the front end and the back end.",
  "about.3": "My focus now is AI applied to real problems: a platform that extracts data from healthcare contracts and ties every price, deadline and rule back to the passage it came from, and agent tooling (Claude Code and Codex) that standardizes review, testing and deployment for the team.",
  "theme.toggle": "Dark mode",
  "a11y.open": "Accessibility options",
  "a11y.title": "Accessibility",
  "a11y.theme": "Theme", "a11y.auto": "System", "a11y.light": "Light", "a11y.dark": "Dark",
  "a11y.size": "Text size", "a11y.smaller": "Decrease text size", "a11y.bigger": "Increase text size",
  "a11y.contrast": "High contrast", "a11y.motion": "Reduce motion",
  "a11y.links": "Underline links", "a11y.spacing": "Wider text spacing",
  "a11y.reset": "Reset to default",
  "photo.alt": "Photo of Vinícius Carvalho smiling, wearing glasses and a black shirt",
  "h.exp": "Experience",
  "exp.1.when": "Sep 2023 — present", "exp.1.role": "Full Stack Developer",
  "exp.1.a": "Technical lead of a partnership-management web platform for an international organization: Angular + Spring Boot + MySQL architecture, role-based permissions, certification workflows, a public transparency portal with sensitive-data handling, document export and Spring Boot Admin monitoring.",
  "exp.1.b": "Migrated legal-document indexing services from Liferay modules to standalone Spring Boot services over Oracle, verified for fidelity against the legacy system on real documents.",
  "exp.1.c": "A Liferay portal with a multi-step member sign-up (React + Liferay Objects), migration of the legacy member base, and a React Native (Expo) app published on Google Play and the App Store, with SSO login and a release pipeline.",
  "exp.1.d": "Healthcare contract-intelligence platform: OCR and LLM extraction with evidence for every data point, multi-insurer PostgreSQL, price history, reference tables and readjustment alerts (Next.js, Neon, Vercel).",
  "exp.1.e": "Liferay portals and intranets for public bodies and private companies, including multilingual sites with RTL layout; a chatbot built with Spring Boot, LangChain4j and Ollama.",
  "sk.ai.items": "LLM and OCR document extraction, LangChain4j, Ollama, Claude / Anthropic API, RAG, Claude Code and Codex",
  "exp.2.when": "Jun 2023 — Dec 2023", "exp.2.role": "Web Developer, volunteer researcher",
  "exp.2.a": "Institutional websites for a research lab, including its academic article repository.",
  "exp.3.when": "Mar 2022 — Nov 2022", "exp.3.role": "IT Intern", "exp.3.org": "Ministry of Defense (Brazil)",
  "exp.3.a": "Maintained and customized the distance-learning platform (Moodle, PHP, CSS).",
  "h.skills": "Skills",
  "sk.front": "Front end & mobile", "sk.ai": "AI & LLMs", "sk.db": "Databases", "sk.ops": "Infrastructure", "sk.prac": "Practices",
  "h.proj": "Projects on GitHub",
  "proj.doc-extract.desc": "PDF contracts to JSON, every field with a verified quote. Spring Boot + Ollama.",
  "proj.liferay-claude-skills.desc": "Claude Code plugin for Liferay: verified setup, config checks and source lookup.",
  "proj.mcp-brasil.desc": "MCP server for Brazilian public data: CNPJ, CEP, IBGE and Diário Oficial da União search.",
  "proj.lex-rag.desc": "RAG over Brazil's Constitution and Consumer Code: cites exact articles, checked in code, with metrics.",
  "proj.dou-alerts.desc": "Daily alerts from Brazil's official gazette (DOU) for CNPJs, names and topics, on the web and in the app.",
  "proj.live": "See it live",
  "repo.all": "See all repositories",
  "h.edu": "Education",
  "edu.1.when": "2026 — 2027, in progress",
  "edu.1": "Postgraduate in Software Architecture, Data Science & Cybersecurity — PUC-Campinas",
  "edu.2": "B.Sc. in Computer Science — UniCEUB",
  langs: "Portuguese native, English fluent, Spanish intermediate, Japanese basic.",
  "h.contact": "Contact",
  "contact.note": "Open to remote roles, in Brazil or abroad.",
  foot: "Brasília, Brazil. Tiles inspired by Athos Bulcão's panels.",
};
const PT = {};
document.querySelectorAll("[data-i18n]").forEach((n) => { PT[n.dataset.i18n] = n.textContent; });
document.querySelectorAll("[data-i18n-alt]").forEach((n) => { PT[n.dataset.i18nAlt] = n.alt; });
document.querySelectorAll("[data-i18n-aria]").forEach((n) => { PT[n.dataset.i18nAria] = n.getAttribute("aria-label"); });

function setLang(lang) {
  const dict = lang === "en" ? EN : PT;
  document.querySelectorAll("[data-i18n]").forEach((n) => {
    const v = dict[n.dataset.i18n];
    if (v) n.textContent = v;
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((n) => {
    const v = dict[n.dataset.i18nAlt];
    if (v) n.alt = v;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((n) => {
    const v = dict[n.dataset.i18nAria];
    if (v) n.setAttribute("aria-label", v);
  });
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  const btn = document.getElementById("lang-toggle");
  btn.textContent = lang === "en" ? "PT" : "EN";
  btn.setAttribute("aria-label", lang === "en" ? "Mudar para português" : "Switch to English");
  try { localStorage.setItem("lang", lang); } catch (_) {}
}
document.getElementById("lang-toggle").addEventListener("click", () => {
  setLang(document.documentElement.lang === "en" ? "pt" : "en");
});
let saved = null;
try { saved = localStorage.getItem("lang"); } catch (_) {}
if (saved === "en" || (!saved && !navigator.language.toLowerCase().startsWith("pt"))) setLang("en");

// Display & accessibility preferences, persisted in localStorage("prefs").
(function prefs() {
  const root = document.documentElement;
  const SIZES = ["100%", "112%", "125%", "140%"];
  const dark = window.matchMedia("(prefers-color-scheme: dark)");
  let p = {};
  try { p = JSON.parse(localStorage.getItem("prefs") || "{}"); } catch (_) {}

  const themeBtn = document.getElementById("theme-toggle");
  const panelBtn = document.getElementById("a11y-toggle");
  const panel = document.getElementById("a11y-panel");
  const sizeOut = document.getElementById("size-value");
  const down = document.getElementById("size-down");
  const up = document.getElementById("size-up");

  function save() { try { localStorage.setItem("prefs", JSON.stringify(p)); } catch (_) {} }
  const isDark = () => p.theme === "dark" || (p.theme !== "light" && dark.matches);

  function apply() {
    if (p.theme === "light" || p.theme === "dark") root.dataset.theme = p.theme;
    else delete root.dataset.theme;
    const size = p.size || 0;
    if (size) root.dataset.size = size; else delete root.dataset.size;
    for (const k of ["contrast", "motion", "links", "spacing"]) {
      if (p[k]) root.dataset[k] = "on"; else delete root.dataset[k];
    }
    // Sync controls.
    themeBtn.setAttribute("aria-pressed", String(isDark()));
    panel.querySelectorAll('input[name="theme"]').forEach((r) => { r.checked = r.value === (p.theme || "auto"); });
    panel.querySelectorAll("input[data-pref]").forEach((c) => { c.checked = !!p[c.dataset.pref]; });
    sizeOut.value = SIZES[size];
    down.disabled = size === 0;
    up.disabled = size === SIZES.length - 1;
  }

  function set(changes) { Object.assign(p, changes); save(); apply(); }

  themeBtn.addEventListener("click", () => set({ theme: isDark() ? "light" : "dark" }));
  dark.addEventListener("change", apply);

  panel.querySelectorAll('input[name="theme"]').forEach((r) =>
    r.addEventListener("change", () => set({ theme: r.value === "auto" ? undefined : r.value })));
  panel.querySelectorAll("input[data-pref]").forEach((c) =>
    c.addEventListener("change", () => set({ [c.dataset.pref]: c.checked || undefined })));
  down.addEventListener("click", () => set({ size: Math.max(0, (p.size || 0) - 1) || undefined }));
  up.addEventListener("click", () => set({ size: Math.min(SIZES.length - 1, (p.size || 0) + 1) }));
  document.getElementById("a11y-reset").addEventListener("click", () => { p = {}; save(); apply(); });

  // Panel open/close: toggle button, Escape, click outside.
  function open(state) {
    panel.hidden = !state;
    panelBtn.setAttribute("aria-expanded", String(state));
    if (state) panel.querySelector('input[name="theme"]:checked').focus();
  }
  panelBtn.addEventListener("click", () => open(panel.hidden));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) { open(false); panelBtn.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (!panel.hidden && !panel.contains(e.target) && !panelBtn.contains(e.target)) open(false);
  });

  apply();
})();
