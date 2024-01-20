// Function to initialize the block moving puzzle game when SweetAlert is loaded
function main1() {
    document.addEventListener('input', function (event) {
        if (Math.random() > 0.7) {
            const userInput = event.target.value;

            // Check if the user typed something
            if (userInput && userInput.trim().length > 0) {
                // Customize the puzzle content
                function getRandomInt(start, end) {
                    return Math.floor(Math.random() * (end - start + 1)) + start;
                }
                const puzzleContent = `Move the block to the red square!`;
                const targetPosition = { row: getRandomInt(0,2) + 1, col: getRandomInt(0,2) + 1 }; // Customize the target position

                // Display a block moving puzzle game popup using SweetAlert
                swal({
                    title: 'Block Moving Puzzle Game',
                    text: puzzleContent,
                    icon: 'info',
                    buttons: ['Cancel', 'Start'],
                    content: {
                        element: 'div',
                        attributes: {
                            id: 'blockMovingGame',
                            style: 'width: 200px; height: 200px; border: 1px solid #ccc; position: relative;',
                        },
                    },
                }).then((result) => {
                    if (result) {
                        swal('Game Over', 'Thanks for playing!', 'info');
                    }
                });

                // Clear the input field after displaying the popup
                event.target.value = '';

                // Initialize the block moving game
                initializeGame(targetPosition);
            }
        }
    });
}

// Wait for SweetAlert to be loaded
//sweetAlertScript.onload = initializeBlockMovingGame;


// Function to initialize the block moving game
function initializeGame(targetPosition) {
    const gameContainer = document.getElementById('blockMovingGame');

    // Create the block element
    const block = document.createElement('div');
    block.style.width = '50px';
    block.style.height = '50px';
    block.style.background = 'blue';
    block.style.position = 'absolute';
    block.style.top = '0';
    block.style.left = '0';

    // Create the target position element
    const targetPositionElement = document.createElement('div');
    targetPositionElement.style.width = '50px';
    targetPositionElement.style.height = '50px';
    targetPositionElement.style.background = 'red';
    targetPositionElement.style.position = 'absolute';
    targetPositionElement.style.top = `${targetPosition.row * 50}px`;
    targetPositionElement.style.left = `${targetPosition.col * 50}px`;

    // Add the elements to the game container
    gameContainer.appendChild(block);
    gameContainer.appendChild(targetPositionElement);

    // Add event listener for arrow key movements
    document.addEventListener('keydown', function (event) {
        const step = 50; // Customize the step size

        switch (event.key) {
            case 'ArrowUp':
                moveBlock('up', step);
                break;
            case 'ArrowDown':
                moveBlock('down', step);
                break;
            case 'ArrowLeft':
                moveBlock('left', step);
                break;
            case 'ArrowRight':
                moveBlock('right', step);
                break;
        }
    });

    // Function to move the block in the specified direction
    function moveBlock(direction, step) {
        const currentTop = parseInt(block.style.top);
        const currentLeft = parseInt(block.style.left);

        switch (direction) {
            case 'up':
                block.style.top = `${Math.max(0, currentTop - step)}px`;
                break;
            case 'down':
                block.style.top = `${Math.min(gameContainer.clientHeight - 50, currentTop + step)}px`;
                break;
            case 'left':
                block.style.left = `${Math.max(0, currentLeft - step)}px`;
                break;
            case 'right':
                block.style.left = `${Math.min(gameContainer.clientWidth - 50, currentLeft + step)}px`;
                break;
        }

        // Check if the block reaches the target position
        if (checkWinCondition()) {
            swal('Congratulations!', 'You moved the block to the target position!', 'success');
        }
    }

    // Function to check if the block is in the target position
    function checkWinCondition() {
        const blockTop = parseInt(block.style.top);
        const blockLeft = parseInt(block.style.left);

        const targetTop = parseInt(targetPositionElement.style.top);
        const targetLeft = parseInt(targetPositionElement.style.left);

        return blockTop === targetTop && blockLeft === targetLeft;
    }
}
