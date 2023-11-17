
        const URL = "https://fsa-puppy-bowl.herokuapp.com";

        async function fetchData(endpoint) {
            try {
                const response = await fetch(`${URL}/${endpoint}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function loadRoster() {
            const rosterList = document.getElementById('rosterList');
            rosterList.innerHTML = '';

            const roster = await fetchData('roster');
            roster.forEach(player => {
                const listItem = document.createElement('li');
                listItem.textContent = player.name;
                listItem.addEventListener('click', () => showPlayerDetails(player.id));
                rosterList.appendChild(listItem);
            });
        }

        async function showPlayerDetails(playerId) {
            const playerDetails = document.getElementById('playerDetails');
            playerDetails.innerHTML = '';

            const player = await fetchData(`player/${playerId}`);
            
            const detailsElement = document.createElement('div');
            detailsElement.innerHTML = `
                <h2>${player.name}</h2>
                <p>Breed: ${player.breed}</p>
                <p>Age: ${player.age}</p>
                <!-- Add more player details as needed -->
            `;
            
            playerDetails.appendChild(detailsElement);
        }

        async function addPlayer() {
            const playerName = document.getElementById('playerName').value;

            if (playerName) {
                const response = await fetch(`${URL}/roster`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: playerName }),
                });

                if (response.ok) {
                    alert('Player added successfully!');
                } else {
                    alert('Error adding player. Please try again.');
                }
            } else {
                alert('Please enter a player name.');
            }
        }
    

