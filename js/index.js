window.addEventListener('DOMContentLoaded', () => {
  const authButtons = document.getElementById('auth-buttons');
  const logoutButton = document.getElementById('logout-button');
  const jwt = localStorage.getItem('jwt');
  const jwtExpiration = localStorage.getItem('jwtExpiration');

  if (jwt && Date.now() < jwtExpiration) {
    // User is logged in and JWT is not expired, hide the buttons
    authButtons.style.display = 'none';
    logoutButton.style.display = 'block';
  } else {
    // JWT is expired, remove it from local storage
    localStorage.removeItem('jwt');
    localStorage.removeItem('jwtExpiration');
  }

  logoutButton.addEventListener('click', () => {
    // Remove the JWT and expiration time from local storage
    localStorage.removeItem('jwt');
    localStorage.removeItem('jwtExpiration');
    // Show the auth buttons and hide the logout button
    authButtons.style.display = 'block';
    logoutButton.style.display = 'none';
  });
});