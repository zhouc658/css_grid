let stations = [];   // Array to store all station info (name + x position)
let trainP;          // position of the train
let trackP;          // position of the track
let dragging = false; // True when user is dragging the train
let offsetX = 0;     // Mouse offset to keep dragging smooth
let showHeatmap = false; 

let button; // button for changing date
let currentDate = "Oct 17";//we start off with this date

// data for different days
let data = {
"Oct 17": [
    { name: "Flushing-Main St", x: 100, usingPhone: 25, notUsingPhone: 6, interacting: 4 },
    { name: "Mets–Willets Point", x: 250, usingPhone: 22, notUsingPhone: 2, interacting: 2 },
    { name: "111 St", x: 400, usingPhone: 22, notUsingPhone: 2, interacting: 2 },
    { name: "103 St-Corona Plaza", x: 550, usingPhone: 22, notUsingPhone: 2, interacting: 2 }, //no change becuz this stop does not stop
    { name: "Juntion Blvd", x: 700, usingPhone: 19, notUsingPhone: 2, interacting: 0 },
    { name: "90 St-Elmhurst Av", x: 850, usingPhone: 22, notUsingPhone: 4, interacting: 0 },
    { name: "82 St-Jackson Heights", x: 1000, usingPhone: 28, notUsingPhone: 4, interacting: 0 },
    { name: "74 St-Broadway", x: 1150, usingPhone: 28, notUsingPhone: 4, interacting: 0 },
  ],
  "Oct 18": [
    { name: "Flushing-Main St", x: 100, usingPhone: 18, notUsingPhone: 1, interacting: 0 },
    { name: "Mets–Willets Point", x: 250, usingPhone: 21, notUsingPhone: 3, interacting: 0 },
    { name: "111 St", x: 400, usingPhone: 23, notUsingPhone: 3, interacting: 0},
    { name: "103 St-Corona Plaza", x: 550, usingPhone: 23, notUsingPhone: 3, interacting: 0 },
    { name: "Juntion Blvd", x: 700, usingPhone: 22, notUsingPhone: 3, interacting: 0 },
    { name: "90 St-Elmhurst Av", x: 850, usingPhone: 20, notUsingPhone: 2, interacting: 0 },
    { name: "82 St-Jackson Heights", x: 1000, usingPhone: 16, notUsingPhone: 2, interacting: 0 },
    { name: "74 St-Broadway", x: 1150, usingPhone: 16, notUsingPhone: 2, interacting: 0 },
  ],
  
  "Oct 19": [
    { name: "Flushing-Main St", x: 100, usingPhone: 20, notUsingPhone: 5, interacting: 3 },
    { name: "Mets–Willets Point", x: 250, usingPhone: 22, notUsingPhone: 5, interacting: 3 },
    { name: "111 St", x: 400, usingPhone: 22, notUsingPhone: 2, interacting: 3 },
    { name: "103 St-Corona Plaza", x: 550, usingPhone: 22, notUsingPhone: 2, interacting: 3 }, //no change becuz this stop does not stop
    { name: "Juntion Blvd", x: 700, usingPhone: 23, notUsingPhone: 4, interacting: 0 },
    { name: "90 St-Elmhurst Av", x: 850, usingPhone: 22, notUsingPhone: 4, interacting: 0 },
    { name: "82 St-Jackson Heights", x: 1000, usingPhone: 19, notUsingPhone: 3, interacting: 0 },
    { name: "74 St-Broadway", x: 1150, usingPhone: 19, notUsingPhone: 3, interacting: 0 },
  ]
}

let trainImg; // variable to hold the image
let savedHeatPositions = {}; // store fixed random positions per station

let positions = [
    { x: 380, y: 350}, { x: 410, y: 350 }, 
    { x: 550, y: 350 }, { x: 580, y: 330 },{ x: 620, y: 350 },{ x: 650, y: 340 },{ x: 680, y: 355 }, { x: 710, y: 340 }, 

   { x: 790, y: 290 }, //one in corner

   { x: 760, y: 460 }, 

   { x: 470, y: 460 }, 
   { x: 490, y: 290 },
   { x: 500, y: 440 },
   { x: 1000, y: 290 }, 

   { x: 1000, y: 590 }, 

   { x: 820, y: 320 }, { x: 850, y: 350 },{ x: 880, y: 340 },{ x: 910, y: 350 }, { x: 940, y: 330 }, { x: 970, y: 350 },
   
   //bottom half
   { x: 380, y: 570}, { x: 410, y: 550 }, 
    { x: 550, y: 560 }, { x: 580, y: 540 },{ x: 620, y: 530 },{ x: 650, y: 550 },{ x: 680, y: 570 }, { x: 710, y: 550 }, 

   { x: 790, y: 590 }, //one in corner

   { x: 820, y: 570 }, { x: 850, y: 560 },{ x: 880, y: 570 },{ x: 910, y: 550 }, { x: 940, y: 570 }, { x: 970, y: 560 }
  ];
  
function preload() {
    trainImg = loadImage("../asset/city/cart.PNG"); // load your image
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    
    rectMode(CENTER);        // Draw rectangles from their center
    textAlign(CENTER);       // All text will be horizontally centered
    trackP = height / 2;     // Place the track in the middle of the canvas
    
    stations = data[currentDate];
    trainP = stations[0].x;
    // Dropdown menu
    button = createSelect(); //Creates a dropdown menu
    button.position(50, 800); 
    button.option("Oct 17"); //create the options
    button.option("Oct 18");
    button.option("Oct 19");
    button.selected(currentDate); //this makes sure or starts with the date in currentDate which is oct17
    button.changed(changeDate); //when button change or have a different option then use changeDate function
}

function changeDate() {
  // Update the date based on the button and show corresponding data
  currentDate = button.value(); //this is checking what is the button/date the user picked so the value which will update on the currentDate
  stations = data[currentDate]; //Get the data or info depending on the selected date and will show the pop-up bubble depending on the station
  trainP = stations[0].x; // start train from first station when the date changes
}

function draw() {
  background(255);

  if (!showHeatmap){
  // track line
  stroke(0);
  strokeWeight(4);
  line(100, trackP, width - 50, trackP);

  // stations circle
  noStroke();
  fill(50);
  textSize(12);
  for (let s of stations) { //going thru each stations data or info
  // so map can convert the amount of people usingPhone (10–30 people) to a circle size (5–35 pixels)
  let circleSize = map(s.usingPhone, 10, 30, 5, 35);

  // draw the circle for the station
  fill(50);
  noStroke();
  ellipse(s.x, trackP, circleSize);// draw circle for each station, s.x is the horizontal position of the station so that each station gets a circle, and trackP keeps it on the track line, and 14 is the radius or size of the circle

  // label the station
  text(s.name, s.x, trackP + 25); // s.name gets the station name from the array, s.x is the position, and trackP + 25 makes the text appear beneath the circle or track line
}
  //train cart
  fill(100);
  rect(trainP, trackP - 40, 60, 30, 5);  

  // data popup bubble
for (let s of stations) { //going thru each station so that the bubble popup for each station when the train is at it
  // if train is within 2px to the left or right of station, then the info will pop up
  if (trainP > s.x - 2 && trainP < s.x + 2) {
    stroke(0);
    strokeWeight(1.5);
    fill(255);
    rect(s.x, trackP - 100, 150, 50, 10); // Info box above station
    noStroke();
    fill(0);
    text("People using phone: " + s.usingPhone , s.x, trackP - 110);
    text("People not using phone: " + s.notUsingPhone , s.x, trackP - 95);
    text("People interacting: " + s.interacting, s.x, trackP - 80); 
    
    // press ENTER TO display the heatmap
    fill(0, 120, 255);
    textSize(14);
    text("Press ENTER to enter the cart", width / 2, height - 60);
  }
}
} else {
    imageMode(CENTER);
  image(trainImg, width / 2, height / 2, 700, 400);
// Draw the heatmap legend
noStroke();
textAlign(LEFT);
textSize(14);

// Legend background box
fill(255, 240);
rect(width - 180, height / 2 - 60, 150, 100, 10);

// Legend title
fill(0);
text("Legend", width - 160, height / 2 - 80);

// Colored circles for categories
let legendX = width - 160;
let legendY = height / 2 - 60;

fill(255, 120, 0, 180); // orange — using phone
ellipse(legendX, legendY, 20);
fill(0);
text("Using phone", legendX + 30, legendY + 5);

fill(0, 100, 255, 180); // blue — not using phone
ellipse(legendX, legendY + 30, 20);
fill(0);
text("Not using phone", legendX + 30, legendY + 35);

fill(0, 200, 100, 180); // green — interacting
ellipse(legendX, legendY + 60, 20);
fill(0);
text("Interacting", legendX + 30, legendY + 65);

let currentStation;
  for (let s of stations) {
    if (trainP > s.x - 2 && trainP < s.x + 2) {
      currentStation = s;
      break;
    }
  }

if (!currentStation) return;
drawHeatmapForStation(currentStation);

  fill(0);
  textAlign(CENTER);
  textSize(16);
  text("Press ENTER again to exit the cart", width / 2, height - 60);
  }
}
function mouseMoved() {
    console.log("x:", mouseX, "y:", mouseY);
  }
  
  function drawHeatmapForStation(station) {
    // Each day gets its own shuffled set of positions (keeps the same structure but random order)
    if (!savedHeatPositions[currentDate]) {
      savedHeatPositions[currentDate] = shuffle([...positions]);
    }
  
    let shuffled = savedHeatPositions[currentDate];
  
    // Compute how many total blobs we need
    let totalCount = station.usingPhone + station.notUsingPhone + station.interacting;
  
    // Use exactly enough positions from the shuffled layout
    let activePositions = shuffled.slice(0, totalCount);
  
    // Now split the active positions *without overlap*
    let phonePositions = activePositions.slice(0, station.usingPhone);
    let noPhonePositions = activePositions.slice(station.usingPhone, station.usingPhone + station.notUsingPhone);
    let interactingPositions = activePositions.slice(
      station.usingPhone + station.notUsingPhone,
      totalCount
    );
  
    // Draw each group
    drawCategoryHeat(station.usingPhone, color(255, 120, 0), phonePositions); // orange
    drawCategoryHeat(station.notUsingPhone, color(0, 100, 255), noPhonePositions); // blue
    drawCategoryHeat(station.interacting, color(0, 200, 100), interactingPositions); // green
  }
  
  function drawCategoryHeat(count, baseColor, positionsSubset) {
    noStroke();
  
    // Just use as many as the count, capped at the available positions
    let chosen = positionsSubset.slice(0, min(count, positionsSubset.length));
  
    for (let p of chosen) {
      for (let r = 3; r >= 1; r--) {
        fill(
          red(baseColor),
          green(baseColor),
          blue(baseColor),
          50 / r
        );
        ellipse(p.x, p.y, 1 + r * 23);
      }
    }
  }
  
  
//if clicked on train then
function mousePressed() {
    
  if ( //if the mouse is within the train then it can trigger drag being true
    mouseX > trainP - 30 && //mouseX keeps track of the mouse being wihting the width of the train, since the train size is 60 so it is 30 and 30 here
    mouseX < trainP + 30 &&
    mouseY > trackP - 55 && //this is tracking if the mouse is withing the height between the top and bottom of the train
    mouseY < trackP - 25
  ) {
    dragging = true;
    offsetX = trainP - mouseX;//keeps mouse drag more smooth, it stores how far from the train’s center mouse is clicked, so the train follows  mouse smoothly without jumping when you drag it.
  }
}


// function for mouse dragged to moce along the track ---
function mouseDragged() {
  if (dragging) { //if it is tragging then 
    trainP = mouseX + offsetX; // so we are updating the trainP position based off where the mouse is dragging/moving, and have the train follow the mouse with offetX so that the train does not jump, it keeps it smooth 
    if (trainP < stations[0].x) {
  trainP = stations[0].x; // stop train at first station
} else if (trainP > stations[stations.length - 1].x) { //if the train posioyion is past the last station then do the following. Use stations.length to get the station at the last position in the array, since stations.length is the total positons in the array and minus 1 to get the last station
  trainP = stations[stations.length - 1].x; // stop train at last station
}
}
}

// function for mouse released
function mouseReleased() {
  if (dragging) { // it only checks if the train is already being dragged, so that the next one would make sense dragging=false, means dragging stopped/finished
    dragging = false;

    // stop at nearest station, so that it doesn't stop midway, like how actual subway stops at stations usually
   
    for (let s of stations) {
      if (trainP > s.x - 75 && trainP < s.x + 75) { // If the train is within 75 pixels of a station (to the left or right) then
        trainP = s.x; //it will snap to that station that it is within the range of 75 pixels
      }
    }
  }
}
function keyPressed() {
    if (keyCode === ENTER) {
      showHeatmap = !showHeatmap;
    }
  }
  