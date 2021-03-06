/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GhostDisplayer.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/07 17:04:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/24 17:49:41 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TetrisSquare from './TetrisSquare'
import GameOverOverlay from './GameOverOverlay'

const boardHeight = 20;
const boardWidth = 10;

const arrayLoop = Array.from(Array(boardHeight), () => Array.from(Array(boardWidth), () => {}));

const GhostDisplayer = ({ boardState, gameOver, size, points, pseudo, gameWinner }) => (
  <div className='GhostDisplayer' style={{
    width: `${size * boardWidth }px`,
    height: `${size * boardHeight }px`,
    display: 'flex',
    flexWrap: 'wrap',
    border: '2px solid black',
    margin: '10px',
    borderRadius: '5px',
    position: ' relative',
  }}>
    {gameOver || gameWinner ?
      <GameOverOverlay gameWinner={gameWinner} ownPlayer={false} points={points} pseudo={pseudo}/> :
      undefined
    }
    {boardState && boardState.length ?
      arrayLoop.map((row, i) => row.map((useless, j) =>
        <TetrisSquare
          color={i === boardState[j] ?
            'lightGrey' :
            i > boardState[j] ?
              'rgb(230, 230, 230)' :
              'white'
          }
          key={String(i) + j}
          noRoundedBorder
          size={size}
        />)) :
      undefined
    }
  </div>
)

GhostDisplayer.propTypes = {
  boardState: PropTypes.array,
  gameOver: PropTypes.bool.isRequired,
  gameWinner: PropTypes.bool,
  points: PropTypes.number.isRequired,
  pseudo: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

const mapStateToProps = (state, props) => {
  const playerInfo = (state.socketReducer.playersInfo || {})[props.id] || {};
  return {
    boardState: playerInfo.boardState,
    gameOver: playerInfo.gameOver || false,
    gameWinner: playerInfo.gameWinner || false,
    points: playerInfo.points || 0,
    pseudo: playerInfo.pseudo || 'unknown',
  };
};

const mapDispatchToProps = () => ({});

const GhostDisplayerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(GhostDisplayer);

export default GhostDisplayerRedux;
