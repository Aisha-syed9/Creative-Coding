// Sales data array containing monthly sales values
let salesData = [
  { month: "Jan", sales: 150 },
  { month: "Feb", sales: 200 },
  { month: "Mar", sales: 250 },
  { month: "Apr", sales: 300 },
  { month: "May", sales: 350 },
  { month: "Jun", sales: 400 },
  { month: "Jul", sales: 450 },
  { month: "Aug", sales: 500 },
  { month: "Sep", sales: 550 },
  { month: "Oct", sales: 600 },
  { month: "Nov", sales: 650 },
  { month: "Dec", sales: 700 }
];

let maxSales; // Variable to store the maximum sales value
let animationProgress = 0; // Animation progress variable
let animationSpeed = 0.02; // Speed of the animation

function setup() {
  createCanvas(800, 500); // Create a canvas
  maxSales = max(salesData.map(d => d.sales)); // Find the maximum sales value in the data
  textAlign(CENTER, CENTER); // Set text alignment to center
}

function draw() {
  // Background gradient
  setGradient(0, 0, width, height, color(255, 173, 173), color(173, 216, 230));

  // Title
  fill(0);
  textSize(32);
  text("Monthly Sales Data", width / 2, 50);

  let barWidth = width / (salesData.length * 2);
  for (let i = 0; i < salesData.length; i++) {
    let barHeight = map(salesData[i].sales, 0, maxSales, 0, height - 200) * animationProgress;
    let x = i * 2 * barWidth + barWidth;
    let y = height - 100 - barHeight;

    // Bar color
    let barColor = lerpColor(color(255, 100, 100), color(100, 150, 200), map(i, 0, salesData.length - 1, 0, 1));

    // Check if the mouse is over the bar
    if (mouseX > x - barWidth / 2 && mouseX < x + barWidth / 2 && mouseY > y && mouseY < height - 100) {
      fill(255);
      // Display sales value
      textSize(16);
      text(salesData[i].sales, x, y - 10);
    } else {
      fill(barColor);
    }

    // Draw the bar
    rect(x - barWidth / 2, y, barWidth, barHeight);

    // Draw month labels
    fill(0);
    textSize(12);
    text(salesData[i].month, x, height - 80);
  }

  // Animation progress
  if (animationProgress < 1) {
    animationProgress += animationSpeed;
  }
}

// Function to draw a gradient
function setGradient(x, y, w, h, c1, c2) {
  // Top to bottom gradient
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

// Redraw the canvas when the mouse moves
function mouseMoved() {
  redraw();
}
