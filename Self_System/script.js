let inputText;      // input field where user types a number
let category;       // dropdown to select "romantic", "sad", "happy"

let heart;          // heart image
let droplet;        // droplet/square image
let sun;            // sun image

let redBkg, blueBkg;       // background images
let redLine, redGlow;      // red line and glow
let blueLine, blueGlow;    // blue line and glow
let yellowLine, yellowGlow; // yellow line and glow

let activeLine = "red";    // current page ("red", "blue", "yellow")

// Stores data for red, blue, yellow pages
let data = {
  red:    { heartTotal: 0, squareTotal: 0, bigHearts: [], smallHearts: [], bigDroplet: [], smallDroplet: [], bigSun: [], smallSun: [] },
  blue:   { heartTotal: 0, squareTotal: 0, bigHearts: [], smallHearts: [], bigDroplet: [], smallDroplet: [], bigSun: [], smallSun: [] },
  yellow: { heartTotal: 0, squareTotal: 0, bigHearts: [], smallHearts: [], bigDroplet: [], smallDroplet: [], bigSun: [], smallSun: [] }
};

function preload() {
  redBkg = loadImage("../asset/system/redBk.JPG");
  redLine = loadImage("../asset/system/red.PNG");
  redGlow = loadImage("../asset/system/redGlow.PNG");

  blueBkg = loadImage("../asset/system/blueBk.JPG");
  blueLine = loadImage("../asset/system/blue.PNG");
  blueGlow = loadImage("../asset/system/blueGlow.PNG");

  yellowLine = loadImage("../asset/system/yellow.PNG");
  yellowGlow = loadImage("../asset/system/yellowGlow.PNG");
  yellowBkg= loadImage("../asset/system/yellowBkg.JPG")

  heart = loadImage("../asset/system/heart.webp");
  droplet = loadImage("../asset/system/droplet.webp");
  sun = loadImage("../asset/system/sun.PNG"); // add your sun asset
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Dropdown menu
  category = createSelect();
  category.option("romantic");
  category.option("sad");
  category.option("happy"); // new category
  category.position(980, height / 2.4);
  category.style('font-size', '18px');
  category.style('border-radius', '10px');
  category.style('background-color', 'lightblue');

  // Input box
  inputText = createInput();
  inputText.size(110, 30);
  inputText.position(970, height / 2.2);
  inputText.style('background-color', '#F7C9C0');
  inputText.style('border', '2px solid #A3BFD9');
  inputText.style('color', '#7A9BAE');
  inputText.style('font-size', '20px');
  inputText.style('border-radius', '10px');

  // Load totals from localStorage
  for (let key of ["red", "blue", "yellow"]) {
    data[key].heartTotal = Number(localStorage.getItem(`${key}_heartTotal`)) || 0;
    data[key].squareTotal = Number(localStorage.getItem(`${key}_squareTotal`)) || 0;
    data[key].sunTotal = Number(localStorage.getItem(`${key}_sunTotal`)) || 0;

    updateHeartPositions(data[key]);
    updateDropletPositions(data[key]);
    updateSunPositions(data[key]);
  }
}

function draw() {
  let page = data[activeLine];

  // Backgrounds
  if (activeLine === "red") background(redBkg);
  if (activeLine === "blue") background(blueBkg);
  if (activeLine === "yellow") background(yellowBkg); // placeholder if no image

  // Red line
  if (page.heartTotal > page.squareTotal && page.heartTotal > (page.sunTotal || 0)) {
    image(redGlow, 0, 0, width, height / 1.9);
  } else {
    image(redLine, 0, 0, width, height / 1.9);
  }

  // Blue line
  if (page.squareTotal > page.heartTotal && page.squareTotal > (page.sunTotal || 0)) {
    image(blueGlow, 0, 0, width, height / 2);
  } else {
    image(blueLine, 0, 0, width, height / 2);
  }

  // Yellow line
  if ((page.sunTotal || 0) > page.heartTotal && (page.sunTotal || 0) > page.squareTotal) {
    image(yellowGlow, 0, 0, width, height / 2.5);
  } else {
    image(yellowLine, 0, 0, width, height / 2.5);
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

  // Draw big suns
  for (let pos of page.bigSun) {
    image(sun, pos.x, pos.y, 150, 150);
  }
  // Draw small suns
  for (let pos of page.smallSun) {
    image(sun, pos.x, pos.y, 60, 60);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    submit(); // add input
  } else if (key === " ") {
    // cycle pages red -> blue -> yellow
    if (activeLine === "red") activeLine = "blue";
    else if (activeLine === "blue") activeLine = "yellow";
    else activeLine = "red";
  } else if (key === "C" || key === "c") {
    // Reset all
    for (let key of ["red", "blue", "yellow"]) {
      data[key].heartTotal = 0;
      data[key].squareTotal = 0;
      data[key].sunTotal = 0;
      data[key].bigHearts = [];
      data[key].smallHearts = [];
      data[key].bigDroplet = [];
      data[key].smallDroplet = [];
      data[key].bigSun = [];
      data[key].smallSun = [];
      localStorage.removeItem(`${key}_heartTotal`);
      localStorage.removeItem(`${key}_squareTotal`);
      localStorage.removeItem(`${key}_sunTotal`);
    }
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
    } else if (choice === "happy") {
      page.sunTotal = (page.sunTotal || 0) + number;
      updateSunPositions(page);
    }

    // Save to localStorage
    for (let key of ["red", "blue", "yellow"]) {
      localStorage.setItem(`${key}_heartTotal`, data[key].heartTotal);
      localStorage.setItem(`${key}_squareTotal`, data[key].squareTotal);
      localStorage.setItem(`${key}_sunTotal`, data[key].sunTotal || 0);
    }
  }

  inputText.value("");
}

function updateHeartPositions(page) {
  let bigHeartsNeeded = Math.floor(page.heartTotal / 10);
  let smallHeartsNeeded = page.heartTotal % 10;
  let margin = 40;

  while (page.bigHearts.length < bigHeartsNeeded) {
    page.bigHearts.push({ x: random(margin, width - 100 - margin), y: random(margin, height - 100 - margin) });
  }
  while (page.smallHearts.length < smallHeartsNeeded) {
    page.smallHearts.push({ x: random(margin, width - 40 - margin), y: random(margin, height - 40 - margin) });
  }
  while (page.smallHearts.length > smallHeartsNeeded) page.smallHearts.pop();
}

function updateDropletPositions(page) {
  let bigDropletNeeded = Math.floor(page.squareTotal / 10);
  let smallDropletNeeded = page.squareTotal % 10;
  let margin = 40;

  while (page.bigDroplet.length < bigDropletNeeded) {
    page.bigDroplet.push({ x: random(margin, width - 100 - margin), y: random(margin, height - 100 - margin) });
  }
  while (page.smallDroplet.length < smallDropletNeeded) {
    page.smallDroplet.push({ x: random(margin, width - 40 - margin), y: random(margin, height - 40 - margin) });
  }
  while (page.smallDroplet.length > smallDropletNeeded) page.smallDroplet.pop();
}

function updateSunPositions(page) {
  let bigSunNeeded = Math.floor((page.sunTotal || 0) / 10);
  let smallSunNeeded = (page.sunTotal || 0) % 10;
  let margin = 40;

  while (page.bigSun.length < bigSunNeeded) {
    page.bigSun.push({ x: random(margin, width - 100 - margin), y: random(margin, height - 100 - margin) });
  }
  while (page.smallSun.length < smallSunNeeded) {
    page.smallSun.push({ x: random(margin, width - 40 - margin), y: random(margin, height - 40 - margin) });
  }
  while (page.smallSun.length > smallSunNeeded) page.smallSun.pop();
}
