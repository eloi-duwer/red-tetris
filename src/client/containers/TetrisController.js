/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:24 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:50:07 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { initBoardState } from '../actions/tetrisActions'
import { saveTimeoutFunc, setGame } from '../actions/socketActions'

import GameStarter from './GameStarter'

import TetrisDisplayer from '../components/TetrisDisplayer'
import ControlsDisplayer from '../components/ControlsDisplayer'
import OtherPlayersDisplayer from '../components/OtherPlayersDisplayer'
import HoldAndCommingNextDisplayer from '../components/HoldAndCommingNextDisplayer'

import { frameControlWithTimeout } from '../tetrisLogic/frameControl'
import { keyDownControl, keyUpControl } from '../tetrisLogic/keyDownControl'

const TetrisController = ({ gameStarted, points, ...props }) => {

  const stopGame = () => {
    if (props.timeoutFunc) {
      clearTimeout(props.timeoutFunc);
      props.saveTimeoutFunc(undefined);
      document.body.removeEventListener('keydown', keyDownControl);
      document.body.removeEventListener('keyup', keyUpControl);
    }
  }

  const quitGame = () => {
    props.socket.emit('quitGame');
    props.unsetGame();
  }

  useEffect(() => {
    if (gameStarted) {
      props.initBoardState();
      frameControlWithTimeout();
      document.body.addEventListener('keydown', keyDownControl);
      document.body.addEventListener('keyup', keyUpControl);
    }
    else {
      stopGame();
    }
  }, [gameStarted]);

  return (
    <div style={{ height: '80%', display: 'flex', 'flexDirection': 'column', 'alignItems': 'flex-start' }}>
      <GameStarter />
      <button onClick={quitGame}>Quit the game</button>
      {gameStarted ?
        <div>
          <div>You have {points} points</div>
          <div style={{ display: 'flex' }}>
            <ControlsDisplayer />
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
  saveTimeoutFunc: PropTypes.func,
  socket: PropTypes.object,
  timeoutFunc: PropTypes.number,
  unsetGame: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  initBoardState: () => dispatch(initBoardState()),
  saveTimeoutFunc: func => dispatch(saveTimeoutFunc(func)),
  unsetGame: () => dispatch(setGame(null)),
});

const mapStateToProps = (state) => ({
  points: state.tetrisReducer.points || 0,
  gameStarted: Boolean(state.socketReducer.gameStarted),
  gameOver: state.tetrisReducer.gameOver || false,
  socket: state.socketReducer.socket,
  timeoutFunc: state.socketReducer.timeoutFunc,
});

const TetrisControllerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(TetrisController);

export default TetrisControllerRedux;
