var game = new Game(1000, 600, 'dark maze');
var instructionPage;
var instructions;
var startButton;

function preload() {
	
	instructions = new Sprite("img/Instructions.png");
	startButton = new Button("img/startButton.png", 240, 60, 700, 200);
}


function create() {
	game.setBackgroundColour("#585858");
	instructionPage = instructions.create(50, 0, 600, 600);
	startButton.createButton();
	startButton.addOverAction(() => {}, [1]);
	startButton.addOutAction(() => {}, [0]);
	
	startButton.addUpAction( function(){
		window.location.href = "game.html"
		
	} );
}

function update() {

}