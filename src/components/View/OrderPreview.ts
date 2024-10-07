import { TCustomerOderData } from "../../types";
import { ensureAllElements } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "../base/Form";

export class OrderPreview extends Form<TCustomerOderData> {

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      this.events.emit(`contacts:open`)
    })
  }

  set payment(value: string) {
    this.paymentButtons.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.value === value)
    })
  }

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value
  }

}