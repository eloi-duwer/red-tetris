/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   checkTetris.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:19:26 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/08 14:57:04 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const checkTetris = (board) => {

  // Liste des lignes complétées
  const allCompleteLines = board.reduce((acc, line, index) => (

    // On cherche dans la ligne au moins un espace vide (0) ou bloqué (1), si il n'y en n'a pas la ligne est complete
    line.findIndex(square => square === 0 || square === -1) === -1 ? [...acc, index] : acc), []
  );

  const filtered = board.filter((useless, i) => (allCompleteLines.indexOf(i) === -1));

  const height = 30;
  const width = 10;

  return {
    newBoard: [...(Array.from(Array(allCompleteLines.length), () => Array.from(Array(width), () => 0))), ...filtered],
    nbPoints: height - filtered.length,
  };
}

export default checkTetris;
