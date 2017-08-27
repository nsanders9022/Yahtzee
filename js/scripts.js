function Player(name, score, id) {
  this.name = name;
  this.score = score;
  this.id = id;
}

function Dice(amount, hold, id) {
  this.amount = amount;
  this.hold = hold;
  this.id = id;
}

Dice.prototype.roll = function() {
  if (this.hold === false) {
    this.amount = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }
}

Dice.prototype.markHold = function() {
  this.hold = true;
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

var diceOne = new Dice(0, false, 1);
var diceTwo = new Dice(0, false, 2);
var diceThree = new Dice(0, false, 3);
var diceFour = new Dice(0, false, 4);
var diceFive = new Dice(0, false, 5);


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

//////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
  $("#name-form").submit(function(event) {
    event.preventDefault();

    var playerName = $("#playerName").val();

    var player1 = new Player(playerName, 0, 1)

    $("#name").text(playerName + "\'s ");
  })

  $("#playOnes").click(function() {
    $("#result-ones").text(0);
  })

  $("#roll-button").click(function() {
    diceOne.roll();
    diceTwo.roll();
    diceThree.roll();
    diceFour.roll();
    diceFive.roll();

    $("#dice-one").text(diceOne.amount);
    $("#dice-two").text(diceTwo.amount);
    $("#dice-three").text(diceThree.amount);
    $("#dice-four").text(diceFour.amount);
    $("#dice-five").text(diceFive.amount);
  })

  // $(".hold").click(function(){
  //   var dice = this.id;
  //   dice.markHold();
  // })

  $("#diceOne").click(function() {
    diceOne.markHold();
  })
  $("#diceTwo").click(function() {
    diceTwo.markHold();
  })
  $("#diceThree").click(function() {
    diceThree.markHold();
  })
  $("#diceFour").click(function() {
    diceFour.markHold();
  })
  $("#diceFive").click(function() {
    diceFive.markHold();
  })

})
