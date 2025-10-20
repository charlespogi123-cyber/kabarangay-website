document.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll("[data-include]");
  const promises = [];

  includeElements.forEach((el) => {
    const file = el.getAttribute("data-include");
    const promise = fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not fetch ${file}`);
        return res.text();
      })
      .then((data) => {
        el.outerHTML = data;
      })
      .catch((err) => {
        console.error("Error loading partial:", err);
        el.outerHTML = `<p style="color:red;">Error loading content.</p>`;
      });
    promises.push(promise);
  });

  // After ALL partials have been fetched and inserted...
  Promise.all(promises).then(() => {
    // ...dispatch the custom event that index.html is waiting for.
    document.dispatchEvent(new CustomEvent("partialsLoaded"));
    console.log("All partials loaded successfully.");
  });
});
