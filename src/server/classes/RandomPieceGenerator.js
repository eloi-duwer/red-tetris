/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RandomPieceGenerator.js                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/06 14:49:55 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 14:33:09 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/*
* Implémentation classique du générateur de pièces:
* Les pieces sont stockees dans des sacs, contenant a chaque fois une piece
* de chaque type, mélangés aléatoirement
* Ainsi on a la garantie d'avoir régulièrement chaque type de piece
* cf https://tetris.fandom.com/wiki/Random_Generator
*/

class BagOfPieces {
  constructor() {
    const pieces = [
      'j',
      'i',
      'l',
      'o',
      'z',
      's',
      't',
    ];
    this.pieces = [];
    while (pieces.length) {
      // On récupère la piece a rajouter
      const randIndex = Math.floor(Math.random() * pieces.length);

      // On la rajoute a la liste, en l'enlevant de la liste des pieces a rajouter
      this.pieces.push(pieces.splice(randIndex, 1)[0]);
    }
  }

  toSend() {
    return this.pieces;
  }
}

class RandomPieceGenerator {
  constructor() {

    // liste des Sacs assignés a cette partie
    this.bags = [];

    // Mémoire du nombre de sacs demandés par chaque joueur de la partie
    this.ids = {};
  }

  getNextBag(playerId) {
    let indexToGet = this.ids[playerId];

    // Le joueur n'avait encore rien demandé
    if (indexToGet === undefined) {
      this.ids[playerId] = 1;
      indexToGet = 1;
    }
    if (this.bags[indexToGet] === undefined) { this.bags[indexToGet] = new BagOfPieces(); }
    return this.bags[indexToGet].toSend();
  }

  resetBeforeStart() {
    this.ids = {};
    this.bags = [new BagOfPieces()];
    return this.bags[0];
  }

}

export default RandomPieceGenerator;
