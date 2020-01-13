/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Game.test.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/13 20:06:21 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 20:24:33 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Game from './Game'

describe('Tests for class Game', () => {
	let game;
	const norminet = {pseudo: 'norminet', id: 42};
	const moi = {id: 0, pseudo: 'moi', socket: {emit: () => {}}};

	it('Creates a game', () => {

		game = new Game('newGame', norminet, 'randomPieceGenerator');
		game.addPlayer(norminet);
		expect(game.name).to.equal('newGame');
	});

	it('adds a player to the list', () => {
		game.addPlayer(moi);
		expect(game.playerList).to.have.lengthOf(2);
	});

	it('toSend works', () => {
		expect(game.toSend(norminet).gameAdmin).to.equal(true);
	});

	it('removes a player and sets the admin', () => {
		game.removePlayer(norminet);
		expect(game.creator.id).to.equal(moi.id);
		game.removePlayer(moi);
	});
})
