/* ============================================
HOME WITH AGU — MAIN JS
============================================ */

document.addEventListener('DOMContentLoaded', function () {

/* ------------------------------------------
Hero Photo Slideshow — rotating backgrounds
------------------------------------------ */
var heroSlides = document.querySelectorAll('.hero-slide');
var currentSlideIndex = 0;
var slideInterval = 6000; // 6 seconds per photo

if (heroSlides.length > 1) {
  setInterval(function () {
    var current = heroSlides[currentSlideIndex];
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    var next = heroSlides[currentSlideIndex];
    next.classList.add('active');
    current.classList.remove('active');
  }, slideInterval);
}

/* ------------------------------------------
Nav — scroll style
------------------------------------------ */
var nav = document.querySelector('nav');
window.addEventListener('scroll', function () {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
});

/* ------------------------------------------
Mobile menu toggle
------------------------------------------ */
var navToggle = document.querySelector('.nav-toggle');
var navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
}

/* ------------------------------------------
Scroll animations (Intersection Observer)
------------------------------------------ */
var animatedEls = document.querySelectorAll('.fade-in,.fade-left,.fade-right');
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  animatedEls.forEach(function (el) { observer.observe(el); });
} else {
  animatedEls.forEach(function (el) { el.classList.add('visible'); });
}

/* ------------------------------------------
Active nav highlighting
------------------------------------------ */
window.addEventListener('scroll', function () {
  var sections = document.querySelectorAll('section[id]');
  var curr = '';
  sections.forEach(function (s) {
    var top = s.offsetTop - 120;
    if (window.scrollY >= top) curr = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + curr) a.classList.add('active');
  });
});

/* ------------------------------------------
IDX Search — tab switching
------------------------------------------ */
var idxTabs = document.querySelectorAll('.idx-tab');
var idxInput = document.getElementById('idxSearchInput');
var activeSearchType = 'sale';

idxTabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    idxTabs.forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');
    var type = tab.getAttribute('data-type');
    activeSearchType = type;
    if (idxInput) {
      if (type === 'rent') {
        idxInput.placeholder = 'Search rentals by city, neighborhood, or address...';
      } else if (type === 'new') {
        idxInput.placeholder = 'Search new construction by city or developer...';
      } else {
        idxInput.placeholder = 'Search by city, neighborhood, ZIP, or address...';
      }
    }
  });
});

/* ------------------------------------------
IDX Search — form submit
------------------------------------------ */
var idxForm = document.getElementById('idxSearchForm');
if (idxForm) {
  idxForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (activeSearchType === 'new') {
      var devSection = document.getElementById('developments');
      if (devSection) devSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    var bridgeSection = document.getElementById('listings');
    if (bridgeSection) {
      bridgeSection.scrollIntoView({ behavior: 'smooth' });
      var bridgeTypeSelect = document.getElementById('bridgePropertyType');
      if (bridgeTypeSelect) bridgeTypeSelect.value = activeSearchType;
      var heroQuery = idxInput ? idxInput.value.trim() : '';
      var bridgeCityField = document.getElementById('bridgeSearchCity');
      if (heroQuery && bridgeCityField) bridgeCityField.value = heroQuery;
      setTimeout(function () { searchBridge(false); }, 500);
    }
  });
}

/* ------------------------------------------
Contact form handler
------------------------------------------ */
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#2a7a4f';
      setTimeout(function () {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    }
  });
}

/* ------------------------------------------
Home Valuation form handler
------------------------------------------ */
var valForm = document.getElementById('valuationForm');
if (valForm) {
  valForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = valForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Request Received!';
      btn.style.background = '#2a7a4f';
      setTimeout(function () {
        btn.textContent = 'Get My Home Value';
        btn.style.background = '';
        valForm.reset();
      }, 3000);
    }
  });
}

/* ------------------------------------------
Language selector
------------------------------------------ */
var langSelect = document.getElementById('langSelect');
if (langSelect) {
  langSelect.addEventListener('change', function () {
    var lang = langSelect.value;
    console.log('Language selected:', lang);
  });
}

/* ------------------------------------------
Bridge API — MLS Property Search
NOTE: main.js Bridge search is disabled — handled by inline script in index.html
      which uses the approved miamire dataset with full feature support.
------------------------------------------ */
// Bridge search is fully managed by the inline script in index.html.
// This prevents duplicate API calls and conflicts.

});
