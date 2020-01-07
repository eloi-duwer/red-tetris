/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisDisplayer.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:19 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 16:33:47 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import { connect } from 'react-redux'
import pieces from '../tetrisLogic/tetrisPieces'

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

//Recuperation des cases a colorier pour la piece en cours
//Et pour la preview de la piece, en gris
const getPiecesPlacesToPaint = (board, piece, pos) => {
	if (piece === emptyObj) return [];
	let actualPieces = convPieceCoords(piece.piece, piece.pos, pieces.colors[piece.type]);
	let bottomPos = ghostPiecePos(board, piece);
	if (!bottomPos) return actualPieces;

	return [
		...actualPieces,
		...convPieceCoords(piece.piece, bottomPos, "lightgrey"),
	];

	function convPieceCoords(piece, pos, color) {
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

const GameOverOverlay = ({points, ownPlayer, pseudo = "Unknown"}) => <div style={{
	position: ' absolute',
	height: ' 100%',
	width: ' 100%',
	backgroundColor: 'rgba(200, 200, 200, 0.5)',
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
}}>
	<div>{ownPlayer ? "Vous avez " : `Le joueur ${pseudo} a `} perdu! Score final: {points} points</div>
</div>;

const TetrisDisplayer = ({boardState, tetrisPiece, size, ...props}) => {

	let piecePlaceToPaint = getPiecesPlacesToPaint(boardState, tetrisPiece);

	return (<div style={{width: (size * 10) + 'px', height: (size * 20) + 'px', display: "flex", flexWrap: "wrap", border: '2px solid black', margin: '10px', borderRadius: '10px', position: ' relative'}}>
		{props.gameOver ? <GameOverOverlay points={props.points} ownPlayer={props.ownPlayer} pseudo={props.pseudo}/> : undefined}
		{boardState.slice(10).map((tetrisRow, i) => tetrisRow.map((tetrisCase, j) => <div key={'' + i + j} style={{
				backgroundColor: colorSelecter(tetrisCase, piecePlaceToPaint, i, j),
				height: size + 'px',
				flexBasis: '10%',
				borderRadius: '30%'}}>
			</div>
		))}
	</div>);
}

const emptyArray = [];
const emptyObj = {};

const mapStateToProps = (state, props) => {
	if (props.ownPlayer) {
		return {
			boardState: state.tetrisReducer.boardState || emptyArray,
			tetrisPiece: state.tetrisReducer.piece || emptyObj,
			gameOver: state.tetrisReducer.gameOver || false,
			points: state.tetrisReducer.points,
		};
	}
	const playerInfo = (state.socketReducer.playersInfo || {})[props.id] || {};
	return {
		boardState: playerInfo.boardState || emptyArray,
		tetrisPiece: playerInfo.piece || emptyObj,
		gameOver: playerInfo.gameOver || false,
		points: playerInfo.points,
		pseudo: playerInfo.pseudo,
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
