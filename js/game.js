//game context
var game = new Game(1000, 600, 'dark maze');

//sprites
var spr_floor, spr_boy, spr_monster, spr_fire, spr_dark;
var endGame, gameOver;
var jump;
var backButton;

//objects and groups
var floor, boy, monster, darkness, torch;
var wall;
var fires, firesounds;

//audio stuff
var audioContext;
var snd_alien, snd_drop, snd_monster, snd_collect, snd_start, snd_button

var ambient, backgroundmusic, monstersound, firesounds;

//input
var keyboard, up, down, left, right;

//game stuff
const MAX_BATTERY = 15;
const CHARGE = 0.1;

var battery = MAX_BATTERY;
var score = 0;
var maxscore = 0;
var txt;
var time = 0;

var win;
var direction;
var velocY;
var velocX;
var mdirect;
var mvelocX;
var mvelocY;

var playerstart, monsterstart;
var scrollX, scrollY;

var state = "game";
	
function preload() {
	//preload assets
	spr_floor = new Sprite("img/floor.png");
	spr_boy = new Sprite("img/boy.png", 64, 64,);
	spr_monster = new Sprite("img/monster.png");
	
	wall = new Sprite("img/DungeonFloor.jpg");
	endGame = new Sprite("img/JumpScare.png");
	gameOver = new Sprite("img/GameOver.png");
	spr_fire = new Sprite("img/fire.png", 99, 133);
	
	//preload overlays
	spr_dark = new Sprite("img/WhiteHole.png")
	spr_torch = new Sprite('img/torched.png');

	//preload back button
	backButton = new Button("img/backButton.png", 216, 70, 400, 330);
	
	//preload sounds
	snd_alien = new Audio("sound/alien.wav");
	snd_drop = new Audio("sound/SingleWaterDroplet.wav");
	snd_monster = new Audio("sound/Monster Growl-SoundBible.com-344645592.wav");
	snd_collect = new Audio("sound/collect_quiet.wav");
	snd_start = new Audio("sound/atmosphere-fixed.wav");
	snd_button = new Audio("sound/buttonHover2.wav");
	
	//set up text
	txt = document.querySelector('#gametext');
	
	//set up audio
	audioContext = new AudioContext();
	
	//set up input
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();
	space = keyboard.createSpaceKey();
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

//clears everything
function clearGame() {
	for(var i = 0 ; i < maxscore; i++){
		fires[i].kill();
		firesounds[i].stop();
	}
	darkness.kill();
	torch.kill();
	
	monstersound.stop()
	
	txt.textContent = '';
}

//creates the game over screen
function createGameOver() {
	clearGame();
	
	//add background music
	backgroundmusic = new soundSource(0, 0, snd_start, audioContext);
	backgroundmusic.play();
	
	//add fires
	fires[0] = spr_fire.create(100, 150);
	fires[1] = spr_fire.create(780, 150);
	
	fires[0].addAnimation('burn', [0, 1, 2, 1], 10);
	fires[1].addAnimation('burn', [0, 1, 2, 1], 10);
	fires[0].playAnimation('burn');
	fires[1].playAnimation('burn');	
	//add game over screen
	gameOver.create(0, 0);
	
	//add back button
	backButton.createButton();
	backButton.addOverAction(function(){
		snd_button.cloneNode().play();
		}, [1]);
	backButton.addOutAction(() => {}, [0]);
	
	backButton.addUpAction( function(){
		window.location.href = "menu.html"
		
	} );
}

//creates the jumpscare
function createLose() {
	clearGame();
	
	time = 0;
	jump = endGame.create(0, 0, 1000, 600);
	snd_monster.cloneNode().play();
}

//when the timer reaches 100, clears the jumpscare and goes to game over
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
	
	floor = spr_floor.create(0, 0, 1000, 1000);
	
	
	createMaze();
	
	wall.setImmovable(true);
	
	boy = spr_boy.create(playerstart[0], playerstart[1]);
	darkness = spr_dark.create(20 -977, 20-933);
	torch = spr_torch.create( 20 -987, 20-987);

	boy.addAnimation('back', [0, 1, 2, 3], 10);
	boy.addAnimation('left', [4, 5, 6, 7], 10);
	boy.addAnimation('right', [8, 9, 10, 11], 10);
	boy.addAnimation('forward', [12, 13, 14, 15], 10);
	boy.addAnimation('still', [0], 1);

	monster = spr_monster.create(monsterstart[0], monsterstart[1]);

	ambient = new soundSource(100, 100, snd_drop, audioContext);
	monstersound = new soundSource(0, 0, snd_monster, audioContext, dmp = 3);
	
	
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
		
		darkness.setX(boy.getX() - 977 + 32);
		darkness.setY(boy.getY() - 933 + 32);
		
		torch.setX(boy.getX() - 987 + 32);
		torch.setY(boy.getY() - 987 + 32);
		
		if (space.isDown() && battery > 1) {
			darkness.setAlpha(0);
			battery = battery - (1)
		}
		
		else {
			darkness.setAlpha(1);
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
		
		scrollX = 0;
		scrollY = 0;
		
		scrollX = boy.getX() - 500 + 32;
		scrollY = boy.getY() - 300 + 32;
		
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

//moves an item by a value, used for scrolling
function moveby(item, scrollX, scrollY) {
	item.setX(item.getX() - scrollX);
	item.setY(item.getY() - scrollY);
}

//creates the game level
function createMaze() {
	fires = new Array();
	firesounds = new Array();
	
	var walllength = 20;
	
	var maze = '\
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
				fires.push(spr_fire.create(x*walllength, y*walllength, 32, 64));
				fires[fires.length - 1].addAnimation('burn', [0, 1, 2, 1], 10);
				firesounds.push(new soundSource(x*walllength, y*walllength, snd_alien.cloneNode(), audioContext, gain = 0.7, dmp = 5));
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

//class for a source of sound, used for directional audio
function soundSource(x, y, snd, audioContext, gain = 1, loop = true, dmp = 10) {
	this.x = x;
	this.y = y;
	this.snd = snd;
	this.dmp = dmp;
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
	
	this.update = function(playerx, playery, dmp = 1) {
		var x = (this.x - playerx) / dmp;
		var y = (this.y - playery) / dmp;
		
		this.panner.positionX.value = x;
		this.panner.positionY.value = y;
	}	
}
