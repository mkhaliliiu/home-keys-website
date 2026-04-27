/* ================================================
   ABOUT PAGE – about.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     BACK TO TOP
     ================================================ */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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
     SCROLL REVEAL ANIMATIONS
     ================================================ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  // Stagger team cards
  const teamCards = document.querySelectorAll('.team-card, .consultant-card');
  teamCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = `opacity 0.5s ease ${(i % 6) * 0.07}s, transform 0.5s ease ${(i % 6) * 0.07}s`;
    revealObserver.observe(card);
  });

  // CEO card
  const ceoCard = document.querySelector('.ceo-card');
  if (ceoCard) {
    ceoCard.style.opacity = '0';
    ceoCard.style.transform = 'translateY(30px)';
    ceoCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(ceoCard);
  }

  // Value cards in intro
  const valueCards = document.querySelectorAll('.about-value');
  valueCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.45s ease ${i * 0.08}s, transform 0.45s ease ${i * 0.08}s`;
    revealObserver.observe(card);
  });

  /* ================================================
     TOAST
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

  console.log('👥 About page loaded – team ready');
});