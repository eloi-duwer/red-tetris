/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 13:16:00 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { initBoardState } from '../actions/tetrisActions'

import GameStarter from './GameStarter'

import TetrisDisplayer from '../components/TetrisDisplayer'
import OtherPlayersDisplayer from '../components/OtherPlayersDisplayer'
import HoldAndCommingNextDisplayer from '../components/HoldAndCommingNextDisplayer'

import frameControl from '../tetrisLogic/frameControl'
import keyDownControl from '../tetrisLogic/keyDownControl'

const intervalUpdate = 750;

const TetrisController = ({ gameStarted, points, ...props }) => {

  const [intervalFunc, saveIntervalFunc] = useState(null);

  const stopGame = () => {
    if (intervalFunc) {
      clearInterval(intervalFunc);
      saveIntervalFunc(null);
      document.body.removeEventListener('keydown', keyDownControl);
    }
  }

  useEffect(() => {
    if (gameStarted) {
      props.initBoardState();
      saveIntervalFunc(setInterval(frameControl, intervalUpdate));
      document.body.addEventListener('keydown', keyDownControl);
    }
    else {
      stopGame();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (intervalFunc && props.gameOver) {
      stopGame();
      props.socket.emit('gameOver', points);
    }
  }, [props.gameOver, gameStarted])

  return (
    <div style={{ height: '80%', display: 'flex', 'flexDirection': 'column', 'alignItems': 'flex-start' }}>
      <GameStarter />
      {gameStarted ?
        <div>
          <div>Vous avez {points} points</div>
          <div style={{ display: 'flex' }}>
            <TetrisDisplayer ownPlayer size={25}/>
            <HoldAndCommingNextDisplayer />
            <OtherPlayersDisplayer />
          </div>
        </div> :
        undefined
      }
    </div>
  );
}

TetrisController.propTypes = {
  gameOver: PropTypes.bool,
  gameStarted: PropTypes.bool,
  initBoardState: PropTypes.func,
  points: PropTypes.number,
  socket: PropTypes.object,
}

const mapDispatchToProps = dispatch => ({
  initBoardState: () => dispatch(initBoardState()),
});

const mapStateToProps = (state) => ({
  points: state.tetrisReducer.points || 0,
  gameStarted: Boolean(state.socketReducer.gameStarted),
  gameOver: state.tetrisReducer.gameOver || false,
  socket: state.socketReducer.socket,
});

const TetrisControllerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(TetrisController);

export default TetrisControllerRedux;
