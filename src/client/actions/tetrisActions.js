export const INITBOARDSTATE = "INITBOARDSTATE";
export const SETBOARDSTATE = "SETBOARDSTATE";
export const MOVEPIECE = "MOVEPIECE";
export const ROTATEPIECE = "ROTATEPIECE";
export const NEXTFRAME = "NEXTFRAME";

export const initBoardState = () => {
	return {
		type: INITBOARDSTATE
	}
}

export const setBoardState = (newState) => {
	return {
		type: SETBOARDSTATE,
		newState
	}
}

export const movePiece = (newPos) => {
	return {
		type: MOVEPIECE,
		newPos
	}
}

export const rotatePiece = direction => {
	return {
		type: ROTATEPIECE,
		direction
	}
}

export const nextFrame = () => {
	return {
		type: NEXTFRAME
	}
}
