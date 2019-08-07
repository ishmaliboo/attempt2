
	var game = new Game(1000, 1000, 'dark maze');
	var player, boy, floor, fire;
	var player, boy, floor, torch;
	var battery = 100;

	var keyboard, up, down, left, right;
	
	var audioContext;
	var ambient, fire1snd;
	
	var wall;
	
	var maze;
	
	var fire1;
	
function preload() {
	floor = new Sprite("img/floor.png");
	player = new Sprite("img/boy.png", 64, 64,);
	wall = new Sprite("img/DungeonFloor.jpg");
<<<<<<< HEAD
	monster = new Sprite("img/monster.png");
=======
	fire = new Sprite("img/fire.png", 99, 133);
>>>>>>> 4a4ec4f3ebb3011e6d2f44227c60207c334b5f5f

	snd_alien = new Audio("sound/alien.wav");
	snd_drop = new Audio("sound/SingleWaterDroplet.wav");
	darkness = new Sprite("img/WhiteHole.png")
	torch = new Sprite('img/torched.png');

	audioContext = new AudioContext();
	
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();
	space = keyboard.createSpaceKey();

	var direction;
	var velocY;
	var velocX;

	var mvelocY;
	var mvelocX;

	var mdirect;

}

function create() {
	
		
		floor = floor.create(0, 0, 1000, 1000);
		
		
		createMaze();
		
		wall.setImmovable(true);
		
		boy = player.create(20, 20);
		dark1 = darkness.create(20 -977, 20-933);
		torch = torch.create( 20 -987, 20-987);

		boy.addAnimation('back', [0, 1, 2, 3], 10);
		boy.addAnimation('left', [4, 5, 6, 7], 10);
		boy.addAnimation('right', [8, 9, 10, 11], 10);
		boy.addAnimation('forward', [12, 13, 14, 15], 10);
		boy.addAnimation('still', [0], 1);
		
		fire1 = fire.create(500, 200, 32, 64);
		
		fire1.addAnimation('burn', [0, 1, 2], 10);

<<<<<<< HEAD
		monster = monster.create(800,700);

		drips.play();
		drips2.play();
=======
		ambient = new soundSource(100, 100, snd_drop, audioContext);
		fire1snd = new soundSource(500, 200, snd_alien, audioContext, gain = 0.1);
		
		ambient.play();
		fire1snd.play();
>>>>>>> 4a4ec4f3ebb3011e6d2f44227c60207c334b5f5f
}


function update() {
		velocY = 0;
		velocX = 0;
		if (left.isDown()) {
			direction = 'left';
			velocX += -100;
		}
		
		if (right.isDown()) {
			direction = 'right';
			velocX += 100;
		}
		
		if (up.isDown()) {
			direction = 'forward';
			velocY += -100;
		}
		
		if (down.isDown()) {
			direction = 'back';
			velocY += 100;
		}
		
		if (velocY == 0 && velocX == 0){
			direction = 'still';
		}
		boy.playAnimation(direction);
		boy.setVelocityX(velocX);
		boy.setVelocityY(velocY);
		game.checkCollision(boy, wall);
		
<<<<<<< HEAD
		drips.update(boy.getX(), boy.getY())
		drips2.update(boy.getX(), boy.getY())

		mvelocY = 0;
		mvelocX = 0;
		

		if (game.checkCollision(monster,wall)) {
			mvelocY = 0;
			mvelocX = 0;

		if (mvelocY == 0 && mvelocX == 0){
			mdirect = Math.random(0,3);
			if (mdirect == 0){
				mvelocX = -100;
			}
			if (mdirect == 1){
				mvelocX = 100;
			}
			if (mdirect == 2){
				mvelocY = -100;
			}
			if (mdirect == 3){
				mvelocY = 100;
			}
		}
}
		monster.setVelocityX(mvelocX);
		monster.setVelocityY(mvelocY);



=======
		fire1.playAnimation('burn');
		
		ambient.update(boy.getX(), boy.getY())
		fire1snd.update(boy.getX(), boy.getY())
		
		
		
		if (game.checkCollision(boy, fire)) {
			fire1.kill()
			fire1snd.stop();
		}
		
		dark1.setX(boy.getX() - 977 + 32);
		dark1.setY(boy.getY() - 933 + 32);
		
		torch.setX(boy.getX() - 987 + 32);
		torch.setY(boy.getY() - 987 + 32);
		
		if (space.isDown() && battery > 0) {
			dark1.setAlpha(0);
			battery = battery - (1)
		}
		
		else {
			dark1.setAlpha(1);
			
		}
>>>>>>> 4a4ec4f3ebb3011e6d2f44227c60207c334b5f5f
}

function createMaze() {
	
	var walllength = 20;
	maze = '\
11111111111111111111111111111111111111111111111111\n\
10000000000000000000000000000001000000000000000001\n\
10000000000000000000000000000001000000000000000001\n\
10000000000000000000000000000001000000000000000001\n\
10000000000000000000000000000001000000000000000001\n\
10000111110000100001111100000001111111111111100001\n\
10000100000000100001000000000000000000100000000001\n\
10000100000000100001000000000000000000100000000001\n\
10000100000000100001000000000000000000100000000001\n\
10000100000000100001000000000000000000100000000001\n\
10000111111111100001000011111111000000100001000001\n\
10000000010000000001000000000001000000000001000001\n\
10000000010000000001000000000001000000000001000001\n\
10000000010000000001000000000001000000000001000001\n\
10000000010000000001000000000001000000000001000001\n\
11111000011111111111000010000001111111111111100001\n\
10000000000000000001000010000000000010000000000001\n\
10000000000000000001000010000000000010000000000001\n\
10000000000000000001000010000000000010000000000001\n\
10000000000000000001000010000000000010000000000001\n\
10000100000001000001111111111111000010000011111111\n\
10000100000001000000000000000001000010000010000001\n\
10000100000001000000000000000001000010000010000001\n\
10000100000001000000000000000001000010000010000001\n\
10000100000001000000000000000001000010000000000001\n\
10000111111111111111111111000001000010000000000001\n\
10000000000001000000000000000001000010000000000001\n\
10000000000001000000000000000001000010000000000001\n\
10000000000001000000000000000001000011111110000001\n\
10000000000001000000000000000001000000000000000001\n\
11111111000001000001111111111111000000000000000001\n\
10000000000001000001000010000000000000000000000001\n\
10000000000001000001000010000000000000000000000001\n\
10000000000001111111000010000000000000000000111111\n\
10000000000001000000000010000000000000000000100001\n\
10000011111111000000000011111111111111000000100001\n\
10000010000001000000000000000000000000000000100001\n\
10000010000001000000000000000000000000000000100001\n\
10000010000001000000000000000000000000000000100001\n\
10000000000001000000000000000000000000000000100001\n\
10000000000001111111000000000000111111111111100001\n\
10000000000000000000000000000000000000000000000001\n\
10000000000000000000000000000000000000000000000001\n\
11111110000000000000000000000000000000000000000001\n\
10000010000000000000000000000000000000000000000001\n\
10000000000001000000100000001111110000011111100001\n\
10000000000001000000100000001000000000000000100001\n\
10000000000001000000100000001000000000000000100001\n\
10000000000001000000100000001000000000000000100001\n\
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
	this.snd = snd;
	this.track = audioContext.createMediaElementSource(this.snd);
	
	this.panner = new PannerNode(audioContext);
	this.gainer = new GainNode(audioContext);
	
	this.gainer.gain.value = gain;
	
	this.track.connect(this.gainer).connect(this.panner).connect(audioContext.destination);
	
	this.play = function() {
		this.snd.play();
		this.snd.addEventListener('ended', () => {
			this.snd.play();
		}, true);
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
