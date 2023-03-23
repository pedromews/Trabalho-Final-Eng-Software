const serviceTemplate = document.querySelector('#service-template');
const servicesContainer = document.querySelector('.services-container');

fetch('../services.json')
  .then(response => response.json())
  .then(services => {
    services.forEach(service => {
      const serviceElement = document.importNode(serviceTemplate.content, true);

      serviceElement.querySelector('.service-title').textContent = service.title;
      serviceElement.querySelector('.service-author').textContent = `By ${service.author}`;
      serviceElement.querySelector('.service-description').textContent = service.description;
      serviceElement.querySelector('.service-price').textContent = `$${service.price}`;

      servicesContainer.appendChild(serviceElement);
    });
  })
  .catch(error => console.log(error));

