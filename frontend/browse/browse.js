fetch('http://localhost:8080/api/services', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(services => {
    // Iterate through the services and add them to the HTML
    const servicesContainer = document.querySelector('.services-container');
    services.forEach(service => {
      console.log(service);
      const serviceElement = document.createElement('div');
      serviceElement.className = 'service';
      serviceElement.innerHTML = `
        <div>
          <h3 class="service-title">${service.title} •</h3>
          <p> Service ${service.type}</p>
        </div>
        <p class="service-author">by ${service.author}</p>
        <p class="service-description">${service.description}</p>
        <p class="service-price">$${service.price}</p>
      `;
      servicesContainer.appendChild(serviceElement);
    });
  })
  .catch(error => {
    console.error('Error fetching services:', error);
  });

const loggedInUser = sessionStorage.getItem('loggedInUser');

// get a reference to the logged-in-menu div
const loggedInMenu = document.querySelectorAll('.logged-in-menu');
const loggedOutMenu = document.querySelectorAll('.logged-out-menu');

if (loggedInUser) {
  // if the user is logged in, show the logged-in-menu div
  console.log('tava logado');
  loggedInMenu.forEach(navElement => {
    navElement.style.display = 'flex';
  });
  loggedOutMenu.forEach(navElement => {
    navElement.style.display = 'none';
  });
} else {
  // if the user is not logged in, hide the logged-in-menu div
  console.log('nao tava logado');
  loggedInMenu.forEach(navElement => {
    navElement.style.display = 'none';
  });
  loggedOutMenu.forEach(navElement => {
    navElement.style.display = 'flex';
  });
}