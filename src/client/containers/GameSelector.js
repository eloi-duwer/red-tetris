/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameSelector.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/04 00:28:17 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/06 13:59:39 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, {useState} from 'react'
import { connect } from 'react-redux'

import { setGame } from '../actions/socketActions'

export const GameSelector = ({socket, ...props}) => {

	const joinGame = id => {
		socket.emit("joinGame", id);
	}

	const createGame = name => {
		socket.emit("createGame", name);
	}

	const [newGameName, setNewGameName] = useState("");

	const boxStyle = {"border": "1px solid grey", "borderRadius": "10px", margin: "10px", padding: "5px"}

	return (
		<div className="GameSelector">
			Quelle partie souhaitez-vous rejoindre?
			<div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
				{props.gameList.map((game, i) => <div key={i} style={boxStyle}>
					<div>Id: {game.id}</div>
					<div>nom: {game.name}</div>
					<div>créateur: {game.creator}</div>
					<div>Nb de joueurs: {game.playerList.length}</div>
					<button onClick={() => joinGame(game.id)}>Rejoindre</button>
				</div>)}
				<div id="createGame" style={{...boxStyle, display: "flex", flexDirection: "column", justifyContent: 'space-evenly', alignItems: 'center'}}>
					<div>Creer une partie</div>
					<input value={newGameName} onChange={ev => setNewGameName(ev.target.value)} type="text" placeholder="nom de la partie"/>
					<button onClick={() => createGame(newGameName)}>Creer la partie</button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		gameList: state.socketReducer.gameList || [],
		socket: state.socketReducer.socket
	};
};

const mapDispatchToProps = dispatch => {
	return {}
};

const GameSelectorRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameSelector);

export default GameSelectorRedux;
