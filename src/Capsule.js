/*
 * @flow
 * Copyright (c) 2017 Daniel Ennis (Aikar) - MIT License - http://opensource.org/licenses/MIT
 */

import {ActionDef} from "./Action";
import Action from "./Action";

const pathSplitRegex = /./;
const actionVerifySymbol = new Symbol();

export class Capsule {
  _internalState: {[any]: any};
  constructor(id: String) {
    if (!id) {
      throw new Error("You must specify an ID for a Capsule");
    }
  }

  initialize(state: {[any]: any}): void {
    this._internalState = state;
  }

  toJson(): string {
    return JSON.stringify(this._internalState);
  }

  updateState(path: string, state: any): void {
    let root = this._internalState;
    let split = path.split(pathSplitRegex);
    for (const key of split.slice(0, split.length-2)) {
      // TODO: Validate exists and error, or set? how to handle this?
      root = root[key];
    }
    root[split[split.length-1]] = state;
    // TODO: Listeners
  }

  static createAction(actionDef: ActionDef): Action {
    // TODO: Validation
    return new Action(actionDef, actionVerifySymbol);
  }

  static isValidAction(verify: Symbol): boolean {
    return verify === actionVerifySymbol;
  }
}

export {Action};

export default Capsule;
