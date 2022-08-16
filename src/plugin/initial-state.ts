/**
 * @file {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} initial state file
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { RouterPluginState } from "./types";

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} initial state
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
const routerInitialState: RouterPluginState = {
  location: {
    pathname: "",
    hash: "",
    search: "",
    state: "",
    key: "",
  },
  action: null,
  isHomePage: false,
  homeRoute: "",
  routes: {},
  routeKey: "",
};

export default routerInitialState;
