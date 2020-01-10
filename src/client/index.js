/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:52 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 15:34:26 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/app'
import {store} from './store'

import socketController from './socketController'

console.log(store);

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('main')
);

socketController(store);
