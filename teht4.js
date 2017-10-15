/* Oskari Liukku 0435843 */

const width = 3;
const height = 3;

var board = 
[
	[0, 1, 2],
	[1, 2, 0],
	[0, 2, 1]
];

for(var x = 0; x < width; x++){
	var row = "";
	for(var y = 0; y < height; y++){
		row += " " + board[x][y];
	}
	console.log(row);
}