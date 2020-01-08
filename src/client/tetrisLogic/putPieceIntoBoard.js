/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   putPieceIntoBoard.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:26 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 19:03:42 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import pieces from './tetrisPieces'

export default function putPieceIntoBoard(board, piece) {
  const listOfPos = piece.piece.map((row, i) =>
    row.map((p, j) => {
      if (p !== 0) { return { x: piece.pos.x + j, y: piece.pos.y + i }; }
    })
      .filter(e => e !== undefined)
  ).flat();

  return board.map((line, i) => line.map((uneCase, j) => {
    if (listOfPos.find(pos => pos.x === j && pos.y === i)) { return pieces.colors[piece.type]; }
    return uneCase;
  }));
}
