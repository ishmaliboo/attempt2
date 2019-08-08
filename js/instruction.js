var game = new Game(1000, 1000, 'dark maze');
var instructionPage;
var instructions;
var startButton;

function preload() {
	
	instructions = new Sprite("img/Instructions.png");
	startButton = new Button("img/startButton.png", 240, 60,0, 0);
}


function create() {
	instructionPage = instructions.create(0, 0);
	startButton.createButton();
	startButton.addOverAction(() => {}, [1]);
	startButton.addOutAction(() => {}, [0]);
}

function update() {
	startButton.addUpAction( function(){
		window.location.href = "index.html"
		
	} );
}