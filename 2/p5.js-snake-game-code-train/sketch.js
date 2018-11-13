/* errors
-food.mult(scl) cant be uncommented
	-what is mult?

*/

/* improve
-if reaches wall, comes up on oppositte side 
-if going
	-left	->	rigtht : 	cant turn left 
	-right 	->	left: 		cant turn right
	-...

*/

var snake;
var scl = 10;
var food;

function setup() {
	createCanvas(200, 200);
	snake = new Snake();
	frameRate(10);
	pickLocation();
}

function pickLocation(){
	
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	
	//console.log('rows, cols, scale: ' ,rows, cols, scl);
	
	var minX = 0, minY = 0;
	var maxX = (rows * scl) - scl;
	var maxY = (cols * scl) - scl;
	
	//console.log('maxX maxY', maxX, maxY);
	
	var rndX = generateRandomXFood(minX, maxX);
	var rndY = generateRandomXFood(minY, maxY);
	
	//console.log('food x y: ', rndX , rndY);
	
	food = createVector(rndX, rndY, 0);
	//food.mult(scl);
}

function draw() {
	background(51);
	snake.update();
	snake.show();
	
	if(snake.eat(food)){
		pickLocation();
	}
	
	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);
}

function keyPressed(){
	if(keyCode === UP_ARROW){
		snake.dir(0, -1);
	}else if(keyCode === DOWN_ARROW){
		snake.dir(0, 1);
	}else if(keyCode === RIGHT_ARROW){
		snake.dir(1, 0);
	}else if(keyCode === LEFT_ARROW){
		snake.dir(-1, 0);
	}
}

function generateRandomXFood(min, max){
	return generateRandomAxisFood(min, max);
}

function generateRandomYFood(min, max){
	return generateRandomAxisFood(min, max);
}

function generateRandomAxisFood(min, max){
	var rnd = Math.floor(Math.random() * max) + min;
	var rest;
	
	if (rnd < scl){
		return 0;
	}
	if (rnd > (max - scl)){
		return max - scl;
	}

	rest = rnd % scl;
	
	if(rest != 0){
		return rnd-rest;
	}
	
	return rnd;
}