/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:35:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 20:00:18 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import http from 'http';
import socketIo from 'socket.io';

const app = http.createServer();
const io = socketIo(app, {
  pingTimeout: 60000,
});

import playerGenerator from './classes/Player.js';

import gameController from './classes/GameController'

gameController.io = io;

const games = [];

io.on('connection', socket => {

  playerGenerator.createPlayer(io, socket);

});

const port = 8081;
app.listen(port);
console.log('app listening');
