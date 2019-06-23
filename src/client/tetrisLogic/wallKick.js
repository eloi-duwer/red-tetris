import wallKickData from './wallKickData'
import { canMovePiece } from './moveAndRotationPiece'

export default function wallKick(board, oldPieceData, newPiece, newOrientation) {
	if (canMovePiece(board, newPiece, oldPieceData.pos)) //Pas de wallKick a faire
		return {
			...oldPieceData,
			piece: newPiece,
			orientation: newOrientation
		};

	let tests = oldPieceData.type === 'i' 
		? wallKickData.i[oldPieceData.orientation][newOrientation]
		: wallKickData.all[oldPieceData.orientation][newOrientation];

	let kickedPiece = tests.reduce((acc, test) => {
		if (acc) return acc;

		let [x, y] = test,
			testPos = {x: oldPieceData.pos.x + x, y: oldPieceData.pos.y + y};
		if (canMovePiece(board, newPiece, testPos))
			return {
				...oldPieceData,
				piece: newPiece,
				pos: testPos,
				orientation: newOrientation
			}
		else
			return false;
	}, false);

	return kickedPiece !== false ? kickedPiece : oldPieceData;
}
