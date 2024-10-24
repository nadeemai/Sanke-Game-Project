const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define initial variables
let boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * 20) * boxSize, y: Math.floor(Math.random() * 20) * boxSize };
let score = 0;
let gameInterval = setInterval(gameLoop, 100);

// Listen for arrow key presses
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (direction.x === 0) {
                direction = { x: -boxSize, y: 0 };
            }
            break;
        case 38: // Up arrow
            if (direction.y === 0) {
                direction = { x: 0, y: -boxSize };
            }
            break;
        case 39: // Right arrow
            if (direction.x === 0) {
                direction = { x: boxSize, y: 0 };
            }
            break;
        case 40: // Down arrow
            if (direction.y === 0) {
                direction = { x: 0, y: boxSize };
            }
            break;
    }
}

function gameLoop() {
    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * 20) * boxSize, y: Math.floor(Math.random() * 20) * boxSize };
    } else {
        snake.pop(); // Remove the last part of the snake
    }

    // Add the new head to the snake
    snake.unshift(head);

    // Check for collisions with walls or itself
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || checkCollision(head)) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        return;
    }

    // Redraw the game
    draw();
}

function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Display the score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}
