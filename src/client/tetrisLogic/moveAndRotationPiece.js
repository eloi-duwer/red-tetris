/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   moveAndRotationPiece.js                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:20 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 15:20:21 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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
 Les coordonnées sont changées de la maniere suivante:
 0,0 1,0 2,0    0,2 0,1 0,0
 0,1 1,1 2,1 => 1,2 1,1 1,0 (clockwise)
 0,2 1,2 2,2    2,2 2,1 2,0
*/

//Prévu pour une piece carrée (piece.length === piece[0].length)
//direction = 1 | -1
export const rotatePiece = (piece, direction) => {
	const length = piece.length
	const begin = direction === 1 ? length * (length - 1) : length - 1,
		step = direction === 1 ? -length : length;
	return new Array(length).fill()
		.map((useless, i) => new Array(length).fill() // Y
			.map((useless, j) => { // X

				return direction === 1
					? piece[length - 1 - j][i]
					: piece[j][length - 1 - i];
			})
		)
}; //Possibilité de sauvegarder le résultat si calculs trop lourds (tjrs la mm sortie pour la mm entrée)
