fetch('/api/services')
  .then(response => response.json())
  .then(services => {
    // Iterate through the services and add them to the HTML
    const servicesContainer = document.querySelector('.services');
    services.forEach(service => {
      const serviceElement = document.createElement('div');
      serviceElement.className = 'service';
      serviceElement.innerHTML = `
        <h3 class="service-title">${service.title}</h3>
        <p class="service-author">${service.author}</p>
        <p class="service-description">${service.description}</p>
        <p class="service-price">$${service.price}</p>
        <p class="service-type">${service.type}</p>
      `;
      servicesContainer.appendChild(serviceElement);
    });
  })
  .catch(error => {
    console.error('Error fetching services:', error);
  });
