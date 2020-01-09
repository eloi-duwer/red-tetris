/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/09 15:22:49 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TetrisController from './TetrisController'
import GameSelector from './GameSelector'

const App = (props) => {

  const [pseudo, setPseudo] = useState('');

  const changePseudo = () => props.socket.emit('changePseudo', pseudo)

  return (
    <div style={{ position: 'absolute', top: 0, height: '100vh', left: 0, width: '100vw' }}>
      <span style={{ display: 'block' }}>Red tetris, le tetris 99 du pécé</span>
      <input onChange={e => setPseudo(e.target.value)} placeholder='pseudo' type='text' />
      <button onClick={changePseudo}>valider</button>
      {props.isGameSelected ?
        <TetrisController /> :
        <GameSelector />
      }
    </div>
  );
}

App.propTypes = {
  isGameSelected: PropTypes.bool,
  socket: PropTypes.object,
}

const mapStateToProps = state => ({
  isGameSelected: Boolean(state.socketReducer.game),
  socket: state.socketReducer.socket,
});

const mapDispatchToProps = () => ({});

const AppRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppRedux;
