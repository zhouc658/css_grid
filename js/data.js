let sleepToWake=[ //time of when I slept and woke up
    ['1:10AM','10:45AM'], //friday night-sat morn/ day1
    ['11:24PM','8:30AM'], //Day2 sat night-sun
    ['10:30PM','7:33AM'], //Day3 sun night-mon
    ['1:53AM','7:43AM'], //Day4 mon night-tues
    ['11:10PM','7:35AM'],//Day5 tues night-wed
    ['10:36PM','7:26AM'],//Day6 wed night-thur
    ['10:12PM','7:25AM']//Day7 thurs night-fri
  ];
  let timeOfAlarm=[ //times when the alarm were set and went off
    ['10:40AM','10:45AM'], //Day1 sat morning
    ['8:30AM'], //Day2 sun morning
    ['7:25AM','7:33AM'], //Day 3 mon morning
    ['7:26AM','7:33AM','7:35AM','7:36AM','7:40AM','7:43AM'], //Day4 Tues morning
    ['7:26AM','7:33AM','7:35AM',], //Day5 wed morning
    ['7:22AM','7:26AM'],//Day6 thurs morning
    ['7:25AM']//Day7 fri morning
  ];
  let numOfAlarm = [2, 1, 2, 6, 3,2,1]; // num of times the alarm went off
  let colors = ['RED','Orange', 'Yellow','Green', 'blue', 'Pink','Purple']; //colors for each day
  let day = 0; //track the days, start at 0(day1)
  let BlinkCount = 0; //how many blinks have occurred
  let interval = 1500; // how long each blink (on or off) lasts (1.5 sec)
  let prevBlink = 0; // To keep track of the last blink time
  let currentBlink=0;
  let Blink=false; //identify if it is blinking or not
  
  let g=0;
  let b=0;
  let MoonAndSun=100;
  
  function setup() {
    let canvas= createCanvas(600, 600);
    canvas.parent("sketch-container");

  }
  
  function draw() {
    noStroke();
    background(0);
    drawNight();
    drawCircle();
    alarmBlinkTrack();
    alarmClock();
    timeOfSleepToWake();
    if (MoonAndSun < 480) {
      g += 0.3; // Increase green component
      b += 5;   // Increase blue component
      }
  }
  function drawNight() {
      background(0,g, b); // Set background color based on g and b
  }
  
  function drawCircle() {
      fill(255, 255, 110); // Yellow color for the circle
      circle(MoonAndSun, MoonAndSun, 190); // Draw circle
  }
  
  function alarmBlinkTrack(){
    if (day < numOfAlarm.length) {  //less than alarmCounts so that it wouldn’t be  undefined
       if(Blink){
         currentBlink=millis(); //to get the current time, useful for timing events
         if(currentBlink-prevBlink>interval){//define how much time passed since the prevBlink,if its >interval then it updates prev to the value of the current, its like letting it know when to blick again, think of the arduino code you did for midterm(servo,etc)
           prevBlink=currentBlink;
           BlinkCount++; //keep track of the number of blinks that occurs to check if the alarmCounts has been met for each day based on array
            if (BlinkCount >= numOfAlarm[day]) {//it checks if the number of blinks for the day has been reached
            BlinkCount = 0; // Reset for next day
            day++; // Move to the next day's data
            Blink = false; // Stop blinking
          } else {
            Blink = !Blink; // blinking if the #of blinks for the day hasn't been reached
          }
        }
      }else{//check if you need to blink for the day
         if(numOfAlarm[day]>0){ //it should be bigger than zero to start blinking
           Blink=true;
         }
       }
     }
  }
  
  function alarmClock(){
    if(day<colors.length&&Blink){ //same idea as alarmCounts and check if blink is true
      fill(colors[day]);//to get the color for each day based on data/array
    }else{ //if its not true then set it to black/off color
      fill(50);
    }
    rect(110, 270, 375 , 50,25);//draw blink light on alarm
    
    strokeWeight(2); 
    if(day<colors.length){ //same idea as before
      stroke(colors[day]);
    }else{
      stroke(50);
    }
    //alarm clock box
    line(100,250,500,250);//horizontal lines
    line(100,450,500,450);
    line(100,250,100,450);//vertical lines
    line(500,250,500,450);
    
    //the times for each alarm
    if(day<timeOfAlarm.length){
      textSize(60);
      text(timeOfAlarm[day][BlinkCount],190,400); //so day gets the specific day in the timeOfAlarm, and then BlinkCount get the specific times in that specific day
    }
  }
  
  function timeOfSleepToWake(){
      
    if(day<sleepToWake.length){//showing the time
      noStroke();
      textSize(20);
      fill(255);
      text("Sleeping to Wake Time: "+ sleepToWake[day][0]+" - "+sleepToWake[day][1], 110,210); //to get the sleep[0] to wake up time we put in the array [1]
    }
  }
  