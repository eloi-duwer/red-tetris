/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   frameControl.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:19:48 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:51:18 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Fonction appelée a chaque descente du bloc

import { store } from '../store'

import { nextFrame, setGameWinner } from '../actions/tetrisActions'
import { saveTimeoutFunc } from '../actions/socketActions'

const heightGhostBoard = 20;
const widthGhostBoard = 10;
const initialGhostBoard = Array.from(Array(widthGhostBoard), () => heightGhostBoard);

const offSetToGhostBoard = 10;
const criticalNumberOfPieces = 7;
const minimalNbOfRowsToSend = 2;

const boardStateToSend = (boardState, isGhost) => {
  if (!isGhost) { return boardState; }

  return boardState.reduce((acc, val, i) => val.reduce((acc2, val2, j) => [
    ...acc2,
    val2 !== 0 && i - offSetToGhostBoard < acc[j] ?
      i - offSetToGhostBoard :
      acc[j]], []), initialGhostBoard);
}

export const frameControl = () => {
  store.dispatch(nextFrame());
  const state = store.getState(),
    points = state.tetrisReducer.points,
    socket = state.socketReducer.socket,
    numberOfPiecesInTheBag = state.tetrisReducer.piecesList.length,
    nbRowsCleared = state.tetrisReducer.nbRowsCleared,
    gameSpeed = state.tetrisReducer.gameSpeed,
    gameOver = state.tetrisReducer.gameOver;

  socket.emit('updatePlayer', {
    points,
    boardState: boardStateToSend(state.tetrisReducer.boardState, state.tetrisReducer.ghostDisplay),
    piece: state.tetrisReducer.piece,
  });

  if (numberOfPiecesInTheBag <= criticalNumberOfPieces) {
    socket.emit('getNextBag');
  }

  if (nbRowsCleared >= minimalNbOfRowsToSend) {
    socket.emit('addLockedRows', nbRowsCleared - 1);
  }
  if (gameOver) {
    socket.emit('gameOver', points);
  }

  if (Object.keys(state.socketReducer.playersInfo).length > 1 &&
    Object.keys(state.socketReducer.playersInfo).every(id => {
      if (Number(id) === Number(state.socketReducer.id)) { return true; }
      return (state.socketReducer.playersInfo[id] || {}).gameOver === true;
    })) {
    store.dispatch(setGameWinner());
    socket.emit('updatePlayer', { gameWinner: true });
    return { gameOver: true };
  }

  return { gameOver, gameSpeed };
}

export const frameControlWithTimeout = () => {
  const { gameOver, gameSpeed } = frameControl();
  if (!gameOver) {
    store.dispatch(saveTimeoutFunc(setTimeout(frameControlWithTimeout, gameSpeed)));
  }
}
