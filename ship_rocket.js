class ShipRocket{
  constructor(x, y, r, velocity){
    this.pos = createVector(x, y);
    this.r = r;
    this.velocity = velocity;
    this.toDelete = false;
  }

  show(){
    fill(230);
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
  }

  update(){
    this.pos.add(this.velocity);
    this.checkEdges();
  }

  checkEdges(){
    if (this.pos.y > height){
      this.destroy();
    }
    if (this.pos.y < 0){
      this.destroy();
    }
    if (this.pos.x > width){
      this.destroy();
    }
    if (this.pos.x < 0){
      this.destroy();
    }
  }

  hits(asteroid){
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < this.r + asteroid.r;
  }

  destroy(){
    this.toDelete = true;
  }
}
