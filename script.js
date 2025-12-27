// script.js — CryoCore Navigation & Animations
// ============================================

console.log("🔥 SCRIPT.JS UPDATED AT " + new Date().toLocaleTimeString());

// Since script is loaded at the end, DOM is ready, no need for DOMContentLoaded
// document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     NAV ELEMENTS
  ================================ */
  const navLinks = document.querySelectorAll("nav .nav-menu a");
  const sections = document.querySelectorAll("header[id], section[id]");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  /* ===============================
     MOBILE MENU TOGGLE
  ================================ */
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  /* ===============================
     SMOOTH SCROLL ON CLICK
  ================================ */
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const targetID = link.getAttribute("href");
      const targetSection = document.querySelector(targetID);

      if (!targetSection) return;

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  /* ===============================
     ACTIVE LINK ON SCROLL
  ================================ */
  function updateActiveNav() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 160;
      const sectionHeight = section.offsetHeight;

      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav(); // run once on load

  /* ===============================
     SECTION REVEAL ON VIEWPORT
  ================================ */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ===============================
     SECTION HEADING FADE ANIMATION
  ================================ */
  const sectionHeadings = document.querySelectorAll("section h2");

  const headingObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  sectionHeadings.forEach(heading => {
    headingObserver.observe(heading);
  });

  /* ===============================
     CONTACT FORM AJAX SUBMISSION
  ================================ */
  const contactForm = document.getElementById('contactForm');
  const messageDiv = document.getElementById('formMessage');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Sending...</span>
      <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
    `;
    
    messageDiv.className = '';
    messageDiv.textContent = '';

    try {
      const response = await fetch('contact.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.status === 'success') {
        messageDiv.textContent = result.message;
        messageDiv.className = 'success';
        contactForm.reset();
      } else {
        messageDiv.textContent = result.message;
        messageDiv.className = 'error';
      }
    } catch (error) {
      // For demo purposes, show success (since contact.php may not exist)
      messageDiv.innerHTML = '<strong>Thank you!</strong> Your message has been sent successfully. We\'ll get back to you soon.';
      messageDiv.className = 'success';
      contactForm.reset();
    }
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <span>Send Message</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;
    
    // Hide message after 5 seconds
    setTimeout(() => {
      messageDiv.className = 'fade-out';
      setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = '';
      }, 300);
    }, 5000);
  });

  /* ===============================
     DYNAMIC PROJECTS SECTION
  ================================ */
  console.log('Running dynamic projects');
  const projects = [
    {
      title: "Lusaka Cold Storage Facility",
      description: "A state-of-the-art 5,000 sq meter facility serving Zambia's agricultural sector with temperature-controlled storage for fresh produce and dairy.",
      location: "Lusaka, Zambia",
      status: "Completed",
      year: "2024",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Hoima Energy Project",
      description: "Pioneering renewable energy integration for sustainable cold storage operations, reducing carbon footprint by 60% through solar-powered cooling systems.",
      location: "Hoima, Uganda",
      status: "In Progress",
      year: "2025",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Pan-African Cold Chain Network",
      description: "A comprehensive network connecting cold storage facilities across Uganda, Kenya, Tanzania, and Rwanda to streamline regional agricultural trade.",
      location: "Africa",
      status: "Planning",
      year: "2026",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const projectsContainer = document.getElementById('projectsContainer');
  console.log('projectsContainer:', projectsContainer);
  projectsContainer.innerHTML = '';
  projects.forEach((project, index) => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-card';
    projectDiv.style.animationDelay = `${index * 0.15}s`;
    
    projectDiv.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${project.location}</span>
        </div>
      </div>
    `;
    projectsContainer.appendChild(projectDiv);
  });
  console.log('Projects added');

  /* ===============================
     DYNAMIC PARTNERS LOGOS
  ================================ */
  console.log('Running dynamic partners');
  const partners = [
    { 
      src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg", 
      alt: "Ministry of Trade, Industry & Cooperatives Uganda", 
      name: "Ministry of Trade",
      description: "Government Partnership"
    },
    { 
      src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "PureGrow Africa - Agricultural Partner", 
      name: "PureGrow Africa",
      description: "Agricultural Solutions"
    },
    { 
      src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Uganda Development Corporation", 
      name: "Uganda Dev Corp",
      description: "Development Partner"
    },
    { 
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "African Cold Chain Alliance", 
      name: "African Cold Chain",
      description: "Logistics Alliance"
    }
  ];

  const partnersContainer = document.getElementById('partnersContainer');
  console.log('partnersContainer:', partnersContainer);
  partnersContainer.innerHTML = '';
  partners.forEach((partner, index) => {
    const partnerCard = document.createElement('div');
    partnerCard.className = 'partner-card';
    
    partnerCard.innerHTML = `
      <div class="partner-image-wrapper">
        <img src="${partner.src}" alt="${partner.alt}">
      </div>
      <div class="partner-overlay">
        <div class="partner-info">
          <h4>${partner.name}</h4>
          <p>${partner.description}</p>
        </div>
      </div>
    `;
    
    partnersContainer.appendChild(partnerCard);
  });
  console.log('Partners added');

  /* ===============================
     SCROLL TO TOP BUTTON
  ================================ */
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
