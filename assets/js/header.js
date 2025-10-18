const base = window.location.pathname.includes("kabarangay-website")
  ? "/kabarangay-website"
  : "";

document.addEventListener("DOMContentLoaded", function () {
    fetch(`${base}/partials/layout/header.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;

      // Highlight current page
      const navLinks = document.querySelectorAll(".nav__link");
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
