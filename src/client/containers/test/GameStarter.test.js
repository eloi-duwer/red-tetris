/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameStarter.test.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 16:24:20 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 18:01:11 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import GameStarterRedux from '../GameStarter'
import EventEmitter from 'events'

const GameStarter = GameStarterRedux.__GetDependency__('GameStarter');

describe('Tests for GameStarter', () => {
	let emitter = new EventEmitter();
	let idGame = 5;
	let storeNonAdmin = mockStore({
		socketReducer: {
			...socketReducer,
			socket: emitter,
			gameStarted: false,
			game: {
				gameAdmin: true,
			}
		}
	});
	let storeAdmin = {
		socketReducer: {
			...socketReducer,
			socket: emitter,
			gameStarted: true,
			game: {
				gameAdmin: true,
			}
		}
	};

	it('Renders GameStarted with Redux wrapper', () => {
		let wrapper = shallow(<GameStarterRedux store={storeNonAdmin}/>);
		expect(wrapper.find(GameStarter)).to.have.lengthOf(1);
	});

	it('Start Game works', done => {
		let emit1 = new EventEmitter();
		storeAdmin.socketReducer.socket = emit1;
		storeAdmin.socketReducer.gameStarted = false;
		let wrapper = shallow(<GameStarterRedux store={mockStore(storeAdmin)}/>);
		emit1.on('tryToStartGame', () => {
			expect(true, 'startGame is called').to.equal(true);
			done();
		})
		wrapper.find(GameStarter).dive().find('button').simulate('click');
	});

	it('Stop Game works', done => {
		let emit2 = new EventEmitter();
		storeAdmin.socketReducer.socket = emit2;
		storeAdmin.socketReducer.gameStarted = true;
		let wrapper = shallow(<GameStarterRedux store={mockStore(storeAdmin)}/>);
		emit2.on('stopGame', () => {
			expect(true, 'stopGame is called').to.equal(true);
			done();
		})
		wrapper.find(GameStarter).dive().find('button').simulate('click');
	});

});
