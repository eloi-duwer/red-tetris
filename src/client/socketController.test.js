/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socketController.test.js                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 12:05:49 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 19:27:57 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import socketController from './socketController'
import {
	setId,
	setGameList,
	setGame,
	setGameStarted,
	setPlayersInfo,
	updatePlayerInfo,
} from './actions/socketActions'

import {
  addBagOfPieces,
  resetBagOfPieces,
  addLockedRows,
} from './actions/tetrisActions'

import EventEmitter from 'events';

//On remplace socket.io par un EventEmitter pour les tests:
//Le fonctionnement est le même: emitter.on(), emitter.emit().
let emitter = new EventEmitter();

socketController.__Rewire__('socketIOClient', () => emitter);

describe('Tests for socketController', () => {

	let store;
	const testStr = '123bob';
	const arrayTest = [1,2,3];
	let unsubscribe;

	before(() => {
		store = mockStore({
			tetrisReducer,
			socketReducer
		});
		socketController(store);
	})

	beforeEach(() => store.clearActions());

	afterEach(() => unsubscribe());

	const tests = [
		{func: setId, arg: testStr, name: 'setId'},
		{func: setGame, arg: testStr, name: 'joinGame'},
		{func: setGameList, arg: arrayTest, name: 'gameList'},
		{func: setGameStarted, arg: false, name: 'stopGame'},
		{func: updatePlayerInfo, arg: testStr, name: 'updatePlayer'},
		{func: addBagOfPieces, arg: arrayTest, name: 'nextBag'},
		{func: addLockedRows, arg: testStr, name: 'addLockedRows'},
	];

	tests.forEach(test => {
		it('store recieves ' + test.name + ' action', done => {
			let expectedAction = test.func(test.arg);
			unsubscribe = store.subscribe(() => {
				let action = store.getActions()[0];
				expect(action).to.deep.equal(expectedAction);
				done();
			});
			emitter.emit(test.name, test.arg);
		});
	});

	it('store recieves startGame actions', done => {
		let expected = [setPlayersInfo(arrayTest), resetBagOfPieces(arrayTest), setGameStarted(true)];

		unsubscribe = store.subscribe(() => {
			let actions = store.getActions();
			let action = expected.splice(expected.findIndex(e => e.type === actions[actions.length  - 1].type), 1)[0];
			expect(action).to.deep.equal(actions[actions.length  - 1]);
			if (expected.length === 0)
				done();
		});

		emitter.emit('startGame', {listOfPlayers: arrayTest, firstBag: arrayTest});
	});

})
