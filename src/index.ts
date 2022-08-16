export { default as routerPlugin } from "./plugin";
export {
  getHomePage,
  getRouterPluginConfig,
  getRouterView,
  getRoutes,
  isHomePage,
} from "./plugin/selectors";
export { locationChange, goBack, goTo } from "./plugin/actions";
export {
  RouterPluginConfig,
  RouterPluginState,
  RouterPlugin,
} from "./plugin/types";
