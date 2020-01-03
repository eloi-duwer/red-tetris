/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SocketController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 18:07:06 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 18:20:23 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import socketIOClient from "socket.io-client";

import {setGameList} from './actions/socketsActions'

export default reduxStore => {
  const socket = socketIOClient("http://127.0.0.1:8081");
	socket.on('gameList', list => {
		reduxStore.dispatch(setGameList(list));
	});
}
