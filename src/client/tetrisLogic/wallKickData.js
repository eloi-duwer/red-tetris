/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   wallKickData.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:46 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 14:22:50 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/*
Données tirées de https://tetris.fandom.com/wiki/SRS
Les coords y sont inversées par rapport a la page (pas la mm représentation interne)
Le [0, 0] est implicite (tjrs présent)
L'obj est formatté: i / all: quelle est la piece a tester
0 / 1 / 2 / 3: quel est l'état de la rotation, et le sous-obj l'état cible
Donc wallKickData.i[0][1] décrit les wallkicks du I ds la transition de 0 a 1
*/

/* eslint no-magic-numbers: [1, { "ignore": [-2, -1, 0, 1, 2] }]*/

const wallKickData = {
  i: {
    0: {
      1: [[-2, 0], [1, 0], [-2, 1], [1, -2]],
      3: [[-1, 0], [2, 0], [-1, -2], [2, 1]],
    },
    1: {
      0: [[2, 0], [-1, 0], [2, -1], [-1, 2]],
      2: [[-1, 0], [2, 0], [-1, -2], [2, 1]],
    },
    2: {
      1: [[1, 0], [-2, 0], [1, 2], [-2, -1]],
      3: [[2, 0], [-1, 0], [2, -1], [-1, 2]],
    },
    3: {
      2: [[-2, 0], [1, 0], [-2, 1], [1, -2]],
      0: [[1, 0], [-2, 0], [1, 2], [-2, -1]],
    },
  },

  all: {
    0: {
      1: [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
      3: [[1, 0], [1, -1], [0, 2], [1, 2]],
    },
    1: {
      0: [[1, 0], [1, 1], [0, -2], [1, -2]],
      2: [[1, 0], [1, 1], [0, -2], [1, -2]],
    },
    2: {
      1: [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
      3: [[1, 0], [1, -1], [0, 2], [1, 2]],
    },
    3: {
      2: [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
      0: [[-1, 0], [-1, 1], [0, -2], [-1, 2]],
    },
  },
}

export default wallKickData
