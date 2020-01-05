/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Player.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 17:18:23 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/05 05:00:27 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

class Player {
  constructor(id, pseudo, socket, roomId = null, joinedGame = null) {
    this.id = id;
    this.pseudo = pseudo;
    this.socket = socket
    this.roomId = roomId;
    this.joinedGame = joinedGame;
  }

  joinGame(game) {
    if (!game)
      return;
    if (game.playerList.length === 0)
      game.creator = this;
    game.addPlayer(this);
    this.joinedGame = game;

  }

  quitGame() {
    if (this.joinedGame)
      this.joinedGame.removePlayer(this);
    this.joinedGame = null;
  }

  toSend() {
    return {
      id: this.id,
      pseudo: this.pseudo,
    }
  }
}

class PlayerGenerator {
  constructor() {
    this.id = 0;
  }

  createPlayer(socket, pseudo = 'unknown', roomId = null) {
    this.id++;
    return new Player(this.id, pseudo, roomId, socket);
  }
}

module.exports = new PlayerGenerator();
