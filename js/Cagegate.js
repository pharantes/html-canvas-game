class Cagegate{
  constructor(x, y, width, height){
    this.x = x
    this.y = y
    this.width = TILE_SIZE
    this.height = TILE_SIZE
    this.openGate = 1
  }
  draw(ctx){
    if(this.openGate === 1){
      ctx.save();
      ctx.fillStyle = "gray";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    } else if (this.openGate === 0){
      ctx.save();
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }
  }
}