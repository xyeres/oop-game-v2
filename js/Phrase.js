/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
        // Loop through phrase and build li elements
        // [this.phrase].forEach(char => console.log(char + ' '));
        const ul = document.querySelector('#phrase').querySelector('ul');

        for (let letter of this.phrase) {
            let li = document.createElement("li");
            if (letter === ' ') {
                li.classList.add('space');
                li.innerHTML = ' ';
                ul.appendChild(li);
            } else {
                li.classList.add("hide", "letter", letter);
                li.textContent = letter;
                ul.appendChild(li);
            }
        }
    }
    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        if ([...this.phrase].indexOf(letter) !== -1) {
            return true;
        };
        return false;
    }
    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        const matchingLetters = document.querySelectorAll(`.${letter}`);
        matchingLetters.forEach(element => {
            element.classList.remove('hide')
            element.classList.add('show')
        })
    }
}