//import { loggedInUser } from '../login/login';

const form = document.getElementById('post-form');
const successMessage = document.getElementById('success-message');

let loggedInUser = sessionStorage.getItem('loggedInUser');
// get a reference to the logged-in-menu div
const loggedInMenu = document.querySelectorAll('.logged-in-menu');
const loggedOutMenu = document.querySelectorAll('.logged-out-menu');

if (loggedInUser) {
  console.log("estou parseando " + loggedInUser);
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  loggedInMenu.forEach(navElement => {
    navElement.style.display = 'flex';
  });
  loggedOutMenu.forEach(navElement => {
    navElement.style.display = 'none';
  });
}
else
{
  console.log("deu ruim " + loggedInUser);
  loggedInMenu.forEach(navElement => {
    navElement.style.display = 'none';
  });
  loggedOutMenu.forEach(navElement => {
    navElement.style.display = 'flex';
  });
}

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
    inProgress: false,
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
    .then(data => {
      loggedInUser = data.updatedUser;
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      
      form.title.value = '';
      form.description.value = '';
      form.price.value = '';
      form.type.value = '';

      alert('Service posted succesfully'); 
    })
    .catch(error => console.error(error));

    
  }
}
