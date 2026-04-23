(function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navList = document.getElementById('navList');
    
    if (hamburger && navList) {
      // Toggle menu
      hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = navList.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        
        // Optional: transform hamburger to "X"
        hamburger.classList.toggle('open');
      });

      // Close menu when a nav link is clicked (better UX)
      const navLinks = navList.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
            navList.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('open');
          }
        });
      });

      // Close if clicked outside (optional)
      document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && navList.classList.contains('active')) {
          const isClickInside = navList.contains(event.target) || hamburger.contains(event.target);
          if (!isClickInside) {
            navList.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('open');
          }
        }
      });

      // Handle resize: if screen becomes >768, remove active class and reset
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
          navList.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('open');
        }
      });
    }

    // Add a bit of style for hamburger animation (via class)
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .hamburger.open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
      .hamburger.open span:nth-child(2) { opacity: 0; }
      .hamburger.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
    `;
    document.head.appendChild(styleSheet);
  })();