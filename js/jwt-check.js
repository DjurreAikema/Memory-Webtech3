// Function to check if JWT is expired
const isJwtExpired = () => {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    return true;
  }
  const {exp} = JSON.parse(atob(jwt.split('.')[1]));
  return Date.now() >= exp * 1000;
}

// Function to handle JWT expiration
const handleJwtExpiration = () => {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    return;
  }
  const { exp } = JSON.parse(atob(jwt.split('.')[1]));
  const remainingTime = exp * 1000 - Date.now();

  // Set a timeout to notify the user when the JWT expires
  setTimeout(() => {
    // Check if the alert has already been shown
    const alertShown = localStorage.getItem('alertShown');
    if (!alertShown) {
      alert('Your session has expired. Please log in again.');
      // Set the alertShown flag in local storage
      localStorage.setItem('alertShown', 'true');
    }
    localStorage.removeItem('jwt');
    localStorage.removeItem('jwtExpiration');
    window.location.href = 'login.html';
  }, remainingTime);
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('alertShown')) handleJwtExpiration()
});