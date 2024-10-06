import { IOrder, IOrderData, TCustomerOderData, TCustomerPrivateData } from "../../types";
import { IEvents } from "../base/events";

type formErrors = Partial<Record<keyof IOrder, string>>

export class FormData implements IOrderData {
  protected _orderData: IOrder
  protected events: IEvents
  formErrors: formErrors = {}

  constructor(events: IEvents) {
    this.events = events
    this._orderData = {
      payment: '',
      address: '',
      phone: '',
      email: '',
      items: [],
      total: 0
    }
  }
  
  get orderData () {
    return this._orderData  
  }

  setOrderField(field: keyof TCustomerOderData, value: string) {
    this._orderData[field] = value;
    console.log(this._orderData)
    
    if(this.validateOrder()) {
      return
    }
    
  }
  
  validateOrder() {
    const errors: typeof this.formErrors = {};
    if(!this._orderData.address) {
      errors.address = 'Необходимо указать адрес';
    }
    if(!this._orderData.payment) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('orderForm:change', this.formErrors)
    return Object.keys(errors).length === 0;
  }

  setContactsField(field: keyof TCustomerPrivateData, value: string) {
    this._orderData[field] = value;

    if(this.validateContacts()) {
      return
    }
  }

  validateContacts() {
    const errors: typeof this.formErrors = {};
    if(!this._orderData.email) {
      errors.email = 'Необходимо указать email'
    }

    if(!this._orderData.phone) {
      errors.phone = 'Необходимо указать номер телефона'
    }
    this.formErrors = errors;
    this.events.emit('contactsForm:change', this.formErrors)
    return Object.keys(errors).length === 0
  }

  clearForm() {
    this._orderData = {
      payment: '',
      address: '',
      phone: '',
      email: '',
      items: [],
      total: 0
    };
  }
}