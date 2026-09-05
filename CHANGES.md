# Third sanity check

Branch: `experimental/guide-audit-fixes`
Base: `fc13e2f` on `main`
Date: September 5, 2026

## Bugs and question corrections

- **lp-05:** Removed a second correct answer. ACSL treats `NIL` and `()` as the same empty list; the replacement distractor is `(())`.
- **pp-07:** Corrected `8 3 - 2 /` from 2 to **2.5**. No integer division was specified. The postfix checker now preserves fractions too.
- **as-08:** Replaced a question that assumed unassigned memory starts at zero. The new question initializes memory with `DC` and tests the distinction between that memory and the accumulator.
- C++ input drivers now trim and skip whitespace-only lines consistently with Python and Java. All three drivers reject incomplete parameter groups instead of silently dropping them. Existing saved student code is preserved; the updated drivers appear in fresh templates and reference solutions.
- Returning to bookmarks or missed review rebuilds the question list when its membership changes.
- Clicking an answer after a mock exam's deadline submits the exam without saving that late answer, even if the timer callback has been delayed.

## Verification

- Added 41 independently derived boundary expectations across all 24 programming problems. Python, Java, and C++ all pass them, along with the existing samples and tests.
- Added driver checks for whitespace, CRLF input, parameter order, multiple cases, missing final newlines, and incomplete cases in all three languages.
- Strengthened question verification to reject equivalent LISP choices, unsupported LISP functions, and reads of uninitialized assembly memory.
- Passed 210 machine-checked bank answers, seven verifier regression tests, 2,400 generated-question checks, and the existing runtime checks, including 160 mock exams.
- All 16 desktop/mobile browser tests passed, including completed-exam grading, explanation colors, bookmark removal, and delayed timers.
- These checks run through the existing CI workflow. The intentional 60-character explanation floor is unchanged.

Question corrections follow the official ACSL wiki references for [LISP](https://www.categories.acsl.org/wiki/index.php?title=LISP), [prefix/infix/postfix notation](https://www.categories.acsl.org/wiki/index.php?title=Prefix%2FInfix%2FPostfix_Notation), and [assembly](https://www.categories.acsl.org/wiki/index.php?title=Assembly_Language_Programming).

# Second audit updates

Branch: `experimental/guide-audit-fixes`
Base: `345a893` on `main`
Date: September 5, 2026

## Corrections

- Replaced answer checks that returned the first option by position. Matching checks now require one valid choice, and regression tests cover altered answer text, equivalent distractors, and reordered choices.
- Added an explicit kind to every bank question. Mock exams select practice problems independently of whether a machine checker exists, excluding concept checks and extensions.
- Corrected the prefix operand-order checklist, assembly label rules and loop explanation, and generated graph terminology. Removed remaining unsupported claims about common mistakes.
- Corrected misleading Minesweeper queue advice, a square-root warning, and Tetris parsing guidance.
- Preserved independent completion when a student views a solution after solving. Solving after viewing is recorded separately, with migration for existing progress.
- Kept the explanation-length floor at **60 characters**.

## Study tools

- Full-text lesson search across both divisions.
- Individual question links, bookmarks, and reproducible generated questions in missed review.
- Two hints for each of the 24 programming problems, plus a mobile Jump to editor link.
- Local JSON export/import for code and progress. Imports validate every entry before writing and roll back previous values if a write fails.
- Six new visual problems covering circuits, graph adjacency, and tree insertion/deletion. The bank now has 229 questions. Two additional public-domain diagrams are reused with credits in the lessons and questions.

## Verification

- 210 machine-checked bank answers, 19 manually reviewed questions, and 2,400 generated-question checks.
- All 24 programming references cross-checked in Python, Java, and C++.
- Regression checks for grading, progress migration, imports, generated links, mock composition, and the runner proxy.
- Ten passing browser tests across desktop and mobile for search, bookmarks, missed review, hints, progress, backups, diagrams, and editor navigation.
- Added runnable browser tests. A GitHub Actions workflow is prepared locally in `.github/workflows/verify.yml`, but is not included in this push because the configured token lacks GitHub's `workflow` permission. It runs the same checks and detects stale generated files.

Site-wide rate limiting remains unverified in the Vercel dashboard. These changes do not configure a WAF rule.

## First audit, already merged

Branch: `experimental/guide-audit-fixes`
Implementation commit: `4e748ef`

## Content and writing

- Revised all 16 lessons to make explanations more direct and remove unsupported claims about timing, difficulty, and common mistakes.
- Corrected worked examples and ACSL conventions, including graph terminology, operator precedence, array tracing, and LISP behavior.
- Added official ACSL topic links and clarified that this is an independent guide for Junior and Senior divisions.

## Practice and grading

- Fixed ambiguous questions and explanations that depended on question or answer order.
- Corrected Digit Chain so starting at 1 takes zero replacements in all three reference solutions.
- Added four diagram-based questions, bringing the bank to 223 questions.
- Added question IDs and issue-report links. New mock exams exclude designated concept checks and extension questions.
- Prevented crashes or extra output from counting as successful submissions. Delayed results can no longer update another problem or editor session.

## Design and accessibility

- Added lesson contents links, a practice shortcut, and narrower reading columns.
- Enabled the editor on mobile with a wrapping toolbar.
- Improved editor contrast, keyboard escape, and accessible exam selection and navigation.
- Added three existing diagrams with alt text, source credits, and reuse licenses. Details are in [diagram credits](public/assets/diagrams/ATTRIBUTION.md).

## Runner and verification

- Limited upstream responses before parsing, discarded error bodies, and clarified timeout messages.
- Passed checks for 204 computable bank answers, 2,400 generated questions, all 24 programming references in Python, Java, and C++, and grading and request-isolation regressions.
- Checked responsive layouts, diagram loading, keyboard focus, and section links in the browser.

The first audit was merged into `main`. The second audit above starts from `345a893`, preserving the intentional 60-character explanation floor and the footer email invitation.
