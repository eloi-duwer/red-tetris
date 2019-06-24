import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initBoardState } from '../actions/tetrisActions'
import pieces from '../tetrisLogic/tetrisPieces'

import frameControl from '../tetrisLogic/frameControl'
import keyDownControl from '../tetrisLogic/keyDownControl'

const divRef = React.createRef()

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
		let idInterval = setInterval(frameControl, 750);
		document.body.addEventListener("keydown", keyDownControl);
		divRef.current.focus();

		return () => {
			clearInterval(idInterval);
			document.body.removeEventListener("keydown", keyDownControl);
		}
	}, [])

	let piecePlaceToPaint = [];
	if (tetrisPiece !== emptyObj) { //Convertit la piece actuelle en une liste de positions sur la grille
		tetrisPiece.piece.forEach((row, i) => {
			row.forEach((piece, j) => {
				if (piece !== 0)
					piecePlaceToPaint.push({x: tetrisPiece.pos.x + j, y: tetrisPiece.pos.y + i - 10, color: pieces.colors[tetrisPiece.type]});
			})
		})
	}

	let height = divRef.current ? divRef.current.offsetHeight : null

	return (
		<div ref={divRef} tabIndex="0" style={{height: '100%', width: height ? height / 2 : undefined, border: '2px solid black', display: 'inline-block'}}>
			{boardState.slice(10).map((tetrisRow, i) => {
				return (
					<div key={i} style={{height: '5%'}}>
						{tetrisRow.map((tetrisCase, j) =>
							<div key={j} style={{"backgroundColor": colorSelecter(tetrisCase, piecePlaceToPaint, i, j), width: '10%', height: '100%', display: 'inline-block'}}></div>
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
