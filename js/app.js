/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const newGameBtn = document.querySelector('#btn__reset');
const qwerty = document.querySelector('#qwerty');
const phraseList = document.querySelector('#phrase');
let game = new Game;
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
