/* =====================================================
   experience.js
   Handles: hamburger menu, scroll reveal animations,
   smooth scrolling for nav links
   ===================================================== */

/* ── HAMBURGER MENU TOGGLE ── */
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  // Toggle active class on hamburger (animates to X)
  hamburger.classList.toggle("active");
  // Toggle open class on nav (shows/hides dropdown)
  navLinks.classList.toggle("open");
});

// Close mobile menu when any nav link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

/* ── SCROLL REVEAL — Feature rows ──
   Watches each .feature-row and .learning-card
   Adds .visible class when element enters viewport
   CSS handles the actual animation (opacity + translateY)
── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Unobserve after reveal so it doesn't re-trigger
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12, // trigger when 12% of element is visible
  }
);

// Observe all feature rows
document.querySelectorAll(".feature-row.reveal").forEach((row) => {
  revealObserver.observe(row);
});

/* ── STAGGERED REVEAL — Learning cards ──
   Each card gets a slightly later transition delay
   so they animate in one by one, not all at once
── */
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Apply staggered delay to each learning card
document.querySelectorAll(".learning-card.reveal-card").forEach((card, index) => {
  // 0.1s, 0.2s, 0.3s... delay per card
  card.style.transitionDelay = `${index * 0.12}s`;
  card.style.transition = `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`;
  cardObserver.observe(card);
});

/* ── SMOOTH SCROLL ──
   Handles anchor links like #work, #learnings
   with offset for the fixed navbar (80px height)
── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    const navbarHeight = 80; // 5rem fixed navbar
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  });
});

/* ── ACTIVE NAV LINK HIGHLIGHT ──
   Highlights the correct nav link based on scroll position
── */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active from all
        navAnchors.forEach((a) => a.classList.remove("active-nav"));
        // Add active to matching link
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add("active-nav");
      }
    });
  },
  {
    rootMargin: "-40% 0px -55% 0px", // trigger near middle of viewport
    threshold: 0,
  }
);

sections.forEach((section) => sectionObserver.observe(section));