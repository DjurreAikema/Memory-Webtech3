// Gets top five scores from the server, and returns them as an array of objects.
export const getTopFive = async () => {
  try {
    const response = await fetch('http://localhost:8000/scores');
    return await response.json().then(data => data.slice(0, 5));
  } catch (error) {
    console.error('Error fetching top five', error);
  }
}