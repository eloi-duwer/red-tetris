import randomGenerator from './randomGenerator'
import pieces from './tetrisPieces'

export default function createPiece() {
	let piece = randomGenerator();
	let startLocation = {x: 3, y: 10};
	if (piece === "o")
		startLocation.x = 4;
	else if (piece === "i")
		startLocation.y = 9
	return {
			pos: startLocation,
			piece: pieces[piece],
			type: piece,
			orientation: 0
	};
}
