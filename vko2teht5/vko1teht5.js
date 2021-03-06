/* Oskari Liukku 0435843 */

class TicTacToe{

    constructor(){

        this.width = 3;
        this.height = 3;

        this.cells = document.getElementsByClassName("ttcCell");
        this.moveCollector = document.getElementById("moveCollector");
        this.moveSubmitButton = document.getElementById("moveSubmit");
        this.makeYourMoveText = document.getElementById("makeYourMoveText");

        console.log($);
        
        this.turnPlayer = 0;

        this.setMakeYourMoveText(this.turnPlayer);
    }

    // Diagonals only work with 3x3 grids oh well whoops
    hasStraight(board){

        // Check columns
        for(var x = 0; x < this.height; x++){
            var columnFirstNode = this.getMarkAt(x, 0);
            var columnSameCount = 0;

            // If first node mark wasn't by player, there can't be a straight here
            if(!this.isPlayerMark(columnFirstNode)){
                continue;
            }

            for(var y = 0; y < this.height; y++){
                // Node has same number as first node
                if(columnFirstNode == this.getMarkAt(x, y)) columnSameCount++;
                
                // Whole row is full of same node
                if(columnSameCount >= this.height){
                    console.log("Straight on column " + x);
                    return 1;
                }
            }
        }

        // Check rows
        for(var y = 0; y < this.height; y++){
            var rowFirstNode = this.getMarkAt(0, y);
            var rowSameCount = 0;

            console.log("first", rowFirstNode);
            // If first node mark wasn't by player, there can't be a straight here
            if(!this.isPlayerMark(rowFirstNode)) continue;

            for(var x = 0; x < this.width; x++){
                // Node has same number as first node
                if(rowFirstNode == this.getMarkAt(x, y)) rowSameCount++;
                
                // Whole row is full of same node
                if(rowSameCount >= this.width){
                    console.log("Straight on row " + y);
                    return 1;
                }
            }
        }

        // Check diagonals
        const nodeTopLeft = this.getMarkAt(0, 0);
        const nodeTopRight = this.getMarkAt(this.height-1, 0);

        var toRightDiagonalCount = 1;
        var toLeftDiagonalCount = 1;

        // If first node mark wasn't by player, there can't be a straight here
        if(this.isPlayerMark(nodeTopLeft)){
            for(var i = 1; i < this.height; i++){
                if(this.getMarkAt(i, i) == nodeTopLeft){
                    toRightDiagonalCount++;
                }
            }

            if(toRightDiagonalCount >= Math.min(this.width, this.height)){
                console.log("Straight on towards-right diagonal");
                return 1;
            }
        }

        // If first node mark wasn't by player, there can't be a straight here
        if(this.isPlayerMark(nodeTopRight)){
            for(var i = 1; i < this.height; i++){
                if(this.getMarkAt(this.height - i - 1, i) == nodeTopRight){
                    toLeftDiagonalCount++;
                }
            }

            if(toLeftDiagonalCount >= Math.min(this.width, this.height)){
                console.log("Straight on towards-left diagonal");
                return 1;
            }
        }

        return 0;
    }

    isFull(board){
        // If any node on board isn't full, return 0
        for(var i = 0; i < board.length; i++){
            if(board[i].innerHTML.trim().length == 0) return 0;
        }

        return 1;
    }

    getMarkAt(x, y){
        return this.getNodeDataAt(x, y).innerHTML;
    }

    isPlayerMark(mark){
        return mark === "0" || mark === "1";
    }

    getNodeDataAt(x, y){
        return this.cells[this.getIndexOfNode(x, y)];
    }

    getIndexOfNode(x, y){
        return y * this.height + x;
    }

    getNextTurnPlayer(currentPlayer){
        // 0 -> 1, 1 -> 0
        return (currentPlayer + 1) % 2;
    }

    setMakeYourMoveText(currentPlayer, hasWon){
        if(hasWon){
            this.setWinText("Player " + currentPlayer + " WINS!");
        }else{
            this.makeYourMoveText.innerHTML = "Player " + currentPlayer + ", make your move:";
        }
    }

    setWinText(text){
        this.makeYourMoveText.innerHTML = text;
    }

    moveSubmit(){
        console.log("submit!");

        var moveText = this.moveCollector.value.trim();

        // If input is too short, return
        if(moveText.length < 3) return -1;

        var moveX = moveText[0];
        var moveY = moveText[moveText.length - 1];

        moveX = Number.parseInt(moveX);
        moveY = Number.parseInt(moveY);

        // If either isn't a number, return
        if(isNaN(moveX) || isNaN(moveY)) return -1;
        if(moveX < 0 || moveX > this.width - 1 || moveY < 0 || moveY > this.height - 1) return -1;

        console.log("x: " + moveX, "y: " + moveY);

        var result = this.changeNode(moveX, moveY, this.turnPlayer);
        // If changing node wasn't succesful, return
        if(result === -1) return -1;

        this.moveCollector.value = "";

        if(this.hasStraight(this.cells)){
            this.setMakeYourMoveText(this.turnPlayer, true);
        }else if(this.isFull(this.cells)){
            this.setWinText("It's a TIE!");
        }else{
            this.turnPlayer = this.getNextTurnPlayer(this.turnPlayer);
            this.setMakeYourMoveText(this.turnPlayer, false);
        }
    }

    changeNode(x, y, newContent){

        // If node is already filled, return error
        if(this.getMarkAt(x, y).trim().length != 0){
            return -1;
        }

        // Set new node contents
        this.getNodeDataAt(x, y).innerHTML = newContent;
        return 1;
    }
}

function moveSubmit(){
    ttc.moveSubmit();
}

var ttc = new TicTacToe();

//hasStraight(board) ? console.log("Board has a straight! :)") : console.log("Board doesn't have a straight :(");