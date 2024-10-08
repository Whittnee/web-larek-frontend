# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении

Товар

```
interface IProduct {
  id: string;
  description?: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

Заказ

```
interface IOrder {
  address: string;
  payment: string;
  email: string;
  phone: string;
  total: number;
  items: string[];
}
```

Работа с заказом

interface IOrderData {
  orderData: IOrder
}

Коллекция товаров 

```
interface IProductsData {
  products: IProduct[];
  getProductList(): IProduct[];
}
```

Корзина

```
interface IBasketData {
  products: IProduct[];
  addProduct(product: IProduct): void;
  removeProduct(productId: string): void;
  totalAmount(): number;
  clearBasket(): void;
  getBasketCount(): number;
  isEmpty(): boolean;
}
```

Методы для работы с данными покупателя

```
interface ICustomerData {
  customer: ICustomer
  getOrder(): ICustomer
}
```

Данные покупателя, использумые в форме при оформлении заказа

```
type TCustomerOderData = Pick<IOrder, 'paymentMethod' | 'deliveryAddress'>;
```

```
type TCustomerPrivateData = Pick<IOrder, 'emailAddress' | 'phoneNumber'>
```

Основые данные товара, используемые в корзине

```
type TProductMainData = Pick<IProduct, 'id' | 'title' | 'price'> & {
  index: number;
}
```

## Архитектура приложения

Код приложения разделён на слои согласно парадигме MVP:
- слой данных, отвечает за хранение и изменение данных,
- слой представления, отвечает за отображение данных на странице,
- презентер, отвечает за связь представления и данных

### Базовый код

#### Класс Api
Предназначен для взаимодействия с REST API.\
Он позваляет отправить HHTP-запрос с поддержкой методов `GET` и `POST` по умолчанию, но при желании метод `POST` можно переопределить на `PUT` и `DELETE` при помощи передачи третьего аргумента при вызове.

#### Класс EventEmitter 
Предоставляет систему для регистрации, управления и вызова событий в приложении. Это позволяет добавлять слушателей событий (подписчиков) на определённые события и затем вызывать эти события с передачей данных (если нужно).\
Возможности:
- `on` - подписывается на событие
- `emit` - инициализирует событие
- `trigger` - возвращает функцию, которая может генерировать событие с заранее заданным контекстом

### Слой данных

#### Класс ProductsData
Класс отвечает за хранение и логику работы с данными товаров.\
В полях класса содержатся следующие данные:
- _products: IProduct[] - массив объектов товаров
- events: IEvents - экземпляр класса `EventEmiter` для инициализаций событий при изменении данных.

Также класс предоставляет набор методов для взаимодействия с этими данными:
- getProduct(productId: string): IProduct - возвращает ID товара

#### Класс OrderData
Класс отвечает за хранение и логику работы с данными заказа.\
В полях класса содержатся следующие данные:
- orderData: IOrder - данные заказа
- events: IEvents - экземпляр класса `EventEmiter` для инициализаций событий при изменении данных.

Также класс предоставляет набор методов для взаимодействия с этими данными:
- setOrderField() - присваивает значение из полей формы заказа
- validateOrder() - проверяет поля формы заказа
- setContactsField - присваивает значение значение из полей формы контактов
- validateContacts() - проверяет поля формы контактов 

#### Класс BasketData 
Класс отвечает за хранение и логику работы с данными товаров в корзине.\
В полях класса содержатся следующие данные:
- products: IProduct[] - хранит массив объектов товара в корзине
- events: IEvents - экземпляр класса `EventEmiter` для инициализаций событий при изменении данных.

Также класс предоставляет набор методов для взаимодействия с этими данными:
- addProduct(product: IProduct): - добавляет один товар в корзину
- removeProduct(productId: string): - удаляет один товар из корзины
- totalAmount(): number - возвращает полную стоимость покупки
- clearBasket(): void - полностью очищает корзину
- isEmpty(): boolean - проверяет корзину на наличие заказов
- inBasket(productId: string): boolean - проверяет товары на их наличие в корзине

### Слой представления

#### Класс Component
Класс представляет собой дженерик и является родительским классом для всех компонентов слоя представления. В качестве параметра дженерика он принимает тип объекта, который будет передан в метод render для отображения данных в компоненте. Конструктор принимает элемент разметки, который служит основным контейнером для компонента. Метод render отвечает за сохранение данных, переданных в качестве параметра, в полях компонента с использованием сеттеров и возвращает обновленный контейнер компонента.

Методы:
- toggleClass(element: HTMLElement, className: string, force?: boolean) - переключает класс
- setDisabled(element: HTMLElement, state: boolean) - сменяет статус блокировки
- setImage(element: HTMLImageElement, src: string, alt?: string) - устанавливает изображение 
- render(data?: Partial<T>): HTMLElement - возвращает полностью заполненный компонент

#### Класс ProductBase 
Отвечает за содержание основных полей класса, является базовым классом для всех продуктов.\
- constructor(container: HTMLElement, events: Ievents) - конструктор принимает шаблон карточки товара и экземпляр класса `EventEmitter` для инициализаций событий.\

Поля:
- productId: string;
- productPrice: HTMLElement;
- productTitle: HTMLElement;

#### Класс ProductCatalog
Отвечает за отображение карточки товара на главной странице, наследует класс ProductBase.\
- constructor(container: HTMLElement, events: Ievents) - конструктор принимает шаблон карточки товара и экземпляр класса `EventEmitter` для инициализаций событий.\

Поля: 
- productImage: - картинка товара
- productCategory: - категория товара

#### Класс Modal
Реализует модальное окно со всеми базовыми свойствами и методами.\
Содержит `open` и `close` методы для взаимодействия с модальным окном.\
Устанавливает слушатели на клавиатуру, для закрытия модального окна с помощь Esc, на клик по оверлею и кнопку-крестик для закрытия модального окна.
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает необходимый элемент модального окна и экземпляр класса `EventEmitter` для инициализаций событий.

Поля:
- container: HTMLElement - элемент модального окна
- _content: HTMLElement - элемент, который нужно отобразить в модальном окне 
- closeButton: HTMLButtonElement - кнопка закрытия модального окна

#### Класс ProductPreview
Отвечает за отображение товара в модальном окне, наследует класс ProductCatalog.
- constructor(container: HTMLElement, events: Ievents) - конструктор принимает шаблон товара с его подробным описанием и экземпляр класса `EventEmitter` для инициализаций событий.\

Поля:
- productDescription: HTMLElement - описание товара
- button: HTMLButtonElement - кнопка добавления товара в корзину 

Методы:
- updateBuyButton(price: number | null) - изменяет активность кнопки покупки

#### Класс BasketPreview
Отвечает за отображение корзины в модальном окне.
- constructor(container: HTMLElement, events: Ievents) - конструктор принимает шаблон корзины и экземпляр класса `EventEmitter` для инициализаций событий.\


Поля:
- total: number - полная стоимость корзины
- button: HTMLButtonElement - кнопка подтверждения
- content: HTMLElement[] - отображение товаров в корзине
- isEmpty: boolean - отображение пустой корзины

#### Класс ProductBasket 
Отвечает за отображение товара в корзине, наследует класс ProductBase.
- constructor(container: HTMLElement, events: Ievents) - конструктор принимает шаблон товара, который находится в корзине и экземпляр класса `EventEmitter` для инициализаций событий.\

Поля:
- button: HTMLButtonElement - кнопка удаления товара
- _index: HTMLElement - индекс товара

#### Класс Form
Отвечает за работу полей ввода формы, является базовым классом для всех форм.
- constructor(container: HTMLElement, events: Ievents) - конструктор принимает шаблон формы и экземпляр класса `EventEmitter` для инициализаций событий.\

Поля:
- _errors: HTMLElement - ошибки полей ввода
- submitButton: HTMLButtonElement - кнопка подтверждения 

Методы:
- set valid(value: boolean) - устанавливает валидность кнопки подтверждения
- set errors(value: string) - устанавливает ошибки
- onInputChange(field: keyof T, value: string) - берёт значение из полей ввода форм
- render(state: Partial<T> & IFormState) - показывает ошибки

#### Класса OrderPreview 
Отвечает за отображение формы заказа с полями ввода в модальном окне, наследует класс Form.
- constructor(container: HTMLElement, events: Ievents) - конструктор принимает шаблон формы заказа и экземпляр класса `EventEmitter` для инициализаций событий.\

Поля: 
- paymentButtons: HTMLButtonElement[] - выбор оплаты

Методы:
- set payment(name: string) - способ оплаты
- set address(value: string) - адрес доставки

#### Класса ContactsPreview 
Отвечает за отображение формы контактов с полями ввода в модальном окне, наследует класс Form.
- constructor(container: HTMLElement, events: Ievents) - конструктор принимает шаблон формы контактов и экземпляр класса `EventEmitter` для инициализаций событий.\

Методы:
- set email(value: string) - электронная почта 
- set phone(value: string) - номер телефона

#### Класс SucсessPreview
Отвечает за отображение окна успешной покупки в модальном окне. 
- constructor(container: HTMLElement, events: Ievents) - конструктор принимает шаблон успешной покупки и экземпляр класса `EventEmitter` для инициализаций событий.\

Поля:
- total: HTMLElement - полная стоимость покупки 

#### Класс Page
Отвечает за отображение товаров на главной странице и счётчика товаров в корзине
Конструктор принимает контейнер, куда будут выводиться товары и экземпляр класса `EventEmitter` для инициализаций событий.

Поля:
- basketButton: HTMLButtonElement - кнопка, которая открывает модальное окно с корзиной
- _basketCounter: HTMLElement - счётчик товаров в корзине
- pageWrapper: HTMLElement - элемент, для взаимодействия с методом locked

Методы:
- set content(items: HTMLElement[]) - выводит товары в контейнер
- set basketCounter(value: number) - устанавливает счётчик товаров 
- set locked(value: boolean) - останавливает прокрутку страницы, когда открыто модальное окно 


### Слой коммуникации 

## Presenter
Код, описывающий взаимодействия данных и представления между собой находится в файле `index.ts`.
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в index.ts
В index.ts сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*
- `initialData:loaded` - загрузка товаров с сервера
- `basket:changed` - изменение массива товаров в корзине

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `basket:open` - открытие модального окна корзины
- `product:select` - открытие модального окна товара
- `product:buy` - добавление товара в корзину
- `order:place` - открытие модального окна с формой заказа
- `order:payment` - способ оплаты
- `orderForm:change` - изменение данных в форме полей заказа
- `contacts:open` - открытие модального окна с формой контактов
- `contactsForm:change` - изменение данных в форме полей контактов
- `success:open` - открытие модального окна успешной покупки
- `modal:open` - открытие модального окна
- `modal:close` - закрытие модального окна

## Автор

- Github - [Whittnee.](https://github.com/Whittnee)
