// document.addEventListener("DOMContentLoaded", function () {
//   const navLinks = document.querySelectorAll(".nav__link");
//   const mobileMenuBtn = document.getElementById("mobileMenuBtn");
//   const navMenu = document.getElementById("navMenu");
//   const faqItems = document.querySelectorAll(".faq-item");

//   // --- Highlight active link based on current URL ---
//   let currentPage = window.location.pathname.split("/").pop().split(".")[0]; 
//   console.log(currentPage)
//   // e.g. "services" for services.html, "track-request" for track-request.html

//   // If we're on index.html, also check for hash (#home, #faq, etc.)
//   if (currentPage === "index") {
//     if (window.location.hash) {
//       currentPage = window.location.hash.substring(1); // remove #
//     } else {
//       currentPage = "home"; // default section
//     }
//   }

//   console.log(navLinks)
//   // Remove any old "active" and apply to the matching link
//   navLinks.forEach((link) => {
//     console.log(link.getAttribute("data-page"))
//     link.classList.remove("active", "nav__link--active");
//     if (link.getAttribute("data-page") === currentPage) {
//       link.classList.add("active", "nav__link--active");
//     }
//   });

//   // --- Mobile menu toggle ---
//   if (mobileMenuBtn) {
//     mobileMenuBtn.addEventListener("click", function () {
//       navMenu.classList.toggle("active");
//     });
//   }

//   // --- FAQ toggle ---
//   faqItems.forEach((item) => {
//     const question = item.querySelector(".faq-question");
//     if (question) {
//       question.addEventListener("click", () => {
//         item.classList.toggle("active");
//       });
//     }
//   });
// });

// main.js
document.addEventListener("DOMContentLoaded", function () {
  fetch("../../partials/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;

      // Now header exists → query nav links
      const navLinks = document.querySelectorAll(".nav__link");
      console.log("Found navLinks:", navLinks);

      // Highlight current page
      let currentPage = window.location.pathname.split("/").pop().split(".")[0];
      if (currentPage === "index") {
        currentPage = window.location.hash ? window.location.hash.substring(1) : "home";
      }

      navLinks.forEach((link) => {
        link.classList.remove("active", "nav__link--active");
        if (link.getAttribute("data-page") === currentPage) {
          link.classList.add("active", "nav__link--active");
        }
      });

      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const navMenu = document.getElementById("navMenu");
      if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
          navMenu.classList.toggle("active");
        });
      }
    });
});
