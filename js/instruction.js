var game = new Game(1000, 600, 'dark maze');
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
	
	startButton.addUpAction( function(){
		window.location.href = "game.html"
		
	} );
}

function update() {

}