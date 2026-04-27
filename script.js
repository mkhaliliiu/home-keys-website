/* ================================================
   HOMEKEYS REAL ESTATE – SCRIPT.JS
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     1. NAVBAR – Scroll behavior & hamburger
     ================================================ */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    const logoTransparent = document.getElementById('logo-transparent');
    const logoScrolled = document.getElementById('logo-scrolled');

    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');

      if (logoTransparent) {
        logoTransparent.style.opacity = '0';
        logoTransparent.style.transform = 'translateY(-6px)';
        setTimeout(() => {
          logoTransparent.style.display = 'none';
          if (logoScrolled) {
            logoScrolled.style.display = 'block';
            setTimeout(() => {
              logoScrolled.style.opacity = '1';
              logoScrolled.style.transform = 'translateY(0)';
            }, 20);
          }
        }, 300);
      }

    } else {
      navbar.classList.remove('scrolled');

      if (logoScrolled) {
        logoScrolled.style.opacity = '0';
        logoScrolled.style.transform = 'translateY(-6px)';
        setTimeout(() => {
          logoScrolled.style.display = 'none';
          if (logoTransparent) {
            logoTransparent.style.display = 'block';
            setTimeout(() => {
              logoTransparent.style.opacity = '1';
              logoTransparent.style.transform = 'translateY(0)';
            }, 20);
          }
        }, 300);
      }
    }
  });

  // Hamburger menu
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  /* ================================================
     2. HERO SLIDER
     ================================================ */
  const slides = document.querySelectorAll('.hero-slide');
  const slideDots = document.querySelectorAll('.slide-dot');
  const nextSlideBtn = document.getElementById('nextSlide');
  const prevSlideBtn = document.getElementById('prevSlide');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0 && slideDots.length > 0) {

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      slideDots[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      slideDots[currentSlide].classList.add('active');
    }

    function startSlider() {
      slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    if (nextSlideBtn) {
      nextSlideBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(currentSlide + 1);
        startSlider();
      });
    }

    if (prevSlideBtn) {
      prevSlideBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(currentSlide - 1);
        startSlider();
      });
    }

    slideDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(i);
        startSlider();
      });
    });

    startSlider();
  }

  /* ================================================
     3. SEARCH TABS
     ================================================ */
  const searchTabs = document.querySelectorAll('.search-tab');
  if (searchTabs.length > 0) {
    searchTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }

  /* ================================================
     4. PROPERTY FILTER
     ================================================ */
  const propFilters = document.querySelectorAll('.prop-filter');
  const propertyCards = document.querySelectorAll('#propertiesGrid .property-card');

  if (propFilters.length > 0) {
    propFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        propFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const filterValue = filter.getAttribute('data-filter');

        propertyCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'block';
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = 'fadeInCard 0.4s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Add keyframes dynamically
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(styleSheet);

  /* ================================================
     5. COUNTER ANIMATION (Hero + Stats)
     ================================================ */
  function animateCounters(elements) {
    elements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
      }, 16);
    });
  }

  const heroCounters = document.querySelectorAll('.hero-stats .stat-num');
  let heroCountersDone = false;

  const statsCounters = document.querySelectorAll('.stats-section .stats-number');
  let statsCountersDone = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('stats-section') && !statsCountersDone) {
          statsCountersDone = true;
          animateCounters(statsCounters);
        }
        if (entry.target.classList.contains('hero-stats') && !heroCountersDone) {
          heroCountersDone = true;
          animateCounters(heroCounters);
        }
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  const heroStats = document.querySelector('.hero-stats');
  if (statsSection) counterObserver.observe(statsSection);
  if (heroStats) counterObserver.observe(heroStats);

  setTimeout(() => {
    if (!heroCountersDone && heroCounters.length > 0) {
      heroCountersDone = true;
      animateCounters(heroCounters);
    }
  }, 1200);

  /* ================================================
     6. TESTIMONIAL SLIDER
     ================================================ */
  const testimonialSlider = document.getElementById('testimonialSlider');
  const testDots = document.querySelectorAll('.test-dot');
  const testNextBtn = document.getElementById('testNext');
  const testPrevBtn = document.getElementById('testPrev');
  let currentTest = 0;
  let testInterval;

  if (testimonialSlider && testDots.length > 0) {

    function goToTestimonial(index) {
      testDots[currentTest].classList.remove('active');
      currentTest = (index + testDots.length) % testDots.length;
      testimonialSlider.style.transform = `translateX(-${currentTest * 100}%)`;
      testDots[currentTest].classList.add('active');
    }

    if (testNextBtn) {
      testNextBtn.addEventListener('click', () => {
        clearInterval(testInterval);
        goToTestimonial(currentTest + 1);
        startTestimonial();
      });
    }

    if (testPrevBtn) {
      testPrevBtn.addEventListener('click', () => {
        clearInterval(testInterval);
        goToTestimonial(currentTest - 1);
        startTestimonial();
      });
    }

    testDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(testInterval);
        goToTestimonial(i);
        startTestimonial();
      });
    });

    function startTestimonial() {
      testInterval = setInterval(() => {
        goToTestimonial(currentTest + 1);
      }, 5000);
    }

    startTestimonial();
  }

  /* ================================================
     7. BACK TO TOP
     ================================================ */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ================================================
     8. SMOOTH SCROLL for anchor links
     ================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ================================================
     9. CONTACT FORM
     ================================================ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fa fa-check mr-2"></i> Message Sent!';
        btn.style.background = '#1A6B45';
        showToast('✅ Message sent successfully! Our team will contact you soon.');
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = '<i class="fa fa-paper-plane mr-2"></i> Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  /* ================================================
     10. NEWSLETTER FORM
     ================================================ */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🎉 Subscribed! You\'ll receive the latest listings in your inbox.');
      newsletterForm.reset();
    });
  }

  /* ================================================
     11. TOAST NOTIFICATION
     ================================================ */
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* ================================================
     12. SCROLL REVEAL ANIMATION
     ================================================ */
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left { opacity: 0; transform: translateX(-30px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal-left.visible { opacity: 1; transform: translateX(0); }
    .reveal-right { opacity: 0; transform: translateX(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal-right.visible { opacity: 1; transform: translateX(0); }
    .reveal-scale { opacity: 0; transform: scale(0.95); transition: opacity 0.5s ease, transform 0.5s ease; }
    .reveal-scale.visible { opacity: 1; transform: scale(1); }
  `;
  document.head.appendChild(revealStyle);

  document.querySelectorAll('.property-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
  });
  document.querySelectorAll('.service-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.agent-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.neighborhood-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.06}s`;
  });
  document.querySelectorAll('.why-feature').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.stats-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.15}s`;
  });
  document.querySelectorAll('.contact-info-item').forEach((el, i) => {
    el.classList.add('reveal-left');
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  /* ================================================
     13. PROPERTY CARD WISHLIST TOGGLE
     ================================================ */
  document.querySelectorAll('.prop-action[title="Wishlist"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      if (icon.style.color === 'rgb(224, 90, 43)') {
        icon.style.color = '';
        showToast('💔 Removed from wishlist');
      } else {
        icon.style.color = 'rgb(224, 90, 43)';
        showToast('❤️ Added to wishlist!');
      }
    });
  });

  /* ================================================
     14. STICKY NAVBAR LOGO COLOR FIX
     ================================================ */
  const logoK = document.querySelector('.logo-k');
  if (logoK) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        logoK.style.color = '#1E2D5A';
      } else {
        logoK.style.color = '#1E2D5A';
      }
    });
  }

  /* ================================================
     15. PARALLAX on hero (subtle)
     ================================================ */
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroSection.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    });
  }

  /* ================================================
     16. SEARCH BUTTON INTERACTION
     ================================================ */
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> Searching...';
      setTimeout(() => {
        searchBtn.innerHTML = '<i class="fa fa-search mr-2"></i> Search Properties';
        const propertiesSection = document.getElementById('properties');
        if (propertiesSection) {
          window.scrollTo({ top: propertiesSection.offsetTop - 80, behavior: 'smooth' });
        }
      }, 1200);
    });
  }

  /* ================================================
     17. Initialize
     ================================================ */
  console.log('🏠 HomeKeys Real Estate – Website Loaded Successfully');
  console.log('Built with ❤️ for HomeKeys Real Estate');

});


/* ---- City Tab Switching ---- */
const cityTabs = document.querySelectorAll('.city-tab');
const cityPanels = document.querySelectorAll('.city-panel');

if (cityTabs.length > 0) {
  cityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCity = tab.getAttribute('data-city');

      cityTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      cityPanels.forEach(panel => panel.classList.remove('active'));
      const targetPanel = document.getElementById(`panel-${targetCity}`);
      if (targetPanel) targetPanel.classList.add('active');

      const targetSlider = document.getElementById(`slider-${targetCity}`);
      if (targetSlider) {
        targetSlider.style.transform = 'translateX(0)';
        const dots = document.querySelectorAll(`#dots-${targetCity} .proj-dot`);
        dots.forEach((d, i) => d.classList.toggle('active', i === 0));
        sliderIndexMap[`slider-${targetCity}`] = 0;
      }
    });
  });
}

/* ---- Project Sliders ---- */
const sliderIndexMap = {
  'slider-dubai': 0,
  'slider-abudhabi': 0,
  'slider-sharjah': 0,
  'slider-rasalkhaimah': 0
};

function getSlideCount(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return 0;
  return slider.querySelectorAll('.project-slide').length;
}

function goToProjectSlide(sliderId, index) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const total = getSlideCount(sliderId);
  if (total === 0) return;
  index = (index + total) % total;
  sliderIndexMap[sliderId] = index;

  slider.style.transform = `translateX(-${index * 100}%)`;

  const city = sliderId.replace('slider-', '');
  const dots = document.querySelectorAll(`#dots-${city} .proj-dot`);
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

document.querySelectorAll('.proj-arrow').forEach(arrow => {
  arrow.addEventListener('click', () => {
    const sliderId = arrow.getAttribute('data-slider');
    const currentIndex = sliderIndexMap[sliderId] || 0;

    if (arrow.classList.contains('proj-next')) {
      goToProjectSlide(sliderId, currentIndex + 1);
    } else {
      goToProjectSlide(sliderId, currentIndex - 1);
    }
  });
});

['dubai', 'abudhabi', 'sharjah', 'rasalkhaimah'].forEach(city => {
  const dots = document.querySelectorAll(`#dots-${city} .proj-dot`);
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToProjectSlide(`slider-${city}`, i);
    });
  });
});

let projectAutoSlideInterval = null;

function startProjectAutoSlide() {
  clearInterval(projectAutoSlideInterval);
  projectAutoSlideInterval = setInterval(() => {
    const activePanel = document.querySelector('.city-panel.active');
    if (!activePanel) return;
    const activeTab = document.querySelector('.city-tab.active');
    if (!activeTab) return;
    const city = activeTab.getAttribute('data-city');
    const sliderId = `slider-${city}`;
    const currentIndex = sliderIndexMap[sliderId] || 0;
    goToProjectSlide(sliderId, currentIndex + 1);
  }, 6000);
}

if (document.querySelector('.city-panel')) {
  startProjectAutoSlide();
}

document.querySelectorAll('.proj-arrow, .proj-dot, .city-tab').forEach(el => {
  el.addEventListener('click', () => {
    clearInterval(projectAutoSlideInterval);
    setTimeout(startProjectAutoSlide, 8000);
  });
});

['dubai', 'abudhabi', 'sharjah', 'rasalkhaimah'].forEach(city => {
  const sliderWrap = document.querySelector(`#panel-${city} .projects-slider-wrap`);
  if (!sliderWrap) return;

  let touchStartX = 0;
  let touchEndX = 0;

  sliderWrap.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderWrap.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      const sliderId = `slider-${city}`;
      const currentIndex = sliderIndexMap[sliderId] || 0;
      if (diff > 0) {
        goToProjectSlide(sliderId, currentIndex + 1);
      } else {
        goToProjectSlide(sliderId, currentIndex - 1);
      }
      clearInterval(projectAutoSlideInterval);
      setTimeout(startProjectAutoSlide, 8000);
    }
  }, { passive: true });
});

console.log('✅ Top Projects section loaded');