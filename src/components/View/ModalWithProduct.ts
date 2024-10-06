import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ProductCatalog } from "./ProductInCatalogView";


export class ProductPreview extends ProductCatalog {
  protected productDescription: HTMLElement;
  protected button: HTMLButtonElement;
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.productDescription = ensureElement<HTMLElement>('.card__text', this.container);
    this.button = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.button.addEventListener('click', (e) => {
      e.stopPropagation()
      this.events.emit('product:buy', { id: this.productId })
    })
  }

  set description(description: string) {
    this.setText(this.productDescription, description)
  }

  set price(price: number | null) {
    super.price = price;
  }

  updateButtonState(price: number | null, value: boolean) {
    if (value) {
        this.setDisabled(this.button, true);
        this.setText(this.button, "Уже в корзине");
    } else if (price === null) {
      this.setDisabled(this.button, true);
        this.setText(this.button, "Не продаётся");
    } else {
      this.setDisabled(this.button, false);
        this.setText(this.button, "В корзину");
    }
  }
}
