function enemy(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0, 0);
  
  this.show = function() {
    fill(105);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };
}
