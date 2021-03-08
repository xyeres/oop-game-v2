/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const newGameBtn = document.querySelector('#btn__reset');
const qwerty = document.querySelector('#qwerty');
const phraseList = document.querySelector('#phrase');
let game;

newGameBtn.addEventListener('click', (e) => {
    /* 
        Clean up from previous game 
     */
    // Remove everything from UL
    phraseList.querySelector('ul').innerHTML = "";
    // Reset keyboard
    qwerty.querySelectorAll('button')
        .forEach(element => {
            element.removeAttribute('disabled', 'false');
            element.className = 'key';
        })
    // Reset Hearts
    const hearts = document.querySelectorAll('.tries');
    hearts.forEach(heart => heart.lastElementChild.src = 'images/liveHeart.png');

    /* 
        Create new game and start it
     */
    game = new Game;
    game.startGame();
})

qwerty.addEventListener('click', (e) => {
    let button = e.target;
    if (button.tagName == 'BUTTON') {
        game.handleInteraction(button)
    }
})

document.addEventListener('keydown', (e) => {
    let key = e.code;
    let overlay = document.querySelector('#overlay').style;
    // Only allow key input if a game is started
    if (overlay.display == 'none') {
        // Quick regex check to make sure it's alpha numeric
        if (key.match(/[A-Za-z]+/i)) {
            buttons = qwerty.querySelectorAll('button');
            button = [...buttons].filter(button => `Key${button.innerText.toUpperCase()}` === key)[0]
            // Only allow the letter to count if it hasn't been chosen already
            if (button !== undefined && !button.classList.contains('wrong', 'chosen')) {
                game.handleInteraction(button)
            }
        }
    }
    // If the overlay is showing and the user hits the enter key, start a new game
    if (key === 'Enter' && overlay.display !== 'none') {
        // Adapted from Stackoverflow article https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
        newGameBtn.dispatchEvent(new Event("click"));
    }
})
