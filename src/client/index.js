import React from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './containers/app'

import reducers from './reducers/allReducers'

export const store = createStore(reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //Redux DevTools
);

ReactDom.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('main')
);
