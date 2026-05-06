let playerX = 200;
let playerY = 360;
let size = 30;

// enemies
let enemyX = [100, 250, 50];
let enemyY = [0, -150, -300];

let speed = 3;
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(30);

  if (gameOver == false) {

    // player movement
    if (keyIsDown(LEFT_ARROW)) {
      playerX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      playerX += 5;
    }

    //player in screen
    if (playerX < 0) {
      playerX = 0;
    }
    if (playerX > width - size) {
      playerX = width - size;
    }

    // draw player 
    fill(0, 255, 200);
    rect(playerX, playerY, size, size);

    // enemies 
    for (let i = 0; i < enemyX.length; i++) {

      enemyY[i] += speed;

      // reset enemy 
      if (enemyY[i] > height) {
        enemyY[i] = 0;
        enemyX[i] = random(0, width);
        score++; // points
      }

      // draw enemy 
      fill(255, 80, 80);
      rect(enemyX[i], enemyY[i], size, size);

      // collision
      if (
        enemyX[i] < playerX + size &&
        enemyX[i] + size > playerX &&
        enemyY[i] < playerY + size &&
        enemyY[i] + size > playerY
      ) {
        gameOver = true;
      }
    }

    // speed increase
    if (score > 5) {
      speed = 4;
    }
    if (score > 10) {
      speed = 6;
    }
    if (score > 20) {
      speed = 8;
    }

    // score 
    fill(255);
    textSize(20);
    text("Score: " + score, 10, 25);

  } else {
    // game over screen
    fill(255);
    textSize(32);
    text("Game Over", 110, 180);
    textSize(16);
    text("Click to Restart", 120, 220);
  }
}

// game restart
function mousePressed() {
  if (gameOver == true) {
    gameOver = false;
    score = 0;
    speed = 3;

    // enemy reset
    for (let i = 0; i < enemyX.length; i++) {
      enemyY[i] = random(-300, 0);
      enemyX[i] = random(0, width);
    }
  }
}