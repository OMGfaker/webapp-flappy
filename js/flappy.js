// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
* Loads all resources for the game and gives them names.
*/
// the scaffolding for Phaser is here
var score;
var player;
score = 0;
var labelScore;
var pipes = [];

function preload() {
  game.load.image("playerImg", "../assets/flappy.png");
  game.load.image("backgroundImg", "../assets/flappy.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe2-body.png");

}

/*
* Initialises the game. This function is only called once.
*/
function create() {
  game.stage.setBackgroundColor("#F3DEEE");
  game.add.text(300, 0, "Flappy bird!", {font: "30px Arial", fill: "#FFFFFF"});
  player = game.add.sprite(20, 270, "playerImg");
  labelScore = game.add.text(20, 20, "0");
  game.add.image(790, 400, "backgroundImg");
  game.input
  .onDown.add(clickHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(moveRight);
  game.input
  .keyboard.addKey(Phaser.Keyboard.LEFT)
  .onDown.add(moveLeft);
  game.input
  .keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(moveUp);
  game.input
  .keyboard.addKey(Phaser.Keyboard.DOWN)
  .onDown.add(moveDown);
  game.physics.startSystem(Phaser.Physics.ARCADE);

  changeScore();
  changeScore();
  //Somewhere inside create
  generatePipe();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.velocity.x = 5;
  player.body.velocity.y = -5;
  player.body.gravity.y = 200;
  // set the background colour of the scene


  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);

  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown
  .add(playerJump);
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval,
    generatePipe
  );
}
/*
* This function updates the scene. It is called for every new frame.
*/
function update() { game.physics.arcade.overlap(
  player,
  pipes,
  gameOver);
}

function gameOver(){
  game.destroy();

}

function spaceHandler() {
  game.sound.play("score");
}
function clickHandler(event) {
  //   alert("Click!");
  //  alert("The position is: " + event.x + "," + event.y);
  //  game.add.sprite(60, 20, "playerImg");
  //       game.add.sprite(event.x, event.y, "playerImg");

}

function plusTime(x, y, z){
  x.foo += y*z;
}
function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());

}
function moveRight() {
  player.x = player.x + 10;
}
function moveLeft() {
  player.x = player.x - 10;
}
function moveUp() {
  player.y = player.y - 10;
}
function moveDown() {
  player.y = player.y + 10;
}
function generatePipe() {
  var gap = game.rnd.integerInRange(1 ,5);
  for (var count = 0; count < 8; count++) {
    if (count != gap && count != gap+1 && count != gap+1+1 && count != gap+1+1+1) {
      addPipeBlock(750, count * 50);
    }
  }
  changeScore();
}

function gameOver(){
  registerScore(score);
  game.state.restart();
  location.reload();
}
function playerJump() {
  player.body.velocity.y = -200;
}
function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}
