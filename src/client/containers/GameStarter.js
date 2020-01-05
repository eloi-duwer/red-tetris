import React from 'react'
import { connect } from 'react-redux'

export const GameStarter = (props) => {

	const startGame = () => {
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
						onClick={props.gameStarted ? stopGame : startGame}
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
