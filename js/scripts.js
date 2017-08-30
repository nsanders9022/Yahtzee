//Global variables
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
var submitCount = 14;
var playerCount = 0;

//Constructor for Player Object
function Player(name, score, id) {
  this.name = name;
  this.score = score;
  this.id = id;
}

//Constructor for Dice Object
function Dice(amount, hold, id) {
  this.amount = amount;
  this.hold = hold;
  this.id = id;
}

//Prototype to roll a die. Returns a random number
Dice.prototype.roll = function() {
  if (this.hold === false) {
    this.amount = Math.floor((Math.random() * 6) + 1);
  }
}

//Prototype to mark a die as being held
Dice.prototype.toggleHold = function() {
  this.hold = !this.hold;
}

//5 instantiations of a Dice object
var diceOne = new Dice(0, false, 1);
var diceTwo = new Dice(0, false, 2);
var diceThree = new Dice(0, false, 3);
var diceFour = new Dice(0, false, 4);
var diceFive = new Dice(0, false, 5);

//Function to push the score of each die into an array and sort it
function getDiceArray() {
  diceArray.push(diceOne.amount);
  diceArray.push(diceTwo.amount);
  diceArray.push(diceThree.amount);
  diceArray.push(diceFour.amount);
  diceArray.push(diceFive.amount);
  diceArray.sort();
}

//Gets the sum of all of the dice
function sumDiceArray() {
  var sum = 0;
  for (var i = 0; i < diceArray.length; i++) {
    sum += diceArray[i];
  }
  return sum;
}

//Gets the count of a specific number on a dice roll and multiplies the count by that number
//Used to score ones, twos, threes, fours, fives, sixes
function multiples(number) {
  var count = 0;
  for (var i = 0; i < diceArray.length; i++) {
    if (diceArray[i] === number) {
      count ++;
    }
  }
  return count * number;
}

//Calculates score of upper section and adds bonus points if score is high enough
function bonus(one, two, three, four, five, six) {
  if (one + two + three + four + five + six > 62 ) {
    return 35;
  }
  return 0;
}

//Gets the count of all the possible numbers (1-6)
//If one number has a count of at least 3 it returns the dice sum in 3 of a kind
//If one number has a count of at least 4 it returns the dice sum in 4 of a kind
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


//Checks to see if dice roll is a full house
function fullHouse() {
  if (((diceArray[0] === diceArray[1] && diceArray[2] === diceArray[0]) && (diceArray[3] === diceArray[4]) && diceArray[0] !== diceArray[4]) || ((diceArray[0] === diceArray[1]) && (diceArray[3] === diceArray[2] && diceArray[3] === diceArray[4]) && diceArray[0] !== diceArray[4])) {
    return 25;
  }
  return 0;
}


//Checks to see if a dice roll is a small straight
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

//Checks to see if a dice roll is a large straight
function largeStraight() {

  for (var i = 0; i < diceArray.length - 1; i++) {
    if (diceArray[i] + 1 !== diceArray[i+1]) {
      return 0;
    }
  }
  return 40;
}

//Checks to see if a dice roll is a yahtzee
function yahtzee() {
  for (var i = 0; i < diceArray.length; i++) {
    if (diceArray[i] !== diceArray[0]) {
      return 0;
    }
  }
  return 50;
}


//Checks to see if a dice roll is a yahtzeePoints
//Points are only given if yahtzee has been filled in
//Alert box pops up if user tries to place points there before yahtzee box has been scored
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
    submitCount++;
  } else {
    return 0;
  }
}

//returns the sum of the dice
function chance(){
  return sumDiceArray();
}

//calculates the total score from the left categories
function leftTotal(one, two, three, four, five, six, bonus) {
  return one + two + three + four + five + six + bonus;
}

//calculates the total score from the right categories
function rightTotal(threeK, fourk, fullH, smallS, largeS, yahtzee, extraY, chance) {
  return threeK + fourk + fullH + smallS + largeS + yahtzee + extraY + chance;
}

//calculates the overall total
function grandTotal(left, right) {
  return left + right;
}

// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

//dynamically creates inputs for each player's user name
function usernameFields() {
  var nameForm = document.getElementById("name-form");

  while (nameForm.hasChildNodes()) {
    nameForm.removeChild(nameForm.lastChild);
  }

  for (i = 0; i < playerCount; i++) {
    var label = document.createElement("label");
    var labelText = document.createTextNode("Player " + (i+1) + " user name");
    label.appendChild(labelText);
    nameForm.appendChild(label);

    var input = document.createElement("input");
    input.type = "text";
    input.name = "player" + i;
    input.class = "playerNameInput";
    nameForm.appendChild(input);
    nameForm.appendChild(document.createElement("br"));
  }

  var button = document.createElement("button");
  button.setAttribute("class","btn btn-primary");
  var buttonText = document.createTextNode("Play");
  button.appendChild(buttonText);
  nameForm.appendChild(button)

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {

  //on page load
  //sekts roll button to have 3 dot image
  $("#dots").html('<img class="dots-img" src="img/' + rollCount + 'dots.png">');
  //disable the submit buttons
  $(".btn-submit").attr('disabled', 'disabled');


  //This function is called after a submit button is pressed
  function updateTotals(){
    //resets roll count back to 0 (3 rolls left)
    rollCount = 0;
    submitCount--;
    console.log(submitCount);

    //Displays roll button
    $("#roll-button").show();
    //Updates the bonus score
    $("#result-bonus").text(bonus(onesTotal, twosTotal, threesTotal, foursTotal, fivesTotal, sixesTotal));
    bonusTotal = parseInt($("#result-bonus").text());
    //updates the left score
    $("#result-left-total").text(leftTotal(onesTotal, twosTotal, threesTotal, foursTotal, fivesTotal, sixesTotal, bonusTotal));
    //updates the right score
    $("#result-right-total").text(rightTotal(threeKindTotal, fourKindTotal, fullHouseTotal, smallStraightTotal, largeStraightTotal, yahtzeeTotal,extraYahtzeeTotal, chanceTotal));
    //updates the total score
    $("#result-overall-total").text(grandTotal(parseInt($("#result-left-total").text()), parseInt($("#result-right-total").text())));
    //updates the dot image on roll button
    $("#dots").html('<img class="dots-img" src="img/' + rollCount + 'dots.png">');

    //Sets each dice back to 0 and removes any holds on the dice
    diceOne.amount = "";
    diceOne.hold = false;
    $("#dice-one").text(diceOne.amount);

    diceTwo.amount = "";
    diceTwo.hold = false;
    $("#dice-two").text(diceTwo.amount);

    diceThree.amount = "";
    diceThree.hold = false;
    $("#dice-three").text(diceThree.amount);

    diceFour.amount = "";
    diceFour.hold = false;
    $("#dice-four").text(diceFour.amount);

    diceFive.amount = "";
    diceFive.hold = false;
    $("#dice-five").text(diceFive.amount);

    //subit buttons are disabled
    $(".btn-submit").attr('disabled', 'disabled');

    //if no more submit buttons are left (all turns have been played) the game over overlay is displayed
    if (submitCount === 0 ) {
      $(".end").show();
    }
  }

  //Name overlay form
  // $("#name-form").submit(function(event) {
  //   event.preventDefault();
  //   //gets the value of the name entered
  //   var playerName = $("#playerName").val();
  //   //instantiates player object with that name
  //   var player1 = new Player(playerName, 0, 1)
  //   //displays the name on the score board
  //   $("#name").text(playerName + "\'s ");
  //   //hides the name overlay
  //   $(".form-div").hide();
  // })

  $("#player-count").submit(function(event) {
    event.preventDefault();

    playerCount = parseInt($("input:radio[name=count]:checked").val());

    console.log(playerCount);

    $(".player-count").hide();
    usernameFields();
    $("#name-div").show()
  })

  $("#name-form").submit(function(event) {
    event.preventDefault();



  })




  //What happens when the roll button is clicked
  $("#roll-button").click(function() {
    //submit buttons are activated
    $(".btn-submit").removeAttr('disabled');
    //dice array is emptied
    diceArray = [];
    //roll count is increased
    rollCount++;
    //dot image is updated based on roll count
    $("#dots").html('<img class="dots-img" src="img/' + rollCount + 'dots.png">');
    console.log(rollCount)

    //Dice Roll prototype method is called on all 5 dice (dices are rolled)
    diceOne.roll();
    diceTwo.roll();
    diceThree.roll();
    diceFour.roll();
    diceFive.roll();

    //Dice one displays image of rolled number
    //Shows or hides class if the die has been clicked on to be held
    $("#dice-one").html('<img id="dice-one-img" class="dice" alt="' + diceOne.amount + ' " src="img/' + diceOne.amount + '.svg">');
    if (diceOne.hold === true) {
      $("#dice-one-img").addClass("dice-hold")
    } else {
      $("#dice-one-img").removeClass("dice-hold")
    }
    //Dice two displays image of rolled number
    //Shows or hides class if the die has been clicked on to be held
    $("#dice-two").html('<img id="dice-two-img" class="dice" alt="' + diceOne.amount + ' " src="img/' + diceTwo.amount + '.svg">');
    if (diceTwo.hold === true) {
      $("#dice-two-img").addClass("dice-hold")
    } else {
      $("#dice-two-img").removeClass("dice-hold")
    }
    //Dice three displays image of rolled number
    //Shows or hides class if the die has been clicked on to be held
    $("#dice-three").html('<img id="dice-three-img" class="dice" alt="' + diceOne.amount + ' " src="img/' + diceThree.amount + '.svg">');
    if (diceThree.hold === true) {
      $("#dice-three-img").addClass("dice-hold")
    } else {
      $("#dice-three-img").removeClass("dice-hold")
    }
    //Dice four displays image of rolled number
    //Shows or hides class if the die has been clicked on to be held
    $("#dice-four").html('<img id="dice-four-img" class="dice" alt="' + diceOne.amount + ' " src="img/' + diceFour.amount + '.svg">');
    if (diceFour.hold === true) {
      $("#dice-four-img").addClass("dice-hold")
    } else {
      $("#dice-four-img").removeClass("dice-hold")
    }
    //Dice five displays image of rolled number
    //Shows or hides class if the die has been clicked on to be held
    $("#dice-five").html('<img id="dice-five-img" class="dice" alt="' + diceOne.amount + ' " src="img/' + diceFive.amount + '.svg">');
    if (diceFive.hold === true) {
      $("#dice-five-img").addClass("dice-hold")
    } else {
      $("#dice-five-img").removeClass("dice-hold")
    }

    //calls function to put all dice rolls in an array and sort it
    getDiceArray();

    // if it is the last roll in the turn (3rd roll) the roll button is hidden
    if (rollCount > 2) {
      $("#roll-button").hide();
    }
  })

  //if 'no' is selected on the game over overlay the overlay is hidden
  $("#no").click(function() {
    $("#end-text").hide();
  })

  //When dice one is clicked
  //toggles its hold property between true and false
  //if hold is true it is given the class
  //otherwise the class is removed
  $("#dice-one").click(function() {
    diceOne.toggleHold();
    if (diceOne.hold === true) {
      $("#dice-one-img").toggleClass("dice-hold")
    } else {
      $("#dice-one-img").removeClass("dice-hold")
    }
    // $(this).text(function(i, text){
    //     return text === "Hold" ? "Unhold" : "Hold";
    // })
  })

  //same as above
  $("#dice-two").click(function() {
    diceTwo.toggleHold();
    if (diceTwo.hold === true) {
      $("#dice-two-img").addClass("dice-hold")
    } else {
      $("#dice-two-img").removeClass("dice-hold")
    }
  })
  //same as above
  $("#dice-three").click(function() {
    diceThree.toggleHold();
    if (diceThree.hold === true) {
      $("#dice-three-img").addClass("dice-hold")
    } else {
      $("#dice-three-img").removeClass("dice-hold")
    }
  })
  //same as above
  $("#dice-four").click(function() {
    diceFour.toggleHold();
    if (diceFour.hold === true) {
      $("#dice-four-img").addClass("dice-hold")
    } else {
      $("#dice-four-img").removeClass("dice-hold")
    }
  })
  //same as above
  $("#dice-five").click(function() {
    diceFive.toggleHold();
    if (diceFive.hold === true) {
      $("#dice-five-img").addClass("dice-hold")
    } else {
      $("#dice-five-img").removeClass("dice-hold")
    }
  })

//Methods for what happens when a specific submit button is called
//Runs the corresponding function and displays the result of the turn in the corresponding box
//Hides the submit button so the player cannot play there again
//Sets global variable of that categories score to the result of the function
//Calls updateTotal function

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
    $(".btn-submit").removeAttr('disabled');
  })

  $("#playChance").click(function() {
    $("#result-chance").text(chance());
    $("#playChance").hide();
    chanceTotal = parseInt($("#result-chance").text());

    updateTotals();
  })

})
