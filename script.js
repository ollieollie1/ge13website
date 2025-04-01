document.addEventListener('DOMContentLoaded', function() {
    // Since we're using only dark mode, we can simply remove the theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.style.display = 'none';
    }
    
    // Close mobile menu when clicking a link
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
    
    // Add pulse animation to charges on hover
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
    
    // Add interactivity to attraction and repulsion diagrams
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
    
    // Interactive Coulomb's Law formula
    const formula = document.querySelector('.formula');
    if (formula) {
      // Add tooltip-like behavior to formula elements
      const formulaText = formula.textContent;
      const formulaPartsMap = {
        'F': 'Electrostatic Force',
        'k': 'Coulomb\'s constant (≈ 8.99 × 10^9 N·m²/C²)',
        'q₁': 'Magnitude of first charge',
        'q₂': 'Magnitude of second charge',
        'r': 'Distance between charges',
        'r²': 'Distance squared (inverse square relationship)'
      };
      
      let newFormulaHTML = 'F = k × (q₁ × q₂) / r²';
      
      // Replace each part with a span that has a data attribute
      Object.keys(formulaPartsMap).forEach(part => {
        newFormulaHTML = newFormulaHTML.replace(part, `<span class="formula-part" data-description="${formulaPartsMap[part]}">${part}</span>`);
      });
      
      formula.innerHTML = newFormulaHTML;
      
      // Create a tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'formula-tooltip';
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '5px 10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.fontSize = '14px';
      tooltip.style.maxWidth = '200px';
      tooltip.style.textAlign = 'center';
      tooltip.style.zIndex = '1000';
      tooltip.style.display = 'none';
      tooltip.style.pointerEvents = 'none';
      document.body.appendChild(tooltip);
      
      // Add event listeners to formula parts
      const formulaPartElements = document.querySelectorAll('.formula-part');
      formulaPartElements.forEach(part => {
        part.style.cursor = 'pointer';
        part.style.fontWeight = 'bold';
        part.style.transition = 'color 0.3s';
        
        part.addEventListener('mouseenter', function(e) {
          const description = this.getAttribute('data-description');
          tooltip.textContent = description;
          tooltip.style.display = 'block';
          
          // Position the tooltip
          const rect = this.getBoundingClientRect();
          tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
          tooltip.style.top = rect.bottom + 10 + window.scrollY + 'px';
          
          // Highlight the formula part
          this.style.color = this.textContent === 'k' ? '#dc2626' : 
                             (this.textContent.includes('q') ? '#3b82f6' : '#10b981');
        });
        
        part.addEventListener('mousemove', function(e) {
          // Update tooltip position on mouse move to follow cursor more naturally
          tooltip.style.left = e.pageX - (tooltip.offsetWidth / 2) + 'px';
          tooltip.style.top = e.pageY + 20 + 'px';
        });
        
        part.addEventListener('mouseleave', function() {
          tooltip.style.display = 'none';
          this.style.color = '';
        });
      });
    }
  });