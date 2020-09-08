class Character { 
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = TILE_SIZE*3/4
    this.height = TILE_SIZE*3/4
    this.direction = "down"
    this.speed = 0
  }
  draw(ctx) {
    // var mage = new Image()
    // mage.src = "./images/archer-right.png"
    // ctx.drawImage(mage, this.x, this.y, this.width, this.height)
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  die(){

  }
  update() {
    switch (this.direction) {
      case "down":
        this.y += this.speed
        break;
      case "up":
        this.y -= this.speed
        break;
      case "right":
        this.x += this.speed
        break;
      case "left":
        this.x -= this.speed
        break;
      default:
        break;
    }
  }
  move(direction){
    this.speed = 2
    this.direction = direction
  }
}
