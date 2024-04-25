// Game state variables
var player = {
    health: 100,
    cash: 25,
    mood: "Sleepy",
    position: { x: 0, y: 0 },
    equippedWeapon: null,
    inventory: {
        weapons: [],
        food: [],
        newspapers: [],
        keys: [],
        miscellaneous: []
    }
};

// Weapons with initial states
var weapons = {
    "Snub-Nose Revolver": {
        description: "A small, concealable revolver with a short barrel.",
        weight: 1.5,
        obtained: false,
        hidden: true
    },
    "Knuckle Dusters": {
        description: "Brass knuckles for close combat encounters.",
        weight: 0.5,
        obtained: false
    },
    "Kitchen Knife": {
        description: "A sharp knife commonly found in kitchens.",
        weight: 0.8,
        obtained: false
    },
    "Frying Pan": {
        description: "A versatile kitchen tool, also handy for self-defense.",
        weight: 2,
        obtained: false
    },
    // Add more weapons here
};

// Function to add an item to the inventory
function addItemToInventory(item, category) {
    if (category === "weapons" && weapons[item]) {
        // Add the weapon object instead of just the name
        player.inventory[category].push(weapons[item]);
    } else {
        // Add other types of items as before
        player.inventory[category].push(item);
    }
    updateStatus();
}


function removeItemFromInventory(item, category) {
    const index = player.inventory[category].indexOf(item);
    if (index !== -1) {
        player.inventory[category].splice(index, 1);
        updateStatus();
    }
}

function useItemFromInventory(item, category) {
    // Implement logic to use the item
    if (category === "weapons") {
        // Implement logic to use the weapon
        // For example, equip it or use it in combat
        alert("You use the " + item + ".");
    } else {
        // Implement logic for using other types of items
    }
    removeItemFromInventory(item, category);
}


// Function to update status display
function updateStatus() {
    document.getElementById('cash').textContent = player.cash;
    document.getElementById('health').textContent = player.health;
    // Display inventory properly
    var inventoryDisplay = document.getElementById('inventory');
    inventoryDisplay.innerHTML = ''; // Clear previous content
    for (var category in player.inventory) {
        if (player.inventory.hasOwnProperty(category) && player.inventory[category].length > 0) {
            var categoryHeader = document.createElement('p');
            categoryHeader.textContent = category.toUpperCase() + ':';
            inventoryDisplay.appendChild(categoryHeader);
            var itemList = document.createElement('ul');
            player.inventory[category].forEach(item => {
                var listItem = document.createElement('li');
                if (category === "weapons") {
                    // Display weapon name and description
                    listItem.textContent = item.name + " - " + item.description;
                } else {
                    // Display other types of items as before
                    listItem.textContent = item;
                }
                itemList.appendChild(listItem);
            });
            inventoryDisplay.appendChild(itemList);
        }
    }
    document.getElementById('mood').textContent = player.mood;
    document.getElementById('positionX').textContent = player.position.x;
    document.getElementById('positionY').textContent = player.position.y;
}

function handleWeaponAction(weaponName, action) {
    if (weapons[weaponName]) {
        if (action === "acquire") {
            weapons[weaponName].obtained = true;
            alert("You acquired the " + weaponName + ".");
        } else if (action === "use") {
            alert("You use the " + weaponName + ".");
            // Implement logic for using the weapon
        }
        updateStatus();
    } else {
        alert("Weapon not found.");
    }
}

document.getElementById('addItemButton').addEventListener('click', function () {
    var newItem = prompt("Enter the name of the item:");
    var category = prompt("Enter the category of the item:");
    addItemToInventory(newItem, category);
});

document.getElementById('removeItemButton').addEventListener('click', function () {
    var itemToRemove = prompt("Enter the name of the item to remove:");
    var category = prompt("Enter the category of the item:");
    removeItemFromInventory(itemToRemove, category);
});

document.getElementById('useItemButton').addEventListener('click', function () {
    var itemToUse = prompt("Enter the name of the item to use:");
    var category = prompt("Enter the category of the item:");
    useItemFromInventory(itemToUse, category);
});

// Show/hide inventory popup
function showInventory() {
    var inventoryPopup = document.getElementById('inventoryPopup');
    inventoryPopup.style.display = inventoryPopup.style.display === 'block' ? 'none' : 'block';
}

// Add event listener to close inventory popup when clicking outside of it
document.addEventListener('click', function (event) {
    var inventoryPopup = document.getElementById('inventoryPopup');
    if (!inventoryPopup.contains(event.target)) {
        inventoryPopup.style.display = 'none';
    }
});
// Function to save game state including inventory
function saveGameState() {
    var slot = prompt("Enter a slot number (1-10) to save your game:");
    if (slot !== null) {
        slot = parseInt(slot);
        if (slot >= 1 && slot <= 10) {
            var savedGame = localStorage.getItem("saveSlot_" + slot);
            if (savedGame && !confirm("Slot " + slot + " already contains a saved game. Do you want to overwrite it?")) {
                return;
            }
            localStorage.setItem("saveSlot_" + slot, JSON.stringify({ player: player, inventory: player.inventory }));
            alert("Game saved successfully in slot " + slot);
        } else {
            alert("Invalid slot number. Please enter a number between 1 and 10.");
        }
    }
}

// Function to load game state including inventory
function loadGameState(slot) {
    var savedGame = localStorage.getItem("saveSlot_" + slot);
    if (savedGame) {
        if (confirm("Do you want to load the game from slot " + slot + "?")) {
            var savedData = JSON.parse(savedGame);
            player = savedData.player;
            player.inventory = savedData.inventory;
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

function updatePlayerPosition() {
    // Update the display of the player's position
    document.getElementById('positionX').textContent = player.position.x;
    document.getElementById('positionY').textContent = player.position.y;
    updatePlayerIconPosition(); // Update the player's icon position
}

var gridSize = 10; // Define the size of the grid

// Function to update position display
function updatePositionDisplay() {
    document.getElementById('positionX').textContent = player.position.x;
    document.getElementById('positionY').textContent = player.position.y;
}

// Fix the player position update logic in the `move` function
function move(direction) {
    var nextX = player.position.x;
    var nextY = player.position.y;

    switch (direction) {
        case 'up':
            nextY--;
            break;
        case 'down':
            nextY++;
            break;
        case 'left':
            nextX--;
            break;
        case 'right':
            nextX++;
            break;
        default:
            break;
    }

    // Check if the next position is valid
    if (isValidPosition(nextX, nextY)) {
        // Update the player's position
        player.position.x = nextX;
        player.position.y = nextY;

        // Call the function to update the position display
        updatePositionDisplay();

        // Call the function to update the player icon position
        updatePlayerIconPosition();
    } else {
        alert("You can't move in that direction!");
    }
}

updatePositionDisplay();

document.addEventListener('click', function(event) {
    if (event.target.matches('#livingRoomButtons button')) {
        var buttonAction = event.target.getAttribute('data-action');
        if (buttonAction) {
            window[buttonAction]();
        }
    }
});

// Function to check if position is valid
function isValidPosition(x, y) {
    // Define boundaries for the apartment building hallway and Joe's apartment
    var apartmentBoundaries = {
        minX: -1,
        maxX: 1,
        minY: 0,
        maxY: 1
    };
    var hallwayBoundaries = {
        minX: 0,
        maxX: 2,
        minY: -1,
        maxY: 0
    };
        // Define boundaries for the map grid
        var minX = 0;
        var maxX = gridSize - 1;
        var minY = 0;
        var maxY = gridSize - 1;
    

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

        // Check if the position is within the map boundaries
        return x >= minX && x <= maxX && y >= minY && y <= maxY;

    return false;
}



// Function to check if a cell is within a given area
function isCellInArea(cell, area) {
    return area.some(areaCell => areaCell.x === cell.x && areaCell.y === cell.y);
}


function updateMoodAndHealth(action) {
    switch (action) {
        case "refreshInRestroom":
            if (player.mood === "Sleepy") {
                player.health += 10;
                player.health = Math.min(player.health, 100);
            }
            player.mood = "Awake";
            alert("Now you're ready for the day!");
            break;
        // Add more cases for other actions affecting mood and health
        default:
            break;
    }
    updateStatus();
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
    if (weapons[weaponName]) {
        // Check if the weapon has already been obtained
        if (weapons[weaponName].obtained) {
            alert("You already have the " + weaponName + ".");
        } else {
            // Add the weapon to the player's inventory
            addItemToInventory(weaponName, 'weapons');

            // Set the obtained property of the weapon to true
            weapons[weaponName].obtained = true;

            // Hide the button associated with acquiring this weapon
            var acquireButton = document.getElementById('acquire' + weaponName.replace(/ /g, ''));
            if (acquireButton) {
                acquireButton.style.display = 'none';
            }

            // Update status and buttons display
            updateStatus();
            updateButtons();
            alert("You acquired the " + weaponName + ".");
        }
    } else {
        alert("Weapon not found.");
    }
}

function displayWeaponStats(weaponName) {
    var weapon = weapons[weaponName];
    alert("Weapon: " + weaponName + "\nDescription: " + weapon.description + "\nWeight: " + weapon.weight);
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
    var kitchenButtons = document.getElementById('kitchenButtons');
    var restroomButtons = document.getElementById('restroomButtons');
    var hallwayButtons = document.getElementById('hallwayButtons');
    var bedWindowButtons = document.getElementById('bedWindowButtons');

    // Hide all button containers initially
    livingRoomButtons.style.display = 'none';
    kitchenButtons.style.display = 'none';
    restroomButtons.style.display = 'none';
    hallwayButtons.style.display = 'none';
    bedWindowButtons.style.display = 'none';

    // Check the player's position and display the corresponding button container
    if (player.position.x === 0 && player.position.y === 0) {
        bedWindowButtons.style.display = 'block'; // Show the bed and window buttons
    } else if (player.position.x === 1 && player.position.y === 0) {
        livingRoomButtons.style.display = 'block'; // Show the living room buttons
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


var buttonsDiv = document.getElementById('livingRoomButtons');

// Check player's position and show living room buttons if in the living room
if (playerPosition.x === 1 && playerPosition.y === 0) {
    buttonsDiv.classList.remove('living-room-buttons'); // Remove the 'living-room-buttons' class to show the buttons
}


// Update buttons based on acquired weapons

// Update buttons based on acquired weapons
function updateButtons() {
    // Update existing button containers as before

    // Check if weapons should be shown or hidden based on their states
    var kitchenButtons = document.getElementById('kitchenButtons');
    if (weapons["Kitchen Knife"].obtained) {
        document.getElementById('acquireKitchenKnife').style.display = 'none';
    }
    if (weapons["Frying Pan"].obtained) {
        document.getElementById('acquireFryingPan').style.display = 'none';
    }

    // Additional logic to show living room buttons if in the living room
    var livingRoomButtons = document.getElementById('livingRoomButtons');
    if (player.position.x === 1 && player.position.y === 0) {
        livingRoomButtons.style.display = 'block';
    } else {
        livingRoomButtons.style.display = 'none';
    }
}



var customMapAreas = {
    "apartment": [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 }
    ],
    "hallway": [
        { x: 2, y: 0 },
        { x: 3, y: 0 }
    ],
    "kitchen": [
        { x: 1, y: 1 }
    ],
    "restroom": [
        { x: 1, y: -1 }
    ],
    // Define additional areas as needed
};


function generateMap(gridSize, playerPosition) {
    var mapContainer = document.getElementById('mapContainer');
    mapContainer.innerHTML = ''; // Clear existing map

    // Loop through each row and column to generate map cells
    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            var cell = document.createElement('div');
            cell.classList.add('item'); // Apply the CSS class for map cells

            // Check if the cell belongs to any custom map area
            for (var area in customMapAreas) {
                if (isCellInArea({ x, y }, customMapAreas[area])) {
                    cell.classList.add(area); // Apply the corresponding area class
                }
            }

            // Add player marker if it's the player's position
            if (x === playerPosition.x && y === playerPosition.y) {
                cell.classList.add('player');
            }

            mapContainer.appendChild(cell);
        }
    }
}

// Function to check if a cell is within a given area
function isCellInArea(cell, area) {
    return area.some(areaCell => areaCell.x === cell.x && areaCell.y === cell.y);
}


// Function to update the player's icon position
function updatePlayerIconPosition() {
    var playerIcon = document.getElementById('playerIcon');
    var cellSize = 50; // Size of each cell in pixels

    // Get the map container and its position relative to the viewport
    var mapContainer = document.getElementById('mapContainer');
    var mapRect = mapContainer.getBoundingClientRect();

    // Calculate the position of the player icon within the map
    // Adjust for negative positions by adding the absolute value of the negative position times the cell size
    var posX = Math.abs(player.position.x) * cellSize + mapRect.left + (cellSize - playerIcon.offsetWidth) / 2;
    var posY = Math.abs(player.position.y) * cellSize + mapRect.top + (cellSize - playerIcon.offsetHeight) / 2;

    // Update the position of the player icon
    playerIcon.style.left = posX + 'px';
    playerIcon.style.top = posY + 'px';
}

function updatePositionDisplay() {
    document.getElementById('positionX').textContent = player.position.x;
    document.getElementById('positionY').textContent = player.position.y;
}

updateButtonsBasedOnPosition();

updatePositionDisplay();

updateStatus();
updateButtons();
generateMap(gridSize, player.position);

