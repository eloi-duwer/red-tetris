/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisSquare.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/07 17:25:30 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 15:39:48 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import PropTypes from 'prop-types'

const TetrisSquare = ({ size, color, noRoundedBorder = false }) => <div style={{
  backgroundColor: color,
  height: `${size }px`,
  flexBasis: `${size }px`,
  borderRadius: noRoundedBorder ? '' : '30%' }} />

TetrisSquare.propTypes = {
  color: PropTypes.string,
  noRoundedBorder: PropTypes.bool,
  size: PropTypes.number,
}

export default TetrisSquare;
