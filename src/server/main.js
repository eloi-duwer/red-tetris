/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:35:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 20:11:41 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import http from 'http';
import socketIo from 'socket.io';
import fs from 'fs';

import conf from '../../conf'

const app = http.createServer();

import playerGenerator from './classes/Player.js';
import gameManager from './classes/GameManager'

import bindSocketEvents from './bindSocketEvents'

gameManager.io = io;

const games = [];

if (process.env.NODE_ENV === 'production') {
  app.on('request', (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
    fs.readFile(__dirname + file, 'utf8',  (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        return res.end('Error loading file');
      }
      res.writeHead(200);
      return res.end(data);
    })
  })
}

app.listen({host: conf.host, port: conf.port});
console.log('Server listening on ' + conf.url);

const io = socketIo(app, {

  //probleme sinon quand chrome est en arriere-plan / afk
  pingTimeout: 60000,
});

io.on('connection', socket => {
  let player = playerGenerator.createPlayer(io, socket);
  bindSocketEvents(io, socket, player);
});
