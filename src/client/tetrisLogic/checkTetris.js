const checkTetris = (board) => {

	const allTetrisLines = board.reduce((acc, line, index) => {
		return line.indexOf(0) === -1 ? [...acc, index] : acc;
	}, []);

	const filtered = board.filter((useless, i) => allTetrisLines.indexOf(i) === -1 ? true: false);

	return {
		newBoard: [...(new Array(allTetrisLines.length).fill().map(a => new Array(10).fill(0))), ...filtered],
		nbPoints: 30 - filtered.length
	};
}

export default checkTetris;
