/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TetrisDisplayer.test.js                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/08 18:53:45 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 18:00:29 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Provider } from 'react-redux';
import TetrisDisplayerRedux from '../TetrisDisplayer'

describe('Test for TetrisDisplayer and GameOverOverlay', () => {

  let PlayerAliveStore;
  let GameOverStore;

  const colorSelecter = TetrisDisplayerRedux.__GetDependency__('colorSelecter');

  it('gets the good color', () => {
    expect(colorSelecter(-1)).to.equal('black');
    expect(colorSelecter('blue')).to.equal('blue');
    expect(colorSelecter(0, [{ x: 1, y: 1, color: 'red' }], 1, 1)).to.equal('red');
    expect(colorSelecter(0, [{ x: 1, y: 1, color: 'red' }], 2, 2)).to.equal('white');
  });

  beforeEach(() => {
    PlayerAliveStore = mockStore({
      tetrisReducer,
      socketReducer,
    });

    GameOverStore = mockStore({
      tetrisReducer: {
        ...tetrisReducer,
        gameOver: true,
      },
      socketReducer: {
        ...socketReducer,
        playersInfo: {
          ...socketReducer.playersInfo,
          [0]: {
            ...socketReducer.playersInfo[0],
            gameOver: true,
          },
        },
      },
    });
  })

  it('renders your own board', () => {
    const component = render(
      <Provider store={PlayerAliveStore}>
        <TetrisDisplayerRedux ownPlayer size={5}/>
      </Provider>
    );
    expect(component.find('.TetrisSquare')).to.have.length(200);
  });
  it('renders GameOverOverlay when you lost', () => {
    const component = render(
      <Provider store={GameOverStore}>
        <TetrisDisplayerRedux ownPlayer size={5}/>
      </Provider>
    );
    expect(component.find('.GameOverOverlay')).to.not.equal(null);
  });

  it('renders other players board', () => {
    const component = render(
      <Provider store={PlayerAliveStore}>
        <TetrisDisplayerRedux id={0} size={5}/>
      </Provider>
    );
    expect(component.find('.TetrisSquare')).to.have.length(200);
  });
  it('rendres GameOverOverlay when the other player lost', () => {
    const component = render(
      <Provider store={GameOverStore}>
        <TetrisDisplayerRedux id={0} size={5}/>
      </Provider>
    );
    expect(component.find('.GameOverOverlay')).to.not.equal(null);
  });
})
