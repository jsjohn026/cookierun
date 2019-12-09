// import Level from "./level";

let ctx = document.getElementById("ctx").getContext("2d");
let charlieOne = new Image();
let charlieTwo = new Image();
let charlieThree = new Image();
let charlieFour = new Image();
let background = new Image();
let splash = new Image();
let tile = new Image();
let cookie = new Image();
let seawater = new Image();
let clouds = new Image();

let score = 0;
let level = 100;
let animation = 0;
let cookieTimer = 0;
let gameover = false;
let paused;
let intervalVar;
let cookieList = [];
let tileList = [];
let cookieDrop = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650];

let tileObject = {
  "width": 50, 
  "height": 50
};

let cookieObject = {
  "width": 35, 
  "height": 30, 
  "speed": 3
}

let player = {
  "x": 100, 
  "y": 340, 
  "width": 40, 
  "height": 60, 
  "jump": 0,
  "inAir": false, 
  "jumpUnit": 5, 
  "speed": 0, 
  "leftPressed": false, 
  "rightPressed": false, 
  "gravity": 10, 
  "safe": true
};

sound = function(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
  }
}

let backgroundMusic = new sound("assets/sound/background_music.mp3");
let eatingSound = new sound("assets/sound/crunch.mp3");
let fallingSound = new sound("assets/sound/fall.mp3");

background.onload = function() {
  splash.onload = function() {
    charlieOne.onload = function() {
      charlieTwo.onload = function() {
        charlieThree.onload = function() {
          charlieFour.onload = function() {
            cookie.onload = function() {
              tile.onload = function() {
                seawater.onload = function() {
                  clouds.onload = function() {

                    ctx.drawImage(background, 0, 0, 700, 500);
                    ctx.strokeStyle = "#FFFFFF";
                    ctx.font = "30px Arial";
                    ctx.strokeText("Eat as many cookies as you can before they destroy you!", 100, 250);
                    ctx.strokeStyle = "#FFFFFF";
                    ctx.font = "30px Arial";
                    ctx.strokeText("Use Space to pause and Arrow keys to move.", 100, 250);
                    ctx.strokeText("Click here to start playing Cookie Run!", 100, 250);

                    drawObject = function(object, x, y, width, height) {
                      ctx.drawImage(object, x, y, width, height);
                    }

                    document.getElementById("ctx").onmousedown = function() {
                      if (!gameover) {
                        clearInterval(intervalVar);
                      }
                      startGame();
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
                      if (event.keyCode === 38 && !player.inAir && player.y === 340) {
                        player.jump = 100;
                        player.inAir = true;
                      }
                      if (event.keyCode === 32) {
                        if (paused) {
                          paused = false;
                        } else {
                          paused = true;
                        }
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

                    cookiePlayerCollision = function(cookie) {
                      return (
                        (cookie.x < player.x + player.width) &&
                        (player.x < cookie.x + cookieObject.width) &&
                        (cookie.y < player.y + player.height) &&
                        (player.y < cookie.y + cookieObject.height)
                      );
                    }

                    cookieTileCollision = function(cookie, tile) {
                      return (
                        (cookie.x < tile.x + tileObject.width) &&
                        (tile.x < cookie.x + cookieObject.width) &&
                        (cookie.y < tile.y + tileObject.height) &&
                        (tile.y < cookie.y + cookieObject.height)
                      );
                    }

                    playerTileCollision = function(tile) {
                      return (
                        (player.x <= tile.x + tileObject.width) &&
                        (tile.x <= player.x + player.width) &&
                        (player.y + player.height <= tile.y)
                      );
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

                    updateCookiePosition = function() {
                      for (var i in cookieList) {
                        if (cookieList[i].y > 500) {
                          cookieList.splice(i, 1);
                        } else {
                          cookieList[i].y += cookieObject.speed;
                        }
                      }
                    }

                    updatePlayerPosition = function() {
                      if (player.leftPressed && player.x > 0) {
                        player.x += player.speed;
                      }
                      if (player.rightPressed && player.x < 700 - player.width) {
                        player.x += player.speed;
                      }
                      if (player.y > 450) {
                        fallingSound.play();
                        player.y = 450;
                        gameover = true;
                      }
                    }

                    gameOver = function() {
                      ctx.save();
                      // ctx.globalAlpha = 0.6;
                      backgroundMusic.stop();
                      for (var i = 0; i < tileList.length; i++) {
                        drawObject(tile, tileList[i].x, tileList[i].y, tileObject.width, tileObject.height);
                      }
                      drawObject(splash, 100, 10, 500, 450);
                      // ctx.globalAlpha = 1.0;
                      ctx.strokeStyle = "#FFFFFF";
                      ctx.font = "30px Arial";
                      ctx.strokeText("Game Over", 285, 225);
                      ctx.strokeText("Click to restart", 265, 270);
                      ctx.restore();
                      clearInterval(intervalVar);
                    }

                    updatePosition = function() {
                      if (!paused) {
                        ctx.clearRect(0, 0, 700, 500);
                        drawObject(background, 0, 0, 700, 500);
                        ctx.drawImage(seawater, 0, 0, seawater.width, seawater.height,0, 400, 700, 100); // img, source rect, destination rect
                        backgroundMusic.play();
                        cookieTimer++;
                        if (cookieTimer > level) {
                          cookieList.push({"x": cookieDrop[Math.round(Math.random() * 13)], y: 0});
                          cookieTimer = 0;
                        }
                        if (gameover) {
                          drawObject(charlieThree, player.x, 440, 40, 60);
                          gameOver();
                        }
                        else if (player.inAir) {
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

                        for (var i in cookieList) {
                          if (cookiePlayerCollision(cookieList[i])) {
                            score++;
                            eatingSound.play();
                            if (score % 2 === 0) {
                              level --;
                            }
                            cookieList.splice(i, 1);
                          }
                        }

                        for (var i in cookieList) {
                          for (var j in tileList) {
                            if (cookieTileCollision(cookieList[i], tileList[j])) {
                              tileList.splice(j, 1);
                            }
                          }
                        }

                        if (!player.inAir) {
                          for (var i in tileList) {
                            if (playerTileCollision(tileList[i])) {
                              player.safe = true;
                              break;
                            }
                            player.safe = false;
                          }
                          if (!player.safe) {
                            player.y += player.gravity;
                          }
                        }

                        drawObject(cookie, 640, 10, 20, 20);
                        ctx.fillStyle = "#FFFFFF";
                        ctx.font = "20px Arial";
                        ctx.fillText(score, 665, 27);
                        ctx.fillText("Level: " + (100 - level + 1), 10, 27);


                        updateCookiePosition();
                        updatePlayerPosition();
                        jump();
                      } else {
                        ctx.save();
                        backgroundMusic.stop();
                        ctx.strokeStyle = "#FFFFFF";
                        ctx.font = "30px Arial";
                        ctx.strokeText("Game Paused", 250, 250);
                        ctx.restore();
                      }  
                    }

                    startGame = function() {
                      backgroundMusic.sound.setAttribute("loop", "true")
                      backgroundMusic.play();
                      score = 0;
                      level = 100;
                      player.x = 100;
                      player.y = 340;
                      player.inAir = false;
                      player.leftPressed = false;
                      player.rightPressed = false;
                      player.safe = true;
                      animation = 0;
                      cookieTimer = 0;
                      gameover = false;
                      tileList = [];
                      cookieList = [];

                      for (var i = 0; i <= 13; i++) {
                        tileList.push({"x": i * 50, "y": 400})
                      }

                      intervalVar = setInterval(updatePosition, 15);

                    }
                  };
                  clouds.src = "assets/images/clouds.png";
                };
                seawater.src = "assets/images/seawater.png";
              };
              tile.src = "assets/images/rocky02.png";
            };
            cookie.src = "assets/images/cookie-sketch.png";
          };
          charlieFour.src = "assets/images/charlie/jump2.png";
        };
        charlieThree.src = "assets/images/charlie/hit1.png";
      };
      charlieTwo.src = "assets/images/charlie/walk2.png";
    };
    charlieOne.src = "assets/images/charlie/walk1.png";
  };
  splash.src = "assets/images/splash.png";
};
background.src = "assets/images/background_b.jpg";

// export default class CookieRun {
//   constructor(canvas) {
//   }
// }