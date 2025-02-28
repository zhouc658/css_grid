let bubbleFont;
let bubbleObjects = [];

function preload() { 
    bubbleFont = loadFont('../Font/bubble.ttf'); 
}

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent("sketch");    
    textFont(bubbleFont);

    let bubbleArray = bubbleFont.textToPoints("bubble", 100, height / 2, 170, {
        sampleFactor: 0.08
    });

    // Create BubbleObjects from bubbleArray
    for (let i = 0; i < bubbleArray.length; i++) {
        bubbleObjects[i] = new BubbleObject(bubbleArray[i].x, bubbleArray[i].y);
    }

    console.log(bubbleObjects);
}

function draw() {
    background(85, 150, 200); // Clear the background
    stroke(0); // Set stroke color for bubbles

    // Loop through bubbleObjects to display and move them
    for (let i = 0; i < bubbleObjects.length; i++) {
        bubbleObjects[i].show();
        bubbleObjects[i].move();
    }
}

function mousePressed() {
    // Reset the position of all bubbles when mouse is pressed
    for (let i = 0; i < bubbleObjects.length; i++) {
        bubbleObjects[i].reset();
    }
}

class BubbleObject {
    constructor(x, y) {
        this.x = x; // original x
        this.y = y; // original y
        this.x_ = x; // current x
        this.y_ = y; // current y

        this.size = 10; // Initialize size with a random value
        this.color = color(random(255), random(255), random(180, 255)); // Random color for the bubble
    }

    show() {
        noStroke(); // Remove the stroke to focus on the fill
        fill(this.color); // Use the random color
        ellipse(this.x_, this.y_, this.size, this.size); // Draw the bubble with the current size
    }

    move() {
        // Calculate the distance to the mouse
        let mouseDistance = dist(this.x_, this.y_, mouseX, mouseY);

        // If the distance is small, move the bubble randomly and increase the size
        if (mouseDistance <= 50) {
            this.x_ += random(-50, 50);
            this.y_ += random(-50, 50);
            this.size += random(1, 6); // Randomly increase the size
        }
    }

    reset() {
        // Reset the position to the original location
        this.x_ = this.x;
        this.y_ = this.y;
        this.size = 10; // Optionally reset the size when the bubble is reset
    }
}
