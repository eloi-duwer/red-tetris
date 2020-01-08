/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   OtherPlayersDisplayer.js                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/05 04:17:55 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 15:44:31 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TetrisDisplayer from './TetrisDisplayer'
import GhostDisplayer from './GhostDisplayer'

const OtherPlayersDisplayer = (props) => (
  <div className='OtherPlayersDisplayer' style={{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  }}>
    {Object.keys(props.playersInfo).map((id, i) =>

    // if (+id === +props.ownId)
    // return undefined;
      <div key={i} style={{ 'border': '1px solid grey', 'borderRadius': '10px', margin: '10px', padding: '5px' }}>
        <span>{props.playersInfo[id].pseudo}: {props.playersInfo[id].points} points</span>
        {props.isGhost ?
          <GhostDisplayer id={id} size={10} /> :
          <TetrisDisplayer id={id} size={10} />
        }
      </div>
    )}
  </div>
)

OtherPlayersDisplayer.propTypes = {
  isGhost: PropTypes.bool.isRequired,
  playersInfo: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  ownId: state.socketReducer.id,
  playersInfo: state.socketReducer.playersInfo || {},
  isGhost: true,
});

const mapDispatchToProps = () => ({});

const OtherPlayersDisplayerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherPlayersDisplayer);

export default OtherPlayersDisplayerRedux;
