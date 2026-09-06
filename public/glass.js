/* A web lens inspired by Liquid Glass, not Apple's private renderer.
   Trace a normally incident ray through an elliptical bevel into a glass-backed image
   plane (IOR 1.5). The signed-distance normal follows the actual rounded rectangle.
   Only the backdrop is filtered. Controls remain ordinary, sharp DOM content. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var root = document.documentElement;
  // Parsing url() is not evidence that an engine renders SVG backdrop filters.
  // Keep the working CSS material in WebKit/Gecko until that rendering path is supported.
  var supported = /Chrome\/|Chromium\/|Edg\//.test(navigator.userAgent) &&
    CSS.supports('backdrop-filter', 'url(#glass-toolbar)');
  var surfaces = [];
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'glass-filter');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  document.body.appendChild(svg);

  function node(tag, attrs, parent) {
    var el = document.createElementNS(NS, tag);
    Object.keys(attrs).forEach(function (key) { el.setAttribute(key, attrs[key]); });
    parent.appendChild(el);
    return el;
  }
  function smooth(a, b, x) {
    var t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }
  function canvas(w, h) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    return c;
  }
  function maps(w, h, radius) {
    var map = canvas(w, h), mask = canvas(w, h), shine = canvas(w, h);
    var ctx = map.getContext('2d'), mctx = mask.getContext('2d'), sctx = shine.getContext('2d');
    var data = ctx.createImageData(w, h), alpha = mctx.createImageData(w, h);
    var light = sctx.createImageData(w, h);
    var bevel = Math.min(12, radius, h / 3), thickness = bevel * 1.5;
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
      var px = x + .5 - w / 2, py = y + .5 - h / 2;
      var qx = Math.abs(px) - (w / 2 - radius), qy = Math.abs(py) - (h / 2 - radius);
      var ex = Math.max(qx, 0), ey = Math.max(qy, 0), len = Math.hypot(ex, ey);
      var d = radius - (len + Math.min(Math.max(qx, qy), 0));
      var nx = len ? ex / len : (qx > qy ? 1 : 0);
      var ny = len ? ey / len : (qy >= qx ? 1 : 0);
      nx *= Math.sign(px); ny *= Math.sign(py);
      var shift = 0, edge = 0, reflection = 0;
      if (d >= 0 && d < bevel) {
        var u = d / bevel, arc = Math.sqrt(Math.max(.0001, 1 - (1 - u) * (1 - u)));
        var slope = thickness / bevel * (1 - u) / arc;
        var incidence = Math.atan(slope), transmitted = Math.asin(Math.sin(incidence) / 1.5);
        shift = thickness * arc * Math.tan(incidence - transmitted);
        edge = 1 - smooth(.35, 1, u);
        // Schlick reflectance, with a fixed upper-left light and a weaker opposite rim.
        var fresnel = .04 + .96 * Math.pow(1 - Math.cos(incidence), 5);
        var facing = Math.max(0, -.55 * nx - .83 * ny);
        reflection = (fresnel * .65 + .16 * Math.pow(facing, 4)) * (1 - smooth(0, 3, d));
      }
      var i = (y * w + x) * 4;
      // SVG samples input at output + displacement. Inward sampling expands the image
      // toward a convex rim. A flat center must have exactly zero displacement.
      data.data[i] = Math.round(128 - nx * shift * 255 / 32);
      data.data[i + 1] = Math.round(128 - ny * shift * 255 / 32);
      data.data[i + 2] = 128; data.data[i + 3] = 255;
      alpha.data[i] = alpha.data[i + 1] = alpha.data[i + 2] = 255;
      alpha.data[i + 3] = Math.round(edge * 255);
      light.data[i] = light.data[i + 1] = light.data[i + 2] = 255;
      light.data[i + 3] = Math.round(reflection * 255);
    }
    ctx.putImageData(data, 0, 0); mctx.putImageData(alpha, 0, 0); sctx.putImageData(light, 0, 0);
    return { displacement: map.toDataURL(), mask: mask.toDataURL(), light: shine.toDataURL() };
  }
  function attach(el, id) {
    if (!el) return;
    var filter = node('filter', { id: id, filterUnits: 'userSpaceOnUse',
      primitiveUnits: 'userSpaceOnUse', x: 0, y: 0, 'color-interpolation-filters': 'sRGB' }, svg);
    var displacement = node('feImage', { result: 'encoded', preserveAspectRatio: 'none' }, filter);
    var neutral = node('feComponentTransfer', { in: 'encoded', result: 'normals' }, filter);
    // PNG's 128 is slightly above 0.5. Remove that bias instead of shifting the center.
    ['R', 'G'].forEach(function (c) {
      node('feFunc' + c, { type: 'linear', slope: 1, intercept: -0.5 / 255 }, neutral);
    });
    var edgeBlur = node('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: .5, result: 'clear' }, filter);
    node('feDisplacementMap', { in: 'clear', in2: 'normals', scale: 32,
      xChannelSelector: 'R', yChannelSelector: 'G', result: 'refracted' }, filter);
    var frost = node('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: 30, result: 'frosted' }, filter);
    var mask = node('feImage', { result: 'edge', preserveAspectRatio: 'none' }, filter);
    node('feComposite', { in: 'refracted', in2: 'edge', operator: 'in', result: 'rim' }, filter);
    node('feComposite', { in: 'frosted', in2: 'edge', operator: 'out', result: 'center' }, filter);
    node('feComposite', { in: 'rim', in2: 'center', operator: 'arithmetic', k2: 1, k3: 1 }, filter);
    var surface = { el: el, id: id, filter: filter, frost: frost, edgeBlur: edgeBlur,
      displacement: displacement, mask: mask, size: '' };
    surfaces.push(surface);
    new ResizeObserver(function () { resize(surface); }).observe(el);
  }
  function resize(s) {
    var rect = s.el.getBoundingClientRect(), style = getComputedStyle(s.el);
    var w = Math.round(rect.width), h = Math.round(rect.height);
    if (!w || !h) return;
    var radius = Math.min(parseFloat(style.borderTopLeftRadius) || 0, w / 2, h / 2);
    var size = [w, h, radius].join(':');
    if (size === s.size) return;
    s.size = size;
    var images = maps(w, h, radius);
    s.filter.setAttribute('width', w); s.filter.setAttribute('height', h);
    [s.displacement, s.mask].forEach(function (el) {
      el.setAttribute('x', 0); el.setAttribute('y', 0);
      el.setAttribute('width', w); el.setAttribute('height', h);
    });
    s.displacement.setAttribute('href', images.displacement);
    s.mask.setAttribute('href', images.mask);
    s.el.style.setProperty('--glass-highlight', 'url("' + images.light + '")');
    // Do not swap the CSS fallback out while its replacement images are still decoding.
    Promise.all([images.displacement, images.mask].map(function (src) {
      var image = new Image(); image.src = src; return image.decode();
    })).then(function () {
      if (s.size === size && supported) s.el.style.setProperty('--glass-filter', 'url(#' + s.id + ')');
    }).catch(function () { /* Retain the CSS blur if a map cannot be decoded. */ });
  }
  window.updateGlassOptics = function (settings) {
    surfaces.forEach(function (s) {
      s.frost.setAttribute('stdDeviation', settings.frost);
      s.edgeBlur.setAttribute('stdDeviation', Math.min(1.2, settings.frost / 20));
    });
  };
  attach(document.querySelector('.topbar'), 'glass-toolbar');
  attach(document.querySelector('.glass-sample-chip'), 'glass-preview');
  window.updateGlassOptics(window.readGlass());
  root.dataset.glassOptics = supported ? 'refracted' : 'frosted';
})();
