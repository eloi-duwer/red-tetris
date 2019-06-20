import pieces from './tetrisPieces'

export default function putPieceIntoBoard(board, piece) {
	let arr2 = piece.piece.map((row, i) =>
		row.map((p, j) => {
			if (p !== 0)
				return {x: piece.pos.x + j, y: piece.pos.y + i};
		})
		.filter(e => e !== undefined)
	);
	const listOfPos = [].concat(...arr2);

	let newBoard = board.map((line, i) => {
		return line.map((uneCase, j) => {
			if (listOfPos.find(pos => pos.x === j && pos.y === i))
				return pieces.colors[piece.type];
			else
				return uneCase;
		})
	});
	return newBoard;
}
