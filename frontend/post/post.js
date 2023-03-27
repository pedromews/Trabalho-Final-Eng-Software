//import { loggedInUser } from '../login/login';

const form = document.getElementById('post-form');
const successMessage = document.getElementById('success-message');

let loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
  console.log("estou parseando " + loggedInUser);
  loggedInUser = JSON.parse(loggedInUser);
}
else
{
  console.log("deu ruim " + loggedInUser);
}

/*form.addEventListener('submit', (event) => {
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
});*/

function postService(event) {
  console.log(loggedInUser);
  event.preventDefault();
  let message = "";
  const form = event.target.form;
  
  const formData = {
    title: form.title.value,
    author: loggedInUser.username,
    description: form.description.value,
    price: form.price.value,
    type: form.type.value,
  };

  if (!formData.title)
    message += "- Title is a required field\n";
  if (!formData.description)
    message += "- Description is a required field\n";
  if (!formData.price)
    message += "- Price is a required field\n";
  if (!formData.type)
    message += "- Type is a required field\n";

  if (message)
  {
    alert(message);
    return;
  }

  if (loggedInUser)
  {
    fetch('http://localhost:8080/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  /*
  fetch('http://localhost:8080/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    // Loop through each user object in the array
    data.forEach(user => {
      // Check if the email or username in the form matches the ones in the database
      if (user.email === form.signup_email.value || user.username === form.signup_username.value) {
        // Display an error message to the user
        alert("That email or username is already being used. Please try again with a different one.");
        // Clear the form inputs
        form.signup_email.value = "";
        form.signup_username.value = "";
        alreadyExists = true;
        return;
      }
    });

    // If no matching user was found, submit the form
    if (!alreadyExists)
      submitForm(formData);
  })
  .catch(error => console.error(error));

  function submitForm(formData) {
    console.log("entrie");
    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }*/
}
