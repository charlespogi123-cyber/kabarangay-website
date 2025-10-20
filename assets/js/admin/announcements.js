document.addEventListener("partialsLoaded", () => {
  const base = window.location.pathname.includes("kabarangay-website")
    ? "/kabarangay-website"
    : "";
  let announcementsData = [];
  let isEditMode = false;
  let currentEditIndex = null;

  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const form = document.getElementById("add-announcement-form");
  const formHeader = document.querySelector(".form-container h3");
  const submitBtn = form.querySelector(".add-btn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleInput = form.querySelector("#title");
      const contentInput = form.querySelector("#content");
      const prioritySelect = form.querySelector("#priority");

      const newAnnouncement = {
        title: titleInput.value.trim(),
        description: contentInput.value.trim(),
        priority: prioritySelect.value.toLowerCase(),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        is_hidden: false,
      };

      if (!newAnnouncement.title || !newAnnouncement.description) {
        alert("Please fill in all required fields.");
        return;
      }

      if (isEditMode && currentEditIndex !== null) {
        // Update existing announcement
        const existing = announcementsData[currentEditIndex];
        newAnnouncement.is_hidden = existing.is_hidden; // retain hidden state
        announcementsData[currentEditIndex] = newAnnouncement;
      } else {
        // Add new announcement
        announcementsData.push(newAnnouncement);
      }

      // Reset form and state
      titleInput.value = "";
      contentInput.value = "";
      prioritySelect.value = "medium";

      isEditMode = false;
      currentEditIndex = null;

      formHeader.textContent = "➕ Add New Announcement";
      submitBtn.textContent = "+ Add";

      renderAnnouncements();
    });
  }

  const container = document.getElementById("announcement-list");

  function renderAnnouncements() {
    container.innerHTML = "";

    console.log(announcementsData, typeof announcementsData);
    const sortedAnnouncements = announcementsData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;

      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    sessionStorage.setItem(
      "sortedAnnouncements",
      JSON.stringify(sortedAnnouncements)
    );

    sortedAnnouncements.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "announcement-card";

      if (item.is_hidden) {
        card.classList.add("hidden");
      }

      card.innerHTML = `
        <h4>${item.title}</h4>
        <div class="meta">
          <span class="tag ${item.priority}">${item.priority}</span>
          <span class="date">📅 ${new Date(
            item.date
          ).toLocaleDateString()}</span>
        </div>
        <p>${item.description}</p>
        <div class="actions">
          <button class="btn view">👁 ${
            item.is_hidden ? "Unhide" : "Hide"
          }</button>
          <button class="btn edit">✏️ Edit</button>
          <button class="btn delete">🗑 Delete</button>
        </div>
      `;

      // Toggle hide
      card.querySelector(".btn.view").addEventListener("click", () => {
        item.is_hidden = !item.is_hidden;
        renderAnnouncements();
      });

      // Delete
      card.querySelector(".btn.delete").addEventListener("click", () => {
        if (confirm(`Delete ${item.title}?`)) {
          announcementsData.splice(index, 1); // Remove from data array
          renderAnnouncements(); // Re-render
        }
      });

      // ✏️ Edit
      card.querySelector(".btn.edit").addEventListener("click", () => {
        isEditMode = true;
        currentEditIndex = index;

        form.querySelector("#title").value = item.title;
        form.querySelector("#content").value = item.description;
        form.querySelector("#priority").value = item.priority;

        formHeader.textContent = "✏️ Edit Announcement";
        submitBtn.textContent = "Update";

        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      container.appendChild(card);
    });
  }

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
        announcementsData = announcements.data;
        renderAnnouncements();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    announcementsData = JSON.parse(storedData);
    renderAnnouncements();
  }
});
