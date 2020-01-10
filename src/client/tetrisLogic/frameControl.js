/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   frameControl.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:19:48 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 16:20:16 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Fonction appelée a chaque descente du bloc (tt les secondes, via un setInterval)

import { store } from '../store'

import { nextFrame } from '../actions/tetrisActions'

const heightGhostBoard = 20;
const widthGhostBoard = 10;
const initialGhostBoard = Array.from(Array(widthGhostBoard), () => heightGhostBoard);

const offSetToGhostBoard = 10;
const criticalNumberOfPieces = 4;
const minimalNbOfRowsToSend = 2;

const boardStateToSend = (boardState, isGhost = true) => {
  if (!isGhost) { return boardState; }

  return boardState.reduce((acc, val, i) => val.reduce((acc2, val2, j) => [
    ...acc2, val2 !== 0 && i - offSetToGhostBoard < acc[j] ? i - offSetToGhostBoard : acc[j]], []), initialGhostBoard);
}

const frameControl = () => {
  store.dispatch(nextFrame());
  const state = store.getState(),
    points = state.tetrisReducer.points,
    socket = state.socketReducer.socket,
    numberOfPiecesInTheBag = state.tetrisReducer.piecesList.length,
    nbRowsCleared = state.tetrisReducer.nbRowsCleared;

  socket.emit('updatePlayer', {
    points,
    boardState: boardStateToSend(state.tetrisReducer.boardState),
    piece: state.tetrisReducer.piece,
  });

  if (numberOfPiecesInTheBag <= criticalNumberOfPieces) {
    socket.emit('getNextBag');
  }

  if (nbRowsCleared >= minimalNbOfRowsToSend) {
    socket.emit('addLockedRows', nbRowsCleared - 1);
  }
}

export default frameControl;
