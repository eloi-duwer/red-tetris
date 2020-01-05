import React from 'react'
import { connect } from 'react-redux'

export const OtherPlayersDisplayer = (props) => {
	return (
		<div className='OtherPlayersDisplayer' style={{display: 'flex', flexDirection: 'column'}}>
			{Object.keys(props.playersInfo).map((id, i) => {
			/*if (+id === +props.ownId)
				return undefined;*/
				return <div key={i}>
					{props.playersInfo[id].pseudo}
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
