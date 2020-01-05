/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Game.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/04 00:15:27 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/05 01:26:54 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
class Game {
  constructor(id, name, player) {
    this.id = id;
    this.name = name;
    this.creator = player;
    this.playerList = [];
    this.gameStarted = false;
  }

  toSend(player) {
    return {
      id: this.id,
      name: this.name,
      creator: this.creator.pseudo,
      playerList: this.playerList.map(p => p.pseudo),
      gameAdmin: this.creator.id === player.id ? true : false,
      gameStarted: this.gameStarted
    }
  }

  addPlayer(player) {
    this.playerList.push(player);
  }

  removePlayer(player) {
    const index = this.playerList.findIndex(p => p.id === player.id);
    if (index >= 0)
      this.playerList.splice(index, 1);
  }
}

class GameGenerator {
  constructor() {
    this.id = 0;
  }

  createGame(player, name = 'new game') {
    this.id++;
    return new Game(this.id, name, player);
  }
}

module.exports = new GameGenerator();
