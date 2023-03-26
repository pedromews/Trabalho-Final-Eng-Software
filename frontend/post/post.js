const form = document.getElementById('post-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  fetch('/post-service', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      successMessage.classList.remove('hidden');

      // add new service to homepage
      const title = formData.get('title');
      const description = formData.get('description');
      const price = formData.get('price');
      const servicesContainer = document.getElementById('services-container');
      const newService = `
        <div class="service">
          <div class="service-header">
            <h3 class="service-title">${title}</h3>
            <p class="service-price">$${price}</p>
          </div>
          <div class="service-details">
            <p class="service-description">${description}</p>
          </div>
        </div>
      `;
      servicesContainer.innerHTML += newService;

    } else {
      console.error('Server error:', response.status);
    }
  })
  .catch(error => {
    console.error('Request failed:', error);
  });
});
