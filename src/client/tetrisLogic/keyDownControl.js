/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   keyDownControl.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:09 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 15:13:07 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Fonction appelée a chaque appui sur une touche

import { store } from '../store'
import { movePiece, rotatePiece, holdPiece } from '../actions/tetrisActions'
import ghostPiecePos from './ghostPiecePos'

const keyDownControl = event => {
  const { tetrisReducer } = store.getState();
  const { pos } = tetrisReducer.piece || {},
    { boardState, piece } = tetrisReducer;

  // Pas de piece a controler...
  if (!pos) { return; }

  // code = touche sur un clavier équivalent QWERTY, key = touche vraiment appuyée
  switch (event.code) {

  // rotation cw
  case 'ArrowUp':
  case 'KeyX':
    store.dispatch(rotatePiece(1));
    break;

    // rotation ccw
  case 'KeyZ':
  case 'Control':
    store.dispatch(rotatePiece(-1));
    break;

    // soft drop
  case 'ArrowDown':
    store.dispatch(movePiece({ x: pos.x, y: pos.y + 1 }))
    break;

  case 'ArrowLeft':
    store.dispatch(movePiece({ x: pos.x - 1, y: pos.y }));
    break;

  case 'ArrowRight':
    store.dispatch(movePiece({ x: pos.x + 1, y: pos.y }));
    break;

    // hard drop
  case 'Space': {
    const bottomPos = ghostPiecePos(boardState, piece);
    if (!bottomPos) { return; }
    store.dispatch(movePiece(bottomPos));
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

export default keyDownControl;
