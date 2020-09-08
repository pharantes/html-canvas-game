class Game {
  constructor() {

    var nbZombies = 5
    
    this.player = new Character(2*TILE_SIZE,10*TILE_SIZE);
    this.princess = new Princess(9*TILE_SIZE, 10*TILE_SIZE);
    this.gate = new Cagegate(9*TILE_SIZE,9*TILE_SIZE)
    this.zombies = [];
    this.powercoins = [];
    this.coins = [];
    this.walls = [];
    this.score = 0;
    this.savePrincess = 0;
    this.powercoinsCounter = 0;
    this.vulnerable = false;
    this.frame = 0;
    this.gameOver = false;
    this.gameWin = false;

    this.map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 4, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 0],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 4, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var nbOfRows = this.map.length;
    var nbOfCols = this.map[0].length;
    // Creation of the coins and walls

    for (var r = 0; r < nbOfRows; r++) {
      for (var c = 0; c < nbOfCols; c++) {
        var tile = this.map[r][c];
        if(tile === 4) {
          this.powercoins.push(new Powercoin(c*TILE_SIZE, r*TILE_SIZE, TILE_SIZE, TILE_SIZE))
        } else if( tile === 1){
          this.coins.push(new Coin(c*TILE_SIZE + TILE_SIZE/3, r*TILE_SIZE + TILE_SIZE/3, TILE_SIZE/3, TILE_SIZE/3))
        } else if(tile === 0){
          this.walls.push(new Walls(c*TILE_SIZE, r*TILE_SIZE, TILE_SIZE, TILE_SIZE))
        };
      };
    };

    // Creation of the zombies
    var allPossibleZombies = []
    for (var r = 0; r < nbOfRows; r++) {
      for (var c = 0; c < nbOfCols; c++) {
        var tile = this.map[r][c];
        if(tile === 1 || tile === 4){
          allPossibleZombies.push(new Zombie(c*TILE_SIZE, r*TILE_SIZE))
        };
      };
    };

    // shuffle allPossibleZombies
    for (var i = allPossibleZombies.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = allPossibleZombies[i];
        allPossibleZombies[i] = allPossibleZombies[j];
        allPossibleZombies[j] = temp;
    }
    this.zombies = allPossibleZombies.splice(0,nbZombies)
  };

  
  // Draw everything inside the game
  draw(ctx) {
    
    // Clear everything
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

    // Draw the board
    for(var i = 0; i < this.walls.length; i++){
      let wall = this.walls[i];
      wall.draw(ctx)
    };

    // Draw the player 
    this.player.draw(ctx)

    // Draw the princess
    this.princess.draw(ctx)
    // Draw the gate
    this.gate.draw(ctx)
    // Draw the coins
    for(var i = 0; i < this.coins.length; i++){
      this.coins[i].draw(ctx)
    };

    // Draw the powercoins
    for(var i = 0; i < this.powercoins.length; i++){
      this.powercoins[i].draw(ctx)
    };

    // Draw the zombies
    for(var i = 0; i < this.zombies.length; i++){
        this.zombies[i].draw(ctx)
    };
  };
  openGate(){
    if(this.powercoinsCounter === 5){
      this.gate.openGate = 0
    }
  }
  becomeVulnerable(){
    this.vulnerable = true;
    //change zombie color to green
    for(let i = 0; i < this.zombies.length; i++){
      this.zombies[i].vulnerability = 1
    }
    setTimeout(() => {
      //change zombie color to red
      let result = this.zombies.map(a => a.vulnerability = 0);
      this.vulnerable = false;
    }, 1000*10);
  };
  // Check for collions method
  checkForCollisions() {
    
    // Check collision with walls
    
    for (let i = 0; i < this.walls.length; i++){
       if (
        this.player.x + 30 > this.walls[i].x &&
        this.walls[i].y + 30 > this.player.y &&
        this.player.x - 30 < this.walls[i].x &&
        this.walls[i].y - 30 < this.player.y
        ){
        this.player.speed = 0
        
        switch(this.player.direction) {
          case "down":
            this.player.y -= 1
            break;
          case "up":
            this.player.y += 1
            break;
          case "left":
            this.player.x += 1
            break;
          case "right":
            this.player.x -= 1
          default:
            break;
        };
      };
    };

    // Check collisions with coins
    for (let i = 0; i < this.coins.length; i++){
      if (
        this.player.x + 30 > this.coins[i].x &&
        this.coins[i].y + 30 > this.player.y &&
        this.player.x - 30 < this.coins[i].x &&
        this.coins[i].y - 30 < this.player.y
        ){
          this.coins.splice(i,1)
          this.score++
      };

    };
    for (let i = 0; i < this.powercoins.length; i++){
      if (
        this.player.x + 30 > this.powercoins[i].x &&
        this.powercoins[i].y + 30 > this.player.y &&
        this.player.x - 30 < this.powercoins[i].x &&
        this.powercoins[i].y - 30 < this.player.y
        ){
         // splice(i,1)
        this.powercoins.splice(i,1)
        this.powercoinsCounter++
        /* this.vulnerable = true */
        this.becomeVulnerable();
      };
    };
    // Check collisions with zombies
    
    for (let i = 0; i < this.zombies.length; i++){
      if (
        this.player.x + 30 > this.zombies[i].x &&
        this.zombies[i].y + 30 > this.player.y &&
        this.player.x - 30 < this.zombies[i].x &&
        this.zombies[i].y - 30 < this.player.y && this.vulnerable
        ){
        //changes collision to kill the zombie
        this.zombies.splice(i,1)
        console.log("this is i: ",i);
        
      } else {
        for (let i = 0; i < this.zombies.length; i++){
          if (
            this.player.x + 30 > this.zombies[i].x &&
            this.zombies[i].y + 30 > this.player.y &&
            this.player.x - 30 < this.zombies[i].x &&
            this.zombies[i].y - 30 < this.player.y && !this.vulnerable
            ){
            //player die method here!!!
             return this.gameOver = true;
          };
        };
      }
    };
    
    // Check collisions with princess
    if (
      this.player.x + 30 > this.princess.x &&
      this.princess.y + 30 > this.player.y &&
      this.player.x - 30 < this.princess.x &&
      this.princess.y - 30 < this.player.y
      ){
      return this.gameWin = true;
    };
  };


  update() {
    this.frame++;
    this.player.update();
    this.openGate();
    for (let i = 0; i < this.zombies.length; i++) {
      this.zombies[i].update(this.map)
    }
    // Generate a Zombie every 180 frames = 4 seconds in the center ring
    if (this.frame % (4*60) === 0) {
      this.zombies.push(new Zombie(9*TILE_SIZE, 12*TILE_SIZE))   
    };
    this.checkForCollisions();
  };
}

