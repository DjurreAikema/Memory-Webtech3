// Store the original fetch function
const originalFetch = window.fetch;

// Overload the fetch function
window.fetch = async (url, options = {}) => {
  // Get the JWT from local storage
  const jwt = localStorage.getItem('jwt');

  // If the JWT exists, add it to the Authorization header
  if (jwt) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${jwt}`
    };
  }

  // Call the original fetch function with the URL and the modified options, return the response
  return await originalFetch(url, options);
};