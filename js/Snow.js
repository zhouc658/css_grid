let cloudFont2;
let cloudArray2 = [];
let fadeSpeed = 0.5; // Speed of fading out
let pointAlphas = []; // Array to hold the alpha values for each dot
let velocities = []; // Array to store random velocities for drifting
let cycleTimer = 0; // Timer to trigger the transition to drifting
let isDrifting = false; // Flag to determine if drifting has started

function preload() { 
    cloudFont2 = loadFont('../Font/cloud2.ttf'); 
}

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent("sketch");    
    textFont(cloudFont2);

    cloudArray2 = cloudFont2.textToPoints("snow", width / 2 - 200, height / 2, 200, {
        sampleFactor: 0.2
    });

    // Initialize the alpha values for each dot (fade starts immediately)
    for (let i = 0; i < cloudArray2.length; i++) {
        pointAlphas.push(255); // Set initial alpha to 255
        velocities.push({
            x: random(-1.5, 1.5), // Random horizontal velocity
            y: random(-1.5, 1.5)  // Random vertical velocity
        });
    }

    console.log(cloudArray2);
}

function draw() {
    background(135, 206, 250);
    // Increment the cycle timer
    cycleTimer++;

    // Trigger the drifting after 250 frames (adjust as needed)
    if (cycleTimer > 250) {
        isDrifting = true; // Start drifting after a few seconds
    }

    // Loop through each point in the word (cloudArray2)
    for (let i = 0; i < cloudArray2.length; i++) {
        // Only process points that are still visible
        if (pointAlphas[i] > 0) {
            let point = cloudArray2[i];

            // Gradually reduce the alpha value for each point (fade starts immediately)
            pointAlphas[i] -= fadeSpeed; // Decrease opacity for each point over time
            if (pointAlphas[i] < 0) {
                pointAlphas[i] = 0; // Ensure alpha doesn't go below 0
            }

            if (isDrifting) {
                // Drift the point with velocity only after the delay
                point.x += velocities[i].x;
                point.y += velocities[i].y;
            }

            // Draw the point with its current alpha
            stroke(0, 0, 0, pointAlphas[i]); // Set the outline color (black with fading alpha)
            fill(255, 255, 255, pointAlphas[i]); // Set the fill color (white with fading alpha)
            ellipse(point.x, point.y, 10, 10);
        }
    }
}
