/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   bindSocketEvents.test.js                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 21:08:06 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 19:54:16 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Emitter from 'events'
import bindSocketEvents from './bindSocketEvents'
import playerGenerator from './classes/Player'

describe('Tests for bindSocketEvents', () => {

	let emitter;
	let player;
	let io;

	before(() => {
		io = {in: () => emitter};
		player = {
			id: 42,
			pseudo: 'bob',
			socket: null,
			roomId: undefined,
			joinGame: () => {},
			joinedGame: {
				randomPieceGenerator: {resetBeforeStart: () => ({toSend: () => 42})},
				playerList: [{toSend: () => ({id: 5})}],
			}
		};

		class MockGameManager {
			constructor() {
				this.games = {
					1: {toSend: () => ({id: 1})},
				};
			}
			getGames() {
				return Object.keys(this.games);
			}
			createGame(name, nb) {
				this.games[nb] = {toSend: () => ({id: nb})}
				return this.games[nb];
			}
		}

		bindSocketEvents.__Rewire__('gameManager', new MockGameManager());

	});

	beforeEach(() => {
		emitter = new Emitter();
		emitter.join = () => {};
		emitter.broadcast = {emit: () => {}}
		bindSocketEvents(io, emitter, player)
	});

	afterEach(() => emitter.removeAllListeners());

	it('emits gameList and setId at connection', done => {
		let didOnce = false;
		let emitter = new Emitter();

		function isDone() {
			if (didOnce)
				done();
			didOnce = true;
		}

		emitter.on('gameList', list => {
			expect(list).to.have.lengthOf(1);
			isDone();
		});
		emitter.on('setId', id => {
			expect(id).to.equal(42);
			isDone();
		});
		bindSocketEvents(io, emitter, player);
	});

	it('joins Game', done => {
			emitter.on('joinGame', game => {
			expect(game.id).to.equal(1);
			done();
		});
		emitter.emit('tryToJoinGame', 1);
	});

	it('creates game', done => {
		emitter.on('joinGame', game => {
			expect(game.id).to.equal('42');
			done();
		});
		emitter.emit('tryToJoinGame', 42);
	});

	it('changes pseudo', () => {
		emitter.emit('changePseudo', 'baba');
		expect(player.pseudo).to.equal('baba');
	});

	/*it('starts the game', () => {
		emitter.emit('tryToStartGame');
		expect(player.joinedGame.gameStarted).to.equal(true);
	})*/

})
