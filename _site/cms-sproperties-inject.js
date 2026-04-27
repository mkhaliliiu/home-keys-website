/* ================================================
   CMS INJECT – Adds Sanity properties to sproperties.html
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {

  if (typeof CMS_PROPERTIES === 'undefined' || CMS_PROPERTIES.length === 0) {
    console.log('No CMS properties found');
    return;
  }

  const grid = document.getElementById('propertiesGrid');
  if (!grid) return;

  // Clear any existing hardcoded cards
  grid.innerHTML = '';

  // Update counts
  const total = CMS_PROPERTIES.length;
  const showingCount = document.getElementById('showingCount');
  const totalCount = document.getElementById('totalCount');
  if (showingCount) showingCount.textContent = total;
  if (totalCount) totalCount.textContent = total;

  // Build a card for each Sanity property
  CMS_PROPERTIES.forEach(prop => {
    if (!prop.slug) return;

    const statusClass = prop.status === 'sale' ? 'sp-badge-sale' : 'sp-badge-rent';
    const statusLabel = prop.status === 'sale' ? 'FOR SALE' : 'FOR RENT';
    const devName = (prop.developer || '').toUpperCase();
    const bedsLabel = prop.beds || 'N/A';
    const tags = (prop.tags || []).slice(0, 3).map(t => `<span>${t}</span>`).join('');

    const card = document.createElement('div');
    card.className = 'sp-card';
    card.setAttribute('data-city', prop.city || '');
    card.setAttribute('data-type', prop.type || '');
    card.setAttribute('data-developer', prop.developer || '');
    card.setAttribute('data-beds', prop.beds || '');
    card.setAttribute('data-price', prop.price || 0);

    card.innerHTML = `
      <div class="sp-card-image">
        <img src="${prop.mainImage || ''}" alt="${prop.title}" loading="lazy" />
        <div class="sp-card-badges">
          <span class="sp-badge ${statusClass}">${statusLabel}</span>
          ${prop.goldenVisa ? '<span class="sp-badge sp-badge-featured">Golden Visa</span>' : ''}
        </div>
        <div class="sp-card-dev-logo">${devName}</div>
        <div class="sp-card-price">${prop.priceLabel || ''}</div>
        <button class="wishlist-btn"><i class="fa fa-heart"></i></button>
      </div>
      <div class="sp-card-body">
        <div class="sp-card-meta">
          <span class="sp-card-type">
            <i class="fa fa-home mr-1"></i>${prop.type ? prop.type.charAt(0).toUpperCase() + prop.type.slice(1) : ''}
          </span>
          <span class="sp-card-city">
            <i class="fa fa-map-marker-alt mr-1 text-primary"></i>${prop.area || ''}
          </span>
        </div>
        <h3 class="sp-card-title">${prop.title}</h3>
        <div class="sp-card-features">
          <span><i class="fa fa-bed"></i> ${bedsLabel}</span>
          <span><i class="fa fa-bath"></i> ${prop.baths || 0} Baths</span>
          <span><i class="fa fa-vector-square"></i> ${prop.sqft || 0} sqft</span>
        </div>
        ${tags ? `<div class="sp-card-tags">${tags}</div>` : ''}
        <div class="sp-card-footer">
          <a href="/properties/${prop.slug}/" class="sp-view-btn">
            View Details <i class="fa fa-arrow-right ml-1"></i>
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Show no results if empty
  const noResults = document.getElementById('noResults');
  if (noResults) {
    noResults.style.display = CMS_PROPERTIES.length === 0 ? 'block' : 'none';
  }

  // Hide load more since all loaded
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  if (loadMoreWrap) loadMoreWrap.style.display = 'none';

  console.log(`✅ CMS Sproperties: ${CMS_PROPERTIES.length} properties injected`);
});