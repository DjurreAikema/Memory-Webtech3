// Function to populate the form with the user's current preferences
const populateForm = async () => {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    window.location.href = 'index.html';
    return;
  }
  const {sub: id} = JSON.parse(atob(jwt.split('.')[1]));
  const player = await getPlayer(id);
  const preferences = await getPlayerPreferences(id);
  document.getElementById('player-name').textContent = player.name;
  document.getElementById('email').value = player.email;
  document.getElementById('preferred_api').value = preferences.preferred_api;
  document.getElementById('color_closed').value = convertColor(preferences.color_closed);
  document.getElementById('color_found').value = convertColor(preferences.color_found);
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

document.addEventListener('DOMContentLoaded', async () => {
  await populateForm();
});


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

    console.log(JSON.stringify(preferences))
    if (response.ok) {
      alert('Preferences updated successfully');
    } else {
      alert('An error occurred while updating preferences');
    }
  } catch (error) {
    console.error('An error occurred while updating player preferences:', error);
  }
}

// Event listener for the preferences form
document.getElementById('preferences-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const jwt = localStorage.getItem('jwt');
  const {sub: id} = JSON.parse(atob(jwt.split('.')[1]));
  const preferences = {
    api: document.getElementById('preferred_api').value,
    color_closed: document.getElementById('color_closed').value,
    color_found: document.getElementById('color_found').value
  };
  await updatePlayerPreferences(id, preferences);
});

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

    if (response.ok) {
      alert('Email updated successfully');
    } else {
      alert('An error occurred while updating email');
    }
  } catch (error) {
    console.error('An error occurred while updating player email:', error);
  }
}

// Event listener for the email form
document.getElementById('email-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const jwt = localStorage.getItem('jwt');
  const {sub: id} = JSON.parse(atob(jwt.split('.')[1]));
  const email = document.getElementById('email').value;
  await updatePlayerEmail(id, email);
});

// --- Util
const convertColor = (color) => {
  if (color.length === 4) {
    return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
  }
  return color;
}