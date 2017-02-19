/*@flow*/
export class Action {
  get(...args:any[]): Promise<any> {
    return Promise.resolve();
  }
  update(...args:any[]): Promise<any> {
    return Promise.resolve();
  }
  observe(...args:any[]): Promise<any> {
    return Promise.resolve();
  }
}

export default Action;
