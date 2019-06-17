import React from 'react'
import { connect } from 'react-redux'

import TetrisDisplayer from './TetrisDisplayer'

export const App = (props) => {
	return (
		<div>
			<span style={{display: "block"}}>Red tetris, le tetris 99 du pécé</span>
			<TetrisDisplayer />
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
