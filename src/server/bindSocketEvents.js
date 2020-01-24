/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   bindSocketEvents.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 19:18:41 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/24 19:00:11 by eduwer           ###   ########.fr       */
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
    const game = gameManager.games[id];

    if (!game) { return createGame(id) }
    player.joinGame(game);
    socket.join(id);
    socket.emit('joinGame', game.toSend(player));
  });

  socket.on('quitGame', () => {
    player.quitGame();
  })

  socket.on('disconnect', () => {
    player.quitGame();
  });

  socket.on('changePseudo', pseudo => {
    player.pseudo = pseudo;
  });

  socket.on('tryToStartGame', gameConfig => {
    if (!player.joinedGame) { return; }
    const firstBag = player.joinedGame.randomPieceGenerator.resetBeforeStart();
    player.joinedGame.gameStarted = true;
    player.joinedGame.playerList.forEach(player => { player.playing = true });
    io.in(player.joinedGame.id).emit('startGame', {
      listOfPlayers: player.joinedGame.playerList
        .map(p => p.toSend())
        .reduce((acc, val) => ({ ...acc, [val.id]: val }), {}),
      firstBag: firstBag.toSend(),
      gameConfig,
    });
  });

  socket.on('stopGame', () => {
    if (!player.joinedGame) { return; }
    player.joinedGame.gameStarted = false;
    player.joinedGame.playerList.forEach(player => { player.playing = false });
    io.in(player.joinedGame.id).emit('stopGame');
  });

  socket.on('updatePlayer', newPlayerInfo => {
    if (!player.joinedGame) { return }
    socket.to(player.joinedGame.id).emit('updatePlayer', { id: player.id, ...newPlayerInfo });
  });

  socket.on('gameOver', finalPoints => {
    if (!player.joinedGame) { return; }
    player.playing = false;
    io.in(player.joinedGame.id).emit('updatePlayer', { id: player.id, gameOver: true, points: finalPoints });
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
