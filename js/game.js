
	var game = new Game(1000, 600, 'dark maze');

	const MAX_BATTERY = 15;
	const CHARGE = 0.1;
	
	var player, boy, floor, fire;
	var floorsprite, torch;
	var battery = MAX_BATTERY;
	var score = 0;
	var maxscore = 0;

	var keyboard, up, down, left, right;
	
	var audioContext;
	var ambient, fire1snd;
	
	var wall;
	
	var maze;
	
	var fires, firesounds;
	
	var backgroundmusic;
	
	var monstersound;
	
	var growlcount;
	
	var startButton, backButton;
	
	var txt;
	
	var win ;
	
	var time = 0;
	
	var playerstart, monsterstart;
	
	var state = "game";
	

	
function preload() {
	
	
	
	instructionButton = new Button("img/instructionButton.png", 521, 60, 400, 600);
	
	floorsprite = new Sprite("img/floor.png");
	player = new Sprite("img/boy.png", 64, 64,);
	wall = new Sprite("img/DungeonFloor.jpg");
	
	monster = new Sprite("img/monster.png");
	
	

	snd_alien = new Audio("sound/alien.wav");
	snd_drop = new Audio("sound/SingleWaterDroplet.wav");
	snd_monster = new Audio("sound/Monster Growl-SoundBible.com-344645592.wav");
	snd_collect = new Audio("sound/collect_quiet.wav");
	// perhaps for start game
	snd_start = new Audio("sound/atmosphere-fixed.wav");
	
	snd_button = new Audio("sound/buttonHover2.wav");
	
	end_game = new Sprite("img/JumpScare.png");
	gameOver = new Sprite("img/GameOver.png");
	win_game = new Sprite("img/winningScreen.png");
	win_txt1 = new Sprite(img/end_txt1");
	win_txt2 = new Sprite(img/end_txt2");
	win_txt3 = new Sprite(img/end_txt3");
	win_txt4 = new Sprite(img/end_txt4");
	fire = new Sprite("img/fire.png", 99, 133);

	
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
	
	backButton = new Button("img/backButton.png", 216, 70, 400, 330);
	
	var direction;
	var velocY;
	var velocX;
}

function create() {
	createGame();
}

function update() {
	
	if (state == "game") {
		updateGame();
	} else if (state == "lose"){
		updateLose();
	}
}

function createGameOver() {
	for(var i = 0 ; i < maxscore; i++){
		fires[i].kill();
		firesounds[i].stop();
	}
	dark1.kill();
	torch.kill();
	
	monstersound.stop()
	
	backgroundmusic = new soundSource(0, 0, snd_start, audioContext);
	backgroundmusic.play();
	
	fires[0] = fire.create(100, 150);
	fires[1] = fire.create(780, 150);
	
	fires[0].addAnimation('burn', [0, 1, 2, 1], 10);
	fires[1].addAnimation('burn', [0, 1, 2, 1], 10);
	fires[0].playAnimation('burn');
	fires[1].playAnimation('burn');	
	gameOver.create(0, 0);
	
	
	backButton.createButton();
	backButton.addOverAction(function(){
		snd_button.cloneNode().play();
		}, [1]);
	backButton.addOutAction(() => {}, [0]);
	
	backButton.addUpAction( function(){
		window.location.href = "menu.html"
		
	} );
	
	txt.textContent = '';
}

function createLose() {
	for(var i = 0 ; i < maxscore; i++){
		fires[i].kill();
		firesounds[i].stop();
	}
	dark1.kill();
	torch.kill();
	
	monstersound.stop()
	
	time = 0;
	jump = end_game.create(0, 0, 1000, 600);
	snd_monster.cloneNode().play();
	
	txt.textContent = '';
}

function updateLose() {
	time += 1;
	if (time >= 100){
		jump.kill();
		
		createGameOver();
		
		state = 'end';
	}
}


function createGame() {
	
	
		game.setBackgroundColour("#3f3f3f");
		
		floor = floorsprite.create(0, 0, 1000, 1000);
		
		
		createMaze();
		
		wall.setImmovable(true);
		
		boy = player.create(playerstart[0], playerstart[1]);
		dark1 = darkness.create(20 -977, 20-933);
		torch = torch.create( 20 -987, 20-987);

		boy.addAnimation('back', [0, 1, 2, 3], 10);
		boy.addAnimation('left', [4, 5, 6, 7], 10);
		boy.addAnimation('right', [8, 9, 10, 11], 10);
		boy.addAnimation('forward', [12, 13, 14, 15], 10);
		boy.addAnimation('still', [0], 1);

		monster = monster.create(monsterstart[0], monsterstart[1]);

		ambient = new soundSource(100, 100, snd_drop, audioContext);
		monstersound = new soundSource(0, 0, snd_monster, audioContext);
		
		
		ambient.play();
		
		txt.textContent = ("Score: " + score + "/" + maxscore + " Battery: " + Math.round(battery));
		
		
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
				snd_collect.cloneNode().play();
			}
		}
		
		dark1.setX(boy.getX() - 977 + 32);
		dark1.setY(boy.getY() - 933 + 32);
		
		torch.setX(boy.getX() - 987 + 32);
		torch.setY(boy.getY() - 987 + 32);
		
		if (space.isDown() && battery > 1) {
			dark1.setAlpha(0);
			battery = battery - (1)
		}
		
		else {
			dark1.setAlpha(1);
			battery += CHARGE
			if (battery >= MAX_BATTERY) {
				battery = MAX_BATTERY;
			}
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
		
		txt.textContent = ("Score: " + score + "/" + maxscore + " Battery: " + Math.round(battery));
		
		var scrollX = 0;
		var scrollY = 0;
		
		/*if (boy.getX() > 500) {
			scrollX = boy.getX() - 500;

		}
		if (boy.getX() < 500) {
			scrollX = 500 - boy.getX();
		}
		if (boy.getY() > 500) {
			scrollY = boy.getY() - 500;

		}
		if (boy.getY() < 500) {
			scrollY = 500 - boy.getY();
		}*/
		scrollX = boy.getX() - 500;
		scrollY = boy.getY() - 300;
		
		moveby(boy, scrollX, scrollY);
		moveby(floor, scrollX, scrollY);
		for (i=0;i<wall.children.length;i++) {
			moveby(wall.children[i], scrollX, scrollY);
		}
		for (i=0;i<fires.length;i++) {
			moveby(fires[i], scrollX, scrollY);
			firesounds[i].x -= scrollX;
			firesounds[i].y -= scrollY;
		}
		moveby(monster, scrollX, scrollY);
		
		if (score >= maxscore){
			win = true;
			createGameOver();
			state = "end";
		} else if (game.checkCollision(boy, monster) == true){
			win = false;
			createLose();
			state = "lose"
		}
}

function moveby(item, scrollX, scrollY) {
	item.setX(item.getX() - scrollX);
	item.setY(item.getY() - scrollY);
}

function createMaze() {
	fires = new Array();
	firesounds = new Array();
	
	var walllength = 20;
	
	maze = '\
11111111111111111111111111111111111111111111111111\n\
100000000p0000000000000000000001000000000000000001\n\
10000000000000000000000000000001000200000000000001\n\
10000000000000000000000000000001000000000000000001\n\
10000000000000000000000000000001000000000000000001\n\
10000111110000100001111100000001111111111111100001\n\
10000100000000100001000000000000000000100000000001\n\
10000100000000100001000000000000000000100000000001\n\
10000100000000100001000000000000000000100000000001\n\
10000100000000100001000000000000000000100000000001\n\
10000111111111100001000011111111000000100001000001\n\
10000000010002000001000000000001000002000001000001\n\
10000000010000000001000000000001000000000001000001\n\
10000000010000000001000000000001000000000001000001\n\
10000000010000000001000000000001000000000001000001\n\
11111000011111111111m00010000001111111111111100001\n\
10200000000000000001000010000000000010000000000001\n\
10000000000000000001000010000000000010000000000001\n\
10000000000000000001000010000000000010000000000001\n\
10000000000000000001000010000000000010000000000001\n\
10000100000001000001111111111111000010000011111111\n\
10000100000001000020000000000001000010000010000001\n\
10000100000001000000000000000001000010000010000001\n\
10000100000001000000000000000001000010000010000001\n\
10000100000001000000000000000001000010000000000001\n\
10000111111111111111111111000001000010000000000001\n\
10000000000001000000000000000001000010000000000001\n\
10000000000001000000000000000001000010000000000001\n\
10000000000001000000000000000001000011111110000001\n\
10000000000001000000000000000001000000020000000001\n\
11111111000001000001111111111111000000000000000001\n\
10200000000001000001000010000000000000000000000001\n\
10000000000001000001000010000000000000000000000001\n\
10000000000001111111000010000000000000000000111111\n\
10000000000001000000000010000000000000000000100001\n\
10000011111111000000000011111111111111000000100001\n\
10000010000001000000000000000000200000000000100001\n\
10000010000001000000000000000000000000000000100001\n\
10000010000001000000000000000000000000000000100001\n\
10000000000001000000000000000000000000000000100001\n\
10000000000001111111000000000000111111111111100001\n\
10000000000000000002000000000000000000000200000001\n\
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
				fires[fires.length - 1].addAnimation('burn', [0, 1, 2, 1], 10);
				firesounds.push(new soundSource(x*walllength, y*walllength, snd_alien.cloneNode(), audioContext, gain = 0.1));
				firesounds[firesounds.length - 1].play();
				maxscore += 1;
			} else if (maze[y][x] == "p") {
				playerstart = [x*walllength, y*walllength];
			} else if (maze[y][x] == "m") {
				monsterstart = [x*walllength, y*walllength]
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
