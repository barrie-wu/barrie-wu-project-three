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
const $gameplayImage = $('.gameImage img');
const $gameplayText = $('.gameTextPlay p');
const $heartConatiner = $('.hearts');
const $startWindow = $('.startWindow');

// CREATE OBJECT WITH SCENES
const scenes = [
    {
        text: `In the darkenss, you see the glowing eyes of a werewolf! Are you ready to fight? Choose carefully...`,
        image: `./assets/scene1.jpg`
    },
    {
        text: `Another band of vikings are blocking your way! Will you run, or stand and fight!?`,
        image: `./assets/scene2.jpg`
    },
    {
        text: `A curse of RAGNAROK has brought your enemies back to life! Can you hold them off?`,
        image: `./assets/scene3.jpg`
    },
    {
        text: `A loud screech has caused your warriors to scatter. Will you face the banshee alone?`,
        image: `./assets/scene4.jpg`
    },
    {
        text: `Hel is impressed by your destruction and demands your soul be taken to the underworld under her dominion...`,
        image: `./assets/scenefinal.jpg`        
    },
    {
        text: `Glorious victory! A new homeland awaits...`,
        image: `./assets/sceneWin.jpg`
    },
    {
        text: `All is lost...Valhalla awaits those glorious in death.`,
        image: `./assets/sceneGameOver.jpg`
    }
]


// CREATE ODDS OBJECT WITH VARYING ODDS ARRAYS
const odds = {
    bestOdds: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    betterOdds: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    worstOdds: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

// REUSABLE RANDOMIZER FUNCTION USING Math.random ON ANY ARRAY
app.randomizer = (array) => {
    const randomArrayIndex = Math.floor(Math.random() * array.length);
    return array[randomArrayIndex]
}

// .setTimeout FUNCTION TO ITERATE THROUGH EACH <i> AND CHANGE CLASS OF elem
// PARAMS i = EACH ITERATION OF ELEMENT, elem = ELEMENT ITSELF
// SET TIME DELAY TO .4s
app.fillHearts = () => {
    $heartConatiner.each(function (i, elem) {
        setTimeout(function () {
            $(elem).toggleClass('far fas');
        }, 400 * i);
    });
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
            const displayUserName = `${userName}`;
            $('.characterNameDisplay').text(`${displayUserName}`);
            // CALL FUNCTION TO FILL HEART CONTAINERS
            app.fillHearts();
            // CHANGE GAME IMAGE TO FIRST scene obj
            $gameplayImage.attr('src', `${scenes[0].image}`)
            // FILL .gameTextPlay WITH FIRST SCENE TEXT PROPERTY
            $gameplayText.text(`${scenes[0].text}`);
            // REVEAL .startWindow
            $startWindow.show();
            // REVEAL GAME PLAY TEXT
            $('.gameTextPlay').show();
            // REMOVE CHARACTER NAME INPUT
            $('.gameTextStart').hide();
        } else {
            // ALERT IF EMPTY CHARACTER NAME STRING
            alert("Please enter a character name!");
        };
    });
}

// FUNCTION FOR .startWindow 
app.handleStartWindow = () => {
    $('.startButton').on('click', () => {
        $startWindow.hide();
    });
    $('.cancelButton').on('click', () => {
        window.location.reload();
    });
}

// GET USERS INPUT FROM RADIO CHOICES
app.userWeaponChoice = function () {

    // DEFINE A COUNTER OUTSIDE click function FOR CLICK INCREMENT
    // DEFINE SECOND COUNTER FOR HEART COUNTING
    let counter = 0;
    let heartCounter = -1;
    // EVENT LISTENER ON GAMEPLAY FORM SUBMIT
    $('.fightButton').on('click', function (event) {
        // PREVENT SUBMIT DEFAULT
        event.preventDefault();
        // PUT USER INPUT IN A VARIABLE
        const userChoiceInput = $('input[name=choice]:checked').val();
        // CONDITIONAL OF USER CHOICE TO ROLL ODDS
        // STORE oddsOutcome IN VARIABLE OUTIDE OF CONDITIONAL FOR heartContainer CONDITIONAL
        oddsOutcome = 0
        if (userChoiceInput === 'fight') {
            oddsOutcome = app.randomizer(odds.bestOdds);
        } else if (userChoiceInput === 'defend') {
            oddsOutcome = app.randomizer(odds.betterOdds);
        } else if (userChoiceInput === 'flee') {
            oddsOutcome = app.randomizer(odds.worstOdds);
        };

        // USE oddsOutcome TO CREATE CONDITIONAL IF LOSS (0) IS ROLLED
        if (oddsOutcome < 1) {
            // ITERATE THROUGH HEARTS EACH CLICK
            heartCounter = heartCounter + 1;
            // CHANGE <i>s TO AN ARRAY AND REVERSE ORDER 
            const heartContainer = $heartConatiner.toArray().reverse();
            heartContainer[heartCounter].className = 'far fa-heart';
            // DISPLAY SKULL ICON IF HIT
            $('.skullOverlay').animate({
                opacity: 1,
            }, 150).animate({
                opacity: 0,
            }, 300);
        } else if (oddsOutcome === 1) {
            $('.wolfOverlay').animate({
                opacity: 1,
            }, 150).animate({
                opacity: 0,
            }, 300);
        }

        // CLICK THROUGH SCENES
        // USE counter VARIABLE TO ITERATE THROUGH scenes[item]
        counter = counter + 1;
        $gameplayImage.attr('src', `${scenes[counter].image}`);
        $gameplayText.text(`${scenes[counter].text}`);
        // STOP CLICK EVENT BEFORE LOSE SCENE
        if (counter >= 5) {
            $(this).off(event);
        }

        // CONDITIONAL IF HEARTS ARE COUNTED THROUGH, DISPLAY GAME OVER
        // PLACED AFTER EVERYTHING SO IT RUNS LAST
        if (heartCounter >= 2) {
            $(this).off(event);
            // DISPLAY LOSE IMAGE & TEXT
            $gameplayImage.attr('src', `${scenes[6].image}`);
            $gameplayText.text(`${scenes[6].text}`);
            // ANIMATE BLACK OVERLAY ON LOSE SCREEN
            $('.overlay').animate({
                opacity: 1,
            }, 4000, function () {});
        }
    });
}

// APP init
app.init = () => {
    app.gameStart();
    app.handleStartWindow();
    app.userWeaponChoice();
};

// DOCUMENT READY
$(function() {
    app.init();
});