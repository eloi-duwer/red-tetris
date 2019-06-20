import React from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './containers/app'

import reducers from './reducers/allReducers'

export const store = createStore(reducers);

ReactDom.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('main')
);
