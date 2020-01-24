/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Player.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 17:18:23 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/24 18:09:40 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

class Player {
  constructor(id, pseudo, io, socket, roomId = null, joinedGame = null) {
    this.id = id;
    this.pseudo = pseudo;
    this.socket = socket
    this.roomId = roomId;
    this.joinedGame = joinedGame;
    this.playing = false;
  }

  joinGame(game) {
    if (!game) { return; }
    if (game.playerList.length === 0) { game.creator = this; }
    game.addPlayer(this);
    this.joinedGame = game;
  }

  quitGame() {
    if (this.joinedGame) { this.joinedGame.removePlayer(this); }
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

  createPlayer(io, socket, pseudo = 'unknown', roomId = null) {
    this.id = this.id + 1;
    return new Player(this.id, pseudo, io, socket, roomId);
  }
}

export default new PlayerGenerator();
