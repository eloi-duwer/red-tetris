/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameOverOverlay.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/07 17:56:43 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 17:59:11 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'

const GameOverOverlay = ({points, ownPlayer, pseudo = "Unknown"}) => <div style={{
	position: 'absolute',
	height: ' 100%',
	width: ' 100%',
	backgroundColor: 'rgba(200, 200, 200, 0.5)',
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
}}>
	<div>{ownPlayer ? "Vous avez " : `Le joueur ${pseudo} a `} perdu! Score final: {points} points</div>
</div>;

export default GameOverOverlay;
