import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "./Component";
import { IEvents } from "./events";

interface IFormState {
  valid: boolean;
  errors: string[];
}

export class Form<T> extends Component<IFormState> {
  protected events: IEvents;
  protected _errors: HTMLElement;
  protected submitButton: HTMLButtonElement;
  protected paymentButtons: HTMLButtonElement[]

  constructor(protected container: HTMLFormElement, events: IEvents) {
    super(container);
    this.events = events;
    this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
    this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
    this.paymentButtons = ensureAllElements('.button_alt', this.container);

    this.container.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    })

    this.paymentButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const field = target.name as keyof T;
        const value = target.value;
        console.log(value)
        this.onInputChange(field, value);
        this.events.emit('order:payment')
      })
    })
  }

  set valid(value: boolean) {
    this.setDisabled(this.submitButton, !value)
  }

  set errors(value: string) {
    this.setText(this._errors, value)
  }

  onInputChange(field: keyof T, value: string) {
    this.events.emit(`${this.container.name}.${String(field)}:change`, {
      field, value
    })
  }

  render(state: Partial<T> & IFormState) {
    const {valid, errors, ...inputs} = state;
    super.render({valid, errors});
    Object.assign(this, inputs);
    return this.container
  }
}