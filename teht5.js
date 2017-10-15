/* Oskari Liukku 0435843 */

const width = 3;
const height = 3;

var board = 
[
    1, 2, 1,
	2, 1, 0,
    1, 0, 1
];

// Diagonals only work with 3x3 grids oh well whoops
function hasStraight(board){
    // Check columns
    for(var x = 0; x < width; x++){
        var columnFirstNode = getNodeAt(x, 0);
        var columnSameCount = 0;

        for(var y = 0; y < height; y++){
            // Node has same number as first node
            if(columnFirstNode == getNodeAt(x, y)) columnSameCount++;
            
            // Whole row is full of same node
            if(columnSameCount >= height){
                console.log("Straight on column " + x);
                return 1;
            }
        }
    }

    // Check rows
    for(var y = 0; y < height; y++){
        var rowFirstNode = getNodeAt(x, 0);
        var rowSameCount = 0;

        for(var x = 0; x < width; x++){
            // Node has same number as first node
            if(rowFirstNode == getNodeAt(x, y)) rowSameCount++;
            
            // Whole row is full of same node
            if(rowSameCount >= width){
                console.log("Straight on row " + y);
                return 1;
            }
        }
    }

    // Check diagonals
    const nodeTopLeft = getNodeAt(0, 0);
    const nodeTopRight = getNodeAt(width-1, 0);

    var toRightDiagonalCount = 1;
    var toLeftDiagonalCount = 1;

    for(var i = 1; i < width; i++){
        if(getNodeAt(i, i) == nodeTopLeft){
            toRightDiagonalCount++;
        }
    }

    if(toRightDiagonalCount >= Math.min(width, height)){
        console.log("Straight on towards-right diagonal");
        return 1;
    }

    for(var i = 1; i < width; i++){
        if(getNodeAt(width - i - 1, i) == nodeTopRight){
            toLeftDiagonalCount++;
        }
    }

    if(toLeftDiagonalCount >= Math.min(width, height)){
        console.log("Straight on towards-left diagonal");
        return 1;
    }

    return 0;
}

function getNodeAt(x, y){
    return board[y * height + x];
}

hasStraight(board) ? console.log("Board has a straight! :)") : console.log("Board doesn't have a straight :(");