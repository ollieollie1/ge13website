document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.style.display = 'none';
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasNavbar'));
    
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 72, // Adjust for header height
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavItem() {
      let scrollPosition = window.scrollY + 100; // Adding offset
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    highlightNavItem(); // Initial check
    
    // Interactive charge visualization
    const positiveCharges = document.querySelectorAll('.charge.positive');
    const negativeCharges = document.querySelectorAll('.charge.negative');
    
    // pulse animation to charges on hover
    function addChargeInteraction(charges) {
      charges.forEach(charge => {
        charge.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.1)';
          this.style.boxShadow = this.classList.contains('positive') 
            ? '0 0 20px rgba(220, 38, 38, 0.5)' 
            : '0 0 20px rgba(37, 99, 235, 0.5)';
          this.style.transition = 'all 0.3s ease';
        });
        
        charge.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
          this.style.boxShadow = this.classList.contains('positive') 
            ? '0 4px 8px rgba(220, 38, 38, 0.2)' 
            : '0 4px 8px rgba(37, 99, 235, 0.2)';
        });
      });
    }
    
    addChargeInteraction(positiveCharges);
    addChargeInteraction(negativeCharges);
    
    // interactivity to attraction and repulsion diagrams
    const attractionArrow = document.querySelector('.attraction-arrow');
    const repulsionArrow = document.querySelector('.repulsion-arrow');
    
    if (attractionArrow) {
      attractionArrow.addEventListener('click', function() {
        const charges = this.parentElement.querySelectorAll('.mini-charge');
        
        // Animate the charges to move closer
        charges[0].style.transition = 'transform 0.5s ease';
        charges[1].style.transition = 'transform 0.5s ease';
        
        charges[0].style.transform = 'translateX(10px)';
        charges[1].style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
          charges[0].style.transform = 'translateX(0)';
          charges[1].style.transform = 'translateX(0)';
        }, 800);
      });
    }
    
    if (repulsionArrow) {
      repulsionArrow.addEventListener('click', function() {
        const charges = this.parentElement.querySelectorAll('.mini-charge');
        
        // Animate the charges to move apart
        charges[0].style.transition = 'transform 0.5s ease';
        charges[1].style.transition = 'transform 0.5s ease';
        
        charges[0].style.transform = 'translateX(-10px)';
        charges[1].style.transform = 'translateX(10px)';
        
        setTimeout(() => {
          charges[0].style.transform = 'translateX(0)';
          charges[1].style.transform = 'translateX(0)';
        }, 800);
      });
    }
  });