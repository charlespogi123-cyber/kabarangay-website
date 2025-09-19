document.addEventListener("DOMContentLoaded", () => {
  const announcementList = document.getElementById("announcement-list");

  fetch('data/announcements.json')
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        announcementList.innerHTML = "<p>No announcements yet.</p>";
        return;
      }

      data.forEach(announcement => {
        const div = document.createElement("div");
        div.classList.add("announcement");

        div.innerHTML = `
          <h4>${announcement.title}</h4>
          <p>${announcement.body}</p>
          <small>Posted on: ${new Date(announcement.date).toLocaleDateString()}</small>
          <hr/>
        `;
        announcementList.appendChild(div);
      });
    })
    .catch(error => {
      announcementList.innerHTML = "<p>Failed to load announcements.</p>";
      console.error("Error loading announcements:", error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;

      // Close others
      document.querySelectorAll('.faq-answer').forEach((el) => {
        if (el !== answer) el.style.display = 'none';
      });

      // Toggle selected
      answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    });
  });
});