/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameManager.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 19:51:47 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:53:54 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Game from './Game'

class GameManager {
  constructor() {
    this.games = {};
    this.io = null;
  }

  createGame(player, name, randomPieceGenerator) {
    if (!this.games[name]) {
      this.games[name] = new Game(name, player, randomPieceGenerator);
      return this.games[name];
    }
    let nb = 1;
    let newName = `${name }(${ nb })`
    while (this.games[newName]) {
      newName = `${name }(${ nb })`;
      nb = nb + 1;
    }
    const game = new Game(newName, player, randomPieceGenerator);
    this.games[newName] = game;
    return game;
  }

  deleteGame(id) {
    this.games[id] = undefined;
    if (this.io) { this.io.emit('gameList', this.getGames()); }
  }

  getGames(player) {
    return Object.keys(this.games).map(id => this.games[id].toSend(player));
  }

  setIo(io) {
    this.io = io;
  }

}

export default new GameManager();
