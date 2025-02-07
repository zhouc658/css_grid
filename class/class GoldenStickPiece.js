class GoldenStickPiece {
    constructor() {
      this.x = random(width-100);
      this.y = random(height - 100); // Avoid placing too close to the bottom
      this.imgWidth = 50; // Adjust the width of the image if necessary
      this.imgHeight = 90; // Adjust the height of the image if necessary
    }
  
    display() {
      // fill(0, 255, 0); // Green for stick
      // rect(this.x, this.y, 10, 30); // Stick shape
      image(goldStick, this.x, this.y, this.imgWidth, this.imgHeight);
    }
  
    isCollected(wukong) {
      return (
        wukong.x < this.x + 10 &&
        wukong.x + 50 > this.x &&
        wukong.y < this.y + 30 &&
        wukong.y + 50 > this.y
      );
    } 
  }
  
  