/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   handleAddLockedRows.js                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/07 18:49:42 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:51:56 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { canMovePiece } from '../tetrisLogic/moveAndRotationPiece'

const boardHeight = 30;
const boardWidth = 10;

const lockedBlock = -2;

const generateArrayOfNumbersToSkip = (nb, array) => {
  if (nb === 0) { return array; }
  if (!array) { return generateArrayOfNumbersToSkip(nb, Array.from(Array(boardWidth), (e, i) => i)); }
  const nbToSkip = Math.floor(Math.random() * array.length);
  return generateArrayOfNumbersToSkip(nb - 1, [...array.slice(0, nbToSkip), ...array.slice(nbToSkip + 1)]);
}

const generateNewBoard = (boardState, nbOfBlocks = boardWidth, numberOfRows) => {
  if (nbOfBlocks === boardWidth) {
    return [
      ...boardState.slice(numberOfRows),
      ...Array.from(Array(Math.min(numberOfRows, boardHeight)), () => Array.from(Array(boardWidth), () => -1)),
    ];
  }
  return boardState.map((line, i) => {
    if (i < boardHeight - numberOfRows) {
      return boardState[numberOfRows + i];
    }
    const arrayToSkip = generateArrayOfNumbersToSkip(nbOfBlocks);
    return Array.from(Array(boardWidth), (e, i) => {
      if (arrayToSkip.indexOf(i) !== -1) { return 0; }
      return lockedBlock;
    })
  })
}

const handleAddLockedRows = (state, numberOfRows) => {
  const newBoard = generateNewBoard(state.boardState, state.nbBlocksByBlockedLine, numberOfRows);

  if (!state.piece) {
    return {};
  }

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
