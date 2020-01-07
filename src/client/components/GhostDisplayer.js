/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GhostDisplayer.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/07 17:04:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 17:59:39 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import { connect } from 'react-redux'

import TetrisSquare from './TetrisSquare'
import GameOverOverlay from './GameOverOverlay'

const arrayLoop = Array.from(Array(20), () => Array.from(Array(10), () => {}));

const GhostDisplayer = ({boardState, gameOver, size, points, pseudo, ...props}) => {
	return (
		<div className='GhostDisplayer' style={{
      width: (size * 10) + 'px',
      height: (size * 20) + 'px',
      display: "flex",
      flexWrap: "wrap",
      border: '2px solid black',
      margin: '10px',
      borderRadius: '5px',
      position: ' relative'
    }}>
		{gameOver ? <GameOverOverlay points={points} ownPlayer={false} pseudo={pseudo}/> : undefined}
			{boardState
        ? arrayLoop.map((row, i) => row.map((useless, j) => {
          return <TetrisSquare key={'' + i + j} size={size} color={i === boardState[j] ? 'lightGrey' : i > boardState[j] ? 'rgb(230, 230, 230)' : 'white'} noRoundedBorder/>
        }))
        : undefined
      }
		</div>
	);
}

const emptyArray = [];
const emptyObj = {};

const mapStateToProps = (state, props) => {
  const playerInfo = (state.socketReducer.playersInfo || {})[props.id] || {};
	return {
		boardState: playerInfo.boardState || emptyArray,
		gameOver: playerInfo.gameOver || false,
		points: playerInfo.points,
		pseudo: playerInfo.pseudo,
	};
};

const mapDispatchToProps = dispatch => {
	return {}
};

const GhostDisplayerRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(GhostDisplayer);

export default GhostDisplayerRedux;
