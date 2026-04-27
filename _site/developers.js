/* ================================================
   DEVELOPERS PAGE – developers.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  
  // Hamburger
  // Hamburger handled by script.js
  /* ================================================
     2. BACK TO TOP
     ================================================ */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ================================================
     3. NEWSLETTER
     ================================================ */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('🎉 Subscribed successfully!');
      newsletterForm.reset();
    });
  }

  /* ================================================
     4. SEARCH & FILTER
     ================================================ */
  const searchInput   = document.getElementById('devSearch');
  const searchClear   = document.getElementById('searchClear');
  const devCountEl    = document.getElementById('devCount');
  const devNoResults  = document.getElementById('devNoResults');
  const filterTagBtns = document.querySelectorAll('.dev-filter-tag');
  const allCards      = document.querySelectorAll('#devAllGrid .dev-card');
  const featuredCards = document.querySelectorAll('#featuredGrid .dev-featured-card');

  let activeFilter = 'all';
  let searchQuery  = '';

  // ---- Search input ----
  searchInput.addEventListener('input', function () {
    searchQuery = this.value.trim().toLowerCase();
    searchClear.style.display = searchQuery ? 'flex' : 'none';
    filterDevCards();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.style.display = 'none';
    filterDevCards();
    searchInput.focus();
  });

  // ---- Filter tags ----
  filterTagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterTagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      filterDevCards();
    });
  });

  // ---- Core filter function ----
  function filterDevCards() {
    let visibleCount = 0;

    allCards.forEach((card, i) => {
      const name = (card.dataset.name || '').toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      const nameText = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const locText  = card.querySelector('p')?.textContent.toLowerCase() || '';

      const matchSearch = !searchQuery ||
        name.includes(searchQuery) ||
        nameText.includes(searchQuery) ||
        locText.includes(searchQuery) ||
        tags.includes(searchQuery);

      const matchFilter = activeFilter === 'all' || tags.includes(activeFilter);

      if (matchSearch && matchFilter) {
        card.classList.remove('dev-hidden');
        card.style.animationDelay = `${(visibleCount * 0.03).toFixed(2)}s`;
        visibleCount++;
      } else {
        card.classList.add('dev-hidden');
      }
    });

    // Update featured cards visibility during search
    featuredCards.forEach(card => {
      const nameText = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const tags = (card.dataset.tags || '').toLowerCase();
      const locText = card.querySelector('p')?.textContent.toLowerCase() || '';

      const matchSearch = !searchQuery ||
        nameText.includes(searchQuery) ||
        locText.includes(searchQuery) ||
        tags.includes(searchQuery);

      if (matchSearch) {
        card.classList.remove('dev-hidden');
      } else {
        card.classList.add('dev-hidden');
      }
    });

    // Update counter
    if (devCountEl) devCountEl.textContent = visibleCount;
    if (devNoResults) devNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  // ---- Expose for inline reset button ----
  window.filterDevCards = filterDevCards;

  /* ================================================
     5. SCROLL REVEAL ANIMATION
     ================================================ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  // Stagger all cards on load
  allCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.45s ease ${(i % 10) * 0.04}s, transform 0.45s ease ${(i % 10) * 0.04}s`;
    observer.observe(card);
  });

  featuredCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`;
    observer.observe(card);
  });

  /* ================================================
     6. CARD HOVER — ripple effect on click
     ================================================ */
  allCards.forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      ripple.style.cssText = `
        position:absolute;
        width:4px; height:4px;
        background:rgba(224,90,43,0.3);
        border-radius:50%;
        top:${e.clientY - rect.top}px;
        left:${e.clientX - rect.left}px;
        transform:scale(0);
        animation:rippleEffect 0.6s ease-out forwards;
        pointer-events:none;
        z-index:10;
      `;
      this.style.position = 'relative';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject ripple keyframe once
  if (!document.querySelector('#rippleKeyframe')) {
    const style = document.createElement('style');
    style.id = 'rippleKeyframe';
    style.textContent = `
      @keyframes rippleEffect {
        to { transform:scale(80); opacity:0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ================================================
     7. TOAST
     ================================================ */
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 80);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  console.log('🏗️ Developers page loaded – 40 partners ready');
});