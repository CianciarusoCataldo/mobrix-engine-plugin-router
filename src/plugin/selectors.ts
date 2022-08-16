/**
 * @file {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} selectors file
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { MoBrixEngineGlobalState } from "mobrix-engine-types";
import { createMoBrixEngineSelector } from "mobrix-engine-tools";

import initialState from "./initial-state";
import { RouterPluginConfig, RouterPluginState } from "./types";

/**
 * Returns {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} state, or the default state if the plugin is not enabled
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getRouterView = (
  state: MoBrixEngineGlobalState<{ router?: RouterPluginState }>
): RouterPluginState => state.router || initialState;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router?id=config MoBrix-engine-plugin-router config parameters}
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getRouterPluginConfig = createMoBrixEngineSelector(
  getRouterView,
  (router) =>
    ({
      routes: router.routes,
      homePage: router.homePage,
      basename: router.basename,
      homeRoute: router.homeRoute,
      isHomePage: router.isHomePage,
    } as RouterPluginConfig)
);

/**
 * Returns {@link https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=config homePage parameter}
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getHomePage = createMoBrixEngineSelector(
  getRouterPluginConfig,
  ({ homeRoute }) => homeRoute
);

/**
 * Returns {@link https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=config routes parameter}, with each route combined with basename
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getRoutes = createMoBrixEngineSelector(
  getRouterPluginConfig,
  ({ routes }) => routes
);

/**
 * Returns true if actual route is {@link https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=config Home page route}, false otherwise
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const isHomePage = createMoBrixEngineSelector(
  getRouterView,
  ({ isHomePage }) => isHomePage
);
