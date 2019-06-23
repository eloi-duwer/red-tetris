//Fonction appelée a chaque descente du bloc (tt les secondes, via un setInterval)

import { store } from '../index'

import { addPieceToBoard, nextFrame } from '../actions/tetrisActions'

const frameControl = () => {
	store.dispatch(nextFrame());
}

export default frameControl;
