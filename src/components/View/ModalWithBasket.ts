import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IBasketView {
  total: number;
  content: HTMLElement[];
  isEmpty: boolean;
}

export class BasketPreview extends Component<IBasketView> {
  protected events: IEvents;
  protected button: HTMLButtonElement;
  protected _total: HTMLElement;
  protected _content: HTMLElement;
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.button = ensureElement<HTMLButtonElement>('.basket__button', this.container)
    this.button.addEventListener('click', () => {
      this.events.emit('order:place')
    })
    this._total = ensureElement<HTMLElement>('.basket__price', this.container)
    this._content = ensureElement<HTMLElement>('.basket__list', this.container)
  }

  set content(items: HTMLElement[]) {
    this._content.replaceChildren(...items);
  }

  set total(value: number) {
    this.setText(this._total, `${value.toLocaleString('ru-RU')} синапсов`)
  }

  set isEmpty(value: boolean) {
    if (value) {
      this._content.replaceChildren(createElement<HTMLParagraphElement>('p', {
        textContent: 'Корзина пуста'
      }))
      this.setDisabled(this.button, true)
    }
    else {
      this.setDisabled(this.button, false)
    }
  }


}