import { ensureElement } from "../../utils/utils";
import { Component } from "./Component";
import { IEvents } from "./events";

interface IModalContent {
  content: HTMLElement
}

export class Modal extends Component<IModalContent> {
  protected events: IEvents;
  protected closeButton: HTMLButtonElement;
  protected _content: HTMLElement;
  
  constructor(container: HTMLElement, events: IEvents) {
    super(container)
    this.events = events;
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.closeButton.addEventListener('click', this.close.bind(this));
    this._content = ensureElement<HTMLElement>('.modal__content', this.container)
    this.container.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close()
      }
    })
  }
  
  set content(product: HTMLElement) {
    this._content.replaceChildren(product)
  }

  open() {
    this.toggleClass(this.container, 'modal_active', true);
    document.addEventListener('keyup', this.handleEscUp)
    this.events.emit('modal:open')
  }

  close() {
    this.toggleClass(this.container, 'modal_active', false)
    document.removeEventListener('keyup', this.handleEscUp)
    this.events.emit('modal:close')
  }

  handleEscUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  render(data: IModalContent) {
    super.render(data);
    this.open();
    return this.container
  }
}