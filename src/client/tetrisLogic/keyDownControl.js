//Fonction appelée a chaque appui sur une touche

import { store } from '../index'
import { movePiece, rotatePiece } from '../actions/tetrisActions'
import ghostPiecePos from './ghostPiecePos'

const keyDownControl = event => {
	let { tetrisReducer } = store.getState();
	let { pos } = tetrisReducer.piece || {},
		{ boardState } = tetrisReducer,
		{ piece } = tetrisReducer;
	if (!pos) //Pas de piece a controller...
		return;
	switch (event.code) { //code = touche sur un clavier équivalent QWERTY, key = touche vraiment appuyée
		case "ArrowUp": //rotation cw
		case "KeyX":
			store.dispatch(rotatePiece(1));
			break;
		case "KeyZ": //rotation ccw
		case "Control":
			store.dispatch(rotatePiece(-1));
			break;
		case "ArrowDown": //soft drop
			store.dispatch(movePiece({x: pos.x, y: pos.y + 1}))
			break;
		case "ArrowLeft":
			store.dispatch(movePiece({x: pos.x - 1, y: pos.y}));
			break;
		case "ArrowRight":
			store.dispatch(movePiece({x: pos.x + 1, y: pos.y}));
			break;
		case "Space": //hard drop
			let bottomPos = ghostPiecePos(boardState, piece);
			if (!bottomPos)
				return;
			store.dispatch(movePiece(bottomPos));
			break;
		default:
			break;
	}
}

export default keyDownControl;
