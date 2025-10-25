// modal-login.js
export const initLoginModal = () => {
  console.log("Initializing login modal...");

  const loginModal = document.getElementById("loginModal");
  const openModalBtn = document.getElementById("staffLoginBtn");
  const closeModalBtn = document.getElementById("closeModal");
  const overlay = loginModal
    ? loginModal.querySelector(".modal__overlay")
    : null;
  const loginForm = document.getElementById("loginFormModal");
  const errorMsg = document.getElementById("loginError");

  if (!loginModal || !openModalBtn) {
    console.warn(
      "Login modal elements not found. Skipping modal initialization."
    );
    return;
  }

  // --- Open Modal ---
  openModalBtn.addEventListener("click", () => {
    console.log("Opening login modal...");
    loginModal.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  // --- Close Modal ---
  const closeElements = [closeModalBtn, overlay].filter(Boolean);
  closeElements.forEach((el) => {
    el.addEventListener("click", () => {
      loginModal.classList.remove("show");
      document.body.style.overflow = "";
      if (errorMsg) errorMsg.style.display = "none";
    });
  });

  // --- Login Form Submission Logic ---
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("modalUsername").value.trim();
      const password = document.getElementById("modalPassword").value.trim();

      if (username === "admin" && password === "1234") {
        // SUCCESS
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.href = "admin-dashboard.html";
      } else {
        // FAILURE
        alert("Invalid username or password.");
        if (errorMsg) {
          errorMsg.textContent = "Invalid username or password.";
          errorMsg.style.display = "block";
        }
      }
    });
  }

  console.log("Login modal initialized successfully.");
};
