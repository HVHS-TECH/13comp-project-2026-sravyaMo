/*******************************************************/
// alienAnnihilator.js
// spaceship kills aliens and avoids both aliens and asteroids
// Written by Sravya Moparthi
// term 1 2026
/*******************************************************/

/********************************************************/
// variables
/********************************************************/

const LS_COL_C = 'black';
const LS_COL_B = 'cyan';
console.log('%c alienAnnihilator.js',
			'color: blue; background-color: white;');

const ALIENH = 50;
const ALIENW = ALIENH;
const ALIENVELMIN = 7;
const ALIENVELMAX = 10;
const ASTEROIDH = 70;
const ASTEROIDW = ASTEROIDH;
const ASTEROIDVELMIN = 6;
const ASTEROIDVELMAX = 10;
const LASERW = 7;
const LASERH = 40;
const LASERVEL = 5;
const SPACESHIPX = 700;
const SPACESHIPY = 600;
const LASERX = SPACESHIPX;
const LASERY = SPACESHIPY;
const MAXLIVES = 3;
const MINSCORE = 0;
var wallGroup, wallTop, wallBot;
var startBtn;
var backBtn;
var lives = MAXLIVES;
var score = MINSCORE;
var gameActive = false;
var laser;
let GamePlayBG;

/******************************************************/
// preload()
/******************************************************/
function preload() {
	// image preloads
	imgSS = loadImage('/images/spaceship.png');
	imgasteroidA = loadImage('/images/asteroidA.png');
	imgalien = loadImage('/images/alien.png');
	imgendScreen = loadImage('/images/endScreen.png');
	GamePlayBG = loadImage('/images/homepage.png');
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	console.log("setup: ");
	createCanvas(windowWidth - 20, windowHeight - 10,);
	
	createWalls();
	createLaser();
	createSpaceship();
	createAsteroids();
	createAliens();
	createStartBtn();
	createBackBtn();

	textSize(25);
    fill(255);
    stroke(0);
    strokeWeight(4);
}
	  
/********************************************************/
// createSpaceship()
// Called by setup()
// Creates spaceship
// Input:  n/a
// return: n/a
/********************************************************/
function createSpaceship() {
	console.log("createSpaceship()");
	spaceship = new Sprite(SPACESHIPX, SPACESHIPY, 85, 80, 'k');
	spaceship.image = (imgSS);
 	imgSS.resize(100, 80);
}

/********************************************************/
// createAsteroids()
// Called by setup()
// Input: n/a
// return: n/a
/********************************************************/
function createAsteroids() {
    console.log("createAsteroids()");

	asteroidGroup = new Group();
	asteroidGroup.collides(spaceship, spaceshipHitAsteroid);
	asteroidGroup.collides(wallBot, asteroidHitWall);

	for (i = 0; i < 2; i++) {
		asteroid = new Sprite(random(ASTEROIDW/2, width-ASTEROIDW/2),
						   random(ASTEROIDH/2, 2 * ASTEROIDH),
						   ASTEROIDW, ASTEROIDH, "d");
		asteroid.image = (imgasteroidA);
		imgasteroidA.resize(85, 70);
		//asteroid.vel.y = random(ASTEROIDVELMIN, ASTEROIDVELMAX);
		asteroid.vel.x = 0;
		asteroidGroup.add(asteroid);
	}
}

/*********************************************************/
// createWalls()
// Called by setup()
// Input: n/a
// return: n/a
/*********************************************************/
function createWalls() {
	console.log("createWalls()");

	wallGroup = new Group();

	wallLH = new Sprite(0, height/2, 8, height, 'k' );
	wallLH.color = 'black';
	wallRH = new Sprite(width, height/2, 8, height, 'k' );
	wallRH.color = 'purple';
	wallTop = new Sprite(width, 0, 2 * width, 8, 'k' );
	wallTop.color = 'blue';
	wallGroup.add(wallTop);
	wallBot = new Sprite(width, height, 2 * width, 8, 'k' );
	wallBot.color = 'grey';
	wallGroup.add(wallBot);
}

/********************************************************/
// createStartBtn()
// Called by setup()
// Creates start button
// Input:  n/a
// return: n/a
/********************************************************/
function createStartBtn() {
	startBtn = new Sprite(60, 40, 80, 30, 's');
	startBtn.text = "start";
	startBtn.color = "green";
}

/********************************************************/
// createBackBtn()
// Called by setup()
// Creates back button
// Input:  n/a
// return: n/a
/********************************************************/
function createBackBtn() {
	backBtn = new Sprite(60, 90, 80, 30, 's');
	backBtn.text = "back";
	backBtn.color = "blue";
}

/*******************************************************/
// createAliens()
// Called by ?
// Input 
/*******************************************************/
function createAliens() {
	console.log("createAliens()");

	alienGroup = new Group();
	alienGroup.collides(spaceship, spaceshipHitAlien);
	alienGroup.collides(wallBot, alienHitWall);
	alienGroup.collides(laser, laserHitAlien); // For laser

	for (i = 0; i < 3; i++) {
		alien = new Sprite(random(ALIENW/2, width-ALIENW/2),
						   random(ALIENH/2, 2 * ALIENH),
						   ALIENW, ALIENH, "d");
		alien.image = (imgalien);
		imgalien.resize(90, 70);
		//alien.vel.y = random(ALIENVELMIN, ALIENVELMAX);
		alien.vel.x = 0;
		alienGroup.add(alien);
	}
}

/********************************************************/
// createLaser()
// Called by setup()
// Creates shooting laser
// Input:  n/a
// return: n/a
/********************************************************/
function createLaser() {
	console.log("createLaser()");

	laser = new Sprite(SPACESHIPX, SPACESHIPY, LASERW, LASERH, "k");
	laser.color = 'white';
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	clear();
	background(GamePlayBG);

	if (lives <= 0) {
		text("You have killed"+score+"aliens",width/2, height/2);
		background(imgendScreen);
        //noloop();
		startBtn.color = 'green';
	 	startBtn.text = "play";
		backBtn.color = 'blue';
	 	backBtn.text = "back";
	 	asteroidGroup.remove();
	 	alienGroup.remove();
	 	spaceship.remove();
	 	laser.remove();
	 	gameActive=false;
	}
 
	// Detect spaceship controls
	if (kb.pressing('left')) {
	  	spaceship.vel.x = -10; // Move the box to the left when you press the left arrow key
		laser.vel.x = -10;
	}
	else if (kb.pressing ('right')) {
	  	spaceship.vel.x = 10; // Move the box to the right when you press the right arrow key
		laser.vel.x = 10;
	}
	if (kb.released('left')) {
	  	spaceship.vel.x = 0; // pauses movement to the left
		laser.vel.x = 0;
	}
	if (kb.released('right')) {
		spaceship.vel.x = 0; // pauses movement to the right
		laser.vel.x = 0;
	}

	// Detect fire
	if (kb.presses('spacebar')) {
		console.log('%c draw(): FIRE',
			'color: ' + LS_COL_C + '; background-color: ' + LS_COL_B + ';');
			laser.vel.y = -30;
	}

	// Detect mouse START/PAUSE
	if (startBtn.mouse.hovering()) mouse.cursor = 'grab';
	else mouse.cursor = 'default';

	// Detect mouse START/PAUSE
	if (backBtn.mouse.hovering()) mouse.cursor = 'grab';
	else mouse.cursor = 'default';


	if (backBtn.mouse.presses()) {
		console.log("back pressed");
		window.location.href='aa_lobby.html';
	}

	if (startBtn.mouse.presses()) {
		console.log("pressed");
		if (lives <= 0) {
			window.location.href='aa_game.html';
		}
		if (gameActive==false) {
			startBtn.color = 'red';
			startBtn.text = "pause";
			asteroidGroup.vel.y = random(ASTEROIDVELMIN, ASTEROIDVELMAX);
			alienGroup.vel.y = random(ALIENVELMIN, ALIENVELMAX);
			gameActive=true;
		}
		else {
			startBtn.color = 'green';
			startBtn.text = "play";
			asteroidGroup.vel.y = 0;
			alienGroup.vel.y = 0;
			asteroidGroup.vel.x = 0;
			alienGroup.vel.x = 0;
			gameActive=false;
		}
	}
	
	// detect lase hits top wall
	if (laser.y < -laser.h) {
		laserHitWall();
	}
	text("score: "+score+"", 20, 220);
	text("lives: "+lives+"",20, 180);
}

/*******************************************************/
// laserHitAlien(_alien, _laser)
// Called by callback registered in setup
// Input alien that was hit by laser
/*******************************************************/
function laserHitAlien(_alien, _laser) {
	console.log('%c laserHitAlien(): ',
		'color: white; background-color: purple;');

	_alien.x = random(ALIENW/2, width-ALIENW/2);
	_alien.y = random(ALIENH/2, 2 * ALIENH);
	score++;
}

/*******************************************************/
// spaceshipHitAlien(_alien, _spaceship)
// Called by callback registered in setup
// Input alien that was hit spaceship
/*******************************************************/
function spaceshipHitAlien(_alien, _spaceship) {
	console.log('%c spaceshipHitAlien(): ',
	'color: ' + LS_COL_C + '; background-color: ' + LS_COL_B + ';');

	_alien.x = random(ALIENW/2, width-ALIENW/2);
	_alien.y = random(ALIENH/2, 2 * ALIENH);
	lives--;
}

/*******************************************************/
// alienHitWall(_alien, _wallBot)
// Called by callback registered in setup
// Input alien that was hit bottom wall
/*******************************************************/
function alienHitWall(_alien, _wallBot) {
	//console.log('%c alienHitWall(): ',
	//	'color: ' + LS_COL_C + '; background-color: ' + LS_COL_B + ';');

	_alien.x = random(ALIENW/2, width-ALIENW/2);
	_alien.y = random(ALIENH/2, 2 * ALIENH);
	_alien.vel.y = random(ALIENVELMIN, ALIENVELMAX);
	_alien.vel.x = 0;
	_alien.rotation.vel = 0;
	_alien.rotation = 0;
}

/*******************************************************/
// laserHitWall()
// Called by draw()
/*******************************************************/
function laserHitWall() {
	console.log('%c laserHitWall(): ',
		'color: white; background-color: purple;');
	
	laser.y = LASERY;
	laser.vel.x = 0;
	laser.vel.y = 0;
	laser.rotation.vel = 0;
	laser.rotation = 0;
}

/*******************************************************/
// asteroidHitWall(_asteroid, _wallBot)
// Called by callback registered in setup
// Input asteroid that hit bottom wall
/*******************************************************/
function asteroidHitWall(_asteroid, _wallBot) {
	//console.log('%c asteroidHitWall(): ',
	//	'color: ' + LS_COL_C + '; background-color: ' + LS_COL_B + ';');
	
	_asteroid.x = random(ASTEROIDW/2, width-ASTEROIDW/2);
	_asteroid.y = random(ASTEROIDH/2, 2 * ASTEROIDH);
	_asteroid.vel.y = random(ASTEROIDVELMIN, ASTEROIDVELMAX);
	_asteroid.vel.x = 0;
	_asteroid.rotation.vel = 0;
	_asteroid.rotation = 0;
}

/*******************************************************/
// spaceshipHitAsteroid(_asteroid, _spaceship)
// Called by callback registered in setup
// Input asteroid that hit spaceship
/*******************************************************/
function spaceshipHitAsteroid(_asteroid, _spaceship) {
	console.log('%c spaceshipHitAsteroid(): ',
		'color: ' + LS_COL_C + '; background-color: ' + LS_COL_B + ';');
	
	_asteroid.x = random(ASTEROIDW/2, width-ASTEROIDW/2);
	_asteroid.y = random(ASTEROIDH/2, 2 * ASTEROIDH);
	lives--;
}
 


 /*******************************************************/
 //  END OF APP
 /*******************************************************/