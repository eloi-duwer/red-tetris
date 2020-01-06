/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   nextPiece.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/06 16:13:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/06 16:28:40 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import randomGenerator from './randomGenerator'
import pieces from './tetrisPieces'

export default function nextPiece(state) {
	let piece = state.piecesList[0] || randomGenerator();

	let startLocation = {x: (piece === 'o'? 4 : 3), y: (piece === 'i' ? 9 : 10)};
	return {
		pos: startLocation,
		piece: pieces[piece],
		type: piece,
		orientation: 0
	};
}
