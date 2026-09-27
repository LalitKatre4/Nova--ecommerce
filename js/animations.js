/**
 * NOVA — Animation Engine
 * Powered by GSAP & GSAP ScrollTrigger
 * Modular, performance-optimized, respects prefers-reduced-motion.
 */

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Register GSAP plugins safely
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initialize all animation modules on page load
 */
function initNovaAnimations() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, falling back to CSS animations.');
    return;
  }

  // If user requested reduced motion, bypass scroll triggers and complex motion
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-fade-up').forEach(el => el.classList.add('active'));
    return;
  }

  initNavbarScroll();
  initHeroAnimations();
  initMarquee();
  initStaggeredCards();
  initParallaxSections();
  initShowcaseAnimation();
  initHorizontalScroll();
  initPageTransitions();
}

/**
 * Sticky Navbar Scroll Transition
 */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: header }
  });
}

/**
 * Hero Section Scroll-Driven & Mouse Motion
 */
function initHeroAnimations() {
  const heroSection = document.querySelector('.hero-section');
  const heroProduct = document.querySelector('.hero-product-img');
  const heroRings = document.querySelectorAll('.floating-ring');
  const heroSpecs = document.querySelectorAll('.hero-spec-chip');
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc = document.querySelector('.hero-desc');
  const heroCtas = document.querySelector('.hero-ctas');

  if (!heroSection) return;

  // Staggered text entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (heroTitle) {
    heroTl.from('.hero-kicker', { opacity: 0, y: -20, duration: 0.8 }, 0.2);
    heroTl.from(heroTitle.querySelectorAll('.title-line'), {
      y: 80,
      opacity: 0,
      duration: 1.1,
      stagger: 0.15
    }, 0.3);
  }

  if (heroDesc) {
    heroTl.from(heroDesc, { opacity: 0, y: 30, duration: 0.8 }, 0.7);
  }

  if (heroCtas) {
    heroTl.from(heroCtas.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.8 }, 0.9);
  }

  if (heroProduct) {
    heroTl.from(heroProduct, {
      scale: 0.85,
      opacity: 0,
      rotation: -15,
      duration: 1.4,
      ease: 'power2.out'
    }, 0.4);
  }

  if (heroSpecs.length) {
    heroTl.from(heroSpecs, { opacity: 0, scale: 0.9, stagger: 0.2, duration: 0.8 }, 1.1);
  }

  // ScrollTrigger: Hero Product scales, moves vertically, and rotates with scroll
  if (heroProduct) {
    gsap.to(heroProduct, {
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      y: 120,
      scale: 1.15,
      rotation: 8,
      ease: 'none'
    });
  }

  // Floating rings parallax offset
  heroRings.forEach((ring, i) => {
    gsap.to(ring, {
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5 + (i * 0.5)
      },
      y: (i + 1) * 80,
      ease: 'none'
    });
  });

  // Mouse Parallax Interaction on Desktop
  if (window.innerWidth > 1024 && heroProduct) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 35;
      const yPos = (clientY / window.innerHeight - 0.5) * 35;

      gsap.to(heroProduct, {
        x: xPos,
        y: yPos,
        rotationY: xPos * 0.4,
        rotationX: -yPos * 0.4,
        duration: 1.2,
        ease: 'power2.out'
      });

      heroSpecs.forEach((chip, idx) => {
        const factor = idx === 0 ? -15 : 20;
        gsap.to(chip, {
          x: xPos * (factor / 20),
          y: yPos * (factor / 20),
          duration: 1.4,
          ease: 'power2.out'
        });
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      gsap.to(heroProduct, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1.5,
        ease: 'power2.out'
      });
      heroSpecs.forEach(chip => {
        gsap.to(chip, { x: 0, y: 0, duration: 1.5, ease: 'power2.out' });
      });
    });
  }
}

/**
 * Continuous Marquee Movement
 */
function initMarquee() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) return;

  // Seamless looping with GSAP
  gsap.to(marqueeTrack, {
    xPercent: -50,
    ease: 'none',
    duration: 22,
    repeat: -1
  });
}

/**
 * Staggered Product Cards & Section Elements Reveal
 */
function initStaggeredCards() {
  const cardGrids = document.querySelectorAll('.product-grid, .category-grid, .about-pillars-grid, .about-journal-grid, .flagship-list');

  cardGrids.forEach(grid => {
    const cards = grid.children;
    if (!cards.length) return;

    gsap.from(cards, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        once: true
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out'
    });
  });

  // Reveal generic section headers
  const headers = document.querySelectorAll('.section-header, .brand-story-section, .newsletter-section');
  headers.forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        once: true
      },
      y: 35,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
}

/**
 * Parallax Sections ("FORM MEETS FUNCTION")
 */
function initParallaxSections() {
  const parallaxMedia = document.querySelectorAll('.immersive-media-frame img');
  parallaxMedia.forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      yPercent: 15,
      scale: 1.08,
      ease: 'none'
    });
  });

  const storyImages = document.querySelectorAll('.story-image-wrap img');
  storyImages.forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      },
      yPercent: -12,
      ease: 'none'
    });
  });
}

/**
 * Dramatic Product Showcase Animation
 */
function initShowcaseAnimation() {
  const showcaseSec = document.querySelector('.showcase-section');
  const showcaseImg = document.querySelector('.showcase-product-img');
  const callouts = document.querySelectorAll('.showcase-callout');

  if (!showcaseSec || !showcaseImg) return;

  // Center product rotation and scaling as user scrolls through showcase
  gsap.to(showcaseImg, {
    scrollTrigger: {
      trigger: showcaseSec,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    rotation: -12,
    y: 60,
    scale: 1.1,
    ease: 'none'
  });

  // Callouts staggered floating entry
  if (callouts.length) {
    gsap.from(callouts, {
      scrollTrigger: {
        trigger: showcaseSec,
        start: 'top 65%',
        once: true
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power2.out'
    });
  }
}

/**
 * New Arrivals Horizontal Scroll & Advance Controls
 * Desktop (> 1024px): Pinned GSAP ScrollTrigger
 * Tablet & Mobile (<= 1024px): Hardware-accelerated touch carousel with snap
 */
let horizontalScrollTriggerInstance = null;
let currentActiveCardIndex = 0;
let advanceScrollBindingDone = false;

function initHorizontalScroll() {
  const container = document.querySelector('.horizontal-scroll-container');
  const trackWrapper = document.querySelector('.horizontal-track-wrapper');
  const track = document.querySelector('.horizontal-track');

  if (!container || !track || !trackWrapper) return;

  const items = Array.from(track.querySelectorAll('.horizontal-item'));
  if (items.length === 0) return;

  // Kill any existing ScrollTrigger instance to avoid duplicates
  if (horizontalScrollTriggerInstance) {
    horizontalScrollTriggerInstance.kill();
    horizontalScrollTriggerInstance = null;
  }

  // Tablet & Mobile: window.innerWidth <= 1024
  if (window.innerWidth <= 1024) {
    // Clear any inline transforms from desktop mode
    gsap.set(track, { clearProps: 'transform,x' });
  } else {
    // Desktop: Pinned GSAP ScrollTrigger
    // Reset wrapper scroll position
    trackWrapper.scrollLeft = 0;

    const getScrollDistance = () => {
      return Math.max(0, track.scrollWidth - trackWrapper.clientWidth);
    };

    const maxScroll = getScrollDistance();
    if (maxScroll > 0) {
      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'horizontalScrollTrigger',
          trigger: container,
          pin: true,
          scrub: 1.2,
          start: 'top 15%',
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentDist = getScrollDistance();
            if (currentDist <= 0) return;
            const currentX = self.progress * currentDist;
            let closestIdx = 0;
            let minDiff = Infinity;
            items.forEach((item, idx) => {
              const itemX = Math.min(item.offsetLeft - track.offsetLeft, currentDist);
              const diff = Math.abs(itemX - currentX);
              if (diff < minDiff) {
                minDiff = diff;
                closestIdx = idx;
              }
            });
            currentActiveCardIndex = closestIdx;
          }
        }
      });

      horizontalScrollTriggerInstance = tween.scrollTrigger;
    }
  }

  // Wire up the advance button
  initAdvanceButton();
}

/**
 * Interactive "SCROLL TO ADVANCE →" Controller
 */
function initAdvanceButton() {
  const advanceBtn = document.getElementById('advanceHorizontalBtn') ||
                     document.querySelector('.advance-scroll-btn') ||
                     document.querySelector('.horizontal-scroll-container .meta-row');
  const trackWrapper = document.querySelector('.horizontal-track-wrapper');
  const track = document.querySelector('.horizontal-track');

  if (!advanceBtn || !track || !trackWrapper) return;

  // Ensure button semantics and cursor pointer
  if (advanceBtn.tagName !== 'BUTTON') {
    advanceBtn.setAttribute('role', 'button');
    advanceBtn.setAttribute('tabindex', '0');
  }

  // Bind click & touch handler
  advanceBtn.onclick = (e) => {
    e.preventDefault();
    advanceHorizontalTrack();
  };

  advanceBtn.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      advanceHorizontalTrack();
    }
  };

  // Sync active index on tablet/mobile when user scrolls or swipes
  if (!advanceScrollBindingDone) {
    let scrollTimeout;
    trackWrapper.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.innerWidth <= 1024) {
          const items = Array.from(track.querySelectorAll('.horizontal-item'));
          const currentLeft = trackWrapper.scrollLeft;
          let closestIdx = 0;
          let minDiff = Infinity;
          items.forEach((item, idx) => {
            const itemLeft = item.offsetLeft - track.offsetLeft;
            const diff = Math.abs(itemLeft - currentLeft);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = idx;
            }
          });
          currentActiveCardIndex = closestIdx;
        }
      }, 100);
    }, { passive: true });

    advanceScrollBindingDone = true;
  }
}
window.initAdvanceButton = initAdvanceButton;

/**
 * Advance Track Logic: Moves to next card smoothly and loops back to 0
 */
function advanceHorizontalTrack() {
  const container = document.querySelector('.horizontal-scroll-container');
  const trackWrapper = document.querySelector('.horizontal-track-wrapper');
  const track = document.querySelector('.horizontal-track');

  if (!container || !track || !trackWrapper) return;

  const items = Array.from(track.querySelectorAll('.horizontal-item'));
  if (items.length === 0) return;

  const isDesktop = window.innerWidth > 1024;
  const st = horizontalScrollTriggerInstance;

  if (isDesktop && st) {
    // DESKTOP WITH GSAP SCROLLTRIGGER PINNING
    const maxScroll = Math.max(0, track.scrollWidth - trackWrapper.clientWidth);
    if (maxScroll <= 0) return;

    // Advance to next card index; smoothly loop back to 0 at the end
    const nextIdx = (currentActiveCardIndex + 1) >= items.length ? 0 : (currentActiveCardIndex + 1);
    currentActiveCardIndex = nextIdx;

    const targetX = nextIdx === 0 ? 0 : Math.min(items[nextIdx].offsetLeft - track.offsetLeft, maxScroll);
    const targetProgress = targetX / maxScroll;
    const targetScrollY = st.start + targetProgress * (st.end - st.start);

    // Smoothly animate window scroll position to advance the scrubbed track
    // Because container is pinned, animating within [st.start, st.end] keeps the container
    // pinned in place on the screen while sliding the cards horizontally!
    const scrollObj = { y: window.scrollY };
    gsap.to(scrollObj, {
      y: targetScrollY,
      duration: 0.7,
      ease: 'power2.out',
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y);
      }
    });
  } else {
    // TABLET & MOBILE: Smooth Native Carousel Advance
    const nextIdx = (currentActiveCardIndex + 1) >= items.length ? 0 : (currentActiveCardIndex + 1);
    currentActiveCardIndex = nextIdx;

    const targetLeft = nextIdx === 0 ? 0 : items[nextIdx].offsetLeft - track.offsetLeft;

    trackWrapper.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    });
  }
}
window.advanceHorizontalTrack = advanceHorizontalTrack;

/**
 * Seamless Page Transition Veil
 */
function initPageTransitions() {
  let veil = document.querySelector('.page-transition-veil');
  if (!veil) {
    veil = document.createElement('div');
    veil.className = 'page-transition-veil';
    document.body.appendChild(veil);
  }

  // Fade out veil on page load
  gsap.to(veil, {
    opacity: 0,
    duration: 0.35,
    ease: 'power2.out',
    onComplete: () => {
      veil.classList.remove('is-transitioning');
    }
  });

  // Intercept internal page links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') {
      return;
    }

    link.addEventListener('click', (e) => {
      // Allow default if modifier key pressed
      if (e.metaKey || e.ctrlKey) return;

      e.preventDefault();
      veil.classList.add('is-transitioning');
      gsap.to(veil, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });
}

// Auto-run on window load so all images and geometry are computed
window.addEventListener('load', () => {
  initNovaAnimations();
});

// Responsive resize & orientation listener with ScrollTrigger recalculation
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initHorizontalScroll();
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 150);
});

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    initHorizontalScroll();
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 250);
});

