// Get character name from a text input and store it in a variable

// Change innerHtml of element containing character name

// Replace character name form with a gameplay form that has two radio options

// Create 2 data structures of odds, each with a different array of odds (win:lose ratio) depending on choice
    // Hard coded odds

// Create a randomizer function to iterate through odds array items and choose a random items

// Event listener on submit to take in userChoice
    // Prevent default of event listener


// STRETCH
    // Create multiple scenario objects for a deeper gameplay

    // Research a way to make odds more dynamic, instead of hard coded

    // Condintional for if loss occurs, change display of heart values

    // Restart game if hearts empty


// CREATE NAMESPACE
const app = {};

// jQuery CACHE
const $characterNameInput = $('.characterNameInput');

// CREATE OBJECT WITH SCENARIOS
const scenes = {
    first: {
        image: `./assets/firstScene.jpg`
    },
    win: {
        text: `You Won!`,
        image: `./assets/winScene.jpg`
    },
    gameOver: {
        text: `You died...`,
        image: `./assets/gameOverScene.jpg`
    }
}

// CREATE ODDS OBJECT WITH VARYING ODDS ARRAYS
const odds = {
    bestOdds: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    betterOdds: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    worstOdds: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
}

// REUSABLE RANDOMIZER FUNCTION
app.randomizer = (array) => {
    const randomArrayIndex = Math.floor(Math.random() * array.length);
    return array[randomArrayIndex]
}

// FUNCTION TO ENTER CHARACTER NAME AND START GAME
app.gameStart = () => {
    // CREATE EVENT LISTENER ON FORM SUBMIT
    $('.characterNameForm').on('submit', function (event) {
        // PREVENT DEFULT SUBMIT BEHAVIOUS
        event.preventDefault();
        // STORE characterName INTO A VARIABLE
        const userName = $characterNameInput.val();
        // ERROR HANDLING FOR EMPTY STRING
        if (userName !== '') {
            $characterNameInput.val('');
            // CHANGE NAME BASED ON USER INPUT IF STRING
            const newUserName = `${userName}`;
            $('.characterNameDisplay').text(`${newUserName}`);
            // FILL HEART CONTAINERS
            $('i').removeClass('far').addClass('fas');
            // CHANGE GAME IMAGE TO FIRST scene obj
            $('.gameImage img').attr('src', `${scenes.first.image}`)
            // REVEAL GAME PLAY TEXT
            $('.gameTextPlay').show();
            // REMOVE CHARACTER NAME INPUT
            $('.gameTextStart').hide();
        } else {
            // ALERT IF EMPTY CHARACTER NAME STRING
            alert("Please enter a character name!");
        }
    });
}

// GET USERS INPUT FROM RADIO CHOICES
app.userWeaponChoice = function () {
    // EVENT LISTENER ON GAMEPLAY FORM SUBMIT
    $('.gameplay').on('submit', function (event) {
        event.preventDefault();
        // PUT USER INPUT IN A VARIABLE
        const userWeaponInput = $('input[name=weapon]:checked').val();
        // CONDITIONAL OF USER CHOICE TO ROLL ODDS
        if (userWeaponInput === 'axe') {
            app.gamePlay(odds.bestOdds);
        } else if (userWeaponInput === 'hammer') {
            app.gamePlay(odds.betterOdds);
        } else if (userWeaponInput === 'sword') {
            app.gamePlay(odds.worstOdds);
        };

    });
}

// FUNCTION TO ROLL ODDS DEPENDING ON CHOSEN WEAPON AND DISPLAY WIN/LOSE
app.gamePlay = (odds) => {
    const randomRoll = app.randomizer(odds);
    if (randomRoll > 0) {
        $('.gameImage img').attr('src', `${scenes.win.image}`);
        $('.gameTextPlay p').text(`${scenes.win.text}`);
    } else {
        $('.gameImage img').attr('src', `${scenes.gameOver.image}`);
        $('.gameTextPlay p').text(`${scenes.gameOver.text}`);
    }
}

// APP init
app.init = () => {
    app.gameStart();
    app.userWeaponChoice();
};

// DOCUMENT READY
$(function() {
    app.init();
});