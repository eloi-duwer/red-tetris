/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Game.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/04 00:15:27 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 20:01:22 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import gameController from './GameController'

class Game {
  constructor(name, player, randomPieceGenerator) {
    this.id = name;
    this.name = name;
    this.creator = player;
    this.playerList = [];
    this.gameStarted = false;
    this.randomPieceGenerator = randomPieceGenerator
  }

  toSend(player) {
    return {
      id: this.id,
      name: this.name,
      creator: this.creator.pseudo,
      playerList: this.playerList.map(p => p.pseudo),
      gameAdmin: player ? this.creator.id === player.id: false,
      gameStarted: this.gameStarted,
    }
  }

  addPlayer(player) {
    this.playerList.push(player);
  }

  removePlayer(player) {
    const index = this.playerList.findIndex(p => p.id === player.id);
    if (index >= 0) {
      let removed = this.playerList.splice(index, 1)[0];
      if (this.playerList.length === 0) {
        return gameController.deleteGame(this.id);
      }
      if (removed === this.creator) {
        this.creator = this.playerList[0];
        this.playerList[0].socket.emit('newAdmin');
      }
    }
  }
}

export default Game;
