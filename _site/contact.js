/* ================================================
   CONTACT PAGE – contact.js
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
     ENQUIRY TYPE TABS
     ================================================ */
  const enquiryTabs    = document.querySelectorAll('.enquiry-tab');
  const enquiryTypeInput = document.getElementById('enquiryType');
  enquiryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      enquiryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (enquiryTypeInput) enquiryTypeInput.value = tab.dataset.type;
    });
  });

  /* ================================================
     CHARACTER COUNTER
     ================================================ */
  const messageArea = document.getElementById('message');
  const charCount   = document.getElementById('charCount');
  if (messageArea && charCount) {
    messageArea.addEventListener('input', () => {
      const len = messageArea.value.length;
      charCount.textContent = len;
      charCount.style.color = len > 450 ? '#EF4444' : len > 350 ? '#F59E0B' : '';
      if (messageArea.value.length > 500) {
        messageArea.value = messageArea.value.substring(0, 500);
        charCount.textContent = 500;
      }
    });
  }

  /* ================================================
     FORM VALIDATION & SUBMISSION
     ================================================ */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formSuccess= document.getElementById('formSuccess');

  function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.closest('.input-wrap')?.querySelector('input, select, textarea')?.classList.add('error');
    if (error) error.textContent = message;
  }
  function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) {
      const el = document.getElementById(fieldId);
      if (el) el.classList.remove('error');
    }
    if (error) error.textContent = '';
  }

  // Live clear on input
  ['firstName','lastName','email','phone','message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id, `${id}Error`));
  });

  function validateForm() {
    let valid = true;

    // First name
    const firstName = document.getElementById('firstName');
    if (!firstName?.value.trim()) {
      showError('firstName', 'firstNameError', 'Please enter your first name.');
      valid = false;
    } else clearError('firstName', 'firstNameError');

    // Last name
    const lastName = document.getElementById('lastName');
    if (!lastName?.value.trim()) {
      showError('lastName', 'lastNameError', 'Please enter your last name.');
      valid = false;
    } else clearError('lastName', 'lastNameError');

    // Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email?.value.trim() || !emailRegex.test(email.value)) {
      showError('email', 'emailError', 'Please enter a valid email address.');
      valid = false;
    } else clearError('email', 'emailError');

    // Phone
    const phone = document.getElementById('phone');
    if (!phone?.value.trim() || phone.value.replace(/\D/g,'').length < 7) {
      showError('phone', 'phoneError', 'Please enter a valid phone number.');
      valid = false;
    } else clearError('phone', 'phoneError');

    // Message
    const message = document.getElementById('message');
    if (!message?.value.trim() || message.value.trim().length < 10) {
      showError('message', 'messageError', 'Please enter a message (at least 10 characters).');
      valid = false;
    } else clearError('message', 'messageError');

    // Privacy
    const privacy = document.getElementById('privacyCheck');
    const privacyError = document.getElementById('privacyError');
    if (!privacy?.checked) {
      if (privacyError) privacyError.textContent = 'You must agree to the privacy policy.';
      valid = false;
    } else {
      if (privacyError) privacyError.textContent = '';
    }

    return valid;
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        // Scroll to first error
        const firstError = form.querySelector('.field-error:not(:empty)');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Show loading state
      const submitText    = submitBtn.querySelector('.submit-text');
      const submitLoading = submitBtn.querySelector('.submit-loading');
      submitBtn.disabled = true;
      if (submitText)    submitText.style.display = 'none';
      if (submitLoading) submitLoading.style.display = 'flex';

      // Simulate API call (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success
      form.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
      showToast('✅ Message sent! We\'ll be in touch soon.');
    });
  }

  // Reset form function (called from inline onclick)
  window.resetForm = function () {
    if (form) {
      form.reset();
      form.style.display = 'flex';
      if (formSuccess) formSuccess.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = false;
        const submitText    = submitBtn.querySelector('.submit-text');
        const submitLoading = submitBtn.querySelector('.submit-loading');
        if (submitText)    submitText.style.display = 'flex';
        if (submitLoading) submitLoading.style.display = 'none';
      }
      if (charCount) charCount.textContent = '0';
      // Reset enquiry tabs
      enquiryTabs.forEach(t => t.classList.remove('active'));
      enquiryTabs[0]?.classList.add('active');
    }
  };

  /* ================================================
     FAQ ACCORDION
     ================================================ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(fi => {
          fi.classList.remove('open');
          fi.querySelector('.faq-answer')?.classList.remove('open');
        });
        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          answer.classList.add('open');
        }
      });
    }
  });

  /* ================================================
     SCROLL REVEAL
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

  const revealEls = document.querySelectorAll('.contact-detail-card, .contact-social-card, .faq-item, .contact-form-card, .contact-info-panel');
  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.45s ease ${(i % 8) * 0.06}s, transform 0.45s ease ${(i % 8) * 0.06}s`;
    revealObserver.observe(el);
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
    }, 3500);
  }

  console.log('📬 Contact page loaded');
});