/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   OtherPlayersDisplayer.js                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/05 04:17:55 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/06 12:22:58 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import { connect } from 'react-redux'

import TetrisDisplayer from './TetrisDisplayer'

export const OtherPlayersDisplayer = (props) => {
	return (
		<div className='OtherPlayersDisplayer' style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: "flex-start"}}>
			{Object.keys(props.playersInfo).map((id, i) => {
			/*if (+id === +props.ownId)
				return undefined;*/
				return <div key={i} style={{"border": "1px solid grey", "borderRadius": "10px", margin: "10px", padding: "5px"}}>
					<span>{props.playersInfo[id].pseudo}: {props.playersInfo[id].points} points</span>
					<TetrisDisplayer id={id} size={10}/>
				</div>
			})}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		ownId: state.socketReducer.id,
		playersInfo: state.socketReducer.playersInfo || {}
	};
};

const mapDispatchToProps = dispatch => {
	return {}
};

const OtherPlayersDisplayerRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(OtherPlayersDisplayer);

export default OtherPlayersDisplayerRedux;
