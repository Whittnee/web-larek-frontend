import { TCustomerPrivateData } from "../../types";
import { IEvents } from "../base/events";
import { Form } from "../base/Form";

export class ContactsPreview extends Form<TCustomerPrivateData> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events)
    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      this.events.emit(`success:open`)
    })
  }

  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value
  }
}