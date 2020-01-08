/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ghostPiecePos.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:03 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 14:49:07 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { canMovePiece } from './moveAndRotationPiece'

const maxHeight = 30;

const ghostPiecePos = (board, piece, pos, prevPos) => {
  if (!pos) { return ghostPiecePos(board, piece, piece.pos, piece.pos); }
  else if (pos.y > maxHeight) { return null; }
  else if (!canMovePiece(board, piece.piece, pos)) { return prevPos; }
  return ghostPiecePos(board, piece, { x: pos.x, y: pos.y + 1 }, pos);
}

export default ghostPiecePos;
