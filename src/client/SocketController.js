/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SocketController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 18:07:06 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 20:37:50 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import socketIOClient from 'socket.io-client';

import {
  setGameList,
  setId,
  setSocket,
  setGame,
  setGameStarted,
  setPlayersInfo,
  updatePlayerInfo,
  setPseudo,
  newGameAdmin,
} from './actions/socketActions'

import {
  addBagOfPieces,
  resetBagOfPieces,
  addLockedRows,
  setGameConfig,
} from './actions/tetrisActions'

function joinGameAndSetPseudo(reduxStore, socket) {
  const splitUrl = window.location.href.split('/');
  const params = splitUrl[splitUrl.length - 1];
  if (!params) {
    return;
  }
  const gameName = (params.split('#')[1] || '').split('[')[0];
  if (gameName) {
    socket.emit('tryToJoinGame', decodeURI(gameName));
  }
  const pseudo = (params.split('[')[1] || '').split(']')[0] || 'unknown';
  reduxStore.dispatch(setPseudo(pseudo));
  socket.emit('changePseudo', pseudo);

}

export default reduxStore => {

  const socket = socketIOClient(':8081');

  joinGameAndSetPseudo(reduxStore, socket);

  reduxStore.dispatch(setSocket(socket));

  socket.on('setId', id => reduxStore.dispatch(setId(id)))

  socket.on('gameList', list => {
    reduxStore.dispatch(setGameList(list));
  });

  socket.on('joinGame', game => {
    reduxStore.dispatch(setGame(game));
  });

  socket.on('startGame', (startGameInfos) => {
    reduxStore.dispatch(setPlayersInfo(startGameInfos.listOfPlayers));
    reduxStore.dispatch(resetBagOfPieces(startGameInfos.firstBag));
    reduxStore.dispatch(setGameConfig(startGameInfos.gameConfig));
    reduxStore.dispatch(setGameStarted(true));
  });

  socket.on('stopGame', () => {
    reduxStore.dispatch(setGameStarted(false));
  });

  socket.on('updatePlayer', newPlayerInfo => {
    reduxStore.dispatch(updatePlayerInfo(newPlayerInfo));
  });

  socket.on('nextBag', nextBag => {
    reduxStore.dispatch(addBagOfPieces(nextBag));
  });

  socket.on('addLockedRows', number => {
    reduxStore.dispatch(addLockedRows(number));
  });

  socket.on('newAdmin', () => {
    reduxStore.dispatch(newGameAdmin());
  });

}
