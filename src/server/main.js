/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:35:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 18:17:29 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const app = require('http').createServer();
const io = require('socket.io')(app);

const playerGenerator = require(__dirname + '/classes/Player.js');
const gameGenerator = require(__dirname + '/classes/Game.js');


let games = {};

io.on('connection', socket => {

  let player = playerGenerator.createPlayer();
  let game = gameGenerator.createGame(player);
  games[game.roomId] = game;

  socket.emit('gameList', games);

  socket.on('createGame', (name) => {
    let game = gameGenerator.createGame(player);
    games[game.id] = game;
  })
});

app.listen(8081);
console.log('app listening');
