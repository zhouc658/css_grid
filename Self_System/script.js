let inputText;      // input field where user types a number
let category;       // dropdown to select "romantic" or "sad"

let heart;          // heart image
let droplet;        // droplet/square image

let redBkg, blueBkg;       // background images
let redLine, redGlow;      // red line and glow
let blueLine, blueGlow;    // blue line and glow

let activeLine = "red";    // current page ("red" or "blue")

// Stores data for red and blue pages
let data = {
  red: { heartTotal: 0, squareTotal: 0, bigHearts: [], smallHearts: [], bigDroplet: [], smallDroplet: [] },
  blue: { heartTotal: 0, squareTotal: 0, bigHearts: [], smallHearts: [], bigDroplet: [], smallDroplet: [] }
};

function preload() {
  redBkg = loadImage("../asset/system/redBk.JPG");
  redLine = loadImage("../asset/system/red.PNG");
  redGlow = loadImage("../asset/system/redGlow.PNG");

  blueBkg = loadImage("../asset/system/blueBk.JPG");
  blueLine = loadImage("../asset/system/blue.PNG");
  blueGlow = loadImage("../asset/system/blueGlow.PNG");

  heart = loadImage("../asset/system/heart.webp");
  droplet = loadImage("../asset/system/droplet.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Dropdown menu
  category = createSelect();
  category.option("romantic");
  category.option("sad");
  category.position(950, height / 2.4);
  category.style('font-size', '18px');
  category.style('border-radius', '10px');
  category.style('border', '2px solid #333');
  category.style('background-color', 'lightblue');

  // Input box
  inputText = createInput();
  inputText.size(110, 30);
  inputText.position(950, height / 2.2);
  inputText.style('background-color', '#F7C9C0');
  inputText.style('border', '2px solid #A3BFD9');
  inputText.style('color', '#7A9BAE');
  inputText.style('font-size', '20px');
  inputText.style('border-radius', '10px');

  // Load totals from localStorage
  data.red.heartTotal = Number(localStorage.getItem('red_heartTotal')) || 0;
  data.red.squareTotal = Number(localStorage.getItem('red_squareTotal')) || 0;
  data.blue.heartTotal = Number(localStorage.getItem('blue_heartTotal')) || 0;
  data.blue.squareTotal = Number(localStorage.getItem('blue_squareTotal')) || 0;

  // Initialize heart and droplet positions
  updateHeartPositions(data.red);
  updateDropletPositions(data.red);
  updateHeartPositions(data.blue);
  updateDropletPositions(data.blue);
}

function draw() {
  let page = data[activeLine];

  // Background
  background(activeLine === "red" ? redBkg : blueBkg);

  // Red line
  if (page.heartTotal > page.squareTotal) {
    image(redGlow, 0, 0, width, height / 1.9);
  } else {
    image(redLine, 0, 0, width, height / 1.9);
  }

  // Blue line
  if (page.squareTotal > page.heartTotal) {
    image(blueGlow, 0, 0, width, height / 1.8);
  } else {
    image(blueLine, 0, 0, width, height / 2.2);
  }

  // Draw big hearts
  for (let pos of page.bigHearts) {
    image(heart, pos.x, pos.y, 100, 100);
  }

  // Draw small hearts
  for (let pos of page.smallHearts) {
    image(heart, pos.x, pos.y, 40, 40);
  }

  // Draw big droplets
  for (let pos of page.bigDroplet) {
    image(droplet, pos.x, pos.y, 100, 100);
  }

  // Draw small droplets
  for (let pos of page.smallDroplet) {
    image(droplet, pos.x, pos.y, 40, 40);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    submit(); // add input
  } else if (key === " ") {
    activeLine = activeLine === "red" ? "blue" : "red"; // switch pages
  } else if (key === "C" || key === "c") {  // press C to clear all
    // Reset data in memory
    data.red.heartTotal = 0;
    data.red.squareTotal = 0;
    data.red.bigHearts = [];
    data.red.smallHearts = [];
    data.red.bigDroplet = [];
    data.red.smallDroplet = [];

    data.blue.heartTotal = 0;
    data.blue.squareTotal = 0;
    data.blue.bigHearts = [];
    data.blue.smallHearts = [];
    data.blue.bigDroplet = [];
    data.blue.smallDroplet = [];

    // Clear localStorage
    localStorage.removeItem('red_heartTotal');
    localStorage.removeItem('red_squareTotal');
    localStorage.removeItem('blue_heartTotal');
    localStorage.removeItem('blue_squareTotal');

    console.log("All data cleared!");
  }
}


function submit() {
  let text = inputText.value();
  let number = Number(text);
  let choice = category.value();
  let page = data[activeLine];

  if (text !== "" && !isNaN(number)) {
    if (choice === "romantic") {
      page.heartTotal += number;
      updateHeartPositions(page);
    } else if (choice === "sad") {
      page.squareTotal += number;
      updateDropletPositions(page);
    }

    // Save totals to localStorage
    localStorage.setItem('red_heartTotal', data.red.heartTotal);
    localStorage.setItem('red_squareTotal', data.red.squareTotal);
    localStorage.setItem('blue_heartTotal', data.blue.heartTotal);
    localStorage.setItem('blue_squareTotal', data.blue.squareTotal);
  }

  inputText.value("");
}

function updateHeartPositions(page) {
  let bigHeartsNeeded = Math.floor(page.heartTotal / 10);
  let smallHeartsNeeded = page.heartTotal % 10;

  while (page.bigHearts.length < bigHeartsNeeded) {
    page.bigHearts.push({ x: random(100, width - 100), y: random(100, height - 100) });
  }
  while (page.smallHearts.length < smallHeartsNeeded) {
    page.smallHearts.push({ x: random(50, width - 50), y: random(50, height - 50) });
  }
  while (page.smallHearts.length > smallHeartsNeeded) {
    page.smallHearts.pop();
  }
}

function updateDropletPositions(page) {
  let bigDropletNeeded = Math.floor(page.squareTotal / 10);
  let smallDropletNeeded = page.squareTotal % 10;

  while (page.bigDroplet.length < bigDropletNeeded) {
    page.bigDroplet.push({ x: random(100, width - 100), y: random(100, height - 100) });
  }
  while (page.smallDroplet.length < smallDropletNeeded) {
    page.smallDroplet.push({ x: random(50, width - 50), y: random(50, height - 50) });
  }
  while (page.smallDroplet.length > smallDropletNeeded) {
    page.smallDroplet.pop();
  }
}
