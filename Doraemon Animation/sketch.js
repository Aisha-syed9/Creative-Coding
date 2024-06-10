// Total number of frames in the animation
var numFrames = 6;
// Current frame index
var frame = 0;
// Array to store images for animation
var images = new Array(numFrames);
// Colors for the sky, grass, and road
var skyColor = [135, 206, 235]; // Sky blue
var grassColor = [124, 252, 0]; // Lawn green
var roadColor = [169, 169, 169]; // Dark gray
// Heights of grass and road
var grassHeight = 100;
var roadHeight = 50;
// Initial position of Doraemon
var doraemonX, doraemonY;
// Background offset for moving background
var bgOffset = 0;

// Preload images
function preload() {
    images[0] = loadImage("animation1.png");
    images[1] = loadImage("animation2.png");
    images[2] = loadImage("animation3.png");
    images[3] = loadImage("animation4.png");
    images[4] = loadImage("animation5.png");
    images[5] = loadImage("animation6.png");
}

function setup() {
    createCanvas(500, 450);
    frameRate(12); // Set frame rate for smoother animation
    // Initial position of Doraemon
    doraemonX = width / 2 - 50; // Centered horizontally
    doraemonY = height - grassHeight - roadHeight - 150; // Positioned above the road
}

function draw() {
    // Draw the sky
    background(skyColor);

    // Draw the moving grass
    fill(grassColor);
    for (let x = bgOffset; x < width; x += 40) {
        rect(x, height - grassHeight, 40, grassHeight);
    }

    // Draw the moving road
    fill(roadColor);
    for (let x = bgOffset; x < width; x += 40) {
        rect(x, height - grassHeight - roadHeight, 40, roadHeight);
    }

    // Update the background offset for a moving background effect
    bgOffset -= 4; // Increase the speed for a faster movement
    if (bgOffset < -40) {
        bgOffset = 0;
    }

    // Update the frame index
    frame++;
    if (frame == numFrames) frame = 0;

    // Move Doraemon horizontally
    doraemonX += 8; // Set the speed of Doraemon
    if (doraemonX > width) {
        doraemonX = -images[frame].width; // Reset Doraemon's position when it goes off the screen
    }

    // Display Doraemon at the updated position
    image(images[frame], doraemonX, doraemonY);
}

// Hide the cursor for a cleaner animation
function mouseMoved() {
  noCursor();
}
