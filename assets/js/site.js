/* HOA Start static preview — minimal, first-party only. No trackers, no analytics. */
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
  }

  // Mobile: tap a dropdown parent to expand it (desktop uses hover)
  document.querySelectorAll('.nav-item > a .caret').forEach(function (caret) {
    caret.parentElement.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) { e.preventDefault(); }
    });
  });

  // Click-to-load facades for third-party embeds (video, maps) — nothing loads until asked
  document.querySelectorAll('.media-facade[data-embed]').forEach(function (el) {
    el.addEventListener('click', function () {
      var src = el.getAttribute('data-embed');
      var iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      el.innerHTML = '';
      el.appendChild(iframe);
    });
  });

  // Static forms route to the app — prevent silent no-op submits
  document.querySelectorAll('form[data-app-redirect]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = form.getAttribute('data-app-redirect');
    });
  });

  // Mark active nav item by URL
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(function (a) {
    if (a.getAttribute('href') === here) { a.style.color = 'var(--hs-primary-dark)'; }
  });
})();
