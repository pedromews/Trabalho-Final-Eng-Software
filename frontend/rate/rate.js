let serviceToBeRated = JSON.parse(sessionStorage.getItem('serviceToBeRated'));
console.log(serviceToBeRated);

document.getElementById('title').textContent = serviceToBeRated.title;
document.getElementById('description').textContent = serviceToBeRated.description;
if (serviceToBeRated.type == 'request')
{
    fetch('http://localhost:8080/api/users/'+serviceToBeRated.actor, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('user').textContent = data.username;
    })
    .catch(error => console.error(error));
}
else
    document.getElementById('user').textContent = serviceToBeRated.author;
    
function sendRating(event)
{
    event.preventDefault();
    
    let rate = 6 - event.target.form.rating.value;
    
    const formData = {
        rating: rate,
    };

    let serviceToBeRated = JSON.parse(sessionStorage.getItem('serviceToBeRated'));
    fetch('http://localhost:8080/api/services/'+serviceToBeRated._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        serviceToBeRated = data.updatedService;
        sessionStorage.setItem('serviceToBeRated', JSON.stringify(serviceToBeRated)); 
        
        window.location.replace('../handshakes/handshakes.html');
    })
    .catch(error => console.error(error));
}