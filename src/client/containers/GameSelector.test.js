/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameSelector.test.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 15:46:20 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 19:29:51 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import GameSelectorRedux from './GameSelector'
import EventEmitter from 'events'

const GameSelector = GameSelectorRedux.__GetDependency__('GameSelector');

describe('Tests for GameSelector', () => {
	let emitter = new EventEmitter();
	let idGame = 5;
	let store = mockStore({
		socketReducer: {
			...socketReducer,
			socket: emitter,
			gameList: [{id: idGame, name: 'gameAbc', creator: 'no man', playerList: []}]
		}
	});
	let wrapper = shallow(<GameSelectorRedux store={store}/>);
	let gameSelector;
	if (wrapper.find(GameSelector))
		gameSelector = wrapper.find(GameSelector).dive();

	it('renders GameSelector with Redux Wrapper', () => {
		expect(wrapper.find(GameSelector)).to.have.lengthOf(1);
	});

	it('renders one available game', () => {
		expect(gameSelector.find('.oneGame')).to.have.lengthOf(1);
	});

	it('Change game name / create new game', done => {
		const gameName = 'toto'
		gameSelector.find('input').simulate('change', {target: {value: gameName}});
		emitter.on('createGame', newName => {
			expect(newName).to.equal(gameName);
			done()
		})
		gameSelector.find('#createGame > button').simulate('click');
	});

	it('Joins the game', done => {
		emitter.on('tryToJoinGame', id => {
			expect(id).to.equal(idGame);
			done();
		});
		gameSelector.find('.oneGame > button').simulate('click');
	});

});
