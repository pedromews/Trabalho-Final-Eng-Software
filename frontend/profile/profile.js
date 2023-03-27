let loggedInUser = localStorage.getItem('loggedInUser');

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
  loggedInUser = JSON.parse(loggedInUser);

  document.getElementById("full-name").textContent = loggedInUser.firstName + " " + loggedInUser.lastName;
  document.getElementById("profile-pic").src = loggedInUser.profilePicture;
  document.getElementById("balance").textContent = loggedInUser.balance;
  document.getElementById("email").textContent = loggedInUser.email;

  let lastPosts = loggedInUser.services;
  
  let i = 1;
  lastPosts.slice(-2).forEach(post => {
    console.log(post);
    document.getElementById("title-last-post-"+i).textContent = post.title;
    document.getElementById("description-last-post-"+i).textContent = post.description;
    document.getElementById("price-last-post-"+i).textContent = post.price;
    i++;
    console.log(i);
  })  
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


/* Balance */

function updateBalance() {
  // Retrieve the updated balance from the database
  let updatedBalance = 20;

  // Update the balance on the screen
  document.getElementById("balance").textContent = "₣ᑕ " + updatedBalance;
}

// Call the updateBalance function when the page is loaded
window.onload = function() {
  updateBalance();
};