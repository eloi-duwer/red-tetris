/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisDisplayer.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:19 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/05 04:30:25 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initBoardState } from '../actions/tetrisActions'
import pieces from '../tetrisLogic/tetrisPieces'

import frameControl from '../tetrisLogic/frameControl'
import keyDownControl from '../tetrisLogic/keyDownControl'
import ghostPiecePos from '../tetrisLogic/ghostPiecePos'

const divRef = React.createRef()

const colorSelecter = (tetrisCase, piecePlaces, i, j) => {
	if (tetrisCase !== 0)
		return tetrisCase;
	let place = piecePlaces.find(p => p.x === j && p.y === i);
	if (place)
		return place.color;
	return "white";
}

const getPiecesPlacesToPaint = (board, piece, pos) => {
	if (piece === emptyObj) return [];
	let actualPieces = doIt(piece.piece, piece.pos, pieces.colors[piece.type]);
	let bottomPos = ghostPiecePos(board, piece);
	if (!bottomPos) return actualPieces;

	return [
		...actualPieces,
		...doIt(piece.piece, bottomPos, "lightgrey"),
	];

	function doIt(piece, pos, color) {
		let pieces = piece.map((row, i) => {
			return row.map((piece, j) => {
				if (piece !== 0)
					return {x: pos.x + j, y: pos.y + i - 10, color: color};
			}).filter(e => e !== undefined);
		}).filter(e => e.length > 0)
		.reduce((acc, val) => {
			return [...acc, ...val];
		}, []);
		return pieces;
	}
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

	let piecePlaceToPaint = getPiecesPlacesToPaint(boardState, tetrisPiece);

	let height = divRef.current ? divRef.current.offsetHeight : null

	return (
		<div ref={divRef} tabIndex="0" style={{width: height ? height / 2 : undefined, border: '2px solid black', display: 'inline-block', marginLeft: "10px", marginRight: "10px"}}>
			{boardState.slice(10).map((tetrisRow, i) => {
				return (
					<div key={i} style={{height: '5%'}}>
						{tetrisRow.map((tetrisCase, j) =>
							<div key={j} style={{"backgroundColor": colorSelecter(tetrisCase, piecePlaceToPaint, i, j), width: '10%', height: '100%', display: 'inline-block', "borderRadius": "30%"}}></div>
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
		tetrisPiece: state.tetrisReducer.piece || emptyObj,
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
