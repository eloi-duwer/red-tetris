/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetrisPieces.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:36 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 15:32:06 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const pieces = {
	i: [[0,0,0,0],
		 [1,1,1,1],
		 [0,0,0,0],
		 [0,0,0,0]],

	j: [[1,0,0],
		 [1,1,1],
		 [0,0,0]],

	l: [[0,0,1],
		 [1,1,1],
		 [0,0,0]],

	o: [[1,1],
			[1,1]],

	s: [[0,1,1],
			[1,1,0],
			[0,0,0]],

	t: [[0,1,0],
			[1,1,1],
			[0,0,0]],

	z: [[1,1,0],
			[0,1,1],
			[0,0,0]],

	colors: {
		i: "rgb(60, 199, 214)", //cyan
		o: "rgb(251, 180, 20)", // yellow
		t: "rgb(176, 68, 151)", //purple
		s: "rgb(149, 196, 61)", //green
		z: "rgb(232, 65, 56)", //red
		j: "rgb(57, 147, 208)", //blue
		l: "rgb(237, 101, 47)" //orange
	}
}

export default pieces;
