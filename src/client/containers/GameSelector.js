/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameSelector.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/04 00:28:17 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/24 17:06:37 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const GameSelector = ({ socket, ...props }) => {

  const joinGame = id => {
    socket.emit('tryToJoinGame', id);
  }

  const createGame = name => {
    socket.emit('createGame', name);
  }

  const [newGameName, setNewGameName] = useState('');

  const boxStyle = { 'border': '1px solid grey', 'borderRadius': '10px', margin: '10px', padding: '5px' }

  return (
    <div className='GameSelector'>
			Which game do you want to join?
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {props.gameList.map((game, i) => <div className='oneGame' key={i} style={boxStyle}>
          <div>name: {game.name}</div>
          <div>creator: {game.creator}</div>
          <div>Number of players: {game.playerList.length}</div>
          <div>Game started: {game.gameStarted ? 'Yes' : 'No'}</div>
          <button onClick={() => joinGame(game.id)}>Join</button>
        </div>)}
        <div id='createGame' style={{
          ...boxStyle,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center',
        }}>
          <div style={{ margin: '5px' }}>Create a game</div>
          <input
            onChange={ev => setNewGameName(ev.target.value)}
            placeholder='Name of the game'
            style={{ margin: '5px' }}
            type='text'
            value={newGameName}
          />
          <button onClick={() => createGame(newGameName)} style={{ margin: '5px' }}>Create the game</button>
        </div>
      </div>
    </div>
  );
}

GameSelector.propTypes = {
  gameList: PropTypes.array,
  socket: PropTypes.object,
}

const mapStateToProps = (state) => ({
  gameList: state.socketReducer.gameList || [],
  socket: state.socketReducer.socket,
});

const mapDispatchToProps = () => ({});

const GameSelectorRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSelector);

export default GameSelectorRedux;
