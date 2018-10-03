class Rocket{
  constructor(x, y, r, speed){
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
    this.toDelete = false;
  }

  move(){
    this.y -= this.speed;
    if (this.y < 0){
      this.destroy();
    }
  }

  show(){
    noStroke();
    fill(240);
    ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
  }

  hits(bubble){
    var d = dist(this.x, this.y, bubble.pos.x, bubble.pos.y);
    return d < this.r + bubble.r;
  }

  destroy(){
    this.toDelete = true;
  }
}
