function Player(name, score, id) {
  this.name = name;
  this.score = score;
  this.id = id;
}

function Dice(number, hold, id) {
  this.number = number;
  this.hold = hold;
  this.id = id;
}

Dice.prototype.roll = function() {
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

function ScoreCard(){};


Play.prototype.AddPoints = function(amount){
  this.score = amount;
}

function Play(name, available, score) {
  this.name =  name;
  this.available = available;
  this.score = score;
}

var playNames = ["ones", "twos", "threes", "fours", "fives", "sixes", "bonus", "threeKind", "fourKind", "fullHouse", "smallStraight", "largeStraight", "yahtzee", "extraYahtzee", "chance"];

var ones = new Play("ones", true, 0);
var twos = new Play("twos", true, 0);
var threes = new Play("threes", true, 0);
var fours = new Play("fours", true, 0);
var fives = new Play("fives", true, 0);
var sixes = new Play("sixes", true, 0);
var bonus = new Play("bonus", true, 0);
var threeKind = new Play("threeKind", true, 0);
var fourKind = new Play("fourKind", true, 0);
var fullHouse = new Play("fullHouse", true, 0);
var smallStraight = new Play("smallStraight", true, 0);
var largeStraignt = new Play("largeStraignt", true, 0);
var yahtzee = new Play("yahtzee", true, 0);
var extraYahtzee = new Play("extraYahtzee", true, 0);
var chance = new Play("chance", true, 0);

var playerOne = new Player("Nicole", 0, 1);
