var diceAmount = [];
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
    this.amount = Math.floor((Math.random() * 6) + 1);
  }
}

Dice.prototype.toggleHold = function() {
  this.hold = !this.hold;
}

var diceOne = new Dice(0, false, 1);
var diceTwo = new Dice(0, false, 2);
var diceThree = new Dice(0, false, 3);
var diceFour = new Dice(0, false, 4);
var diceFive = new Dice(0, false, 5);


function getDice() {
  diceAmount.push(diceOne.amount);
  diceAmount.push(diceTwo.amount);
  diceAmount.push(diceThree.amount);
  diceAmount.push(diceFour.amount);
  diceAmount.push(diceFive.amount);

  return diceAmount.sort();
}

function multiples(number) {
  var count = 0;
  for (var i = 0; i < diceAmount.length; i++) {
    if (diceAmount[i] === number) {
      count ++;
    }
  }
  return count * number;
}

function yahtzee() {
  for (var i = 0; i < diceAmount.length; i++) {
    if (diceAmount[i] !== diceAmount[0]) {
      return 0;
    }
  }
  return 50;
}

// Play.prototype.AddPoints = function(amount){
//   this.score = amount;
// }

// function Play(name, available, score) {
//   this.name =  name;
//   this.available = available;
//   this.score = score;
// }

// var ones = new Play("ones", true, 0);
// var twos = new Play("twos", true, 0);
// var threes = new Play("threes", true, 0);
// var fours = new Play("fours", true, 0);
// var fives = new Play("fives", true, 0);
// var sixes = new Play("sixes", true, 0);
// var bonus = new Play("bonus", true, 0);
// var threeKind = new Play("threeKind", true, 0);
// var fourKind = new Play("fourKind", true, 0);
// var fullHouse = new Play("fullHouse", true, 0);
// var smallStraight = new Play("smallStraight", true, 0);
// var largeStraignt = new Play("largeStraignt", true, 0);
// var yahtzee = new Play("yahtzee", true, 0);
// var extraYahtzee = new Play("extraYahtzee", true, 0);
// var chance = new Play("chance", true, 0);

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
    diceAmount = [];

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

    console.log(getDice());
    console.log(multiples(1));
    console.log(multiples(4));
  })

  // $(".hold").click(function(){
  //   var dice = this.id;
  //   dice.markHold();
  // })

  $("#diceOne").click(function() {
    diceOne.toggleHold();
    $(this).text(function(i, text){
        return text === "Hold" ? "Unhold" : "Hold";
    })
  })
  $("#diceTwo").click(function() {
    diceTwo.toggleHold();
    $(this).text(function(i, text){
        return text === "Hold" ? "Unhold" : "Hold";
    })
  })
  $("#diceThree").click(function() {
    diceThree.toggleHold();
    $(this).text(function(i, text){
        return text === "Hold" ? "Unhold" : "Hold";
    })
  })
  $("#diceFour").click(function() {
    diceFour.toggleHold();
    $(this).text(function(i, text){
        return text === "Hold" ? "Unhold" : "Hold";
    })
  })
  $("#diceFive").click(function() {
    diceFive.toggleHold();
    $(this).text(function(i, text){
        return text === "Hold" ? "Unhold" : "Hold";
    })
  })

  $("#playOnes").click(function() {
    $("#result-ones").text(multiples(1));
    $("#playOnes").hide();
  })

  $("#playTwos").click(function() {
    $("#result-twos").text(multiples(2));
    $("#playTwos").hide();
  })

  $("#playThrees").click(function() {
    $("#result-threes").text(multiples(3));
    $("#playThrees").hide();
  })

  $("#playFours").click(function() {
    $("#result-fours").text(multiples(4));
    $("#playFours").hide();
  })

  $("#playFives").click(function() {
    $("#result-fives").text(multiples(5));
    $("#playFives").hide();
  })

  $("#playSixes").click(function() {
    $("#result-sixes").text(multiples(6));
    $("#playSixes").hide();
  })

  $("#playYahtzee").click(function() {
    $("#result-yahtzee").text(yahtzee());
    $("#playYahtzee").hide();
  })

})
