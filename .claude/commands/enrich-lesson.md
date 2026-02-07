# Enrich Lesson: $ARGUMENTS

You are the lesson enrichment orchestrator for AI Leaders. You manage a multi-phase pipeline that transforms thin, auto-generated lesson skeletons into rich, engaging educational content matching the quality of Lesson 1.1.

## Phase 0: Parse & Load

### Parse the lesson ID from the argument

The argument is a lesson ID like `1.2`, `0.3`, `2.1`, etc.

If no argument or an invalid ID is provided, list available lessons by reading the filenames in `src/content/lessons/` and ask the user to pick one.

### Load context files

Read all of these:

1. **CSV row**: Read `knowledge/course_map.csv`, find the row matching the lesson ID
2. **Thin lesson**: Read the existing file from `src/content/lessons/` matching the ID
3. **Previous lesson**: The lesson file with the preceding ID (e.g., 1.1 for 1.2). If this is the first in a domain (e.g., 1.1), check the last lesson of the previous domain.
4. **Next lesson**: The lesson file with the following ID. If last in domain, note it.
5. **Content principles**: Read `knowledge/content-principles.md`
6. **Gold standard**: Read `src/content/lessons/1.1-fundamentals-how-ai-works.md`

### Verify the lesson needs enrichment

Compare the thin lesson's size/depth to 1.1. If the lesson is already enriched (comparable length and depth to 1.1), inform the user and ask if they want to proceed anyway.

### Present summary to user

Show:
- Lesson ID, title, domain, progression
- CSV data quality (which fields have real data vs. stubs)
- Current lesson length vs. target
- Previous/next lesson context

## Phase 1: Choose Mode

Ask the user:

> **How would you like to run this enrichment?**
>
> **Mode 1 — Full Auto**: I'll run the complete pipeline (research → draft → critique → visual planning) and present the final result for your review.
>
> **Mode 2 — Guided**: I'll pause after research to share what I found and ask your input before drafting. Better when you have specific ideas about the lesson's direction.

## Phase 2: Research

Spawn the **lesson-researcher** agent with all loaded context.

The researcher will produce:
- CSV data quality assessment
- Gap analysis (covered / thin / missing concepts)
- Analogy brainstorm for each concept
- Continuity notes (previous/next lesson connections)
- Draft frontmatter

**Important**: The research output is the foundation for all subsequent phases. Pass it in full to each agent that follows — don't summarize or truncate it.

**Mode 2 only**: Present the research findings to the user. Ask:
- "Do these gaps look right? Anything I'm missing or overemphasizing?"
- "Any of these analogies resonate? Want me to pursue specific ones?"
- "Any topics you specifically want included or excluded?"

Incorporate user feedback before proceeding.

## Phase 3: Draft

Spawn the **lesson-writer** agent with:
- The full research output text (from Phase 2)
- User guidance (from Mode 2, if applicable)
- Content principles
- Gold standard reference

The writer produces a complete enriched lesson draft. Have the writer write it directly to the lesson file at `src/content/lessons/{id}-{slug}.md`.

## Phase 4: Critique

Spawn the **lesson-critic** agent with:
- The writer's draft (have the critic read the lesson file the writer just wrote)
- Research output
- Content principles
- Gold standard reference

The critic produces:
- Revised lesson (with all fixes applied)
- Coverage checklist
- Change log

## Phase 5: Visual Planning

Spawn the **visual-planner** agent with:
- The critic's revised lesson (have the planner read the lesson file)
- Content principles
- Gold standard reference

The visual planner produces:
- Image inventory (3-5 images)
- Full specifications for each (alt text, description, generation prompt)
- Ready-to-embed markdown that **replaces** the writer's placeholder image blocks

After the visual planner returns, update the lesson file: replace each placeholder image block (the `![Placeholder...` lines and the `*Placeholder:...` descriptions) with the visual planner's finalized markdown embeds.

## Phase 6: Present Results

Show the user everything:

### Summary
- Lesson title and ID
- Word count / line count comparison (thin → enriched)
- Number of core concepts, activities, images planned

### Coverage Checklist
- From the critic's output — every mastery criterion mapped to content

### Change Log
- From the critic's output — what was revised and why

### Image Plan
- From the visual planner — image names, purposes, and where they go

### The Full Lesson
- The complete enriched markdown (critic's revised version with visual planner's image embeds inserted)

Ask: **"Ready to write this to the file? Or want me to revise anything first?"**

## Phase 7: Write Files

On user approval:

1. **Create image directory**:
   ```bash
   mkdir -p public/images/lessons/{id}
   ```

2. **Write the enriched lesson** to `src/content/lessons/{id}-{slug}.md`, replacing the thin version

3. **Write image prompts** to a reference file at `public/images/lessons/{id}/prompts.md` containing all generation prompts from the visual planner (so the user can generate images outside this session)

4. **Inform the user**:
   > Lesson file written. Image directory created at `public/images/lessons/{id}/`.
   >
   > **Next steps — image generation:**
   > 1. Use the prompts in `public/images/lessons/{id}/prompts.md` to generate images
   > 2. Save generated images as PNG to that directory
   > 3. Come back and run the image optimization step below

## Phase 8: Image Optimization (when user returns with images)

When the user indicates images are ready:

1. **List PNGs** in the image directory
2. **Convert each to WebP**:
   ```bash
   cwebp -q 80 {filename}.png -o {filename}.webp
   ```
3. **Verify file sizes** — flag any over 200KB
4. **Update the lesson markdown** — replace placeholder image paths with final WebP paths if needed
5. **Clean up** — remove PNG originals (after confirming with user)

## Phase 9: Commit & PR

Ask the user if they want to commit and create a PR.

If yes:

1. **Create branch**:
   ```bash
   git checkout -b content/enrich-lesson-{id}-{slug}
   ```

2. **Stage files**:
   - The enriched lesson markdown
   - Image files (WebP)
   - Image prompts file

3. **Commit**:
   ```
   Enrich Lesson {id}: {title}

   - Expanded from ~{old_lines} to ~{new_lines} lines
   - Added {N} core concepts with analogies and examples
   - Added {N} hands-on activities
   - Added {N} educational illustrations
   - Enriched frontmatter for AI tutor grading
   ```

4. **Push and create PR** using `gh pr create`

## Error Handling

- If a lesson file doesn't exist for the given ID, list available lessons and ask the user to pick
- If the CSV row is completely empty (just a title), note this prominently in Phase 0 — the researcher will need to work harder
- If cwebp is not installed, inform the user: `brew install webp`
- If any agent produces output that seems off, present it to the user with your concerns rather than silently passing it through
