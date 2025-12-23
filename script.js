// script.js — CryoCore Navigation & Animations
// ============================================

console.log("🔥 SCRIPT.JS UPDATED AT " + new Date().toLocaleTimeString());
document.addEventListener("DOMContentLoaded", () => {

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

});
