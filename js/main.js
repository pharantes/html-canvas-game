var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var game = document.querySelector(".game")
var startGame = document.querySelector(".start-btn");
var startGamePage = document.querySelector(".game-start");
var rules = document.querySelector(".rules-btn");
var rulesPage = document.querySelector(".rules");
var back = document.querySelector(".back-btn");
var gameOverPage = document.querySelector(".game-over");
var restartGame = document.querySelector(".restart-btn");
var gameWinPage = document.querySelector(".game-win");
var scoreDiv = document.querySelector(".score");

var g;
var r;
var executed = false


back.addEventListener("click", function(){
  startGamePage.classList.remove("d-none");
  rulesPage.classList.add("d-none");
});

rules.addEventListener("click", function(){
  startGamePage.classList.add("d-none");
  rulesPage.classList.remove("d-none");
});

startGame.addEventListener("click", function(){
  startGamePage.classList.add("d-none");
  game.classList.remove("d-none");
  // Listening for key events
  document.onkeydown = function(e) {
    e.preventDefault()
    switch (e.keyCode) {
      case 37: 
       g.player.move('left')
        break;
      case 38: 
        g.player.move('up')
        break;
      case 39: 
        g.player.move('right')
        break;
      case 40: 
        g.player.move('down')
        break;
      };
    ;}
  g = new Game();
  function animation(){
    scoreDiv.innerHTML = g.score
    g.draw(ctx);
    g.update();
    if (g.gameOver && !executed) {
      game.classList.add("d-none");
      gameOverPage.classList.remove("d-none");
      window.cancelAnimationFrame(animation);
      executed = true
    }else if(g.gameWin && !executed) {
      game.classList.add("d-none");
      gameWinPage.classList.remove("d-none");
      window.cancelAnimationFrame(animation);
      executed = true

    };
    window.requestAnimationFrame(animation);
  };
  animation();
});

restartGame.addEventListener("click", function(){
  console.log("restart clicked")
  
  gameOverPage.classList.add("d-none");
  game.classList.remove("d-none");
  document.onkeydown = function(e) {
    e.preventDefault()
    switch (e.keyCode) {
      case 37: 
       r.player.move('left')
        break;
      case 38: 
        r.player.move('up')
        break;
      case 39: 
        r.player.move('right')
        break;
      case 40: 
        r.player.move('down')
        break;
      };
    ;}
  r = new Game();
  function newAnimation(){
    r.draw(ctx);
    r.update(); 
    if (r.gameOver && !executed) {
      game.classList.add("d-none");
      gameOverPage.classList.remove("d-none");
      window.cancelAnimationFrame(animation);
      executed = true
    }else if(r.gameWin && !executed) {
      game.classList.add("d-none");
      gameWinPage.classList.remove("d-none");
      window.cancelAnimationFrame(animation);
      executed = true
    };
    window.requestAnimationFrame(newAnimation);
  };
  newAnimation();
});