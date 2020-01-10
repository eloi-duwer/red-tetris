/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   frameControl.spec.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 14:35:28 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 14:53:37 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import frameControl from './frameControl'
import EventEmitter from 'events'

describe('Tests for frameControl', () => {
	let emitter = new EventEmitter();
	let boardState = [
		...new Array(28).fill(new Array(10).fill(0)),
		[2,2,0,0,0,2,2,0,0,0],
		[0,0,2,2,0,0,0,2,2,0]
	];
	let ghostBoardExpected = [18, 18, 19, 19, 20, 18, 18, 19, 19, 20];
	let state = {
		tetrisReducer: {
			points: 100,
			piecesList: ['s', 'o'],
			nbRowsCleared: 42,
			boardState: boardState,
			piece: 'abc'
		},
		socketReducer: {
			socket: emitter,
		}
	};

	const mocked = mockStore(state);

	frameControl.__Rewire__('store', mocked);

	let updatePlayer = null;
	let getNextBag = false;
	let addLockedRows = null;


	before(() => {
		emitter.on('updatePlayer', player => updatePlayer = player);
		emitter.on('getNextBag', () => getNextBag = true);
		emitter.on('addLockedRows', nb => addLockedRows = nb);
		frameControl();
	});

	it('dispatches next frame', () => {
		expect(mocked.getActions()).to.have.lengthOf(1);
	});

	it('Sends a player update', () => {
		expect(updatePlayer).to.deep.equal({
			points: 100,
			boardState: ghostBoardExpected,
			piece: state.tetrisReducer.piece
		});
	});

	it('requests next bag', () => {
		expect(getNextBag).to.equal(true);
	})

	it('sends locked rows', () => {
		expect(addLockedRows).to.equal(41);
	})
})
