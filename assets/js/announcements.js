document.addEventListener("DOMContentLoaded", () => {
fetch(`${base}/data/announcements.json`)
  .then(response => {
    console.log('calling announcement')
    if (!response.ok) {
      throw new Error('Failed to load announcement data');
    }
    return response.json();
  })
  .then(announcements => {
    const container = document.getElementById('announcement-list');

    announcements.data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('announcement-item');
      div.innerHTML = `
        <h3>${item.title}</h3>
        <span class="announcement-date">Date: ${item.date}</span>
        <p>${item.description}</p>
      `;
      container.appendChild(div);
    });
    
  })
  .catch(error => {
    console.error('Error:', error);
  });
});