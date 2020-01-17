/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameOverOverlay.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/07 17:56:43 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:40:37 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import PropTypes from 'prop-types'

const GameOverOverlay = ({ points, ownPlayer, pseudo = 'Unknown', gameWinner }) => <div className='GameOverOverlay'
  style={{
    position: 'absolute',
    height: ' 100%',
    width: ' 100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <div>{ownPlayer ? 'You ' : `The player ${pseudo} `}{gameWinner ? 'won' : 'lost'}! Final score: {points} points</div>
</div>;

GameOverOverlay.propTypes = {
  gameWinner: PropTypes.bool,
  ownPlayer: PropTypes.bool,
  points: PropTypes.number.isRequired,
  pseudo: PropTypes.string,
}

export default GameOverOverlay;
