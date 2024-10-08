import { IProduct } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ProductBase } from '../base/ProductBase';


export class ProductCatalog extends ProductBase {
	protected productImage: HTMLImageElement;
	protected productCategory: HTMLElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this.productImage = ensureElement<HTMLImageElement>('.card__image', this.container);
		this.productCategory = ensureElement<HTMLElement>('.card__category', this.container);

		this.container.addEventListener('click', () => {
			this.events.emit('product:select', { id: this.productId });
		});
		
	}

	set image(image: string) {
		this.setImage(this.productImage, (CDN_URL + image));
	}

	protected categoryColor: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'другое': 'card__category_other',
		'дополнительное': 'card__category_additional',
		'кнопка': 'card__category_button',
		'хард-скил': 'card__category_hard',
	};

	set category(category: string) {
		this.setText(this.productCategory, category);
		const categoryClass = this.categoryColor[category];
		Object.values(this.categoryColor).forEach((className) => {
      this.productCategory.classList.remove(className)
    });
		if (this.productCategory) {
			this.toggleClass(this.productCategory, categoryClass, true);
		}
	}

}
