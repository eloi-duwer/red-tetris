/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   wallKick.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:41 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 16:31:31 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import wallKickData from './wallKickData'
import { canMovePiece } from './moveAndRotationPiece'

export default function wallKick(board, oldPieceData, newPiece, newOrientation) {

  // Pas de wallKick a faire
  if (canMovePiece(board, newPiece, oldPieceData.pos)) {
    return {
      ...oldPieceData,
      piece: newPiece,
      orientation: newOrientation,
    };
  }

  const tests = oldPieceData.type === 'i' ?
    wallKickData.i[oldPieceData.orientation][newOrientation] :
    wallKickData.all[oldPieceData.orientation][newOrientation];

  const kickedPiece = tests.reduce((acc, test) => {
    if (acc) { return acc; }

    const [x, y] = test,
      testPos = { x: oldPieceData.pos.x + x, y: oldPieceData.pos.y + y };
    if (canMovePiece(board, newPiece, testPos)) {
      return {
        ...oldPieceData,
        piece: newPiece,
        pos: testPos,
        orientation: newOrientation,
      }
    }
    return false;
  }, false);

  return kickedPiece ? kickedPiece: oldPieceData;
}
