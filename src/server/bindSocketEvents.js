/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   bindSocketEvents.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 19:18:41 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 00:12:17 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import gameManager from './classes/GameManager'
import RandomPieceGenerator from './classes/RandomPieceGenerator.js';

export default function bindSocketEvents(io, socket, player) {

	socket.emit('gameList', gameManager.getGames(player));
  socket.emit('setId', player.id);

	function createGame(name) {
    const game = gameManager.createGame(player, name || 'new game', new RandomPieceGenerator());
    player.joinGame(game);
    socket.join(game.id);
		socket.broadcast.emit('gameList', gameManager.getGames());
    socket.emit('joinGame', game.toSend(player));
  }

	socket.on('createGame', createGame);

	socket.on('tryToJoinGame', id => {
		let decoded = decodeURI(id);
		const game = gameManager.games[decoded];

		// Envoyer un message si game pas valide ?
		if (!game) { return createGame(decoded) }
		player.joinGame(game);
		socket.join(id);
		socket.emit('joinGame', game.toSend(player));
		//console.log(`player ${player.pseudo} joined room ${game.id}`);
	});

	socket.on('disconnect', () => {
		//console.log(`player ${player.pseudo} quitted his game`);
		player.quitGame();
	});

	socket.on('changePseudo', pseudo => {
		player.pseudo = pseudo;
		//console.log(`player ${player.id} changed pseudo to ${pseudo}`)
	});

	socket.on('tryToStartGame', gameConfig => {
		if (!player.joinedGame) { return; }
		const firstBag = player.joinedGame.randomPieceGenerator.resetBeforeStart();
		player.joinedGame.gameStarted = true;
		io.in(player.joinedGame.id).emit('startGame', {
			listOfPlayers: player.joinedGame.playerList
				.map(p => p.toSend())
				.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}),
			firstBag: firstBag.toSend(),
			gameConfig: gameConfig,
		});
	});

	socket.on('stopGame', () => {
		if (!player.joinedGame) { return; }
		player.joinedGame.gameStarted = false;
		io.in(player.joinedGame.id).emit('stopGame');
	});

	socket.on('updatePlayer', newPlayer => {
		if (!player.joinedGame) { return }
		io.in(player.joinedGame.id).emit('updatePlayer', { id: player.id, ...newPlayer });
	});

	socket.on('gameOver', finalPoints => {
		io.in(player.joinedGame.id).emit('updatePlayer', { id: player.id, gameOver: true, points: finalPoints });
		//console.log(`${player.pseudo} a fini sa partie avec ${finalPoints} points`);
	});

	socket.on('getNextBag', () => {
		if (!player.joinedGame) { return; }
		socket.emit('nextBag', player.joinedGame.randomPieceGenerator.getNextBag(player.id));
	});

	socket.on('addLockedRows', number => {
		if (!player.joinedGame) { return; }
		socket.to(player.joinedGame.id).emit('addLockedRows', number);
	});

}
