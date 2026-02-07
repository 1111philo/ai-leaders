# Content Principles — AI Leaders Lesson Enrichment

These principles encode the quality standards established during the Lesson 1.1 enrichment process. Every enriched lesson must meet these standards.

## Reference Implementation

**Lesson 1.1** (`src/content/lessons/1.1-fundamentals-how-ai-works.md`) is the gold standard. When in doubt, match its depth, voice, and structure.

## Audience

- High school students through ~25 year olds
- Self-paced, asynchronous — no instructor present
- Many are first-generation professionals
- Assume intelligence, not prior knowledge
- They learn from YouTube, Discord, and TikTok — not textbooks

## Voice & Tone

Channel the energy of **Fireship** and **3Blue1Brown**: conversational authority. You know the material cold and you're excited to explain it — but you never talk down.

### Do

- Use "you" and "we" — talk directly to the reader
- Lead with curiosity: "Here's what's actually going on..."
- Use contractions naturally (you're, it's, don't)
- Be specific and concrete — name tools, give real examples
- Use em dashes, short paragraphs, and rhythm variation
- Match a smart friend explaining something they're genuinely into

### Don't

- Sound like a textbook ("In this lesson, students will learn...")
- Use passive voice ("It should be noted that...")
- Hedge everything ("It could potentially be argued...")
- Use corporate/academic jargon ("leverage," "utilize," "facilitate")
- Write bullet-only sections — bullets support prose, not replace it
- Start with "In this lesson you will learn..." or any variant

## Structure Template

Every enriched lesson follows this skeleton:

```markdown
---
[enriched frontmatter — see below]
---

# [Lesson Title]

## Introduction
[Narrative hook — scenario, question, or contrast that pulls readers in.
2-3 paragraphs. No learning objectives listed here.]

## Core Concepts

### 1. [Concept Name]
[Analogy first, then explanation, then "why it matters."
Include a real example or scenario they'd recognize.
~200-400 words per concept.]

### 2. [Concept Name]
[Same pattern. Each concept builds on the last.]

### N. [Final Concept]
[...]

## Activities
[Numbered list, 3-5 activities. Each has a bold name and
clear instructions. These are things they DO, not read.]

## Assignment: [Descriptive Title]
[Specific deliverable with clear criteria.
Reference the Assessment tool for self-check.]
```

## Depth Targets

- **Total length**: 120-200 lines of markdown (~3,000-5,000 words)
- **Core concepts**: 4-6 per lesson, each substantial
- **Activities**: 3-5, hands-on and specific
- **Thin originals are ~40 lines** — enriched versions should be 4-5x longer

## Analogies & Examples

Every core concept needs at least one analogy drawn from the audience's world:

### Good Sources

- Group chats, Discord servers, social media feeds
- Video games (The Sims, Minecraft, multiplayer dynamics)
- Cooking, sports, music production
- Phone/app experiences they have daily
- YouTube, streaming, content creation

### Bad Sources

- Corporate workflows they've never experienced
- Academic papers or formal research
- Enterprise software (Salesforce, Jira, SAP)
- References that assume professional work history

### Analogy Pattern

1. **Introduce the analogy** — connect the familiar thing to the concept
2. **Extend it** — show where the analogy maps cleanly
3. **Break it** — acknowledge where the analogy stops working (this builds trust)

## Frontmatter Standards

Enriched lessons upgrade their frontmatter from thin CSV data to rich, specific content. Compare the thin 1.2 frontmatter to the enriched 1.1 frontmatter — the enriched version has:

- **learning_objective**: Expanded beyond the CSV one-liner to reflect actual lesson depth
- **enduring_understandings**: 4-6 numbered items, specific to what the lesson actually teaches
- **essential_questions**: 4-6 questions a student would genuinely ask
- **assessment_project**: Specific deliverable with analogies/concepts from the lesson
- **mastery_criteria**: 5-7 numbered items the AI tutor can actually grade against
- **activities**: 3-5 numbered items with enough detail to be actionable

All frontmatter values are strings. Multi-line values use `\n` separators within the string.

## Visual Standards

Each enriched lesson includes **3-5 images** that serve as cognitive anchors (not decoration).

### Image Specifications

- **Format**: WebP (converted from PNG via `cwebp -q 80`)
- **Location**: `/images/lessons/{id}/` (e.g., `/images/lessons/1.2/`)
- **Style**: Vintage educational comic — hand-drawn feel, warm muted tones, educational diagram energy. Consistent with 1.1's visual language.
- **Size**: Aim for <100KB per image after WebP conversion

### Markdown Pattern

Each image in the lesson follows this three-part pattern:

```markdown
![Descriptive alt text for screen readers.](/images/lessons/{id}/{filename}.webp)

*Extended text description — a full paragraph describing the visual in detail
for readers who can't see the image. This also serves as a caption.*
```

### What Makes a Good Illustration Spot

- Visualizes a mental model or analogy (not just repeats text)
- Appears at a cognitive transition point
- Would help a confused reader "get it"
- Maps an abstract concept to something concrete

### What to Avoid

- Decorative headers or dividers
- Screenshots of tools (they go stale)
- Stock photo style imagery
- More than 5 images (diminishing returns)

## Anti-Patterns Checklist

Before finalizing any enriched lesson, verify NONE of these appear:

- [ ] "In this lesson you will learn..." or any objectives-list opening
- [ ] Sections that are only bullet points with no prose
- [ ] Passive voice in explanations ("It can be observed that...")
- [ ] Concepts introduced with definitions before analogies
- [ ] Generic examples ("imagine a business scenario...")
- [ ] Ungrounded abstractions without concrete illustrations
- [ ] Frontmatter copy-pasted from CSV without enrichment
- [ ] Missing activities or single-line activity descriptions
- [ ] Assignment without specific deliverable criteria
