/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socketActions.test.js                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 11:36:47 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 19:30:47 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	setSocket,
	SETSOCKET,
	setGameList,
	SETGAMELIST,
	setId,
	SETID,
	setGame,
	SETGAME,
	setGameStarted,
	SETGAMESTARTED,
	setPlayersInfo,
	SETPLAYERSINFO,
	updatePlayerInfo,
	UPDATEPLAYERINFO
} from './socketActions';

describe('Tests for socketActions', () => {
		let tests = [
			{func: setSocket, type: SETSOCKET, name: 'socket'},
			{func: setGameList, type: SETGAMELIST, name: 'gameList'},
			{func: setId, type: SETID, name: 'id'},
			{func: setGame, type: SETGAME, name: 'game'},
			{func: setGameStarted, type: SETGAMESTARTED, name: 'gameStarted'},
			{func: setPlayersInfo, type: SETPLAYERSINFO, name: 'playersInfo'},
			{func: updatePlayerInfo, type: UPDATEPLAYERINFO, name: 'newPlayerInfo'},
		];

		let strTest = 'testAbc';

		tests.forEach(test => {
			it(test.type + ' action works', () => {
			let res = test.func(strTest);
			expect(res.type).to.equal(test.type);
			expect(res[test.name]).to.equal(strTest);
		});
	});
})
