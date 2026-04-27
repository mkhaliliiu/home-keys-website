/* ================================================
   SECONDARY PROPERTIES – secondary-properties.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- State ---- */
  const activeFilters = { city: [], type: [], developer: [], beds: [] };
  let currentView = 'grid';
  let currentSort = 'default';

  const grid = document.getElementById('propertiesGrid');
  const allCards = Array.from(document.querySelectorAll('.sp-card'));
  const noResults = document.getElementById('noResults');
  const showingCount = document.getElementById('showingCount');
  const totalCount = document.getElementById('totalCount');
  const filterLabel = document.getElementById('filterLabel');
  const activeFiltersWrap = document.getElementById('activeFilters');
  const activeTagsWrap = document.getElementById('activeTags');

  /* ---- Init count ---- */
  const total = allCards.length;
  if (totalCount) totalCount.textContent = total;
  if (showingCount) showingCount.textContent = total;

  /* ================================================
     1. FILTER LOGIC
     ================================================ */
  function applyFilters() {
    let visible = 0;

    allCards.forEach((card, i) => {
      const city = card.dataset.city;
      const type = card.dataset.type;
      const dev = card.dataset.developer;
      const beds = card.dataset.beds;

      const cityMatch = activeFilters.city.length === 0 || activeFilters.city.includes(city);
      const typeMatch = activeFilters.type.length === 0 || activeFilters.type.includes(type);
      const devMatch = activeFilters.developer.length === 0 || activeFilters.developer.includes(dev);
      const bedsMatch = activeFilters.beds.length === 0 || activeFilters.beds.includes(beds);

      const show = cityMatch && typeMatch && devMatch && bedsMatch;

      if (show) {
        card.style.display = '';
        card.style.animationDelay = `${(visible * 0.05).toFixed(2)}s`;
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'cardFadeIn 0.4s ease both';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (showingCount) showingCount.textContent = visible;
    noResults.style.display = visible === 0 ? 'block' : 'none';
    document.getElementById('loadMoreWrap').style.display = visible === 0 ? 'none' : 'block';

    // Filter label
    const totalActive = Object.values(activeFilters).flat().length;
    if (filterLabel) {
      filterLabel.textContent = totalActive > 0 ? `(${totalActive} filter${totalActive > 1 ? 's' : ''} active)` : '';
    }

    updateActiveTags();
    sortCards();
  }

  /* ---- Checkbox listeners ---- */
  document.querySelectorAll('.filter-check input').forEach(input => {
    input.addEventListener('change', () => {
      const group = input.name; // city / type / developer / beds
      const val = input.value;

      if (input.checked) {
        if (!activeFilters[group].includes(val)) activeFilters[group].push(val);
      } else {
        activeFilters[group] = activeFilters[group].filter(v => v !== val);
      }
      applyFilters();
    });
  });

  /* ---- Reset ---- */
  document.getElementById('resetFilters').addEventListener('click', () => {
    activeFilters.city = [];
    activeFilters.type = [];
    activeFilters.developer = [];
    activeFilters.beds = [];
    document.querySelectorAll('.filter-check input').forEach(i => i.checked = false);
    applyFilters();
  });

  /* ---- Active Tags ---- */
  function updateActiveTags() {
    const allActive = [
      ...activeFilters.city.map(v => ({ group: 'city', val: v, label: labelFor('city', v) })),
      ...activeFilters.type.map(v => ({ group: 'type', val: v, label: labelFor('type', v) })),
      ...activeFilters.developer.map(v => ({ group: 'developer', val: v, label: labelFor('developer', v) })),
      ...activeFilters.beds.map(v => ({ group: 'beds', val: v, label: labelFor('beds', v) })),
    ];

    activeTagsWrap.innerHTML = '';
    allActive.forEach(item => {
      const tag = document.createElement('span');
      tag.className = 'sp-active-tag';
      tag.innerHTML = `${item.label} <i class="fa fa-times"></i>`;
      tag.addEventListener('click', () => {
        activeFilters[item.group] = activeFilters[item.group].filter(v => v !== item.val);
        const input = document.querySelector(`input[name="${item.group}"][value="${item.val}"]`);
        if (input) input.checked = false;
        applyFilters();
      });
      activeTagsWrap.appendChild(tag);
    });

    activeFiltersWrap.style.display = allActive.length > 0 ? 'block' : 'none';
  }

  function labelFor(group, val) {
    const labels = {
      city: { dubai: 'Dubai', abudhabi: 'Abu Dhabi', sharjah: 'Sharjah', rak: 'RAK' },
      type: { apartment: 'Apartment', villa: 'Villa', townhouse: 'Townhouse', penthouse: 'Penthouse' },
      developer: { emaar: 'Emaar', damac: 'DAMAC', nakheel: 'Nakheel', aldar: 'Aldar', sobha: 'Sobha', meraas: 'Meraas' },
      beds: { studio: 'Studio', '1bed': '1 Bedroom', '2bed': '2 Bedrooms', '3plus': '3+ Bedrooms' }
    };
    return labels[group]?.[val] || val;
  }

  /* ================================================
     2. SORT LOGIC
     ================================================ */
  function sortCards() {
    const visibleCards = allCards.filter(c => c.style.display !== 'none');

    visibleCards.sort((a, b) => {
      const priceA = parseInt(a.dataset.price) || 0;
      const priceB = parseInt(b.dataset.price) || 0;
      const bedsOrder = { studio: 0, '1bed': 1, '2bed': 2, '3plus': 3 };

      switch (currentSort) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'beds-asc':
          return (bedsOrder[a.dataset.beds] || 0) - (bedsOrder[b.dataset.beds] || 0);
        default: return 0;
      }
    });

    visibleCards.forEach(card => grid.appendChild(card));
  }

  document.getElementById('sortSelect').addEventListener('change', function() {
    currentSort = this.value;
    sortCards();
  });

  /* ================================================
     3. VIEW TOGGLE
     ================================================ */
  document.getElementById('gridViewBtn').addEventListener('click', () => {
    currentView = 'grid';
    grid.classList.remove('list-view');
    document.getElementById('gridViewBtn').classList.add('active');
    document.getElementById('listViewBtn').classList.remove('active');
  });

  document.getElementById('listViewBtn').addEventListener('click', () => {
    currentView = 'list';
    grid.classList.add('list-view');
    document.getElementById('listViewBtn').classList.add('active');
    document.getElementById('gridViewBtn').classList.remove('active');
  });

  /* ================================================
     4. FILTER GROUP TOGGLE (accordion)
     ================================================ */
  document.querySelectorAll('.filter-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const targetId = header.getAttribute('data-toggle');
      const options = document.getElementById(targetId);
      if (!options) return;

      const isOpen = options.classList.contains('open');
      options.classList.toggle('open', !isOpen);
      header.classList.toggle('collapsed', isOpen);

      const chevron = header.querySelector('.filter-chevron');
      if (chevron) chevron.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0)';
    });
  });

  /* ================================================
     5. MOBILE SIDEBAR
     ================================================ */
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const mobileFilterBtn = document.getElementById('mobileFilterBtn');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileFilterBtn) mobileFilterBtn.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  /* ================================================
     6. WISHLIST TOGGLE
     ================================================ */
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        icon.style.color = '#E05A2B';
        showSpToast('❤️ Added to wishlist!');
      } else {
        icon.style.color = '';
        showSpToast('💔 Removed from wishlist');
      }
    });
  });

  /* ================================================
     7. LOAD MORE (simulate)
     ================================================ */
  let loadCount = 0;
  document.getElementById('loadMoreBtn').addEventListener('click', function() {
    loadCount++;
    this.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> Loading...';
    this.disabled = true;

    setTimeout(() => {
      this.innerHTML = '<i class="fa fa-check mr-2"></i> All Properties Loaded';
      this.style.borderColor = '#1A6B45';
      this.style.color = '#1A6B45';
      this.disabled = true;
      document.getElementById('loadMoreWrap').style.opacity = '0.5';
      showSpToast('✅ All available properties are shown.');
    }, 1200);
  });

  /* ================================================
     8. TOAST
     ================================================ */
  function showSpToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3500);
  }

  /* ================================================
     9. NAVBAR scroll (page already scrolled style)
     ================================================ */
  const navbar = document.getElementById('navbar');
  const logoTransparent = document.getElementById('logo-transparent');
  const logoScrolled = document.getElementById('logo-scrolled');

  
  // Hamburger
  // Hamburger handled by script.js
  /* ================================================
     10. BACK TO TOP
     ================================================ */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ================================================
     11. NEWSLETTER
     ================================================ */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      showSpToast('🎉 Subscribed successfully!');
      newsletterForm.reset();
    });
  }

  /* ================================================
     12. SCROLL REVEAL
     ================================================ */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  allCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    revealObs.observe(card);
  });

  console.log('🏠 Secondary Properties page loaded');
});