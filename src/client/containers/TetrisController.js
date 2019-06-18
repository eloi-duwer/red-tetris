import React from 'react'
import { connect } from 'react-redux'
import { store } from '../index'
import { startStopTetrisGame, initTetrisState } from '../actions/tetrisActions'

import TetrisDisplayer from './TetrisDisplayer'

let idTetrisController;
const displayerRef = React.createRef();

const startTetris = () => {
	let {tetrisGameStarted} = store.getState().tetrisReducer;
	store.dispatch(startStopTetrisGame());
	if (!tetrisGameStarted) { //On va la commencer
		store.dispatch(initTetrisState());
		idTetrisController = startTetrisInterval();
		displayerRef.current.focus();
	}
	else //On l'arrête
		clearInterval(idTetrisController);
}

const startTetrisInterval = () => setInterval(() => {
	//console.log("cc")
}, 1000);

const keyHandler = event => {
	console.log(event.key)
	switch (event.key) {
		case "ArrowUp":
		case "ArrowDown":
		case "ArrowLeft":
		case "ArrowRight":
		case " ":
			console.log(event.key);
			break;
		default:
			break;
	}
}

export const TetrisController = ({tetrisGameStarted}) => {
	return (
		<div>
			<button style={{display: "block"}} onClick={startTetris}>Cliquez pour {tetrisGameStarted ? "arrêter" : "commencer"} le tetris!</button>
			<div onKeyDown={keyHandler} ref={displayerRef} tabIndex="">
				{tetrisGameStarted ?
					<TetrisDisplayer />
					: undefined
				}
			</div>
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {};
};

const mapStateToProps = (state, props) => {
	return {
		tetrisGameStarted: state.tetrisReducer.tetrisGameStarted,
	};
};

const TetrisControllerRedux = connect(
	mapStateToProps,
	mapDispatchToProps
)(TetrisController);

export default TetrisControllerRedux;
