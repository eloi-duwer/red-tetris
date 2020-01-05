/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/05 18:17:00 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { initBoardState } from '../actions/tetrisActions'

import TetrisDisplayer from './TetrisDisplayer'
import GameStarter from './GameStarter'
import OtherPlayersDisplayer from './OtherPlayersDisplayer'
import frameControl from '../tetrisLogic/frameControl'
import keyDownControl from '../tetrisLogic/keyDownControl'


const TetrisController = ({gameStarted, points, ...props}) => {

	const [intervalFunc, saveIntervalFunc] = useState(null);

	useEffect(() => {
		if (gameStarted) {
			props.initBoardState();
			saveIntervalFunc(setInterval(frameControl, 750));
			document.body.addEventListener("keydown", keyDownControl);
		}
		else if (intervalFunc) {
			clearInterval(intervalFunc);
			document.body.removeEventListener("keydown", keyDownControl);
		}
	}, [gameStarted])

	return (
		<div style={{height: '80%', display: "flex", "flexDirection": "column", "alignItems": "flex-start"}}>
			<GameStarter />
			{gameStarted
				? <div>
						<div>Vous avez {points} points</div>
						<div style={{display: 'flex'}}>
							<TetrisDisplayer size={20}/>
							<OtherPlayersDisplayer />
						</div>
					</div>
				: undefined
			}
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		initBoardState: () => dispatch(initBoardState()),
	};
};

const mapStateToProps = (state, props) => {
	return {
		points: state.tetrisReducer.points || 0,
		gameStarted: !!(state.socketReducer || {}).gameStarted,
	};
};

const TetrisControllerRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(TetrisController);

export default TetrisControllerRedux;
