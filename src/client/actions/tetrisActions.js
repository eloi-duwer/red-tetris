export const INITTETRISSTATE = "INITTETRISSTATE";
export const SETTETRISSTATE = "SETTETRISSTATE";
export const STARTSTOPTETRISGAME = "STARTSTOPTETRISGAME";

export const initTetrisState = () => {
	return {
		type: INITTETRISSTATE
	}
}

export const setTetrisState = (newState) => {
	return {
		type: SETTETRISSTATE,
		newState
	}
}

export const startStopTetrisGame = () => {
	return {
		type: STARTSTOPTETRISGAME
	}
}
