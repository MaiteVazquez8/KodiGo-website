/* ============================================================
   lucide-lite.js — Iconos SVG inline de estilo Lucide
   Sustituye <i data-lucide="nombre"></i> por SVG inline.
   Sin dependencias externas ni peticiones adicionales.
   ============================================================ */
(function () {
  'use strict';

  var ICONS = {
    ghost:
      '<path d="M12 2.5a7.5 7.5 0 0 0-7.5 7.5v11.2c0 .5.6.8 1 .5l2-1.8 2.3 2a1.3 1.3 0 0 0 1.7 0l1.7-1.6 1.7 1.6a1.3 1.3 0 0 0 1.7 0l2.3-2 2 1.8c.4.3 1 0 1-.5V10A7.5 7.5 0 0 0 12 2.5z"/><path d="M9.5 10.5h.01"/><path d="M14.5 10.5h.01"/>',
    zap: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>',
    'shield-check':
      '<path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    flame:
      '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    'graduation-cap':
      '<path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8"/><path d="M22 9v5"/>',
    layers:
      '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>',
    lock:
      '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'list-checks':
      '<path d="m3 6 1.5 1.5L7 5"/><path d="m3 12 1.5 1.5L7 11"/><path d="m3 18 1.5 1.5L7 17"/><path d="M11 6h10"/><path d="M11 12h10"/><path d="M11 18h10"/>',
    route:
      '<circle cx="6" cy="19" r="2.3"/><circle cx="18" cy="5" r="2.3"/><path d="M8.3 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.7"/>',
    'code-2':
      '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    'chart-column':
      '<path d="M3 3v18h18"/><path d="M8 17v-6"/><path d="M13 17V8"/><path d="M18 17v-3"/>',
    trophy:
      '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4.5a2 2 0 0 0 2 4H7"/><path d="M17 6h2.5a2 2 0 0 1-2 4H17"/>',
    users:
      '<path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'book-open-text':
      '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/><path d="M6 8.5h2"/><path d="M6 12h2"/>',
    rocket:
      '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1 0-2.9a2.2 2.2 0 0 0-3 0z"/><path d="m12 15-3-3a22 22 0 0 1 2-4 12.9 12.9 0 0 1 11-6c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1 5 0 5 0"/><path d="M12 15v5s3-.6 4-2c1-1.6 0-5 0-5"/>',
    download:
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    package:
      '<path d="M16.5 9.4 7.5 4.2"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>',
    shield:
      '<path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z"/>',
    'alert-triangle':
      '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    info:
      '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    check:
      '<path d="M20 6 9 17l-5-5"/>',
    copy:
      '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    smartphone:
      '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M12 18h.01"/>',
    wifi:
      '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>',
    bot:
      '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>'
  };

  function buildIcon(name) {
    var body = ICONS[name];
    if (!body) return null;
    return (
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      body +
      '</svg>'
    );
  }

  var nodes = document.querySelectorAll('[data-lucide]');
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    var svg = buildIcon(el.getAttribute('data-lucide'));
    if (!svg) continue;
    var temp = document.createElement('span');
    temp.innerHTML = svg;
    var icon = temp.firstChild;
    // Heredar el tamaño definido por CSS en el placeholder
    if (el.className) icon.setAttribute('class', icon.getAttribute('class') + ' ' + el.className);
    el.replaceWith(icon);
  }
})();
