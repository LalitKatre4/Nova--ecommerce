/**
 * NOVA — Shopping Cart Module
 * Handles localStorage persistence, quantity updates, promo codes,
 * side drawer flyout, and cart page table rendering.
 */

const CART_STORAGE_KEY = 'nova_cart_items';
const PROMO_STORAGE_KEY = 'nova_applied_promo';
const SHIPPING_FREE_THRESHOLD = 250;
const STANDARD_SHIPPING_FEE = 20;

// Get Cart items from localStorage
function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Save Cart items
function saveCartItems(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    updateCartUI();
  } catch (e) {
    console.error('Error saving cart:', e);
  }
}

// Add item to cart
function addToCart(productId, size = null, color = null, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return;

  const items = getCartItems();
  const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
  const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Default';

  // Check if identical variant exists
  const existingIdx = items.findIndex(item => 
    item.productId === productId && 
    item.size === selectedSize && 
    item.color === selectedColor
  );

  if (existingIdx > -1) {
    items[existingIdx].quantity += quantity;
  } else {
    items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    });
  }

  saveCartItems(items);
  showToast(`Added "${product.name}" to your bag.`, 'success');
  openCartDrawer();
}

// Remove item from cart
function removeFromCart(index) {
  const items = getCartItems();
  if (index >= 0 && index < items.length) {
    const removed = items.splice(index, 1);
    saveCartItems(items);
    if (removed[0]) {
      showToast(`Removed "${removed[0].name}" from bag.`, 'info');
    }
  }
}

// Update quantity
function updateCartQuantity(index, newQty) {
  const items = getCartItems();
  if (index >= 0 && index < items.length) {
    if (newQty <= 0) {
      removeFromCart(index);
    } else {
      items[index].quantity = newQty;
      saveCartItems(items);
    }
  }
}

// Clear cart
function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartUI();
}

// Calculations
function getCartTotals() {
  const items = getCartItems();
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Promo code
  const appliedPromo = localStorage.getItem(PROMO_STORAGE_KEY);
  let discount = 0;
  if (appliedPromo === 'NOVA10') {
    discount = subtotal * 0.10;
  }

  const shipping = subtotal === 0 ? 0 : (subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE);
  const total = Math.max(0, subtotal - discount + shipping);

  return {
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    discount,
    shipping,
    total,
    appliedPromo
  };
}

// Apply Promo Code
function applyPromoCode(code) {
  const cleanCode = (code || '').trim().toUpperCase();
  if (cleanCode === 'NOVA10') {
    localStorage.setItem(PROMO_STORAGE_KEY, 'NOVA10');
    updateCartUI();
    showToast('Promo code NOVA10 applied: 10% discount!', 'success');
    return true;
  } else {
    showToast('Invalid promo code. Try "NOVA10"', 'error');
    return false;
  }
}

// Remove Promo Code
function removePromoCode() {
  localStorage.removeItem(PROMO_STORAGE_KEY);
  updateCartUI();
}

// Open / Close Cart Drawer
function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// Update all UI components linked to cart (Navbar Badge, Flyout Drawer, Cart Page)
function updateCartUI() {
  const items = getCartItems();
  const totals = getCartTotals();

  // 1. Navbar badge
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => {
    b.textContent = totals.itemCount;
    b.style.display = totals.itemCount > 0 ? 'flex' : 'none';
  });

  // 2. Cart Drawer contents
  const drawerItemsContainer = document.getElementById('cartDrawerItems');
  const drawerSubtotal = document.getElementById('cartDrawerSubtotal');
  const drawerTotal = document.getElementById('cartDrawerTotal');

  if (drawerItemsContainer) {
    if (items.length === 0) {
      drawerItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 16px; opacity: 0.3;">00</div>
          <p style="font-size: 0.95rem; margin-bottom: 24px;">Your shopping bag is currently empty.</p>
          <a href="shop.html" class="btn btn-secondary btn-sm" onclick="closeCartDrawer()">Explore Catalog</a>
        </div>
      `;
    } else {
      drawerItemsContainer.innerHTML = items.map((item, idx) => `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-info">
            <a href="product.html?id=${item.productId}" class="cart-item-name">${item.name}</a>
            <div class="cart-item-meta">${item.size} · ${item.color}</div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="quantity-stepper" style="margin-top: 6px;">
              <button class="stepper-btn" onclick="updateCartQuantity(${idx}, ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
              <span class="stepper-val">${item.quantity}</span>
              <button class="stepper-btn" onclick="updateCartQuantity(${idx}, ${item.quantity + 1})" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="btn-icon" style="width: 32px; height: 32px; color: var(--text-muted);" onclick="removeFromCart(${idx})" title="Remove item" aria-label="Remove item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `).join('');
    }
  }

  if (drawerSubtotal) drawerSubtotal.textContent = formatPrice(totals.subtotal);
  if (drawerTotal) drawerTotal.textContent = formatPrice(totals.total);

  // 3. Cart Page table (if on cart.html)
  const cartTableBody = document.getElementById('cartPageTableBody');
  const cartPageSubtotal = document.getElementById('cartPageSubtotal');
  const cartPageShipping = document.getElementById('cartPageShipping');
  const cartPageDiscount = document.getElementById('cartPageDiscount');
  const cartPageDiscountRow = document.getElementById('cartPageDiscountRow');
  const cartPageTotal = document.getElementById('cartPageTotal');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartFilledState = document.getElementById('cartFilledState');

  if (cartTableBody && cartEmptyState && cartFilledState) {
    if (items.length === 0) {
      cartEmptyState.style.display = 'block';
      cartFilledState.style.display = 'none';
    } else {
      cartEmptyState.style.display = 'none';
      cartFilledState.style.display = 'grid';

      cartTableBody.innerHTML = items.map((item, idx) => `
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 24px 0;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <img src="${item.image}" alt="${item.name}" style="width: 90px; height: 90px; object-fit: cover; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle); background: var(--bg-card);">
              <div>
                <a href="product.html?id=${item.productId}" style="font-weight: 600; font-size: 1.05rem; display: block; margin-bottom: 4px;">${item.name}</a>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${item.size} · ${item.color}</div>
                <div style="font-size: 0.8rem; color: var(--accent); margin-top: 4px;">${formatPrice(item.price)} each</div>
              </div>
            </div>
          </td>
          <td style="padding: 24px 16px; text-align: center;">
            <div class="quantity-stepper" style="display: inline-flex;">
              <button class="stepper-btn" onclick="updateCartQuantity(${idx}, ${item.quantity - 1})">−</button>
              <span class="stepper-val">${item.quantity}</span>
              <button class="stepper-btn" onclick="updateCartQuantity(${idx}, ${item.quantity + 1})">+</button>
            </div>
          </td>
          <td style="padding: 24px 16px; text-align: right; font-family: var(--font-mono); font-weight: 600;">
            ${formatPrice(item.price * item.quantity)}
          </td>
          <td style="padding: 24px 0; text-align: right;">
            <button class="btn-icon" onclick="removeFromCart(${idx})" title="Remove item" aria-label="Remove item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </td>
        </tr>
      `).join('');

      if (cartPageSubtotal) cartPageSubtotal.textContent = formatPrice(totals.subtotal);
      if (cartPageShipping) {
        cartPageShipping.textContent = totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping);
      }
      if (cartPageDiscount && cartPageDiscountRow) {
        if (totals.discount > 0) {
          cartPageDiscountRow.style.display = 'flex';
          cartPageDiscount.textContent = `-${formatPrice(totals.discount)}`;
        } else {
          cartPageDiscountRow.style.display = 'none';
        }
      }
      if (cartPageTotal) cartPageTotal.textContent = formatPrice(totals.total);
    }
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});
