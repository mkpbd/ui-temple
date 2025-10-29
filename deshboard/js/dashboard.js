// Basic state and helpers
const state = {
  carouselIndex: 0,
  carouselCount: 3,
};

function qs(selector, root = document) { return root.querySelector(selector); }
function qsa(selector, root = document) { return Array.from(root.querySelectorAll(selector)); }

// Sidebar toggle (mobile)
function setupSidebarToggle() {
  const btn = qs('#sidebarToggle');
  const sidebar = qs('#sidebar');
  if (!btn || !sidebar) return;
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Profile dropdown
function setupProfileMenu() {
  const btn = qs('#profileBtn');
  const menu = qs('#profileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });
  document.addEventListener('click', () => menu.classList.add('hidden'));
}

// Notifications
function setupNotifications() {
  const btn = qs('#notifyBtn');
  const dot = qs('#notifyDot');
  if (!btn || !dot) return;
  btn.addEventListener('click', () => {
    dot.classList.toggle('hidden');
  });
}

// Carousel
function setupCarousel() {
  const carousel = qs('#carousel');
  const prev = qs('#prevSlide');
  const next = qs('#nextSlide');
  if (!carousel || !prev || !next) return;

  function render() {
    const offset = -(state.carouselIndex * 100);
    carousel.style.transform = `translateX(${offset}%)`;
  }

  prev.addEventListener('click', () => {
    state.carouselIndex = (state.carouselIndex - 1 + state.carouselCount) % state.carouselCount;
    render();
  });
  next.addEventListener('click', () => {
    state.carouselIndex = (state.carouselIndex + 1) % state.carouselCount;
    render();
  });

  // Auto-advance
  setInterval(() => {
    state.carouselIndex = (state.carouselIndex + 1) % state.carouselCount;
    render();
  }, 5000);
}

// Accordion
function setupAccordion() {
  qsa('.accordion-trigger').forEach((btn) => {
    const panel = btn.nextElementSibling;
    btn.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpen);
    });
  });
}

// Tabs
function setupTabs() {
  const buttons = qsa('.tab-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      qsa('.tab-panel').forEach((p) => p.classList.add('hidden'));
      const panel = qs(`#tab-${tab}`);
      panel && panel.classList.remove('hidden');
      buttons.forEach((b) => b.classList.remove('bg-indigo-600', 'text-white'));
      btn.classList.add('bg-indigo-600', 'text-white');
    });
  });
  // Activate first tab by default
  const first = buttons[0];
  first && first.click();
}

// Forms
function setupForms() {
  const menuForm = qs('#menuForm');
  const feedbackForm = qs('#feedbackForm');
  const modalForm = qs('#modalMenuForm');

  qs('#resetForm')?.addEventListener('click', () => menuForm?.reset());
  qs('#clearFeedback')?.addEventListener('click', () => feedbackForm?.reset());

  menuForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Menu item saved!');
    menuForm.reset();
  });
  feedbackForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Feedback submitted!');
    feedbackForm.reset();
  });
  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Item added via modal!');
    closeModal();
  });
}

// Modal
function openModal() { qs('#itemModal')?.classList.remove('hidden'); }
function closeModal() { qs('#itemModal')?.classList.add('hidden'); }
function setupModal() {
  qs('#openModal')?.addEventListener('click', openModal);
  qsa('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
}

// Top search: simple demo interaction
function setupSearch() {
  const input = qs('#topSearch');
  input?.addEventListener('input', (e) => {
    // In a real app, hook into live filtering. Here we just log.
    console.log('Searching:', e.target.value);
  });
}

// Nav highlighting
function setupNavHighlighting() {
  const links = qsa('.nav-link');
  function setActive(hash) {
    links.forEach((a) => a.classList.toggle('bg-indigo-50', a.getAttribute('href') === hash));
  }
  links.forEach((a) => a.addEventListener('click', (e) => {
    setActive(e.currentTarget.getAttribute('href'));
  }));
  setActive('#dashboard');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  setupSidebarToggle();
  setupProfileMenu();
  setupNotifications();
  setupCarousel();
  setupAccordion();
  setupTabs();
  setupForms();
  setupModal();
  setupSearch();
  setupNavHighlighting();
});