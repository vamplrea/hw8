Editor : Sublime
Name: David Huynh
Email: david_huynh@student.uml.edu

Short Description: Assigment 8 -  Implementing a Bit of Scrabble with Drag-and-Drop
    The purposes of this assignment are to give you additional experience working with the jQuery UI and to pull
together much of what we’ve been doing throughout the semester. You are to implement a bit of the game of
Scrabble using drag-and-drop. The idea is to display one line of the Scrabble board (one line sample) to the user
along with seven letter tiles on a tile rack. The user then drags tiles to the board to make a word, and you are to
report his or her score, taking the letter values and bonus squares into consideration.


Program Integrity / Design
Basic Functionality
[Fully working] letter tiles in the player’s “hand” are selected randomly from a data structure with the
proper distribution of the letters
[Fully working] letter tiles can be dragged-and-dropped onto target Scrabble squares
[Fully working] program identifies which letter tile is dropped onto which Scrabble square
[Fully working] board includes bonus squares
[Fully working] score is tallied correctly, including consideration of bonus square multipliers
Additional Functionality
[Fully working] any number of words can be played until the player wishes to quit or depletes all tiles
[Fully working] the board is cleared after each round so that a new word can be played
[Fully working] after playing a word, only the number of letter tiles needed to bring the player’s “hand”
back to 7 tiles are selected
[partially working] score is kept for multiple words
[Fully working] Tiles can only be dragged from the “rack” to Scrabble board. If the user drop them
anywhere else, they will be bounced back to the “rack”.
[Fully working] Once the tile is placed on the Scrabble board, it can not be removed.
[partially workingg] Except for the first letter, all sub-subsequent letters must be placed directly next to or
above/below another letter with no space. Else, they will bounce back to the “rack”.

Extra Credit
[Fully working] Full Scrabble board lines are implemented
[Fully working] Validating to see if a word that the user enters is valid (from /usr/share/dict/words)


