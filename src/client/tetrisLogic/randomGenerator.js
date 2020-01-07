/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   randomGenerator.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:20:31 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 19:08:03 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/*
* Fallback au cas ou le socket mets trop de temps pour renvoyer des pieces
* Quand on en a besoin
* Du coup désynchro entre les joueurs mais mieux que de crasher / lagger
*/

const bag = [
	"j",
	"i",
	"l",
	"o",
	"z",
	"s",
	"t"
];

const randomGenerator = () => {

	console.error("Fallback de generation de piece!");
	return bag[Math.floor(Math.random() * bag.length)];

};

export default randomGenerator;
