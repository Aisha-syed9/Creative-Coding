let mic, fft; // Declare variables for microphone input and Fast Fourier Transform (FFT) analyzer
let numBars = 64; // Number of bars in the visualization
let barSpacing = 2; // Spacing between bars
let particles = []; // Array to hold particles
let maxParticles = 200; // Maximum number of particles

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that matches the window size

  // Initialize the microphone input
  mic = new p5.AudioIn();
  mic.start(); // Start capturing audio from the microphone

  // Initialize the FFT analyzer and set its input to the microphone
  fft = new p5.FFT();
  fft.setInput(mic);

  // Create the particles and add them to the particles array
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0); // Clear the background with black color

  // Move the origin to the center of the canvas
  translate(width / 2, height / 2);

  // Get the frequency spectrum from the FFT analyzer
  let spectrum = fft.analyze();
  strokeWeight(2); // Set the weight of the stroke lines

  // Loop through the number of bars and draw each one
  for (let i = 0; i < numBars; i++) {
    // Calculate the angle and amplitude for each bar
    let angle = map(i, 0, numBars, 0, TWO_PI);
    let amplitude = spectrum[i];
    let r = map(amplitude, 0, 255, 50, 300);

    // Calculate the x and y positions for the end of each bar
    let x = r * cos(angle);
    let y = r * sin(angle);

    // Set the color of the bar based on its position
    stroke(lerpColor(color('blue'), color('pink'), i / numBars));
    
    // Draw the line from the center to the calculated position
    line(0, 0, x, y);
  }

  // Update and display each particle
  for (let particle of particles) {
    particle.update();
    particle.show();
  }
}

// Particle class to manage the behavior of individual particles
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y); // Position vector
    this.vel = p5.Vector.random2D(); // Velocity vector with random direction
    this.acc = createVector(0, 0); // Acceleration vector initialized to zero
    this.r = random(2, 8); // Radius of the particle
    // Color of the particle with random RGB values and some transparency
    this.color = color(random(100, 2), random(100, 25), random(100, 255), 150);
  }

  // Apply a force to the particle's acceleration
  applyForce(force) {
    this.acc.add(force);
  }

  // Update the particle's position based on its velocity and acceleration
  update() {
    let micLevel = mic.getLevel(); // Get the current microphone level
    let force = p5.Vector.random2D(); // Generate a random 2D force vector
    force.mult(micLevel * 10); // Scale the force based on the mic level
    this.applyForce(force); // Apply the force to the particle

    this.vel.add(this.acc); // Update velocity based on acceleration
    this.pos.add(this.vel); // Update position based on velocity
    this.acc.mult(0); // Reset acceleration to zero

    // Reverse the velocity if the particle hits the edge of the canvas
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

  // Display the particle on the canvas
  show() {
    noStroke(); // Remove stroke for the particle
    fill(this.color); // Set the fill color
    // Draw the particle as a circle at its position
    ellipse(this.pos.x - width / 2, this.pos.y - height / 2, this.r * 2);
  }
}

// Resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
