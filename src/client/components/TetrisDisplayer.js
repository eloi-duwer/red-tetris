/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisDisplayer.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:19 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 15:43:16 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TetrisSquare from './TetrisSquare'
import GameOverOverlay from './GameOverOverlay'

import pieces from '../tetrisLogic/tetrisPieces'
import ghostPiecePos from '../tetrisLogic/ghostPiecePos'

const emptyArray = [];
const emptyObj = {};

const heightOffset = 10;
const numberOfLines = 20;
const numberOfRows = 10;

const colorSelecter = (tetrisCase, piecePlaces, i, j) => {
  if (tetrisCase === -1) { return 'black'; }
  if (tetrisCase !== 0) { return tetrisCase; }
  const place = piecePlaces.find(p => p.x === j && p.y === i);
  if (place) { return place.color; }
  return 'white';
}

// Recuperation des cases a colorier pour la piece en cours
// Et pour la preview de la piece, en gris
const getPiecesPlacesToPaint = (board, piece) => {

  function convPieceCoords(piece, pos, color) {
    const pieces = piece.map((row, i) => row.map((piece, j) => {
      if (piece !== 0) { return { x: pos.x + j, y: pos.y + i - heightOffset, color }; }
    }).filter(e => e !== undefined)).filter(e => e.length > 0)
      .reduce((acc, val) => [...acc, ...val], []);
    return pieces;
  }

  if (piece === emptyObj) { return []; }
  const actualPieces = convPieceCoords(piece.piece, piece.pos, pieces.colors[piece.type]);
  const bottomPos = ghostPiecePos(board, piece);
  if (!bottomPos) { return actualPieces; }

  return [
    ...actualPieces,
    ...convPieceCoords(piece.piece, bottomPos, 'lightgrey'),
  ];
}

const TetrisDisplayer = ({ boardState, tetrisPiece, size, ...props }) => {

  const piecePlaceToPaint = getPiecesPlacesToPaint(boardState, tetrisPiece);

  const mainDivStyle = {
    width: `${size * numberOfRows }px`,
    minWidth: `${size * numberOfRows }px`,
    height: `${size * numberOfLines }px`,
    minHeight: `${size * numberOfLines }px`,
    display: 'flex', flexWrap: 'wrap',
    border: '2px solid black', borderRadius: '10px',
    margin: '10px',
    position: 'relative',
  };

  return (<div style={mainDivStyle}>
    {props.gameOver ?
      <GameOverOverlay ownPlayer={props.ownPlayer} points={props.points} pseudo={props.pseudo}/> :
      undefined
    }
    {boardState.slice(heightOffset).map((tetrisRow, i) =>
      tetrisRow.map((tetrisCase, j) =>
        <TetrisSquare color={colorSelecter(tetrisCase, piecePlaceToPaint, i, j)} key={String(i) + j} size={size}/>
      ))}
  </div>);
}

TetrisDisplayer.propTypes = {
  boardState: PropTypes.array.isRequired,
  gameOver: PropTypes.bool.isRequired,
  ownPlayer: PropTypes.bool,
  points: PropTypes.number.isRequired,
  pseudo: PropTypes.string,
  size: PropTypes.number.isRequired,
  tetrisPiece: PropTypes.object.isRequired,
}

const mapStateToProps = (state, props) => {
  if (props.ownPlayer) {
    return {
      boardState: state.tetrisReducer.boardState || emptyArray,
      tetrisPiece: state.tetrisReducer.piece || emptyObj,
      gameOver: state.tetrisReducer.gameOver || false,
      points: state.tetrisReducer.points || 0,
    };
  }
  const playerInfo = (state.socketReducer.playersInfo || {})[props.id] || {};
  return {
    boardState: playerInfo.boardState || emptyArray,
    tetrisPiece: playerInfo.piece || emptyObj,
    gameOver: playerInfo.gameOver || false,
    points: playerInfo.points || 0,
    pseudo: playerInfo.pseudo,
  };
};

const mapDispatchToProps = () => ({});

const TetrisDisplayerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(TetrisDisplayer);

export default TetrisDisplayerRedux;
