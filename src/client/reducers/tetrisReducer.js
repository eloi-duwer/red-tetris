/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetrisReducer.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:08 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 20:56:42 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
  INITBOARDSTATE,
  MOVEPIECE,
  ROTATEPIECE,
  NEXTFRAME,
  ADDBAGOFPIECES,
  RESETBAGOFPIECES,
  HOLDPIECE,
  ADDLOCKEDROWS,
  SETGAMECONFIG,
  SETKEYDOWN,
  SETGAMEWINNER,
} from '../actions/tetrisActions.js'

import { canMovePiece, rotatePiece } from '../tetrisLogic/moveAndRotationPiece'
import wallKick from '../tetrisLogic/wallKick'
import { nextPiece, resetPiecePositionAndRotation } from '../tetrisLogic/nextPiece'
import putPieceIntoBoard from '../tetrisLogic/putPieceIntoBoard'
import checkTetris from '../tetrisLogic/checkTetris'
import handleAddLockedRows from '../tetrisLogic/handleAddLockedRows'

const width = 10;
const height = 30;
const initialBoardState = Array.from(Array(height), () => Array.from(Array(width), () => 0));

// Renvoie le nombre de points a donner en fonction du nombre de lignes complétées
/* eslint no-magic-numbers: 0*/
function calcPoints(nb) {
  switch (nb) {
  case 0:
    return 0;
  case 1:
    return 40;
  case 2:
    return 100;
  case 3:
    return 300;
  case 4:
    return 1200;
  default:
    return 0;
  }
}

const tetrisReducer = (state = {}, action) => {
  switch (action.type) {
  case INITBOARDSTATE:
    return {
      ...state,
      boardState: initialBoardState,
      piece: nextPiece(state),
      piecesList: state.piecesList.slice(1),
      points: 0,
      gameOver: false,
      gameWinner: false,
      canHoldPiece: true,
      heldPiece: null,
    };

  case NEXTFRAME: {
    if (!state.piece) {
      return state;
    }
    const tryPos = { x: state.piece.pos.x, y: state.piece.pos.y + 1 };
    if (canMovePiece(state.boardState, state.piece.piece, tryPos)) {
      return {
        ...state,
        piece: {
          ...state.piece,
          pos: tryPos,
        },
        nbRowsCleared: 0,
      }
    }

    const { newBoard, nbPoints } = checkTetris(putPieceIntoBoard(state.boardState, state.piece)),
      newPiece = nextPiece(state),
      pointsToAdd = calcPoints(nbPoints);

    const isGameOver = !canMovePiece(newBoard, newPiece.piece, newPiece.pos);

    return {
      ...state,
      boardState: newBoard,
      piece: isGameOver ? null : newPiece,
      piecesList: state.piecesList.slice(1),
      points: state.points + pointsToAdd,
      nbRowsCleared: nbPoints,
      gameOver: isGameOver,
      canHoldPiece: true,
    };
  }

  case MOVEPIECE: {
    let newPos;
    if (canMovePiece(state.boardState, state.piece.piece, action.newPos)) { newPos = action.newPos; }
    else { return state; }
    return {
      ...state,
      piece: {
        ...state.piece,
        pos: newPos,
      },
    };
  }

  case ROTATEPIECE: {
    const rotated = rotatePiece(state.piece.piece, action.direction);
    const tmpOrientation = state.piece.orientation + action.direction,
      newOrientation = (tmpOrientation < 0 ? 3 : tmpOrientation) % 4,
      newPiece = wallKick(state.boardState, state.piece, rotated, newOrientation)

    return {
      ...state,
      piece: newPiece,
    };
  }

  case HOLDPIECE: {
    if (!state.canHoldPiece) { return state; }

    const hasAlreadyPieceInHold = Boolean(state.heldPiece),
      futurePiece = hasAlreadyPieceInHold ?
        state.heldPiece :
        nextPiece(state);

    return {
      ...state,
      piece: futurePiece,
      heldPiece: resetPiecePositionAndRotation(state.piece),

      // Si on n'a pas de pieces en hold, il faut prendre la suivant dans la liste
      piecesList: hasAlreadyPieceInHold ? state.piecesList : state.piecesList.slice(1),
      canHoldPiece: false,
      gameOver: !canMovePiece(state.boardState, futurePiece.piece, futurePiece.pos),
    }
  }

  case ADDBAGOFPIECES: {
    const oldBag = state.piecesList || [];
    return {
      ...state,
      piecesList: [...oldBag, ...action.newBag],
    }
  }

  case RESETBAGOFPIECES: {
    return {
      ...state,
      piecesList: action.firstBag,
    }
  }

  case ADDLOCKEDROWS: {
    return {
      ...state,
      ...handleAddLockedRows(state, action.numberOfRows),
    }
  }

  case SETGAMECONFIG: {
    const clamp = (x, min, max) => Math.max(min, Math.min(x, max));
    const speed = (action.gameConfig.gameSpeed - 1) * (200 - 1000) / (100 - 1) + 1000;
    return {
      ...state,
      gameSpeed: clamp(speed, 30, 1500),
      nbBlocksByBlockedLine: clamp(action.gameConfig.nbBlocksByBlockedLine || 10, 1, 10),
      ghostDisplay: Boolean(action.gameConfig.ghostDisplay),
    }
  }

  case SETKEYDOWN: {
    return {
      ...state,
      keysDown: {
        ...state.keysDown,
        [action.key]: action.status,
      },
    }
  }

  case SETGAMEWINNER:
    return {
      ...state,
      gameWinner: true,
    }

  default:
    return state;
  }
}

export default tetrisReducer;
