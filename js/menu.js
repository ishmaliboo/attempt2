var startButton, instructionButton;
var instructions;
var game = new Game(1000, 600, 'dark maze');
var audioContext;

function preload() {
	//startButton = new Button("img/startButton.png", 240, 60, 450, 200);
	instructionButton = new Button("img/instructionButton.png", 521, 60, 400, 350);
	logoButton = new Button("img/NightLight.png", 278, 200, 70, 200);
	levelButton = new Button("img/level.png", 286, 60, 450, 200)
	
	
	snd_monster = new Audio("sound/Monster Growl-SoundBible.com-344645592.wav");
	
	snd_start = new Audio("sound/atmosphere-fixed.wav");
	snd_button = new Audio("sound/buttonHover2.wav");
	
	backgroundmusic = new soundSource(0, 0, snd_start, new AudioContext());
	
}


function create() {
	backgroundmusic.play();
	instructionButton.createButton();
	instructionButton.addOverAction(function(){
		snd_button.cloneNode().play();
	}, [1]);
	instructionButton.addOutAction(()=>{}, [0]);
	
	levelButton.createButton();
	levelButton.addOverAction(function(){
		snd_button.cloneNode().play();
	}, [1]);
	levelButton.addOutAction(() => {}, [0]);
	
	levelButton.addUpAction( function(){
		window.location.href = "levels.html"
		
	} );
	
	instructionButton.addUpAction( function(){
		window.location.href = "instruction.html"
	} );
	
	logoButton.createButton();
	logoButton.addOverAction(function(){
		snd_monster.cloneNode().play();
	}, [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0]);
	logoButton.addOutAction(()=>{}, [0]);

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