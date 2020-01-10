/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   keyDownControl.spec.js                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 15:06:53 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 15:46:59 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import keyDownControl from './keyDownControl'

import pieces from './tetrisPieces'

import { movePiece, rotatePiece, holdPiece } from '../actions/tetrisActions'

describe('tests for keyDownControl', () => {
	const mocked = mockStore({
		tetrisReducer: {
			piece: {
				pos: {x: 5, y: 10},
				piece: pieces.j,
				type: 'j'
			},
			boardState: new Array(30).fill(new Array(10).fill(0))
		}
	});

	keyDownControl.__Rewire__('store', mocked);

	afterEach(() => {
		mocked.clearActions();
	})

	it('handles cw rotations', () => {
		keyDownControl({code: 'ArrowUp'});
		expect(mocked.getActions()[0]).to.deep.equal(rotatePiece(1));
	})

	it('handles ccw rotations', () => {
		keyDownControl({code: 'KeyZ'});
		expect(mocked.getActions()[0]).to.deep.equal(rotatePiece(-1));
	})

	it('handles soft drop', () => {
		keyDownControl({code: 'ArrowDown'});
		expect(mocked.getActions()[0]).to.deep.equal(movePiece({x: 5, y: 11}));
	})

	it('handles left moving', () => {
		keyDownControl({code: 'ArrowLeft'});
		expect(mocked.getActions()[0]).to.deep.equal(movePiece({x: 4, y: 10}));
	})

	it('handles right moving', () => {
		keyDownControl({code: 'ArrowRight'});
		expect(mocked.getActions()[0]).to.deep.equal(movePiece({x: 6, y: 10}));
	})

	it('handles hard drop', () => {
		keyDownControl({code: 'Space'});
		expect(mocked.getActions()[0]).to.deep.equal(movePiece({x: 5, y: 28}));
	})

	it('handles hold piece', () => {
		keyDownControl({code: 'Enter'});
		expect(mocked.getActions()[0]).to.deep.equal(holdPiece());
	});

	it('handles other keys by doing nothing', () => {
		keyDownControl({code: 'KeyD'});
		expect(mocked.getActions).to.have.lengthOf(0);
	})
})
