// Game vars
const btnIds = ['green', 'red', 'yellow', 'blue'];
let isGameStarted = false;
let level = 0;
let gameMoves = [];
let userMoves = [];

// Attach event listners when document is ready
$(document).ready(() => {
    // Bind events to document 
    $(document).keypress(event => {
        if (!isGameStarted) {
            isGameStarted = true;
            newGame();
        }

    });

    // Bind click event to buttons
    $(".btn").on('click', (event) => {
        const btnId = event.target.id;
        clickButton(btnId);
    });

});



// ---------------- Game events ---------------------------


/**
 * Start new game
 */
function newGame() {
    level = 0;
    gameMoves = [];
    userMoves = [];
    changeLevel('nextLevel');

}


/**
 * Change the game level according to game status
 * @param {string} gameStatus Available status: 'nextLevel', 'gameOver'.
 */
function changeLevel(gameStatus) {
    let levelTitle = "";
    switch (gameStatus) {
        case 'nextLevel':
            setTimeout(() => {
                level++;
                levelTitle = `Level ${level}`;
                changeLevelTitle(levelTitle);
                resetUserMoves();
                buildPattern();
            }, 500);
            break;
        case 'gameOver':
            levelTitle = `Game Over, Press Any Key to Restart`;
            changeLevelTitle(levelTitle);
            new Audio('./sounds/wrong.mp3').play();
            isGameStarted = false;
            break;
    }
}

/**
 * Add new move into game moves
 */
function buildPattern() {
    const randomNumber = getRandomNumber(4);
    const randomBtnId = btnIds[randomNumber];

    gameMoves.push(randomBtnId);
    showBtnPress(randomBtnId);

}

/**
 * User-click game button with specified id
 * @param {number} btnId 
 */
function clickButton(btnId) {
    userMoves.push(btnId);
    showBtnPress(btnId);
    validatePattern();

}

/**
 * Validate userMoves against gameMoves
 */
function validatePattern() {
    if (userMoves.length < gameMoves.length) {
        userMoves.forEach((move, index) => {
            if (move == gameMoves[index]) {
                return;
            }
            else {
                changeLevel('gameOver');
                return;
            }
        });
        return;
    }
    else if (userMoves.length === gameMoves.length && gameMoves) {
        if (userMoves.join() === gameMoves.join())
            changeLevel('nextLevel')
        else
            changeLevel('gameOver')
    }
    else {
        changeLevel('gameOver');
    }
}

// ---------------- UTILS ------------------

/**
 * Replace the text of the level-title element with specified string
 * @param {string} title 
 */
function changeLevelTitle(title) {
    $('#level-title').text(title);
}

/**
 * Simulate button press and play corresponding sound
 * @param {string} btnId Button Id to simulate
 */
function showBtnPress(btnId) {
    const btnObj = $(`#${btnId}`);

    btnObj.fadeOut(200).fadeIn(200);
    new Audio(`./sounds/${btnId}.mp3`).play();
}

/**
 * Return a random number between 0 and limit
 * @param {number} limit Upper limit of random number
 */
function getRandomNumber(limit) {
    return randomNumber = Math.floor(Math.random() * limit);
}

/**
 * Clear userMoves array
 */
function resetUserMoves() {
    userMoves = [];
}