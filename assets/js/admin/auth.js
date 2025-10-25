export const protectPage = () => {
  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    alert("Access denied! Please log in first.");
    window.location.href = "index.html";
    return false; // Stop further execution
  }

  return true;
};

/**
 * Initializes logout functionality.
 * Can be safely called multiple times — it will rebind after partials are loaded.
 */
export const initLogout = () => {
  const attachLogout = () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("isLoggedIn");
        alert("You have been logged out.");
        window.location.href = "index.html";
      });
    }
  };

  // Bind immediately (if button exists on static pages)
  attachLogout();

  // Re-bind when partials (like header) are loaded
  document.addEventListener("partialsLoaded", attachLogout);
};
