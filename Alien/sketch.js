let pupilX; // X-coordinate of the pupil
let pupilY; // Y-coordinate of the pupil

function setup() {
  createCanvas(500, 500); // Create a canvas of size 500x500 pixels
  noStroke(); // Disable drawing outlines for shapes
}

function draw() {
  background(6, 98, 1); // Set the background color to Alien skin color

  // Draw ears
  fill(6, 98, 1); // Set fill color to Alien skin color
  ellipse(100, 50, 50, 150); // Left ear
  ellipse(400, 50, 50, 150); // Right ear

  // Draw eye
  fill(135, 1, 1); // Set fill color to White
  ellipse(250, 150, 200); // Draw the eye

  // Calculate pupil position based on mouse position
  pupilX = map(mouseX, 0, width, 200, 300); // Map mouseX to pupilX between 200 and 300
  pupilY = map(mouseY, 0, height, 100, 200); // Map mouseY to pupilY between 100 and 200

  // Draw pupil
  fill(0); // Set fill color to Black
  ellipse(pupilX, pupilY, 110); // Draw the pupil

  // Draw mouth
  fill(0); // Set fill color to Black
  ellipse(250, 350, 190, 90); // Draw the mouth

  // Draw teeth
  fill(255); // Set fill color to White
  for (let i = 0; i < 3; i++) { // Draw three teeth
    let x = 180 + i * 60; // Calculate x-coordinate of teeth
    rect(x, 330, 25, 20); // Draw a rectangle representing a tooth
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size when the window is resized
}
