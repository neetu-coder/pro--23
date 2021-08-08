// variable are created for the game
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
// images are inserted
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
// sprites have been created for variables 
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)
	

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=610;

// boxes are created with velocity
 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);
	 boxleftSprite.velocityX = 1

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);
	

 	boxBase=createSprite(boxPosition+150, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);
	boxBase.velocityX = 2

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxLeftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxLeftSprite.shapeColor=color(255,0,0);
    boxLeftSprite.velocityX = 1

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);
	 
	
  
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
// the package will follow the helicopter
  packageSprite.x= 	helicopterSprite.position.x 
  packageSprite.y= packageBody.position.y 
// the boxes will bounce off edges
  edges= createEdgeSprites();
  boxleftSprite.x =  boxBase.x+100
  boxLeftSprite.x =  boxBase.x-100
  boxLeftSprite.bounceOff(edges);
  boxBase.bounceOff(edges);
  drawSprites();
  
  
 
}
function keyPressed (){
// if right or left arrow is pressed than the helicopter will move
	if(keyCode===LEFT_ARROW){
		helicopterSprite.x= helicopterSprite.x-20
	}

	else if(keyCode===RIGHT_ARROW){
		helicopterSprite.x= helicopterSprite.x+20
	}
//if down arrow is pressed then the package will fall down
	else if (keyCode === DOWN_ARROW){
		Matter.Body.setStatic(packageBody,false);
		
	}
}