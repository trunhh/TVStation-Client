export default class DispatchType {
  private prefix: string;

  get: any;
  getList: any;
  update: any;
  delete: any;
  create: any;

  constructor(prefix: string) {
    this.prefix = prefix.toUpperCase();

    this.get = {
      request: this.createActionType('GET', 'REQUEST'),
      succeed: this.createActionType('GET', 'SUCCEED'),
      failed: this.createActionType('GET', 'FAILED'),
    };

    this.getList = {
      request: this.createActionType('GET_LIST', 'REQUEST'),
      succeed: this.createActionType('GET_LIST', 'SUCCEED'),
      failed: this.createActionType('GET_LIST', 'FAILED'),
    };

    this.update = {
      request: this.createActionType('UPDATE', 'REQUEST'),
      succeed: this.createActionType('UPDATE', 'SUCCEED'),
      failed: this.createActionType('UPDATE', 'FAILED'),
    };

    this.delete = {
      request: this.createActionType('DELETE', 'REQUEST'),
      succeed: this.createActionType('DELETE', 'SUCCEED'),
      failed: this.createActionType('DELETE', 'FAILED'),
    };

    this.create = {
      request: this.createActionType('CREATE', 'REQUEST'),
      succeed: this.createActionType('CREATE', 'SUCCEED'),
      failed: this.createActionType('CREATE', 'FAILED'),
    };
  }

  private createActionType(action: string, result: string): string {
    return `${this.prefix}_${action.toUpperCase()}_${result.toUpperCase()}`;
  }
}
