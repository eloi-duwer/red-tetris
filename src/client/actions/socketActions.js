/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socketActions.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 17:46:26 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/16 21:12:03 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const SETSOCKET = 'SETSOCKET';
export const SETGAMELIST = 'SETGAMELIST';
export const SETGAME = 'SETGAME';
export const SETGAMESTARTED = 'SETGAMESTARTED';
export const SETPLAYERSINFO = 'SETPLAYERSINFO';
export const UPDATEPLAYERINFO = 'UPDATEPLAYERINFO';
export const SETID = 'SETID';
export const SETPSEUDO = 'SETPSEUDO'
export const NEWGAMEADMIN = 'NEWGAMEADMIN'
export const SAVETIMEOUTFUNC = 'SAVETIMEOUTFUNC';

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
  id,
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

export const setPseudo = pseudo => ({
  type: SETPSEUDO,
  pseudo,
})

export const newGameAdmin = () => ({
  type: NEWGAMEADMIN,
})

export const saveTimeoutFunc = timeoutFunc => ({
  type: SAVETIMEOUTFUNC,
  timeoutFunc,
})
