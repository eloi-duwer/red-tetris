/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:35:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 16:18:14 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const app = require('http').createServer();
const io = require('socket.io')(app, {
  pingTimeout: 60000,
});

const playerGenerator = require(__dirname + '/classes/Player.js');
const gameGenerator = require(__dirname + '/classes/Game.js');
const RandomPieceGenerator = require(__dirname + '/classes/RandomPieceGenerator.js');

let games = [];

io.on('connection', socket => {

	let player = playerGenerator.createPlayer(socket);

	socket.emit('gameList', games.map(g => g.toSend(player)));
	socket.emit('setId', player.id);

	socket.on('createGame', (name) => {
		let game = gameGenerator.createGame(player, name || 'new game', new RandomPieceGenerator());
		console.log(`new Game ${game.id}`);
		games.push(game);
		socket.broadcast.emit('gameList', games.map(g => g.toSend(player)));
		player.joinGame(game);
		socket.join(game.id);
		socket.emit('joinGame', game.toSend(player));
	});

	socket.on('joinGame', id => {
		let game = games.find(game => id === game.id);
		if (!game)
			return; //Envoyer un message si game pas valide ?
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
		if (!player.joinedGame)
			return;
		let firstBag = player.joinedGame.randomPieceGenerator.resetBeforeStart();
		player.joinedGame.gameStarted = true;
		io.in(player.joinedGame.id).emit('startGame', {
			listOfPlayers: player.joinedGame.playerList
				.map(p => p.toSend())
				.reduce((acc, val) => ({...acc, [val.id]: val}), {}),
				firstBag: firstBag.toSend(),
		});
	});

	socket.on('stopGame', () => {
		if (!player.joinedGame)
			return;
		player.joinedGame.gameStarted = false;
		io.in(player.joinedGame.id).emit('stopGame');
	});

	socket.on('updatePlayer', newPlayer => {
		if (!player.joinedGame)
			return
		//io.in(player.joinedGame.id).emit('updatePlayer', {id: player.id, ...newPlayer});
		socket.to(player.joinedGame.id).emit('updatePlayer', {id: player.id, ...newPlayer});
	});

	socket.on('gameOver', finalPoints => {
		io.in(player.joinedGame.id).emit('updatePlayer', {id: player.id, gameOver: true, points: finalPoints});
		console.log(`${player.pseudo} a fini sa partie avec ${finalPoints} points`);
	});

	socket.on('getNextBag', () => {
		if (!player.joinedGame)
			return;
		socket.emit('nextBag', player.joinedGame.randomPieceGenerator.getNextBag(player.id));
	});

});

app.listen(8081);
console.log('app listening');
