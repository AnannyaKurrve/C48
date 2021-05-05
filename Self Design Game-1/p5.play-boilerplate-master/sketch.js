var background,backgroundImage;
var coin,coinImage;
var gameover,gameoverImage;
var monster1,monster1Image;
var monster2,monster2Image;
var player,playerImage;
var restart,restartImage;
var score=0;
var lives=3;
var PLAY=1;
var END=0;
var gameState=PLAY;
const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
var engine,world;
var invisibleGround;
var player2Image,player2;
var sound;
//var gameState=waitState;
var form;

function preload(){
  backgroundImage=loadImage("Pictures/background.png");
  coinImage=loadImage("Pictures/coin.png");
  gameoverImage=loadImage("Pictures/gameover.png");
  monster1Image=loadImage("Pictures/monster1.png");
  monster2Image=loadImage("Pictures/monster2.png");
  playerImage=loadImage("Pictures/Player.png");
  restartImage=loadImage("Pictures/restart.png");
  player2Image=loadImage("Pictures/player2.png");
  //sound=loadSound("Sounds/Sound.mp3");
}

function setup() {
  createCanvas(1000,1000);
  engine=Engine.create();
  world=engine.world;
  player=createSprite(200,300,30,20);
  player.addImage(playerImage);
  player.scale=0.5;
  gameover=createSprite(500,150,10,10);
  gameover.addImage(gameoverImage);
  gameover.scale=0.2;
  invisibleGround=createSprite(0,1000,2000,10);
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.visible=false;
  restart=createSprite(500,550,20,20);
  restart.addImage(restartImage);
  restart.scale=0.2;
  coinGroup=new Group();
  monsterGroup=new Group();
}

function draw() {
  background(backgroundImage);  
  Engine.update(engine);
  if(gameState === PLAY){
    player.x=mouseX;
    player.y=mouseY;
  
  Coin();
  monster();
  Score();
  textSize(20);
  fill("white");
  text("Score:"+score,900,30);
  text("Lives:"+lives,900,45);
  gameover.visible=false;
  restart.visible=false;

if(monsterGroup.isTouching(player)){
  lives=lives-1;
  monsterGroup[0].destroy();

  if(lives===0){
    gameState=END;
    player.changeImage(player2Image);
  }

}

}
  else if(gameState===END){
    gameover.visible=true;
    restart.visible=true;
    player.velocityX=0;
    player.velocityY=0;
    monsterGroup.setVelocityXEach(0);
    monsterGroup.setVelocityYEach(0);
    coinGroup.setVelocityXEach(0);
    coinGroup.setVelocityYEach(0);
    player.changeAnimation("player2",player2Image);
    if(mousePressedOver(restart)){
Restart();
    }
  }
  //sound.play(();
  form.display();
  drawSprites();
}

function Coin(){
  if(frameCount%10 === 0){
    coin=createSprite(400,500,20,20);
    coin.y=Math.round(random(30,800));
    coin.x=Math.round(random(30,800));
    coin.addImage(coinImage);
    coin.velocityY=5;
    //coin.velocityX=7;
    coin.lifetime=200;
    coin.scale=0.2;
    coinGroup.add(coin);
  }
}

function monster(){
  if(frameCount%70 === 0){
    monster1=createSprite(500,600,20,20);
    var Monster=Math.round(random(1,2));
    switch(Monster){
      case 1 : 
      monster1.addImage(monster1Image);
      break;

      case 2 :
      monster1.addImage(monster2Image);
      break;
    }
    monster1.velocityX=5;
    monster1.velocityY=7;
    monster1.lifetime=200;
    monster1.scale=0.1;
    monsterGroup.add(monster1);
  }
}

function Score(){
  if(coinGroup.isTouching(player)){
    score=score+1;
    coinGroup[0].destroy();
  }
}

function Restart(){
  gameState=PLAY
  restart.visible=false;
  score=0;
  lives=3;
}