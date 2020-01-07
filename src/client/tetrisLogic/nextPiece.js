/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   nextPiece.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/06 16:13:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 18:14:05 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import randomGenerator from './randomGenerator'
import pieces from './tetrisPieces'

const getStartLocation = name => ({x: (name === 'o'? 4 : 3), y: (name === 'i' ? 9 : 10)});

export function nextPiece(state) {
	let piece = state.piecesList[0] || randomGenerator();

	let startLocation = getStartLocation(piece);
	return {
		pos: startLocation,
		piece: pieces[piece],
		type: piece,
		orientation: 0
	};
}
export function resetPiecePositionAndRotation(piece) {
	return {
		type: piece.type,
		piece: pieces[piece.type],
		pos: getStartLocation(piece.type),
		orientation: 0
	}
}
