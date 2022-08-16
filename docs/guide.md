# MoBrix-engine-plugin-router

![NPM](https://img.shields.io/npm/l/mobrix-engine-plugin-router?label=License&style=for-the-badge)
![npm](https://img.shields.io/npm/v/mobrix-engine-plugin-router?color=orange%20&label=Latest%20version&style=for-the-badge&logo=npm)
![npm bundle size](https://img.shields.io/bundlephobia/min/mobrix-engine-plugin-router?label=Package%20size&style=for-the-badge)
![Maintenance](https://img.shields.io/maintenance/yes/2025?label=Maintained&style=for-the-badge)

---

<br>

A routing system to control navigation with [MoBrix-engine](https://github.com/CianciarusoCataldo/mobrix-engine)

<br>

---

## Getting started

<br>

### Installation

If you want to use this plugin with [MoBrix-engine](https://github.com/CianciarusoCataldo/mobrix-engine), install it:

```sh
npm i mobrix-engine-plugin-router
```

Check [MoBrix-engine guide](https://cianciarusocataldo.github.io/mobrix-engine/docs) to init the system

<br>

### Usage

Include this plugin inside your MoBrix-engine config file, and optionally set the `router` field, with the plugin settings.
For example, to add a custom query parameter:

```tsx
// Inside your MoBrix-engine config file

import { routerPlugin } from "mobrix-engine-plugin-router";

const config = {
  appName: "custom-app",
  plugins: [routerPlugin],
  router: {
    routes: {
      Home: "/",
      Custom: "/custom",
    },
    homePage: "Home",
    basename: "/custom-basename",
  },
};

export default config;
```

So the plugin will store 2 routes:

```json
{
  "Home": "/custom-basename/",
  "Custom": "/custom-basename/custom"
}
```

and the home page route will be:

```
/custom-basename/
```

Additionally, this plugin save the used history into the router config, inside the config returned after MoBrix-engine is initialized. you can find it into the `history` field:

```tsx
import { initEngine } from "mobrix-engine";
import { routerPlugin } from "mobrix-engine-plugin-router";

const config = {
  plugins: [routerPlugin],
  appName: "custom-app",
  router: {
    routes: {
      Home: "/",
      Custom: "/custom",
    },
    homePage: "Home",
    basename: "/custom-basename",
  },
};

const engineOutput = initEngine(config);

//You can use this history object in any part of your app
const history = engineOutput.config.router.history;
```

You can see a live preview by visiting [mobrix-engine-playground](https://cianciarusocataldo.github.io/mobrix-engine/)

<br>

## API

### Config

This plugin adds a custom field inside the MoBrix-engine config, `router`:

| Selectors          | Returns                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `routes`           | a dictionary with all custom routes (the `key` is the custom route name, and the `value` is the route associated) |
| `homePage`         | home page route name (from `routes` field)                                                                        |
| `basename`         | custom basename, a shared common routes that will be put at the start of every route                              |
| `onLocationChange` | functions called everytime the location change                                                                    |

Check the [usage](#usage) section for a real example

<br>

### Actions

| Action creator | Arguments                  | Effect                                                                                      |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| `goBack`       | /                          | Go back to previous route saved in history                                                  |
| `goTo`         | - `path`: new route to set | Go to the given route, if it is one of the stored routes, and save it to the shared history |

<br>

Import them from this lib:

```tsx
import { goBack, goTo } from "mobrix-engine-plugin-router";
```

Then dispatch them from any part of your app:

```tsx
import { goBack, goTo } from "mobrix-engine-plugin-router";

import { useDispatch } from "react-redux";

export const goToButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(goTo('/custom-basename/custom'));
      }}
    >
      Go to '/custom-basename/custom' route
    </button>
  );

export const GoBackButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(goBack());
      }}
    >
      Go back
    </button>
  );
};
```

<br>

### Selectors

| Selectors               | Returns                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `getRouterView`         | router plugin state                                         |
| `getRouterPluginConfig` | router plugin configuration                                 |
| `getHomePage`           | home page route                                             |
| `getRoutes`             | stored `routes`, with `basename` at the start of all routes |
| `isHomePage`            | `true` if actual route is home page, otherwise `false`      |

<br>

Import them from this lib:

```tsx
import {
  getHomePage,
  getRouterPluginConfig,
  getRouterView,
  getRoutes,
  isHomePage,
} from "mobrix-engine-plugin-router";
```

Then you can use them, with selectors hooks, inside your components::

```tsx
import { useSelector } from "react-redux";
import { getRouterConfig } from "mobrix-engine-plugin-router";

export const RouterDebugComponent = () => {
  const routerConfig = useSelector(getRouterConfig);

  return (
    <div>
      <p>Router plugin configuration</p>
      {routerConfig}
    </div>
  );
};
```

<br>

## Integration with other plugins

- This plugin expose some fields to work with any other plugin. If you want to interact with it, using your custom plugin, just check the add an `interaction` for `router`. With the given field and the actual engine config, you can add custom params to the plugin (look at the [config](#config) section). For example, to add a custom function to be called when location change:

```tsx
//Just a skeleton of a custom plugin that interacts with router plugin
const customPlugin = () => ({
  // Custom plugin stuffs

  interactions: [
    {
      plugin: "mobrix-engine-router",
      effect: (routerConfig) => {
        // Custom plugin stuffs

        //Add the custom callback
        routerConfig.onLocationChange.push(() => {
          alert("location changed");
        });
      },
    },
  ],
});
```

- Additionally, if you use [MoBrix-engine-plugin-url-checker](https://github.com/CianciarusoCataldo/mobrix-engine-plugin-url-checker) too, you can change the initial route directly from URL, with query parameters, by passing the `to` parameter with the route you want to set. Try it with [MoBrix-engine](https://github.com/CianciarusoCataldo/mobrix-engine) playground - https://cianciarusocataldo.github.io/mobrix-engine?to=/test

<br>

---

## Included libraries

- [redux-first-history](https://github.com/salvoravida/redux-first-history) to drive location with actions
- [MoBrix-engine-types](https://github.com/CianciarusoCataldo/mobrix-engine-engine-types) - to use MoBrix-engine type definitions inside the plugin
- [MoBrix-utils](https://github.com/CianciarusoCataldo/mobrix-utils) - to use shared util functions during init process
- This lib is written entirely with [Typescript](https://www.typescriptlang.org/)

<br>

---

## Authors

- [**Cataldo Cianciaruso**](https://github.com/CianciarusoCataldo)

<br>

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
