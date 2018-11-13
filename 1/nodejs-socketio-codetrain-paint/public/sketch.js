var socket;

function setup() {
	createCanvas(300,200);
	background(51);
	
	socket = io.connect('http://localhost:3000/');
	socket.on('mouse', newDrawing);
}

function newDrawing(data){
	// console.log('client received: ' + data);
	noStroke();
	fill(255, 0, 100);
	ellipse(data.x, data.y, 36, 36);
}


function mouseDragged(){
	// console.info(mouseX + ', ' + mouseY);
	
	var data={
		x:mouseX,
		y:mouseY
	};
	
	socket.emit('mouse', data);
}

function draw() {
	mouseDragged();
	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, 36, 36);
}
