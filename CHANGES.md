# Fifth sanity check: dialogs and accessibility

Branch: `experimental/guide-audit-fixes`
Base: `c8d65c4` on main
Date: September 5, 2026

- Confirmations now close when navigation leaves their page. Pending actions cannot reset a different editor or redirect back to an abandoned exam. Reusing the dialog ignores delayed close events from its previous question.
- An exam reaching its deadline closes the pending finish confirmation and shows the results.
- Keeping a saved exam after switching divisions restores the paper's original division, instead of repeatedly asking whether to discard it.
- “Larger text” now increases question text from 17px to 19px rather than shrinking it to 16px. Lesson text also grows to 18px.
- Saved contrast, transparency, text-size, and underline preferences apply before paint on every page, including privacy and 404 pages.
- The solution confirmation accurately describes viewing progress and preserves the explanation of independent completion. Dialog descriptions are associated with their screen-reader labels.

Six new browser regressions run on desktop and mobile. The existing content, generated-question, runtime, and programming-reference checks also pass. The 60-character explanation floor, compiler fallbacks, question bank, and independently opening hints are unchanged.

# Fourth sanity check: compiler fallbacks

Branch: `experimental/guide-audit-fixes`
Base: `51e5723` on `main`
Date: September 5, 2026

- Invalid Wandbox responses now reach a backup instead of becoming student runtime errors. Numeric zero exit statuses no longer turn compiler warnings into compilation failures.
- Compiler Explorer network failures and results that did not execute reach the next service. Timeout and truncation flags stop grading, including when the remaining output happens to match the expected answer.
- Judge0 queued, processing, and internal-error responses are treated as service failures. Its time-limit verdict produces a timeout. Compilation failures without diagnostic text still produce a compilation error.
- Judge0 receives the same explicit C++17 and optimization flags as the other runners.
- The driver notice follows edits immediately and clears after a manual repair. Canceling reset preserves saved code. The notice says the driver differs, since edited drivers are not necessarily older.
- Added regressions for these cases and for correcting a generated question while retaining its bookmark. All 20 desktop/mobile browser tests passed.
- Passed the full local verification chain: 210 machine-checked answers, seven verifier tests, 2,400 generated questions, runtime/proxy regressions, and all 24 programming references in three languages with 41 independent boundary cases. Generated files are current.
- Live smoke tests through the updated proxy passed for Python, Java, and C++ on both backups using newly written test programs. Wandbox still returned HTTP 500 during the check; its success and error response handling was tested with fixtures.

Runner status handling follows [Judge0's status definitions](https://ce.judge0.com/#statuses-and-languages-status) and [Compiler Explorer's result fields](https://github.com/compiler-explorer/compiler-explorer/blob/main/types/compilation/compilation.interfaces.ts).

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
