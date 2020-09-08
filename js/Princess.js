class Princess {
  constructor(x, y, width, height){
    this.x = x
    this.y = y
    this.width = TILE_SIZE*3/4
    this.height = TILE_SIZE*3/4
  };
  draw(ctx) {
    // var npc = new Image()
    // npc.src = "./images/princess.png"
    // ctx.drawImage(npc, this.x, this.y, this.width, this.height)
    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  // update(){
    
  // };
};