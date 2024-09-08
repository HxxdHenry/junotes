const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const box = 20; // Size of each block
let snake = [{ x: 2 * box, y: 2 * box }]; // Initial snake position
let food = generateFood(); // Initial food position
let d = ''; // Direction
let score = 0;
let gameInterval;
let speed = 300; // Initial speed (milliseconds)
let speedIncreaseInterval = 5000; // Increase speed every 5 seconds
let lastIncreaseTime = Date.now();
let gameRunning = true; // Track game status

// Adjust canvas size and reset game
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    food = generateFood(); // Reset food position
    if (gameRunning) {
        draw(); // Redraw game if running
    }
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * Math.floor(canvas.width / box)) * box,
        y: Math.floor(Math.random() * Math.floor(canvas.height / box)) * box
    };
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && d !== 'RIGHT') d = 'LEFT';
    if (event.key === 'ArrowUp' && d !== 'DOWN') d = 'UP';
    if (event.key === 'ArrowRight' && d !== 'LEFT') d = 'RIGHT';
    if (event.key === 'ArrowDown' && d !== 'UP') d = 'DOWN';
});

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && d !== 'LEFT') d = 'RIGHT';
        if (diffX < 0 && d !== 'RIGHT') d = 'LEFT';
    } else {
        if (diffY > 0 && d !== 'UP') d = 'DOWN';
        if (diffY < 0 && d !== 'DOWN') d = 'UP';
    }
});

function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Move snake
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (d === 'LEFT') headX -= box;
    if (d === 'UP') headY -= box;
    if (d === 'RIGHT') headX += box;
    if (d === 'DOWN') headY += box;

    // Check for food collision
    if (headX === food.x && headY === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }

    // Add new head
    snake.unshift({ x: headX, y: headY });

    // Game over conditions
    if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height || collision(headX, headY)) {
        endGame();
        return;
    }

    // Update score display
    document.getElementById('score').innerText = 'Score: ' + score;

    // Increase speed over time
    let now = Date.now();
    if (now - lastIncreaseTime > speedIncreaseInterval) {
        lastIncreaseTime = now;
        speed = Math.max(50, speed - 10);
        clearInterval(gameInterval);
        gameInterval = setInterval(draw, speed);
    }
}

function collision(x, y) {
    for (let i = 1; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) return true;
    }
    return false;
}

function endGame() {
    gameRunning = false;
    alert('Game Over! Your score: ' + score);
    resetGame();
}

function resetGame() {
    snake = [{ x: 2 * box, y: 2 * box }];
    d = '';
    score = 0;
    food = generateFood();
    speed = 300; // Reset initial speed
    lastIncreaseTime = Date.now();
    gameRunning = true; // Restart game
    gameInterval = setInterval(draw, speed); // Restart the game
}

gameInterval = setInterval(draw, speed); // Start the game
