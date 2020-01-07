/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   checkTetris.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:19:26 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 19:42:59 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const checkTetris = (board) => {

	const allCompleteLines = board.reduce((acc, line, index) => {
		return line.findIndex(square => square === 0 || square === -1) === -1 ? [...acc, index] : acc;
	}, []);

	const filtered = board.filter((useless, i) => allCompleteLines.indexOf(i) === -1 ? true: false);

	return {
		newBoard: [...(Array.from(Array(allCompleteLines.length), () => Array.from(Array(10), () => 0))), ...filtered],
		nbPoints: 30 - filtered.length
	};
}

export default checkTetris;
