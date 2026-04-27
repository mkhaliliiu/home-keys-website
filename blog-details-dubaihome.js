/* ================================================
   BLOG DETAIL – blog-detail.js
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     READING PROGRESS BAR
     ================================================ */
  const progressBar = document.getElementById('readingProgress');
  const article     = document.querySelector('.bd-article');

  window.addEventListener('scroll', () => {
    if (!progressBar || !article) return;
    const artTop    = article.getBoundingClientRect().top + window.scrollY;
    const artHeight = article.offsetHeight;
    const scrolled  = window.scrollY - artTop;
    const pct       = Math.min(100, Math.max(0, (scrolled / artHeight) * 100));
    progressBar.style.width = pct + '%';
  });

  /* ================================================
     TOC ACTIVE STATE
     ================================================ */
  const tocItems   = document.querySelectorAll('.toc-item');
  const headings   = document.querySelectorAll('.bd-article h2');

  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = [...headings].indexOf(entry.target);
        tocItems.forEach(t => t.classList.remove('active'));
        if (tocItems[idx]) tocItems[idx].classList.add('active');
      }
    });
  }, { rootMargin:'-20% 0px -70% 0px' });

  headings.forEach(h => tocObserver.observe(h));

  // TOC click scroll
  tocItems.forEach((item, i) => {
    item.addEventListener('click', e => {
      e.preventDefault();
      if (headings[i]) {
        headings[i].scrollIntoView({ behavior:'smooth', block:'start' });
        setTimeout(() => { window.scrollBy(0, -110); }, 400);
      }
    });
  });

  /* ================================================
     YIELD BAR ANIMATION
     ================================================ */
  const yieldBars = document.querySelectorAll('.bd-yield-bar');
  const yieldObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.width; // trigger reflow
        yieldObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.3 });

  yieldBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    yieldObserver.observe(bar);
    setTimeout(() => { bar.style.width = targetWidth; }, 200);
  });

  /* ================================================
     SCROLL REVEAL
     ================================================ */
  const revealEls = document.querySelectorAll('.bd-buyer-card, .bd-step, .bd-cost-item, .bd-loc-card, .bd-lp, .bds-widget');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold:0.08 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.45s ease ${(i % 8) * 0.06}s, transform 0.45s ease ${(i % 8) * 0.06}s`;
    revealObs.observe(el);
  });

  /* ================================================
     SHARE FUNCTIONS
     ================================================ */
  window.shareArticle = function(platform) {
    const url   = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Owning a Second Home in the UAE – HomeKeys Real Estate');
    const links = {
      facebook : `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter  : `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp : `https://wa.me/?text=${title}%20${url}`,
    };
    if (links[platform]) window.open(links[platform], '_blank', 'width=600,height=400');
  };

  window.copyLink = function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('🔗 Link copied to clipboard!');
      document.querySelectorAll('#copyBtn, #sidebarCopyBtn').forEach(btn => {
        btn.innerHTML = '<i class="fa fa-check"></i>';
        setTimeout(() => { btn.innerHTML = '<i class="fa fa-link"></i>'; }, 2500);
      });
    });
  };

  /* ================================================
     NEWSLETTER
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
     BACK TO TOP
     ================================================ */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
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

  console.log('📖 Blog detail page loaded');
});