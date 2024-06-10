var img;

// Preload function to load the image before setup
function preload() {
  // Load the image file into the variable img
  img = loadImage("fox-1883658_640.jpg");
}

function setup() {
  // Create a canvas of size 400x400 pixels
  createCanvas(400, 400);
  // Set the background color to black
  background(0);
}

function draw() {
  // Clear the background to black
  background(0);
  // Display the loaded image at the top-left corner of the canvas
  image(img, 0, 0);
  
  // Map the mouseX position to a range of values between 2 and 20
  var v = map(mouseX, 0, width, 2, 20);
  // Apply the POSTERIZE filter to the canvas with the mapped value
  filter(POSTERIZE, v);
}
