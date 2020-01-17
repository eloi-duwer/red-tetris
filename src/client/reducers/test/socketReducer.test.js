/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socketReducer.test.js                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 13:22:23 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:18:54 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import socketReducer from '../socketReducer.js'

import {
	setGameList,
	setSocket,
	setId,
	setGame,
	setGameStarted,
	setPlayersInfo,
	updatePlayerInfo,
	setPseudo
} from '../../actions/socketActions.js'

describe('tests fom socketReducer.js', () => {

	let state = {};

	let array = [1,2,3];
	let obj = {a: 1, b: 42};

	it('sets GameList', () => {
		let res = socketReducer(state, setGameList(array));
		expect(res).to.deep.equal({gameList: array});
	});

	it('sets socket', () => {
		let res = socketReducer(state, setSocket(obj));
		expect(res).to.deep.equal({socket: obj});
	});

	it('sets game Id', () => {
		let res = socketReducer(state, setId(obj));
		expect(res).to.deep.equal({id: obj});
	});

	it('sets game', () => {
		let res = socketReducer(state, setGame(obj));
		expect(res.game).to.deep.equal(obj);
	});

	it('sets gameStarted', () => {
		let res = socketReducer(state, setGameStarted(true));
		expect(res).to.deep.equal({gameStarted: true});
	});

	it('sets players info', () => {
		let res = socketReducer(state, setPlayersInfo(obj));
		expect(res).to.deep.equal({playersInfo: obj});
	});

	it('updates playerInfo', () => {
		let res = socketReducer(state, setPlayersInfo({
			0: {points: 10, name: 'bob', id: 0}
		}));
		res = socketReducer(res, updatePlayerInfo({
			id: 0,
			points: 100,
		}));
		expect(res.playersInfo).to.deep.equal({0: {points: 100, name: 'bob', id: 0}});
	});

	it('changes the pseudo', () => {
		let res = socketReducer(state, setPseudo('bobi'));
		expect(res.pseudo).to.equal('bobi');
	})

})
