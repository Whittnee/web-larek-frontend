export interface IProduct {
  id: string;
  description?: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface ICustomer {
  deliveryAddress: string;
  paymentMethod: string;
  emailAddress: string;
  phoneNumber: string
}

export interface IProductList {
  products: IProduct[];
  preview: string | null;
  getProductList(): IProduct[];
}

export interface IBasket {
  products: IProduct[];
  total: number;
  addProduct(product: IProduct): void;
  removeProduct(productId: string): void;
  getBasketList(): IProduct[];
  totalAmount(): number;
  clearBasket(): void;
}

export interface ICustomerInfo {
  getCustomerInfo(): ICustomer;
  setCustomerInfo(customerData: ICustomer): void;
  checkCustomerValidation(data: Record<keyof ICustomer, string>): boolean;
}

export type TCustomerOderData = Pick<ICustomer, 'paymentMethod' | 'deliveryAddress'>;

export type TCustomerPrivateData = Pick<ICustomer, 'emailAddress' | 'phoneNumber'>

export type TProductMainData = Pick<IProduct, 'id' | 'title' | 'price'>
