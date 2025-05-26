import DispatchType from "./DispatchType.ts";
export default class ApiReducers {
  private initialState = {
    selected: null,
    list: [],
    isUpdated: false,
    isDeleted: false,
    isCreated: false
  };

  constructor(private dispatchType: DispatchType) {}

  reduce = (state = this.initialState, action: any) => {
    switch (action.type) {
      // Get single
      case this.dispatchType.get.succeed:
        return {
          ...state,
          selected: action.payload,
          isUpdated: false,
          isDeleted: false,
          isCreated: false
        };

      // Get list
      case this.dispatchType.getList.succeed:
        return {
          ...state,
          list: action.payload,
          selected: null,
          isUpdated: false,
          isDeleted: false,
          isCreated: false
        };

      // Update
      case this.dispatchType.update.succeed:
        return {
          ...state,
          selected: action.payload,
          isUpdated: true,
        };

      // Delete
      case this.dispatchType.delete.succeed:
        return {
          ...state,
          isDeleted: true,
        };

      // Create
      case this.dispatchType.create.succeed:
        return {
          ...state,
          selected: action.payload,
          isCreated: true,
        };

      default:
        return state;
    }
  };
}
