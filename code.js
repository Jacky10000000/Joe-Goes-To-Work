// Game state variables
var player = {
    health: 100,
    cash: 25,
    inventory: [],
    mood: "Sleepy",
    position: { x: 0, y: 0 },
    equippedWeapon: null // New property to store the equipped weapon
};

// Weapons with initial states
var weapons = {
    kitchenKnife: { obtained: false },
    fryingPan: { obtained: false },
    chairLeg: { obtained: false },
    snubNose: { obtained: false, hidden: true },
    tacticalBaton: { obtained: false, hidden: true },
    knuckleDusters: { obtained: false }
};

// Function to update status display
function updateStatus() {
    document.getElementById('cash').textContent = player.cash;
    document.getElementById('health').textContent = player.health;
    document.getElementById('inventory').textContent = player.inventory.join(', ');
    document.getElementById('mood').textContent = player.mood;
    document.getElementById('positionX').textContent = player.position.x;
    document.getElementById('positionY').textContent = player.position.y;
}

// Function to save game state
function saveGameState() {
    var slot = prompt("Enter a slot number (1-10) to save your game:");
    if (slot !== null) {
        slot = parseInt(slot);
        if (slot >= 1 && slot <= 10) {
            var savedGame = localStorage.getItem("saveSlot_" + slot);
            if (savedGame && !confirm("Slot " + slot + " already contains a saved game. Do you want to overwrite it?")) {
                return;
            }
            localStorage.setItem("saveSlot_" + slot, JSON.stringify(player));
            alert("Game saved successfully in slot " + slot);
        } else {
            alert("Invalid slot number. Please enter a number between 1 and 10.");
        }
    }
}

function loadGameState(slot) {
    var savedGame = localStorage.getItem("saveSlot_" + slot);
    if (savedGame) {
        if (confirm("Do you want to load the game from slot " + slot + "?")) {
            player = JSON.parse(savedGame);
            updateStatus();
            alert("Game loaded successfully!");
            return true;
        }
    } else {
        alert("No saved game found in slot " + slot);
    }
    return false;
}

// Function to delete saved game
function deleteGame(slot) {
    var savedGame = localStorage.getItem("saveSlot_" + slot);
    if (savedGame) {
        if (confirm("Are you sure you want to delete the saved game in slot " + slot + "?")) {
            localStorage.removeItem("saveSlot_" + slot);
            alert("Saved game in slot " + slot + " deleted successfully.");
        }
    } else {
        alert("No saved game found in slot " + slot);
    }
}

function loadGamePrompt() {
    var slot = prompt("Enter the slot number (1-10) of the game you want to load:");
    if (slot !== null) {
        slot = parseInt(slot);
        if (slot >= 1 && slot <= 10) {
            loadGameState(slot);
        } else {
            alert("Invalid slot number. Please enter a number between 1 and 10.");
        }
    }
}


// Initial position of the player
var gridSize = 10;
var playerPosition = { x: 0, y: 0 }; // Assuming the apartment is represented as a grid

// Function to handle movement

function move(direction) {
    var nextX = player.position.x;
    var nextY = player.position.y;

    switch (direction) {
        case 'left':
            nextX--;
            break;
        case 'right':
            nextX++;
            break;
        case 'up':
            nextY--;
            break;
        case 'down':
            nextY++;
            break;
        default:
            break;
    }

    if (isValidPosition(nextX, nextY)) {
        player.position.x = nextX;
        player.position.y = nextY;
        updatePositionDisplay();
        updateButtonsBasedOnPosition(); // Update buttons based on the new position
    } else {
        alert("That's a wall!");
    }
}
// Function to check if position is valid
function isValidPosition(x, y) {
    // Define boundaries for the apartment building hallway and Joe's apartment
    var apartmentBoundaries = {
        minX: -1,
        maxX: 1,
        minY: -1,
        maxY: 1
    };
    var hallwayBoundaries = {
        minX: 0,
        maxX: 2,
        minY: -1,
        maxY: 0
    };

    // Check if the position is within the apartment boundaries
    if (x >= apartmentBoundaries.minX && x <= apartmentBoundaries.maxX &&
        y >= apartmentBoundaries.minY && y <= apartmentBoundaries.maxY) {
        return true;
    }

    // Check if the position is within the hallway boundaries
    if (x >= hallwayBoundaries.minX && x <= hallwayBoundaries.maxX &&
        y >= hallwayBoundaries.minY && y <= hallwayBoundaries.maxY) {
        return true;
    }

    return false;
}

// Function to update position display
function updatePositionDisplay() {
    document.getElementById('positionX').textContent = player.position.x;
    document.getElementById('positionY').textContent = player.position.y;
}

// Function to handle interactions in the restroom
function refreshInRestroom() {
    if (player.mood === "Sleepy") {
        player.health += 10;
        player.health = Math.min(player.health, 100);
    }
    player.mood = "Awake";
    updateStatus();
    alert("Now you're ready for the day!");
    updateButtons();
}

// Function to handle breakfast and drink
function haveBreakfastAndDrink(food, drink) {
    if (drink === "whiskey") {
        player.mood = "Drunk";
        player.health -= 10;
    } else {
        player.mood = "Fluffy";
        player.health += 10;
    }
    player.health = Math.max(0, Math.min(player.health, 100));
    updateStatus();
    updateButtons();
}

// Function to handle interactions with weapons
function acquireWeapon(weaponName) {
    weapons[weaponName].obtained = true;
    updateStatus();
}

// Function to use a weapon
function useWeapon(weaponName) {
    alert("You use the " + weaponName + "!");
}
// Function to update description when checking out the bed
function checkBed() {
    document.getElementById('description').innerHTML = '<h3>The bed is nicely made, You could sleep but... the outdoors does seem like a better choice right now.</h3>';
}

// Function to update description when checking out the window
function checkWindow() {
    document.getElementById('description').innerHTML = '<h3>The same crap heap as always but hey, the sun sure does offer quite the pretty view none the less.</h3>';
}

// Function to take a shower
function takeShower() {
    // Update game state or perform necessary actions
    alert("You take a refreshing shower.");
}

// Function to brush your teeth
function brushTeeth() {
    // Update game state or perform necessary actions
    alert("You brush your teeth and feel fresh.");
}

// Function to enter the kitchen
function enterKitchen() {
    playerPosition = { x: 1, y: 1 }; // Update player's position to the kitchen
    updateButtons(); // Update buttons after moving
    updateStatus(); // Update status display
}

// Function to enter the restroom
function enterRestroom() {
    playerPosition = { x: 1, y: -1 }; // Update player's position to the restroom
    updateButtons(); // Update buttons after moving
    updateStatus(); // Update status display
}


// Function to exit the apartment
function exitApartment() {
    // Set the player's position to the hallway
    player.position = { x: 2, y: 0 }; // Update player's position to the hallway

    // Update UI
    updateButtonsBasedOnPosition(); // Update buttons after moving
    updatePositionDisplay(); // Update position display

    // Prompt the user with the option to look at the newspaper
    var lookAtNewspaper = confirm("You've left the apartment. Would you like to look at the newspaper?");

    if (lookAtNewspaper) {
        // Display newspaper article image
        document.getElementById('newspaperArticle').style.display = 'block';
    }

    // Set the objective to get to HQ
    alert("Your Objective: Pull up to HQ!");
}

// Function to exit the apartment building
function exitApartmentBuilding() {
    // Update the player's position to outside the apartment building
    player.position = { x: 3, y: 0 };

    // Update UI
    updateButtonsBasedOnPosition(); // Update buttons after moving
    updatePositionDisplay(); // Update position display

    // Display a message indicating successful exit
    alert("You've exited the apartment building. Welcome to the outside world!");
}

// Function to look at yourself in the mirror
function lookMirror() {
    // Update game state or perform necessary actions
    alert("You look at yourself in the mirror and admire your reflection.");
}

// Function to take a dookie
function takeDookie() {
    // Update game state or perform necessary actions
    alert("You take a satisfying dookie.");
}

// Function to grab a whiskey
function grabWhiskey() {
    // Update game state or perform necessary actions
    alert("You grab a bottle of whiskey.");
}

// Function to grab some water
function grabWater() {
    // Update game state or perform necessary actions
    alert("You grab a glass of water.");
}

// Function to grab a coffee
function grabCoffee() {
    // Update game state or perform necessary actions
    alert("You brew a fresh cup of coffee.");
}

// Function to make breakfast
function makeBreakfast() {
    // Update game state or perform necessary actions
    alert("You prepare yourself a nice hearty breakfast.");
}


// Function to update buttons based on player's position
function updateButtonsBasedOnPosition() {
    var livingRoomButtons = document.getElementById('livingRoomButtons');
    var bedWindowButtons = document.getElementById('bedWindowButtons');
    var kitchenButtons = document.getElementById('kitchenButtons');
    var restroomButtons = document.getElementById('restroomButtons');
    var hallwayButtons = document.getElementById('hallwayButtons'); // Add this line

    // Hide all button containers initially
    livingRoomButtons.style.display = 'none';
    bedWindowButtons.style.display = 'none';
    kitchenButtons.style.display = 'none';
    restroomButtons.style.display = 'none';
    hallwayButtons.style.display = 'none'; // Add this line

    // Check the player's position and display the corresponding button container
    if (player.position.x === 1 && player.position.y === 0) {
        livingRoomButtons.style.display = 'block'; // Show the living room buttons
    } else if (player.position.x === 0 && player.position.y === 0) {
        bedWindowButtons.style.display = 'block'; // Show the bed and window buttons
    } else if (player.position.x === 1 && player.position.y === 1) {
        kitchenButtons.style.display = 'block'; // Show the kitchen buttons
    } else if (player.position.x === 1 && player.position.y === -1) {
        restroomButtons.style.display = 'block'; // Show the restroom buttons
    } else if (player.position.x === 2 && player.position.y === 0) {
        hallwayButtons.style.display = 'block'; // Show the hallway buttons
    }
}




// Update status initially
updateStatus();
updateButtonsBasedOnPosition();


function updatePositionDisplay() {
    // Update the display of the player's position
    document.getElementById('positionX').textContent = player.position.x;
    document.getElementById('positionY').textContent = player.position.y;
}

// Call updatePositionDisplay initially to display the starting position
updatePositionDisplay();

function refreshInRestroom() {
    if (playerMood === "Sleepy") {
        playerHealth += 10; // Example: Resting in the restroom improves health when sleepy
        // Ensure health stays within bounds (0 to 100)
        playerHealth = Math.min(playerHealth, 100);
    }
    playerMood = "Awake";
    updateStatus();

    // Additional interactions for the Awake mood
    alert("Now you're ready for the day, ain't you?");
    updateButtons(); // Update buttons after the mood change
}


function addButtonBasedOnPosition() {
    var buttonsDiv = document.getElementById('buttons');
    buttonsDiv.innerHTML = ''; // Clear existing buttons

    if (playerPosition.x === 0 && playerPosition.y === 0) { // Player in bedroom
        buttonsDiv.innerHTML += '<button onclick="checkWindow()">Check out Window</button>';
    } else if (playerPosition.x === 1 && playerPosition.y === 0) { // Player in living room
        buttonsDiv.innerHTML += '<button onclick="checkCouch()">Check out Couch</button>';
        buttonsDiv.innerHTML += '<button onclick="checkTV()">Check out TV</button>';
        buttonsDiv.innerHTML += '<button onclick="checkRadio()">Check out Radio</button>';
        buttonsDiv.innerHTML += '<button onclick="enterKitchen()">Enter Kitchen</button>';
        buttonsDiv.innerHTML += '<button onclick="enterRestroom()">Enter Restroom</button>';
        buttonsDiv.innerHTML += '<button onclick="exitApartment()">Exit Apartment</button>';
    }
}

updatePositionDisplay();

var buttonsDiv = document.getElementById('livingRoomButtons');

// Check player's position and show living room buttons if in the living room
if (playerPosition.x === 1 && playerPosition.y === 0) {
    buttonsDiv.classList.remove('living-room-buttons'); // Remove the 'living-room-buttons' class to show the buttons
}


// Update buttons based on acquired weapons
function updateButtons() {
    // Update existing button containers as before

    // Check if weapons should be shown or hidden based on their states
    var kitchenButtons = document.getElementById('kitchenButtons');
    if (weapons.snubNose.hidden) {
        // Hide the button to acquire the snub nose revolver if it's hidden
        document.getElementById('acquireSnubNose').style.display = 'none';
    }
    if (weapons.tacticalBaton.hidden) {
        // Hide the button to acquire the tactical baton if it's hidden
        document.getElementById('acquireTacticalBaton').style.display = 'none';
    }

    // Additional logic to show living room buttons if in the living room
    var livingRoomButtons = document.getElementById('livingRoomButtons');
    if (playerPosition.x === 1 && playerPosition.y === 0) {
        livingRoomButtons.style.display = 'block';
    } else {
        livingRoomButtons.style.display = 'none';
    }
}


function generateMap(gridSize, playerPosition) {
    var mapContainer = document.getElementById('mapContainer');
    mapContainer.innerHTML = ''; // Clear existing map

    // Loop through each row and column to generate map cells
    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            var cell = document.createElement('div');
            cell.classList.add('item'); // Apply the CSS class for map cells
            cell.textContent = x === playerPosition.x && y === playerPosition.y ? 'P' : ''; // Add player marker if it's the player's position
            mapContainer.appendChild(cell);
        }
    }
}

generateMap(gridSize, player.position);

updateStatus();
updateButtons();
updatePositionDisplay();

