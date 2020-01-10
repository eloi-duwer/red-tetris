/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 18:16:21 by eduwer           ###   ########.fr       */
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
      setPseudo(props.pseudo)
    }, [props.pseudo]);

  const changePseudo = () => {
    props.setPseudo(pseudo);
    props.socket.emit('changePseudo', pseudo)
  }

  return (
    <div style={{ position: 'absolute', top: 0, height: '100vh', left: 0, width: '100vw' }}>
      <span style={{ display: 'block' }}>Red tetris, le tetris 99 du pécé</span>
      <input onChange={e => setPseudo(e.target.value)} placeholder='pseudo' value={pseudo || ''} type='text' />
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
