/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   checkTetris.spec.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/10 14:25:37 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/10 14:34:38 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import checkTetris from './checkTetris'

describe('Test for checkTetris', () => {
	const empty = new Array(25).fill(new Array(10).fill(0));
	const board = [
		...empty,
		[1,2,3,4,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[5,5,5,5,5,5,5,5,5,5],
		[0,0,0,0,0,0,0,0,0,0],
		[5,5,5,5,5,5,5,5,5,5]
	]

	it('Removes full lines, generates an array with good sizes, dont remove other lines', () => {
		expect(checkTetris(board)).to.deep.equal({
			newBoard: [
				...empty,
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[1,2,3,4,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
			],
			nbPoints: 2
		});
	})
})
