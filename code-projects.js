const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        /* Add .show class to trigger CSS opacity + translateY transition */
        entry.target.classList.add("show");
        /* Unobserve after reveal so animation only plays once */
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08 /* slightly lower threshold so featured card triggers earlier */,
  },
);

/* staggered delay — each card animates 0.15s after previous */
cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.15}s`;
  observer.observe(card);
});
