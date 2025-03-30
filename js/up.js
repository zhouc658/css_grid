let capture;
let tracker;
let positions; 
let mouth;
let sceneState = 0;
let previousX = 0;
function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch");    
  
  capture = createCapture(VIDEO, {flipped: true});
  capture.size(width, height);
  capture.hide();
  tracker = new clm.tracker(); // Creates a new tracker object
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  background(220);
  
  image(capture, 0, 0, width, height);
  positions = tracker.getCurrentPosition();
  
  if (positions && positions.length > 62) {
    // Get the X-coordinate of point 62
   // Get the X and Y coordinates of point 62
    let point62X = positions[33][0];
    let point62Y = positions[33][1];

    // Check if point 62 passes a certain X threshold (e.g., halfway across the screen)
    if (point62X < width / 2 && previousX >= width / 2) {
      // Point 62 crosses to the left, change to scene 1 (mask1)
      sceneState = 1;
    }
    // Check if point 62 crosses to the right (changes back to scene 0)
if (point62X >= width / 2 && previousX < width / 2 && sceneState === 1) {
  sceneState = 0; // Change back to scene 0
}
    // Check if point 62 passes a certain Y threshold (e.g., halfway down the screen)
    if ((point62Y < height / 2 && previousY >= height / 2)) {
      // Point 62 crosses up, change to scene 2 (mask2)
      sceneState = 2;
    }

    // Update the previous positions for the next frame
    previousX = point62X;
    previousY = point62Y;
  }

  switch (sceneState) {
    case 0:
      mask1();
    break;
    case 1:
      mask2();
    break;
    case 2:
      mask3();
    break;
  }
  
}
function mousePressed() {
  // Toggle sceneState between 0 and 1
  sceneState = (sceneState + 1) % 3;
}

function mask1(){
if (positions) {
    
    noStroke();
    fill(255,0,0);
    let eyebrowPoints = [0,19, 20, 21, 22, 18,17,16,15,14];
    beginShape();
    for (let i = 0; i < eyebrowPoints.length; i++) {
      let eyebrowIndex = eyebrowPoints[i];
      vertex(positions[eyebrowIndex][0], positions[eyebrowIndex][1]);
    }
    // Adding extra points above the eyebrows to create a forehead region
    let foreheadHeight = 100; // Adjust this value to control the height of the forehead
    for (let i = eyebrowPoints.length - 1; i >= 0; i--) {
      let eyebrowIndex = eyebrowPoints[i];
      let x = positions[eyebrowIndex][0];
      let y = positions[eyebrowIndex][1] - foreheadHeight; // Move upwards for forehead
      vertex(x, y);
    }
    endShape(CLOSE);
    
    noStroke();
    let face= [4,35,36, 42, 37, 43, 38, 39, 10, 11, 12, 13, 14, 15, 16, 17, 18, 22, 21, 20, 19,0];
    beginShape(); 
    for (let i = 0; i < face.length; i++) {
      let faceIndex = face[i];
      vertex(positions[faceIndex][0], positions[faceIndex][1]);
    }
    endShape(CLOSE);
    
    fill(0);
    let topLip = [4, 35,36,42, 37, 43, 38,39, 10, 9, 8, 7, 6, 5];
    beginShape(); 
    for (let i = 0; i < topLip.length; i++) {
      let topLipIndex = topLip[i];
      vertex(positions[topLipIndex][0], positions[topLipIndex][1]);
    }
    endShape(CLOSE);
  
    
    fill(255,255,255)
    let leftWhiteEye=[0, 19, 20, 21, 22, 34, 35, 1];
    beginShape(); 
    for (let i = 0; i < leftWhiteEye.length; i++) {
      let leftWhiteEyeIndex = leftWhiteEye[i];
      vertex(positions[leftWhiteEyeIndex][0], positions[leftWhiteEyeIndex][1]);
    }
    endShape(CLOSE);
    
    fill(255,255,255)
    let rightWhiteEye=[39, 13, 14, 15, 16, 17, 18, 40];
    beginShape(); 
    for (let i = 0; i < rightWhiteEye.length; i++) {
      let rightWhiteEyeIndex = rightWhiteEye[i];
      vertex(positions[rightWhiteEyeIndex][0], positions[rightWhiteEyeIndex][1]);
    }
    endShape(CLOSE);
    
    fill(0);
    let rightEye= [30, 69, 31, 70, 14, 15, 29, 68];
    beginShape(); 
    for (let i = 0; i < rightEye.length; i++) {
      let rightEyeIndex = rightEye[i];
      vertex(positions[rightEyeIndex][0], positions[rightEyeIndex][1]);
    }
    endShape(CLOSE);
    
    fill(0);
    let leftEye= [25, 65, 26, 0, 19, 63, 24, 64, 25];
    beginShape(); 
    for (let i = 0; i < leftEye.length; i++) {
      let leftEyeIndex = leftEye[i];
      vertex(positions[leftEyeIndex][0], positions[leftEyeIndex][1]);
    }
    endShape(CLOSE);
    // fill(255,255,255);
    // let LEyeBall= [24, 27, 26];
    // beginShape(); 
    // for (let i = 0; i < LEyeBall.length; i++) {
    //   let LEyeBallIndex = LEyeBall[i];
    //   vertex(positions[LEyeBallIndex][0], positions[LEyeBallIndex][1]);
    // }
    // endShape(CLOSE);
    fill(255,255,255);
    let whiteChin=[5, 44, 55, 54, 53,52, 51, 50, 9, 8,7,6];
    beginShape(); 
    for (let i = 0; i < whiteChin.length; i++) {
      let whiteChinIndex = whiteChin[i];
      vertex(positions[whiteChinIndex][0], positions[whiteChinIndex][1]);
    }
    endShape(CLOSE);
    
    fill(255,255,255);
    let mouth=[44, 61, 60, 59, 50, 58, 57, 56];
    beginShape(); 
    for (let i = 0; i < mouth.length; i++) {
      let mouthIndex = mouth[i];
      vertex(positions[mouthIndex][0], positions[mouthIndex][1]);
    }
    endShape(CLOSE);
    
    fill(255, 0, 0);
    let bottomLip = [50, 51, 52, 53, 54, 55, 44, 56, 57, 58];
    beginShape(); 
    for (let i = 0; i < bottomLip.length; i++) {
      let bottomLipIndex = bottomLip[i];
      vertex(positions[bottomLipIndex][0], positions[bottomLipIndex][1]);
    }
    endShape(CLOSE);
    
  }
  
  // Drawing the points for each position on the face
  for (let i = 0; i < positions.length; i++) {
    // ellipse(positions[i][0], positions[i][1], 4);
    // text(i, positions[i][0], positions[i][1]); // to show the numbers for each point
  }
}

function mask2(){
  if (positions){
    
    noStroke();
    fill(255, 140, 0);
    let eyebrowPoints = [0,19, 20, 21, 22, 18,17,16,15,14];
    beginShape();
    for (let i = 0; i < eyebrowPoints.length; i++) {
      let eyebrowIndex = eyebrowPoints[i];
      vertex(positions[eyebrowIndex][0], positions[eyebrowIndex][1]);
    }
    // Adding extra points above the eyebrows to create a forehead region
    
    let foreheadHeight = 100; // Adjust this value to control the height of the forehead
    for (let i = eyebrowPoints.length - 1; i >= 0; i--) {
      let eyebrowIndex = eyebrowPoints[i];
      let x = positions[eyebrowIndex][0];
      let y = positions[eyebrowIndex][1] - foreheadHeight; // Move upwards for forehead
      vertex(x, y);
    }
    endShape(CLOSE);
    
    noStroke();
    fill(255, 140, 0);
    let face= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,22,21,20,19];
    beginShape();
    for (let i = 0; i < face.length; i++) {
      let faceIndex = face[i];
      vertex(positions[faceIndex][0], positions[faceIndex][1]);
    }
    endShape(CLOSE);
    
    fill(255, 182, 193);
    let heartFace=[0, 19, 20,21,22, 33, 18,17,16,15,14,7];
    beginShape(); 
    for (let i = 0; i < heartFace.length; i++) {
      let heartFaceIndex = heartFace[i];
      vertex(positions[heartFaceIndex][0], positions[heartFaceIndex][1]);
    }
    endShape(CLOSE);
    
    fill(255, 128, 120);
    let heart=[0,19,20,21,22,33,18,17,16,15,14,38,37,36];
     beginShape(); 
    for (let i = 0; i < heart.length; i++) {
      let heartIndex = heart[i];
      vertex(positions[heartIndex][0], positions[heartIndex][1]);
    }
    endShape(CLOSE);
    
    fill(255,0,0);
    let upperMouth=[44,45,46, 47,48,49,50,59,60,61];
    beginShape(); 
    for (let i = 0; i < upperMouth.length; i++) {
      let upperMouthIndex = upperMouth[i];
      vertex(positions[upperMouthIndex][0], positions[upperMouthIndex][1]);
    }
    endShape(CLOSE);
    
    fill(255,0,0);
    let lowerMouth=[44,56, 57, 58 ,50, 51, 52, 53, 54, 55];
    beginShape(); 
    for (let i = 0; i < lowerMouth.length; i++) {
      let lowerMouthIndex = lowerMouth[i];
      vertex(positions[lowerMouthIndex][0], positions[lowerMouthIndex][1]);
    }
    endShape(CLOSE);
    
    stroke(255,0,0); // Set stroke color to black (or whatever you prefer)
    strokeWeight(3);
    let rightEye= [30,68,29,67,28,70,31,69];
    beginShape(); 
    for (let i = 0; i < rightEye.length; i++) {
      let rightEyeIndex = rightEye[i];
      vertex(positions[rightEyeIndex][0], positions[rightEyeIndex][1]);
    }
    endShape(CLOSE);
    
     
    fill(255);
    let rightwhite= [30,68,29,67,28,70,31,69];
    beginShape(); 
    for (let i = 0; i < rightwhite.length; i++) {
      let rightwhiteIndex = rightwhite[i];
      vertex(positions[rightwhiteIndex][0], positions[rightwhiteIndex][1]);
    }
    endShape(CLOSE);
    
    fill(255);
    let leftwhite= [23, 63, 24, 64, 25, 65, 26, 66];
    beginShape(); 
    for (let i = 0; i < leftwhite.length; i++) {
      let leftwhiteIndex = leftwhite[i];
      vertex(positions[leftwhiteIndex][0], positions[leftwhiteIndex][1]);
    }
    endShape(CLOSE);
    
    stroke(255,0,0); 
    strokeWeight(3);
    let leftEye= [23, 63, 24, 64, 25, 65, 26, 66];
    beginShape(); 
    for (let i = 0; i < leftEye.length; i++) {
      let leftEyeIndex = leftEye[i];
      vertex(positions[leftEyeIndex][0], positions[leftEyeIndex][1]);
    }
    endShape(CLOSE);
    
    fill(0);
    stroke(0); 
    strokeWeight(2);
    let leftBrow= [19,20,21,22,33];
    beginShape(); 
    for (let i = 0; i < leftBrow.length; i++) {
      let leftBrowIndex = leftBrow[i];
      vertex(positions[leftBrowIndex][0], positions[leftBrowIndex][1]);
    }
    endShape(CLOSE);

    fill(0);
    stroke(0); 
    strokeWeight(2);
    let rightBrow= [33,18,17,16,15];
    beginShape(); 
    for (let i = 0; i < rightBrow.length; i++) {
      let rightBrowIndex = rightBrow[i];
      vertex(positions[rightBrowIndex][0], positions[rightBrowIndex][1]);
    }
    endShape(CLOSE);
    
    stroke(0);
    strokeWeight(15);
    let leftpupil= [27];
    beginShape(); 
    for (let i = 0; i < leftpupil.length; i++) {
      let leftpupilIndex = leftpupil[i];
      vertex(positions[leftpupilIndex][0], positions[leftpupilIndex][1]);
    }
    endShape(CLOSE);
    
    stroke(0);
    strokeWeight(15);
    let rightPupil= [32];
    beginShape(); 
    for (let i = 0; i < rightPupil.length; i++) {
      let rightPupilIndex = rightPupil[i];
      vertex(positions[rightPupilIndex][0], positions[rightPupilIndex][1]);
    }
    endShape(CLOSE);

    stroke(0);
    strokeWeight(3);
    let leftNose=[42,37];
    beginShape(); 
    for (let i = 0; i < leftNose.length; i++) {
      let leftNoseIndex = leftNose[i];
      vertex(positions[leftNoseIndex][0], positions[leftNoseIndex][1]);
    }
    endShape(CLOSE);
    
    stroke(0);
    strokeWeight(3);
    let rightNose=[37,43];
    beginShape(); 
    for (let i = 0; i < rightNose.length; i++) {
      let rightNoseIndex = rightNose[i];
      vertex(positions[rightNoseIndex][0], positions[rightNoseIndex][1]);
    }
    endShape(CLOSE);
  }
}

function mask3() {
  if (positions) {
    noStroke();
    
    let keroLEar = [19];  
    fill(255, 240, 128);  
    beginShape(); 
    for (let i = 0; i < keroLEar.length; i++) {
      let keroLEarIndex = keroLEar[i];
      let x = positions[keroLEarIndex][0]; // x-coordinate
      let y = positions[keroLEarIndex][1]; // y-coordinate
      ellipse(x, y, 150, 230);  
    }
    
    endShape(CLOSE);
     let keroLEarInside = [19];  
    fill(255, 220, 85);  
    beginShape(); 
    for (let i = 0; i < keroLEarInside.length; i++) {
      let keroLEarInsideIndex = keroLEarInside[i];
      let x = positions[keroLEarInsideIndex][0]; 
      let y = positions[keroLEarInsideIndex][1]; 
      ellipse(x, y, 100, 200);  
    }
    endShape(CLOSE);
    
    let keroREar = [15];  
    fill(255, 240, 128);  
    beginShape(); 
    for (let i = 0; i < keroREar.length; i++) {
      let keroREarIndex = keroREar[i];
      let x = positions[keroREarIndex][0]; 
      let y = positions[keroREarIndex][1]; 
      ellipse(x, y, 150, 230); 
    }
    endShape(CLOSE);
    
    let keroREarInside = [15];  
    fill(255, 220, 85);  
    beginShape(); 
    for (let i = 0; i < keroREarInside.length; i++) {
      let keroREarInsideIndex = keroREarInside[i];
      let x = positions[keroREarInsideIndex][0]; 
      let y = positions[keroREarInsideIndex][1]; 
      ellipse(x, y, 100, 200);  
    }
    endShape(CLOSE);
    
    let keroFace = [41];  
    fill(255, 240, 128);  
    beginShape(); 
    for (let i = 0; i < keroFace.length; i++) {
      let keroFaceIndex = keroFace[i];
      let x = positions[keroFaceIndex][0]; 
      let y = positions[keroFaceIndex][1]; 
      ellipse(x, y, 210, 270);  
    }
    endShape(CLOSE);
    
    let keroREye = [28];  
    fill(101, 67, 33); 
    beginShape(); 
    for (let i = 0; i < keroREye.length; i++) {
      let keroREyeIndex = keroREye[i];
      let x = positions[keroREyeIndex][0]; 
      let y = positions[keroREyeIndex][1]; 
      ellipse(x, y, 25, 25);  
    }
    endShape(CLOSE);
    
    let keroLEye = [23];  
    fill(101, 67, 33);  
    beginShape(); 
    for (let i = 0; i < keroLEye.length; i++) {
      let keroLEyeIndex = keroLEye[i];
      let x = positions[keroLEyeIndex][0];
      let y = positions[keroLEyeIndex][1]; 
      ellipse(x, y, 25, 25);  
    }
    endShape(CLOSE);
    
    let keroNose = [62];  
    fill(0);  
    beginShape(); 
    for (let i = 0; i < keroNose.length; i++) {
      let keroNoseIndex = keroNose[i];
      let x = positions[keroNoseIndex][0]; 
      let y = positions[keroNoseIndex][1]; 
      ellipse(x, y, 20, 12);  
    }
    endShape(CLOSE);

    let keroMouth = [35, 42]; 
    stroke(0);
    beginShape(); 
    for (let i = 0; i < keroMouth.length; i++) {
      let keroMouthIndex = keroMouth[i];
      vertex(positions[keroMouthIndex][0], positions[keroMouthIndex][1]);
    }
    endShape(CLOSE);
    let keroM = [42,62];  
    stroke(0);
    beginShape(); 
    for (let i = 0; i < keroM.length; i++) {
      let keroMIndex = keroM[i];
      vertex(positions[keroMIndex][0], positions[keroMIndex][1]);
    }
    endShape(CLOSE);
    
    let kerom = [62,43];  
    stroke(0);
    beginShape(); 
    for (let i = 0; i < kerom.length; i++) {
      let keromIndex = kerom[i];
      vertex(positions[keromIndex][0], positions[keromIndex][1]);
    }
    endShape(CLOSE);
      
    let mo = [43,39];  
    stroke(0);
    strokeWeight(3);
    beginShape(); 
    for (let i = 0; i < mo.length; i++) {
      let moIndex = mo[i];
      vertex(positions[moIndex][0], positions[moIndex][1]);
    }
    endShape(CLOSE);
    
    let openMouth = [62, 42, 61, 56, 53, 58, 59, 43];  
    fill(255, 182, 193)
    beginShape(); 
    for (let i = 0; i < openMouth.length; i++) {
      let openMouthIndex = openMouth[i];
      vertex(positions[openMouthIndex][0], positions[openMouthIndex][1]);
    }
    endShape(CLOSE);
  }
}
