/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetrisPieces.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:36 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 14:35:40 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const pieces = {
  i: [[0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]],

  j: [[1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]],

  l: [[0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]],

  o: [[1, 1],
    [1, 1]],

  s: [[0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]],

  t: [[0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]],

  z: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],

  colors: {

    // cyan
    i: 'rgb(60, 199, 214)',

    // yellow
    o: 'rgb(251, 180, 20)',

    // purple
    t: 'rgb(176, 68, 151)',

    // green
    s: 'rgb(149, 196, 61)',

    // red
    z: 'rgb(232, 65, 56)',

    // blue
    j: 'rgb(57, 147, 208)',

    // orange
    l: 'rgb(237, 101, 47)',
  },
}

export default pieces;
