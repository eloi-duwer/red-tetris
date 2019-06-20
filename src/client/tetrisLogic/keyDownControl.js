//Fonction appelée a chaque appui sur une touche

import { store } from '../index'
import { movePiece } from '../actions/tetrisActions'

const keyDownControl = event => {

	let { pos } = store.getState().tetrisReducer.piece || {};
	if (!pos)
		return;

	switch (event.key) {
		case "ArrowUp":
			break;
		case "ArrowDown":
			break;
		case "ArrowLeft":
			store.dispatch(movePiece({x: pos.x - 1, y: pos.y}));
			break;
		case "ArrowRight":
			store.dispatch(movePiece({x: pos.x + 1, y: pos.y}));
			break;
		case " ":
			break;
		default:
			break;
	}
}

export default keyDownControl;
