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
      const expirationTime = Date.now() + 3600 * 1000;

      localStorage.setItem('jwt', jwt);
      localStorage.setItem('jwtExpiration', expirationTime);
      localStorage.removeItem('alertShown');

      // alert('Login successful!');
      window.location.href = 'index.html';
    } else {
      alert('Login failed: ' + response.statusText);
    }
  });
});