// THIS IS A 2 PLAYER GAME
// Game variables
let ball; // Ball object
let leftPaddle; // Left paddle object
let rightPaddle; // Right paddle object
let maxLose = 5; // Maximum times a player can lose
let gameOver = false; // Game over status
let winner = ''; // Winner of the game
let gameStarted = false; // Game start status

// Paddle dimensions
let paddleWidth = 10; // Width of the paddles
let paddleHeight = 100; // Height of the paddles

// Sound effects
let bounceSound; // Sound effect for ball bouncing
let scoreSound; // Sound effect for scoring
let gameOverSound; // Sound effect for game over
let winSound; // Sound effect for winning

// Background animation variables
let bgHue = 0; // Background hue
let bgBrightness = 100; // Background brightness

// Text animation variables
let textAnimationCounter = 0; // Counter for text animation
let textOpacity = 255; // Opacity of the text
let textDirection = 1; // Direction of text animation

// Preload function to load sound effects
function preload() {
  bounceSound = loadSound('bounce-8111.mp3');
  scoreSound = loadSound('8-bit-video-game-points-version-1-145826.mp3');
  gameOverSound = loadSound('game-over-arcade-6435.mp3');
  winSound = loadSound('8-bit-video-game-win-level-sound-version-1-145827.mp3');
}

// Setup function to initialize canvas and game objects
function setup() {
  createCanvas(800, 400); // Canvas size
  ball = new Ball(); // Create ball object
  leftPaddle = new Paddle(true); // Create left paddle object
  rightPaddle = new Paddle(false); // Create right paddle object
  gameOver = false; // Reset game over status
}

// Draw function to update game elements
function draw() {
  // Background animation
  background(0); // Black background
  bgBrightness = map(sin(frameCount * 0.05), -1, 1, 50, 100); // Background brightness animation

  if (!gameStarted) {
    // Animated "Pong Game" text and "Press Space Bar to Play" animation
    fill(255, 215, 0); // Gold color
    textSize(48); // Large text size
    textAlign(CENTER, CENTER); // Center alignment
    text('Pong Game', width / 2, height / 2); // Display "Pong Game" text

    // Press Space Bar to Play animation
    textOpacity += textDirection * 10; // Update text opacity
    if (textOpacity <= 0 || textOpacity >= 255) {
      textDirection *= -1; // Reverse text animation direction
    }
    fill(255, 215, 0, textOpacity); // Gold color with varying opacity
    textSize(24); // Small text size
    textAlign(CENTER, CENTER); // Center alignment
    text('Press Space Bar to Play', width / 2, height / 2 + 50); // Display "Press Space Bar to Play" text
  } else if (!gameOver) {
    // Game is in progress

    // Ball movement and collision
    ball.update();
    ball.edges();
    ball.show();

    // Paddles movement and collision
    leftPaddle.show();
    leftPaddle.update();
    rightPaddle.show();
    rightPaddle.update();

    ball.checkPaddle(leftPaddle);
    ball.checkPaddle(rightPaddle);

    // Display scores
    fill(255, 215, 0); // Gold color
    textSize(24); // Medium text size
    textAlign(CENTER); // Center alignment
    text(`Left Player: ${leftPaddle.score}`, width * 0.25, 30); // Display left player's score
    text(`Right Player: ${rightPaddle.score}`, width * 0.75, 30); // Display right player's score
  } else {
    // Game over

    // Display game over message with wave animation
    let waveOffset = sin(frameCount * 0.1) * 10; // Calculate wave offset
    fill(255, 215, 0); // Gold color
    textSize(48 + waveOffset); // Large text size with wave effect
    textAlign(CENTER, CENTER); // Center alignment
    text(winner, width / 2, height / 2); // Display winner message

    // Show start button
    fill(0); // Black color
    rect(width / 2 - 150, height / 2 + 50, 300, 50); // Draw start button background
    fill(255, 215, 0); // Gold color
    textSize(16); // Small text size
    textAlign(CENTER, CENTER); // Center alignment
    text('Press Space Bar to Play Again', width / 2, height / 2 + 75); // Display play again message
  }
}

// Function to handle key presses
function keyPressed() {
  if (!gameStarted && keyCode === 32) { // Space Bar
    gameStarted = true; // Start the game
    resetGame(); // Reset game elements
  } else if (gameOver && keyCode === 32) { // Space Bar
    resetGame(); // Reset game elements
  }

  // Left paddle controls
  if (keyIsDown(87)) { // W key
    leftPaddle.move(-10); // Move paddle up
  } else if (keyIsDown(83)) { // S key
    leftPaddle.move(10); // Move paddle down
  }

  // Right paddle controls
  if (keyIsDown(UP_ARROW)) {
    rightPaddle.move(-10); // Move paddle up
  } else if (keyIsDown(DOWN_ARROW)) {
    rightPaddle.move(10); // Move paddle down
  }
}

// Function to reset the game
function resetGame() {
  ball.reset(); // Reset ball position and speed
  leftPaddle.reset(); // Reset left paddle position and score
  rightPaddle.reset(); // Reset right paddle position and score
  gameOver = false; // Reset game over status
}

// Ball class definition
class Ball {
  constructor() {
    this.reset(); // Initialize ball properties
  }

  reset() {
    this.x = width / 2; // Initial x position
    this.y = height / 2; // Initial y position
    this.xSpeed = random(5, 6) * (random(1) > 0.5 ? 1 : -1); // Initial x speed
    this.ySpeed = random(5, 6) * (random(1) > 0.5 ? 1 : -1); // Initial y speed
    this.r = 12; // Ball radius
  }

  update() {
    this.x += this.xSpeed; // Update x position
    this.y += this.ySpeed; // Update y position
  }

  edges() {
        // Handle ball bouncing
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1; // Reverse y direction
      bounceSound.play(); // Play bounce sound effect
    }

    if (this.x < 0) {
      // Ball reached left edge
      rightPaddle.score++; // Increment right player's score
      leftPaddle.lose++; // Increment left player's loss count
      scoreSound.play(); // Play score sound effect
      this.reset(); // Reset ball position and speed
    }

    if (this.x > width) {
      // Ball reached right edge
      leftPaddle.score++; // Increment left player's score
      rightPaddle.lose++; // Increment right player's loss count
      scoreSound.play(); // Play score sound effect
      this.reset(); // Reset ball position and speed
    }
    
    // Check if a player has won
    if (leftPaddle.lose >= maxLose) {
      // Left player lost the game
      gameOver = true; // Set game over status
      winner = 'Right Player Wins!'; // Set winner message
      gameOverSound.play(); // Play game over sound effect
    } else if (rightPaddle.lose >= maxLose) {
      // Right player lost the game
      gameOver = true; // Set game over status
      winner = 'Left Player Wins!'; // Set winner message
      gameOverSound.play(); // Play game over sound effect
    }
  }

  checkPaddle(p) {
    // Check collision with paddles
    if (
      this.x - this.r < p.x + p.w &&
      this.x + this.r > p.x &&
      this.y > p.y &&
      this.y < p.y + p.h
    ) {
      this.xSpeed *= -1; // Reverse x direction
      this.ySpeed = random(-5, 5); // Add randomness to y direction
      bounceSound.play(); // Play bounce sound effect
    }
  }

  show() {
    // Display the ball
    fill(255); // White color
    ellipse(this.x, this.y, this.r * 2); // Draw ball as a circle
  }
}

// Paddle class definition
class Paddle {
  constructor(isLeft) {
    this.w = paddleWidth; // Paddle width
    this.h = paddleHeight; // Paddle height
    this.y = height / 2 - this.h / 2; // Initial y position
    this.x = isLeft ? 0 : width - this.w; // Initial x position based on isLeft parameter
    this.yspeed = 0; // Initial y speed
    this.score = 0; // Initial score
    this.lose = 0; // Initial loss count
  }

  update() {
    // Update paddle position
    this.y += this.yspeed; // Update y position
    this.y = constrain(this.y, 0, height - this.h); // Constrain y position within canvas bounds
  }

  reset() {
    // Reset paddle position and score
    this.y = height / 2 - this.h / 2; // Reset y position
    this.score = 0; // Reset score
    this.lose = 0; // Reset loss count
  }

  move(speed) {
    // Move the paddle
    this.yspeed = speed * 0.5; // Adjust speed here
  }

  show() {
    // Display the paddle
    fill(255, 215, 0); // Gold color
    rect(this.x, this.y, this.w, this.h); // Draw paddle as a rectangle
  }
}

