// script.js — CryoCore Navigation & Animations
// ============================================

console.log("🔥 SCRIPT.JS UPDATED AT " + new Date().toLocaleTimeString());

// Since script is loaded at the end, DOM is ready, no need for DOMContentLoaded
// document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     NAV ELEMENTS
  ================================ */
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("header[id], section[id]");

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
     CONTACT FORM AJAX SUBMISSION
  ================================ */
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const messageDiv = document.getElementById('formMessage');

    messageDiv.textContent = 'Sending...';
    messageDiv.style.color = 'black';

    try {
      const response = await fetch('contact.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.status === 'success') {
        messageDiv.textContent = result.message;
        messageDiv.style.color = 'green';
        contactForm.reset();
      } else {
        messageDiv.textContent = result.message;
        messageDiv.style.color = 'red';
      }
    } catch (error) {
      messageDiv.textContent = 'An error occurred. Please try again.';
      messageDiv.style.color = 'red';
    }
  });

  /* ===============================
     DYNAMIC PROJECTS SECTION
  ================================ */
  console.log('Running dynamic projects');
  const projects = [
    {
      title: "Lusaka Cold Storage Facility",
      description: "A state-of-the-art facility serving Zambia's agricultural sector.",
      location: "Lusaka, Zambia"
    },
    {
      title: "Hoima Energy Project",
      description: "Integrating renewable energy solutions for sustainable cold storage.",
      location: "Hoima, Uganda"
    },
    {
      title: "Pan-African Cold Chain Network",
      description: "Expanding cold storage infrastructure across East Africa.",
      location: "Multiple Locations"
    }
  ];

  const projectsContainer = document.getElementById('projectsContainer');
  console.log('projectsContainer:', projectsContainer);
  projects.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-item';
    projectDiv.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <small>Location: ${project.location}</small>
    `;
    projectsContainer.appendChild(projectDiv);
  });
  console.log('Projects added');

  /* ===============================
     DYNAMIC PARTNERS LOGOS
  ================================ */
  console.log('Running dynamic partners');
  const partners = [
    { src: "data:image/svg+xml;base64," + btoa('<svg width="120" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="60" fill="#1E4C8F"/><text x="60" y="35" font-family="Arial" font-size="12" fill="white" text-anchor="middle">Ministry of Trade</text></svg>'), alt: "Ministry of Trade" },
    { src: "data:image/svg+xml;base64," + btoa('<svg width="120" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="60" fill="#2563A6"/><text x="60" y="35" font-family="Arial" font-size="12" fill="white" text-anchor="middle">PureGrow Africa</text></svg>'), alt: "PureGrow Africa" },
    { src: "data:image/svg+xml;base64," + btoa('<svg width="120" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="60" fill="#4FA3C8"/><text x="60" y="35" font-family="Arial" font-size="12" fill="white" text-anchor="middle">Another Partner</text></svg>'), alt: "Another Partner" }
  ];

  const partnersContainer = document.getElementById('partnersContainer');
  console.log('partnersContainer:', partnersContainer);
  partners.forEach(partner => {
    const img = document.createElement('img');
    img.src = partner.src;
    img.alt = partner.alt;
    img.style.maxWidth = '120px';
    img.style.margin = '10px';
    partnersContainer.appendChild(img);
  });
  console.log('Partners added');

