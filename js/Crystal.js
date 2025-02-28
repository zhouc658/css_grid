let ps = [];
let crystalFont;
let points = [];
let showText = true; // Variable to control whether to show the text or particles
let r = 0;

function preload() {
  crystalFont = loadFont('../Font/crystal2.otf'); // Replace with your font
}

function setup() {
  let canvas= createCanvas(600, 400, WEBGL);
  canvas.parent('sketch-container');
  colorMode(HSB, 255);
  angleMode(DEGREES);
  
  // Get points of the word "crystal"
  points = crystalFont.textToPoints('crystal', -150, 0, 100, {
    sampleFactor: 0.3,
  });
  
  // Set camera in the center and at an appropriate distance
}

function draw() {
    background(0);
  
    if (showText) {
      // Show the text as points and connect them with lines (shatter effect)
      beginShape();
      for (let i = 0; i < points.length; i++) {
        let p = points[i];
        let x = p.x;
        let y = p.y;
  
        push();
        translate(x, y);
        
        // Set the stroke color to white
        stroke(255); // White color for the lines
        noFill(); // No fill for the points, only stroke
        
        // Static rotation to avoid continuous movement
        rotate(r);  // Rotate the whole shape once
        r += 4;     // Increment the rotation for the next point
  
        // Draw the small lines to simulate the shattering effect
        line(-1, -1, 1, 1);
  
        pop();
      }
      endShape();
    } else {
      // Create particles from points after mouse is pressed
      if (random(1) < 0.3) { // so the 1 is like 0-100, and 0.3 is 30% so when the number that is pulled random from 0-100 <0.3 a particle will appear
        let index = floor(random(points.length)); // Pick a random point 
        let p = points[index]; //calling from the array
        ps.push(new System(p.x, p.y)); // push a particle at that point using the system class
      }
  
      // Update and display particle systems
      for (let i = ps.length - 1; i >= 0; i--) {
        ps[i].update();
        ps[i].display();
        
        if (ps[i].done) {
          ps.splice(i, 1);
        }
      }
    }
  }

// Trigger to switch to particles when mouse is pressed
function mousePressed() {
  showText = false; // Switch to particle system after mouse press
}

// Particle class remains the same as in your original code
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.random2D();
    
    this.angle = 0;
    this.size = random(3, 6);
    
    this.life = 255;
    this.done = false;
    this.hueValue = random(100, 150);
  }
  
  update() {
    this.finished();
    this.acc.mult(random(1));
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.life -= 1;
    
    if (this.hueValue > 255) {
      this.hueValue = 0;
    }
    this.hueValue += 1;
    
    this.angle += 3;
  }
  
  display() {
    stroke(255, this.life);
    fill(this.hueValue, 255, this.life);
    push();
    translate(this.pos.x, this.pos.y);
    rotateZ(this.angle);
    box(this.size);
    pop();
  }
  
  finished() {
    if (this.life < 0) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
}

class System {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.particles = []; 
    this.num = 5; 
    
    for (let i = 0; i < this.num; i++) {
      this.particles[i] = new Particle(x, y);
    }
    
    this.done = false;
  }
  
  update() {
    this.finished();
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      
      if (this.particles[i].done) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  display() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].display();
    }
  }
  
  finished() {
    if (this.particles.length == 0) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
}
