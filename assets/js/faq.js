// assets/js/faq.js
document.addEventListener("DOMContentLoaded", function () {
  function initFaq() {
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length === 0) return false;

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (!question) return;

      // Prevent duplicate listeners
      if (!question._faqBound) {
        question.addEventListener("click", () => {
          item.classList.toggle("active");
        });
        question._faqBound = true;
      }
    });

    return true;
  }

  // Try immediately (in case FAQ is inline, not loaded)
  if (initFaq()) return;

  // MutationObserver fallback (waits for partials.js to inject FAQ)
  const observer = new MutationObserver(() => {
    if (initFaq()) {
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
