/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetrisActions.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/03 15:21:38 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/03 15:21:38 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const INITBOARDSTATE = "INITBOARDSTATE";
export const MOVEPIECE = "MOVEPIECE";
export const ROTATEPIECE = "ROTATEPIECE";
export const NEXTFRAME = "NEXTFRAME";

export const initBoardState = () => {
	return {
		type: INITBOARDSTATE
	}
}

export const movePiece = (newPos) => {
	return {
		type: MOVEPIECE,
		newPos
	}
}

export const rotatePiece = direction => {
	return {
		type: ROTATEPIECE,
		direction
	}
}

export const nextFrame = () => {
	return {
		type: NEXTFRAME
	}
}
