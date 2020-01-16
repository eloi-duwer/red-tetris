/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetrisActions.test.js                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 11:48:58 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 19:30:41 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	initBoardState,
	INITBOARDSTATE,
	movePiece,
	MOVEPIECE,
	rotatePiece,
	ROTATEPIECE,
	nextFrame,
	NEXTFRAME,
	addBagOfPieces,
	ADDBAGOFPIECES,
	resetBagOfPieces,
	RESETBAGOFPIECES,
	holdPiece,
	HOLDPIECE,
	addLockedRows,
	ADDLOCKEDROWS,
} from './tetrisActions';

describe('Tests for tetrisActions', () => {
		let tests = [
			{func: initBoardState, type: INITBOARDSTATE, name: null},
			{func: movePiece, type: MOVEPIECE, name: 'newPos'},
			{func: rotatePiece, type: ROTATEPIECE, name: 'direction'},
			{func: nextFrame, type: NEXTFRAME, name: null},
			{func: addBagOfPieces, type: ADDBAGOFPIECES, name: 'newBag'},
			{func: resetBagOfPieces, type: RESETBAGOFPIECES, name: 'firstBag'},
			{func: holdPiece, type: HOLDPIECE, name: null},
			{func: addLockedRows, type: ADDLOCKEDROWS, name: 'numberOfRows'},
		];

		let strTest = 'test123';

		tests.forEach(test => {
			it(test.type + ' action works', () => {
			let res = test.func(strTest);
			expect(res.type).to.equal(test.type);
			if (test.name !== null)
				expect(res[test.name]).to.equal(strTest);
		});
	});
})
