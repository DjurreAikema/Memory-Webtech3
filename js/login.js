window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8000/api/login_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.ok) {
      const data = await response.json();
      const jwt = data.token;
      // Store the JWT in local storage
      localStorage.setItem('jwt', jwt);
      // Store the expiration time in local storage
      const expirationTime = Date.now() + 3600 * 1000; // JWT TTL is 3600 seconds
      localStorage.setItem('jwtExpiration', expirationTime);
      // alert('Login successful!');
      window.location.href = 'index.html';
    } else {
      alert('Login failed: ' + response.statusText);
    }
  });
});