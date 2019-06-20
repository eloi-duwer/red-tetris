
import {
	INITBOARDSTATE,
	SETBOARDSTATE,
	MOVEPIECE,
	ROTATEPIECE,
	ADDPIECETOBOARD,
	NEXTFRAME
} from '../actions/tetrisActions.js'

import randomGenerator from '../tetrisLogic/randomGenerator'
import pieces from '../tetrisLogic/tetrisPieces'
import { canMovePiece, canRotatePiece } from '../tetrisLogic/moveAndRotationPiece'
import putPieceIntoBoard from '../tetrisLogic/putPieceIntoBoard'

const width = 10;
const height = 30;
const initialBoardState = new Array(height);
var i = 0;
while (i < height) {
	initialBoardState[i] = new Array(width).fill(0);
	++i;
}

const tetrisReducer = (state = {}, action) => {
	switch(action.type) {
		case INITBOARDSTATE:
			return {
				...state,
				boardState: initialBoardState,
				piece: null
			}
		case SETBOARDSTATE:
			return {
				...state,
				boardState: action.newState
			};
		case ADDPIECETOBOARD:

			let piece = randomGenerator();
			let startLocation = {x: 3, y: 10};
			if (piece === "o")
				startLocation.x = 4;
			else if (piece === "i")
				startLocation.y = 9
			return {
				...state,
				piece: {
					pos: startLocation,
					piece: pieces[piece],
					type: piece
				}
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
			}

		case NEXTFRAME:
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
			let newBoard = putPieceIntoBoard(state.boardState, state.piece);
			return {
				...state,
				boardState: newBoard,
				piece: null
			}

		case ROTATEPIECE:

		default:
			return state;
	}
}

export default tetrisReducer;
