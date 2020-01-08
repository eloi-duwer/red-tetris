/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:52 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 15:01:01 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './containers/app'

import reducers from './reducers/allReducers'

import socketController from './SocketController'

export const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('main')
);

socketController(store);
