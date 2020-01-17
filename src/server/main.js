/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:35:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:56:18 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import http from 'http';
import socketIo from 'socket.io';
import fs from 'fs';
import path from 'path'

import conf from '../../conf'

const app = http.createServer();

import playerGenerator from './classes/Player.js';
import gameManager from './classes/GameManager'

import bindSocketEvents from './bindSocketEvents'

const codeErr = 500;
const codeOk = 200;

if (process.env.NODE_ENV === 'production') {
  app.on('request', (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
    fs.readFile(path.join(__dirname, file), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(codeErr);
        return res.end('Error loading file');
      }
      res.writeHead(codeOk);
      return res.end(data);
    })
  })
}

app.listen({ host: conf.host, port: conf.port });
console.log(`Server listening on ${ conf.url}`);

const io = socketIo(app, {

  // probleme sinon quand chrome est en arriere-plan / afk
  pingTimeout: 60000,
});

gameManager.setIo(io);

io.on('connection', socket => {
  const player = playerGenerator.createPlayer(io, socket);
  bindSocketEvents(io, socket, player);
});
