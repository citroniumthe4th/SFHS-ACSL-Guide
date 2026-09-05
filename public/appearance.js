// Run before paint on every page, including the standalone privacy and 404 pages.

// Safari and Chrome tint their own toolbars from this, so a page that switches theme without
// updating it leaves a bar in the old colour above the new one. It has to be a literal: this
// file runs before the stylesheets, so the tokens are not readable yet. Keep in step with
// --bg in experience.css.
window.THEME_COLOR = { dark: '#11191c', light: '#edf2f1' };

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
})();
