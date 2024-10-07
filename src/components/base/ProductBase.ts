import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "./Component";
import { IEvents } from "./events";

interface IProductView extends IProduct {
  index: number;
}

export class ProductBase extends Component<IProductView> {
  protected productId: string;
  protected productPrice: HTMLElement;
  protected productTitle: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.productPrice = ensureElement<HTMLElement>('.card__price', this.container);
    this.productTitle = ensureElement<HTMLElement>('.card__title', this.container);
  }

  set id(id: string) {
    this.productId = id
  }

  set price(price: number | null) {
		if (typeof price === 'number') {
			this.setText(this.productPrice, `${price.toLocaleString('ru-RU')} синапсов`);
		} else if (price === null) {
			this.setText(this.productPrice, `Бесценно`);
		}
	}

  set title(title: string) {
    this.setText(this.productTitle, title)
  }
}