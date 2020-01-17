/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   keyDownControl.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:09 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:53:20 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Fonction appelée a chaque appui sur une touche

import { store } from '../store'
import { movePiece, rotatePiece, holdPiece, setKeyDown } from '../actions/tetrisActions'
import { saveTimeoutFunc } from '../actions/socketActions'
import ghostPiecePos from './ghostPiecePos'
import { frameControl, frameControlWithTimeout } from './frameControl'

const defaultDelay = 100;
const shortDelay = 50;

const rotationCwFunc = () => {
  const { ArrowUp, KeyX } = store.getState().tetrisReducer.keysDown || {};
  if (ArrowUp !== true && KeyX !== true) {
    return;
  }

  store.dispatch(rotatePiece(1));
  setTimeout(rotationCwFunc, defaultDelay);
}

const rotationCcwFunc = () => {
  const { KeyZ } = store.getState().tetrisReducer.keysDown || {};
  if (KeyZ !== true) {
    return;
  }

  store.dispatch(rotatePiece(-1));
  setTimeout(rotationCcwFunc, defaultDelay);
}

const softDropFunc = () => {
  const { socketReducer, tetrisReducer } = store.getState(),
    { ArrowDown } = tetrisReducer.keysDown || {};
  if (ArrowDown !== true || socketReducer.gameStarted !== true || tetrisReducer.gameOver !== false) {
    return;
  }
  if (!socketReducer.timeoutFunc) {
    frameControl();
    setTimeout(softDropFunc, defaultDelay);
  }
}

const moveRightFunc = () => {
  const { keysDown, piece } = store.getState().tetrisReducer || {};

  if ((keysDown || {}).ArrowRight !== true || !piece.pos) {
    return;
  }

  store.dispatch(movePiece({ x: piece.pos.x + 1, y: piece.pos.y }));
  setTimeout(moveRightFunc, defaultDelay);
}

const moveLeftFunc = () => {
  const { keysDown, piece } = store.getState().tetrisReducer || {};

  if ((keysDown || {}).ArrowLeft !== true || !piece.pos) {
    return;
  }

  store.dispatch(movePiece({ x: piece.pos.x - 1, y: piece.pos.y }));
  setTimeout(moveLeftFunc, defaultDelay);
}

const keyDownControlFiredOnlyOnce = event => {
  const { tetrisReducer, socketReducer } = store.getState(),
    { pos } = tetrisReducer.piece || {},
    { boardState, piece } = tetrisReducer;

  // Pas de piece a controler...
  if (!pos) { return; }

  // code = touche sur un clavier équivalent QWERTY, key = touche vraiment appuyée
  switch (event.code) {

  // rotation cw
  case 'ArrowUp':
  case 'KeyX':
    rotationCwFunc();
    break;

    // rotation ccw
  case 'KeyZ':
    rotationCcwFunc();
    break;

    // soft drop
  case 'ArrowDown':
    clearTimeout(socketReducer.timeoutFunc);
    store.dispatch(saveTimeoutFunc(undefined));
    softDropFunc();
    break;

  case 'ArrowLeft':
    moveLeftFunc();
    break;

  case 'ArrowRight':
    moveRightFunc();
    break;

    // hard drop
  case 'Space': {
    const bottomPos = ghostPiecePos(boardState, piece);
    if (!bottomPos) { return; }
    store.dispatch(movePiece(bottomPos));
    clearTimeout(socketReducer.timeoutFunc);
    store.dispatch(saveTimeoutFunc(undefined));
    setTimeout(frameControlWithTimeout, shortDelay);
    break;
  }

  // Hold piece
  case 'Enter':
    store.dispatch(holdPiece());
    break;

  default:
    break;
  }
}

export function keyDownControl(event) {
  const state = store.getState();
  store.dispatch(setKeyDown(event.code, true));
  if (!(state.tetrisReducer.keysDown || {})[event.code]) {
    keyDownControlFiredOnlyOnce(event);
  }
}

export function keyUpControl(event) {
  if (event.code === 'ArrowDown') {
    const { socketReducer, tetrisReducer } = store.getState();
    if (socketReducer.gameStarted === true && tetrisReducer.gameOver === false && !socketReducer.timeoutFunc) {
      setTimeout(frameControlWithTimeout, defaultDelay);
    }
  }
  store.dispatch(setKeyDown(event.code, false));
}
