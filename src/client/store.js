/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   store.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 15:16:40 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/16 21:23:02 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createStore } from 'redux'

import reducers from './reducers/allReducers'

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
