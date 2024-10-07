import { IOrder, IOrderData, TCustomerOderData, TCustomerPrivateData } from "../../types";
import { IEvents } from "../base/events";

type formErrors = Partial<Record<keyof IOrder, string>>

export class OrderData implements IOrderData {
  protected _order: IOrder
  protected events: IEvents
  formErrors: formErrors = {}

  constructor(events: IEvents) {
    this.events = events
    this._order = {
      payment: '',
      address: '',
      phone: '',
      email: '',
    }
  }

  set payment(payment: string) {
    this._order.payment = payment
  }

  get order () {
    return this._order  
  }

  get payment() {
    return this._order.payment
  }

  setOrderField(field: keyof TCustomerOderData, value: string) {
    this._order[field] = value;
    this.validateOrder()
  }
  
  validateOrder() {
    const errors: typeof this.formErrors = {};
    if(!this._order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    if(!this._order.payment) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('orderForm:change', this.formErrors)
    return Object.keys(errors).length === 0;
  }

  setContactsField(field: keyof TCustomerPrivateData, value: string) {
    this._order[field] = value;
    this.validateContacts()
  }

  validateContacts() {
    const errors: typeof this.formErrors = {};
    if(!this._order.email) {
      errors.email = 'Необходимо указать email'
    }

    if(!this._order.phone) {
      errors.phone = 'Необходимо указать номер телефона'
    }
    this.formErrors = errors;
    this.events.emit('contactsForm:change', this.formErrors)
    return Object.keys(errors).length === 0
  }

  clearForm() {
    this._order = {
      payment: '',
      address: '',
      phone: '',
      email: '',
    };
  }
}