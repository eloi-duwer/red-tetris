/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   randomGenerator.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:31 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/06 15:57:55 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/*
* Fallback au cas ou le socket mets trop de temps pour renvoyer des pieces
* Quand on en a besoin
* Du coup désynchro entre les joueurs mais mieux que de crasher / lagger
*/

const defaultBag = [
	"j",
	"i",
	"l",
	"o",
	"z",
	"s",
	"t"
];

let actualBag = defaultBag.slice();

const randomGenerator = () => {

	console.error("Fallback de generation de piece!");
	if (actualBag.length === 0)
		actualBag = defaultBag.slice();
	let randIndex = Math.floor(Math.random() * actualBag.length);
	return (actualBag.splice(randIndex, 1))[0];

};

export default randomGenerator;
