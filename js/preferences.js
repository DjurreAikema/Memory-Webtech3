// Function to populate the form with the user's current preferences
const populateForm = async () => {
  const jwt = localStorage.getItem('jwt');
  const {sub: id} = JSON.parse(atob(jwt.split('.')[1]));
  const player = await getPlayer(id);
  document.getElementById('player-name').textContent = player.name;
  document.getElementById('email').value = player.email;
  const gamesList = document.getElementById('games');
  player.games.forEach(game => {
    const listItem = document.createElement('li');
    listItem.textContent = `Date: ${game.date.date}, Score: ${game.score}`;
    gamesList.appendChild(listItem);
  });
}

document.getElementById('return-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', populateForm);


// --- API Calls ---
// Function to get player details
const getPlayer = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/player/${id}`);
    return await response.json();
  } catch (error) {
    console.error('An error occurred while fetching player details:', error);
  }
}

// Function to get player games
const getPlayerGames = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/player/${id}/games`);
    return await response.json();
  } catch (error) {
    console.error('An error occurred while fetching player games:', error);
  }
}

// Function to get player preferences
const getPlayerPreferences = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/player/${id}/preferences`);
    return await response.json();
  } catch (error) {
    console.error('An error occurred while fetching player preferences:', error);
  }
}

// Function to update player preferences
const updatePlayerPreferences = async (id, preferences) => {
  try {
    const response = await fetch(`http://localhost:8000/api/player/${id}/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferences)
    });

    return await response.json();
  } catch (error) {
    console.error('An error occurred while updating player preferences:', error);
  }
}

// Function to get player email
const getPlayerEmail = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/player/${id}/email`);
    return await response.json();
  } catch (error) {
    console.error('An error occurred while fetching player email:', error);
  }
}

// Function to update player email
const updatePlayerEmail = async (id, email) => {
  try {
    const response = await fetch(`http://localhost:8000/api/player/${id}/email`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    });

    return await response.json();
  } catch (error) {
    console.error('An error occurred while updating player email:', error);
  }
}