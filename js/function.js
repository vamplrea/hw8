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


// Restart game
function restart() {
  // Clear the rack.
  $("#rack img").remove();

  // Remove all tiles from the board.
  scrabbleBoard.resetBoard();

  // Reset the number of tile
  for (let element in scrabbleTiles) {
    if (scrabbleTiles.hasOwnProperty(element)) {
      scrabbleTiles[element]["number-remaining"] = scrabbleTiles[element]["original-distribution"];
    }
  }

  Score.restart();

  submit();
}

//if random  = Blank Tile => pop up a board to select a tilee
function cardBlankTile(bTileChoose, tileId, row, col) {
  let tileSelect = $("<div id='cardBlankTileDialog'></div>");
  let letterKey, freshTile;
  for (letterKey in scrabbleTiles) {// Add all tiles image to the box 
    if (letterKey != "_") {
      freshTile = $("<img src='" + scrabbleTiles[letterKey]["image"] + "' class='tileBox' letter='" + letterKey + "'>");

      // choose a tile in the box by click event
      freshTile.click(function() {
        let newLetter = $(this).attr("letter");

        // Replace the image of the chosen tile to the blank
        bTileChoose.attr("letter", newLetter);
        bTileChoose.attr("src", scrabbleTiles[newLetter]["image"]);

        // Replace the tile ID
        tileId = bTileChoose.attr("id");
        scrabbleBoard.addTile(tileId, newLetter, row, col);

        validWord();
        Score.refresh();
        //close the box
        tileSelect.dialog("close");
      });
      tileSelect.append(freshTile);
    }
  }
  tileSelect.css("z-index", 100);
  tileSelect.dialog({
    modal: true,
    draggable: false,
    resizable: false
  });
}

// Get random n tile from deck and put it in the Deck. Decrease the number of Tile reamining in the Deck
function getFromDeck(n) {
  let pickTile = [];
  let allTiles = [];

  // Make an array of all remaining tiles for a random selection.
  for (let element in scrabbleTiles) {
    if (scrabbleTiles.hasOwnProperty(element)) {
      let remaining = scrabbleTiles[element]["number-remaining"];
      for (let i = 0; i < remaining; ++i) {
        allTiles.push(element);
      }
    }
  }

  // Pick n tile or all the tile if the remaining tiles less than n
  for (let i = 0; i < n; ++i) {
    if (allTiles.length) {
      let randomIndex = generateRandomNum(0, Object.keys(allTiles).length - 1);
      let randomLetter = allTiles[randomIndex];
      pickTile.push(randomLetter);
      --scrabbleTiles[randomLetter]["number-remaining"];
      allTiles.splice(randomIndex, 1);
    }
  }
  // Update the remaining tiles on the page.
  $("#remainingTiles").html(allTiles.length);
  return pickTile;
}

// Total number of tile in Deck
function totalTile() {
  let numTotalTiles = 0;
  for (let element in scrabbleTiles) {
    if (scrabbleTiles.hasOwnProperty(element)) {
      numTotalTiles += scrabbleTiles[element]["number-remaining"];
    }
  }
  return numTotalTiles;
}

// Number of tile in the rack
function tileOnRack() {
  return $("#rack img").length;
}



// Add the score to the total score, remove all the tile from the board. Refill random tiles from the deck to the rack
function submit() {
  let element, tileImageId, freshTile, pickTile;

  Score.commit();

  // reset the board.
  scrabbleBoard.resetBoard();

  // Refill random tiles from the deck to the rack
  pickTile = getFromDeck(RackTile - tileOnRack());
  for (let i = 0; i < pickTile.length; ++i) {
    element = pickTile[i];
    tileImageId = renderTileID();
    // 
    freshTile = $("<img id=\"" + tileImageId + "\" src=\"" + scrabbleTiles[element]["image"] + "\" class=\"lTile\" letter=\"" + element + "\" />");
    if (element == "_") {
      freshTile.addClass("cardBlankTile");
    }
    // Add tile image.
    $("#rack").append(freshTile);
    //Set score to 0
    $("#Score").html(0);

    // make the tile draggable & add class
    freshTile.addClass("tileRack");
    freshTile.draggable({
      revertDuration: 400,
      start: function(event, ui) {
        $(this).css("z-index", 99);
        $(this).draggable("option", "revert", "invalid");
      },
      stop: function() {
        // revert z 
        $(this).css("z-index", "");
      }
    });
  }

  // empty the word
  $("#word").html("");

  if (totalTile() == 0) {
    // Run out of Tile, Display the message
    document.getElementById("submitWord").disabled = false;
    $("#print").css("color", "green");
    document.getElementById("print").innerHTML = "Congratulation! You beat the game"
  } else {
    document.getElementById("submitWord").disabled = true;
  }
}

// batch random string ID for tile.
function renderTileID() {
  let id;
  renderTileID.id = ++renderTileID.id || 1;
  id = "tile" + renderTileID.id.toString();
  return id;
}

// return a random #
function generateRandomNum(min, max) {
  //Math.floor(Math.random() * num1 - num2 - 2  - 2 );
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Check  Dictionary
function checkDictionaryWord(wd) {
  if (wd.length > 0 && checkDictionaryWord.dict[wd]) {
    return true;
  }
  return false;
}

//  submit button enable able to click if the word found in directory
function validWord() {
  let countRow, countCol , letter, bugNumber, word = "", rowCounter = [], marker =[];
  rowCounter[0] = 0;
  rowCounter[1] = 0;
  rowCounter[2] = 0;
  rowCounter[3] = 0;
  rowCounter[4] = 0;
  rowCounter[5] = 0;
  rowCounter[6] = 0;
  bugNumber = 0;
  //  .Showing all the word if Empty => display "." 

  for (countRow = 0; countRow < scrabbleBoardRow; ++countRow) {
    for (countCol = 0; countCol < scrabbleBoardCol; ++countCol) {
      letter = scrabbleBoard.getLetter(countRow, countCol);
      if (typeof(letter) === "undefined") {
        word += "\xB7";
      } else {
        word += letter;
        rowCounter[countRow]++;
        marker[countRow] = countCol;
      }
    }

  // for( let i = 0 ; i <RackTile; i ++){
  //   console.log("This is rowCounter["+ i + "] :" + rowCounter[i]);
  //   console.log("This is marker["+ i + "] :" + marker[i]);
  // }


    if (
          //Check if those letter in the board sit next to each others, in one line (vertical or horizontal). Trim all the dots at the begining and at the end of the word
    //&& rowCounter[3] == 0 && rowCounter[4] == 1 && rowCounter[5] == 0 && rowCounter[6] == 1
       rowCounter[0] == 1 && rowCounter[1] == 0 && rowCounter[2] == 1 || 
    // ||rowCounter[3] == 0 && rowCounter[4] == 1 && rowCounter[5] == 0 && rowCounter[6] == 1 | marker[1] != marker[2])) ||
      (rowCounter[0] == 1 && rowCounter[1] == 1 && rowCounter[2] == 1 && (marker[0] != marker[1] || marker[1] != marker[2])) ||
      (rowCounter[0] == 1 && rowCounter[1] == 1 && rowCounter[2] == 0 && marker[0] != marker[1]) || 
    // ||rowCounter[3] == 0 && rowCounter[4] == 1 && rowCounter[5] == 0 && rowCounter[6] == 1 | marker[2] != marker[3])) ||  
      (rowCounter[0] == 0 && rowCounter[1] == 1 && rowCounter[2] == 1 && marker[1] != marker[2]) 
        // ||rowCounter[5] == 0 && rowCounter[6] == 1 && rowCounter[3] == 0 && rowCounter[2] == 1 | marker[3] != marker[4])) ||  
    //  (rowCounter[5] == 0 && rowCounter[6] == 1 && rowCounter[3] == 1 && marker[2] != marker[1]) 
              //Check if those letter in the board sit next to each others, in one line (vertical or horizontal). Trim all the dots at the begining and at the end of the word
    //&& rowCounter[4] == 0 && rowCounter[5] == 1 && rowCounter[6] == 0 && rowCounter[6] == 1
    //   rowCounter[4] == 1 && rowCounter[5] == 0 && rowCounter[6] == 1 || 
    // ||rowCounter[3] == 0 && rowCounter[4] == 1 && rowCounter[5] == 0 && rowCounter[6] == 1 | marker[1] != marker[2])) ||
    //  (rowCounter[0] == 1 && rowCounter[1] == 1 && rowCounter[2] == 1 && (marker[0] != marker[1] || marker[1] != marker[2])) ||
    //  (rowCounter[0] == 1 && rowCounter[1] == 1 && rowCounter[2] == 0 && marker[0] != marker[1]) || 
    // ||rowCounter[3] == 0 && rowCounter[4] == 1 && rowCounter[5] == 0 && rowCounter[6] == 1 | marker[2] != marker[3])) ||  
    //  (rowCounter[0] == 0 && rowCounter[1] == 1 && rowCounter[2] == 1 && marker[1] != marker[2]) 
        // ||rowCounter[5] == 0 && rowCounter[6] == 1 && rowCounter[3] == 0 && rowCounter[2] == 1 | marker[3] != marker[4])) ||  
    //  (rowCounter[5] == 0 && rowCounter[6] == 1 && rowCounter[3] == 1 && marker[2] != marker[1]) 

    ) {
      bugNumber = 10;
      break;
    } else if ((rowCounter[0] > 1 && (rowCounter[1] > 0 || rowCounter[2] > 0)) || (rowCounter[1] > 1 && (rowCounter[0] > 0 || rowCounter[2] > 0)) || (rowCounter[2] > 1 && (rowCounter[0] > 0 || rowCounter[1] > 0))) {
      bugNumber = 9;
      break;
    } else if (rowCounter[0] > 0 ||rowCounter[1] > 0 || rowCounter[2] > 0) {
      word = word.replace(/^\xB7+/, "");
      word = word.replace(/\xB7+$/, "");
    }
 }

  //checking letter vertical
  if ((rowCounter[0] == 1 && rowCounter[1] == 1 && rowCounter[2] == 0 && marker[0] == marker[1]) || (rowCounter[0] == 0 && rowCounter[1] == 1 && rowCounter[2] == 1 && marker[1] == marker[2]) || (rowCounter[0] == 1 && rowCounter[1] == 1 && rowCounter[2] == 1  && marker[0] == marker[1] && marker[1] == marker[2])){
    word = word.replace(/\xB7/gi, "");
  }
  //console.print(word);
  //show the word
  $("#word").html(word);

  // Check if the board is empty
  if (word == "") {
    checkSingleWord(false);
    bugNumber = 8;
  } else {
    // (horizontal and vertical) -- partially working
    let gapWord = new RegExp("[A-Z_]\xB7+[A-Z_]");
    if (gapWord.test(word)) {
      bugNumber = 10;
    }
  }

  // Check if the word is at least two letters
  if (word.length <= 1 || word.length == 21) {
    bugNumber = 6;
  }

  // Check if the word is valid in Dictionary
  if(bugNumber == 0) {
    if (!checkDictionaryWord(word)) {
      bugNumber = 7;
    }
  }

  //Display the errors
  switch(bugNumber){
    case 0:
      $("#print").css("color", "green");
      document.getElementById("print").innerHTML = "Found it! Word is valid";
      break;
    case 6:
      $("#print").css("color", "red");
      document.getElementById("print").innerHTML = "Need to put atleast 2 letters";
      break;
    case 7:
      $("#print").css("color", "red");
      document.getElementById("print").innerHTML = "Please try another one! Not found word in dictionary";
      break;
    case 8:
      $("#print").css("color", "red");
      document.getElementById("print").innerHTML = "The board is empty!";
      break;
    case 9:
      $("#print").css("color", "red");
      document.getElementById("print").innerHTML = "the letters should be in line(vertical or horizontal)";
      break;
    case 10:
      $("#print").css("color", "red");
      document.getElementById("print").innerHTML = "Avoid space between letters and Linking the letter by a vertical / horizontal line";
      break;  
    default:
  }

  //block the button if there is an error 
  if (bugNumber) {
    document.getElementById("submitWord").disabled = true;

    $("#word").css("color", "black");
    return false;
  }

  $("#word").css("color", "green");
  document.getElementById("submitWord").disabled = false;

  return word;
}