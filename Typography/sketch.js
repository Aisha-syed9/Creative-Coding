let defaultFontSize = 32; // Initial font size
let backgroundImage; // Variable to store the background image
var font; // Variable to store the font

function preload() {
  // Load the background image and font
  backgroundImage = loadImage('typography image.jpg');
  font = loadFont("CormorantGaramond-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the window
  textAlign(CENTER, CENTER); // Set text alignment to center
  textSize(defaultFontSize); // Set the default text size
}

function draw() {
  background(backgroundImage); // Draw the background image

  // Calculate font size based on mouse position
  let distance = dist(mouseX, mouseY, width / 2, height / 2); // Calculate distance from mouse to center of canvas
  let fontSize = map(distance, 0, width / 2, defaultFontSize * 0.5, defaultFontSize * 2); // Map distance to a range of font sizes

  // Set text properties
  fill(255); // Set text color to white
  textSize(fontSize); // Set text size based on calculated font size

  // Draw text
  text('"All our dreams can come true, \nif we have the courage to pursue them." \n\nWalt Disney', width / 2, height / 2); // Draw the text at the center of the canvas
}
