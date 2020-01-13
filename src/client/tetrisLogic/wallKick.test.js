/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   wallKick.test.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 16:01:43 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 19:49:24 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import wallKick from './wallKick'

import pieces from './tetrisPieces'
import {rotatePiece} from './moveAndRotationPiece'

describe('Tests for wallKick', () => {
	let emptyBoard = tetrisReducer.boardState;

	let oldPieceData = {
		piece: pieces.j,
		orientation: 0,
		type: 'j',
		pos: {x: 0, y: 10},
	};

	it('works if no wallKick is needed', () => {
		let newPiece = wallKick(emptyBoard, oldPieceData, rotatePiece(oldPieceData.piece, 1), 1);
		expect(newPiece).to.deep.equal({
			...oldPieceData,
			orientation: 1,
			piece: rotatePiece(pieces.j, 1)
		});
	})

	it('works if wallkick is needed', () => {
		oldPieceData.piece = rotatePiece(pieces.i, 1)
		oldPieceData.orientation = 1
		oldPieceData.pos.x = -1;
		let newPiece = wallKick(emptyBoard, oldPieceData, rotatePiece(oldPieceData.piece, 1), 2);
		expect(newPiece).to.deep.equal({
			...oldPieceData,
			orientation: 2,
			piece: rotatePiece(oldPieceData.piece, 1),
			pos: {x: 0, y: 10}
		})
	})
})
