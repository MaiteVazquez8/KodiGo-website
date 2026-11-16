/* ============================================================
   KODIGO — main.js
   Interacciones vanilla: navbar sticky, menú móvil, scroll-spy,
   aparición al hacer scroll, tabs del recorrido, galería con
   lightbox y consola del CTA. Sin dependencias.
   ============================================================ */
'use strict';

var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(function () {
  initYear();
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initReveal();
  initRecorridoTabs();
  initGallery();
  initLightbox();
  initTypedTerminal();
});

/* ---------- Año del footer ---------- */
function initYear() {
  var year = document.getElementById('footer-year');
  if (year) year.textContent = String(new Date().getFullYear());
}

/* ---------- Navbar: estado sticky al hacer scroll ---------- */
function initNavbar() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  var update = function () {
    navbar.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------- Menú móvil ---------- */
function initMobileMenu() {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  var navbar = document.getElementById('navbar');
  if (!toggle || !links || !navbar) return;

  var setOpen = function (open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    navbar.classList.toggle('nav-open', open);
    document.body.classList.toggle('no-scroll', open);
  };

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Cerrar al tocar un enlace, al presionar Escape o al hacer clic fuera
  links.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setOpen(false);
  });
  document.addEventListener('click', function (event) {
    if (!navbar.contains(event.target)) setOpen(false);
  });
  // Al volver a escritorio, garantizar que el estado móvil se resetee
  window.matchMedia('(min-width: 981px)').addEventListener('change', function (event) {
    if (event.matches) setOpen(false);
  });
}

/* ---------- Scroll-spy: enlace activo según sección visible ---------- */
function initScrollSpy() {
  var spyLinks = document.querySelectorAll('.nav-links a[data-spy]');
  if (!spyLinks.length || !('IntersectionObserver' in window)) return;

  var bySection = {};
  spyLinks.forEach(function (link) {
    bySection[link.getAttribute('data-spy')] = link;
  });

  var setActive = function (id) {
    spyLinks.forEach(function (link) {
      var active = link.getAttribute('data-spy') === id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  Object.keys(bySection).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  // En el hero no hay enlace activo
  var hero = document.getElementById('inicio');
  if (hero) {
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(null);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    ).observe(hero);
  }
}

/* ---------- Aparición sutil al hacer scroll ---------- */
function initReveal() {
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.hero-copy > *, .hero-stage > *, .eyebrow, .section-title, .lead, .body-text, ' +
      '.pillars li, .lema, .catalog-panel, .recorrido-tab, .recorrido-stage, ' +
      '.bcell, .shot, .galeria-head, .galeria-note, .benefit, .beneficios-aside, ' +
      '.cta-inner > *'
  );

  var index = 0;
  targets.forEach(function (node) {
    node.classList.add('reveal');
    node.style.setProperty('--reveal-delay', (index % 4) * 70 + 'ms');
    index += 1;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  targets.forEach(function (node) {
    observer.observe(node);
  });

  // Red de seguridad: si por cualquier motivo el observador no dispara
  // (p. ej. capturas de página completa), revelar todo tras 1.5 s.
  window.setTimeout(function () {
    targets.forEach(function (node) {
      node.classList.add('is-visible');
    });
  }, 1500);
}

/* ---------- Recorrido: tabs accesibles con autoplay ---------- */
function initRecorridoTabs() {
  var tablist = document.getElementById('recorrido-tabs');
  if (!tablist) return;

  var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.recorrido-panel'));
  var AUTOPLAY_MS = 7000;
  var timer = null;
  var userPaused = false;

  var activate = function (tab, moveFocus) {
    tabs.forEach(function (item) {
      var selected = item === tab;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(function (panel) {
      var match = panel.getAttribute('data-panel') === tab.getAttribute('data-tab');
      panel.classList.toggle('is-active', match);
      panel.hidden = !match;
    });
    if (moveFocus) tab.focus();
  };

  var activateByIndex = function (index, moveFocus) {
    var next = (index + tabs.length) % tabs.length;
    activate(tabs[next], moveFocus);
  };

  var stopAutoplay = function () {
    if (timer) window.clearInterval(timer);
    timer = null;
  };
  var startAutoplay = function () {
    if (prefersReducedMotion.matches || userPaused) return;
    stopAutoplay();
    timer = window.setInterval(function () {
      var current = tabs.findIndex(function (tab) {
        return tab.classList.contains('is-active');
      });
      activateByIndex(current + 1, false);
    }, AUTOPLAY_MS);
  };

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      activate(tab, false);
      startAutoplay(); // reiniciar el ciclo tras interacción
    });
    tab.addEventListener('keydown', function (event) {
      var target = null;
      if (event.key === 'ArrowRight') target = index + 1;
      else if (event.key === 'ArrowLeft') target = index - 1;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      if (target !== null) {
        event.preventDefault();
        activateByIndex(target, true);
        startAutoplay();
      }
    });
  });

  // Pausar al interactuar con el puntero o con el teclado dentro del recorrido
  var recorrido = tablist.closest('.recorrido');
  if (recorrido) {
    recorrido.addEventListener('pointerenter', function () {
      userPaused = true;
      stopAutoplay();
    });
    recorrido.addEventListener('pointerleave', function () {
      userPaused = false;
      startAutoplay();
    });
    recorrido.addEventListener('focusin', stopAutoplay);
    recorrido.addEventListener('focusout', startAutoplay);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  startAutoplay();
}

/* ---------- Galería horizontal con progreso y contador ---------- */
function initGallery() {
  var track = document.getElementById('galeria-track');
  if (!track) return;

  var prev = document.getElementById('galeria-prev');
  var next = document.getElementById('galeria-next');
  var fill = document.getElementById('galeria-progress');
  var currentOut = document.getElementById('galeria-current');
  var totalOut = document.getElementById('galeria-total');
  var shots = Array.prototype.slice.call(track.querySelectorAll('.shot'));
  var total = shots.length;
  if (totalOut) totalOut.textContent = String(total);

  var step = function () {
    var first = shots[0];
    if (!first) return track.clientWidth;
    var gap = parseFloat(window.getComputedStyle(track).columnGap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  };

  var update = function () {
    var maxScroll = Math.max(1, track.scrollWidth - track.clientWidth);
    var ratio = track.scrollLeft / maxScroll;
    if (fill) fill.style.transform = 'scaleX(' + Math.min(1, Math.max(0.06, ratio)) + ')';
    var index = Math.round(track.scrollLeft / step()) + 1;
    index = Math.min(total, Math.max(1, index));
    if (currentOut) currentOut.textContent = String(index);
    if (prev) prev.disabled = track.scrollLeft <= 4;
    if (next) next.disabled = track.scrollLeft >= maxScroll - 4;
  };

  var scrollByStep = function (direction) {
    track.scrollBy({ left: direction * step(), behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
  };

  if (prev) prev.addEventListener('click', function () { scrollByStep(-1); });
  if (next) next.addEventListener('click', function () { scrollByStep(1); });

  // Flechas del teclado cuando la galería tiene el foco
  track.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollByStep(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollByStep(1);
    }
  });

  var raf = null;
  track.addEventListener(
    'scroll',
    function () {
      if (raf) return;
      raf = window.requestAnimationFrame(function () {
        raf = null;
        update();
      });
    },
    { passive: true }
  );
  window.addEventListener('resize', update);
  update();
}

/* ---------- Lightbox con <dialog> nativo ---------- */
function initLightbox() {
  var dialog = document.getElementById('lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var img = document.getElementById('lightbox-img');
  var caption = document.getElementById('lightbox-caption');
  var closeBtn = document.getElementById('lightbox-close');
  var lastTrigger = null;

  var open = function (figure, trigger) {
    var source = figure.querySelector('img');
    if (!source || !img) return;
    lastTrigger = trigger || null;
    img.src = source.getAttribute('src');
    img.alt = source.getAttribute('alt') || '';
    if (caption) caption.textContent = figure.getAttribute('data-caption') || '';
    dialog.showModal();
    if (closeBtn) closeBtn.focus();
  };

  document.querySelectorAll('.shot').forEach(function (figure) {
    var button = figure.querySelector('.shot-btn');
    if (button) {
      button.addEventListener('click', function () {
        open(figure, button);
      });
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      dialog.close();
    });
  }
  // Cerrar al hacer clic en el fondo (el rectángulo del diálogo, no su contenido)
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', function () {
    if (lastTrigger) lastTrigger.focus();
  });
}

/* ---------- Consola del CTA: línea tipeada ---------- */
function initTypedTerminal() {
  var out = document.getElementById('cta-typed');
  if (!out) return;
  var full = 'kodigo start --desde-cero';

  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    out.textContent = full;
    return;
  }

  out.textContent = '';
  var started = false;

  var type = function () {
    var i = 0;
    var tick = function () {
      i += 1;
      out.textContent = full.slice(0, i);
      if (i < full.length) window.setTimeout(tick, 38);
    };
    tick();
  };

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !started) {
          started = true;
          type();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  var band = document.getElementById('comenzar');
  if (band) observer.observe(band);
}
