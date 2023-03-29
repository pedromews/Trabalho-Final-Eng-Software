let loggedInUser = sessionStorage.getItem('loggedInUser');

// get a reference to the logged-in-menu div
const loggedInMenu = document.querySelectorAll('.logged-in-menu');
const loggedOutMenu = document.querySelectorAll('.logged-out-menu');

let serviceToBeRated;

if (loggedInUser) {
  // if the user is logged in, show the logged-in-menu div
  console.log('tava logado');
  loggedInMenu.forEach(navElement => {
    navElement.style.display = 'flex';
  });
  loggedOutMenu.forEach(navElement => {
    navElement.style.display = 'none';
  });

  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  console.log('1: ' + loggedInUser._id);
  fetch('http://localhost:8080/api/users/'+loggedInUser._id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(user => {
    // Iterate through the services and add them to the HTML
    const inProgressContainer = document.querySelector('.in-progress');
    const finishedContainer = document.querySelector('.finished');

    let ownServices = user.ownServices;
    let inProgressServices = user.inProgressServices;
    let finishedServices = user.finishedServices;

    inProgressServices.forEach(service => {
      console.log(service);
      fetch('http://localhost:8080/api/services/'+service, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      .then(response => response.json())
      .then(data => {
        let text;
        let button;

        if (data.type == 'offer') {
          text = `you requested this service in ${formatDate(data.updatedAt)}`;
          button = `<button href="#" onclick="finishService(event, '${data._id}')">Finish</button>`;
        }
        else
        {
          text = `you offered your services in ${formatDate(data.updatedAt)}`;
          button = ``; 
        }
        
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service';
        serviceElement.innerHTML = `
          <div>
            <h3 class="service-title">${data.title} •</h3>
            <p> Service ${data.type} by ${data.author}</p>
          </div>
          <p class="service-author">${text}</p>
          <p class="service-description">${data.description}</p>
          ${button}
        `;

        inProgressContainer.appendChild(serviceElement);
      })
      .catch(error => console.error(error));
    });
    
    ownServices.forEach(service => {
      fetch('http://localhost:8080/api/services/'+service, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      .then(response => response.json())
      .then(data => {
        if (data.status == '0')
          return;

        fetch('http://localhost:8080/api/users/'+data.actor, {
          method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(actor => {
          let text;
          let button;

          if (data.type == 'request') {
            text = `${actor.username} offered their services in ${formatDate(data.updatedAt)}`;
            button = `<button href="#" onclick="finishService(event, '${data._id}')">Finish</button>`;
          }
          else
          {
            text = `${actor.username} requested this service in ${formatDate(data.updatedAt)}`;
            button = ``; 
          }

          if (data.status == '1')
          {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'service';
            serviceElement.innerHTML = `
              <div>
                <h3 class="service-title">${data.title} •</h3>
                <p> Service ${data.type} by you</p>
              </div>
              <p class="service-author">${text}</p>
              <p class="service-description">${data.description}</p>
              ${button}
            `;

            inProgressContainer.appendChild(serviceElement);
          }
          else if (data.status == '2')
          {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'service';
            serviceElement.innerHTML = `
              <div>
                <h3 class="service-title">${data.title} •</h3>
                <p> Service ${data.type} by you</p>
              </div>
              <p class="service-author">${text}</p>
              <p class="service-description">${data.description}</p>
              <p class="service-rating">Rating: ${data.rating}</p>
            `;

            finishedContainer.appendChild(serviceElement);
          }
        })
        .catch(error => console.log(error));         
      })
      .catch(error => console.error(error));
    })

    finishedServices.forEach(service => {
      fetch('http://localhost:8080/api/services/'+service, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      .then(response => response.json())
      .then(data => {
        let text;

        if (data.type == 'offer') {
          text = `you requested this service in ${formatDate(data.updatedAt)}`;
        }
        else
        {
          text = `you offered your services in ${formatDate(data.updatedAt)}`;
        }
        
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service';
        serviceElement.innerHTML = `
          <div>
            <h3 class="service-title">${data.title} •</h3>
            <p> Service ${data.type} by ${data.author}</p>
          </div>
          <p class="service-author">${text}</p>
          <p class="service-description">${data.description}</p>
          <p class="service-rating">Rating: ${data.rating}</p>
        `;

        finishedContainer.appendChild(serviceElement);
      })
      .catch(error => console.error(error));
    })
  })
  .catch(error => {
    console.error('Error fetching services:', error);
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

function finishService(event, id)
{
  event.preventDefault();

  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  const formDataService = {
    status: 2,
  }

  fetch('http://localhost:8080/api/services/'+id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataService)
  })
  .then(response => response.json())
  .then(service => {
    serviceToBeRated = service.updatedService;
    sessionStorage.setItem('serviceToBeRated', JSON.stringify(serviceToBeRated)); 

    let offerer_id;
    let requester_id;

    if (service.updatedService.type == 'offer')
    {
      offerer_id = service.updatedService.author_id;
      requester_id = service.updatedService.actor;
    }
    else
    {
      offerer_id = service.updatedService.actor;
      requester_id = service.updatedService.author_id;
    }

    console.log('1f: ' + offerer_id);
    fetch('http://localhost:8080/api/users/'+offerer_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(offerer => {
      const formDataServiceOfferer = {
        balance: Number(offerer.balance) + Number(service.updatedService.price),
      };

      console.log(formDataServiceOfferer.balance);

      console.log('2f: ' + offerer_id);
      fetch('http://localhost:8080/api/users/'+offerer_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataServiceOfferer)
      })
      .then(response => response.json())
      .then(offerer2 => {
        if (loggedInUser._id == offerer2._id)
        {
          loggedInUser = offerer2.updatedUser;
          sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        }
        
        console.log('3f: ' + requester_id);
        fetch('http://localhost:8080/api/users/'+requester_id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(response => response.json())
        .then(requester => {
          let index = requester.inProgressServices.indexOf(id);
          let inProgressServices = requester.inProgressServices;
          inProgressServices.splice(index, 1);
          let finishedServices = requester.finishedServices;
          finishedServices.push(id);

          const formDataServiceRequester = {
            inProgressServices: inProgressServices,
            finishedServices: finishedServices,
          };

          console.log('4f: ' + requester_id);
          fetch('http://localhost:8080/api/users/'+requester_id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataServiceRequester)
          })
          .then(response => response.json)
          .then(requester2 => {
            if (loggedInUser._id == requester2._id)
            {
              loggedInUser = requester2.updatedUser;
              sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            }

            window.location.replace('../rate/rate.html');
          })
          .catch(error => console.log(error))
        })
      })
      .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
}

function formatDate(dateString)
{
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} at ${hours}h${minutes}`;
}