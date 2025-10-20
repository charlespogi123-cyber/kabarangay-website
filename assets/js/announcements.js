document.addEventListener("partialsLoaded", () => {
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
    announcements = JSON.parse(storedData);
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
