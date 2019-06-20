import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initBoardState } from '../actions/tetrisActions'
import pieces from '../tetrisLogic/tetrisPieces'

import frameControl from '../tetrisLogic/frameControl'
import keyDownControl from '../tetrisLogic/keyDownControl'

import '../css/TetrisDisplayer.css'

const displayerRef = React.createRef();

const colorSelecter = (tetrisCase, piecePlaces, i, j) => {
	if (tetrisCase !== 0)
		return tetrisCase;
	let place = piecePlaces.find(p => p.x === j && p.y === i);
	if (place)
		return place.color;
	return "white";
}

export const TetrisDisplayer = ({boardState, tetrisPiece, ...props}) => {

	useEffect(() => {

		props.initBoardState();
		displayerRef.current.focus();
		let idInterval = setInterval(frameControl, 750);

		return () => {
			clearInterval(idInterval);
		}
	}, [])

	let piecePlaceToPaint = [];
	if (tetrisPiece !== emptyObj) {
		tetrisPiece.piece.forEach((row, i) => {
			row.forEach((piece, j) => {
				if (piece !== 0)
					piecePlaceToPaint.push({x: tetrisPiece.pos.x + j, y: tetrisPiece.pos.y + i - 10, color: pieces.colors[tetrisPiece.type]});
			})
		})
	}

	return (
		<div className="TetrisDisplayer" ref={displayerRef} onKeyDown={keyDownControl} tabIndex="">
			{boardState.slice(10).map((tetrisRow, i) => {
				return (
					<div key={i} className="TetrisRow">
						{tetrisRow.map((tetrisCase, j) =>
							<div className="TetrisCase" key={j} style={{"backgroundColor": colorSelecter(tetrisCase, piecePlaceToPaint, i, j)}}></div>
						)}
					</div>
				);
			})}
		</div>
	);
}

const emptyArray = [];
const emptyObj = {};

const mapStateToProps = (state) => {
	return {
		boardState: state.tetrisReducer.boardState || emptyArray,
		tetrisPiece: state.tetrisReducer.piece || emptyObj
	};
};

const mapDispatchToProps = dispatch => {
	return {
		initBoardState: () => dispatch(initBoardState()),
	}
};

const TetrisDisplayerRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(TetrisDisplayer);

export default TetrisDisplayerRedux;
