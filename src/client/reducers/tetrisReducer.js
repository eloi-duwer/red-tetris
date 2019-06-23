
import {
	INITBOARDSTATE,
	SETBOARDSTATE,
	MOVEPIECE,
	ROTATEPIECE,
	NEXTFRAME
} from '../actions/tetrisActions.js'

import { canMovePiece, rotatePiece } from '../tetrisLogic/moveAndRotationPiece'
import createPiece from '../tetrisLogic/createPiece'
import putPieceIntoBoard from '../tetrisLogic/putPieceIntoBoard'

const width = 10;
const height = 30;
const initialBoardState = new Array(height).fill().map(a => new Array(width).fill(0));

const tetrisReducer = (state = {}, action) => {
	switch(action.type) {
		case INITBOARDSTATE:
			return {
				...state,
				boardState: initialBoardState,
				piece: createPiece()
			};

		case SETBOARDSTATE:
			return {
				...state,
				boardState: action.newState
			};

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
			let newBoard = putPieceIntoBoard(state.boardState, state.piece),
				newPiece = createPiece();

			return {
				...state,
				boardState: newBoard,
				piece: newPiece //Vérifier qu'on peut la poser, si on peut pas = game over
			};

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

		case ROTATEPIECE:
			const rotated = rotatePiece(state.piece.piece, action.direction);
			let newOrientation = state.piece.orientation + action.direction;
			//pas de test de placement
			
			if (canMovePiece(state.boardState, rotated, state.piece.pos))
				return {
					...state,
					piece: {
						...state.piece,
						piece: rotated,
						orientation: (newOrientation < 0 ? 3 : newOrientation) % 4
					}
				};
			return { ...state };

		default:
			return state;
	}
}

export default tetrisReducer;
