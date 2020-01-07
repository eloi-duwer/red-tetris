/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 20:59:03 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { initBoardState } from '../actions/tetrisActions'

import GameStarter from './GameStarter'
import TetrisDisplayer from '../components/TetrisDisplayer'
import OtherPlayersDisplayer from '../components/OtherPlayersDisplayer'
import HoldAndCommingNextDisplayer from '../components/HoldAndCommingNextDisplayer'
import frameControl from '../tetrisLogic/frameControl'
import keyDownControl from '../tetrisLogic/keyDownControl'

const TetrisController = ({gameStarted, points, ...props}) => {

	const [intervalFunc, saveIntervalFunc] = useState(null);

	const stopGame = () => {
		if (intervalFunc) {
			clearInterval(intervalFunc);
			saveIntervalFunc(null);
			document.body.removeEventListener("keydown", keyDownControl);
		}
	}

	useEffect(() => {
		if (gameStarted) {
			props.initBoardState();
			saveIntervalFunc(setInterval(frameControl, 750));
			document.body.addEventListener("keydown", keyDownControl);
		} else {
			stopGame();
		}
	}, [gameStarted]);

	useEffect(() => {
		if (intervalFunc && props.gameOver) {
			stopGame();
			props.socket.emit('gameOver', points);
		}
	}, [props.gameOver, gameStarted])

	return (
		<div style={{height: '80%', display: "flex", "flexDirection": "column", "alignItems": "flex-start"}}>
			<GameStarter />
			{gameStarted
				? <div>
						<div>Vous avez {points} points</div>
						<div style={{display: 'flex'}}>
							<TetrisDisplayer size={25} ownPlayer/>
							<HoldAndCommingNextDisplayer />
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

const mapStateToProps = (state) => {
	return {
		points: state.tetrisReducer.points || 0,
		gameStarted: !!state.socketReducer.gameStarted,
		gameOver: state.tetrisReducer.gameOver || false,
		socket: state.socketReducer.socket,
	};
};

const TetrisControllerRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(TetrisController);

export default TetrisControllerRedux;
