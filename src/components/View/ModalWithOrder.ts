import { TCustomerOderData } from "../../types";
import { ensureAllElements } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "../base/Form";

export class OrderPreview extends Form<TCustomerOderData> {
  protected paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this.paymentButtons = ensureAllElements('.button_alt', this.container);
    this.paymentButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.payment = button.name
        this.events.emit('order:paymentMethod', button)
      })
    })

    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      this.events.emit(`contacts:open`)
    })
  }

  set payment(name: string) {
    this.paymentButtons.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === name)
    })
  }

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value
  }

}