// Get the necessary elements from the HTML
const wordInputsContainer = document.getElementById('word-inputs');
const checkButton = document.getElementById('check-button');
const resultMessage = document.getElementById('result-message');
const remainingLives = document.getElementById('remaining-lives');

// Randomly select a target word from the word list
const wordList = ['tree', 'pineapple', 'bird', 'pizza']; // Replace with your word list
const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
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

// Add event listener to each input field
const inputFields = Array.from(wordInputsContainer.children);
inputFields.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (index < inputFields.length - 1) {
            inputFields[index + 1].focus();
        }
    });
});

// Function to handle the word checking logic
function checkWord() {
    const userWord = inputFields
        .map(input => {
            input.value = ''; // Clear the input field
            return input.value.toLowerCase();
        })
        .join('');

    if (userWord === targetWord) {
        resultMessage.textContent = 'Correct!';
        resultMessage.style.color = 'green';
        checkButton.disabled = true;
    } else {
        resultMessage.textContent = 'Try again!';
        resultMessage.style.color = 'red';
        lives--;
    inputFields[0].focus();
        if (lives <= 0) {
            resultMessage.textContent = `You lost! The word was "${targetWord}".`;
            checkButton.disabled = true;
            remainingLives.textContent = '0';
        } else {
            remainingLives.textContent = lives;
        }
    }
}

// Define the on-screen keyboard keys
const keyboardKeys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

// Create the on-screen keyboard dynamically
const keyboardContainer = document.getElementById('keyboard-container');
keyboardKeys.forEach(row => {
    const keyboardRow = document.createElement('div');
    keyboardRow.className = 'keyboard-row';
    row.forEach(key => {
        const keyButton = document.createElement('button');
        keyButton.className = 'keyboard-key';
        keyButton.textContent = key;
        keyButton.addEventListener('click', () => handleKeyboardInput(key));
        keyboardRow.appendChild(keyButton);
    });
    keyboardContainer.appendChild(keyboardRow);
});

function handleKeyboardInput(key) {
    // Find the first empty input field
    const emptyInput = inputFields.find(input => input.value === '');

    if (emptyInput) {
        emptyInput.value = key.toLowerCase();
        emptyInput.focus(); // Set focus on the input field

        // Check if all input fields are filled
        const allFilled = inputFields.every(input => input.value !== '');
        if (allFilled) {
            checkWord(); // Automatically trigger the check
        }
    }
}
