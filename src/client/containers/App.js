/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:32 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 18:13:48 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import { connect } from 'react-redux'

import TetrisController from './TetrisController'

export const App = (props) => {
	return (
		<div style={{position: 'absolute', top: 0, height: '100vh', left: 0, width: '100vw'}}>
			<span style={{display: "block"}}>Red tetris, le tetris 99 du pécé</span>
			<TetrisController />
		</div>
	);
}



const mapStateToProps = (state) => {
	console.log(state);
	return {};
};

const mapDispatchToProps = dispatch => {
	return {}
};

const AppRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppRedux;
