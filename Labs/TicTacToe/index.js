var playerTurn = true;
var computerMoveTimeout = 0;

// Returns an array of 9 <td> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoard() {
    var gameBoardTable = document.getElementById("gameBoard");
    var result = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            result.push(gameBoardTable.rows[i].cells[j]);
        }
    }
    return result;
}

function start() {
    // Setup the click event for the "New game" button
    var newBtn = document.getElementById("newGameButton");
    newBtn.addEventListener("click", newGame);

    // Create click-event listeners for each cell in the game board
    var cells = getGameBoard();
    for (let cell of cells) {
        cell.addEventListener("click", function() { cellClicked(cell); });
    }

    // Call the newGame function to make sure the board is clear
    newGame();
}

function newGame() {
    // Your code here
	clearTimeout(computerMoveTimeout);
	computerMoveTimeout = 0;
	
	var gameBoardTable = document.getElementById("gameBoard");
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            gameBoardTable.rows[i].cells[j].innerHTML = "&nbsp;";
        }
    }
	
	playerTurn = true;
	
    document.getElementById("turnInfo").innerHTML = "Your turn";
}

function cellClicked(cell) {
    // Your code here
	if (playerTurn === true & cell.innerHTML == "&nbsp;"){
		cell.innerHTML = "X";
    	cell.style.setProperty("color","red");
    	switchTurn();
    }
}

function switchTurn() {
    // Your code here
	var countX
	var countO
	
	countO = 0;
	countX = 0;
	countEmpty = 9;
	
	var ticTac = getGameBoard();
	
	var row3 = ticTac.splice(6);
	var row2 = ticTac.splice(3);
	var row1 = ticTac.splice(0);
	
	console.log(row1[0].innerHTML)
	console.log(row2[0].innerHTML)
	console.log(row3[0].innerHTML)
	
	for (var i = 0; i<3; i++) {
		if(row1[i].innerHTML == "O") {
			countO++;
			countEmpty--;
		}
		else if (row1[i].innerHTML == "X") {
			countX++;
			countEmpty--;
		}
		
		console.log("r1 "+countX);
		console.log("r1 "+countO);
		
		if (countO == 3){document.getElementById("turnInfo").innerHTML = "You win"; playerTurn = false;}
		else if (countX == 3){document.getElementById("turnInfo").innerHTML = "Computer wins"; playerTurn = false;}
		
		countX = 0;
		countO = 0;
		
		if(row2[i].innerHTML == "O") {
			countO++;
			countEmpty--;
		}
		else if (row2[i].innerHTML == "X") {
			countX++;
			countEmpty--;
		}
		
		console.log("r2 "+countX);
		console.log("r2 "+countO);
				
		if (countO == 3){document.getElementById("turnInfo").innerHTML = "You win"; playerTurn = false;}
		else if (countX == 3){document.getElementById("turnInfo").innerHTML = "Computer wins"; playerTurn = false;}
		
		countX = 0;
		countO = 0;
		
		
		if(row3[i].innerHTML == "O") {
			countO++;
			countEmpty--;
		}
		else if (row3[i].innerHTML == "X") {
			countX++;
			countEmpty--;
		}
				
		if (countO == 3){document.getElementById("turnInfo").innerHTML = "You win"; playerTurn = false;}
		else if (countX == 3){document.getElementById("turnInfo").innerHTML = "Computer wins"; playerTurn = false;}
		
		countX = 0;
		countO = 0;
		
		console.log("r3 "+countX);
		console.log("r3 "+countO);
		
		if (countEmpty ==0) {
				return;
				}
		}
	
	computerMoveTimeout = setTimeout(makeComputerMove,1000);
	
	if (playerTurn == true) {
		playerTurn = false;
		document.getElementById("turnInfo").innerHTML = "Computer's turn";
	
	}
	else if (playerTurn == false) {
		playerTurn = true;
		document.getElementById("turnInfo").innerHTML = "Your turn";
	}
	
}

function makeComputerMove() {
    // Your code here
	    if (playerTurn == false){
    	var randomNumber = Math.floor(Math.random() * 10);
    	
		var cells = getGameBoard();
		console.log(cells);
    	var computerMoveCell = cells[randomNumber];
    	
		if (computerMoveCell.innerHTML == "&nbsp;"){
    		computerMoveCell.innerHTML = "O";
    		computerMoveCell.style.setProperty("color", "blue");
    		switchTurn();
    	}
    	else{
    		makeComputerMove();
    	}
    }
}
