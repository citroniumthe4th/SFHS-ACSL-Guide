// Run before paint on every page, including the standalone privacy and 404 pages.
(function () {
  var theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try {
    var saved = JSON.parse(localStorage.getItem('acsl:theme'));
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch (e) { /* The system preference still works without storage. */ }
  document.documentElement.dataset.theme = theme;
})();
