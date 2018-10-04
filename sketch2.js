const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 600;


var gameType = 2;

var ship;

var score = 0;
var timer = 0;
var gameIsPaused = false;

var quizzes = [];
var currQuiz;
var quizFinished = false;

function preload(){
	loadQuizzes();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
	setShip();
	updateTimer();
}

function draw() {
	runFlyingBubbles();
}

function runFlyingBubbles(){
  background(0);
	checkNextQuiz();
	showScoreBoard();
	moveBubbles();
	showQuiz();
	ship.show();
	ship.update();
	fireShipRockets();
	checkHits();
	deleteRockets();
}

function showScoreBoard(){
  textAlign(CENTER);
  textStyle(NORMAL);
  textSize(14);
  textFont('Arial');
  strokeWeight(1);
  fill(240);
  text(`Level: ${currQuiz.level}\t|\tQuiz: ${currQuiz.num}\t|\tTime: ${timer}\t|\tScore: ${score}\t|\tCategory: ${currQuiz.category}`, 200, 20);
}

function incTimer(){
	timer++;
}

function updateTimer(){
	setInterval(incTimer, 1000);
}

function shuffleArray(arr){
	for (var i = 0; i < arr.length; i++) {
		var j = floor(random(arr.length));
		var tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
}

function finishGame(){
	finishQuiz();
	currQuiz.query = '';
	alert('Your score: ' + score + ' within ' + timer + ' sec');
	noLoop();
}

function checkNextQuiz(){
	if (currQuiz.bubbles.length == 0 && !quizFinished){
		quizFinished = true;
	}

	if (quizFinished){
		quizFinished = false;
		if (quizzes.length > 0){
			currQuiz = quizzes[0];
			quizzes.splice(0, 1);
		}
		else{
			finishGame();
		}
	}
}

function finishQuiz(){
	quizFinished = true;
	currQuiz.bubbles.splice(0, currQuiz.bubbles.length);
}

function loadQuizzes(){
	// var lines = loadStrings('flags_quiz.txt');
	var lines = db_quizzes;
	for (var i = 0; i < lines.length; i++) {
		var fields = lines[i].split(',');
		var num = fields[0];
		var query = fields[1];
		var queryType = fields[2];
		var level = fields[3];
		var category = fields[4];
		var rightAnswersNum = fields[5]
		var rightAnswers = fields.slice(6, 6 + int(rightAnswersNum));
		var answers = fields.splice(6, fields.length - 6);

		if (queryType == 'img' && category == 'companies'){
			let queryImg = loadImage('img/' + category + '/' + query  + '.png');
			var quiz = new Quiz(num, queryImg, queryType, level, category, rightAnswersNum, rightAnswers, answers, gameType);
		}
		else{
			var quiz = new Quiz(num, query, queryType, level, category, rightAnswersNum, rightAnswers, answers, gameType);
		}
		quizzes.push(quiz);
	}
	currQuiz = quizzes[0];
}

function showQuiz(){
	if (currQuiz.queryType == 'text'){
		textAlign(CENTER);
		textStyle(NORMAL);
		textSize(16);
		textFont('Arial');
		strokeWeight(1);
		fill(100, 200, 10);
		text(currQuiz.query, 200, 50);
	}
	else if (currQuiz.queryType.length > 1){
		image(currQuiz.query, 200, 50, 2 * BUBBLE_RADIUS, 2 * BUBBLE_RADIUS);
	}
}

function showScoreBoard(){
	textAlign(CENTER);
	textStyle(NORMAL);
	textSize(14);
	textFont('Arial');
	strokeWeight(1);
	fill(240);
	text(`Level: ${currQuiz.level}\t|\tQuiz: ${currQuiz.num}\t|\tTime: ${timer}\t|\tScore: ${score}\t|\tCategory: ${currQuiz.category}`, 200, 20);
}

function moveBubbles(){
	for (var i = 0; i < currQuiz.bubbles.length; i++) {
    checkShipCollision(ship, i);
		currQuiz.bubbles[i].show();
		currQuiz.bubbles[i].update();
	}
}

function checkShipCollision(ship, i){
	if (ship.collide(currQuiz.bubbles[i])){
		gameOver();
	}
}

function gameOver(){
	console.log('Game over');
	noLoop();
}

function deleteRockets(){
	for (var i = 0; i < ship.rockets.length; i++) {
		if (ship.rockets[i].toDelete){
			ship.rockets.splice(i, 1);
		}
	}
}

function fireShipRockets(){
	for (var rocket of ship.rockets) {
		rocket.show();
		rocket.update();
	}
}

function setShip(){
	ship = new Ship(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SHIP_LEN);
}

function checkHits(){
	for (var i = currQuiz.bubbles.length - 1; i >= 0; i--){
		for (var j = ship.rockets.length - 1; j >= 0 ; j--) {
			if (ship.rockets[j].toDelete){
				ship.rockets.splice(j, 1);
			}
			else if (ship.rockets[j].hits(currQuiz.bubbles[i])){
				ship.rockets.splice(j, 1);
				currQuiz.bubbles[i].getHit();
				if (currQuiz.bubbles[i].life <= 0){
					if (currQuiz.checkAnswer(currQuiz.bubbles[i])){
						console.log('Good');
						score += 10;
						currQuiz.bubbles.splice(i, 1);
						currQuiz.rightAnswersNum--;
						if (currQuiz.rightAnswersNum == 0){
							finishQuiz();
						}
						return;
					}
					else{
						console.log('Wrong');
						score -= 5;
					}
				}
				return;
			}
		}
	}
}

function keyReleased(){
	ship.setAccelerating(false);
	ship.setRotation(0);
	ship.slowDown();
}

function keyPressed(){
	if (keyCode == ESCAPE){
		if (!gameIsPaused){
			gameIsPaused = true;
			noLoop();
		}
		else{
			gameIsPaused = false;
			loop();
		}
	}
	if (keyCode === UP_ARROW){
		ship.setAccelerating(true);
	}
	if (keyCode === DOWN_ARROW){
		// ship.reverse();
	}
	if (keyCode === RIGHT_ARROW){
		ship.setRotation(ROTATE_ACC);
	}
	if (keyCode === LEFT_ARROW){
		ship.setRotation(-ROTATE_ACC);
	}
	if (key === ' '){
		ship.fireRocket();
		score -= SHOOT_PENALTY_PTS;
	}
}
