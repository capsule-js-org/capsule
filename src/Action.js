/*
 * @flow
 * Copyright (c) 2017 Daniel Ennis (Aikar) - MIT License - http://opensource.org/licenses/MIT
 */
import Capsule from "./Capsule";

export class Action {
  constructor(def: ActionDef, verify: Symbol) {
    if (!Capsule.isValidAction(verify)) {
      throw new Error("Please use capsule.createAction to create an action.");
    }
  }
}

export class ActionDef {
  update: ?(...values: any) => Promise<any>;
  retrieve: ?() => Promise<any>;
}
export default Action;
