import { AppApi } from './components/model/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/base/Modal';
import { ProductCatalog } from './components/view/ProductCatalog';
import { Page } from './components/view/Page';
import { ProductsData } from './components/model/ProductsData';
import './scss/styles.scss';
import { IApi, IProduct, TCustomerOderData, TCustomerPrivateData } from './types';
import { API_ORIGIN, API_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductPreview } from './components/view/ProductPreview';
import { BasketPreview } from './components/view/BasketPreview';
import { BasketData } from './components/model/BasketData';
import { ProductBasket } from './components/view/ProductBasket';
import { OrderPreview } from './components/view/OrderPreview';
import { OrderData } from './components/model/OrderData';
import { ContactsPreview } from './components/view/ContactsPreview';
import { SucсessPreview } from './components/view/SucсessPreview';

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const productsData = new ProductsData(events);
const basketData = new BasketData(events)
const orderData = new OrderData(events)

const page = new Page(ensureElement<HTMLElement>('.gallery'), events);
const productPreview = new ProductPreview(cloneTemplate('#card-preview'), events);
const basketPreview = new BasketPreview(cloneTemplate('#basket'), events);
const orderPreview = new OrderPreview(cloneTemplate('#order'), events);
const contactsPreview = new ContactsPreview(cloneTemplate('#contacts'), events);
const sucsessPreview = new SucсessPreview(cloneTemplate('#success'), events);

api.getProducts()
  .then((initialProducts) => {
    productsData.products = initialProducts;
  })
  .catch((err) => {
    console.log(err);
  })

events.on('initialData:loaded', () => {
  const productsArr = productsData.products.map(item => {
    const productInstant = new ProductCatalog(cloneTemplate('#card-catalog'), events);
    return productInstant.render(item);
  })
  
  page.render({ content: productsArr })
});

events.on('product:select', (data: { id: string }) => {
  const product: IProduct = productsData.getProduct(data.id);
  const inBasket = basketData.inBasket(product.id);
  const price = product.price;
  productPreview.updateButtonState(price, inBasket)
  modal.render({ content: productPreview.render(product)})
});

events.on('product:buy', (data: {id: string}) => {
  basketData.addProduct(productsData.getProduct(data.id))
  modal.close();
});

events.on('basket:changed', () => {
  const productsArr = basketData.products.map((item, index) => {
    const productInstant = new ProductBasket(cloneTemplate('#card-basket'), events)
    return productInstant.render({...item, index: index + 1});
  })

  basketPreview.render({ content: productsArr, total: basketData.totalAmount(), isEmpty: basketData.isEmpty()});
  page.render({ basketCounter: basketData.getBasketCount()});
})

events.on('basket:open', () => {
  modal.render({ content: basketPreview.render({ isEmpty: basketData.isEmpty() })})
});

events.on('productInBasket:delete', (data: {id: string}) => {
  basketData.removeProduct(data.id)
})

events.on('order:place', () => {
  modal.render({ content: orderPreview.render({ payment: '', address: '', valid: false, errors: []})})
})


events.on(/^order\..*:change/, (data: {field: keyof TCustomerOderData, value: string}) => {
  orderData.setOrderField(data.field, data.value)
})

events.on('order:payment', () => {
  orderPreview.payment = orderData.payment
})

events.on('orderForm:change', (errors: Partial<TCustomerOderData>) => {
  const { payment, address} = errors;
  orderPreview.valid = !payment && !address;
  orderPreview.errors = Object.values({ payment, address }).filter(i => !!i).join('; ')
})

events.on('contacts:open', () => {
  modal.render({ content: contactsPreview.render({ phone: '', email: '', valid: false, errors: []})})
})

events.on(/^contacts\..*:change/, (data: {field: keyof TCustomerPrivateData, value: string}) => {
  orderData.setContactsField(data.field, data.value)
})

events.on('contactsForm:change', (errors: Partial<TCustomerPrivateData>) => {
  const { phone, email} = errors;
  contactsPreview.valid = !phone && !email;
  contactsPreview.errors = Object.values({ phone, email }).filter(i => !!i).join('; ')
})

events.on('success:open', () => {
  console.log(orderData.order, basketData.products.map(item => item.id), basketData.totalAmount())
  api.placeOrder({
    ...orderData.order,
    items: basketData.products.map(item => item.id),
    total: basketData.totalAmount()
  })
    .then((data) => {
      modal.render({ content: sucsessPreview.render({ total: data.total})})
      basketData.clearBasket();
      orderData.clearForm();
    })

    .catch((err) => {
      console.log(err)
    })
})

events.on('success:close', () => {
  modal.close()
})

events.on('modal:open', () => {
  page.locked = true
})

events.on('modal:close', () => {
  page.locked = false
  orderData.clearForm()
})
