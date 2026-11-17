# Portfolio & GitHub cleanup — design

Date: 2026-11-16 · Size: small change · Step 1 of 4 (then doc-extract → liferay-claude-skills → mcp-brasil)

## Intent
The "Projects on GitHub" section shows whatever was pushed last (coursework from 2021–2023). Target audience: international remote roles and Brazilian companies. Goal: the site and GitHub profile show only finished, relevant work; clutter is hidden, not deleted, wherever possible.

## Goals / non-goals / anti-goals
- Goals: curated bilingual project list on the site; tidy public repo list; current profile README.
- Non-goals: building the new projects (separate designs); fixing AI-Stocks.
- Anti-goal: anything that looks unfinished ("coming soon", a one-item list, a placeholder card).

## Approaches
- **A. Static curated list (chosen).** Projects hard-coded in `index.html` with pt/en strings in the existing i18n table; the GitHub API fetch in `main.js` is removed. Chosen because the site is bilingual, GitHub descriptions are single-language, and 3–6 rarely-changing items do not need automation.
- B. Live fetch filtered by a `portfolio` topic — automatic, but single-language and still dependent on the API.
- C. Hybrid (live + translation overrides) — more code than six items justify.

## Site changes
1. Remove the `repos()` fetch block from `main.js` and the static fallback list from `index.html`.
2. Hide the Projects section entirely (remove the section and its nav link, if any) until at least two curated projects exist. Its markup returns with doc-extract, using the same `.repos` styles and i18n keys per project (`proj.<slug>.desc`).
3. Add `.vercelignore` with `docs/` so design docs are not served on the public site. *(my call)*

## GitHub changes (each executed only after explicit confirmation of this exact list)
- **Make private (reversible), 19 repos:** site-pessoal, desafio-target-sistemas, angular-basic, progWeb, AI-Learning, atividade-avaliativa-2, estudos-django, Basic-Java, e-shop, prog-web, React, Estudos-JS-React, calculadora-web, python-html-css, prova-3, Ciencia-da-Computacao, python_college, swiftbank, student-control.
- **Archive (read-only, stays public), 1 repo:** AI-Stocks, after adding a README note: "Archived — learning project from 2024, not maintained."
- **Delete (irreversible; forks cannot be made private), 2 repos:** desafio-junior-backend-simplify (employer's hiring challenge fork, 53 MB), live-build (university team fork) — the user may keep live-build.
- **Stay public:** portfolio, vinicius-carv.
- Note for the user: to keep the contribution graph intact, enable "Include private contributions on my profile" in GitHub profile settings.

## Profile README (`vinicius-carv/README.md`)
English-first, one pt-BR line, no email, no gifs. Contents: one-line headline (full-stack developer, Brasília, Java/Spring Boot/Liferay/React/React Native, LLM integration), link to the site, compact stack line, and a "Projects" list that starts empty and is filled as projects ship. Draft shown to the user before pushing.

## Manual (user)
- Pins: GitHub has no API for profile pins — user pins repos in the UI once new projects exist.

## Left to the builder
Exact README wording (draft for review), commit messages (repo convention: Conventional Commits, English).
