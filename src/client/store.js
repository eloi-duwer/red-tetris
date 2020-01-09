/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   store.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/09 15:16:40 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/09 15:17:34 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createStore } from 'redux'

import reducers from './reducers/allReducers'

export const store = createStore(reducers);
