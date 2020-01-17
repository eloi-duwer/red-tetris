/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RandomPieceGenerator.test.js                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/13 18:50:58 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/17 18:03:17 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import RandomPieceGenerator from '../RandomPieceGenerator'

describe('Tests for the class RandomPieceGenerator', () => {
	let rpg;

	before(() => {
		rpg = new RandomPieceGenerator();
	});

	it('tests for resetBeforeStart', () => {
		rpg.resetBeforeStart();
		expect(Object.keys(rpg.ids)).to.have.lengthOf(0);
		expect(rpg.bags[0].pieces).to.have.lengthOf(7);
	});

	it('tests for getNextBag', () => {
		rpg.getNextBag(0);
		expect(Object.keys(rpg.ids)).to.have.lengthOf(1);
		expect(rpg.ids).to.include.keys({'0': 1});
		expect(rpg.bags).to.have.lengthOf(2);
		expect(rpg.bags[1].pieces).to.have.lengthOf(7);
	});

	it('getNextBag does\'nt creates too many bags', () => {
		rpg.getNextBag(1);
		expect(Object.keys(rpg.ids)).to.have.lengthOf(2);
		expect(rpg.bags).to.have.lengthOf(2);
		expect(rpg.bags[1].pieces).to.have.lengthOf(7);
	});

	it('getNextBag sends the same bag for each players', () => {
		rpg.resetBeforeStart();
		expect(rpg.getNextBag(0)).to.equal(rpg.getNextBag(1));
	})
});
