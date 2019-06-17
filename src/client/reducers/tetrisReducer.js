
import { INITTETRISSTATE, SETTETRISSTATE } from '../actions/tetrisActions.js'

const initialTetrisState = new Array(20).fill(new Array(10).fill(0));

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
		default:
			return state;
	}
}

export default tetrisReducer;
