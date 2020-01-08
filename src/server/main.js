/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:35:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 14:26:38 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import http from 'http';
import socketIo from 'socket.io';

const app = http.createServer();
const io = socketIo(app, {
  pingTimeout: 60000,
});

import playerGenerator from './classes/Player.js';
import gameGenerator from './classes/Game.js';
import RandomPieceGenerator from './classes/RandomPieceGenerator.js';

const games = [];

io.on('connection', socket => {

  const player = playerGenerator.createPlayer(socket);

  socket.emit('gameList', games.map(g => g.toSend(player)));
  socket.emit('setId', player.id);

  socket.on('createGame', (name) => {
    const game = gameGenerator.createGame(player, name || 'new game', new RandomPieceGenerator());
    console.log(`new Game ${game.id}`);
    games.push(game);
    socket.broadcast.emit('gameList', games.map(g => g.toSend(player)));
    player.joinGame(game);
    socket.join(game.id);
    socket.emit('joinGame', game.toSend(player));
  });

  socket.on('joinGame', id => {
    const game = games.find(game => id === game.id);

    // Envoyer un message si game pas valide ?
    if (!game) { return; }
    player.joinGame(game);
    socket.join(id);
    socket.emit('joinGame', game.toSend(player));
    console.log(`player ${player.pseudo} joined room ${game.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`player ${player.pseudo} quitted his game`);
    player.quitGame();
  });

  socket.on('changePseudo', pseudo => {
    player.pseudo = pseudo;
    console.log(`player ${player.id} changed pseudo to ${pseudo}`)
  });

  socket.on('startGame', () => {
    if (!player.joinedGame) { return; }
    const firstBag = player.joinedGame.randomPieceGenerator.resetBeforeStart();
    player.joinedGame.gameStarted = true;
    io.in(player.joinedGame.id).emit('startGame', {
      listOfPlayers: player.joinedGame.playerList
        .map(p => p.toSend())
        .reduce((acc, val) => ({ ...acc, [val.id]: val }), {}),
      firstBag: firstBag.toSend(),
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

    // socket.to(player.joinedGame.id).emit('updatePlayer', {id: player.id, ...newPlayer});
  });

  socket.on('gameOver', finalPoints => {
    io.in(player.joinedGame.id).emit('updatePlayer', { id: player.id, gameOver: true, points: finalPoints });
    console.log(`${player.pseudo} a fini sa partie avec ${finalPoints} points`);
  });

  socket.on('getNextBag', () => {
    if (!player.joinedGame) { return; }
    socket.emit('nextBag', player.joinedGame.randomPieceGenerator.getNextBag(player.id));
  });

  socket.on('addLockedRows', number => {
    if (!player.joinedGame) { return; }
    io.in(player.joinedGame.id).emit('addLockedRows', number);

    // socket.to(player.joinedGame.id).emit('addLockedRows', number);
  });

});

const port = 8081;
app.listen(port);
console.log('app listening');
