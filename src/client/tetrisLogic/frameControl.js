/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   frameControl.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:19:48 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/05 17:54:58 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//Fonction appelée a chaque descente du bloc (tt les secondes, via un setInterval)

import { store } from '../index'

import { addPieceToBoard, nextFrame } from '../actions/tetrisActions'

const frameControl = () => {
	store.dispatch(nextFrame());
	const state = store.getState(),
		points = state.tetrisReducer.points,
		socket = state.socketReducer.socket;

		socket.emit('updatePlayer', {
			points: state.tetrisReducer.points,
			boardState: state.tetrisReducer.boardState,
			piece: state.tetrisReducer.piece
		});
}

export default frameControl;
