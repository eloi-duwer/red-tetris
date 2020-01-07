/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   checkTetris.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:19:26 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/07 17:19:17 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const checkTetris = (board) => {

	const allTetrisLines = board.reduce((acc, line, index) => {
		return line.indexOf(0) === -1 ? [...acc, index] : acc;
	}, []);

	const filtered = board.filter((useless, i) => allTetrisLines.indexOf(i) === -1 ? true: false);

	return {
		newBoard: [...(Array.from(Array(allTetrisLines.length), () => Array.from(Array(10), () => 0))), ...filtered],
		nbPoints: 30 - filtered.length
	};
}

export default checkTetris;
