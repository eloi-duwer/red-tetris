/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   nextPiece.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/06 16:13:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/06 18:03:25 by eduwer           ###   ########.fr       */
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
export function resetPiecePosition(piece) {
	return {
		pos: getStartLocation(piece.type),
		...piece
	}
}
