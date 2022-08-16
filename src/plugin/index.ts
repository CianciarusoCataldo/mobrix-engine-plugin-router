/**
 * @file {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} init file
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

import { RouterPlugin } from "./types";

import * as actions from "./actions";
import { compareRoutes, extractHomePage } from "./helper";
import initialState from "./initial-state";
import { createMoBrixEnginePlugin } from "mobrix-engine-tools";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

/**
 * {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} create function.
 * To use it inside {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine-system}, include into `plugins` array
 *
 * @returns MoBrix-engine plugin
 *
 * @example <caption> Use router plugin inside MoBrix-engine config </caption>
 * import { routerPlugin } from "mobix-engine-plugin-router"
 *
 * const config = {
 *   appName: "custom-app",
 *   plugins: [routerPlugin],
 *   router: {
 *     routes: {
 *       Home: "/",
 *       Custom: "/custom",
 *     },
 *     homePage: "Home",
 *     basename: "/custom-basename",
 *   },
 * };
 *
 * export default config;
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
const routerPlugin: RouterPlugin = createMoBrixEnginePlugin("mobrix-engine-router", () => ({
  field: (config) => {
    const routerConfig = config.router || {};

    let routes = routerConfig.routes || {};

    const basename = routerConfig.basename || "";

    const homePage = routerConfig.homePage || "";

    Object.keys(routes).forEach((routeKey) => {
      routes[routeKey] = basename + routes[routeKey];
    });

    const homeRoute = extractHomePage({
      routes,
      homePage,
    });

    return {
      name: "router",
      content: {
        routes,
        basename,
        onLocationChange: routerConfig.onLocationChange || [],
        homeRoute,
        initialRouteKey:
          Object.keys(routes!).find((key) =>
            compareRoutes(window.location.pathname, routes[key])
          ) || homePage,
      },
    };
  },

  interactions: [
    {
      plugin: "mobrix-engine-url-checker",
      effect: (field, config) => {
        field.queryParameters["to"] = ({ store, urlParam, config }) => {
          const routerConfig = store.getState().router;
          
          const basename = routerConfig.basename;
          const routes = routerConfig.routes;

          if (Object.values(routes).includes(urlParam)) {
            store.dispatch(actions.goTo(urlParam));
          } else {
            if (Object.values(routes).includes(basename + urlParam)) {
              store.dispatch(actions.goTo(basename + urlParam));
            } else {
              if (Object.keys(routes).includes(String(urlParam))) {
                store.dispatch(actions.goTo(routes[urlParam]));
              } else {
                store.dispatch(actions.goTo(routerConfig.homeRoute));
              }
            }
          }

          return config;
        };

        field.after.push("to");

        return field;
      },
    },
  ],

  designerInteractions: [
    {
      plugin: "mobrix-designer-router",
      effect: (actualField, config) => {
        return {
          ...actualField,
          routes: actualField.routes || config.router.routes,
          homePage: actualField.homePage || config.router.homeRoute,
          history: actualField.history || config.router.history,
        };
      },
    },
  ],

  reducer: (config) => ({
    reducer: routerReducer,
    slice: "router",
    effects: {
      [actions.locationChange.type]: (state, action) => ({
        ...state,
        isHomePage: compareRoutes(window.location.pathname, state.homeRoute),
        routeKey: Object.keys(state.routes).find((key) =>
          compareRoutes(window.location.pathname, state.routes[key])
        ),
      }),
    },

    initialState: {
      ...initialState,
      ...config.router,
      onLocationChange: [],
      homeRoute: config.router.homeRoute,
      routeKey: config.router.initialRouteKey,
    },
  }),

  middlewares: (config) => {
    const onLocationChangeCallbacks = config.router.onLocationChange;
    const routeKeys = Object.keys(config.router.routes);

    return {
      legacyMiddlewares: [routerMiddleware],
      middlewares: [
        (action, store) => {
          if (action.type === actions.locationChange.type) {
            onLocationChangeCallbacks.forEach((callback) => {
              callback(
                action.payload.location.pathname,
                routeKeys.find((key) =>
                  compareRoutes(
                    action.payload.location.pathname,
                    config.router.routes[key]
                  )
                )
              );
            });
          }
        },
      ],
    };
  },
  after: ({ config, store }) => {
    return {
      ...config,
      router: { ...config.router, history: store && createReduxHistory(store) },
    };
  },
}));

export default routerPlugin;
