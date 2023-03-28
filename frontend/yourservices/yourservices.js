let loggedInUser = sessionStorage.getItem('loggedInUser');

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

  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  
  fetch('http://localhost:8080/api/users/'+loggedInUser._id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    // Iterate through the services and add them to the HTML
    const inProgressContainer = document.querySelector('.in-progress');
    const finishedContainer = document.querySelector('.finished');

    let ownServices = data.ownServices;
    let inProgressServices = data.inProgressServices;
    let finishedServices = data.finishedServices;

    inProgressServices.forEach(service => {
      fetch('http://localhost:8080/api/services/'+service._id, {
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
          text = `you requested this service at ${data.updateAt}`;
          button = `<button href="#" onclick="finishService(event, '${data._id}')">Finish</button>`;
        }
        else
        {
          text = `you offered your services at ${data.updateAt}`;
          button = ``; 
        }
        
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service';
        serviceElement.innerHTML = `
          <div>
            <h3 class="service-title">${data.title} •</h3>
            <p> Service ${data.type} by ${data.author}</p>
          </div>
          <p class="service-actor">${text}</p>
          <p class="service-description">${data.description}</p>
          ${button}
        `;

        inProgressServices.appendChild(serviceElement);
      })
      .catch(error => console.error(error));
    })

    ownServices.forEach(service => {
      fetch('http://localhost:8080/api/services/'+service._id, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      .then(response => response.json())
      .then(data => {
        let text;
        let button;

        if (data.type == 'request') {
          text = `${data.actor} offered their services at ${data.updateAt}`;
          button = `<button href="#" onclick="finishService(event, '${data._id}')">Finish</button>`;
        }
        else
        {
          text = `${data.actor} requested this service at ${data.updateAt}`;
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
            <p class="service-actor">${text}</p>
            <p class="service-description">${data.description}</p>
            ${button}
          `;

          inProgressServices.appendChild(serviceElement);
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
            <p class="service-actor">${text}</p>
            <p class="service-description">${data.description}</p>
          `;

          finishedServices.appendChild(serviceElement);
        }
        
      })
      .catch(error => console.error(error));
    })

    finishedServices.forEach(service => {
      fetch('http://localhost:8080/api/services/'+service._id, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      .then(response => response.json())
      .then(data => {
        let text;

        if (data.type == 'offer') {
          text = `you requested this service at ${data.updateAt}`;
        }
        else
        {
          text = `you offered your services at ${data.updateAt}`;
        }
        
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service';
        serviceElement.innerHTML = `
          <div>
            <h3 class="service-title">${data.title} •</h3>
            <p> Service ${data.type} by ${data.author}</p>
          </div>
          <p class="service-actor">${text}</p>
          <p class="service-description">${data.description}</p>
        `;

        finishedServices.appendChild(serviceElement);
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

function finishService(event, id) {
  /*
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
      let index = loggedInUser.indexOf(id);

      const formDataUser = {
        inProgressServices = loggedInUser.
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
  }*/
}