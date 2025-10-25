// header.js
export const initHeader = async () => {
  const base = window.location.pathname.includes("kabarangay-website")
    ? "/kabarangay-website"
    : "";

  try {
    const res = await fetch(`${base}/partials/layout/header.html`);
    const data = await res.text();
    document.getElementById("header-container").innerHTML = data;

    // ===== Highlight Current Page =====
    const navLinks = document.querySelectorAll(".nav__link");
    let currentPage = window.location.pathname.split("/").pop().split(".")[0];

    if (currentPage === "index") {
      currentPage = window.location.hash
        ? window.location.hash.substring(1)
        : "home";
    }

    navLinks.forEach((link) => {
      link.classList.toggle(
        "nav__link--active",
        link.dataset.page === currentPage
      );
      link.classList.toggle("active", link.dataset.page === currentPage);
    });

    // ===== Mobile Menu Toggle (ARIA) =====
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");

    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-hidden", "true");

      mobileMenuBtn.addEventListener("click", () => {
        const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";

        mobileMenuBtn.setAttribute("aria-expanded", String(!expanded));
        navMenu.setAttribute("aria-hidden", String(expanded));
        navMenu.classList.toggle("active");
      });

      // Optional: Allow closing with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          navMenu.setAttribute("aria-hidden", "true");
        }
      });
    }

    // ===== Staff Login Modal (ARIA) =====
    const staffLoginBtn = document.getElementById("staffLoginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeModal = document.getElementById("closeModal");

    if (staffLoginBtn && loginModal && closeModal) {
      loginModal.setAttribute("aria-hidden", "true");

      staffLoginBtn.addEventListener("click", () => {
        loginModal.setAttribute("aria-hidden", "false");
        loginModal.focus();
      });

      closeModal.addEventListener("click", () => {
        loginModal.setAttribute("aria-hidden", "true");
        staffLoginBtn.focus();
      });

      // Close modal with Escape key
      document.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          loginModal.getAttribute("aria-hidden") === "false"
        ) {
          loginModal.setAttribute("aria-hidden", "true");
          staffLoginBtn.focus();
        }
      });
    }
  } catch (error) {
    console.error("Error loading header:", error);
  }
};
