class Bubble{
  constructor(x, y, r, col, contentType, text, velocity, img, movement, bubbleVisible){
    this.pos = createVector(x, y);
    this.r = r;
    this.col = col;
    this.velocity = velocity;
    this.contentType = contentType;
    this.text = text;
    this.img = img;
    // this.life = 100;
    this.toDelete = false;
    this.movement = movement;
    this.bubbleVisible = bubbleVisible;
  }

  show(){
    if (this.bubbleVisible){
      strokeWeight(0.5);
      stroke(240);
      noFill();
      ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
    }
    if (this.contentType == 'img'){
      image(this.img, this.pos.x - 0.5 * this.r, this.pos.y - 0.5 * this.r, this.r, this.r);
    }
    else{
      textAlign(CENTER);
  		textStyle(NORMAL);
  		textSize(12);
  		textFont('Arial');
  		strokeWeight(0.5);
  		fill(100, 200, 10);
  		text(this.text, this.pos.x, this.pos.y);
    }
  }

  update(){
    this.pos.add(this.velocity);
    if (self.movement == 1){
      if (this.pos.y > height + this.r){
        this.toDelete = true;
      }
    }
    else if ([2, 3].includes(this.movement)){
      this.checkEdges();
    }
  }

  checkEdges(){
    if (this.pos.y > height){
      this.pos.y = 0;
    }
    if (this.pos.y < 0){
      this.pos.y = height;
    }
    if (this.pos.x > width){
      this.pos.x = 0;
    }
    if (this.pos.x < 0){
      this.pos.x = width;
    }
  }

  getHit(){
    this.life = 0;
  }

  isClicked(){
    return dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.r;
  }
}
