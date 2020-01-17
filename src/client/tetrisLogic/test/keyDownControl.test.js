/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   keyDownControl.test.js                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 15:06:53 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:33:12 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { keyDownControl, __RewireAPI__ as rewireApi } from '../keyDownControl'

import pieces from '../tetrisPieces'

import { movePiece, rotatePiece, holdPiece } from '../../actions/tetrisActions'

describe('tests for keyDownControl', () => {
	let store = {
		tetrisReducer: {
			piece: {
				pos: {x: 5, y: 10},
				piece: pieces.j,
				type: 'j'
			},
			gameOver: false,
			boardState: new Array(30).fill(new Array(10).fill(0)),
			keysDown: {
				'a' : true,
				ArrowLeft: true,
				ArrowRight: true,
				ArrowUp: true,
				ArrowDown: true,
				KeyZ: true,
				Space: true,
				Enter: true,
			},
		},
		socketReducer: {
			timeoutFunc: 10,
			gameStarted: true,
		}
	}
	let mocked = mockStore(store);

	rewireApi.__Rewire__('store', mocked);
	rewireApi.__Rewire__('setTimeout', 'coucou');
	rewireApi.__Rewire__('frameControlWithTimeout', () => {});
	rewireApi.__Rewire__('frameControl', () => {});
	let keyHandler = rewireApi.__GetDependency__('keyDownControlFiredOnlyOnce');

	afterEach(() => {
		mocked.clearActions();
	})

	it('keyDownControl does not call handler fun if the key is already pressed', () => {
		keyDownControl({code: 'a'});
		let called = false;
		rewireApi.__Rewire__('keyDownControlFiredOnlyOnce', () => {called = true});
		expect(mocked.getActions()).to.have.lengthOf(1);
		expect(called).to.equal(false);
	})

	it('handles cw rotations', () => {
		keyHandler({code: 'ArrowUp'});
		expect(mocked.getActions()[0]).to.deep.equal(rotatePiece(1));
	})

	it('handles ccw rotations', () => {
		keyHandler({code: 'KeyZ'});
		expect(mocked.getActions()[0]).to.deep.equal(rotatePiece(-1));
	})

	it('handles soft drop', () => {
		store.socketReducer.timeoutFunc = undefined;
		mocked = mockStore(store);
		rewireApi.__Rewire__('store', mocked);
		let called = false;
		rewireApi.__Rewire__('frameControl', () => {called = true});
		keyHandler({code: 'ArrowDown'});
		expect(mocked.getActions()[0]).to.deep.equal({
			type: "SAVETIMEOUTFUNC",
			timeoutFunc: undefined,
		});
		expect(called).to.equal(true);
	})

	it('handles left moving', () => {
		keyHandler({code: 'ArrowLeft'});
		expect(mocked.getActions()[0]).to.deep.equal(movePiece({x: 4, y: 10}));
	})

	it('handles right moving', () => {
		keyHandler({code: 'ArrowRight'});
		expect(mocked.getActions()[0]).to.deep.equal(movePiece({x: 6, y: 10}));
	})

	it('handles hard drop', () => {
		keyHandler({code: 'Space'});
		expect(mocked.getActions()[0]).to.deep.equal(movePiece({x: 5, y: 28}));
	})

	it('handles hold piece', () => {
		keyHandler({code: 'Enter'});
		expect(mocked.getActions()[0]).to.deep.equal(holdPiece());
	});

	it('handles other keys by doing nothing', () => {
		keyHandler({code: 'KeyD'});
		expect(mocked.getActions()).to.have.lengthOf(0);
	})
})
