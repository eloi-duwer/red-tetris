/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   frameControl.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:19:48 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 18:32:18 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//Fonction appelée a chaque descente du bloc (tt les secondes, via un setInterval)

import { store } from '../index'

import { addPieceToBoard, nextFrame } from '../actions/tetrisActions'

const boardStateToSend = (boardState, isGhost = true) => {
	if (!isGhost)
		return boardState;

		return boardState.reduce((acc, val, i) => {
			return val.reduce((acc2, val2, j) => {
				return [...acc2, val2 !== 0 && i - 10 < acc[j] ? i - 10 : acc[j]];
			}, []);
		}, [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
}

const frameControl = () => {
	store.dispatch(nextFrame());
	const state = store.getState(),
		points = state.tetrisReducer.points,
		socket = state.socketReducer.socket,
		numberOfPiecesInTheBag = state.tetrisReducer.piecesList.length,
		nbRowsCleared = state.tetrisReducer.nbRowsCleared;

		socket.emit('updatePlayer', {
			points: state.tetrisReducer.points,
			boardState: boardStateToSend(state.tetrisReducer.boardState),
			piece: state.tetrisReducer.piece
		});

		if (numberOfPiecesInTheBag <= 4) {
			socket.emit('getNextBag');
		}

		if (nbRowsCleared >= 2) {
			socket.emit('addLockedRows', nbRowsCleared - 1);
		}
}

export default frameControl;
