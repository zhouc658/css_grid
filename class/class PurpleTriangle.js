class PurpleTriangle { //demon
    constructor() {
      this.x = 500; // Position on the right side
      this.y = height / 2; // Centered vertically
      this.size = 50; // Size of the triangle
      this.visible = true; // Control visibility
      this.imgWidth = 100; // Adjust the width of the image if necessary
      this.imgHeight = 120; // Adjust the height of the image if necessary
    }
  
    display() {
      if (this.visible) {
        // fill(128, 0, 128); // Purple color
        // triangle(this.x, this.y, this.x, this.y + this.size, this.x + this.size, this.y + this.size / 2); // Triangle shape
        image(demon, this.x, this.y, this.imgWidth, this.imgHeight); 
        this.throwSquares(); // Throw squares
      }
    }
  
    hide() {
      this.visible = false; // Method to hide the triangle
    }
  
    throwSquares() {
      // Implement throwing squares logic here
    }
  }
  