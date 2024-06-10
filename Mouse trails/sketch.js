let butterfly;
let galaxy;
let sparkles = []; // Array to store sparkle objects
const butterflyWidth = 100;
const butterflyHeight = 100;
const d = 50; // Distance from center to adjust mouse position

function preload() {
  // Preload butterfly and galaxy images
  butterfly = loadImage('—Pngtree—butterfly_121554.png');
  galaxy = loadImage(' galaxy.jpg');
}

function setup() {
  createCanvas(500, 400); // Create canvas
  noStroke(); // Disable stroke for a cleaner look
  mouseX = -d; // Initialize mouseX to adjust for butterfly's position
  mouseY = -d; // Initialize mouseY to adjust for butterfly's position
}

function draw() {
  // Draw the galaxy background
  background(galaxy);

  // Draw the butterfly following the mouse, scaled down
  image(butterfly, mouseX - butterflyWidth / 2, mouseY - butterflyHeight / 2, butterflyWidth, butterflyHeight);

  // Add new sparkle to the trail
  if (frameCount % 3 == 0) { // Add a new sparkle every few frames
    let sparkle = {
      x: mouseX, // X position of the sparkle
      y: mouseY, // Y position of the sparkle
      size: random(5, 15), // Size of the sparkle
      alpha: 255, // Initial transparency of the sparkle
    };
    sparkles.push(sparkle); // Add the new sparkle to the array
  }

  // Draw sparkles
  for (let i = sparkles.length - 1; i >= 0; i--) { // Loop through all sparkles
    noStroke(); // Disable stroke for sparkles
    fill(255, 215, 0, sparkles[i].alpha); // Gold color with transparency
    ellipse(sparkles[i].x, sparkles[i].y, sparkles[i].size); // Draw the sparkle
    sparkles[i].alpha -= 5; // Reduce transparency to make the sparkle fade out
    if (sparkles[i].alpha <= 0) { // If the sparkle has faded out completely
      sparkles.splice(i, 1); // Remove the sparkle from the array
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size if window is resized
}
