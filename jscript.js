// Get the necessary elements from the HTML
const wordInputsContainer = document.getElementById('word-inputs');
const checkButton = document.getElementById('check-button');
const resultMessage = document.getElementById('result-message');
const remainingLives = document.getElementById('remaining-lives');

// Define the target word and initial lives
const targetWord = 'apple';
let lives = 3;

// Create the word input cells dynamically based on the length of the target word
for (let i = 0; i < targetWord.length; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    wordInputsContainer.appendChild(input);
}

// Add event listener to the Check button
checkButton.addEventListener('click', checkWord);

// Function to handle the word checking logic
function checkWord() {
    const userWord = Array.from(wordInputsContainer.children)
        .map(input => input.value.toLowerCase())
        .join('');

    if (userWord === targetWord) {
        resultMessage.textContent = 'Correct!';
        resultMessage.style.color = 'green';
        checkButton.disabled = true;
    } else {
        resultMessage.textContent = 'Try again!';
        resultMessage.style.color = 'red';
        lives--;

        if (lives === 0) {
            resultMessage.textContent = `You lost! The word was "${targetWord}".`;
            checkButton.disabled = true;
        } else {
            remainingLives.textContent = lives;
        }
    }
}