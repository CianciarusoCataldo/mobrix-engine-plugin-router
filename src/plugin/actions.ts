/**
 * @file {@link https://github.com/CianciarusoCataldo/mobrix-engine-plugin-router MoBrix-engine-plugin-router} actions
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { createMoBrixEngineAction } from "mobrix-engine-tools";

/**
 * Go back to previous route saved in history, if available
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=actions
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const goBack = createMoBrixEngineAction(
  "@@router/CALL_HISTORY_METHOD",
  () => ({
    method: "goBack",
    args: [],
  })
);

/**
 * Change actual route
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=actions
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const goTo = createMoBrixEngineAction(
  "@@router/CALL_HISTORY_METHOD",
  (path: string) => ({ args: [path], method: "push" })
);

/**
 * Action dispatched everytime the actual route is changed
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine-plugin-router?id=actions
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const locationChange = createMoBrixEngineAction(
  "@@router/LOCATION_CHANGE"
);
