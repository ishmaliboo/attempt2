var game = new Game(1000, 600, 'dark maze');

var snd_start, snd_button;
var easyButton, hardButton;

function preload(){
	snd_start = new Audio("sound/atmosphere-fixed.wav");
	snd_button = new Audio("sound/buttonHover2.wav");
	easyButton = new Button("img/easy.png", 213, 70, 350, 150);
	hardButton = new Button("img/hardcore.png", 370, 60, 300, 250);
	
	backgroundmusic = new soundSource(0, 0, snd_start, new AudioContext());
}

function create() {
	
	backgroundmusic.play();
	easyButton.createButton();
	easyButton.addOverAction(function(){
		snd_button.cloneNode().play();
	}, [1]);
	easyButton.addOutAction(() => {}, [0]);
	
	easyButton.addUpAction( function(){
		window.location.href = "game.html"
		
	} );
	
	hardButton.createButton();
	hardButton.addOverAction(function(){
		snd_button.cloneNode().play();
	}, [1]);
	hardButton.addOutAction(() => {}, [0]);
	
	hardButton.addUpAction( function(){
		window.location.href = "game.html"
		
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