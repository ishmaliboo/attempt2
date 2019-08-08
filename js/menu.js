var startButton, instructionButton;
var instructions;
var game = new Game(1000, 600, 'dark maze');


function preload() {
	startButton = new Button("img/startButton.png", 240, 60, 450, 200);
	instructionButton = new Button("img/instructionButton.png", 521, 60, 400, 400);
	
}


function create() {
	instructionButton.createButton();
	instructionButton.addOverAction(()=>{}, [1]);
	instructionButton.addOutAction(()=>{}, [0]);
	
	startButton.createButton();
	startButton.addOverAction(() => {}, [1]);
	startButton.addOutAction(() => {}, [0]);
	
	startButton.addUpAction( function(){
		window.location.href = "game.html"
		
	} );
	
	instructionButton.addUpAction( function(){
		window.location.href = "instruction.html"
	} );

}

function update() {

	
	

}