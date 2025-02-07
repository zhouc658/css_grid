class HugeGreenCircle {
    constructor() {
      this.x = purpleTriangle.x; // Position above the purple triangle
      this.y = 50; // Start high above the canvas
      this.size = 100; // Size of the huge circle
      this.isFalling = true; // Control the falling animation
      this.imgWidth = 150; // Adjust the width of the image if necessary
      this.imgHeight = 160; // Adjust the height of the image if necessary
    }
  
    update() {
      if (this.isFalling) {
        this.y += 5; // Move downwards
        if (this.y > height / 2) {
          this.isFalling = false; // Stop falling after reaching mid-height
        }
      }
  
      // Check collision with the purple triangle
      if (
        this.x < purpleTriangle.x + purpleTriangle.size &&
        this.x + this.size > purpleTriangle.x &&
        this.y < purpleTriangle.y + purpleTriangle.size &&
        this.y + this.size > purpleTriangle.y
      ) {
        purpleTriangle.hide(); // Hide the triangle upon collision
      }
    }
  
    display() {
      // fill(0, 255, 0); // Green color
      // ellipse(this.x, this.y, this.size); // Display the huge green circle
      image(goldStick, this.x, this.y, this.imgWidth, this.imgHeight);
    }
  }
  