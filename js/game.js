
	var game = new Game(1000, 1000, 'dark maze');
	var player, boy, floor;
	var keyboard, up, down, left, right;
	
	var audioContext;
	var drips;
	
	var wall;
	var smallWall = [];
	var maze;
	
function preload() {
	floor = new Sprite("img/floor.png");
	player = new Sprite("img/boy.png", 64, 64,);
	wall = new Sprite("img/DungeonFloor.jpg");


	audioContext = new AudioContext();
	
	drips = new soundSource(100, 100, "sound/SingleWaterDroplet.wav", audioContext);
	drips2 = new soundSource(500, 200, "sound/alien.wav", audioContext, gain = 0.1);
	
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();

	var direction;
	var velocY;
	var velocX;
}

function create() {
	
		
		floor = floor.create(0, 0, 1000, 1000);
		
		
		createMaze();
		
		wall.setImmovable(true);
		
		boy = player.create(20, 20);

		boy.addAnimation('back', [0, 1, 2, 3], 10);
		boy.addAnimation('left', [4, 5, 6, 7], 10);
		boy.addAnimation('right', [8, 9, 10, 11], 10);
		boy.addAnimation('forward', [12, 13, 14, 15], 10);
		boy.addAnimation('still', [0], 1);

		drips.play();
		drips2.play();
}


function update() {
		velocY = 0;
		velocX = 0;
		if (left.isDown()) {
			direction = 'left';
			velocX += -100;
		}
		
		if (right.isDown()) {
			direction = 'right'
			velocX += 100
		}
		
		if (up.isDown()) {
			direction = 'forward'
			velocY += -100
		}
		
		if (down.isDown()) {
			direction = 'back'
			velocY += 100
		}
		
		if (velocY == 0 && velocX == 0){
			direction = 'still';
		}
		boy.playAnimation(direction);
		boy.setVelocityX(velocX);
		boy.setVelocityY(velocY);
		game.checkCollision(boy, wall);
		
		drips.update(boy.getX(), boy.getY())
		drips2.update(boy.getX(), boy.getY())
}

function createMaze() {
	
	var walllength = 20;
	maze = '\
11111111111111111111111111111111111111111111111111\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
11111111111111111111111111111111111111111111111111'
	
	maze = maze.split('\n');
	
	for (var i = 0; i < maze.length; i++) {
		maze[i].split('');
	}
	
	for (var y = 0; y < maze.length; y++) {
		for (var x = 0; x < maze[y].length; x++) {
			if (maze[y][x] == '1') {
				wall.create(x*walllength, y*walllength, 20, 20)
			}
		}
	}
}

function soundSource(x, y, snd, audioContext, gain = 1) {
	this.x = x;
	this.y = y;
	this.snd = new Audio(snd);
	this.track = audioContext.createMediaElementSource(this.snd);
	
	this.panner = new PannerNode(audioContext);
	this.gainer = new GainNode(audioContext);
	
	this.gainer.gain.value = gain;
	
	this.track.connect(this.gainer).connect(this.panner).connect(audioContext.destination);
	
	this.play = function() {
		this.snd.play()
		this.snd.addEventListener('ended', () => {
			this.snd.play();
		}, true);
	}
	
	this.update = function(playerx, playery, dmp = 10) {
		var x = (this.x - playerx) / dmp;
		var y = (this.y - playery) / dmp;
		
		this.panner.positionX.value = x;
		this.panner.positionY.value = y;
	}
	
}