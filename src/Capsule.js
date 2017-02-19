/* @flow */
export class Capsule {
  constructor(id: String) {
    if (!id) {
      throw new Error("You must specify an ID for a Capsule");
    }
  }
}

export {Action} from "./Action";

export default Capsule;
