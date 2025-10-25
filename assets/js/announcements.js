import { initHeader } from "./header.js";
import { loadPartials } from "./partials.js";
import { initLoginModal } from "./login-modal.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Load partials first
  await loadPartials();

  // Then initialize header
  await initHeader();

  // Load login-modal
  await initLoginModal();

  // Other scripts for announcements
  const base = window.location.pathname.includes("kabarangay-website")
    ? "/kabarangay-website"
    : "";
  let announcementList = [];
  const storedData = sessionStorage.getItem("sortedAnnouncements");
  if (!storedData) {
    fetch(`${base}/data/announcements.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load announcement data");
        }
        return response.json();
      })
      .then((announcements) => {
        announcementList = announcements.data;
        renderAnnouncements();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    announcementList = JSON.parse(storedData);
    renderAnnouncements();
  }

  function renderAnnouncements() {
    const container = document.getElementById("announcement-list");
    announcementList
      .filter((announcement) => !announcement.is_hidden)
      .forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("announcement-item");
        div.innerHTML = `
          <h3>${item.title}</h3>
          <span class="announcement-date">Date: ${item.date}</span>
          <p>${item.description}</p>
        `;
        container.appendChild(div);
      });
  }
});
