
import { INITTETRISSTATE, SETTETRISSTATE, STARTSTOPTETRISGAME } from '../actions/tetrisActions.js'

const width = 10;
const height = 20;
const initialTetrisState = new Array(height);
var i = 0;
while (i < height) {
	initialTetrisState[i] = new Array(width).fill(0);
	++i;
}

const tetrisReducer = (state = {}, action) => {
	switch(action.type) {
		case INITTETRISSTATE:
			return {
				...state,
				tetrisState: initialTetrisState
			}
		case SETTETRISSTATE:
			return {
				...state,
				tetrisState: action.newState
			};
		case STARTSTOPTETRISGAME:
			return {
				...state,
				tetrisGameStarted: !state.tetrisGameStarted
			}
		default:
			return state;
	}
}

export default tetrisReducer;
