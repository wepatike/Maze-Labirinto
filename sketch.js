let player = {
  x: 100,
  y: 100,
  emoji: '🕵️‍♂️',
  weapon: '🔫',
  level: 1
};

let mazeLevels = [];
let enemies = [];
let speed = 3;

function setup() {
  createCanvas(800, 600);
  for (let i = 1; i <= 100; i++) mazeLevels.push(generateMazeLevel(i));
}

function draw() {
  background('#fff0f5');
  drawMaze(player.level);
  drawEnemies(player.level);
  drawPlayer();
  handleMovement();
}

function generateMazeLevel(level) {
  let walls = [];
  let count = level + 4;
  for (let i = 0; i < count; i++) {
    let x = random(100, 700);
    let y = random(100, 500);
    let w = random(50, 150);
    let h = random(10, 50);
    walls.push({ x, y, w, h });
  }
  return walls;
}

function drawMaze(level) {
  noFill();
  stroke('hotpink');
  rect(50, 50, 700, 500);

  let walls = mazeLevels[level - 1];
  noStroke();
  fill('#fcb7d3');
  for (let wall of walls) {
    rect(wall.x, wall.y, wall.w, wall.h);
  }

  fill('black');
  textSize(18);
  text(`Nivel ${level}`, 680, 40);
  fill('lime');
  rect(720, 520, 30, 30); // salida
}

function drawPlayer() {
  textSize(28);
  textAlign(CENTER, CENTER);
  text(`${player.emoji} ${player.weapon}`, player.x, player.y);
}

function drawEnemies(level) {
  enemies = [];
  let count = Math.min(level, 50);
  for (let i = 0; i < count; i++) {
    let enemy = {
      x: random(100, 700),
      y: random(100, 500),
      emoji: random(['👻', '😈', '🤖', '🕷️', '💀'])
    };
    enemies.push(enemy);
  }
  for (let enemy of enemies) {
    textSize(28);
    text(enemy.emoji, enemy.x, enemy.y);
  }
}

function handleMovement() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) player.x -= speed;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) player.x += speed;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) player.y -= speed;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) player.y += speed;

  if (player.x > 720 && player.y > 520) {
    if (player.level < 100) {
      player.level++;
      player.x = 100;
      player.y = 100;
      player.weapon = nextWeapon(player.level);
    } else {
      alert('¡Has completado los 100 niveles! 🎉');
      noLoop();
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    player.y -= 50;
    setTimeout(() => player.y += 50, 300);
  }
}

function nextWeapon(level) {
  const armas = ['🔫', '🔪', '🪓', '🧨', '🪄', '⚔️', '🛡️', '🔮', '☄️', '💥'];
  return armas[(level - 1) % armas.length];
}
