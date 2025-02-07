class WuKong {
    constructor() {
      this.x = 300; // Start position
      this.y = 480; // Position below the mountain
      this.vx = 0; // Velocity in the x direction
      this.vy = 0; // Velocity in the y direction
      this.imgWidth = 100; // Adjust the width of the image if necessary
      this.imgHeight = 120; // Adjust the height of the image if necessary
    }
  
    display() {
      // Display the monkey image instead of a circle
      image(monkeyImg, this.x, this.y, this.imgWidth, this.imgHeight); // Draw the monkey image
    }
  }