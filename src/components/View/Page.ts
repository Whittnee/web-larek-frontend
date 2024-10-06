import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IPage {
  content: HTMLElement[];
  locked: boolean;
  basketCounter: number;
}

export class Page extends Component<IPage> {
  protected events: IEvents;
  protected basketButton: HTMLButtonElement;
  protected _basketCounter: HTMLElement;
  protected pageWrapper: HTMLElement;

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket');
    this.pageWrapper = ensureElement<HTMLElement>('.page__wrapper')
    this._basketCounter = ensureElement<HTMLElement>('.header__basket-counter');
    this.basketButton.addEventListener('click',  () => this.events.emit('basket:open'))
  }

  set content(items: HTMLElement[]) {
    this.container.replaceChildren(...items)
  }

  set basketCounter(value: number) {
    this.setText(this._basketCounter, value.toString())
  }

  set locked(value: boolean) {
    this.toggleClass(this.pageWrapper, 'page__wrapper_locked', value)
  }
}