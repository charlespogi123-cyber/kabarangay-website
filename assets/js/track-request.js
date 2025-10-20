document.addEventListener("partialsLoaded", () => {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("trackSearch");
  const detailsSection = document.getElementById("detailsSection");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    try {
      const response = await fetch(`${base}/data/document-request.json`);
      const data = await response.json();
      const match = data.documents.find((doc) => {
        return (
          doc.request_id.toLowerCase() === query ||
          doc.applicant.name.toLowerCase().includes(query) ||
          doc.applicant.email.toLowerCase() === query
        );
      });

      if (match) {
        renderDetails(match);
        detailsSection.hidden = false;
      } else {
        detailsSection.innerHTML = `<p>No results found for "${query}"</p>`;
        detailsSection.hidden = false;
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  });
});

function renderDetails(doc) {
  const timelineSteps = doc.timeline
    .map((step) => {
      const statusClass =
        {
          Completed: "timeline__item--completed",
          "In Progress": "timeline__item--current",
          Pending: "timeline__item--pending",
        }[step.status] || "";

      return `
        <li class="timeline__item ${statusClass}">
          <h3 class="timeline__step">${step.step}</h3>
          ${
            step.date
              ? `<time datetime="${step.date}">${formatDate(step.date)}</time>`
              : `<p>${step.status}</p>`
          }
        </li>
      `;
    })
    .join("");

  const detailsHTML = `
    <article class="details__card request">
      <header class="request__header">
        <div class="request__info">
          <h2 class="request__title">${doc.document}</h2>
          <p class="request__number">Request #${doc.request_id}</p>
        </div>
        <span class="request__status request__status--processing">${
          doc.status
        }</span>
      </header>

      <dl class="request__details-grid">
        <div class="request__detail">
          <dt class="request__label">Applicant</dt>
          <dd class="request__value">${doc.applicant.name}</dd>
        </div>
        <div class="request__detail">
          <dt class="request__label">Contact</dt>
          <dd class="request__value">${doc.applicant.contact}</dd>
        </div>
        <div class="request__detail">
          <dt class="request__label">Email</dt>
          <dd class="request__value">${doc.applicant.email}</dd>
        </div>
        <div class="request__detail">
          <dt class="request__label">Purpose</dt>
          <dd class="request__value">${doc.purpose}</dd>
        </div>
        <div class="request__detail">
          <dt class="request__label">Date Requested</dt>
          <dd class="request__value">${formatDate(doc.date_requested)}</dd>
        </div>
        <div class="request__detail">
          <dt class="request__label">Expected Completion</dt>
          <dd class="request__value">${formatDate(doc.expected_completion)}</dd>
        </div>
      </dl>

      <section class="request__update">
        <h3 class="request__update-title">Latest Update:</h3>
        <p class="request__update-text">
          ${
            doc.timeline.find((t) => t.status === "In Progress")?.step ||
            "No active updates at the moment."
          }
        </p>
      </section>
    </article>

    <article class="details__card timeline">
      <h2 class="timeline__title">Processing Timeline</h2>
      <p class="timeline__subtitle">Track the progress of your document request</p>
      <ol class="timeline__list">${timelineSteps}</ol>
    </article>
  `;

  document.getElementById("detailsSection").innerHTML = detailsHTML;
}

function formatDate(dateStr) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}
