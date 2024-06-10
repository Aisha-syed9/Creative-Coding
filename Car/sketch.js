function setup() {
  createCanvas(400, 400); // size of canvas (x,y)
}

function draw() {
  background(255);
  
  // Draw the body of the car
  fill("#000000");
  rect(60, 200, 320, 60);
  fill("#080808");
  rect(100, 150, 230, 50);
  
  // Draw windows
  fill("#9E9E9E");
  rect(110, 160, 100, 30);
  rect(240, 160, 70, 30);
  
  // Draw wheels
  fill("#121212");
  ellipse(120, 250, 50, 50); // back wheel
  ellipse(300, 250, 50, 50); // front wheel 
  
  // Draw headlights
  fill("#FF0000");
  ellipse(377, 210, 8, 20, 10); // front
  ellipse(62, 210, 8, 20, 10); // back
  
  
  fill("#000000")
  ellipse(120, 250, 35, 35); // back wheel
  ellipse(300, 250, 35, 35); // front wheel 
  
  fill("#1B1A1A")
  ellipse(120, 250, 20, 20); // back wheel
  ellipse(300, 250, 20, 20); // front wheel 
  
}
