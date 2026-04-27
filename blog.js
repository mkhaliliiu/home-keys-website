/* ================================================
   BLOG PAGE – blog.js
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- ELEMENTS ---- */
  const searchInput   = document.getElementById('blogSearch');
  const searchClear   = document.getElementById('searchClear');
  const catTabsTop    = document.querySelectorAll('#blogCatTabs .bct');
  const sbCats        = document.querySelectorAll('#sbCats .sb-cat');
  const blogGrid      = document.getElementById('blogGrid');
  const blogCards     = blogGrid ? [...blogGrid.querySelectorAll('.bc')] : [];
  const featuredArt   = document.getElementById('featuredArticle');
  const blogEmpty     = document.getElementById('blogEmpty');
  const blogCountBar  = document.getElementById('blogCountBar');
  const sidebarNL     = document.getElementById('sidebarNL');
  const newsletterForm= document.getElementById('newsletterForm');
  const backToTop     = document.getElementById('backToTop');

  let currentCat  = 'all';
  let currentSearch = '';

  /* ================================================
     SCROLL REVEAL for cards
     ================================================ */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 80);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  blogCards.forEach(card => revealObs.observe(card));

  /* ================================================
     FILTER LOGIC
     ================================================ */
  function applyFilters() {
    const q = currentSearch.toLowerCase().trim();
    let visibleCount = 0;

    // Handle featured article visibility
    if (featuredArt) {
      const featSearch = (featuredArt.dataset.search || '').toLowerCase();
      const featCat    = featuredArt.dataset.cat || '';
      const catMatch   = currentCat === 'all' || featCat === currentCat;
      const searchMatch= !q || featSearch.includes(q);
      featuredArt.style.display = (catMatch && searchMatch) ? '' : 'none';
      if (catMatch && searchMatch) visibleCount++;
    }

    // Handle grid cards
    blogCards.forEach(card => {
      const cardSearch = (card.dataset.search || '').toLowerCase();
      const cardCat    = card.dataset.cat || '';
      const catMatch   = currentCat === 'all' || cardCat === currentCat;
      const searchMatch= !q || cardSearch.includes(q);
      const show       = catMatch && searchMatch;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // No results
    if (blogEmpty) blogEmpty.style.display = visibleCount === 0 ? 'block' : 'none';

    // Count bar
    if (blogCountBar) {
      blogCountBar.textContent = visibleCount === 0
        ? 'No articles found'
        : `Showing ${visibleCount} article${visibleCount !== 1 ? 's' : ''}`;
    }
  }

  /* ================================================
     SEARCH
     ================================================ */
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value;
      if (searchClear) searchClear.style.display = currentSearch ? 'block' : 'none';
      applyFilters();
    });
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearch = '';
      searchClear.style.display = 'none';
      applyFilters();
    });
  }

  /* ================================================
     CATEGORY TABS (top bar)
     ================================================ */
  catTabsTop.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabsTop.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCat = tab.dataset.cat;
      // Sync sidebar
      sbCats.forEach(s => s.classList.toggle('active', s.dataset.cat === currentCat));
      applyFilters();
    });
  });

  /* ================================================
     SIDEBAR CATEGORIES
     ================================================ */
  sbCats.forEach(btn => {
    btn.addEventListener('click', () => {
      sbCats.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      // Sync top tabs
      catTabsTop.forEach(t => t.classList.toggle('active', t.dataset.cat === currentCat));
      applyFilters();
      // Scroll to grid on mobile
      if (window.innerWidth < 1100) {
        const grid = document.querySelector('.blog-grid-wrap');
        if (grid) grid.scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });
  });

  /* ================================================
     TAG FILTER (called from onclick)
     ================================================ */
  window.tagFilter = function(tag) {
    if (searchInput) searchInput.value = tag;
    currentSearch = tag;
    if (searchClear) searchClear.style.display = 'block';
    // Reset cat
    currentCat = 'all';
    catTabsTop.forEach(t => t.classList.toggle('active', t.dataset.cat === 'all'));
    sbCats.forEach(s => s.classList.toggle('active', s.dataset.cat === 'all'));
    applyFilters();
    window.scrollTo({ top: document.querySelector('.blog-section').offsetTop - 160, behavior: 'smooth' });
  };

  /* ================================================
     RESET (called from no-results button)
     ================================================ */
  window.resetBlog = function() {
    currentCat    = 'all';
    currentSearch = '';
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';
    catTabsTop.forEach(t => t.classList.toggle('active', t.dataset.cat === 'all'));
    sbCats.forEach(s => s.classList.toggle('active', s.dataset.cat === 'all'));
    applyFilters();
  };

  /* ================================================
     NEWSLETTER FORMS
     ================================================ */
  [sidebarNL, newsletterForm].forEach(form => {
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('🎉 Subscribed! Weekly updates on their way.');
      form.reset();
    });
  });

  /* ================================================
     BACK TO TOP
     ================================================ */
  window.addEventListener('scroll', () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* ================================================
     TOAST
     ================================================ */
  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 80);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3200);
  }

  console.log('📰 Blog page loaded – 7 articles ready');
});