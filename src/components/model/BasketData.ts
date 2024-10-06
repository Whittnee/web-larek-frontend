import { IBasketData, IProduct } from "../../types";
import { IEvents } from "../base/events";

export class BasketData implements IBasketData {
  protected _products: IProduct[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events
    this._products = []
  }

  get products() {
    return this._products
  }

  addProduct(product: IProduct): void {
    this._products = [product, ...this._products];
    this.events.emit('basket:changed')
  }

  removeProduct(productId: string): void {
    this._products = this._products.filter(item => item.id !== productId)
    this.events.emit('basket:changed')
  }

  totalAmount(): number {
    return this._products.reduce((total, product) => total += product.price, 0)
  }

  clearBasket(): void {
    this._products = []
    this.events.emit('basket:changed')
  }

  getBasketCount(): number {
    return this._products.length
  }

  isEmpty(): boolean {
    return this.getBasketCount() === 0;
  }
  
  inBasket(productId: string) {
    return this._products.some(item => {
      return item.id === productId
    })
  }
}