/**
 * NOVA — Main Application Orchestrator
 * Global UI controls: Search, Modals, Quick View, Toasts, Mobile Menu.
 */

// Toast notification trigger
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconSvg = type === 'success'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger entrance
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// Mobile Menu Controls
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('mobileDrawerClose');

  if (!toggleBtn || !drawer) return;

  function openMenu() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeMenu();
      if (typeof closeCartDrawer === 'function') closeCartDrawer();
    });
  }
}

// Search Modal & Instant Filter
function initSearchModal() {
  const openSearchBtns = document.querySelectorAll('[data-open-search]');
  const searchModal = document.getElementById('searchModal');
  const closeSearchBtn = document.getElementById('closeSearchModal');
  const searchInput = document.getElementById('globalSearchInput');
  const resultsContainer = document.getElementById('searchResultsGrid');
  const emptyNote = document.getElementById('searchEmptyNote');

  if (!searchModal || !searchInput) return;

  function openSearch() {
    searchModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 150);
  }

  function closeSearch() {
    searchModal.classList.remove('open');
    document.body.style.overflow = '';
    searchInput.value = '';
    if (resultsContainer) resultsContainer.innerHTML = '';
    if (emptyNote) emptyNote.style.display = 'none';
  }

  openSearchBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openSearch();
  }));

  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

  // Close with ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('open')) {
      closeSearch();
    }
  });

  // Live Instant Search Filter
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      if (resultsContainer) resultsContainer.innerHTML = '';
      if (emptyNote) emptyNote.style.display = 'none';
      return;
    }

    const matches = getAllProducts().filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      if (resultsContainer) resultsContainer.innerHTML = '';
      if (emptyNote) {
        emptyNote.style.display = 'block';
        emptyNote.textContent = `No items found matching "${query}".`;
      }
    } else {
      if (emptyNote) emptyNote.style.display = 'none';
      if (resultsContainer) {
        resultsContainer.innerHTML = matches.map(prod => `
          <div class="product-card" style="background: var(--bg-surface);">
            <div class="card-media" style="aspect-ratio: 1/1;">
              <img src="${prod.image}" alt="${prod.name}" class="card-img">
            </div>
            <div class="card-body" style="padding: 14px;">
              <div class="card-meta">
                <span>${prod.category}</span>
                <span class="tabular-nums">${formatPrice(prod.price)}</span>
              </div>
              <a href="product.html?id=${prod.id}" class="card-title" style="font-size: 0.95rem;">${prod.name}</a>
              <button class="btn btn-primary btn-sm" style="margin-top: 10px; width: 100%; padding: 8px;" onclick="addToCart('${prod.id}')">Add to Bag</button>
            </div>
          </div>
        `).join('');
      }
    }
  });
}

// State tracking for scroll position
let quickViewScrollPosition = 0;

// Global Quick View Close Handler
function closeQuickView() {
  const quickViewModal = document.getElementById('quickViewModal');
  if (quickViewModal) {
    quickViewModal.classList.remove('open');
  }

  // Restore scrolling immediately on body and html
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.height = '';

  // Remove any modal-open or scroll-lock classes
  document.body.classList.remove('modal-open', 'no-scroll', 'overflow-hidden');
  document.documentElement.classList.remove('modal-open', 'no-scroll', 'overflow-hidden');

  // Restore previous scroll position if recorded
  if (typeof quickViewScrollPosition === 'number' && quickViewScrollPosition > 0) {
    window.scrollTo({
      top: quickViewScrollPosition,
      behavior: 'instant'
    });
  }

  // Trigger ScrollTrigger refresh if present
  if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh) {
    ScrollTrigger.refresh();
  }
}
window.closeQuickView = closeQuickView;

function selectQuickViewSize(btn) {
  const parent = btn.parentElement;
  if (!parent) return;
  parent.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
}
window.selectQuickViewSize = selectQuickViewSize;

// Quick View Modal Initialization
function initQuickView() {
  const quickViewModal = document.getElementById('quickViewModal');
  if (!quickViewModal) return;

  // Event delegation on modal container handles:
  // 1. Primary X button (#closeQuickView, .quickview-close, [data-close-quickview])
  // 2. Explicit Close button (.quickview-close-btn)
  // 3. Backdrop click (clicking on quickViewModal outside the box)
  quickViewModal.addEventListener('click', (e) => {
    const isBackdrop = (e.target === quickViewModal || e.target.classList.contains('quickview-modal') || e.target.classList.contains('quick-view-modal'));
    const isCloseBtn = e.target.closest('#closeQuickView, .quickview-close, .quick-view-close, .quickview-close-btn, [data-close-quickview]');
    
    if (isBackdrop || isCloseBtn) {
      e.preventDefault();
      e.stopPropagation();
      closeQuickView();
    }
  });

  // Escape key support across the page
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      const modal = document.getElementById('quickViewModal');
      if (modal && modal.classList.contains('open')) {
        closeQuickView();
      }
    }
  });
}

// Trigger Quick View with Product Data
function openQuickView(productId) {
  const product = getProductById(productId);
  const modal = document.getElementById('quickViewModal');
  const container = document.getElementById('quickViewContent');

  if (!product || !modal || !container) return;

  // Record current scroll position before opening
  quickViewScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  container.innerHTML = `
    <div style="aspect-ratio: 1/1; background: var(--bg-card); border-radius: var(--radius-xs); overflow: hidden; border: 1px solid var(--border-subtle);">
      <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div class="meta-row">
        <span>${product.category}</span>
        <span class="sep">/</span>
        <span>${product.badge || 'Curated'}</span>
      </div>
      <h2 style="font-size: 1.8rem; text-transform: uppercase;">${product.name}</h2>
      <div style="font-family: var(--font-mono); font-size: 1.3rem; font-weight: 600; color: var(--accent);">
        ${formatPrice(product.price)}
      </div>
      <p style="font-size: 0.95rem; line-height: 1.6;">${product.description}</p>
      
      <div>
        <div style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; color: var(--text-muted);">Sizes Available:</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${(product.sizes || []).map((sz, i) => `
            <button type="button" class="size-pill ${i === 0 ? 'active' : ''}" onclick="selectQuickViewSize(this)">${sz}</button>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 12px; flex-wrap: wrap;">
        <button class="btn btn-primary" style="flex: 2; min-width: 140px;" onclick="addToCart('${product.id}'); closeQuickView();">
          Add To Bag
        </button>
        <a href="product.html?id=${product.id}" class="btn btn-secondary" style="flex: 1.5; min-width: 120px;" onclick="closeQuickView();">
          Full Details
        </a>
        <button type="button" class="btn btn-secondary quickview-close-btn" style="flex: 1; min-width: 80px;" onclick="closeQuickView();" aria-label="Close modal">
          Close
        </button>
      </div>
    </div>
  `;

  // Reset scroll position of modal dialog box
  const box = modal.querySelector('.quickview-box') || modal.querySelector('.quick-view-dialog');
  if (box) {
    box.scrollTop = 0;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openQuickView = openQuickView;

// Newsletter Subscription Handler
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const feedback = document.getElementById('newsletterFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput || !emailInput.value) return;

    if (feedback) {
      feedback.style.display = 'block';
      feedback.textContent = `Thank you. ${emailInput.value} has been added to the NOVA private circle.`;
    }
    emailInput.value = '';
    showToast('Subscribed to NOVA editorial dispatch.', 'success');
  });
}

// Active Nav Link Detection
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link, .mobile-nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkBase = href.split('?')[0].split('#')[0];

    if (
      linkBase === currentPath ||
      (currentPath === '' && linkBase === 'index.html') ||
      (currentPath === 'article.html' && linkBase === 'journal.html')
    ) {
      link.classList.add('active');
    }
  });
}

// Global Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSearchModal();
  initQuickView();
  initNewsletter();
  initActiveNav();
  if (typeof initAdvanceButton === 'function') {
    initAdvanceButton();
  }
});
