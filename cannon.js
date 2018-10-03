class Cannon{
  constructor(x, y, w){
    this.pos = createVector(x, y);
    this.w = w;
    this.speed = 0;
    this.rockets = [];
  }

  checkEdges(){
    this.pos.x = constrain(this.pos.x, 0, SCREEN_WIDTH - this.w);
  }

  move(){
    this.pos.x += this.speed;
    this.checkEdges();
  }

  accelerate(dir){
    if (abs(this.speed) < MAX_SPEED){
      this.speed += ACC_RATE * dir;
    }
  }

  slowDown(){
    if (this.speed > 0){
      this.speed -= SLOWDOWN_RATE;
    }
    else if (this.speed < 0){
      this.speed += SLOWDOWN_RATE;
    }
  }

  show(){
    let scale = 2;
    noStroke();
    fill(10, 220, 10);
    rect(this.pos.x, this.pos.y, this.w, scale * 2);
    rect(this.pos.x + 2 * scale, this.pos.y - scale, this.w - 4 * scale, scale);
    rect(this.pos.x + 4 * scale, this.pos.y - 2 * scale, this.w - 8 * scale, scale);
    ellipse((2 * this.pos.x + this.w) / 2, this.pos.y - 2 * scale, 4 * scale, 4 * scale);
  }

  fireRocket(){
    this.rockets.push(new Rocket((this.pos.x + this.w / 2), this.pos.y - 10, ROCKET_RADIUS, ROCKET_SPEED));
  }
}
