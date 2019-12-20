import {Component} from '@angular/core';
import {KoszykService} from '../../services/koszyk.service';

@Component({
  selector: 'koszyk-component',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css'],
})
export class KoszykComponent {
  koszykService: KoszykService;
  products = [];

  constructor(koszykService: KoszykService) {
    this.koszykService = koszykService;
    this.getProducts();
  }

  getProducts() {
    this.products = this.koszykService.getProducts();
  }

  getTotal() {
    return this.koszykService.getTotal();
  }

  onDeleteProduct(product) {
    this.koszykService.deleteTrip(product.trip);
    this.getProducts();
  }

  countChanged(event, product) {
    const newCount = parseInt(event.target.value);
    console.log(newCount);

    if(newCount >= 0) {
      product.count = parseInt(event.target.value);
    } else {
      event.stopPropagation();
    }
  }

  submitOrder() {
    this.koszykService.submitOrder();
  }
}
