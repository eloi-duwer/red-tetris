/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socketActions.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 17:46:26 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/05 04:15:24 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const SETSOCKET = "SETSOCKET";
export const SETGAMELIST = "SETGAMELIST";
export const SETGAME = "SETGAME";
export const SETGAMESTARTED = "SETGAMESTARTED";
export const SETPLAYERSINFO = "SETPLAYERSINFO";
export const UPDATEPLAYERINFO = "UPDATEPLAYERINFO";
export const SETID = "SETID";

export const setSocket = socket => ({
    type: SETSOCKET,
    socket,
})

export const setGameList = gameList => ({
    type: SETGAMELIST,
    gameList,
})

export const setId = id => ({
    type: SETID,
    id
})

export const setGame = game => ({
    type: SETGAME,
    game,
})

export const setGameStarted = gameStarted => ({
    type: SETGAMESTARTED,
    gameStarted,
})

export const setPlayersInfo = playersInfo => ({
    type: SETPLAYERSINFO,
    playersInfo,
})

export const updatePlayerInfo = newPlayerInfo => ({
    type: UPDATEPLAYERINFO,
    newPlayerInfo,
})
