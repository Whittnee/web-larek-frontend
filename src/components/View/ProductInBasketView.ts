import { TProductMainData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class ProductBasket extends Component<TProductMainData> {
  protected events: IEvents;
  protected productId: string;
  protected productTitle: HTMLElement;
  protected productPrice: HTMLElement;
  protected button: HTMLButtonElement;
  protected _index: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.productTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.productPrice = ensureElement<HTMLElement>('.card__price', this.container);
    this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.button = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.button.addEventListener('click', () => {
      this.events.emit('productInBasket:delete', { id: this.productId })
    })
  }

  set id(id: string) {
    this.productId = id;
  }

  set title(title: string) {
    this.setText(this.productTitle, title);
  }

  set price(price: number) {
    this.setText(this.productPrice, `${price.toLocaleString('ru-RU')} синапсов`);
  }

  set index(value: number) {
    this.setText(this._index, value.toString())
  }
}