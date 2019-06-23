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

/*
 Crée + remplit un tableau de la mm taille que la piece en entée

Liste des coordonnées du tableau en entée + nouvelles coordonnées en sortie

0 1 2    6 3 0
3 4 5 => 7 5 1 (clockwise)
6 7 8    8 4 2

0 1 2    2 5 8
3 4 5 => 1 4 7 (counter-clockwise)
6 7 8    0 3 6

La 1er case de la 1er ligne est 6 = 3 * 2 = (length * length - 1) en cw, 2 = length - 1 en ccw (const begin ds la fonction)
Pour chaque premiere case on ajoute / enleve 1 apres en fonction du sens
Pour les case d'apres de la mm ligne on ajoute / enleve 3 ( = length ou -length, step ds la fonction)

Le const pos nested ds les map résume ces calculs.
Le calcul en dessous retrouve la bonne coord (piece est un tableau de tableau, pas une liste plate)
*/

//Tt les calculs sont prévus pour une piece carrée (piece.length === piece[0].length)
//direction = 1 | -1
export const rotatePiece = (piece, direction) => {
	const length = piece.length
	const begin = direction === 1 ? length * (length - 1) : length - 1,
		step = direction === 1 ? -length : length;
	return new Array(length).fill()
		.map((useless, i) => new Array(length).fill()
			.map((useless, j) => {
				const pos = begin + i * direction + (step * j);
				return piece[Math.floor(pos / length)][pos % length];
			})
		)
}; //Possibilité de sauvegarder le résultat si calculs trop lourds (tjrs la mm sortie pour la mm entrée)
