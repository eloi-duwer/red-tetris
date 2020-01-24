/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameParametrer.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/05 00:42:23 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/24 16:51:53 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const GameParametrer = ({ gameSpeedRef, nbBlocksRef, ghostDisplayerRef }) => {

  const [checked, setChecked] = useState(true);

  return (
    <div className='GameParametrer'>
      <label htmlFor='gameSpeed'>Game Speed:</label><br/>
      <input
        defaultValue={32}
        id='gameSpeed'
        max='100'
        min='1'
        ref={gameSpeedRef}
        type='range'
      /><br/>
      <label htmlFor='numberOfBlocksPerLockedRows'>
        Number of blocks added when a locked row is added(10 = cannot be removed):
      </label><br/>
      <span>1</span>
      <input
        defaultValue={10}
        id='numberOfBlocksPerLockedRows'
        max='10'
        min='1'
        ref={nbBlocksRef}
        type='range'
      />
      <span>10</span>
      <br/>
      <label htmlFor='useGhostDisplayer'>Use Ghost Displayer for the other players:</label><br/>
      <input
        checked={checked}
        id='useGhostDisplayer'
        onChange={() => setChecked(!checked)}
        ref={ghostDisplayerRef}
        type='checkbox'
      /><label htmlFor='useGhostDisplayer'>{checked ? 'Ghost displayer' : 'Classic displayer'}</label>

    </div>
  );
}

GameParametrer.propTypes = {
  gameSpeedRef: PropTypes.object,
  ghostDisplayerRef: PropTypes.object,
  nbBlocksRef: PropTypes.object,

}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

const GameParametrerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameParametrer);

export default GameParametrerRedux;
