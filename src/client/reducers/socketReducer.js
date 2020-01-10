/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socketReducer.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 17:48:33 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 20:06:07 by eduwer           ###   ########.fr       */
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
  SETPSEUDO,
  NEWGAMEADMIN,
} from '../actions/socketActions.js'

function changeHashGame(game) {
  let args = window.location.href.split('/').slice(-1)[0] || '';
  let oldPseudo = ((args.split('#')[1] || '').split('[')[1] || '').split(']')[0] || '';
  window.location.replace('#' + game + (oldPseudo ? '[' + oldPseudo + ']' : ''));
}

function changeHashPseudo(pseudo) {
  let args = window.location.href.split('/').slice(-1)[0] || '';
  let oldGame = (args.split('#')[1] || '').split('[')[0] || '';
  window.location.replace('#' + oldGame + '[' + pseudo + ']');
}

const socketReducer = (state = {}, action) => {
  switch (action.type) {
  case SETGAMELIST:
    return {
      ...state,
      gameList: action.gameList,
    };
  case SETSOCKET:
    return {
      ...state,
      socket: action.socket,
    }

  case SETID:
    return {
      ...state,
      id: action.id,
    }

  case SETGAME:
    changeHashGame(action.game.id);
    return {
      ...state,
      game: action.game,
    }

  case NEWGAMEADMIN:
      return {
        ...state,
        game: {
          ...state.game,
          gameAdmin: true,
        }
      }

  case SETGAMESTARTED:
    return {
      ...state,
      gameStarted: action.gameStarted,
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
          ...action.newPlayerInfo,
        },
      },
    }

  case SETPSEUDO:
    changeHashPseudo(action.pseudo);
    return {
      ...state,
      pseudo: action.pseudo,
    }

  default:
    return state;
  }
}

export default socketReducer;
