import React, { useState } from 'react'
import {connect} from 'react-redux'

import TetrisDisplayer from './TetrisDisplayer'

const TetrisController = ({tetrisGameStarted, points}) => {

	const [gameStarted, setGameStarted] = useState(false);

	return (
		<div style={{height: '80%'}}>
			<button style={{display: "block"}} onClick={() => setGameStarted(!gameStarted)}>Cliquez pour {gameStarted ? "arrêter" : "commencer"} le tetris</button>
			{gameStarted
				? <>
						<div>Vous avez {points} points</div>
						<TetrisDisplayer />
					</>
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
	};
};

const TetrisControllerRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(TetrisController);

export default TetrisControllerRedux;
