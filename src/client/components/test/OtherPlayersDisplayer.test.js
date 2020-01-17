/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   OtherPlayersDisplayer.test.js                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/08 21:34:02 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 22:24:29 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Provider } from 'react-redux';
import OtherPlayersDisplayer from '../OtherPlayersDisplayer';

describe('tests for OtherPlayersDisplayer', () => {
  it('renders OtherPlayersDisplayer and GhostDisplayer well', () => {
    const store = mockStore({
      socketReducer: {
        ...socketReducer,
        playersInfo: {
          ...socketReducer.playersInfo,
          [0]: {
            ...socketReducer.playersInfo[0],
            boardState: [15, 16, 12, 10, 20, 15, 15, 15, 15, 15],
          },
        },
      },
      tetrisReducer: {
        ghostDisplay: true
      }
    });

    const component = render(<Provider store={store}><OtherPlayersDisplayer /></Provider>);

    expect(component.find('span').html()).to.equal('bob: 100 points');
    expect(component.find('.GhostDisplayer')).to.not.equal(null);
  });

  it('GhostDisplayer renders Game Over screen and handles undefined boardState', () => {
    const store = mockStore({
      socketReducer: {
        ...socketReducer,
        playersInfo: {
          ...socketReducer.playersInfo,
          [0]: {
            ...socketReducer.playersInfo[0],
            gameOver: true,
            boardState: undefined,
          },
        },
      },
      tetrisReducer: {
        ghostDisplay: true,
      }
    });

    const component = render(<Provider store={store}><OtherPlayersDisplayer /></Provider>);
    expect(component.find('.GameOverOverlay')).to.not.equal(null);
    expect(component.find('.GhostDisplayer').children().length).to.equal(1);
  })
})
