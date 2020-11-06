var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["7b4ed783-ef83-480b-8c94-2e1dbd4c2333","a7b9acd4-ade1-42e3-8e4f-e70c4a1991c5","36b3941a-e70b-459f-a7bb-e89a0ca1bca0","d3b144ad-3389-4024-8136-576b9e9c51e5","018a19a3-905e-4e80-a583-e3569d3725f5"],"propsByKey":{"7b4ed783-ef83-480b-8c94-2e1dbd4c2333":{"name":"monkey","sourceUrl":null,"frameSize":{"x":626,"y":626},"frameCount":1,"looping":true,"frameDelay":12,"version":"PkNPveLI2_bIqAqyUuBdCm4pCxSFMgoL","categories":["animals"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":626,"y":1252},"rootRelativePath":"assets/7b4ed783-ef83-480b-8c94-2e1dbd4c2333.png"},"a7b9acd4-ade1-42e3-8e4f-e70c4a1991c5":{"name":"download (3).jpg_1","sourceUrl":null,"frameSize":{"x":412,"y":100},"frameCount":2,"looping":true,"frameDelay":12,"version":"3JB44eqmYqRFCskzl6Y7r6MZi8mmzlvY","loadedFromSource":true,"saved":true,"sourceSize":{"x":412,"y":200},"rootRelativePath":"assets/a7b9acd4-ade1-42e3-8e4f-e70c4a1991c5.png"},"36b3941a-e70b-459f-a7bb-e89a0ca1bca0":{"name":"restart","sourceUrl":null,"frameSize":{"x":108,"y":91},"frameCount":1,"looping":true,"frameDelay":12,"version":"s0Z.X_wa0UioBLKmvSxVs.mDJcjSt3w0","categories":["gameplay"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":108,"y":91},"rootRelativePath":"assets/36b3941a-e70b-459f-a7bb-e89a0ca1bca0.png"},"d3b144ad-3389-4024-8136-576b9e9c51e5":{"name":"Stone","sourceUrl":null,"frameSize":{"x":108,"y":239},"frameCount":1,"looping":true,"frameDelay":12,"version":"z6Mnh5RBlxOz2wJiJC5tsIlqjuOM4jmB","categories":["obstacles"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":108,"y":239},"rootRelativePath":"assets/d3b144ad-3389-4024-8136-576b9e9c51e5.png"},"018a19a3-905e-4e80-a583-e3569d3725f5":{"name":"Banana","sourceUrl":"assets/api/v1/animation-library/gamelab/ccpZZOVIGskbfrQGMrryQFkMKlec5.T5/category_food/bannana.png","frameSize":{"x":382,"y":310},"frameCount":1,"looping":true,"frameDelay":2,"version":"ccpZZOVIGskbfrQGMrryQFkMKlec5.T5","categories":["food"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":382,"y":310},"rootRelativePath":"assets/api/v1/animation-library/gamelab/ccpZZOVIGskbfrQGMrryQFkMKlec5.T5/category_food/bannana.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var PLAY = 1;
var END=0;
var gamestate=PLAY;

var obstaclesGroup=new Group();
var fruitsGroup=new Group();

var monkey=createSprite(30,350);
monkey.setAnimation("monkey");
monkey.setCollider("circle",0,0,40);
monkey.scale = 0.09;

var go=createSprite(200,200,3,5);
  go.setAnimation("download (3).jpg_1");
  go.scale=0.5;
  go.visible=false;
  go.scale = 0.5;
  
var restart=createSprite(200,300,3,5);
  restart.setAnimation("restart");
  restart.scale=0.8;
  restart.visible=false;

var score=0;
  var count=0;

 
  
  var ground = createSprite(200,395,700,5);
  ground.shapeColor="black";
  ground.x = ground.width /2;

  var invisibleGround = createSprite(200,375,400,5);
  invisibleGround.visible = false;

function draw() {
  
  background(255);
  
 
  
  monkey.collide(invisibleGround);
  
  
  if(gamestate===PLAY){
  ground.velocityX = -(8+(3*(score/100)));
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //jump when the space key is pressed
  if(keyDown("space") && monkey.y >= 359){
    monkey.velocityY = -12 ;
    playSound("jump.mp3");
  }
  
  if(monkey.isTouching(fruitsGroup)){
    score=score+2;
    fruitsGroup.setVisibleEach(false);
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnFruits();
  
  spawnObstacles();
  
  }
 if(obstaclesGroup.isTouching(monkey)){
   gamestate=END;
  playSound("die.mp3");
 }  
 
 
 if(gamestate===END){
  fruitsGroup.setVelocityXEach(0);  
  obstaclesGroup.setVelocityXEach(0);
  monkey.velocityY=0;
  ground.velocityX=0;
  go.visible=true;
  restart.visible=true;
  obstaclesGroup.setLifetimeEach(-1);
  fruitsGroup.setLifetimeEach(-1);  
  if(mousePressedOver(restart)){
  reset();
  }
    
  }
 
 monkey.collide(invisibleGround);
 
  textSize(20);
  text("SCORE "+score,250,20);
  
 
 
 
  drawSprites();   
  
}

function spawnFruits() {
  //write code here to spawn the clouds
  if (World.frameCount % 90 === 0) {
    var fruit = createSprite(400,290,40,10);
    fruit.velocityX=-10;
    fruit.setAnimation("Banana");
    fruit.scale = 0.10;
    fruit.velocityX = -3;
    fruitsGroup.add(fruit);
    
     //assign lifetime to the variable
    fruit.lifetime = 134;
    
    //adjust the depth
    fruit.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function spawnObstacles(){
//writing a code to spawn obstacles.   
  if(World.frameCount % 70===0){
     var obstacle1=createSprite(400,385,5,40);
      obstacle1.velocityX=-7;
      obstacle1.setAnimation("Stone");
      obstacle1.scale=0.4;
      obstacle1.lifetime = 110;
      obstaclesGroup.add(obstacle1);
   }
         }

function reset(){
  gamestate=PLAY;
  obstaclesGroup.destroyEach();
  fruitsGroup.destroyEach();
  score=0;
  go.visible=false;
  restart.visible=false;
  count=0;
  
  
         }
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
