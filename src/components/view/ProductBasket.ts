import { TProductMainData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { ProductBase } from "../base/ProductBase";
import { ProductPreview } from "./ProductPreview";

export class ProductBasket extends ProductBase {
  protected button: HTMLButtonElement;
  protected _index: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.button = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.button.addEventListener('click', () => {
      this.events.emit('productInBasket:delete', { id: this.productId })
    })
  }

  set index(value: number) {
    this.setText(this._index, value.toString())
  }
}