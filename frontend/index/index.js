const form = document.getElementById('post-form');
const successMessage = document.getElementById('success-message');
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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  fetch('/post-service', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      successMessage.classList.remove('hidden');
    } else {
      console.error('Server error:', response.status);
    }
  })
  .catch(error => {
    console.error('Request failed:', error);
  });
});

const searchForm = document.querySelector('.header-content form');
const searchInput = document.querySelector('.header-content input[type="text"]');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length) {
    window.location.href = `/browse/browse.html?q=${searchTerm}`;
  }
});
