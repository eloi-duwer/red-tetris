const checkTetris = (board) => {

	return board.reduce((acc, useless, index) => {

		let i = board.length - 1 - index - acc.offset,
			ligne = i > 0 ? board[i] : new Array(10).fill(0),
			isTetris = ligne.indexOf(0) === -1 ? true : false;

		if (isTetris)
			return {
				board: (i - 1 > 0 ? board[i - 1] : new Array(10).fill(0)).concat(acc.board),
				offset: acc.offset + 1
			}

		return {
			board: [ligne].concat(acc.board),
			offset: acc.offset + 1
		}
	}, {board: [], offset: 0}).board;
}

export default checkTetris;
