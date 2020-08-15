    // Name: David Huynh
    // Email: david_huynh@student.uml.edu
    // Major: C.S (Senior year) in course 91.61 GUI Programming I
    // Date Created: 08/08/2020
    // Short Description: Assigment 8 -  Implementing a Bit of Scrabble with Drag-and-Drop
//     The purposes of this assignment are to give you additional experience working with the jQuery UI and to pull
// together much of what we’ve been doing throughout the semester. You are to implement a bit of the game of
// Scrabble using drag-and-drop. The idea is to display one line of the Scrabble board (one line sample) to the user
// along with seven letter tiles on a tile rack. The user then drags tiles to the board to make a word, and you are to
// report his or her score, taking the letter values and bonus squares into consideration.
//     Copyright (c) 2020 by David Huynh. All rights reserved




"use strict";

// Globals variable to track score.
let Score = { "totalScore": 0, "score": 0};

// console.log(scrabbleBoard.slots.length); //row
// console.log(scrabbleBoard.slots[0].length); // col

let scrabbleBoardRow = scrabbleBoard.slots.length;
let scrabbleBoardCol = scrabbleBoard.slots[0].length;
let RackTile = 7;

// Calculates the score for each move and add up to total score.
Score.calBS = function() {
  let countRow, countCol, letter, letterValue, multiplierWord = 1, currentScore = 0;

  // Test word before update score
  if (!validWord()) {
    return 0;
  }

  // Mul the tile score  to the board multifier corresponding
  for (countRow = 0; countRow < scrabbleBoardRow; ++countRow) {
    for (countCol = 0; countCol < scrabbleBoardRow; ++countCol) {
      letter = scrabbleBoard.slots[countRow][countCol].letter;
      if (letter) {
        letterValue = scrabbleTiles[letter].value;
        currentScore += letterValue * scrabbleBoard.slots[countRow][countCol].letterMultiplier;
        multiplierWord *= scrabbleBoard.slots[countRow][countCol].multiplierWord;
      }
    }
  }
  currentScore *= multiplierWord;

  // calculating the value after
  return currentScore;
}

// update score to the ScoreBoard after calculating
Score.refresh = function() {
  let currentScore = Score.calBS();
  // $("#score").css("color", "black");
  $("#Score").html(currentScore);
}

//  Sum Total score > 0
Score.commit = function() {
  let currentScore = Score.calBS();
  Score.totalScore += currentScore;
  $("#totalScore").html(Score.totalScore);
  if (Score.totalScore > 0) {
    $("#totalScore").css("color", "green");
  }
}

// Restart the game by changing the score and total score to 0
//value score = 0
Score.restart = function() {
  Score.totalScore = 0;
  $("#Score").html(0);
}

// Construct the board game
scrabbleBoard.makeBoard = function() {
  let row, col, imgPath, slot;

  //r= 91
  //c= 85
  // Set the board hight corresponding to row
  $("#Board").css("height", 91*scrabbleBoardRow);
  // Set the board hight corresponding to row
  $("#Board").css("width", 85*scrabbleBoardCol);

  //r< Sr -- c < Sc  -> append image -> resize
  for (row = 0; row < scrabbleBoardRow; ++row) {
    for (col = 0; col < scrabbleBoardCol; ++col) {
      imgPath = scrabbleBoard.slots[row][col].image;
      slot = $("<div class=\"boardSlot\" row=\"" + row + "\" col=\"" + col + "\" style=\"background-image: url(" + imgPath + ")\" />");
      $("#Board").append(slot);
      //slot 81x87 < 91x85
      slot.css({"width": 81, "height": 87, "margin": 1, "border-width": 1});
    }
  }
}

  // Restart the game, remove all the tiles on the board
  scrabbleBoard.resetBoard = function() {
  let countRow, countCol;
  $("#Board img").remove();

  // console.log("calling this");
  // console.log(scrabbleBoard.slots.length); //row
  // console.log(scrabbleBoardCol); // col
  // Reset the slot data structure.
  for (countRow = 0; countRow < scrabbleBoard.slots.length; ++countRow) {
    for (countCol = 0; countCol < scrabbleBoardCol; ++countCol) {
      delete scrabbleBoard.slots[countRow][countCol].tileId;
      delete scrabbleBoard.slots[countRow][countCol].letter;
    }
  }
}

// get tileID
scrabbleBoard.tileID = function(r, c) {
  return scrabbleBoard.slots[r][c].tileId;
}

// Get letter
scrabbleBoard.getLetter = function(r, c) {
  return scrabbleBoard.slots[r][c].letter;
}

// Check avalability of scarabbleBoard
scrabbleBoard.isAvailable = function(r, c) {
  return typeof(scrabbleBoard.slots[r][c].tileId) === "undefined";
}

// add letter to slot
scrabbleBoard.addTile = function(tileId, letter, r, c) {
  let countRow, countCol;
  // checking  => add
  for (countRow = 0; countRow < scrabbleBoardRow; ++countRow) {
    for (countCol = 0; countCol < scrabbleBoardCol; ++countCol) {
      if (scrabbleBoard.slots[countRow][countCol].tileId === tileId) {
        delete scrabbleBoard.slots[countRow][countCol].tileId;
        delete scrabbleBoard.slots[countRow][countCol].letter;
      }
    }
  }

  // Mark 
  scrabbleBoard.slots[r][c].letter = letter;
  scrabbleBoard.slots[r][c].tileId = tileId;
}

//Case: Letter moved out
scrabbleBoard.deleteFromSlot = function(r, c) {
  delete scrabbleBoard.slots[r][c].tileId;
  delete scrabbleBoard.slots[r][c].letter;
}

// retrive the slot 
scrabbleBoard.findSlotFromTileId = function(tileId) {
  for (let countRow = 0; countRow < scrabbleBoardRow; ++countRow) {
    for (let countCol = 0; countCol < scrabbleBoardCol; ++countCol) {
      if (scrabbleBoard.slots[countRow][countCol].tileId === tileId) {
        return [countRow, countCol];
      }
    }
  }
  return false;
}

// object look up 
checkDictionaryWord.dict = {};
// AJAX look up dictionary
$.ajax({
  //path
  url: 'dictionary.txt',
  success: function(result) {
    // capture array of all the words.
    let words = result.split("\n");
    //  lookup object
    for (let i = 0; i < words.length; ++i) {
      //convert to upper case
      checkDictionaryWord.dict[words[i].toUpperCase()] = true;
    }
  }
});

$(window).on('load', function() {
  let row, col;
  //make the scrabbleBoard
  scrabbleBoard.makeBoard();

  // make the board droppable
  $(".boardSlot").droppable({

    accept: function(draggable) {
      let row, col;
      row = $(this).attr("row");
      col = $(this).attr("col");

      if (scrabbleBoard.tileID(row, col) === draggable.attr("id")) {
        // The tile will go back to the slot in a current range
        return true;
      } else if (scrabbleBoard.isAvailable(row, col)) {
        // The slot is available
        return true;
      } else {
        // The slot is not available
        return false;
      }
    },
    activeClass: "dragh",
    hoverClass: "hovertile",
    drop: function(event, ui) {
      let row, col, letter, word, tileId, previousPositionOnBoard;

      ui.draggable.removeClass("tileRack");
      ui.draggable.addClass("tileBoard");

      row = $(this).attr("row");
      col = $(this).attr("col");

      letter = ui.draggable.attr("letter");
      tileId = ui.draggable.attr("id");

      $(ui.draggable).css("top", "");
      $(ui.draggable).css("left", "");
      $(this).append(ui.draggable);

      // Open the box to choose tile when blank tile is place on the board.
      previousPositionOnBoard = scrabbleBoard.findSlotFromTileId(tileId);
      if ($(ui.draggable).hasClass("cardBlankTile") && !previousPositionOnBoard) {

        cardBlankTile($(ui.draggable), tileId, row, col);
      } else {
        scrabbleBoard.addTile(tileId, letter, row, col);
        validWord();
        Score.refresh();
      }
    }
  });

  //  draggable and droppable functionality
  $("#rack").droppable({
    activeClass: "dragh",
    hoverClass: "hovertile",
    tolerance: "touch",
    drop: function(event, ui) {
      let tileId, word, pos;

      ui.draggable.removeClass("tileBoard");
      ui.draggable.addClass("tileRack");

      // Retrive when it move out the board to the rack
      if ($(ui.draggable).hasClass("cardBlankTile")) {
        $(ui.draggable).attr("src", scrabbleTiles["_"]["image"]);
      }
      // position 
      tileId = ui.draggable.attr("id");
      pos = scrabbleBoard.findSlotFromTileId(tileId);
      if (pos) {
        //  mark of the tile move off the board
        scrabbleBoard.deleteFromSlot(pos[0], pos[1]);

        // Snap the letter rack.
        $("#rack").append(ui.draggable);
        ui.draggable.css({"position": "relative", "top": "", "left": ""});

        word = validWord();
        Score.refresh();
      } else {
        // Tile go to the end of the rack
        ui.draggable.draggable("option", "revert", true);
      }
    }
  });
  //restart the game
  restart();
});

