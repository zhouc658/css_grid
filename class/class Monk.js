class Monk {
    constructor() {
      this.x = 130; // Position beside the mountain
      this.y = 500;
      this.isDragging = false;
      this.reachedScroll = false; // Track if the monk reached the scroll
      this.imgWidth = 115; // Adjust the width of the image if necessary
      this.imgHeight = 100; // Adjust the height of the image if necessary
    }
  
    display() {
      // fill(255, 0, 0); // Red for Tang SanZang
      // rect(this.x, this.y, 50, 50); // Monk shape
       image(monkImg, this.x, this.y, this.imgWidth, this.imgHeight); 
    }
  }
  