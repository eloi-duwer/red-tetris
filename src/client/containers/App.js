/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:43:19 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setPseudo } from '../actions/socketActions'

import TetrisController from './TetrisController'
import GameSelector from './GameSelector'

const App = (props) => {

  const [pseudo, setPseudo] = useState(props.pseudo || '');

  useEffect(() => {
    setPseudo(props.pseudo || 'Unknown')
  }, [props.pseudo]);

  const changePseudo = () => {
    props.setPseudo(pseudo || 'Unknown');
    props.socket.emit('changePseudo', pseudo || 'Unknown')
  }

  return (
    <div style={{ position: 'absolute', top: 0, height: '100vh', left: 0, width: '100vw' }}>
      <span style={{ display: 'block' }}>Red tetris, The Tetris 99 for PC G@m3rs</span>
      pseudo:<input onChange={e => setPseudo(e.target.value)} placeholder='pseudo' type='text' value={pseudo || ''} />
      <button onClick={changePseudo}>change pseudo</button>
      {props.isGameSelected ?
        <TetrisController /> :
        <GameSelector />
      }
    </div>
  );
}

App.propTypes = {
  isGameSelected: PropTypes.bool,
  pseudo: PropTypes.string,
  setPseudo: PropTypes.func.isRequired,
  socket: PropTypes.object,
}

const mapStateToProps = state => ({
  isGameSelected: Boolean(state.socketReducer.game),
  socket: state.socketReducer.socket,
  pseudo: state.socketReducer.pseudo,
});

const mapDispatchToProps = (dispatch) => ({
  setPseudo: pseudo => dispatch(setPseudo(pseudo)),
});

const AppRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppRedux;
