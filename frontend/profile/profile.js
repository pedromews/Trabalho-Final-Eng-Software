let loggedInUser = sessionStorage.getItem('loggedInUser');

// get a reference to the logged-in-menu div
const loggedInMenu = document.querySelectorAll('.logged-in-menu');
const loggedOutMenu = document.querySelectorAll('.logged-out-menu');

if (loggedInUser) {
  //nav bar
  // if the user is logged in, show the logged-in-menu div
  console.log('tava logado');
  loggedInMenu.forEach(navElement => {
    navElement.style.display = 'flex';
  });
  loggedOutMenu.forEach(navElement => {
    navElement.style.display = 'none';
  });

  //profile
  console.log("tem user" + loggedInUser);
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  document.getElementById("full-name").textContent = loggedInUser.firstName + " " + loggedInUser.lastName;
  document.getElementById("profile-pic").src = loggedInUser.profilePicture;
  document.getElementById("balance").textContent = loggedInUser.balance;
  document.getElementById("email").textContent = loggedInUser.email;

  let lastPosts = loggedInUser.ownServices;

  // Iterate through the services and add them to the HTML
  const servicesContainer = document.querySelector('.services-container');

  lastPosts.forEach(service_id => {
    fetch('http://localhost:8080/api/services/'+service_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(service => 
        {
          if (service.author == loggedInUser.username)
          {
            let serviceStatus = '';
            let rating = '';
            switch(service.status)
            {
              case 0:
                serviceStatus = 'In catalog';
                break;
              case 1:
                serviceStatus = 'In progress';
                break;
              case 2:
                serviceStatus = 'Finished';
                rating = `Rating: ${service.rating}`;
                break;
            }

            const serviceElement = document.createElement('div');
            serviceElement.className = 'service';
            serviceElement.innerHTML = `
              <div>
                <h3 class="service-title">${service.title} •</h3>
                <p> Service ${service.type}</p>
              </div>
              <p class="service-description">${service.description}</p>
              <p class="service-price">$${service.price}</p>
              <p class="service-status">${serviceStatus}</p>
              <p class="service-rating">${rating}</p>
            `;
            servicesContainer.appendChild(serviceElement);
          }
        })
      .catch(error => console.error(error));
    });
}
else
{
  // if the user is not logged in, hide the logged-in-menu div
  console.log('nao tava logado');
  loggedInMenu.forEach(navElement => {
    navElement.style.display = 'none';
  });
  loggedOutMenu.forEach(navElement => {
    navElement.style.display = 'flex';
  });
}

function showSection(sectionName) {
  // Get all the profile sections
  let sections = document.getElementsByClassName("profile-section");

  // Loop through the sections and hide them all
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }

  // Show the section with the given name
  document.getElementById(sectionName).style.display = "block";
}

// Show the posts section by default
showSection("posts");