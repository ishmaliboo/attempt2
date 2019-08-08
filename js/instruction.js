var game = new Game(1000, 600, 'dark maze');
var instructionPage;
var instructions;
var startButton;
var backButton

function preload() {
	
	instructions = new Sprite("img/Instructions.png");
	startButton = new Button("img/startButton.png", 240, 60, 700, 200);
	backButton = new Button("img/backButton.png", 216, 70, 700, 300);
}


function create() {
	game.setBackgroundColour("#585858");
	instructionPage = instructions.create(50, 0, 600, 600);
	startButton.createButton();
	startButton.addOverAction(() => {}, [1]);
	startButton.addOutAction(() => {}, [0]);
	
	backButton.createButton();
	backButton.addOverAction(() => {}, [1]);
	backButton.addOutAction(() => {}, [0]);
	
	startButton.addUpAction( function(){
		window.location.href = "game.html"
		
	} );
	
	backButton.addUpAction( function(){
		window.location.href = "menu.html"
		
	} );
}

function update() {

}