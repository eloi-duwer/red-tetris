import { canMovePiece } from './moveAndRotationPiece'

const ghostPiecePos = (board, piece, pos, prevPos) => {
	if (!pos)
		return ghostPiecePos(board, piece, piece.pos, piece.pos);
	else if (pos.y > 30)
		return null;
	else if (!canMovePiece(board, piece.piece, pos))
		return prevPos;
	else
		return ghostPiecePos(board, piece, {x: pos.x, y: pos.y + 1}, pos);
}

export default ghostPiecePos;
