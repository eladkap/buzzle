class Ship{
  constructor(x, y, r){
    this.pos = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.r = r;
    this.angle = 0;
    this.rotation = 0;
    this.rockets = [];
    this.life = 100;
    this.isAccelerating = false;
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle + PI / 2);
    fill(200);
    triangle(-this.r / 2, this.r / 2, this.r / 2, this.r / 2, 0, -this.r);
    pop();
  }

  update(){
    if (this.isAccelerating){
      this.accelerate();
    }
    this.turn();
    this.pos.add(this.velocity);
    this.slowDown();
    this.checkEdges();
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

  force(a){
    var force = p5.Vector.fromAngle(this.angle + a, SHIP_ACC);
    if (this.isBoosting && this.velocity.mag() < MAX_BOOST_SPEED){
      this.velocity.add(force);
    }
    else if (this.velocity.mag() < MAX_SHIP_SPEED){
      this.velocity.add(force);
    }
  }

  setAccelerating(b){
    this.isAccelerating = b;
  }

  accelerate(){
    this.force(0);
  }

  reverse(){
    this.force(PI);
  }

  slowDown(){
    if (this.velocity.mag() > 0){
      this.velocity.mult(SHIP_FRICTION);
    }
  }

  setRotation(angle){
    this.rotation = angle;
  }

  turn(){
    this.angle += this.rotation;
  }

  rotate(angle){
    if (abs(this.rotation) < MAX_ROTATE){
      this.rotation += angle;
    }
  }

  fireRocket(){
    let v = p5.Vector.fromAngle(this.angle, SHIP_ROCKET_SPEED);
    this.rockets.push(new ShipRocket(this.pos.x, this.pos.y, SHIP_ROCKET_RADIUS, v));
  }

  collide(bubble){
    var d = dist(this.pos.x, this.pos.y, bubble.pos.x, bubble.pos.y);
    return d < this.r / 2 + bubble.r;
  }
}
