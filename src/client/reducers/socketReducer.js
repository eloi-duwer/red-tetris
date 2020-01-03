/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socketReducer.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 17:48:33 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 18:20:39 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
  SETGAMELIST
} from '../actions/socketsActions.js'

const socketReducer = (state = {}, action) => {
  switch(action.type) {
    case SETGAMELIST:
      return {
        ...state,
        gameList: action.gameList,
      }
    default:
      return state;
  }
}

export default socketReducer;
