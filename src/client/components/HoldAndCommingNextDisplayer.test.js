/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   HoldAndCommingNextDisplayer.test.js                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/08 21:14:41 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/13 19:30:30 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Provider } from 'react-redux';
import HoldAndCommingNextDisplayer from './HoldAndCommingNextDisplayer';

describe('Tests for HoldAndCommingNextDisplayer and OnePieceDisplayer', () => {

  it('renders holding piece and next pieces', () => {
    const store = mockStore({
      tetrisReducer,
    });

    const component = render(<Provider store={store}><HoldAndCommingNextDisplayer /></Provider>);
    expect(component.find('.OnePieceDisplayer').length).to.equal(3);
  });

  it('Do not render held piece when there is none', () => {
    const store = mockStore({
      tetrisReducer: {
        ...tetrisReducer,
        heldPiece: undefined,
      },
    });

    const component = render(<Provider store={store}><HoldAndCommingNextDisplayer /></Provider>);
    expect(component.find('.OnePieceDisplayer').length).to.equal(2);
  });
})
