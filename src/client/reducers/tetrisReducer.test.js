/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetrisReducer.test.js                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 13:36:30 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 19:29:14 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import tetrisReducer from './tetrisReducer'

import {
	initBoardState,
	movePiece,
	rotatePiece,
	nextFrame,
	addBagOfPieces,
	resetBagOfPieces,
	holdPiece,
	addLockedRows
} from '../actions/tetrisActions'

describe('tets for tetrisReducer', () => {
	let state = {piecesList: ['s', 'p', 'q', 'r']};

	const test = 'test'
	const nb = 4;
	const arr = [42,42,42];
	const piece = {
		pos: {x: 10, y: 10},
		orientation: 0,
	};
	const otherPiece = {
		pos: {x: 15, y: 15},
		orientation: 2,
	};

	tetrisReducer.__Rewire__('nextPiece', () => piece);
	tetrisReducer.__Rewire__('canMovePiece', () => true);
	tetrisReducer.__Rewire__('putPieceIntoBoard', () => {});
	tetrisReducer.__Rewire__('checkTetris', () => ({newBoard: test, nbPoints: nb}));
	tetrisReducer.__Rewire__('rotatePiece', () => piece);
	tetrisReducer.__Rewire__('wallKick', () => ({...piece, orientation: 1}));
	tetrisReducer.__Rewire__('resetPiecePositionAndRotation', () => otherPiece);
	tetrisReducer.__Rewire__('handleAddLockedRows', () => ({boardState: test}));

	let tests = [
		{action: initBoardState, args: null, expected: {
			boardState: tetrisReducer.__GetDependency__('initialBoardState'),
			piece: piece,
			piecesList: ['p', 'q', 'r'],
			points: 0,
			gameOver: false,
			canHoldPiece: true,
			heldPiece: null
		}},
		{action: nextFrame, args: null, expected: {
			piece: {...piece, pos: {x: 10, y: 11}}
		}},
		{action: movePiece, args: {x: 20, y: 20}, expected: {
			piece: {
				...piece, pos: {x: 20, y: 20}}
		}},
		{action: rotatePiece, args: 1, expected: {
			piece: {...piece, orientation: 1}
		}},
		{action: holdPiece, args: null, expected: {
			canHoldPiece: false,
			heldPiece: otherPiece,
		}},
		{action: addBagOfPieces, args: arr, expected: {piecesList: ['q', 'r', ...arr]}},
		{action: resetBagOfPieces, args: arr, expected: {piecesList: arr}},
		{action: addLockedRows, args: 2, expected: {boardState: test}}
	];

	tests.forEach((test, i) => {
		it('action number ' + i + ' works', () => {
			let res = tetrisReducer(state, test.action(test.args));
			Object.keys(test.expected).forEach(key => {
				expect(res[key]).to.deep.equal(test.expected[key]);
			});
			state = res;
		})
	});

	it('Tests for calcPoints', () => {
		let calcPoints = tetrisReducer.__GetDependency__('calcPoints');
		expect(calcPoints(0)).to.equal(0);
		expect(calcPoints(1)).to.equal(40);
		expect(calcPoints(2)).to.equal(100);
		expect(calcPoints(3)).to.equal(300);
		expect(calcPoints(4)).to.equal(1200);
		expect(calcPoints(5)).to.equal(0);
	})

})
