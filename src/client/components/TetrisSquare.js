/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisSquare.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/07 17:25:30 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 17:46:33 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'

const TetrisSquare = ({size, color, noRoundedBorder = false}) => <div style={{
  backgroundColor: color,
  height: size + 'px',
  flexBasis: size + 'px',
  borderRadius: noRoundedBorder ? '' : '30%'}}>
</div>

export default TetrisSquare;
