var img;
var pixelArray = []; // Array to store the pixel data
var circlesPerFrame = 10; // Number of circles to draw per frame
var drawnRectangles = 20; // Counter for the number of drawn circles

function preload() {
  img = loadImage(" garden.jpg");
}

function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();

  // Load the pixel data of the image into the pixelArray
  img.loadPixels();
  pixelArray = img.pixels;
}

function draw() {
  // Draw a limited number of circles per frame
  for (var i = 0; i < circlesPerFrame; i++) {
    if (drawnRectangles >= width * height) {
      noLoop(); // Stop drawing when all pixels have been covered
      break;
    }

    var x = int(random(width)); // Use 'int()' to ensure integer values
    var y = int(random(height));

    // Calculate the pixel index based on the current x and y position
    var index = (x + y * width) * 4; // Each pixel consists of 4 values (R, G, B, A)

    // Extract the color components (R, G, B) from the pixelArray
    var r = pixelArray[index];
    var g = pixelArray[index + 1];
    var b = pixelArray[index + 2];

    // Set the fill color using the sampled color with reduced alpha
    fill(r, g, b, 50);

    // Draw a circle at the random position
    rect(x, y, 30, 30);

    drawnRectangles++; // Increment the counter for drawn circles
  }
}

