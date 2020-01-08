/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SocketController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 18:07:06 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 18:31:27 by eduwer           ###   ########.fr       */
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
} from './actions/socketActions'

import {
  addBagOfPieces,
  resetBagOfPieces,
  addLockedRows,
} from './actions/tetrisActions'

export default reduxStore => {
  const socket = socketIOClient(':8081');

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
}
