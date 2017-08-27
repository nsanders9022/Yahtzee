var diceArray = [];
var onesTotal = 0;
var twosTotal = 0;
var threesTotal = 0;
var foursTotal = 0;
var fivesTotal = 0;
var sixesTotal = 0;
var bonusTotal = 0;
var threeKindTotal = 0;
var fourKindTotal = 0;
var fullHouseTotal = 0;
var smallStraightTotal = 0;
var largeStraightTotal = 0;
var yahtzeeTotal = 0;
var extraYahtzeeTotal = 0;
var chanceTotal = 0;
var rollCount = 0;

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


function getDiceArray() {
  diceArray.push(diceOne.amount);
  diceArray.push(diceTwo.amount);
  diceArray.push(diceThree.amount);
  diceArray.push(diceFour.amount);
  diceArray.push(diceFive.amount);
  diceArray.sort();
}

function sumDiceArray() {
  var sum = 0;
  for (var i = 0; i < diceArray.length; i++) {
    sum += diceArray[i];
  }
  return sum;
}

function multiples(number) {
  var count = 0;
  for (var i = 0; i < diceArray.length; i++) {
    if (diceArray[i] === number) {
      count ++;
    }
  }
  return count * number;
}

function bonus(one, two, three, four, five, six) {
  if (one + two + three + four + five + six > 62 ) {
    return 35;
  }
  return 0;
}

function threeFourKind(number){
  var count1 = 0;
  var count2 = 0;
  var count3 = 0;
  var count4 = 0;
  var count5 = 0;
  var count6 = 0;

  for (var i = 0; i < diceArray.length; i++) {
    if (diceArray[i] === 1) {
      count1++;
    }
    if (diceArray[i] === 2) {
      count2++;
    }
    if (diceArray[i] === 3) {
      count3++;
    }
    if (diceArray[i] === 4) {
      count4++;
    }
    if (diceArray[i] === 5) {
      count5++;
    }
    if (diceArray[i] === 6) {
      count6++;
    }
  }

  if (count1 >= number || count2 >= number || count3 >= number || count4 >= number || count5 >= number || count6 >= number)
  {
    return sumDiceArray()
  }
  return 0;
}

function fullHouse() {
  if (((diceArray[0] === diceArray[1] && diceArray[2] === diceArray[0]) && (diceArray[3] === diceArray[4]) && diceArray[0] !== diceArray[4]) || ((diceArray[0] === diceArray[1]) && (diceArray[3] === diceArray[2] && diceArray[3] === diceArray[4]) && diceArray[0] !== diceArray[4])) {
    return 25;
  }
  return 0;
}

function smallStraight() {
  var count = 0
  for (var i = 0; i < diceArray.length - 1; i++) {
    if (diceArray[i] + 1 !== diceArray[i+1]) {
      count++
    }
  }
  if (count <= 1) {
    return 30;
  }
  return 0
}

function largeStraight() {

  for (var i = 0; i < diceArray.length - 1; i++) {
    if (diceArray[i] + 1 !== diceArray[i+1]) {
      return 0;
    }
  }
  return 40;
}

function yahtzee() {
  for (var i = 0; i < diceArray.length; i++) {
    if (diceArray[i] !== diceArray[0]) {
      return 0;
    }
  }
  return 50;
}

function extraYahtzee(yahtzeePoints) {

  for (var i = 0; i < diceArray.length; i++) {
    if (diceArray[i] !== diceArray[0]) {
      return 0;
    }
  }
  if (yahtzeePoints === "50") {
    return 100;
  } else if (yahtzeePoints === "") {
    alert("You must fill in yahtzee first")
  } else {
    return 0;
  }
}

function chance(){
  return sumDiceArray();
}

function leftTotal(one, two, three, four, five, six, bonus) {
  return one + two + three + four + five + six + bonus;
}

function rightTotal(threeK, fourk, fullH, smallS, largeS, yahtzee, extraY, chance) {
  return threeK + fourk + fullH + smallS + largeS + yahtzee + extraY + chance;
}

function grandTotal(left, right) {
  return left + right;
}

//////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {

  function updateTotals(){

    rollCount = 0;
    $("#roll-button").show();

    $("#result-bonus").text(bonus(onesTotal, twosTotal, threesTotal, foursTotal, fivesTotal, sixesTotal));

    bonusTotal = parseInt($("#result-bonus").text());

    $("#result-left-total").text(leftTotal(onesTotal, twosTotal, threesTotal, foursTotal, fivesTotal, sixesTotal, bonusTotal));

    $("#result-right-total").text(rightTotal(threeKindTotal, fourKindTotal, fullHouseTotal, smallStraightTotal, largeStraightTotal, yahtzeeTotal,extraYahtzeeTotal, chanceTotal));

    $("#result-overall-total").text(grandTotal(parseInt($("#result-left-total").text()), parseInt($("#result-right-total").text())));

    // diceArray = [];
    $(".hold").hide()

    diceOne.amount = "";
    diceOne.hold = false;
    $("#diceOne").text("Hold");
    $("#dice-one").text(diceOne.amount);


    diceTwo.amount = "";
    diceTwo.hold = false;
    $("#diceTwo").text("Hold");
    $("#dice-two").text(diceTwo.amount);

    diceThree.amount = "";
    diceThree.hold = false;
    $("#diceThree").text("Hold");
    $("#dice-three").text(diceThree.amount);

    diceFour.amount = "";
    diceFour.hold = false;
    $("#diceFour").text("Hold");
    $("#dice-four").text(diceFour.amount);

    diceFive.amount = "";
    diceFive.hold = false;
    $("#diceFive").text("Hold");
    $("#dice-five").text(diceFive.amount);
  }

  $("#name-form").submit(function(event) {
    event.preventDefault();

    var playerName = $("#playerName").val();

    var player1 = new Player(playerName, 0, 1)

    $("#name").text(playerName + "\'s ");

    $(".form-div").hide();
  })

  $("#roll-button").click(function() {
    diceArray = [];
    rollCount++;
    diceOne.roll();
    diceTwo.roll();
    diceThree.roll();
    diceFour.roll();
    diceFive.roll();

    // $("#dice-one").text(diceOne.amount);
    $("#dice-one").html('<img class="dice" alt="' + diceOne.amount + ' " src="img/' + diceOne.amount + '.svg">');

    $("#dice-two").html('<img class="dice" alt="' + diceOne.amount + ' " src="img/' + diceTwo.amount + '.svg">');
    $("#dice-three").html('<img class="dice" alt="' + diceOne.amount + ' " src="img/' + diceThree.amount + '.svg">');
    $("#dice-four").html('<img class="dice" alt="' + diceOne.amount + ' " src="img/' + diceFour.amount + '.svg">');
    $("#dice-five").html('<img class="dice" alt="' + diceOne.amount + ' " src="img/' + diceFive.amount + '.svg">');

    getDiceArray();

    $(".hold").show();

    if (rollCount > 2) {
      $("#roll-button").hide();
      $(".hold").hide();
    }


  })

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
    onesTotal = parseInt($("#result-ones").text());

    updateTotals();
  })

  $("#playTwos").click(function() {
    $("#result-twos").text(multiples(2));
    $("#playTwos").hide();
    twosTotal = parseInt($("#result-twos").text());

    updateTotals();
  })

  $("#playThrees").click(function() {
    $("#result-threes").text(multiples(3));
    $("#playThrees").hide();
    threesTotal = parseInt($("#result-threes").text());

    updateTotals();
  })

  $("#playFours").click(function() {
    $("#result-fours").text(multiples(4));
    $("#playFours").hide();
    foursTotal = parseInt($("#result-fours").text());

    updateTotals();
  })

  $("#playFives").click(function() {
    $("#result-fives").text(multiples(5));
    $("#playFives").hide();
    fivesTotal = parseInt($("#result-fives").text());

    updateTotals();
  })

  $("#playSixes").click(function() {
    $("#result-sixes").text(multiples(6));
    $("#playSixes").hide();
    sixesTotal = parseInt($("#result-sixes").text());

    updateTotals();
  })

  $("#playFullHouse").click(function() {
    $("#result-full-house").text(fullHouse());
    $("#playFullHouse").hide();
    fullHouseTotal = parseInt($("#result-full-house").text());

    updateTotals();
  })

  $("#playThreeKind").click(function() {
    $("#result-three-kind").text(threeFourKind(3));
    $("#playThreeKind").hide();
    threeKindTotal = parseInt($("#result-three-kind").text());

    updateTotals();
  })

  $("#playFourKind").click(function() {
    $("#result-four-kind").text(threeFourKind(4));
    $("#playFourKind").hide();
    fourKindTotal = parseInt($("#result-four-kind").text());

    updateTotals();
  })

  $("#playSmallStraight").click(function() {
    $("#result-small-straight").text(smallStraight());
    $("#playSmallStraight").hide();
    smallStraightTotal = parseInt($("#result-small-straight").text());

    updateTotals();
  })

  $("#playLargeStraight").click(function() {
    $("#result-large-straight").text(largeStraight());
    $("#playLargeStraight").hide();
    largeStraightTotal = parseInt($("#result-large-straight").text());

    updateTotals();
  })

  $("#playYahtzee").click(function() {
    $("#result-yahtzee").text(yahtzee());
    $("#playYahtzee").hide();
    yahtzeeTotal = parseInt($("#result-yahtzee").text());

    updateTotals();
  })

  $("#playExtraYahtzee").click(function() {
    $("#result-extra-yahtzee").text(extraYahtzee($("#result-yahtzee").text()));

    if ($("#result-yahtzee").text() !== "" || $("#result-extra-yahtzee").text() === "0"){
      $("#playExtraYahtzee").hide();
    }
    extraYahtzeeTotal = parseInt($("#result-extra-yahtzee").text());

    updateTotals();
  })

  $("#playChance").click(function() {
    $("#result-chance").text(chance());
    $("#playChance").hide();
    chanceTotal = parseInt($("#result-chance").text());

    updateTotals();
  })

})
