/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameStarter.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/05 00:42:23 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 22:11:23 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const GameStarter = (props) => {

  const buttonRef = useRef();

  const startGame = () => {
    if (buttonRef.current) { buttonRef.current.blur(); }
    props.socket.emit('tryToStartGame');
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
          >{props.gameStarted ? 'Arrêter' : 'Commencer'} la partie</button>
        </div> :
        <div>
          {props.gameStarted ? '' : 'Attendez que l\'administarteur lance la partie'}
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
