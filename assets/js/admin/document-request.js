document.addEventListener("DOMContentLoaded", () => {
  const base = window.location.pathname.includes("kabarangay-website")
    ? "/kabarangay-website"
    : "";

  const searchInput = document.getElementById("searchInput");
  const cardContainer = document.getElementById("cardContainer");
  let requestData = null;

  // Fetch JSON data
  const storedData = sessionStorage.getItem("documents");
  if (!storedData) {
    fetch(`${base}/data/document-request.json`)
      .then((response) => response.json())
      .then((data) => {
        requestData = data;
        renderCards(requestData.documents);
      })
      .catch((err) => {
        console.error("Failed to load request.json:", err);
        cardContainer.innerHTML =
          "<p class='text-danger'>Error loading request data.</p>";
      });
  } else {
    requestData = JSON.parse(storedData);
    renderCards(requestData);
  }

  // Helper: get progress bar status and color
  function getProgress(status) {
    switch (status) {
      case "Pending":
        return { value: 25, label: "Pending", class: "bg-secondary" };
      case "Processing":
        return { value: 50, label: "Processing", class: "bg-info" };
      case "Completed":
        return { value: 100, label: "Completed", class: "bg-success" };
      case "Cancelled":
        return { value: 100, label: "Cancelled", class: "bg-danger" };
      default:
        return { value: 0, label: "Unknown", class: "bg-dark" };
    }
  }

  // Helper: update timeline based on status
  function updateTimeline(status, timeline) {
    const today = new Date().toISOString().split("T")[0];

    if (status === "Completed") {
      return timeline.map((step) => ({
        ...step,
        status: "Completed",
        date: step.date || today,
      }));
    }

    if (status === "Cancelled") {
      let updated = false;
      return timeline.map((step) => {
        if (!updated && step.status !== "Completed") {
          updated = true;
          return {
            ...step,
            status: "Cancelled",
            date: today,
          };
        }
        return step;
      });
    }

    if (status === "Processing") {
      let updated = false;
      return timeline.map((step) => {
        if (step.status === "Completed") return step;
        if (!updated) {
          updated = true;
          return {
            ...step,
            status: "In Progress",
            date: step.date || today,
          };
        }
        return { ...step, status: "Pending" };
      });
    }

    // Leave timeline untouched for Pending
    return timeline;
  }

  // Render all cards
  function renderCards(documents) {
    cardContainer.innerHTML = "";
    sessionStorage.setItem("documents", JSON.stringify(documents));

    documents.forEach((doc, index) => {
      const progress = getProgress(doc.status);

      const cardDiv = document.createElement("div");
      cardDiv.className = "card mb-3";

      cardDiv.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center">
          <span><strong>Request ID:</strong> ${doc.request_id}</span>
          <div>
            <label for="statusSelect-${index}" class="mr-2 mb-0"><strong>Status:</strong></label>
            <select class="custom-select" id="statusSelect-${index}" style="width: auto; display: inline-block;">
              <option ${
                doc.status === "Pending" ? "selected" : ""
              }>Pending</option>
              <option ${
                doc.status === "Processing" ? "selected" : ""
              }>Processing</option>
              <option ${
                doc.status === "Completed" ? "selected" : ""
              }>Completed</option>
              <option ${
                doc.status === "Cancelled" ? "selected" : ""
              }>Cancelled</option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <p><strong>Applicant:</strong> ${doc.applicant.name}</p>
              <p><strong>Contact:</strong> ${doc.applicant.contact}</p>
              <p><strong>Email:</strong> ${doc.applicant.email}</p>
              <p><strong>Purpose:</strong> ${doc.purpose}</p>
            </div>
            <div class="col-md-6">
              <p><strong>Document:</strong> ${doc.document}</p>
              <p><strong>Date Requested:</strong> ${doc.date_requested}</p>
              <p><strong>Expected Completion:</strong> ${
                doc.expected_completion
              }</p>
            </div>
          </div>
          <div class="mt-3">
            <label><strong>Progress:</strong></label>
            <div class="progress">
              <div class="progress-bar ${
                progress.class
              }" id="progressBar-${index}" role="progressbar"
                style="width: ${progress.value}%;" 
                aria-valuenow="${
                  progress.value
                }" aria-valuemin="0" aria-valuemax="100">
                ${progress.label}
              </div>
            </div>
          </div>
        </div>
      `;

      cardContainer.appendChild(cardDiv);

      // Attach change listener to dropdown
      const statusSelect = document.getElementById(`statusSelect-${index}`);
      const progressBar = document.getElementById(`progressBar-${index}`);

      statusSelect.addEventListener("change", (e) => {
        const newStatus = e.target.value;
        doc.status = newStatus;

        // Update timeline
        doc.timeline = updateTimeline(newStatus, doc.timeline);

        // Update progress bar
        const progress = getProgress(newStatus);
        progressBar.style.width = `${progress.value}%`;
        progressBar.className = `progress-bar ${progress.class}`;
        progressBar.textContent = progress.label;

        console.log(`Status for ${doc.request_id} changed to:`, newStatus);
        console.log("Updated timeline:", doc.timeline);
      });
    });
  }

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

    if (!requestData || !requestData.documents) return;

    const filteredDocs = requestData.documents.filter((doc) => {
      return (
        doc.request_id.toLowerCase().includes(query) ||
        doc.applicant.name.toLowerCase().includes(query) ||
        doc.document.toLowerCase().includes(query)
      );
    });

    if (filteredDocs.length > 0) {
      renderCards(filteredDocs);
    } else {
      cardContainer.innerHTML = "<p>No matching results.</p>";
    }
  });
});
