/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ControlsDisplayer.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/17 14:57:39 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 15:14:38 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'

const ControlsDisplayer = () => {

  const spanStyle = { border: '1px solid black', borderRadius: '5px', margin: '5px', padding: '5px' };

  return <div>
    <span>Controls:</span>
    <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '260px' }}>
      <span style={spanStyle}>↑ / X: rotate the block (clockwise)</span>
      <span style={spanStyle}>Z: rotate the block (couterclockwise)</span>
      <span style={spanStyle}>→ : Move the block to the right</span>
      <span style={spanStyle}>← : Move the block to the left</span>
      <span style={spanStyle}>↓ : Move the block down (soft drop)</span>
      <span style={spanStyle}>Space: Hard drop</span>
      <span style={spanStyle}>Enter: Put current piece on hold</span>
    </div>
  </div>
}

export default ControlsDisplayer;
