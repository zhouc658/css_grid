class PurpleSquare {
    constructor(triangleX, triangleY) {
      this.x = triangleX; // Start position at the triangle
      this.y = triangleY + random(0, 30); // Random height
      this.size = 15; // Size of the square
      this.speed = 3; // Speed of the square
      this.imgWidth = 100; // Adjust the width of the image if necessary
      this.imgHeight = 120; // Adjust the height of the image if necessary
    }
  
    move() {
      if (purpleTriangle.visible) { // Only move if the triangle is visible
        this.x -= this.speed; // Move to the left
        if (this.x < -this.size) {
          this.x = width; // Reset position to the right
          this.y = random(height); // New random vertical position
        }
      }
    }
  
    display() {
      if (purpleTriangle.visible) { // Only display if the triangle is visible
        // fill(128, 0, 128); // Purple color
        // rect(this.x, this.y, this.size, this.size); // Square shape
         image(sword, this.x, this.y, this.imgWidth, this.imgHeight); // Draw the monkey image
      }
    }
  
    hits(wukong) {
      return (
        wukong.x < this.x + this.size &&
        wukong.x + 50 > this.x &&
        wukong.y < this.y + this.size &&
        wukong.y + 50 > this.y
      );
    }
  }
  