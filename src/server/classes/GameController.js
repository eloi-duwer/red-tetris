/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameController.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 19:51:47 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 20:00:27 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Game from './Game'

class GameController {
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
    let newName = name + '(' + nb + ')'
    while (this.games[newName]) {
      newName = name + '(' + nb + ')';
      nb = nb + 1;
    }
    let game = new Game(newName, player, randomPieceGenerator);
    this.games[newName] = game;
    return game;
  }

  deleteGame(id) {
    delete this.games[id];
		if (this.io)
			this.io.emit('gameList', this.getGames());
  }

  getGames(player) {
    return Object.keys(this.games).map(id => this.games[id].toSend(player));
  }

}

export default new GameController();
