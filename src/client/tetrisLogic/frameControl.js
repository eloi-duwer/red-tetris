/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   frameControl.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:19:48 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/06 16:20:06 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//Fonction appelée a chaque descente du bloc (tt les secondes, via un setInterval)

import { store } from '../index'

import { addPieceToBoard, nextFrame } from '../actions/tetrisActions'

const frameControl = () => {
	store.dispatch(nextFrame());
	const state = store.getState(),
		points = state.tetrisReducer.points,
		socket = state.socketReducer.socket,
		numberOfPiecesInTheBag = state.tetrisReducer.piecesList.length;

		socket.emit('updatePlayer', {
			points: state.tetrisReducer.points,
			boardState: state.tetrisReducer.boardState,
			piece: state.tetrisReducer.piece
		});

		if (numberOfPiecesInTheBag <= 4) {
			socket.emit('getNextBag');
		}
}

export default frameControl;
