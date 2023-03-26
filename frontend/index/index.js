const form = document.getElementById('post-form');
const successMessage = document.getElementById('success-message');

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
