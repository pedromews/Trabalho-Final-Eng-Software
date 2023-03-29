let loggedInUser = sessionStorage.getItem('loggedInUser');
let searchTerm = '';

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

    searchTerm = JSON.parse(sessionStorage.getItem('searchTerm'));
    console.log('aqui: ' + searchTerm);
    services.forEach(service => {
      if ((loggedInUser == null || service.author != loggedInUser.username) &&
           service.status == 0 &&
           (service.title.includes(searchTerm) || service.description.includes(searchTerm) || searchTerm == '' || searchTerm == null))
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
      let inProgressServices = loggedInUser.inProgressServices;
      inProgressServices.push(id);

      const formDataUser = {
        balance: Number(loggedInUser.balance) - data.price,
        inProgressServices: inProgressServices,
      }
      
      const formDataService = {
        status: 1,
        actor: loggedInUser._id,
      };

      console.log(formDataUser.balance);
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
        console.log(data);
        loggedInUser = data.updatedUser;
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

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

        location.reload()
      })
      .catch(error => console.error(error));
    })
    .catch(error => console.log(error));
  }
  else
  {
    alert('You must be logged in to request a service.');
  }
}

function offerService(event, id) {
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
      fetch('http://localhost:8080/api/users/'+data.author_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(user => {
        const formDataServiceCreater = {
          balance: Number(user.balance) - data.price,
        }
        
        const formDataService = {
          status: 1,
          actor: loggedInUser._id,
        };

        let inProgressServices = loggedInUser.inProgressServices;
        inProgressServices.push(id);

        const formDataUser = {
          inProgressServices: inProgressServices,
        }

        if (formDataServiceCreater.balance < 0)
        {
          alert(`${user.username}'s balance is not enough to accept your services.`);
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

        fetch('http://localhost:8080/api/users/'+user._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataServiceCreater)
        })
        .then(response => response.json())
        .then(data => console.log(data))
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

        location.reload()
      })
      .catch(error => console.error(error));
    })
    .catch(error => console.log(error));
  }
  else
  {
    alert('You must be logged in to request a service.');
  }
}

function searchService(event)
{
  event.preventDefault();
  sessionStorage.setItem('searchTerm', JSON.stringify(event.target.form.search.value));
  location.reload();
}