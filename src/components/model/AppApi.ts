import { IApi, IOrder, IProduct } from "../../types";

interface IOrderAnswer {
  id: string;
  total: number;
}

interface IProductAnswer {
  total: number;
  items: IProduct[]
}

export class AppApi {
  private _baseApi: IApi;
  
  constructor(baseApi: IApi) {
    this._baseApi = baseApi;
  }

  getProducts(): Promise<IProduct[]> {
    return this._baseApi.get<IProductAnswer>(`/product/`).then((result: IProductAnswer) => result.items);
  }

  placeOrder(data: IOrder): Promise<IOrderAnswer> {
    return this._baseApi.post(`/order`, data, 'POST').then((result: IOrderAnswer) => result)
  }
}