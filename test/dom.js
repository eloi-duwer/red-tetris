/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   dom.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: eduwer <eduwer@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/08 18:09:22 by eduwer            #+#    #+#             */
/*   Updated: 2020/01/09 14:05:47 by eduwer           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body><div id="main"></div></body></html>');

//Creation d'une page coté serveur avec JSDOM, pour etre utilisé par enzyme apres

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
