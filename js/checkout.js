/**
 * NOVA — Demo Checkout Module
 * Clean multi-step validation, shipping selection, payment tabs,
 * and order confirmation modal with generated order ID.
 */

let selectedShippingRate = 0; // 0 for standard free (or standard fee), 25 for express

function initCheckoutPage() {
  const checkoutItemsContainer = document.getElementById('checkoutItemsList');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutShipping = document.getElementById('checkoutShipping');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const checkoutForm = document.getElementById('checkoutForm');

  if (!checkoutItemsContainer) return;

  const items = getCartItems();
  const totals = getCartTotals();

  if (items.length === 0) {
    window.location.href = 'shop.html';
    return;
  }

  // Render items in order summary
  checkoutItemsContainer.innerHTML = items.map(item => `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--border-subtle);">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="position: relative;">
          <img src="${item.image}" alt="${item.name}" style="width: 56px; height: 56px; border-radius: var(--radius-xs); object-fit: cover; border: 1px solid var(--border-subtle); background: var(--bg-card);">
          <span style="position: absolute; top: -6px; right: -6px; background: var(--accent); color: var(--bg-primary); font-size: 0.7rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${item.quantity}</span>
        </div>
        <div>
          <div style="font-size: 0.9rem; font-weight: 600;">${item.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${item.size} · ${item.color}</div>
        </div>
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 600;">
        ${formatPrice(item.price * item.quantity)}
      </div>
    </div>
  `).join('');

  function recalculateCheckout() {
    const finalShipping = totals.subtotal >= 250 && selectedShippingRate === 0 ? 0 : (selectedShippingRate > 0 ? selectedShippingRate : 20);
    const finalTotal = Math.max(0, totals.subtotal - totals.discount + finalShipping);

    if (checkoutSubtotal) checkoutSubtotal.textContent = formatPrice(totals.subtotal);
    if (checkoutShipping) checkoutShipping.textContent = finalShipping === 0 ? 'FREE' : formatPrice(finalShipping);
    if (checkoutTotal) checkoutTotal.textContent = formatPrice(finalTotal);
  }

  // Shipping method change
  const shippingRadios = document.querySelectorAll('input[name="shipping_method"]');
  shippingRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      selectedShippingRate = Number(e.target.value);
      recalculateCheckout();
    });
  });

  recalculateCheckout();

  // Payment tab switches
  const paymentTabs = document.querySelectorAll('.payment-tab-btn');
  const paymentPanels = document.querySelectorAll('.payment-panel');

  paymentTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const method = tab.dataset.paymentMethod;
      paymentTabs.forEach(t => t.classList.remove('active'));
      paymentPanels.forEach(p => p.style.display = 'none');

      tab.classList.add('active');
      const targetPanel = document.getElementById(`panel-${method}`);
      if (targetPanel) targetPanel.style.display = 'block';
    });
  });

  // Handle Checkout Submission
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('placeOrderBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path></svg>
          Processing Order...
        `;
      }

      // Simulate instantaneous order confirmation
      setTimeout(() => {
        const orderNumber = `NV-${Math.floor(100000 + Math.random() * 900000)}`;
        const customerEmail = document.getElementById('checkoutEmail')?.value || 'concierge@nova-atelier.com';
        
        // Show Success Modal
        showOrderSuccess(orderNumber, customerEmail, totals.total);
        clearCart();
      }, 1200);
    });
  }
}

function showOrderSuccess(orderNumber, email, total) {
  const modal = document.getElementById('orderSuccessModal');
  if (!modal) return;

  const orderNumEl = document.getElementById('successOrderNumber');
  const emailEl = document.getElementById('successEmail');
  const dateEl = document.getElementById('successDeliveryDate');

  if (orderNumEl) orderNumEl.textContent = orderNumber;
  if (emailEl) emailEl.textContent = email;

  // Approximate delivery date (5 business days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const dateStr = deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  if (dateEl) dateEl.textContent = dateStr;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.addEventListener('DOMContentLoaded', () => {
  initCheckoutPage();
});
