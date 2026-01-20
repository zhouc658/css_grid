let capture;
let modelURL = "https://teachablemachine.withgoogle.com/models/AKs9-5z8B/"
let classifier;
let label = "...";

let sceneVideoStar, sceneVideoDog, sceneVideoPair;
let videoPlayingStar = false;
let videoFinishedStar = false;
let videoPlayingDog = false;
let videoFinishedDog = false;
let videoPlayingPair = false;
let videoFinishedPair = false;

let detectionBuffer = [];
let bufferSize = 15;
let requiredDetections = 10;

let videoBuffer;
let maskGraphics;

function preload() {
  classifier = ml5.imageClassifier(modelURL);
}

function setup() {
  createCanvas(1450, 815);

  navigator.mediaDevices.enumerateDevices().then(devices => {
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    console.log('Available video devices:', videoDevices);

    // Try to find Logitech webcam
    let logitechCam = videoDevices.find(d => d.label.toLowerCase().includes('logitech'));

    let constraints = {
      video: {
        deviceId: logitechCam ? { exact: logitechCam.deviceId } : undefined,
        width: 1450,
        height: 815
      }
    };

    // webcam capture
    capture = createCapture(constraints, () => {
      console.log('Capture started');
      loadSceneVideos(); // Start app logic after webcam is ready
    });

    capture.size(1450, 815);
    capture.hide();
  });
}

function loadSceneVideos() {
  // Load videos
  sceneVideoStar = createVideo(['../asset/coreFinal/bun.MP4']);
  sceneVideoStar.hide();
  sceneVideoStar.onended(() => {
    videoPlayingStar = false;
    videoFinishedStar = true;
  });

  sceneVideoDog = createVideo(['../asset/coreFinal/dog.MP4']);
  sceneVideoDog.hide();
  sceneVideoDog.onended(() => {
    videoPlayingDog = false;
    videoFinishedDog = true;
  });

  sceneVideoPair = createVideo(['../asset/coreFinal/pair.MP4']);
  sceneVideoPair.hide();
  sceneVideoPair.onended(() => {
    videoPlayingPair = false;
    videoFinishedPair = true;
  });

  // Initialize classifier safely
  classifier = ml5.imageClassifier(modelURL, () => {
    console.log("Model loaded");
    classifyVideo();
  });
}

function draw() {
  background(0);

  // Keep detection working
  if (capture) {
    image(capture, -9999, -9999, 1, 1);
  }

  let currentVideo = null;
  if (videoPlayingStar) currentVideo = sceneVideoStar;
  else if (videoPlayingDog) currentVideo = sceneVideoDog;
  else if (videoPlayingPair) currentVideo = sceneVideoPair;

  if (!videoPlayingStar && !videoPlayingDog && !videoPlayingPair) {
    fill(255);
    noStroke();
    ellipse(width / 2, height / 2, 680, 680);
  } else if (currentVideo) {
    imageMode(CENTER);
    image(currentVideo, width / 2, height / 2, 680, 680)
  }

  // Display label
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height - 30);

  // Count detections
  let starCount = detectionBuffer.filter(val => val === "bun").length;
  let dogCount = detectionBuffer.filter(val => val === "dog").length;
  let pairCount = detectionBuffer.filter(val => val === "pair").length;


  // STAR logic
  if (starCount >= requiredDetections && !videoPlayingStar && !videoFinishedStar && !videoPlayingDog) {
    videoPlayingStar = true;
    sceneVideoStar.play();
  }
  if (starCount < requiredDetections && videoFinishedStar) {
    videoFinishedStar = false;
  }


  // DOG logic
  if (dogCount >= requiredDetections && !videoPlayingDog && !videoFinishedDog && !videoPlayingStar) {
    videoPlayingDog = true;
    sceneVideoDog.play();
  }
  if (dogCount < requiredDetections && videoFinishedDog) {
    videoFinishedDog = false;
  }


  // CAT logic
  if (pairCount >= requiredDetections && !videoPlayingPair && !videoFinishedPair && !videoPlayingStar && !videoPlayingDog) {
    videoPlayingPair = true;
    sceneVideoPair.play();
  }
  if (pairCount < requiredDetections && videoFinishedPair) {
    videoFinishedPair = false;
  }
}




function classifyVideo() {
  if (capture) {
    classifier.classify(capture, getResults);
  }
}




function getResults(results, error) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);








  let currentLabel = "none";




  if (results && results[0]) {
    let topResult = results[0];




    if (topResult.confidence < 0.7) {
      currentLabel = "none";
    } else if (topResult.label === "bun" || topResult.label === "dog" || topResult.label === "pair") {
      currentLabel = topResult.label;
    }
  }




  label = currentLabel;




  detectionBuffer.push(currentLabel);
  if (detectionBuffer.length > bufferSize) {
    detectionBuffer.shift();
  }




  classifyVideo();
}

