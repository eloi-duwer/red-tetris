//Fonction appelée a chaque appui sur une touche

import { store } from '../index'
import { movePiece, rotatePiece } from '../actions/tetrisActions'

const keyDownControl = event => {
	event.preventDefault(); //Empêcher l'effet par défaut (space appuie sur le bouton cliqué par ex)
	let { pos } = store.getState().tetrisReducer.piece || {};
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
			break;
		default:
			break;
	}
}

export default keyDownControl;
