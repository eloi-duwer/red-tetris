/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameStarter.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/05 00:42:23 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 16:39:00 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, {useRef} from 'react'
import { connect } from 'react-redux'

const GameStarter = (props) => {

	const buttonRef = useRef();

	const startGame = () => {
		if (buttonRef.current)
			buttonRef.current.blur();
		props.socket.emit('startGame');
	}

	const stopGame = () => {
		props.socket.emit('stopGame');
	}

	return (
		<div className="GameStarter">
			{props.gameAdmin
				? <div>
					<button
						ref={buttonRef} onClick={props.gameStarted ? stopGame : startGame }
					>{props.gameStarted ? "Arrêter" : "Commencer"} la partie</button>
				</div>
				: <div>
					{props.gameStarted ? "" : "Attendez que l'administarteur lance la partie"}
				</div>
			}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		gameAdmin: state.socketReducer.game.gameAdmin,
		socket: state.socketReducer.socket,
		gameStarted: state.socketReducer.gameStarted
	};
};

const mapDispatchToProps = dispatch => {
	return {}
};

const GameStarterRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameStarter);

export default GameStarterRedux;
