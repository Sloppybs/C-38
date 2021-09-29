var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/happy dog.png");
garden=loadImage("images/Garden.png");
washroom=loadImage("images/Wash Room.png");
bedroom=loadImage("images/Bed Room.png");
 milkImg = loadImage("images/milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(400,500);
  
milkBottle1=createSprite(150,435,10,10);
milkBottle1.addImage(milkImg);
milkBottle1.scale=0.5;
milkBottle2 = createSprite(210,280,10,10);
milkBottle2.addImage(milkImg);
milkBottle2.scale=0.5;
milkBottle2.visible=false; 

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

   
   
   
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
   
}

function draw() {
   
   background("yellow")
   Food0bj.display();
   writeStock(foodS);

   if(foodS==0){
  dog.addImage(happyDog);
  milkBottle2.visible=false;


   }else{
dog.addImage(sadDog);
milkBottle2.visible=true;

   }
   var gameStateRef=database.ref('gameState');
   gameStateRef.on('value',function(data){
     gameState = data.val();
   });
if(gameState===1) {
dog.addImage(happyDog);
dog.scale=0.175;
dog.y=250;
}
if(gameState===2){
dog.addImage(sadDog);
dog.scale=0.175;
milkBottle2.visible=false;
dog.y=250;
}
var Bath=createButton("I want to take Bath");
Bath.position(580,125)
if(Bath.mousePressed(function(){
gameState=3;
database.ref('/').update({'gameState':gameState});
}))
if(gameState===3){
dog.addImage(washroom);
dog.scale=1;
milkBottle2.visible=false;
}
var Sleep=createButton("I am really sleepy")
Sleep.position(710,125);
if(Sleep.mousePressed(function(){
gameState=4;
database.ref('/').update({'gameState':gameState});

}))
if(gamestate===4){
dog.addImage(bedroom);
dog.scale=1;
milkBottle2.visible=false;

}
var Play=createButton("Lets Play!");
Play.position(500,160);
if(Play.mousePressed(function(){
gameState=5;
database.ref('/').update({'gameState':gameState});

}));
if(gameState===5){
dog.addImage(livingroom);
dog.scale=1;
milkBottle2.visible=false;
}
var PlayinGarden=createButton("lets play in the park");
PlayinGarden.position(585,160);
if(PlayinGarden.mousePressed(function(){
gameState=6
database.ref('/').update({'gameState':gameState});

}))
if(gameState===6){
dog.y-=175;
dog.addImage(Garden);
dog.scale=1;
milkBottle2.visible=false;

}


  






  drawSprites();
}

 function readStock(data)
 {
foodS=data.val();
 }
 function writeStock(x){
  database.ref('/').update({
  food:x
  })
 }



 

 