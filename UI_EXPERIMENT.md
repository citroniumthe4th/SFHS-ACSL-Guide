# UI experiment

Branch: `UI-experiment` (Git branch names cannot contain spaces).
Base: `cdf9f9b` from main, including the compiler/base64 updates.

## Design

- Keep the floating glass toolbar, with visible selection and keyboard focus states.
- Use a solid background with faint floating CS symbols. No gradient backdrop or promotional hero; the guide opens directly to its topics and search.
- Group the guide into contest rows. Give lessons a quiet reading surface and practice collections real progress bars.
- Apply the same spacing, typography, controls, and colors to practice, mock exams, bookmarks, programming, privacy, and error pages.
- Keep the editor stable and opaque. Its toolbar wraps on narrow screens, and the divider disappears when the panes stack.
- Honor system light/dark preferences on first visit and saved preferences afterward, including standalone pages.
- Allow background motion to be paused; honor system reduced-motion and reduced-transparency preferences. Glass has a solid fallback where backdrop blur is unavailable.
- Make wide lesson tables scroll locally with keyboard access on small phones.

The material effect is a native CSS approximation of frosted glass, not Apple's proprietary Liquid Glass implementation. No new runtime dependencies, external fonts, or image assets were added.

## Verification

The local content, generator, runtime, and programming-reference checks pass. Browser checks cover study behavior, both themes, motion preferences, navigation contrast, responsive layouts, and wide tables. Desktop and mobile screenshots were visually reviewed; additional widths from 320 to 1280 pixels were checked. Safari was not run locally.

The existing GitHub Actions workflow runs on main and `experimental/**`, so it does not automatically run on this branch. Main is unchanged.

## Files

- `public/experience.css`: the experiment's visual layer over the existing component styles.
- `public/appearance.js`: theme initialization before paint.
- `public/app.js`: compact guide layout, progress indicators, motion controls, and table containment.
- `content/browser/appearance.spec.js`: UI regressions.

Preview locally with `python3 server.py 8779`, then open `http://127.0.0.1:8779/guide`.
