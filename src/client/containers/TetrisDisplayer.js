import React from 'react'
import { connect } from 'react-redux'

import '../css/TetrisDisplayer.css'

const colorTable = ["white", "black", "skyblue"]

export const TetrisDisplayer = ({tetrisState}) => {
	console.log(tetrisState)
	return (
		<div className="TetrisDisplayer">
			{tetrisState.map((tetrisRow, index) => {
				return (
					<div key={index} className="TetrisRow">
						{tetrisRow.map((tetrisCase, index) => 
							<div className="TetrisCase" key={index} style={{color: colorTable[tetrisCase]}}></div>
						)}
					</div>
				);
			})}
		</div>
	);
}

const emptyArray = [];

const mapStateToProps = (state) => {
	return {
		tetrisState: state.tetrisReducer.tetrisState || emptyArray,
	};
};

const mapDispatchToProps = dispatch => {
	return {}
};

const TetrisDisplayerRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(TetrisDisplayer);

export default TetrisDisplayerRedux;
