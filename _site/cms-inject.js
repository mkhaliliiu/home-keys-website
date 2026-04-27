/* ================================================
   CMS INJECT – Adds Sanity properties to homepage
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {

  if (typeof CMS_PROPERTIES === 'undefined' || CMS_PROPERTIES.length === 0) return;

  /* ================================================
     1. FEATURED PROPERTIES SECTION
     Only properties with showOnHomepage = true
     ================================================ */
  const featuredProps = CMS_PROPERTIES.filter(p => p.showOnHomepage);
  const propertiesGrid = document.getElementById('propertiesGrid');

  if (propertiesGrid && featuredProps.length > 0) {
    featuredProps.forEach(prop => {
      const statusClass = prop.status === 'sale' ? 'badge-sale' : 'badge-rent';
      const statusLabel = prop.status === 'sale' ? 'For Sale' : 'For Rent';

      const card = document.createElement('div');
      card.className = 'property-card';
      card.setAttribute('data-category', prop.status === 'sale' ? 'buy' : 'rent');

      card.innerHTML = `
        <div class="prop-image-wrap">
          <img src="${prop.mainImage}" alt="${prop.title}" class="prop-image" />
          <span class="prop-badge ${statusClass}">${statusLabel}</span>
          <div class="prop-overlay-actions">
            <button class="prop-action" title="Wishlist"><i class="fa fa-heart"></i></button>
            <button class="prop-action" title="Compare"><i class="fa fa-exchange-alt"></i></button>
            <button class="prop-action" title="Quick View"><i class="fa fa-eye"></i></button>
          </div>
          <div class="prop-price-tag">${prop.priceLabel}</div>
        </div>
        <div class="prop-body">
          <div class="prop-location">
            <i class="fa fa-map-marker-alt text-primary mr-1"></i>
            ${prop.area}, ${prop.city.charAt(0).toUpperCase() + prop.city.slice(1)}
          </div>
          <h3 class="prop-title">${prop.title}</h3>
          <div class="prop-features">
            <span><i class="fa fa-bed"></i> ${prop.beds}</span>
            <span><i class="fa fa-bath"></i> ${prop.baths} Baths</span>
            <span><i class="fa fa-vector-square"></i> ${prop.sqft} sqft</span>
          </div>
          <div class="prop-footer">
            <a href="/properties/${prop.slug}/" class="prop-cta">
              View Details <i class="fa fa-arrow-right ml-1 text-xs"></i>
            </a>
          </div>
        </div>
      `;

      propertiesGrid.appendChild(card);
    });
  }

  /* ================================================
     2. TOP PROJECTS BY LOCATION SECTION
     Only properties with showInTopProjects = true
     ================================================ */
  const topProps = CMS_PROPERTIES.filter(p => p.showInTopProjects);

  if (topProps.length > 0) {
    topProps.forEach(prop => {
      const citySliderMap = {
        dubai: 'slider-dubai',
        abudhabi: 'slider-abudhabi',
        sharjah: 'slider-sharjah',
        rak: 'slider-rasalkhaimah'
      };

      const sliderId = citySliderMap[prop.topProjectCity];
      if (!sliderId) return;

      const slider = document.getElementById(sliderId);
      if (!slider) return;

      const statusLabel = prop.completion || (prop.status === 'sale' ? 'For Sale' : 'For Rent');
      const statusClass = prop.status === 'sale' ? 'badge-sale' : 'badge-rent';

      const slide = document.createElement('div');
      slide.className = 'project-slide';
      slide.innerHTML = `
        <div class="project-card project-card-featured">
          <div class="proj-image-wrap">
            <img src="${prop.mainImage}" alt="${prop.title}" />
            <div class="proj-overlay"></div>
            <span class="proj-status-badge ${statusClass}">${statusLabel}</span>
            <span class="proj-dev-badge">${(prop.developer || '').toUpperCase()}</span>
            <div class="proj-featured-label">
              <i class="fa fa-star mr-1"></i> From HomeKeys CMS
            </div>
          </div>
          <div class="proj-content">
            <div class="proj-location-row">
              <i class="fa fa-map-marker-alt text-primary"></i>
              <span>${prop.area}</span>
            </div>
            <h3 class="proj-title">${prop.title}</h3>
            <p class="proj-desc">${prop.description ? prop.description.substring(0, 120) + '...' : ''}</p>
            <div class="proj-stats-row">
              <div class="proj-stat">
                <span class="proj-stat-val">${prop.priceLabel}</span>
                <span class="proj-stat-label">Price</span>
              </div>
              <div class="proj-stat">
                <span class="proj-stat-val">${prop.beds}</span>
                <span class="proj-stat-label">Bedrooms</span>
              </div>
              <div class="proj-stat">
                <span class="proj-stat-val">${prop.completion || 'Ready'}</span>
                <span class="proj-stat-label">Status</span>
              </div>
            </div>
            ${prop.tags ? `<div class="proj-tags">${prop.tags.slice(0,4).map(t => `<span>${t}</span>`).join('')}</div>` : ''}
            <a href="/properties/${prop.slug}/" class="proj-cta-btn">
              View Property <i class="fa fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      `;

      slider.appendChild(slide);

      // Add a dot for this new slide
      const city = prop.topProjectCity === 'rak' ? 'rasalkhaimah' : prop.topProjectCity;
      const dotsContainer = document.getElementById(`dots-${city}`);
      if (dotsContainer) {
        const dot = document.createElement('span');
        dot.className = 'proj-dot';
        dotsContainer.appendChild(dot);
      }
    });
  }

  console.log(`✅ CMS Inject: ${featuredProps.length} featured, ${topProps.length} top projects added`);
});