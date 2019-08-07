
	var game = new Game(1000, 1000, 'dark maze');
	var player, boy, floor, fire;
	var player, boy, floor, torch;
	var battery = 100;
	var score = 0;

	var keyboard, up, down, left, right;
	
	var audioContext;
	var ambient, fire1snd;
	
	var wall;
	
	var maze;
	
	var fires, firesounds;
	
	var monstersound;
	
	var growlcount;
	
	var startButton;
	
	var txt;
	
	var win ;
	
	var time = 0;
	
function preload() {
	
	startButton = new Button("img/startButton.png", 240, 60,450, 500);
	
	instructionButton = new Button("img/instructionButton.png", 521, 60, 400, 600);
	
	floor = new Sprite("img/floor.png");
	player = new Sprite("img/boy.png", 64, 64,);
	wall = new Sprite("img/DungeonFloor.jpg");
	fire = new Sprite("img/fire.png", 99, 133);
	monster = new Sprite("img/monster.png");
	
	

	snd_alien = new Audio("sound/alien.wav");
	snd_drop = new Audio("sound/SingleWaterDroplet.wav");
	snd_monster = new Audio("sound/Monster Growl-SoundBible.com-344645592.wav");
	
	darkness = new Sprite("img/WhiteHole.png")
	torch = new Sprite('img/torched.png');
	
	txt = document.querySelector('#gametext');
	
	// game.load.spritesheet('button', "img/startButton.png", 240, 60);

	audioContext = new AudioContext();
	
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();
	space = keyboard.createSpaceKey();
	
	end_game = new Sprite("img/JumpScare.png");
	gameOver = new Sprite("img/GameOver.png");
	
	var direction;
	var velocY;
	var velocX;
	
	var state;
}

function create() {
	
	
	state = "menu";

	createMenu();
}

function update() {
	if (state == "menu") {
		updateMenu();
	} else if (state == "game") {
		updateGame();
	}
	
	else if (state == "showEnd"){
		if (win == true){
			state = "end";
			wonGame();
			
		}else if (win == false){
			
			lostGame();
			
		}
		
	}
	

}

function wonGame() {
	gameOver.create(0, 0);

	//fire2 = fire.create(200, 200);
	//fire3 = fire.create(600, 200);
	
	txt.textContent = '';
}

function lostGame() {
	
	time += 1;
	
	if (time == 1){
		jump = end_game.create(0, 0, 1000, 1000);
	}
	if (time >= 100){
		jump.kill();

		gameOver.create(0, 0);
		state = 'end';
	}
	
	txt.textContent = '';
	
	
}

function createMenu() {
	console.log("created menu");
	
	
	
	//startButton = game.add.button(game.world.centerX - 95, 400, 'button');
	
	//startButton.onInputOver.add()
	
	instructionButton.createButton();
	instructionButton.addOverAction(()=>{}, [0]);
	instructionButton.addOutAction(()=>{}, [1]);
	
	startButton.createButton();
	startButton.addOverAction(() => {}, [1]);
	startButton.addOutAction(() => {}, [0]);

	//startButton.onInputUp(function(){console.log('Hello')});
	
	txt.textContent = "";
}

function updateMenu() {
	
	startButton.addUpAction( function(){
		
		//Phaser.Input.Gamepad.startButton.destroy();
		
		//instructionButton.destroy();
		//startButton.destroy();
		// startButton.kill();
		console.log('Click');
		createGame();
		state = "game";
	} );

}

function createGame() {
	
		
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

		monster = monster.create(800,700);

		ambient = new soundSource(100, 100, snd_drop, audioContext);
		monstersound = new soundSource(0, 0, snd_monster, audioContext);
		
		ambient.play();
		
		txt.textContent = ("Score: " + score + "/3\t\tBattery: " + battery);
		
		
}


function updateGame() {
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
		
		for (var i = 0; i < fires.length; i++) {
			fires[i].playAnimation('burn');
		}
		
		ambient.update(boy.getX(), boy.getY());
		for (i = 0; i < firesounds.length; i++) {
			firesounds[i].update(boy.getX(), boy.getY())
		}
		monstersound.x = monster.getX();
		monstersound.y = monster.getY();
		monstersound.update(boy.getX(), boy.getY());
		
		if (Math.random() < 0.01) {
			monstersound.play();
		}
		
		for (i = 0; i < fires.length; i++) {
			if (game.checkCollision(boy, fires[i])) {
				fires[i].kill()
				firesounds[i].stop();
				score += 1;
			}
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

		mvelocY = 0;
		mvelocX = 0;
		

		if (game.checkCollision(monster,wall)) {
			mdirect = Math.round(Math.random() * 3);
		}
		else if (typeof(mdirect) == 'undefined') {
			mdirect = Math.round(Math.random() * 3);	
		}

		if (mdirect == 0){
			mvelocX = -100;
			mvelocY = 0;
		}
		if (mdirect == 1){
			mvelocX = 100;
			mvelocY = 0;
			}
		if (mdirect == 2){
			mvelocY = -100;
			mvelocX = 0;
		}
		if (mdirect == 3){
			mvelocY = 100;
			mvelocX = 0;
		}
		
		monster.setVelocityX(mvelocX);
		monster.setVelocityY(mvelocY);
		
		if (score >= 3){
			win = true;
			state = "showEnd";
		} else if (game.checkCollision(boy, monster) == true){
			win = false;
			state = "showEnd"
		}
		
		txt.textContent = ("Score: " + score + "/3\t\tBattery: " + battery);
}

function createMaze() {
	fires = new Array();
	firesounds = new Array();
	
	var walllength = 20;
	
	maze = '\
11111111111111111111111111111111111111111111111111\n\
10000000000000000000000000000001000000000000000001\n\
10000000000000000000000000000001000000000000000001\n\
10000000000000000000000000000001000000000000000001\n\
10000000000000000000000000000001000000000000000001\n\
10000111110000100001111100000001111111111111100001\n\
10000100000000100001000000000000000000100000000001\n\
10000100222000100001000000000000000000100000000001\n\
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
			} else if (maze[y][x] == "2") {
				fires.push(fire.create(x*walllength, y*walllength, 32, 64));
				fires[fires.length - 1].addAnimation('burn', [0, 1, 2], 10);
				firesounds.push(new soundSource(x*walllength, y*walllength, snd_alien.cloneNode(), audioContext, gain = 0.1));
				firesounds[firesounds.length - 1].play();
			}
		}
	}
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
