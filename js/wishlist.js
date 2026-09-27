/**
 * NOVA — Wishlist Module
 * Handles saving to localStorage, toggling items, navbar count,
 * and rendering on wishlist.html.
 */

const WISHLIST_STORAGE_KEY = 'nova_wishlist_items';

function getWishlistItems() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveWishlistItems(items) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    updateWishlistUI();
  } catch (e) {
    console.error('Error saving wishlist:', e);
  }
}

function isInWishlist(productId) {
  const items = getWishlistItems();
  return items.includes(productId);
}

function toggleWishlist(productId) {
  const product = getProductById(productId);
  if (!product) return;

  let items = getWishlistItems();
  const exists = items.includes(productId);

  if (exists) {
    items = items.filter(id => id !== productId);
    saveWishlistItems(items);
    showToast(`Removed "${product.name}" from your wishlist.`, 'info');
  } else {
    items.push(productId);
    saveWishlistItems(items);
    showToast(`Saved "${product.name}" to your wishlist.`, 'success');
  }

  // Update heart buttons state across page
  updateHeartButtons();
}

function updateHeartButtons() {
  const items = getWishlistItems();
  const heartBtns = document.querySelectorAll('[data-wishlist-id]');
  heartBtns.forEach(btn => {
    const id = btn.getAttribute('data-wishlist-id');
    if (items.includes(id)) {
      btn.classList.add('active');
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    } else {
      btn.classList.remove('active');
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    }
  });
}

function updateWishlistUI() {
  const items = getWishlistItems();

  // 1. Badge count in navbar
  const badges = document.querySelectorAll('.wishlist-count-badge');
  badges.forEach(b => {
    b.textContent = items.length;
    b.style.display = items.length > 0 ? 'flex' : 'none';
  });

  // 2. Wishlist page render (if on wishlist.html)
  const wishlistGrid = document.getElementById('wishlistGrid');
  const wishlistEmpty = document.getElementById('wishlistEmpty');
  const wishlistCountHeader = document.getElementById('wishlistCountHeader');

  if (wishlistGrid && wishlistEmpty) {
    if (items.length === 0) {
      wishlistEmpty.style.display = 'block';
      wishlistGrid.style.display = 'none';
      if (wishlistCountHeader) wishlistCountHeader.textContent = '0 items';
    } else {
      wishlistEmpty.style.display = 'none';
      wishlistGrid.style.display = 'grid';
      if (wishlistCountHeader) wishlistCountHeader.textContent = `${items.length} ${items.length === 1 ? 'item' : 'items'}`;

      const productObjs = items.map(id => getProductById(id)).filter(Boolean);
      wishlistGrid.innerHTML = productObjs.map(prod => `
        <div class="product-card">
          <div class="card-media">
            <img src="${prod.image}" alt="${prod.name}" class="card-img">
            <button class="btn-card-wish active" data-wishlist-id="${prod.id}" onclick="toggleWishlist('${prod.id}')" title="Remove from wishlist" style="position: absolute; top: 12px; right: 12px; z-index: 5;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span>${prod.category}</span>
              <span class="tabular-nums">${formatPrice(prod.price)}</span>
            </div>
            <a href="product.html?id=${prod.id}" class="card-title">${prod.name}</a>
            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="btn btn-primary btn-sm" style="flex: 1; padding: 10px 14px; font-size: 0.75rem;" onclick="addToCart('${prod.id}')">Add To Bag</button>
              <button class="btn btn-secondary btn-sm" style="padding: 10px 14px; font-size: 0.75rem;" onclick="toggleWishlist('${prod.id}')">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  updateHeartButtons();
}

document.addEventListener('DOMContentLoaded', () => {
  updateWishlistUI();
});
