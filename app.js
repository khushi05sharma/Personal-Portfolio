const form = document.getElementById("contactForm");
const envelopePopup = document.getElementById("envelopePopup");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Show envelope popup
        envelopePopup.style.display = "block";

        // Hide after animation
        setTimeout(() => {
          envelopePopup.style.display = "none";
          form.reset();
        }, 2000);
      } else {
        alert("Oops! Something went wrong.");
      }
    })
    .catch(() => {
      alert("Oops! Try again.");
    });
});

/* HAMBURGER MENU */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

/* CLOSE MENU WHEN LINK CLICKED */

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});