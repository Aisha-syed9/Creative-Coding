let offset = 0;

function setup() {
  createCanvas(800, 590);
}

function draw() {
  background(230);

  // Monitor stand base
  fill(60);
  rect(350, 470, 100, 20, 5);
  
  // Monitor stand neck
  fill(80);
  rect(375, 350, 50, 120, 5);

  // Monitor
  fill(100);
  rect(200, 100, 400, 250, 20);
  
  // Bezel
  fill(120);
  rect(210, 110, 380, 230, 10);
  
  // Screen
  fill(20);
  rect(220, 120, 360, 210, 10);
  
  // Screen Pattern
  drawScreenPattern(220, 120, 360, 210);

  // Keyboard on the ground
  fill(80);
  rect(150, 500, 500, 50, 10);
  
  // Keyboard Keys
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 3; j++) {
      fill(random(100, 255), random(100, 255), random(100, 255));
      rect(160 + i * 40, 510 + j * 10, 30, 8, 3);
    }
  }

  // Simple pattern on screen text
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Simple Pattern", 400, 225);

  // Update offset for animation
  offset += 0.05;
}

function drawScreenPattern(x, y, w, h) {
  noFill();
  strokeWeight(2);
  
  // Horizontal lines
  stroke(255, 204, 0);
  for (let i = y; i <= y + h; i += 20) {
    line(x, i + sin(offset + i * 0.1) * 10, x + w, i + sin(offset + i * 0.1) * 10);
  }
  
  // Vertical lines
  stroke(0, 255, 127);
  for (let i = x; i <= x + w; i += 20) {
    line(i + cos(offset + i * 0.1) * 10, y, i + cos(offset + i * 0.1) * 10, y + h);
  }
  
  // Circles
  stroke(255);
  for (let i = x + 10; i < x + w; i += 40) {
    for (let j = y + 10; j < y + h; j += 40) {
      ellipse(i, j, 15, 15);
    }
  }
}
