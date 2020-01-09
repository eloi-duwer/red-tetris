/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   helpers.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/08 18:07:35 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/09 15:37:50 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
//Fix de warnings inutile
React.useLayoutEffect = React.useEffect
import { expect } from 'chai';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import EventEmitter from 'events'

global.mockStore = configureStore([]);

global.expect = expect;

configure({ adapter: new Adapter() });

global.React = React;

//Fonctions d'enzyme pour emuler le montage/demontage des composants
global.mount = mount;
global.render = render;
global.shallow = shallow;

//State pour mocker la partie redux
import { nextPiece } from '../src/client/tetrisLogic/nextPiece'

global.tetrisReducer = {
	boardState: new Array(30).fill(new Array(10).fill(0)),
	piece: nextPiece({piecesList: ['l']}),
	gameOver: false,
	points: 100,
	heldPiece: nextPiece({piecesList: ['s']}),
	piecesList: ['s', 'z'],
}

global.socketReducer = {
	playersInfo: {
		0: {
			boardState: new Array(30).fill(new Array(10).fill(0)),
			piece: nextPiece({piecesList: ['z']}),
			gameOver: false,
			points: 100,
			pseudo: 'bob',
		},
		1: {
			boardState: new Array(30).fill(new Array(10).fill(0)),
			piece: nextPiece({piecesList: ['z']}),
			gameOver: false,
			points: 100,
			pseudo: 'me',
		},
	},
	id: 1,
}
