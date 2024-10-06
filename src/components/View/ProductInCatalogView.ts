import { IProduct } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';


export class ProductCatalog extends Component<IProduct> {
	protected events: IEvents;
	protected productId: string;
	protected productTitle: HTMLElement;
	protected productImage: HTMLImageElement;
	protected productCategory: HTMLElement;
	protected productPrice: HTMLElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;

		this.productTitle = ensureElement<HTMLElement>('.card__title', this.container);
		this.productImage = ensureElement<HTMLImageElement>('.card__image', this.container);
		this.productCategory = ensureElement<HTMLElement>('.card__category', this.container);
		this.productPrice = ensureElement<HTMLElement>('.card__price', this.container);

		this.container.addEventListener('click', () => {
			this.events.emit('product:select', { id: this.productId });
		});
		
	}

	set id(id: string) {
		this.productId = id;
	}

	set title(title: string) {
		this.setText(this.productTitle, title);
	}

	set image(image: string) {
		this.productImage.src = CDN_URL + image;
	}

	protected CategoryColor: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'другое': 'card__category_other',
		'дополнительное': 'card__category_additional',
		'кнопка': 'card__category_button',
		'хард-скил': 'card__category_hard',
	};

	set category(category: string) {
		this.setText(this.productCategory, category);
		const categoryClass = this.CategoryColor[category];
		Object.values(this.CategoryColor).forEach((className) => {
      this.productCategory.classList.remove(className)
    });
		if (this.productCategory) {
			this.toggleClass(this.productCategory, categoryClass, true);
		}
	}

	set price(price: number | null) {
		if (typeof price === 'number') {
			this.setText(this.productPrice, `${price.toLocaleString('ru-RU')} синапсов`);
		} else if (price === null) {
			this.setText(this.productPrice, `Бесценно`);
		}
	}

	get id() {
		return this.productId;
	}
}
