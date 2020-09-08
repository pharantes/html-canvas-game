class Coin {
  constructor(x, y, width, height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  draw(ctx) {
    // var coin = new Image()
    // coin.src = "./images/coin1.png"
    // ctx.drawImage(coin, this.x, this.y, this.width, this.height)
    ctx.save();
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  update() {
    // switch(g.frame%10){
    //   case 0:
    //     coin.src = "./images/coin1.png"
    //     break;
    //   case 1:
    //     coin.src = "./images/coin2.png"
    //     break;
    //   case 2:
    //     coin.src = "./images/coin3.png"
    //     break;
    //   case 3:
    //     coin.src = "./images/coin4.png"
    //     break;
    //   case 4:
    //     coin.src = "./images/coin5.png"
    //     break;
    //   case 5:
    //     coin.src = "./images/coin6.png"
    //     break; 
    //   case 6:
    //     coin.src = "./images/coin7.png"
    //     break;
    //   case 7:
    //     coin.src = "./images/coin8.png"
    //     break;       
    // }
  }
}