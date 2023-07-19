var blob;
var blobs = [];
var zoom = 1;
var date = new Date();
var endGame = false;
var checkLose = 0;
var img;
var startTime = new Date();
var endTime;
var highScore = 0;
var num = 0;
var food = [];
var on = false;

function preload() {
  img = loadImage('gameOver.jpg');
}

$(document).ready(function() {
  $("#reset").click(function() {
    if(checkLose == 2){
      blobs = [];
      blob = new Dodger(0, 0, 16);
      startTime = new Date();
      if(endGame){
        checkLose = 0;
        endGame = false;
        img.remove();
      }
    }
  });
});

function setup() {
  var canvas = createCanvas(window.innerWidth-17, window.innerHeight-245);
  blob = new Dodger(0, 0, 16);
}

function draw() {
  background(41, 52, 98);
  translate(width / 2, height / 2);
  var drawDate = new Date();
  stroke(150);
  strokeWeight(5);

  //create window boundaries
  if(blob.pos.x < -window.innerWidth/2+17){//off left of window
    blob.pos.x = blob.pos.x + 5;
  }
  if(blob.pos.x > window.innerWidth/2-17){//off right of window
    blob.pos.x = blob.pos.x - 5;
  }
  if(blob.pos.y < -275){//off top of window
    blob.pos.y = blob.pos.y + 5;
  }
  if(blob.pos.y > 275){//off bottom of window
    blob.pos.y = blob.pos.y - 5;
  }
  line(-200, 275, 200, 275);
  if(endGame != true){
    
    if(Math.round(drawDate.getTime() - date.getTime()) % 37 == 0){
      console.log("test");
      var x = draw;
      var x = random(-width, width);
      var y = random(-height, height);
      blobs.push(new enemy(x, y, 8, blob));
      var a = draw;
      var a = random(-width, width);
      var b = random(-height, height);
      // num++;
      // if(num % 10 == 0){
      //   num = 0;
      //   food.push(new food(a, b, 8));
      // }
      // for (var j = food.length - 1; j >= 0; j--){
      //   if(Dodger.eats(food[j])){
      //     // blobs = [];
      //   }
      // }
    }
    
    endTime = new Date();
    var score = Math.round((endTime.getTime() - startTime.getTime())/100);
    $("#score").html("Score: " + score);
    
    if(score >= highScore){
      highScore = score;
      $("#highScore").html("High Score: " + highScore);
    }
    
  }else{
    image(img, -275, -250);
    //How do I create and change image width and height
    // image.style.width = "";
    // image.style.height = "";
    posX = blob.pos.x;
    posY = blob.pos.y;
    blob = new Dodger(posX, posY, 8);
  }
  
  for (var i = blobs.length - 1; i >= 0; i--) {
    blobs[i].show();
    blobs[i].update();

    if (blob.death(blobs[i])) {
      blobs.splice(i, 1);
      checkLose++;
    }
    
    if (checkLose == 2) {
      endGame = true;
      i=0;
      blobs = [];
    }
  }
  
  blob.show();
  blob.update();
}
