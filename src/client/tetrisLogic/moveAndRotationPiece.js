function lineEmpty(line) {
	return line.every(e => e === 0);
}

export const canMovePiece = (boardState, piece, newLocation) => {
	return piece.map((line, i) => {
		if (lineEmpty(line))
			return true;
		else if (newLocation.y + i > 29)
			return false;
		return line.every((uneCase, j) => {
			if (uneCase === 0)
				return true;
			if (newLocation.x + j > 9 || newLocation.x + j < 0) //Position en X en dohors des limites
				return false;
			if (boardState[newLocation.y + i][newLocation.x + j] !== 0) //Case déja occupée
				return false;
			return true;
		})
	}).every(e => e); //le .map renvoie une liste de true/false, .every réduit le tout a un seul, true si tt est true, false sinn
};

export const canRotatePiece = (boardState, piece, direction) => {

};

