/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisController.spec.js                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 16:47:16 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/09 17:05:07 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import TetrisControllerRedux from './TetrisController'
import EventEmitter from 'events'

const TetrisController = TetrisControllerRedux.__GetDependency__('TetrisController');

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

	let wrapper;
	let controller;

	it('renders with Redux', () => {
		wrapper = shallow(<TetrisControllerRedux store={store}/>);
		controller = wrapper.find(TetrisController);
		expect(controller).to.have.lengthOf(1);
		controller = controller.dive();
	});

	it('creates an intervalFunc', () => {
		controller.setProps({gameStarted: true});
		store.getActions();
		
	})
})
