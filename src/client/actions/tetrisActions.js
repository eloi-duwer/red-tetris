/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetrisActions.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:38 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 20:25:35 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const INITBOARDSTATE = 'INITBOARDSTATE';
export const MOVEPIECE = 'MOVEPIECE';
export const ROTATEPIECE = 'ROTATEPIECE';
export const NEXTFRAME = 'NEXTFRAME';
export const ADDBAGOFPIECES = 'ADDBAGOFPIECES';
export const RESETBAGOFPIECES = 'RESETBAGOFPIECES';
export const HOLDPIECE = 'HOLDPIECE';
export const ADDLOCKEDROWS = 'ADDLOCKEDROWS';
export const SETGAMECONFIG = 'SETGAMECONFIG';
export const SETKEYDOWN = 'SETKEYDOWN';
export const SETGAMEWINNER = 'SETGAMEWINNER';

export const initBoardState = () => ({
  type: INITBOARDSTATE,
});

export const movePiece = newPos => ({
  type: MOVEPIECE,
  newPos,
});

export const rotatePiece = direction => ({
  type: ROTATEPIECE,
  direction,
});

export const nextFrame = () => ({
  type: NEXTFRAME,
});

export const addBagOfPieces = newBag => ({
  type: ADDBAGOFPIECES,
  newBag,
});

export const resetBagOfPieces = firstBag => ({
  type: RESETBAGOFPIECES,
  firstBag,
});

export const holdPiece = () => ({
  type: HOLDPIECE,
});

export const addLockedRows = number => ({
  type: ADDLOCKEDROWS,
  numberOfRows: number,
});

export const setGameConfig = gameConfig => ({
  type: SETGAMECONFIG,
  gameConfig,
});

export const setKeyDown = (key, status) => ({
  type: SETKEYDOWN,
  key,
  status,
});

export const setGameWinner = () => ({
  type: SETGAMEWINNER,
})
