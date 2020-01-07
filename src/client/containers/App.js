/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 16:38:50 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, {useState} from 'react'
import { connect } from 'react-redux'

import TetrisController from './TetrisController'
import GameSelector from './GameSelector'

const App = (props) => {

	const [pseudo, setPseudo] = useState("");

	const changePseudo = () => props.socket.emit('changePseudo', pseudo)

	return (
		<div style={{position: 'absolute', top: 0, height: '100vh', left: 0, width: '100vw'}}>
			<span style={{display: "block"}}>Red tetris, le tetris 99 du pécé</span>
			<input type='text' placeholder='pseudo' onChange={e => setPseudo(e.target.value)}></input><button onClick={changePseudo}>valider</button>
			{props.isGameSelected
				? <TetrisController />
				: <GameSelector />
			}
		</div>
	);
}



const mapStateToProps = state => {
	return {
		isGameSelected: !!state.socketReducer.game,
		socket: state.socketReducer.socket,
	};
};

const mapDispatchToProps = dispatch => {
	return {}
};

const AppRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppRedux;
