class Quiz{
  constructor(num, query, queryType, level, category, rightAnswersNum, rightAnswers, answers, gameType){
    this.num = num;
    this.query = query;
    this.queryType = queryType;
    this.level = level;
    this.category = category;
    this.rightAnswersNum = rightAnswersNum
    this.rightAnswers = rightAnswers;
    this.answers = answers; // all answers (right and wrong)
    this.bubbles = [];
    this.gameType = gameType;
    this.create();
  }

  create(){
    shuffleArray(this.answers);
    for (var i = 0; i < this.answers.length; i++) {
      var x;
      var y;
      let col = color(random(255), random(255), random(255));
      var velocity;
      var movement;

      var img;
      if (this.category != 'companies'){
        img = loadImage('img/' + this.category + '/' + this.answers[i]  + '.png');
      }

      var bubbleType = 'img';
      if (this.queryType == 'img'){
        bubbleType = 'text';
      }
      else{
        bubbleType = 'img';
      }

      if (this.gameType == 1){
        x = (i + 1) * (SCREEN_WIDTH - this.answers.length * BUBBLE_RADIUS) / (this.answers.length - 1);
        y = 0;
        velocity = createVector(0, random(BUBBLE_MIN_SPEED * this.level, BUBBLE_MAX_SPEED * this.level));
        movement = 1;
      }
      else if (this.gameType == 2){
        x = random(SCREEN_WIDTH);
        y = random(SCREEN_HEIGHT);
        velocity = createVector(random(-this.level * 2, this.level * 2), random(-this.level * 2, this.level * 2));
        movement = 2;
      }
      else{
        x = random(SCREEN_WIDTH);
        y = random(SCREEN_HEIGHT);
        velocity = createVector(random(-this.level * 2, this.level * 2), random(-this.level * 2, this.level * 2));
        movement = 3;
      }
      let bubble = new Bubble(x, y, BUBBLE_RADIUS, col, bubbleType, this.answers[i], velocity, img, movement, true);
      this.bubbles.push(bubble);
    }
  }

  checkAnswer(bubble){
    return this.rightAnswers.includes(bubble.text);
  }
}
