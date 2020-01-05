/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SocketController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 18:07:06 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/05 04:51:46 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import socketIOClient from "socket.io-client";

import {
	setGameList,
	setId,
	setSocket,
	setGame,
	setGameStarted,
	setPlayersInfo,
	updatePlayerInfo
} from './actions/socketActions'

export default reduxStore => {
  const socket = socketIOClient("http://127.0.0.1:8081");
	
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
		reduxStore.dispatch(setGameStarted(true));
	});

	socket.on('stopGame', () => {
		reduxStore.dispatch(setGameStarted(false));
	});

	socket.on('updatePlayer', newPlayerInfo => {
		reduxStore.dispatch(updatePlayerInfo(newPlayerInfo));
	});
}
