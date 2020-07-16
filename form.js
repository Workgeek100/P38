class Form {

    constructor() {
      this.input = createInput('Name');
      this.button = createButton('PLAY');
      this.greeting = createElement('h2');
      this.title = createElement('h1');
      this.reset = createButton('RESET');
    }
    hide(){
      this.greeting.hide();
      this.button.hide();
      this.input.hide();
      this.title.hide();
    }
  
    display(){
      this.title.html("HURDLES RUNNING GAME");
      this.title.position(displayWidth/3, displayHeight/60);
      this.reset.position(displayWidth-100,20);
      this.input.position(displayWidth/2-100 , displayHeight/2 - 80);
      this.button.position(displayWidth/2 -50, displayHeight/2-30);
      this.button.mousePressed(()=>{
        this.input.hide();
        this.button.hide();
        player.name = this.input.value();
        playerCount = playerCount+1;
        player.index = playerCount;
        player.update();
        player.updateCount(playerCount);
        this.greeting.html("Hello " + player.name);
        this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      });
      this.reset.mousePressed(()=>{
        player.updateCount(0);
        game.update(0);
      })
    }
    
}