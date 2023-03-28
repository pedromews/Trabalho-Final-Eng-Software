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

function recharge(event) {
  event.preventDefault();
  const form = event.target.form;

  const codes = [
    '12345',
    'xwOhl', 'ZVN9k', 'fUOQt', 'HrvJW', 'ufUuI', 'FZaPi', 'e1GIe', 'qVJsL', 'esLFm', 'BW6BC',
    's94yW', 'IDVQc', 'xVl3B', 'N5G1F', 'VVnDD', 'eWJQ1', 'W4T1k', 'VQl0m', 'x9YxX', 'om9lf'
  ];

  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  
  if (!form.code.value)
  {
    alert('Gift card code is a required field');
    return;
  }
  if (codes.indexOf(form.code.value) <= -1)
  {
    alert('Gift card code is invalid.');
    return;
  }
  
  const formData = {
    balance: 25 + Number(loggedInUser.balance),
  };

  fetch('http://localhost:8080/api/users/'+loggedInUser._id, {
    method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    loggedInUser = data.updatedUser;
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    alert('Balance updated.');
    window.location.replace('../profile/profile.html');
  })
  .catch(error => console.error(error));
}