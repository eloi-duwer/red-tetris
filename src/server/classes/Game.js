class Game {
  constructor(roomId, name, player) {
    this.roomId = roomId;
    this.name = name;
    this.creatorName = player.pseudo;
    this.playerNames = [player.pseudo];
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
