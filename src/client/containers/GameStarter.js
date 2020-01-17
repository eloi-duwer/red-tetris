/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameStarter.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/05 00:42:23 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:48:41 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import GameParametrer from './GameParametrer'

const defaultSpeed = 20;
const defaultAllBlocks = 10;

const GameStarter = (props) => {

  const buttonRef = useRef();
  const gameSpeedRef = useRef();
  const nbBlocksRef = useRef();
  const ghostDisplayerRef = useRef();

  const startGame = () => {
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
    props.socket.emit('tryToStartGame', {
      'gameSpeed': (gameSpeedRef.current || {}).value || defaultSpeed,
      'nbBlocksByBlockedLine': (nbBlocksRef.current || {}).value || defaultAllBlocks,
      'ghostDisplay': (ghostDisplayerRef.current || {}).checked,
    });
  }

  const stopGame = () => {
    props.socket.emit('stopGame');
  }

  return (
    <div className='GameStarter'>
      {props.gameAdmin ?
        <div>
          <button
            onClick={props.gameStarted ? stopGame : startGame } ref={buttonRef}
          >{props.gameStarted ? 'Stop' : 'Begin'}  the game</button>
          {props.gameStarted ? undefined : <GameParametrer
            gameSpeedRef={gameSpeedRef}
            ghostDisplayerRef={ghostDisplayerRef}
            nbBlocksRef={nbBlocksRef}
          />}
        </div> :
        <div>
          {props.gameStarted ? '' : 'Only the game admin can start the game'}
        </div>
      }
    </div>
  );
}

GameStarter.propTypes = {
  gameAdmin: PropTypes.bool,
  gameStarted: PropTypes.bool,
  socket: PropTypes.object,
}

const mapStateToProps = (state) => ({
  gameAdmin: state.socketReducer.game.gameAdmin,
  socket: state.socketReducer.socket,
  gameStarted: state.socketReducer.gameStarted,
});

const mapDispatchToProps = () => ({});

const GameStarterRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameStarter);

export default GameStarterRedux;
