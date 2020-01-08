/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   handleAddLockedRows.js                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/07 18:49:42 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 14:48:39 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { canMovePiece } from '../tetrisLogic/moveAndRotationPiece'

const boardHeight = 30;
const boardWidth = 10;

const handleAddLockedRows = (state, numberOfRows) => {
  const newBoard = [
    ...state.boardState.slice(numberOfRows),
    ...Array.from(Array(Math.min(numberOfRows, boardHeight)), () => Array.from(Array(boardWidth), () => -1)),
  ];

  if (canMovePiece(newBoard, state.piece.piece, state.piece.pos)) {
    return { boardState: newBoard };
  }

  // On ne peut pas mettre la piece sur ce plateau surélevé, il faut la remonter aussi
  const maxY = Array.from(Array(state.piece.pos.y), (uselsees, i) => state.piece.pos.y - i)
    .reduce((acc, val) => {
      if (val < acc) { return acc; }
      const pos = { x: state.piece.pos.x, y: val };
      if (canMovePiece(newBoard, state.piece.piece, pos)) { return val; }
      return acc;
    }, -1);
  if (maxY === -1) {
    return { boardState: newBoard, gameOver: true };
  }
  return { boardState: newBoard,
    piece: {
      ...state.piece,
      pos: {
        x: state.piece.pos.x,
        y: maxY,
      },
    },
  };
}

export default handleAddLockedRows
