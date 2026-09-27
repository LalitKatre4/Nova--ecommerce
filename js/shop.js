/**
 * NOVA — Shop Catalog Module
 * Handles product filtering, sorting, price filtering, and pagination.
 */

let activeCategory = 'all';
let currentSort = 'featured';
let maxPrice = 1500;
let shopSearchQuery = '';

function renderShopProducts() {
  const grid = document.getElementById('shopProductGrid');
  const countEl = document.getElementById('shopItemCount');
  if (!grid) return;

  let products = getAllProducts();

  // 1. Filter by category
  if (activeCategory !== 'all') {
    products = products.filter(p => p.categorySlug === activeCategory);
  }

  // 2. Filter by max price
  products = products.filter(p => p.price <= maxPrice);

  // 3. Filter by search query if present
  if (shopSearchQuery) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(shopSearchQuery) || 
      p.category.toLowerCase().includes(shopSearchQuery)
    );
  }

  // 4. Sort
  if (currentSort === 'price-low') {
    products.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    products.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'name') {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (countEl) {
    countEl.textContent = `Showing ${products.length} ${products.length === 1 ? 'item' : 'items'}`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;">
        <div style="font-size: 2rem; color: var(--text-muted); margin-bottom: 12px;">No Products Found</div>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">Try loosening your filters or resetting the price threshold.</p>
        <button class="btn btn-secondary" onclick="resetShopFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(prod => `
    <div class="product-card">
      <div class="card-media">
        <img src="${prod.image}" alt="${prod.name}" class="card-img" loading="lazy">
        ${prod.badge ? `<span class="card-badge">${prod.badge}</span>` : ''}
        <div class="card-actions-hover">
          <button class="btn-card-quick" onclick="openQuickView('${prod.id}')">Quick View</button>
          <button class="btn-card-wish ${isInWishlist(prod.id) ? 'active' : ''}" data-wishlist-id="${prod.id}" onclick="toggleWishlist('${prod.id}')" title="Save to wishlist" aria-label="Save to wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isInWishlist(prod.id) ? '#E5484D' : 'none'}" stroke="${isInWishlist(prod.id) ? '#E5484D' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span>${prod.category}</span>
          <span class="card-price tabular-nums">${formatPrice(prod.price)}</span>
        </div>
        <a href="product.html?id=${prod.id}" class="card-title">${prod.name}</a>
        <button class="btn btn-secondary btn-sm" style="margin-top: 10px; width: 100%; padding: 10px;" onclick="addToCart('${prod.id}')">
          Add To Bag
        </button>
      </div>
    </div>
  `).join('');

  if (typeof updateHeartButtons === 'function') updateHeartButtons();
}

function setShopCategory(categorySlug) {
  activeCategory = categorySlug;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === categorySlug);
  });
  renderShopProducts();
}

function resetShopFilters() {
  activeCategory = 'all';
  currentSort = 'featured';
  maxPrice = 1500;
  shopSearchQuery = '';

  const priceSlider = document.getElementById('priceRangeSlider');
  const priceDisplay = document.getElementById('priceRangeDisplay');
  const sortSelect = document.getElementById('sortSelect');
  const searchInput = document.getElementById('shopInlineSearch');

  if (priceSlider) priceSlider.value = 1500;
  if (priceDisplay) priceDisplay.textContent = '$1,500';
  if (sortSelect) sortSelect.value = 'featured';
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'all');
  });

  renderShopProducts();
}

document.addEventListener('DOMContentLoaded', () => {
  // Check URL params for category
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) activeCategory = catParam;

  // Filter category buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setShopCategory(btn.dataset.category);
    });
  });

  // Price slider
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceDisplay = document.getElementById('priceRangeDisplay');
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', (e) => {
      maxPrice = Number(e.target.value);
      priceDisplay.textContent = `$${maxPrice.toLocaleString()}`;
      renderShopProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderShopProducts();
    });
  }

  // Inline search
  const shopInlineSearch = document.getElementById('shopInlineSearch');
  if (shopInlineSearch) {
    shopInlineSearch.addEventListener('input', (e) => {
      shopSearchQuery = e.target.value.trim().toLowerCase();
      renderShopProducts();
    });
  }

  renderShopProducts();
});
