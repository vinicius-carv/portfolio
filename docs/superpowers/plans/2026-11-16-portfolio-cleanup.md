# Portfolio & GitHub Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide the stale Projects section on the site and tidy the public GitHub profile (privatize coursework, archive AI-Stocks, delete two forks, rewrite profile README).

**Architecture:** Static site (HTML/CSS/vanilla JS, no build, Vercel). Site work is a deletion plus `.vercelignore`. GitHub work runs through `gh` CLI; every remote-changing step is gated on an explicit user "yes" in chat.

**Tech Stack:** HTML, vanilla JS, `gh` CLI, Vercel static hosting.

**Spec:** `docs/superpowers/specs/2026-11-16-portfolio-cleanup-design.md`

## Global Constraints

- NEVER push or change anything on GitHub without an explicit "yes" from the user in the current session; deletion gets its own separate confirmation stating it is irreversible.
- Commit messages: Conventional Commits, English, ending with the attribution lines (`Generated with AI` / `Co-Authored-By: AI <ai@example.com>`).
- `git config user.email` must be checked before committing.
- Repos that stay public: `portfolio`, `vinicius-carv`. Nothing else is touched beyond the lists in Tasks 3–5.
- Keep `.repos` / `.more` CSS in `styles.css` — the section returns with doc-extract.

## Review Focus

1. Language toggle (pt ↔ en) after removing i18n keys — must switch all remaining strings with no console errors.
2. Old `#projetos` anchor links — page must load normally (lands at top); no broken nav item left behind.
3. Repos with stars/forks being made private — stars and forks are lost; Task 3 lists counts before the user confirms.
4. `gh` token lacking `delete_repo` scope — Task 5 must stop and hand `gh auth refresh -h github.com -s delete_repo` to the user, not retry.
5. Vercel deploy still serves `index.html`, `main.js`, `styles.css`, `img/`, `favicon.svg` after `.vercelignore` — only `docs/` excluded.

---

### Task 1: Remove Projects section from the site

**Files:**
- Modify: `index.html:35` (nav link `#projetos`), `index.html:155-164` (whole `<section id="projetos">`)
- Modify: `main.js:28` (drop `"nav.proj"`), `main.js:58-59` (drop `"h.proj"`, `"repo.all"`), `main.js:101-126` (delete `repos()` IIFE); also drop `repo.aistocks` key if present anywhere
- Create: `.vercelignore` containing `docs/`

- [ ] **Step 1:** Delete the nav link, the section, the `repos()` block and the four i18n keys listed above. `grep -n "proj\|repo" index.html main.js` → only `exp.2.a` (article repository) remains.
- [ ] **Step 2:** Create `.vercelignore` with the single line `docs/`.
- [ ] **Step 3: Verify in preview.** Start the static server (`python -m http.server 5178`, via `.claude/launch.json` entry `portfolio`, created if missing: `runtimeExecutable: "python"`, `runtimeArgs: ["-m","http.server","5178"]`, `port: 5178`). Checks:
  - `document.getElementById("projetos") === null` and nav has exactly 2 links (Experiência, Contato).
  - Network list has no request to `api.github.com`.
  - Toggle language to en and back: all nav/heading strings switch, `read_console_messages` onlyErrors → empty.
  - Load `/#projetos`: page renders, no errors.
  - Screenshot of top + bottom of page as proof.
- [ ] **Step 4: Commit** `feat: hide projects section until curated projects ship` (files: `index.html`, `main.js`, `.vercelignore`). No push.

### Task 2: Draft profile README

**Files:**
- Create: `docs/superpowers/drafts/profile-README.md` (local draft; excluded from Vercel by Task 1)

- [ ] **Step 1:** Write the draft. Content fixed by spec: English-first; one pt-BR line; no email, no gifs; headline "Full-stack developer in Brasília — Java, Spring Boot, Liferay, React, React Native, LLM integration"; link to `https://vinicius-carv.com.br`; one compact stack line; a `## Projects` heading with an HTML comment `<!-- filled as projects ship -->` and no items.
- [ ] **Step 2:** Show the draft to the user; apply their edits.
- [ ] **Step 3 (after explicit "yes"):** Replace README in `vinicius-carv/vinicius-carv`: `gh api -X PUT repos/vinicius-carv/vinicius-carv/contents/README.md` with base64 content, current `sha`, message `docs: rewrite profile README`. Verify: `gh api repos/vinicius-carv/vinicius-carv/readme --jq .sha` differs from the old sha.

### Task 3: Make 19 coursework repos private

Repos: site-pessoal, desafio-target-sistemas, angular-basic, progWeb, AI-Learning, atividade-avaliativa-2, estudos-django, Basic-Java, e-shop, prog-web, React, Estudos-JS-React, calculadora-web, python-html-css, prova-3, Ciencia-da-Computacao, python_college, swiftbank, student-control.

- [ ] **Step 1:** Print `name | stars | forks` for each (`gh repo view <r> --json stargazerCount,forkCount`); show the user any repo with stars or forks > 0.
- [ ] **Step 2 (after explicit "yes"):** For each: `gh repo edit vinicius-carv/<r> --visibility private --accept-visibility-change-consequences`.
- [ ] **Step 3: Verify:** `gh repo list vinicius-carv --visibility public --json name --jq '.[].name'` → exactly: portfolio, vinicius-carv, AI-Stocks, desafio-junior-backend-simplify, live-build (the last three handled in Tasks 4–5).

### Task 4: Archive AI-Stocks

- [ ] **Step 1 (after explicit "yes"):** Prepend to `vinicius-carv/AI-Stocks` README via `gh api -X PUT .../contents/README.md`: `> **Archived** — learning project from 2024, not maintained.` followed by a blank line and the existing README. Message `docs: mark project as archived`.
- [ ] **Step 2:** `gh repo archive vinicius-carv/AI-Stocks --yes`.
- [ ] **Step 3: Verify:** `gh repo view vinicius-carv/AI-Stocks --json isArchived` → `true`; README first line is the note.

### Task 5: Delete two forks (irreversible)

- [ ] **Step 1:** Ask the user separately, naming both repos and stating deletion cannot be undone; user may keep `live-build`.
- [ ] **Step 2:** `gh auth status` — if `delete_repo` scope missing, stop and ask the user to run `gh auth refresh -h github.com -s delete_repo` themselves.
- [ ] **Step 3 (after explicit "yes"):** `gh repo delete vinicius-carv/desafio-junior-backend-simplify --yes` (and `live-build` if approved).
- [ ] **Step 4: Verify:** `gh repo view vinicius-carv/<r>` → "Could not resolve to a Repository".

### Task 6: Hand off manual steps

- [ ] **Step 1:** Tell the user (no tool can do these): enable "Include private contributions on my profile" (GitHub → Settings → Public profile); pin repos in the GitHub UI once new projects exist.
