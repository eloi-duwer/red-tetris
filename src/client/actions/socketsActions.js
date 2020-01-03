/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socketsActions.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 17:46:26 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 18:19:40 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const SETGAMELIST = "SETGAMELIST";

export const setGameList = gameList => ({
    type: SETGAMELIST,
    gameList,
})
