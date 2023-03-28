let loggedInUser = sessionStorage.getItem('loggedInUser');

// get a reference to the logged-in-menu div
const loggedInMenu = document.querySelectorAll('.logged-in-menu');
const loggedOutMenu = document.querySelectorAll('.logged-out-menu');

if (loggedInUser) {
  // if the user is logged in, show the logged-in-menu div
  console.log('tava logado' + loggedInUser);
  loggedInMenu.forEach(navElement => {
    navElement.style.display = 'flex';
  });
  loggedOutMenu.forEach(navElement => {
    navElement.style.display = 'none';
  });

  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  
  document.getElementById("balance").textContent = loggedInUser.balance;
  document.querySelector('.balance-container').style.display = 'flex';
} else {
  // if the user is not logged in, hide the logged-in-menu div
  console.log('nao tava logado');
  loggedInMenu.forEach(navElement => {
    navElement.style.display = 'none';
  });
  loggedOutMenu.forEach(navElement => {
    navElement.style.display = 'flex';
  });

  document.querySelector('.balance-container').style.display = 'none';
}



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
    loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    services.forEach(service => {
      if ((loggedInUser == null || service.author != loggedInUser.username) && service.status == 0)
      {
        let buttonText;
        let buttonFunction;
        if (service.type == 'offer'){
          buttonFunction = 'requestService';
          buttonText = 'Request this service';
        }  
        else {
          buttonFunction = 'offerService';
          buttonText = 'Offer your services';
        }

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
          <button href="#" onclick="${buttonFunction}(event, '${service._id}')">${buttonText}</button>
        `;
        servicesContainer.appendChild(serviceElement);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching services:', error);
  });

function requestService(event, id) {
  event.preventDefault();

  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  if (loggedInUser)
  {
    fetch('http://localhost:8080/api/services/'+id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      const formDataUser = {
        balance: Number(loggedInUser.balance) - data.price,
        othersServices: loggedInUser.inProgressServices.push(id),
      }
      
      const formDataService = {
        status: 1,
        actor: loggedInUser._id,
      };

      if (formDataUser.balance < 0)
      {
        alert('Your balance is not enough to request this service.');
        return;
      }

      fetch('http://localhost:8080/api/users/'+loggedInUser._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataUser)
      })
      .then(response => response.json())
      .then(data => {
        loggedInUser = data.updatedUser;
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      })
      .catch(error => console.error(error));

      fetch('http://localhost:8080/api/services/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataService)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

      const formData = {
        balance: 25 + Number(loggedInUser.balance),
      };

      location.reload()
    })
    .catch(error => console.log(error));
  }
  else
  {
    alert('You must be logged in to request a service.');
  }
}