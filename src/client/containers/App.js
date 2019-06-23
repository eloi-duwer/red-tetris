import React from 'react'
import { connect } from 'react-redux'

import TetrisController from './TetrisController'

export const App = (props) => {
	return (
		<div style={{display: 'absolute', top: 0, height: '100vh', left: 0, width: '100vw'}}>
			<span style={{display: "block"}}>Red tetris, le tetris 99 du pécé</span>
			<TetrisController />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {}
};

const AppRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppRedux;
