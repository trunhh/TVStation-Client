class DispatchType {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix.toUpperCase();
  }

  private createActionType(action: string, result: string): string {
    return `${this.prefix}_${action.toUpperCase()}_${result.toUpperCase()}`;
  }

  get = {
    request: this.createActionType('GET', 'REQUEST'),
    succeed: this.createActionType('GET', 'SUCCEED'),
    failed: this.createActionType('GET', 'FAILED'),
  };

  getList = {
    request: this.createActionType('GET_LIST', 'REQUEST'),
    succeed: this.createActionType('GET_LIST', 'SUCCEED'),
    failed: this.createActionType('GET_LIST', 'FAILED'),
  }

  update = {
    request: this.createActionType('UPDATE', 'REQUEST'),
    succeed: this.createActionType('UPDATE', 'SUCCEED'),
    failed: this.createActionType('UPDATE', 'FAILED')
  };

  delete = {
    request: this.createActionType('DELETE', 'REQUEST'),
    succeed: this.createActionType('DELETE', 'SUCCEED'),
    failed: this.createActionType('DELETE', 'FAILED')
  };

  create = {
    request: this.createActionType('CREATE', 'REQUEST'),
    succeed: this.createActionType('CREATE', 'SUCCEED'),
    failed: this.createActionType('CREATE', 'FAILED')
  };
}