var bg,bgImg;
var player,playerImg;
var bullet,bulletImg;
var enemy1,enemyImg1;
var enemy2,enemyImg2;
var enemy3,enemyImg3;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var gemImg;
var gem = 0;
var life = 3;
var bullet = 70;
var gameState = "fight"
var gameOver,expSound,bgSound;
var gameOverImg;
var enemyGroup;
var bulletGroup;

function preload(){
  bgImg = loadImage("assets/space background.jpg");
  playerImg = loadImage("assets/player.png");
  bulletImg = loadImage("assets/bullets.png");
  enemyImg1 = loadImage("assets/enemy1.png");
  enemyImg2 = loadImage("assets/enemy2.png");
  enemyImg3 = loadImage("assets/enemy3.png");
  gemImg = loadImage("assets/gem.png");
  gameOverImg = loadImage("assets/GameOver.png");
  heart1Img = loadImage("assets/heart.png");
  heart2Img = loadImage("assets/heart.png");
  heart3Img = loadImage("assets/heart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  // Creating Background
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  // Creating Player Sprite
  player = createSprite(displayWidth-1150,displayHeight-300,50,50);
  player.addImage(playerImg);
  player.scale = 0.2;

  player.debug = true;
  player.setCollider("rectangle",0,0,300,300);

  heart1 = createSprite(displayWidth-150,40,20,20);
  heart1.visible = false;
  heart1.addImage(heart1Img);
  heart1.scale = 0.07;

  heart2 = createSprite(displayWidth-150,60,20,20);
  heart2.visible = false;
  heart2.addImage(heart2Img);
  heart2.scale = 0.07;

  heart3 = createSprite(displayWidth-150,80,20,20);
  heart3.visible = false;
  heart3.addImage(heart3Img);
  heart3.scale = 0.07;

  bulletGroup = new Group();
  enemyGroup = new Group();

}

function draw() {
  background(255,255,255);  
// Displaying the appropriate image according to the lifes remaining.
  if (gameState === "fight"){
    if(life === 3){
      heart1.visible = true;
      heart2.visible = true;
      heart3.visible = true;
    }
    if (life === 2){
      heart1.visible = true;
      heart2.visible = true;
      heart3.visible = false;
    }
    if (life === 1){
      heart1.visible = true;
      heart2.visible = false;
      heart3.visible = false;
    }
    // go to gameState lost when all the lifes are slain.
    if (life === 0){
      gameState = "lost";
    }
    // go to game state won when gem is 100.
    if(gem === 100){
      gameState = "won";
      winning.play();
    }
    // moving the player up and down making the game compatible.
    if(keyDown("Up_Arrow") || touches.length>0 ){
      player.y = player.y-30;
    }

    if(keyDown("Down_Arrow") || touches.length>0){
      player.y = player.y+30;
    }

    // release bullet and change the image of shooter to shouting position.
    
    if(keyWentDown("space")){
      bullet = createSprite(displayWidth-1150,player.y-30,20,10);
      bullet.velocityx = 20;
      bulletGroup.add(bullet);
      player.depth = bullet.depth;
      player.depth = player.depth+2;
      player.addImage(bulletImg);
      bullet = bullet-1;
    }

    // destroy enemy when bullet touches it and increses the score.
    if(enemyGroup.isTouching(bulletGroup)){
      for(var i = 0; i < enemyGroup.length; i++){
        if(bulletGroup[i].isTouching(bulletGroup)){
          enemyGroup[i].destroy()
          score = score+2
        } 

      }
    }
    // reduce life and destroy player when player touches the enemy.
    if(enemyGroup.isTouching(player)){
      lose.play();
      for(var i = 0; i<enemyGroup.length; i++){
        if(enemyGroup[i].isTouching(player)){
          enemyGroup[i].destroy();
          life = life-1;
        }
      }
    }
    // calling function
    enemy();
   
  }

  drawSprites();

}

// creating function to spawn enemy.
function enemy(){
  enemy1 = createSprite(random(500,1100),random(100,500),40,40);
  enemy1.addImage(enemyImg1);
  enemy1.scale = 0.18;
  enemy1.velocityX = -2;
  enemy.debug = true;
  enemy.setCollider("rectangle",0,0,400,400);
  enemy.lifetime = 400;
  enemyGroup.add(enemy);

}