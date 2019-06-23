import React, { useState } from 'react'

import TetrisDisplayer from './TetrisDisplayer'

const TetrisController = ({tetrisGameStarted}) => {

	const [gameStarted, setGameStarted] = useState(false);

	return (
		<div style={{height: '80%'}}>
			<button style={{display: "block"}} onClick={() => setGameStarted(!gameStarted)}>Cliquez pour {gameStarted ? "arrêter" : "commencer"} le tetris</button>
			{gameStarted
				? <TetrisDisplayer />
				: undefined
			}
		</div>
	);
}

export default TetrisController;
