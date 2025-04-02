document.addEventListener('DOMContentLoaded', function() {
  // ========== GESTION DES FAQ ==========
  const faqContainer = document.querySelector('.faq-container');
  
  if (faqContainer) {
    faqContainer.addEventListener('click', function(e) {
      const question = e.target.closest('.faq-question');
      if (!question) return;
      
      const item = question.parentNode;
      const wasActive = item.classList.contains('active');
      
      // Fermer toutes les FAQ
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Ouvrir la FAQ cliquée si elle n'était pas active
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  }


  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Vérifier si ce n'est pas un lien # seul
      if (this.getAttribute('href') === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;


      // Scroll fluide
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });


      // Mise à jour de l'URL
      if (history.pushState) {
        history.pushState(null, null, this.getAttribute('href'));
      }
    });
  });


  // ========== HIGHLIGHT NAVIGATION ==========
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function highlightNav() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && 
          scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.id;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.toggle('active', 
        link.getAttribute('href') === `#${currentSection}`
      );
    });
  }


  // ========== BACK TO TOP BUTTON ==========
  const backToTop = document.getElementById('back-to-top');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    });


    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ========== STICKY NAVIGATION INTELLIGENTE ==========
  const nav = document.querySelector('.sticky-nav');
  let lastScroll = 0;
  
  if (nav) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;
      
      if (currentScroll > lastScroll && currentScroll > 200) {
        // Scroll vers le bas
        nav.classList.add('hidden');
      } else {
        // Scroll vers le haut
        nav.classList.remove('hidden');
      }
      
      lastScroll = currentScroll;
    });
  }


  // ========== INITIALISATIONS ==========
  highlightNav(); // Exécuter au chargement
  
  // Optimisation du scroll avec requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        highlightNav();
        ticking = false;
      });
      ticking = true;
    }
  });
});