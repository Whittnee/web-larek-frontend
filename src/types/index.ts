export interface IProduct {
  id: string;
  description?: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IOrder {
  address: string;
  payment: string;
  email: string;
  phone: string;
}

export interface IOrderData {
  order: IOrder
}

export interface IProductsData {
  products: IProduct[];
  getProduct(productId: string): IProduct;
}

export interface IBasketData {
  products: IProduct[];
  addProduct(product: IProduct): void;
  removeProduct(productId: string): void;
  totalAmount(): number;
  clearBasket(): void;
  getBasketCount(): number;
  isEmpty(): boolean;
  inBasket(productId: string): boolean;
}

export type TCustomerOderData = Pick<IOrder, 'payment' | 'address'>;

export type TCustomerPrivateData = Pick<IOrder, 'email' | 'phone'>

export type TProductMainData = Pick<IProduct, 'id' | 'title' | 'price'> & {
  index: number;
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
