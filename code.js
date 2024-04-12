// Function to save the game state
function saveGameState() {
    // Example game state object
    var gameState = {
        level: 5,
        score: 1500,
        character: "Joe"
    };
    // Convert the object to JSON string
    var gameStateJSON = JSON.stringify(gameState);
    // Save the JSON string to local storage
    localStorage.setItem("gameState", gameStateJSON);
    alert("Game saved successfully!");
}

// Function to load the game state
function loadGameState() {
    // Retrieve the JSON string from local storage
    var gameStateJSON = localStorage.getItem("gameState");
    if (gameStateJSON) {
        // Convert JSON string back to object
        var gameState = JSON.parse(gameStateJSON);
        // Example: Update UI with loaded game state
        console.log("Loaded Game State:", gameState);
    } else {
        alert("No saved game found!");
    }
}


var playerHealth = 100;
var playerCash = 0;
var inventory = [];
var playerMood = "Sleepy";

// Initial position of the player
var gridSize = 10;
var playerPosition = { x: 0, y: 0 }; // Assuming the apartment is represented as a grid

// Function to move the player
// Function to move the player
function move(direction) {
    switch (direction) {
        case 'left':
            playerPosition.x--;
            break;
        case 'right':
            playerPosition.x++;
            break;
        case 'up':
            playerPosition.y--;
            break;
        case 'down':
            playerPosition.y++;
            break;
        default:
            break;
    }
    updateLocation();
    updateButtons(); // Add this line to update buttons after each movement
}

// Function to update the player's location
function updateLocation() {
    // Example: Update UI to reflect the new player position
    alert("You moved to position (" + playerPosition.x + ", " + playerPosition.y + ")");
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

// Function to update status (cash, health, and inventory)
function updateStatus() {
    // Update cash
    document.getElementById('cash').textContent = playerCash;
    // Update health
    document.getElementById('health').textContent = playerHealth;
    // Update inventory
    document.getElementById('inventory').textContent = inventory.join(', '); // Assuming inventory is an array of items
    // Update mood
    document.getElementById('mood').textContent = playerMood;
}

function updateButtons() {
    var livingRoomButtons = document.getElementById('livingRoomButtons');
    var bedWindowButtons = document.getElementById('bedWindowButtons');
    var kitchenButtons = document.getElementById('kitchenButtons');
    var restroomButtons = document.getElementById('restroomButtons');

    // Check if the player is in the living room
    if (playerPosition.x === 1 && playerPosition.y === 0) {
        livingRoomButtons.style.display = 'block'; // Show the living room buttons
        bedWindowButtons.style.display = 'none'; // Hide the bed and window buttons
        kitchenButtons.style.display = 'none'; // Hide the kitchen buttons
        restroomButtons.style.display = 'none'; // Hide the restroom buttons
    } else if (playerPosition.x === 0 && playerPosition.y === 0) { // Check if the player is in the bedroom
        livingRoomButtons.style.display = 'none'; // Hide the living room buttons
        bedWindowButtons.style.display = 'block'; // Show the bed and window buttons
        kitchenButtons.style.display = 'none'; // Hide the kitchen buttons
        restroomButtons.style.display = 'none'; // Hide the restroom buttons
    } else if (playerPosition.x === 1 && playerPosition.y === 1) { // Check if the player is in the kitchen
        livingRoomButtons.style.display = 'none'; // Hide the living room buttons
        bedWindowButtons.style.display = 'none'; // Hide the bed and window buttons
        kitchenButtons.style.display = 'block'; // Show the kitchen buttons
        restroomButtons.style.display = 'none'; // Hide the restroom buttons
    } else if (playerPosition.x === 1 && playerPosition.y === -1) { // Check if the player is in the restroom
        livingRoomButtons.style.display = 'none'; // Hide the living room buttons
        bedWindowButtons.style.display = 'none'; // Hide the bed and window buttons
        kitchenButtons.style.display = 'none'; // Hide the kitchen buttons
        restroomButtons.style.display = 'block'; // Show the restroom buttons
    }
}

// Update status initially
updateStatus();
updateButtons();

function refreshInRestroom() {
    playerMood = "Awake";
    updateStatus();
}

// Function to handle breakfast and drink
function haveBreakfastAndDrink(food, drink) {
    // Assume food and drink are strings representing what Joe eats and drinks
    if (drink === "whiskey") {
        playerMood = "Drunk";
    } else {
        playerMood = "Fluffy";
    }
    updateStatus();
}

// Define buttonsDiv and get reference to the element where you want to append buttons
var buttonsDiv = document.getElementById('buttons');

// Check player's position and add corresponding buttons
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

var buttonsDiv = document.getElementById('livingRoomButtons');

// Check player's position and show living room buttons if in the living room
if (playerPosition.x === 1 && playerPosition.y === 0) {
    buttonsDiv.classList.remove('living-room-buttons'); // Remove the 'living-room-buttons' class to show the buttons
}