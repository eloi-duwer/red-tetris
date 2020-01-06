/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   HoldAndCommingNextDisplayer.js                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/06 17:39:37 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/06 18:24:20 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import { connect } from 'react-redux'

import TetrisDisplayer from './TetrisDisplayer'

import pieces from '../tetrisLogic/tetrisPieces'

const arrayLoop = [0,0,0,0];

export const HoldAndCommingNextDisplayer = (props) => {
  console.log(props)
	return (
		<div className='HoldAndCommingNextDisplayer' style={{
      border: '2px solid black',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      width: '75px'
    }}>
      <div id='hold'>
        <span>hold</span>
        <div style={{width: '60px', height: '60px', display: "flex", flexWrap: "wrap", position: ' relative'}}>
          {props.heldPiece
            ? arrayLoop.map((useless, i) => arrayLoop.map((useless, j) => {
              const style = {width: '15px', height: '15px', borderRadius: '5px'}
              const color = (i < props.heldPiece.piece.length
                  && j < props.heldPiece.piece[i].length
                  && props.heldPiece.piece[i][j] === 1)
                ? pieces.colors[props.heldPiece.type] : 'white';
              return <div style={{...style, backgroundColor: color}}></div>;
            }))
            : undefined

          }
        </div>
      </div>
      <div id='next'>next</div>
		</div>
	);
}

const mapStateToProps = (state) => {
  console.log(state)
	return {
    heldPiece: state.tetrisReducer.heldPiece,
    piecesList: state.tetrisReducer.piecesList.slice(0, 3),
  };
};

const mapDispatchToProps = dispatch => {
	return {}
};

const HoldAndCommingNextDisplayerRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(HoldAndCommingNextDisplayer);

export default HoldAndCommingNextDisplayerRedux;
