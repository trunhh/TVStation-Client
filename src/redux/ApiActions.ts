import axios from "axios";
import DispatchType from "./DispatchType.ts";

export default class ApiActions {
  private readonly ROOT_PATH = "https://localhost:7031/";
  private token: string | null;

  constructor(
    private route: string,
    private dispatchType: DispatchType
  ) {
    this.token = localStorage.getItem('token');

    // Bind all methods to ensure this.token is always accessible
    this.get = this.get.bind(this);
    this.getList = this.getList.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  private buildQueryString(query?: Record<string, any>): string {
    if (!query) return "";
  
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([_, v]) => v !== null && v !== undefined && v !== ""
      )
    );
  
    const searchParams = new URLSearchParams(filteredQuery).toString();
    return searchParams ? `?${searchParams}` : "";
  }

  private request = (
    config: any,
    actionTypes: {
      request: string;
      succeed: string;
      failed: string;
    }
  ) => {
    return async (dispatch: any) => {
      dispatch({ type: actionTypes.request });

      try {
        const response = await axios({
          ...config,
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            ...config.headers
          }
        });

        dispatch({
          type: actionTypes.succeed,
          payload: response.data
        });

        return response.data;
      } catch (error: any) {
        console.log(error);
        alert(error.message);
        dispatch({
          type: actionTypes.failed,
          payload: error.response?.data || error.message
        });
        throw error;
      }
    };
  };

  public get(id: string | number) {
    return this.request(
      {
        url: `${this.ROOT_PATH}${this.route}/${id}`,
        method: 'GET'
      },
      this.dispatchType.get
    );
  }

  

  public getList(query?: Record<string, any>) {
    const queryString = this.buildQueryString(query);
  
    return this.request(
      {
        url: `${this.ROOT_PATH}${this.route}${queryString}`,
        method: 'GET'
      },
      this.dispatchType.getList
    );
  }

  public create(object: any) {
    return this.request(
      {
        url: `${this.ROOT_PATH}${this.route}`,
        method: 'POST',
        data: object
      },
      this.dispatchType.create
    );
  }

  public update(id: string | number, object: any) {
    return this.request(
      {
        url: `${this.ROOT_PATH}${this.route}/${id}`,
        method: 'PUT',
        data: object
      },
      this.dispatchType.update
    );
  }

  public remove(id: string | number) {
    return this.request(
      {
        url: `${this.ROOT_PATH}${this.route}/${id}`,
        method: 'DELETE'
      },
      this.dispatchType.delete
    );
  }
}
