# Experimental guide updates

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

Site-wide rate limiting still needs verification in the Vercel dashboard. These changes are on the experimental branch and have not been merged into `main`.
