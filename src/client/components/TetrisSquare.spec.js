/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisSquare.spec.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/08 18:20:19 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 20:00:54 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react'
import TetrisSquare from './TetrisSquare'

describe('One tetris square (piece or empty)', () => {
  let component = shallow(<TetrisSquare color='black' size={5} />);
  it('renders well', () => {
    expect(component.find('div')).to.have.length(1);
  });

  it('has the good styles', () => {
    const styles = component.get(0).props.style;

    expect(styles.height).to.equal('5px');
    expect(styles.borderRadius).to.not.equal('');

    component = shallow(<TetrisSquare color='black' noRoundedBorder size={5}/>);
    expect(component.get(0).props.style.borderRadius).to.equal('');
  });
});
