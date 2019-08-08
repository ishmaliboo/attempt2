var game = new Game(1000, 600, 'dark maze');
var instructionPage;
var instructions;
var startButton;
var backButton;

var snd_start, snd_button;

function preload() {
	
	instructions = new Sprite("img/Instructions.png");
	startButton = new Button("img/startButton.png", 240, 60, 700, 200);
	backButton = new Button("img/backButton.png", 216, 70, 700, 300);
	snd_start = new Audio("sound/atmosphere-fixed.wav");
	snd_button = new Audio("sound/buttonHover2.wav");
	
	backgroundmusic = new soundSource(0, 0, snd_start, new AudioContext());
}


function create() {
	
	backgroundmusic.play();
	game.setBackgroundColour("#585858");
	instructionPage = instructions.create(50, 0, 600, 600);
	startButton.createButton();
	startButton.addOverAction(function(){
		snd_button.cloneNode().play();
	}, [1]);
	startButton.addOutAction(() => {}, [0]);
	
	backButton.createButton();
	backButton.addOverAction(function(){
		snd_button.cloneNode().play();
	}, [1]);
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

function soundSource(x, y, snd, audioContext, gain = 1, loop = true) {
	this.x = x;
	this.y = y;
	this.snd = snd;
	this.track = audioContext.createMediaElementSource(this.snd);
	
	this.panner = new PannerNode(audioContext);
	this.gainer = new GainNode(audioContext);
	
	this.gainer.gain.value = gain;
	
	this.track.connect(this.gainer).connect(this.panner).connect(audioContext.destination);
	
	this.loop = loop;
	
	this.play = function() {
		this.snd.play();
		if (this.loop) {
			this.snd.addEventListener('ended', () => {
				this.snd.play();
			}, true);
		}
	}
	
	this.stop = function() {
		this.snd.pause();
	}
	
	this.update = function(playerx, playery, dmp = 10) {
		var x = (this.x - playerx) / dmp;
		var y = (this.y - playery) / dmp;
		
		this.panner.positionX.value = x;
		this.panner.positionY.value = y;
	}	
}