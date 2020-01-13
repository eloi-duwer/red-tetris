/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   handleAddLockedRows.test.js                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 14:52:33 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 19:28:45 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import handleAddLockedRows from './handleAddLockedRows'

import tetrisPieces from './tetrisPieces'

describe('tests for handleAddLockedRows', () => {
	const board = new Array(30).fill(new Array(10).fill(0));

	const state = {
		boardState: board,
		piece: {
			type: 'o',
			pos: {x: 0, y: 25},
			orientation: 0,
			piece: tetrisPieces.o,
		}
	};

	it('adds rows without moving the piece', () => {
		const {boardState, piece} = handleAddLockedRows(state, 1);
		expect(boardState[29]).to.deep.equal(new Array(10).fill(-1));
		expect(piece).to.equal(undefined);
	});

	it('adds rows and moves the piece', () => {
		const {boardState, piece} = handleAddLockedRows(state, 10);
		expect(piece.pos).to.deep.equal({x: 0, y: 18})
	});

	it('sets Game over if the piece can\'t be placed', () => {
		const {gameOver} = handleAddLockedRows(state, 100);
		expect(gameOver).to.equal(true);
	})
})
