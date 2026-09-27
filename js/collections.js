/**
 * NOVA — Collections Experience Module
 * Interactive collection browser, dynamic product rendering, and parallax effects.
 */

let activeCollectionFilter = 'all';

function renderCollectionsPage() {
  const container = document.getElementById('collectionsListContainer');
  if (!container) return;

  const collections = getAllCollections();

  container.innerHTML = collections.map((col, index) => {
    const products = getProductsForCollection(col.id);
    const romanNumeral = ['01', '02', '03', '04', '05', '06'][index] || `0${index + 1}`;

    return `
      <section class="collection-section" id="${col.slug}" data-collection-id="${col.id}">
        <!-- Editorial Header -->
        <div class="collection-header">
          <div class="collection-header-meta">
            <span class="collection-index font-mono">${romanNumeral}</span>
            <div class="collection-kicker">${col.kicker} · ${col.season}</div>
          </div>
          <div class="collection-header-main">
            <h2 class="collection-title">${col.name}</h2>
            <p class="collection-desc">${col.description}</p>
          </div>
          <div class="collection-header-actions">
            <a href="shop.html?category=${getShopCategoryForCollection(col.id)}" class="btn btn-secondary btn-sm">
              Explore Full ${col.name} (${products.length})
            </a>
          </div>
        </div>

        <!-- Split Grid: Editorial Hero Frame + Products Showcase Grid -->
        <div class="collection-showcase-grid">
          <!-- Editorial Hero Card with Parallax Frame -->
          <div class="collection-hero-media">
            <div class="collection-hero-img-box">
              <img src="${col.heroImage}" alt="${col.name}" class="collection-hero-img" loading="lazy">
              <div class="collection-hero-overlay"></div>
              <div class="collection-hero-badge">
                <span class="font-mono text-xs">${col.season} ARCHIVE</span>
                <h3 style="font-size: 1.3rem; margin-top: 4px; color: #fff;">${col.tagline}</h3>
              </div>
            </div>
          </div>

          <!-- Product Previews Grid (Reusing products.js data) -->
          <div class="collection-products-grid">
            ${products.slice(0, 4).map(prod => `
              <div class="product-card" style="background: var(--bg-surface);">
                <div class="card-media" style="aspect-ratio: 1/1;">
                  <img src="${prod.image}" alt="${prod.name}" class="card-img" loading="lazy">
                  ${prod.badge ? `<span class="card-badge">${prod.badge}</span>` : ''}
                  <div class="card-actions-hover">
                    <button class="btn-card-quick" onclick="openQuickView('${prod.id}')">Quick View</button>
                    <button class="btn-card-wish ${typeof isInWishlist === 'function' && isInWishlist(prod.id) ? 'active' : ''}" 
                            data-wishlist-id="${prod.id}" 
                            onclick="toggleWishlist('${prod.id}')" 
                            title="Save to wishlist" 
                            aria-label="Save to wishlist">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="${typeof isInWishlist === 'function' && isInWishlist(prod.id) ? '#E5484D' : 'none'}" stroke="${typeof isInWishlist === 'function' && isInWishlist(prod.id) ? '#E5484D' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div class="card-meta">
                    <span>${prod.category}</span>
                    <span class="card-price tabular-nums">${formatPrice(prod.price)}</span>
                  </div>
                  <a href="product.html?id=${prod.id}" class="card-title">${prod.name}</a>
                  <button class="btn btn-secondary btn-sm" style="margin-top: 10px; width: 100%; padding: 9px;" onclick="addToCart('${prod.id}')">
                    Add To Bag
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }).join('');

  initCollectionAnimations();
}

function getShopCategoryForCollection(collectionId) {
  switch (collectionId) {
    case 'footwear': return 'footwear';
    case 'outerwear': return 'outerwear';
    case 'leather-goods': return 'leather';
    case 'timepieces': return 'timepieces';
    case 'autumn-winter-2026': return 'apparel';
    default: return 'all';
  }
}

function initCollectionTabs() {
  const tabs = document.querySelectorAll('.collection-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSlug = tab.dataset.collection;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (targetSlug === 'all') {
        document.querySelectorAll('.collection-section').forEach(sec => {
          sec.style.display = 'block';
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetSec = document.getElementById(targetSlug);
        if (targetSec) {
          document.querySelectorAll('.collection-section').forEach(sec => {
            sec.style.display = 'block';
          });
          const navOffset = 90;
          const elementPosition = targetSec.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

function initCollectionAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Staggered reveal for collection sections
  document.querySelectorAll('.collection-section').forEach(section => {
    gsap.from(section.querySelector('.collection-header'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true
      },
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    const heroImg = section.querySelector('.collection-hero-img');
    if (heroImg) {
      gsap.to(heroImg, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        },
        yPercent: 12,
        scale: 1.06,
        ease: 'none'
      });
    }

    const cards = section.querySelectorAll('.product-card');
    if (cards.length) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: section.querySelector('.collection-products-grid'),
          start: 'top 85%',
          once: true
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }
  });

  // Hero main parallax
  const mainHero = document.querySelector('.collections-main-hero img');
  if (mainHero) {
    gsap.to(mainHero, {
      scrollTrigger: {
        trigger: '.collections-main-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      yPercent: 20,
      scale: 1.08,
      ease: 'none'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCollectionsPage();
  initCollectionTabs();

  // Check URL query parameter for collection focus
  const urlParams = new URLSearchParams(window.location.search);
  const colParam = urlParams.get('collection');
  if (colParam) {
    setTimeout(() => {
      const targetSec = document.getElementById(colParam);
      if (targetSec) {
        const navOffset = 90;
        const offsetPosition = targetSec.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

        const matchingTab = document.querySelector(`[data-collection="${colParam}"]`);
        if (matchingTab) {
          document.querySelectorAll('.collection-tab-btn').forEach(t => t.classList.remove('active'));
          matchingTab.classList.add('active');
        }
      }
    }, 200);
  }
});
