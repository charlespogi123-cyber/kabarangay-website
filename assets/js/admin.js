document.addEventListener("DOMContentLoaded", () => {
  // 1. Protect the page: If not logged in, redirect to home.
  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    alert("Access denied! Please log in first.");
    window.location.href = "index.html";
    return; // Stop the rest of the script from running
  }

  // This event waits for the header to be loaded by partials.js
  document.addEventListener("partialsLoaded", () => {
    // 2. Find the logout button inside the loaded header and make it work.
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("isLoggedIn");
        alert("You have been logged out.");
        window.location.href = "index.html";
      });
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("isLoggedIn");
      alert("You have been logged out.");
      window.location.href = "index.html";
    });
  }
});

});