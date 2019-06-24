
import {
	INITBOARDSTATE,
	MOVEPIECE,
	ROTATEPIECE,
	NEXTFRAME
} from '../actions/tetrisActions.js'

import { canMovePiece, rotatePiece } from '../tetrisLogic/moveAndRotationPiece'
import wallKick from '../tetrisLogic/wallKick'
import createPiece from '../tetrisLogic/createPiece'
import putPieceIntoBoard from '../tetrisLogic/putPieceIntoBoard'
import checkTetris from '../tetrisLogic/checkTetris'

const width = 10;
const height = 30;
//const initialBoardState = new Array(height).fill().map(a => new Array(width).fill(0));
//DEBUG
let initialBoardState = new Array(height - 4).fill().map(a => new Array(width).fill(0));
initialBoardState = initialBoardState.concat(new Array(4).fill().map((a, i) => new Array(width).fill(i % 2 ? "black" : "grey")));

console.log(initialBoardState);

const tetrisReducer = (state = {}, action) => {
	switch(action.type) {
		case INITBOARDSTATE:
			return {
				...state,
				boardState: initialBoardState,
				piece: createPiece()
			};

		case NEXTFRAME: {
			let tryPos = {x: state.piece.pos.x, y: state.piece.pos.y + 1};
			if (canMovePiece(state.boardState, state.piece.piece, tryPos)) {
				return {
					...state,
					piece: {
						...state.piece,
						pos: tryPos
					}
				}
			}

			let newBoard = checkTetris(putPieceIntoBoard(state.boardState, state.piece)),
				newPiece = createPiece();

			return {
				...state,
				boardState: newBoard,
				piece: newPiece //Vérifier qu'on peut la poser, si on peut pas = game over
			};
		}
		case MOVEPIECE:
			let newPos;
			if (canMovePiece(state.boardState, state.piece.piece, action.newPos))
				newPos = action.newPos;
			else
				newPos = state.piece.pos;
			return {
				...state,
				piece: {
					...state.piece,
					pos: newPos,
				}
			};

		case ROTATEPIECE: {
			const rotated = rotatePiece(state.piece.piece, action.direction);
			let tmpOrientation = state.piece.orientation + action.direction,
				newOrientation = (tmpOrientation < 0 ? 3 : tmpOrientation) % 4,
				newPiece = wallKick(state.boardState, state.piece, rotated, newOrientation)

			return {
				...state,
				piece: newPiece
			};
		}
		default:
			return state;
	}
}

export default tetrisReducer;
