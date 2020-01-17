/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   putPieceIntoBoard.test.js                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 15:42:00 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 18:02:31 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import putPieceIntoBoard from '../putPieceIntoBoard'
import pieces from '../tetrisPieces'

describe('Tests for putPieceIntoBoard', () => {
	it('works', () => {
		let board = new Array(30).fill(new Array(10).fill(0));
		let piece = {
			piece: pieces.o,
			pos: {x: 0, y: 28},
			type: 'o'
		};

		let res = putPieceIntoBoard(board, piece);
		let color = pieces.colors.o;
		expect(res).to.deep.equal([
			...new Array(28).fill(new Array(10).fill(0)),
			[color, color, 0,0,0,0,0,0,0,0],
			[color, color, 0,0,0,0,0,0,0,0]
		])
	})
})
