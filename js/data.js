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








//Tile setup, and images
// From https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/
let scrabbleTiles = [] ;
scrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "image" : "img/Scrabble_Tile_A.jpg"  } ;
scrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_B.jpg"  } ;
scrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_C.jpg"  } ;
scrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "img/Scrabble_Tile_D.jpg"  } ;
scrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12, "image" : "img/Scrabble_Tile_E.jpg"  } ;
scrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_F.jpg"  } ;
scrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3, "image" : "img/Scrabble_Tile_G.jpg"  } ;
scrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_H.jpg"  } ;
scrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "image" : "img/Scrabble_Tile_I.jpg"  } ;
scrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "img/Scrabble_Tile_J.jpg"  } ;
scrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "img/Scrabble_Tile_K.jpg"  } ;
scrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "img/Scrabble_Tile_L.jpg"  } ;
scrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_M.jpg"  } ;
scrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "img/Scrabble_Tile_N.jpg"  } ;
scrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8, "image" : "img/Scrabble_Tile_O.jpg"  } ;
scrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_P.jpg"  } ;
scrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "image" : "img/Scrabble_Tile_Q.jpg"  } ;
scrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "img/Scrabble_Tile_R.jpg"  } ;
scrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "img/Scrabble_Tile_S.jpg"  } ;
scrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "img/Scrabble_Tile_T.jpg"  } ;
scrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "img/Scrabble_Tile_U.jpg"  } ;
scrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_V.jpg"  } ;
scrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_W.jpg"  } ;
scrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "img/Scrabble_Tile_X.jpg"  } ;
scrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_Y.jpg"  } ;
scrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "image" : "img/Scrabble_Tile_Z.jpg"  } ;
scrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "img/Scrabble_Tile_Blank.jpg"  } ;

let scrabbleBoard = {};

// Setup for scrabbleBoard with image and property
// https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/
//https://img.wonderhowto.com/img/02/94/63406691940028/0/master-scrabble-win-every-game.w1456.jpg
scrabbleBoard.slots = [];
scrabbleBoard.slots[0] = [];
//row 1
scrabbleBoard.slots[0][0] = { "wordMultiplier": 2, "letterMultiplier": 1, "image": "img/double_word.jpg"};
scrabbleBoard.slots[0][1] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[0][2] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[0][3] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[0][4] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[0][5] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[0][6] = { "wordMultiplier": 2, "letterMultiplier": 1, "image": "img/double_word.jpg"};
// scrabbleBoard.slots[0][7] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};

//row 2
scrabbleBoard.slots[1] = [];
scrabbleBoard.slots[1][0] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[1][1] = { "wordMultiplier": 1, "letterMultiplier": 3, "image": "img/triple_letter.jpg"};
scrabbleBoard.slots[1][2] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[1][3] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[1][4] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[1][5] = { "wordMultiplier": 1, "letterMultiplier": 3, "image": "img/triple_letter.jpg"};
scrabbleBoard.slots[1][6] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
// scrabbleBoard.slots[1][7] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};

//row 3
scrabbleBoard.slots[2] = [];
scrabbleBoard.slots[2][0] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[2][1] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[2][2] = { "wordMultiplier": 1, "letterMultiplier": 2, "image": "img/double_letter.jpg"};
scrabbleBoard.slots[2][3] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[2][4] = { "wordMultiplier": 1, "letterMultiplier": 2, "image": "img/double_letter.jpg"};
scrabbleBoard.slots[2][5] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[2][6] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
// scrabbleBoard.slots[2][7] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};

//row 4
scrabbleBoard.slots[3] = [];
scrabbleBoard.slots[3][0] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[3][1] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[3][2] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[3][3] = { "wordMultiplier": 3, "letterMultiplier": 1, "image": "img/triple_word.jpg"};
scrabbleBoard.slots[3][4] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[3][5] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[3][6] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
// scrabbleBoard.slots[1][7] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};

//row 5
scrabbleBoard.slots[4] = [];
scrabbleBoard.slots[4][0] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[4][1] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[4][2] = { "wordMultiplier": 1, "letterMultiplier": 2, "image": "img/double_letter.jpg"};
scrabbleBoard.slots[4][3] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[4][4] = { "wordMultiplier": 1, "letterMultiplier": 2, "image": "img/double_letter.jpg"};
scrabbleBoard.slots[4][5] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[4][6] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
// scrabbleBoard.slots[1][7] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};

//row 6
scrabbleBoard.slots[5] = [];
scrabbleBoard.slots[5][0] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[5][1] = { "wordMultiplier": 1, "letterMultiplier": 3, "image": "img/triple_letter.jpg"};
scrabbleBoard.slots[5][2] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[5][3] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[5][4] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[5][5] = { "wordMultiplier": 1, "letterMultiplier": 3, "image": "img/triple_letter.jpg"};
scrabbleBoard.slots[5][6] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
// scrabbleBoard.slots[1][7] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};

//row 7
scrabbleBoard.slots[6] = [];
scrabbleBoard.slots[6][0] = { "wordMultiplier": 2, "letterMultiplier": 1, "image": "img/double_word.jpg"};
scrabbleBoard.slots[6][1] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[6][2] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[6][3] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[6][4] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[6][5] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};
scrabbleBoard.slots[6][6] = { "wordMultiplier": 2, "letterMultiplier": 1, "image": "img/double_word.jpg"};
// scrabbleBoard.slots[1][7] = { "wordMultiplier": 1, "letterMultiplier": 1, "image": "img/Scrabble_BlankSquare_81x87.jpg"};