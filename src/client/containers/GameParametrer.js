/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GameParametrer.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/05 00:42:23 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 01:20:53 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, {useState} from 'react'
import { connect } from 'react-redux'

export const GameParametrer = ({gameSpeedRef, nbBlocksRef, ghostDisplayerRef}) => {

	const defaultTxt = "Ghost displayer";
	const normalTxt = "Classic displayer";

	const [checked, setChecked] = useState(true);

	return (
		<div className='GameParametrer'>
			<label htmlFor="gameSpeed">Game Speed:</label><br/>
			<input
				type="range"
				id="gameSpeed"
				min="20"
				max="100"
				defaultValue={70}
				ref={gameSpeedRef}
			/><br/>
			<label htmlFor="numberOfBlocksPerLockedRows">Number of blocks added when a locked row is added(10 = cannot be removed):</label><br/>
			1<input
				type="range"
				id="numberOfBlocksPerLockedRows"
				min="1"
				max="10"
				defaultValue={10}
				ref={nbBlocksRef}
			/>10
			<br/>
			<label htmlFor="useGhostDisplayer">Use Ghost Displayer for the other players:</label><br/>
				<input
					type="checkbox"
					id="useGhostDisplayer"
					checked={checked}
					ref={ghostDisplayerRef}
					onChange={() => setChecked(!checked)}
				/><label htmlFor="useGhostDisplayer">{checked ? defaultTxt : normalTxt}</label>

		</div>
	);
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {}
};

const GameParametrerRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameParametrer);

export default GameParametrerRedux;
