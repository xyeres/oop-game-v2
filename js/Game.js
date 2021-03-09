/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }
    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */
    createPhrases() {
        return [
            new Phrase('Break a leg'),
            new Phrase('Water under the bridge'),
            new Phrase('Two in the bush'),
            new Phrase('Sieze the day'),
            new Phrase('Now or never')
        ]
    }
    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
    }
    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        let randomNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomNum];
    }
    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button) {
        button.setAttribute('disabled', 'true');
        if (this.activePhrase.phrase.search(button.textContent) === -1) {
            button.classList.add('wrong');
            this.removeLife();
        } else {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.textContent);
        }
        let win = this.checkForWin();

        if (win) {
            this.gameOver(win)
        }
        
    }
    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const hearts = document.querySelectorAll('.tries');
        for (let i = 0; i <= this.missed; i++) {
            hearts[i].lastElementChild.src = 'images/lostHeart.png';
        }

        this.missed += 1;
        
        if (this.missed === 5) {
            this.gameOver(this.checkForWin());            
        }
    }
    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        const phraseListItems = document.querySelector('#phrase').querySelectorAll('li');
        return [...phraseListItems].reduce((acc, li) => li.classList.contains('hide') ? false : acc, true)
    }
    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const overlay = document.querySelector('#overlay');
        const h1 = overlay.querySelector('h1');
        overlay.style.display = 'flex';

        if (gameWon) {
            overlay.className = 'win';
            const lose = document.querySelector('.win');
            lose.style.backgroundImage = 'linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)';
            h1.textContent = 'Congratulations! You\'ve won!'
            
        } else {
            overlay.className = 'lose';
            const lose = document.querySelector('.lose');
            lose.style.backgroundImage = 'linear-gradient(to top, #feada6 0%, #f5efef 100%)';
            h1.textContent = 'Sorry, better luck next time.'    
        }
      
    }
}