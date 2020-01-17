/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   HoldAndCommingNextDisplayer.js                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/06 17:39:37 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 15:12:36 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import OnePieceDisplayer from './OnePieceDisplayer'

const numberOfPiecesToShow = 6

const HoldAndCommingNextDisplayer = (props) => <div
  className='HoldAndCommingNextDisplayer'
  style={{
    border: '2px solid black',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70px',
    textAlign: 'center',
    margin: '10px',

  }}>
  <div id='hold'>
    <span>hold</span>
    <div style={{ width: '60px', height: '60px' }}>
      {props.heldPiece ?
        <OnePieceDisplayer piece={props.heldPiece} size={15} /> :
        undefined
      }
    </div>
  </div>
  <div id='next'>
    <span>next</span>
    {props.piecesList.map((piece, i) => <OnePieceDisplayer key={i} piece={piece} size={15}/>)}
  </div>
</div>

HoldAndCommingNextDisplayer.propTypes = {
  heldPiece: PropTypes.object,
  piecesList: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  heldPiece: state.tetrisReducer.heldPiece,
  piecesList: state.tetrisReducer.piecesList.slice(0, numberOfPiecesToShow),
});

const mapDispatchToProps = () => ({});

const HoldAndCommingNextDisplayerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoldAndCommingNextDisplayer);

export default HoldAndCommingNextDisplayerRedux;
