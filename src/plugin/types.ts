/**
 * @file {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} types
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { RouterState } from "redux-first-history";
import {
  MoBrixEngineAction,
  MoBrixEngineCustomState,
  MoBrixEnginePlugin,
} from "mobrix-engine-types";

import { History } from "history";

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} settings
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type RouterPluginConfig = {
  /** Routes map (a `goTo` action can be dispatched only with these routes, key or path itself) */
  routes: Record<string, string>;

  /** Home page route name */
  homePage: string;

  /** routes basename, a shared path inside all url, that is put at the start of every route */
  basename: string;

  /** Home page route, normally computed during init process (determined from homePage value) */
  homeRoute: string;

  /** Home page check value, normally computed during init process */
  isHomePage?: boolean;

  /** Router history, syncronized with global state */
  history?: History;

  routeKey?: string;
};

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} interface
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type RouterPlugin = MoBrixEnginePlugin<{
  router?: Partial<RouterPluginConfig> & {
    /** Route name associated with the initial pathname, the first page loaded */
    initialRouteKey?: string;

    /**
     * An array of functions called everytime location is changed (every callback takes 2 arguments, the new `path`
     * and the related `routeKey`, if available)
     * */
    onLocationChange?: ((
      path: string,
      routeKey?: string
    ) => MoBrixEngineAction | void)[];
  };
}>;

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} state
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type RouterPluginState = MoBrixEngineCustomState<
  RouterState &
    Omit<RouterPluginConfig, "homePage" | "basename" | "onLocationChange">
>;
