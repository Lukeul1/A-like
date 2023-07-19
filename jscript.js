// Get the necessary elements from the HTML
const wordInputsContainer = document.getElementById('word-inputs');
const checkButton = document.getElementById('check-button');
const resultMessage = document.getElementById('result-message');
const remainingLives = document.getElementById('remaining-lives');

// Randomly select a target word from the word list
const wordList = ["first","people","still","world","great","right"]

const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
let lives = 3;

// Create the word input cells dynamically based on the length of the target word
for (let i = 0; i < targetWord.length; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.pattern = '[a-zA-Z]'; // Restrict input to English alphabet letters only
    wordInputsContainer.appendChild(input);
}

// Add event listener to the Check button
checkButton.addEventListener('click', checkWord);

// Add event listener to each input field
const inputFields = Array.from(wordInputsContainer.children);
inputFields.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value === '') {
            // If the input is empty, remain in the same input field
            input.blur();
        } else if (index < inputFields.length - 1) {
            inputFields[index + 1].focus();
        } else {
            checkButton.focus(); // Move focus to the Check button after the final input field
        }
    });

    input.addEventListener('keydown', event => {
        if (event.key === 'Backspace') {
            // Prevent default behavior of backspace key
            event.preventDefault();

            // Find the index of the current input field
            const currentIndex = inputFields.indexOf(input);

            // Clear the input field
            input.value = '';

            // Set focus back to the current input field
            input.focus();
        }
    });
});

// Function to handle the word checking logic
function checkWord() {
    const userWord = inputFields
        .map(input => {
            const inputValue = input.value.toLowerCase();
            input.value = ''; // Clear the input field
            return inputValue;
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
        inputFields.forEach((input, index) => {
            input.value = ''; // Clear the input fields
            if (index === 0) {
                input.focus(); // Set focus to the initial input field
            }
        });
        if (lives <= 0) {
            resultMessage.textContent = `You lost! The word was "${targetWord}".`;
            checkButton.disabled = true;
            remainingLives.textContent = '0';
        } else {
            remainingLives.textContent = lives;
        }
    }

    // Remove focus from the input fields
    inputFields.forEach(input => input.blur());
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

// Function to handle on-screen keyboard input
function handleKeyboardInput(key) {
    // Find the first empty input field
    const emptyInput = inputFields.find(input => input.value === '');

    if (emptyInput) {
        const inputValue = key.toLowerCase();

        if (/^[a-zA-Z]$/.test(inputValue)) {
            // If the input is a letter, populate the empty input field
            emptyInput.value = inputValue;

            // Find the index of the current empty input field
            const currentIndex = inputFields.indexOf(emptyInput);

            // Set focus on the next input field (if available)
            if (currentIndex < inputFields.length - 1) {
                inputFields[currentIndex + 1].focus();
            } else {
                // Do not trigger the check automatically
            }
        }
    }
}
