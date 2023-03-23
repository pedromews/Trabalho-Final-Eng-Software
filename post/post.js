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


// This code creates a new FormData object from the form, sends it to a server at the /post-service URL using a POST request, and then shows the success message if the server responds with a successful status code (e.g., 200 or 201). If the server responds with an error status code, the code logs an error message to the console.