let seconds=3;
let press=0; 
let candle;
let flame;
let lineTop;

function setup() {
  let canvas= createCanvas(600, 600);
  canvas.parent("sketch-container");
  candle = -500;
  flame = 125
  lineTop=180

}

function draw() {
  background(137, 180, 240);
  
  push();
  fill(250,random(220),0);//flicker effect
  ellipse(300,flame, 50,110); // flame
  pop();
  
  push(); //glass 
  stroke(0,0,0);
  strokeWeight(4);
  line(190,700,190,190);
  strokeWeight(4);
  line(410,700,410,190);
  strokeWeight(4);
  line(190,190,410,190);
  pop();
  
  //line for lighting fire/wick
   stroke(0,0,0);
    strokeWeight(4);
    line(300,700,300,lineTop);
  push();
  noStroke();
  rect(200, 700, 200 , candle,25); //candle body
  fill(	255, 245, 220)
  pop;
  TIME();
  
}

  function TIME(){
  textSize(45);
  textAlign(CENTER, CENTER);
  text(seconds, 290, 50);

  if (mouseIsPressed && press == 0) {
      press = 1;
  }
  if (press == 1) {//candle start melting
    candle = candle - candle / (seconds * frameRate()); 
    flame = flame - candle / (seconds * frameRate()); 
    lineTop=lineTop - candle/ (seconds * frameRate()); 
    if (frameCount % 60 == 0&& seconds > 0) { // % is called remainder in class, not divide= same idea :'(:
      seconds--;
  } else if (seconds == 0) {
    stroke(0,0,0);
    strokeWeight(4);
    line(300,700,300,580);
   text("BREAK TIME", 300,300 );
    for (let i = 0; i < 2; i++) {
    FireWork(random(width), random(height));
    }
}
  }
}
function FireWork(x,y){
  for (let i = 0; i < 10; i++) {
    stroke(255, random(255), 0);
    strokeWeight(8);
    line(x,y,x+random(-90,90), y+random(-90,90));
  }
}
