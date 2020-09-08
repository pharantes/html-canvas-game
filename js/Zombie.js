class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.direction = 0;
    this.speed = 1;
    this.vulnerability = 0;
  }
  draw(ctx) {
    if(this.vulnerability === 0){
      ctx.save();
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    } else if (this.vulnerability === 1){
      ctx.save();
      ctx.fillStyle = "green";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }  
  }
  die() {}
  update(map) {
    let nbOfMovements = 0
    while (nbOfMovements < this.speed) {
      let newX = this.x
      let newY = this.y
      let newDiretion = this.direction
      // 50% of the time, change to a perpendical direction
      if (Math.random() < 0.5) {
        // If its down or up
        if (newDiretion <= 1) {
          newDiretion = 2 + Math.floor(Math.random() * 2) // 2 or 3
        } 
        else { 
          newDiretion = Math.floor(Math.random() * 2) // 0 or 1
        }
      }
      switch (newDiretion) {
        case 0: // down
          newY += 1
          break
        case 1: // up
          newY -= 1
          break
        case 2: // right
          newX += 1
          break
        case 3: // left
          newX -= 1
          break
      }
      if (this.checkCorrectCoordinates(newX,newY,map)) {
        this.x = newX
        this.y = newY
        this.direction = newDiretion
        nbOfMovements++
      }
    }
  }
  checkCorrectCoordinates(x,y,map) {
    let col1 = Math.floor(x / TILE_SIZE)
    let col2 = Math.ceil(x / TILE_SIZE)
    let row1 = Math.floor(y / TILE_SIZE)
    let row2 = Math.ceil(y / TILE_SIZE)
    return (map[row1][col1] === 1 || map[row1][col1] === 4)
        && (map[row1][col2] === 1 || map[row1][col2] === 4)
        && (map[row2][col1] === 1 || map[row2][col1] === 4)
        && (map[row2][col2] === 1 || map[row2][col2] === 4)
  }
}