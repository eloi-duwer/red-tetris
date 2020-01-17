/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Player.test.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/13 19:26:19 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 18:03:13 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import playerGenerator from '../Player'

describe('Tests for Player and PlayerGenerator', () => {

	let player;
	let removePlayer_called = false;

	it('generates a player', () => {
		player = playerGenerator.createPlayer('io', 'socket')
		expect(playerGenerator.id).to.equal(player.id);
		expect(player).to.have.all.keys(['id', 'pseudo', 'socket', 'roomId', 'joinedGame']);
	});

	it('player can join a game', () => {
		let addPlayer_called = false;
		let game = {
			playerList: [],
			addPlayer: () => {addPlayer_called = true},
			removePlayer: (player) => {removePlayer_called = true},
			creator: 'no_one',
		};
		player.joinGame(game);
		expect(addPlayer_called).to.equal(true);
		expect(player.joinedGame).to.equal(game);
	});

	it('toSend works', done => {
		player.toSend();
		done();
	})

	it('player can quit game', () => {
		player.quitGame();
		expect(player.joinedGame).to.equal(null);
		expect(removePlayer_called).to.equal(true);
	});
})
