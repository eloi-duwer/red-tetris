/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetrisReducer.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:08 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 18:32:19 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	INITBOARDSTATE,
	MOVEPIECE,
	ROTATEPIECE,
	NEXTFRAME,
	ADDBAGOFPIECES,
	RESETBAGOFPIECES,
	HOLDPIECE,
	ADDLOCKEDROWS,
} from '../actions/tetrisActions.js'

import { canMovePiece, rotatePiece } from '../tetrisLogic/moveAndRotationPiece'
import wallKick from '../tetrisLogic/wallKick'
import {nextPiece, resetPiecePositionAndRotation} from '../tetrisLogic/nextPiece'
import putPieceIntoBoard from '../tetrisLogic/putPieceIntoBoard'
import checkTetris from '../tetrisLogic/checkTetris'

const width = 10;
const height = 30;
const initialBoardState = Array.from(Array(height), () => Array.from(Array(width), () => 0));

const tetrisReducer = (state = {}, action) => {
	switch(action.type) {
		case INITBOARDSTATE:
			return {
				...state,
				boardState: initialBoardState,
				piece: nextPiece(state),
				piecesList: state.piecesList.slice(1),
				points: 0,
				gameOver: false,
				canHoldPiece: true,
				heldPiece: null,
			};

		case NEXTFRAME: {
			let tryPos = {x: state.piece.pos.x, y: state.piece.pos.y + 1};
			if (canMovePiece(state.boardState, state.piece.piece, tryPos)) {
				return {
					...state,
					piece: {
						...state.piece,
						pos: tryPos
					},
					nbRowsCleared: 0,
				}
			}

			let {newBoard, nbPoints} = checkTetris(putPieceIntoBoard(state.boardState, state.piece)),
				newPiece = nextPiece(state),
				pointsToAdd = calcPoints(nbPoints);

			const isGameOver = !canMovePiece(newBoard, newPiece.piece, newPiece.pos);

			return {
				...state,
				boardState: newBoard,
				piece: isGameOver ? null : newPiece, //Vérifier qu'on peut la poser, si on peut pas = game over
				piecesList: state.piecesList.slice(1),
				points: state.points + pointsToAdd,
				nbRowsCleared: nbPoints,
				gameOver: isGameOver,
				canHoldPiece: true,
			};
		}

		case MOVEPIECE:
			let newPos;
			if (canMovePiece(state.boardState, state.piece.piece, action.newPos))
				newPos = action.newPos;
			else
				return state;
			return {
				...state,
				piece: {
					...state.piece,
					pos: newPos,
				}
			};

		case ROTATEPIECE:
			const rotated = rotatePiece(state.piece.piece, action.direction);
			let tmpOrientation = state.piece.orientation + action.direction,
				newOrientation = (tmpOrientation < 0 ? 3 : tmpOrientation) % 4,
				newPiece = wallKick(state.boardState, state.piece, rotated, newOrientation)

			return {
				...state,
				piece: newPiece
			};

		case HOLDPIECE:
			if (!state.canHoldPiece)
				return state;

			const hasAlreadyPieceInHold = !!state.heldPiece,
				futurePiece = hasAlreadyPieceInHold
				 ? state.heldPiece
				 : nextPiece(state);

			return {
				...state,
				piece: futurePiece,
				heldPiece: resetPiecePositionAndRotation(state.piece),
				//Si on n'a pas de pieces en hold, il faut prendre la suivant dans la liste
				piecesList: hasAlreadyPieceInHold ? state.piecesList: state.piecesList.slice(1),
				canHoldPiece: false,
				gameOver: !canMovePiece(state.boardState, futurePiece.piece, futurePiece.pos),
			}

		case ADDBAGOFPIECES:
			const oldBag = state.piecesList || [];
			return {
				...state,
				piecesList: [...oldBag, ...action.newBag],
			}

		case RESETBAGOFPIECES:
			return {
				...state,
				piecesList: action.firstBag,
			}

		case ADDLOCKEDROWS:
			return {
				...state
			}

		default:
			return state;
	}
}

function calcPoints(nb) {
	switch(nb) {
		case 0:
			return 0;
		case 1:
			return 40;
		case 2:
			return 100;
		case 3:
			return 300;
		case 4:
			return 1200;
	}
}

export default tetrisReducer;
