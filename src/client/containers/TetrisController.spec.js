/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisController.spec.js                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 16:47:16 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 13:21:30 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import TetrisControllerRedux from './TetrisController'
import EventEmitter from 'events'

let emitter = new EventEmitter();
let storeObj = {
	socketReducer: {
		...socketReducer,
		gameStarted: false,
		socket: emitter,
	},
	tetrisReducer: {
		...tetrisReducer,
		gameOver: false,
	}
};

let store = mockStore(storeObj);

describe('Test for TetrisController', () => {

	let TetrisController;
	let wrapper;

	before(() => {
		TetrisControllerRedux.__Rewire__('useEffect', mockUseEffect);
		TetrisControllerRedux.__Rewire__('frameControl', () => {});
		TetrisController = TetrisControllerRedux.__GetDependency__('TetrisController');
	})

	it('renders with Redux', () => {
		wrapper = shallow(<TetrisControllerRedux store={store}/>);
		expect(wrapper.find(TetrisController)).to.have.lengthOf(1);
	});

	it('calls initBoardState when game starts', () => {
		let called = false;
		wrapper = shallow(<TetrisController gameOver={false} gameStarted={false} initBoardState={() => {called = true}} points={100} socket={emitter}/>);
		wrapper.setProps({gameStarted: true});
		expect(called).to.equal(true);

	});

	it('emits gameOver', done => {
		emitter.on('gameOver', points => {
			expect(points).to.equal(100);
			done();
		})
		wrapper.setProps({gameOver: true});
		wrapper.setProps({gameStarted: false});
	})
})
