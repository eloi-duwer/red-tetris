/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetrisReducer.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:08 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/06 16:38:28 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	INITBOARDSTATE,
	MOVEPIECE,
	ROTATEPIECE,
	NEXTFRAME,
	ADDBAGOFPIECES,
	RESETBAGOFPIECES
} from '../actions/tetrisActions.js'

import { canMovePiece, rotatePiece } from '../tetrisLogic/moveAndRotationPiece'
import wallKick from '../tetrisLogic/wallKick'
import nextPiece from '../tetrisLogic/nextPiece'
import putPieceIntoBoard from '../tetrisLogic/putPieceIntoBoard'
import checkTetris from '../tetrisLogic/checkTetris'

const width = 10;
const height = 30;
const initialBoardState = new Array(height).fill().map(a => new Array(width).fill(0));

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
				gameOver: isGameOver,
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
