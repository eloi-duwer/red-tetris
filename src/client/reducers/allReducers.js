/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   allReducers.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:13 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 15:21:14 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { combineReducers } from 'redux'

import tetrisReducer from './tetrisReducer'

export default combineReducers({
	tetrisReducer
});
