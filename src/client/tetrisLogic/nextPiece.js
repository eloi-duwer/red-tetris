/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   nextPiece.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/06 16:13:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 14:38:35 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import randomGenerator from './randomGenerator'
import pieces from './tetrisPieces'

const startLocationO = { x: 4, y: 10 };
const startLocationI = { x: 3, y: 9 };
const startLocationOthers = { x: 3, y: 10 };

const getStartLocation = name => (name === 'o' ?
  startLocationO :
  name === 'i' ?
    startLocationI : startLocationOthers);

export function nextPiece(state) {
  const piece = state.piecesList[0] || randomGenerator();

  const startLocation = getStartLocation(piece);
  return {
    pos: startLocation,
    piece: pieces[piece],
    type: piece,
    orientation: 0,
  };
}
export function resetPiecePositionAndRotation(piece) {
  return {
    type: piece.type,
    piece: pieces[piece.type],
    pos: getStartLocation(piece.type),
    orientation: 0,
  }
}
