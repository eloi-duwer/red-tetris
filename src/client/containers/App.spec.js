/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.spec.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 14:33:59 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/09 15:54:11 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import AppRedux from './App'
import EventEmitter from 'events'
import TetrisController from './TetrisController'

const App = AppRedux.__GetDependency__('App');

let emitter = new EventEmitter();
const store = mockStore({
	socketReducer: {
		...socketReducer,
		socket: emitter
	}
});

describe('tests for App.js', () => {
	let wrapper = shallow(<AppRedux store={store}/>);

	it('renders the App', () => {
		expect(wrapper.find(App)).to.have.lengthOf(1);
	})

	it('updates the name', done => {
		let app = wrapper.find(App).dive();
		const name = 'bob';

		app.find('input').simulate('change', {target: {value: name}});
		emitter.on('changePseudo', newName => {
			expect(newName).to.equal(name);
			done();
		})

		app.find('button').simulate('click');
	});

	it('renders TetrisController if a game is Selected', () => {
			let component = shallow(<App isGameSelected={true}/>);
			expect(component.find(TetrisController)).to.have.lengthOf(1);
	})

})
