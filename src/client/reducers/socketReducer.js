/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socketReducer.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 17:48:33 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/05 16:59:03 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
  SETGAMELIST,
  SETID,
  SETSOCKET,
  SETGAME,
  SETGAMESTARTED,
  SETPLAYERSINFO,
  UPDATEPLAYERINFO,
} from '../actions/socketActions.js'

const socketReducer = (state = {}, action) => {
  switch(action.type) {
    case SETGAMELIST:
      return {
        ...state,
        gameList: action.gameList,
      };
    case SETSOCKET:
      return {
        ...state,
        socket: action.socket
      }

    case SETID:
      return {
        ...state,
        id: action.id,
      }

    case SETGAME:
      return {
        ...state,
        game: action.game
      }

    case SETGAMESTARTED:
      return {
        ...state,
        gameStarted: action.gameStarted
      }

    case SETPLAYERSINFO:
      return {
        ...state,
        playersInfo: action.playersInfo,
      }

    case UPDATEPLAYERINFO:
      return {
        ...state,
        playersInfo: {
          ...state.playersInfo,
          [action.newPlayerInfo.id]: {
            ...state.playersInfo[action.newPlayerInfo.id],
            ...action.newPlayerInfo
          },
        }
      }

    default:
      return state;
  }
}

export default socketReducer;
