var startButton, instructionButton;
var instructions;
var game = new Game(1000, 1000, 'dark maze');


function preload() {
	startButton = new Button("img/startButton.png", 240, 60,450, 500);
	instructionButton = new Button("img/instructionButton.png", 521, 60, 400, 600);
	
}


function create() {
	instructionButton.createButton();
	instructionButton.addOverAction(()=>{}, [0]);
	instructionButton.addOutAction(()=>{}, [1]);
	
	startButton.createButton();
	startButton.addOverAction(() => {}, [1]);
	startButton.addOutAction(() => {}, [0]);

}

function update() {
	startButton.addUpAction( function(){
		window.location.href = "index.html"
		
	} );
	
	instructionButton.addUpAction( function(){
		window.location.href = "instruction.html"
	} );
	
	

}