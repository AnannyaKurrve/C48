var background,backgroundImage;
var butterfly,butterflyImage;
//var gameover,gameoverImage;
var bee,beeImage;
var girl,girlImage;
//var restart,restartImage;
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
//var player2Image,player2;
var sound;

function preload(){
  backgroundImage=loadImage("Pictures/background.png");
  butterflyImage=loadImage("Pictures/butterfly.png");
  //gameoverImage=loadImage("Pictures/gameover.png");
  beeImage=loadImage("Pictures/bee.png");
  girlImage=loadImage("Pictures/girl.png");
 // restartImage=loadImage("Pictures/restart.png");
 // player2Image=loadImage("Pictures/player2.png");
  sound=loadSound("Sounds/Sound.mp3.mp3");
}

function setup() {
  createCanvas(1000,1000);
  engine=Engine.create();
  world=engine.world;
  girl=createSprite(200,300,30,20);
  girl.addImage(girlImage);
  girl.scale=0.1;
  //gameover=createSprite(500,150,10,10);
  //gameover.addImage(gameoverImage);
  //gameover.scale=0.2;
  invisibleGround=createSprite(0,1000,2000,10);
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.visible=false;
 // restart=createSprite(500,550,20,20);
  //restart.addImage(restartImage);
  //restart.scale=0.2;
  ButterflyGroup=new Group();
  BeeGroup=new Group();
}

function draw() {
  background("white");  
  Engine.update(engine);
  if(gameState === PLAY){
    girl.x=mouseX;
    girl.y=mouseY;
  
  Butterfly();
  Bee();
  Score();
  textSize(20);
  fill("black");
  text("Score:"+score,900,30);
  text("Lives:"+lives,900,45);
  //gameover.visible=false;
  //restart.visible=false;

if(BeeGroup.isTouching(girl)){
  lives=lives-1;
  BeeGroup[0].destroy();

  if(lives===0){
    gameState=END;
    //girl.changeImage(player2Image);
  }

}

}
  else if(gameState===END){
    //gameover.visible=true;
   // restart.visible=true;
    girl.velocityX=0;
    girl.velocityY=0;
    BeeGroup.setVelocityXEach(0);
    BeeGroup.setVelocityYEach(0);
    ButterflyGroup.setVelocityXEach(0);
    ButterflyGroup.setVelocityYEach(0);
   // girl.changeAnimation("player2",player2Image);
    //if(mousePressedOver(restart)){
//Restart();
    //}
  }
  sound.play();
  drawSprites();
}

function Butterfly(){
  if(frameCount%10 === 0){
    butterfly=createSprite(400,500,20,20);
    butterfly.y=Math.round(random(30,800));
    butterfly.x=Math.round(random(30,800));
    butterfly.addImage(butterflyImage);
    butterfly.velocityY=5;
    butterfly.velocityX=1;
    butterfly.lifetime=200;
    butterfly.scale=0.1;
    ButterflyGroup.add(butterfly);
  }
}

function Bee(){
  if(frameCount%70 === 0){
    bee=createSprite(500,600,20,20);
    var Bee=Math.round(random(1,2));
    switch(Bee){
      case 1 : 
      bee.addImage(beeImage);
      break;

      case 2 :
      bee.addImage(beeImage);
      break;
    }
    bee.velocityX=5;
    bee.velocityY=7;
    bee.lifetime=200;
    bee.scale=0.1;
    BeeGroup.add(bee);
  }
}

function Score(){
  if(ButterflyGroup.isTouching(girl)){
    score=score+1;
    ButterflyGroup[0].destroy();
  }
}

function Restart(){
  gameState=PLAY
  restart.visible=false;
  score=0;
  lives=3;
}