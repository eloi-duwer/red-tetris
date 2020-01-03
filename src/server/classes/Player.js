/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Player.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 17:18:23 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 17:32:27 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

class Player {
  constructor(id, pseudo, roomId = null) {
    this.id = id;
    this.pseudo = pseudo;
    this.roomId = roomId;
  }
}

class PlayerGenerator {
  constructor() {
    this.id = 0;
  }

  createPlayer(pseudo = 'unknown', roomId = null) {
    this.id++;
    return new Player(this.id, pseudo, roomId);
  }
}

module.exports = new PlayerGenerator();
