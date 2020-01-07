/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   OnePieceDisplayer.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/07 15:42:53 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 16:36:20 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'

import pieces from '../tetrisLogic/tetrisPieces'

const arrayLoop = [0,0,0,0];

const OnePieceDisplayer = ({piece, size}) => {
  const pieceArray = piece instanceof String || typeof piece === "string" ? pieces[piece] : piece.piece,
    type = piece instanceof String || typeof piece === "string" ? piece : piece.type;
  return <div style={{display: "flex", flexWrap: "wrap", position: ' relative', width: (size * 4) + 'px'}}>
    {arrayLoop.map((useless, i) => arrayLoop.map((useless, j) => {
      const style = {width: size + 'px', height: size + 'px', borderRadius: '30%'}
      const color = (i < pieceArray.length
          && j < pieceArray[i].length
          && pieceArray[i][j] === 1)
        ? pieces.colors[type] : 'white';
      return <div key={'' + i + j} style={{...style, backgroundColor: color}}></div>;
    }))}
  </div>;
}

export default OnePieceDisplayer;
