// Run before paint on every page, including the standalone privacy and 404 pages.

// Safari and Chrome tint their own toolbars from this, so a page that switches theme without
// updating it leaves a bar in the old colour above the new one. It has to be a literal: this
// file runs before the stylesheets, so the tokens are not readable yet. Keep in step with
// --bg in experience.css.
window.THEME_COLOR = { dark: '#11191c', light: '#edf2f1' };

// The glass endpoints, as literals for the same reason THEME_COLOR is one: this file runs
// before the stylesheets, so --panel and --accent are not readable yet. Keep in step with
// --glass-rgb and --accent in experience.css.
window.GLASS = {
  dark:  { base: [28, 42, 46],    tint: [110, 205, 186] },
  light: { base: [247, 253, 250], tint: [24, 106, 92] }
};
window.GLASS_DEFAULT = { clear: 55, frost: 30, tint: 0 };

// Transparency, frost and tint are three independent axes, so they are stored and applied
// separately. Frost drives saturation as well: a thicker material carries more colour out of
// what is behind it, which is what stops a heavy blur reading as flat grey.
window.applyGlass = function (glass, theme) {
  var g = window.GLASS[theme] || window.GLASS.dark;
  var root = document.documentElement.style;
  var mix = [], i;
  for (i = 0; i < 3; i++) {
    mix.push(Math.round(g.base[i] + (g.tint[i] - g.base[i]) * (glass.tint / 100)));
  }
  root.setProperty('--glass-rgb', mix.join(' '));
  root.setProperty('--glass-a', String(Math.round((1 - 0.78 * glass.clear / 100) * 1000) / 1000));
  root.setProperty('--glass-frost', glass.frost + 'px');
  root.setProperty('--glass-sat', (100 + glass.frost * 2) + '%');
  if (window.updateGlassOptics) window.updateGlassOptics(glass);
};

window.readGlass = function () {
  var out = { clear: window.GLASS_DEFAULT.clear, frost: window.GLASS_DEFAULT.frost,
              tint: window.GLASS_DEFAULT.tint };
  var caps = { clear: 100, frost: 60, tint: 100 };
  Object.keys(out).forEach(function (k) {
    try {
      var v = JSON.parse(localStorage.getItem('acsl:glass-' + k));
      if (typeof v === 'number' && v >= 0 && v <= caps[k]) out[k] = v;
    } catch (e) { /* The default still works without storage. */ }
  });
  return out;
};

window.applyThemeColor = function (theme) {
  var tag = document.querySelector('meta[name="theme-color"]');
  if (tag) tag.setAttribute('content', window.THEME_COLOR[theme] || window.THEME_COLOR.dark);
};

(function () {
  var theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try {
    var saved = JSON.parse(localStorage.getItem('acsl:theme'));
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch (e) { /* The system preference still works without storage. */ }
  document.documentElement.dataset.theme = theme;
  window.applyThemeColor(theme);
  window.applyGlass(window.readGlass(), theme);
  // Standalone pages need the same saved accessibility settings, before their first paint.
  ['contrast', 'plain', 'bigtext', 'underline'].forEach(function (flag) {
    var on = false;
    try { on = JSON.parse(localStorage.getItem('acsl:a11y:' + flag)) === true; } catch (e) {}
    document.documentElement.dataset[flag] = on ? 'on' : 'off';
  });
})();
