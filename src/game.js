// import Level from "./level";

let ctx = document.getElementById("ctx").getContext("2d");
let charlieOne = new Image();
let charlieTwo = new Image();
let charlieThree = new Image();
let charlieFour = new Image();
let background = new Image();
let drown = new Image();
let tile = new Image();
let cookie = new Image();

let score = 0;
let level = 100;
let animation = 0;
let cookieTimer = 0;
let gameOver = false;
let intervalVar;
let cookieList = [];
let tileList = [];
let cookieDrop = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650];

let tileObject = {
  "width": 50, 
  "height": 50
};

let cookieObject = {
  "width": 30, 
  "height": 25, 
  "speed": 3
}

let player = {
  "x": 100, 
  "y": 350, 
  "width": 30, 
  "height": 50, 
  "jump": 0,
  "inAir": false, 
  "jumpUnit": 5, 
  "speed": 0, 
  "leftPressed": false, 
  "rightPressed": false, 
  "gravity": 10, 
  "safe": true
};

background.onload = function() {
  drown.onload = function() {
    charlieOne.onload = function() {
      charlieTwo.onload = function() {
        charlieThree.onload = function() {
          charlieFour.onload = function() {
            cookie.onload = function() {
              tile.onload = function() {

                drawObject = function(object, x, y, width, height) {
                  ctx.drawImage(object, x, y, width, height);
                }

                document.onkeydown = function(event) {
                  if (event.keyCode === 37 && player.x > 0) {
                    player.speed = -5;
                    player.leftPressed = true;
                  } 
                  if (event.keyCode === 39 && player.x < 700 - player.width) {
                    player.speed = 5;
                    player.rightPressed = true;
                  }
                  if (event.keyCode === 38 && !player.inAir && player.y === 350) {
                    player.jump = 100;
                    player.inAir = true;
                  }
                }
                
                document.onkeyup = function(event) {
                  if (event.keyCode === 37) {
                    player.leftPressed = false;
                  } 
                  if (event.keyCode === 39) {
                    player.rightPressed = false;
                  }
                }

                jump = function() {
                  if (player.jump > 0 && player.inAir) {
                    player.y -= player.jumpUnit;
                    player.jump -= player.jumpUnit;
                  }
                  if (player.jump <= 0 && player.jump > -100 && player.inAir) {
                    player.y += player.jumpUnit;
                    player.jump -= player.jumpUnit;
                  }
                  if (player.jump <= -100 && player.inAir) {
                    player.inAir = false;
                  }
                }

                updatePlayerPosition = function() {
                  if (player.leftPressed && player.x > 0) {
                    player.x += player.speed;
                  }
                  if (player.rightPressed && player.x < 700 - player.width) {
                    player.x += player.speed;
                  }
                }

                updatePosition = function() {
                  ctx.clearRect(0, 0, 700, 500);
                  drawObject(background, 0, 0, 700, 500);
                  cookieTimer++;
                  if (cookieTimer > 100) {
                    cookieList.push({"x": cookieDrop[Math.round(Math.random() * 13)], y: 0});
                    cookieTimer = 0;
                  }
                  if (player.inAir) {
                    drawObject(charlieFour, player.x, player.y, player.width, player.height);
                  }
                  else if (animation === 0) {
                    drawObject(charlieOne, player.x, player.y, player.width, player.height);
                    animation = 1;
                  } else {
                    drawObject(charlieTwo, player.x, player.y, player.width, player.height);
                    animation = 0;
                  }

                  for (var i in cookieList) {
                    drawObject(cookie, cookieList[i].x, cookieList[i].y, cookieObject.width, cookieObject.height);
                  }

                  for (var i =0; i < tileList.length; i++) {
                    drawObject(tile, tileList[i].x, tileList[i].y, tileObject.width, tileObject.height);
                  }
                  updatePlayerPosition();
                  jump();
                }

                startGame = function() {
                  score = 0;
                  level = 100;
                  player.x = 100;
                  player.y = 350;
                  player.inAir = false;
                  player.leftPressed = false;
                  player.rightPressed = false;
                  player.safe = true;
                  animation = 0;
                  cookieTimer = 0;
                  gameOver = false;
                  tileList = [];
                  cookieList = [];

                  for (var i = 0; i <= 13; i++) {
                    tileList.push({"x": i * 50, "y": 400})
                  }

                  intervalVar = setInterval(updatePosition, 10);

                }
                startGame();
              };
              tile.src = "assets/images/rocky02.png";
            };
            cookie.src = "assets/images/cookie.png";
          };
          charlieFour.src = "assets/images/charlie/jump2.png";
        };
        charlieThree.src = "assets/images/charlie/jump1.png";
      };
      charlieTwo.src = "assets/images/charlie/walk2.png";
    };
    charlieOne.src = "assets/images/charlie/walk1.png";
  };
  drown.src = "assets/images/water/water_full_1.png";
};
background.src = "assets/images/background.png";

// export default class CookieRun {
//   constructor(canvas) {
//   }
// }