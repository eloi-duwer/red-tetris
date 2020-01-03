/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   createPiece.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:19:40 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 15:19:55 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import randomGenerator from './randomGenerator'
import pieces from './tetrisPieces'

export default function createPiece() {
	let piece = randomGenerator();
	let startLocation = {x: 3, y: 10};
	if (piece === "o")
		startLocation.x = 4;
	else if (piece === "i")
		startLocation.y = 9
	return {
		pos: startLocation,
		piece: pieces[piece],
		type: piece,
		orientation: 0
	};
}
