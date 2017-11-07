var sketch1 = function( p ) {
  p.setup = function() {
    p.createCanvas(600, 600);
  };
  
  p.draw = function() {
    p.background(200);
    p.translate(p.width/2.0,p.width/2.0);
    p.fill(255,120,65);
    p.rect(-100,-100,100,100);
  };
};

var myp5_1 = new p5(sketch1, 'proyect');