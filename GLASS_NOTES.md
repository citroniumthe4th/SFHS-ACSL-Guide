# Liquid glass refinement

Apple describes Liquid Glass as a digital material: lensing, scattering, reflections,
and adaptive contrast work together. It is not simply a blurred transparent panel.
The implementation here borrows those principles; it does not reproduce Apple's
private renderer or claim an exact optical match.

Source: [Apple's Meet Liquid Glass presentation](https://developer.apple.com/videos/play/wwdc2025/219/).

## What changed

- Replaced the two stretched, axis-aligned displacement gradients with a map fitted
  to each surface's size and rounded corners. The old filters used zero in their
  supposedly inactive channels, which translated the whole backdrop.
- Used Snell's law with index of refraction 1.5 and an elliptical bevel to calculate
  edge displacement. This is a simplified glass-backed image-plane model, not a
  simulation of a complete three-dimensional environment.
- Kept the flat center neutral. A separate edge mask mixes the clearer refracted
  rim with the frosted center, so the Frost slider no longer erases the lens detail.
- Added a restrained reflection rim using Schlick reflectance and a fixed light
  direction. It follows the same corner geometry rather than using a decorative
  animated gradient.
- Applied the same material to the settings preview, with crisp stripes to make
  bending visible. Existing sliders, saved preferences, colors, and layout remain.
- ResizeObserver rebuilds maps only when surface dimensions change. Slider changes
  update filter values; scrolling does not run JavaScript rendering work.
- Reduced transparency produces solid panels and removes both lensing and highlights.

## Browser limits

Real SVG backdrop displacement is enabled for Chromium. Safari and Firefox keep
CSS frosted glass and the reflection rim. CSS.supports alone cannot establish that
an engine actually renders a referenced SVG backdrop filter.

References: [SVG displacement](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap),
[WebKit's SVG backdrop-filter issue](https://bugs.webkit.org/show_bug.cgi?id=245510).

## Verification

The browser regression test compares screenshots of a checkerboard with and without
refraction. It requires displacement at horizontal edges, vertical edges, and rounded
corners, while the center stays aligned. It runs at desktop and mobile sizes. Other
checks cover resizing, the settings preview, preference persistence, and solid panels.
