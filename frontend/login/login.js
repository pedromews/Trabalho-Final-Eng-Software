const loginContainer = document.querySelector(".login-container");
const signupContainer = document.querySelector(".signup-container");

const signupLink = document.querySelector(".signup-link");
const loginLink = document.querySelector(".login-link");

/*
const signupSubmit = document.querySelector(".signup-submit");
const firstName = document.querySelector(".signup-first-name");
const lastName = document.querySelector(".signup-last-name");
const username = document.querySelector(".signup-username");
const email = document.querySelector(".signup-email");
const password = document.querySelector(".signup-password");
const profilePicture = document.querySelector(".signup-profile-picture");
*/

let loggedInUser;

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

// Add event listener to "Sign Up" link
signupLink.addEventListener("click", () => {
  // Hide login form
  loginContainer.style.display = "none";
  // Show signup form
  signupContainer.style.display = "block";
});

// Add event listener to "Login" link
loginLink.addEventListener("click", () => {
  // Hide signup form
  signupContainer.style.display = "none";
  // Show login form
  loginContainer.style.display = "block";
});


function signup(event) {
  let alreadyExists = false;
  let message = '';
  event.preventDefault();
  const form = event.target.form;
  const formData = {
    username: form.signup_username.value,
    email: form.signup_email.value,
    password: form.signup_password.value,
    firstName: form.signup_firstName.value,
    lastName: form.signup_lastName.value,
    profilePicture: form.signup_profilePicture.value,
    services: [],
    balance: 0
  };

  if (!formData.username)
    message += "- Username is a required field\n";
  if (!formData.email)
    message += "- Email is a required field\n";
  if (!formData.password)
    message += "- Password is a required field\n";
  if (!formData.firstName)
    message += "- First name is a required field\n";
  if (!formData.lastName)
    message += "- Last name is a required field\n";

  if (message)
  {
    alert(message);
    return;
  }

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
      if (user.email === formData.email || user.username === formData.username) {
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
    if (!alreadyExists) {
      submitForm(formData);
    }
    else
    {
      loggedInUser = null;
    }
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
    .then(data => { 
      loggedInUser = data.response;
      console.log('aqui');
      console.log(loggedInUser);
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));  
      window.location.replace('../index/index.html');
    })
    .catch(error => console.error(error));
  }
}

function login(event) {
  let userExists = false;
  let message = '';
  event.preventDefault();

  if (!event.target.form.username.value)
    message += "- Username is a required field\n";
  if (!event.target.form.password.value)
    message += "- Password is a required field\n";

  if (message)
  {
    alert(message);
    return;
  }
  
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
      if (user.password === event.target.form.password.value &&
          user.username === event.target.form.username.value) {
        //do something
        userExists = true;
        console.log("loguei no login");
        loggedInUser = user;
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        console.log(loggedInUser);
        
        window.location.replace('../index/index.html');
        return;
      }
    });

    if (!userExists)
      alert("Username or password is incorrect.");
  })
  .catch(error => console.error(error));
}
