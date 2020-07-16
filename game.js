class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      runner1 = createSprite(100,200);
      runner2 = createSprite(100,400);
      runner3 = createSprite(100,600);
      runner4 = createSprite(100,800);
      runners = [runner1, runner2, runner3, runner4];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
        var x;
        var y = 200;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          y = y + 200;
          //use data form the database to display the cars in y direction
          x = allPlayers[plr].distance;
          
  
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60,);
            runners[index-1].position.x = x;
            runners[index-1].position.y = y;
            runners[index - 1].shapeColor = "red";
            camera.position.x = runner[index-1].position.x;
            camera.position.y = displayHeight/2;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank = player.rank+1;
        Player.updateRunnersAtEnd(player.rank);
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank);
    }
  
    spawnObstacles(){
    if(World.frameCount%100===0){
      obs1 = createSprite(3000,450,20,20)
      obs1.addImage("hurdle",obs_image)
      obs1.velocityX = -6
      obs1.scale = 0.5;
    }
    }
  }
  