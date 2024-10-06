import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface ISucsess {
  total: number;
}
export class SucсessPreview extends Component<ISucsess> {
  protected _total: HTMLElement;
  protected events: IEvents;
  protected button: HTMLButtonElement

  constructor(container: HTMLElement, events: IEvents) {
    super(container)
    this.events = events;
    this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.button = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.button.addEventListener('click', () => {
      this.events.emit('success:close')
    })
  }

  set total(value: number) {
    this.setText(this._total, `Списано ${value} синапсов`)
  }

}