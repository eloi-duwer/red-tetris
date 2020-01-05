/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/05 04:25:52 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react'
import {connect} from 'react-redux'

import TetrisDisplayer from './TetrisDisplayer'
import GameStarter from './GameStarter'
import OtherPlayersDisplayer from './OtherPlayersDisplayer'

const TetrisController = ({gameStarted, points}) => {

	return (
		<div style={{height: '80%', display: "flex", "flexDirection": "column", "alignItems": "flex-start"}}>
			<GameStarter />
			{gameStarted
				? <div>
						<div>Vous avez {points} points</div>
						<div style={{display: 'flex'}}>
							<TetrisDisplayer />
							<OtherPlayersDisplayer />
						</div>
					</div>
				: undefined
			}
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {};
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
