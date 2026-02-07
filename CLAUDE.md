# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Leaders is a React/TypeScript web app that teaches AI and WordPress skills to help participants secure living-wage jobs. It features AI-powered application evaluation, an AI tutor for lessons, and a markdown-driven curriculum.

Deployed to GitHub Pages at aileaders.org. Repository: github.com/1111philo/ai-leaders

## Commands

- `npm run dev` — Start dev server (localhost:5173)
- `npm run build` — TypeScript check + Vite production build
- `npm run lint` — ESLint
- `npm run preview` — Preview production build locally

No test framework is configured.

## Environment Variables

Copy `.env.example` to `.env`. Set `VITE_DISABLE_GEMINI=true` to bypass the Gemini API and get mock responses during development. Similarly `VITE_DISABLE_SLACK` and `VITE_DISABLE_GOOGLE_SHEETS` disable their respective integrations.

## Architecture

**Stack:** React 19, TypeScript (strict), Vite, Tailwind CSS 4, Framer Motion

**Routes** (defined in `src/App.tsx`):
- `/` — Landing page with application form
- `/lessons` — Curriculum listing with progress tracking
- `/lessons/:slug` — Individual lesson with AI tutor chat

**Key directories:**
- `src/services/` — External integrations (Gemini AI, Slack webhooks, Google Sheets)
- `src/components/` — UI components; `ApplicationForm.tsx` handles multi-stage applicant flow with AI evaluation
- `src/pages/` — Route-level components
- `src/hooks/useProgress.ts` — localStorage-based lesson progress tracking
- `src/content/lessons/` — Markdown lesson files with YAML frontmatter
- `knowledge/course_map.csv` — Source of truth for curriculum (25 competencies across 4 domains)
- `scripts/generate-lessons.js` — Generates lesson markdown from the CSV

**AI integration** (`src/services/ai.ts`): Uses Google Gemini 2.0 Flash Lite for three functions:
1. `analyzeApplication` — Scores applicants on curiosity, clarity, motivation, experience (0-100)
2. `chatWithLesson` — Context-aware AI tutor using lesson content and mastery criteria
3. `assessLessonWork` — Evaluates student submissions against mastery criteria

## Lesson Content System

Lessons are markdown files in `src/content/lessons/` loaded dynamically via Vite glob imports. Each lesson requires frontmatter fields: `id`, `title`, `domain`, `progression`, `learning_objective`, `enduring_understandings`, `essential_questions`, `assessment_project`, `mastery_criteria`, `activities`.

File naming convention: `X.X-short-description.md` (e.g., `1.1-fundamentals-how-ai-works.md`)

The four curriculum domains: Foundations, AI Leadership, WordPress, Success Skills.

When updating lessons, reference `knowledge/course_map.csv` as the canonical data source.

## Lesson Enrichment System

The enrichment system transforms thin auto-generated lesson skeletons into rich, engaging content. The gold standard is Lesson 1.1 (`src/content/lessons/1.1-fundamentals-how-ai-works.md`).

### Quick Start

```
/enrich-lesson 1.2
```

### How It Works

The `/enrich-lesson` command runs a sequential pipeline:

1. **Research** (lesson-researcher agent) — gap analysis, analogy brainstorm, continuity notes
2. **Draft** (lesson-writer agent) — complete enriched lesson following content principles
3. **Critique** (lesson-critic agent) — coverage audit + tone review → revised draft
4. **Visual Planning** (visual-planner agent) — 3-5 image specs with generation prompts

Two modes: **Full Auto** (runs all phases, presents final result) or **Guided** (pauses after research for user input).

### Key Files

| File | Purpose |
|------|---------|
| `knowledge/content-principles.md` | Style guide and quality standards |
| `knowledge/course_map.csv` | Source of truth for curriculum data |
| `.claude/commands/enrich-lesson.md` | Orchestrator slash command |
| `.claude/agents/lesson-researcher.md` | Research + gap analysis agent |
| `.claude/agents/lesson-writer.md` | Content drafting agent |
| `.claude/agents/lesson-critic.md` | Critique + revision agent |
| `.claude/agents/visual-planner.md` | Image specification agent |

### Branch Conventions

Enrichment branches: `content/enrich-lesson-{id}-{slug}` (e.g., `content/enrich-lesson-1.2-efficiency`)

### Image Pipeline

1. Visual planner generates prompts → saved to `public/images/lessons/{id}/prompts.md`
2. User generates images externally (AI image gen tool)
3. Optimize: `cwebp -q 80 image.png -o image.webp`
4. Images embed with alt text + italic text description (see content-principles.md)

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push to `main`. Uses Node 20 with npm.
