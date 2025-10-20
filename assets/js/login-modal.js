// All modal-related logic is now in one place.
// This script runs only AFTER the "partialsLoaded" event fires.

// document.addEventListener("partialsLoaded", () => {
//   console.log("login modal");
const loginModal = document.getElementById("loginModal");
const openModalBtn = document.getElementById("staffLoginBtn");
const closeModalBtn = document.getElementById("closeModal");
const overlay = loginModal.querySelector(".modal__overlay");
const loginForm = document.getElementById("loginFormModal");
const errorMsg = document.getElementById("loginError");

console.log(openModalBtn, loginModal);

openModalBtn.addEventListener("click", () => {
  console.log("clicked login modal", loginModal);
  loginModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

// --- Close Modal ---
console.log(closeModalBtn, overlay);
// if (closeModalBtn && overlay) {
// [closeModalBtn, overlay].forEach((el) => {
if (closeModalBtn) {
  [closeModalBtn].forEach((el) => {
    el.addEventListener("click", () => {
      loginModal.classList.remove("show");
      document.body.style.overflow = "";
      if (errorMsg) errorMsg.style.display = "none";
    });
  });
}

// --- Login Form Submission Logic ---
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    const username = document.getElementById("modalUsername").value.trim();
    const password = document.getElementById("modalPassword").value.trim();

    // Check credentials
    if (username === "admin" && password === "1234") {
      // SUCCESS
      sessionStorage.setItem("isLoggedIn", "true");
      window.location.href = "admin-dashboard.html";
    } else {
      // FAILURE
      alert("Invalid username or password.");
      errorMsg.textContent = "Invalid username or password.";
      errorMsg.style.display = "block";
    }
  });
}
// });
