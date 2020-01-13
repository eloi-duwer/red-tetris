/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameManager.test.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/13 19:54:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 20:05:19 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import EventEmitter from 'events'

import gameManager from './GameManager'
import playerGenerator from './Player'

describe('Tests for GameManager', () => {
	let player;
	let game;
	const gameName = 'newGame!';

	before(() => {
		player = playerGenerator.createPlayer('io', 'socket');
	});

	it('Creates a new Game', () => {
		game = gameManager.createGame(player, gameName, 'randomPieceGenerator');
		expect(game.id).to.equal(Object.keys(gameManager.games)[0]);
	});

	it('Changes the name if it is already taken', () => {
		game = gameManager.createGame(player, gameName, 'randomPieceGenerator');
		expect(game.name).to.not.equal(gameName);
		game = gameManager.createGame(player, gameName, 'randomPieceGenerator');
		expect(game.name).to.not.equal(gameName);
	});
	it('deletes the game', done => {
		let nbGames = Object.keys(gameManager.games).length;
		gameManager.io = new EventEmitter();
		gameManager.io.on('gameList', games => {
			expect(games).to.have.lengthOf(nbGames - 1);
			expect(Object.keys(gameManager.games).length).to.equal(nbGames - 1);
			done();
		})
		gameManager.deleteGame(gameName);
	})
})
