var img, x, y; // Declare variables for the image and mouse position

function preload() {
  // Load the image before setup
  img = loadImage("ford_mustang_car_215784.jpg");
}

function setup() {
  // Create a canvas of size 500x400 pixels
  createCanvas(500, 400);
  // Set the background color to black
  background(0);
  // Disable drawing outlines for shapes
  noStroke();
}

function draw() {
  // Update the background color to black on each frame
  background(0);
  // Get the current mouse position
  x = mouseX;
  y = mouseY;
  // Display the image at position (0, 0)
  image(img, 0, 0);
  // Get the color of the pixel at the mouse position
  var c = get(x, y);
  // Set the fill color to the sampled color
  fill(c);
  // Draw a rectangle at the mouse position with dimensions 70x50 pixels
  rect(x, y, 70, 50);
}
