/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameSelector.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/04 00:28:17 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 17:35:36 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const GameSelector = ({ socket, ...props }) => {

  const joinGame = id => {
    socket.emit('joinGame', id);
  }

  const createGame = name => {
    socket.emit('createGame', name);
  }

  const [newGameName, setNewGameName] = useState('');

  const boxStyle = { 'border': '1px solid grey', 'borderRadius': '10px', margin: '10px', padding: '5px' }

  return (
    <div className='GameSelector'>
			Quelle partie souhaitez-vous rejoindre?
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {props.gameList.map((game, i) => <div className='oneGame' key={i} style={boxStyle}>
          <div>nom: {game.name}</div>
          <div>créateur: {game.creator}</div>
          <div>Nb de joueurs: {game.playerList.length}</div>
          <button onClick={() => joinGame(game.id)}>Rejoindre</button>
        </div>)}
        <div id='createGame' style={{
          ...boxStyle,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center',
        }}>
          <div>Creer une partie</div>
          <input
            onChange={ev => setNewGameName(ev.target.value)}
            placeholder='nom de la partie'
            type='text'
            value={newGameName}
          />
          <button onClick={() => createGame(newGameName)}>Creer la partie</button>
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
