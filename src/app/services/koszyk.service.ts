import {Injectable} from '@angular/core';
import {Wycieczka} from '../models/wycieczka.model';
import {FirebaseService} from './firebase.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {IDKEY} from "../const";

@Injectable({
  providedIn: 'root'
})
export class KoszykService {
  produkty;

  constructor(private firebaseService: FirebaseService, private spinner: NgxSpinnerService, private authService: AuthService, private router: Router) {
    this.produkty = [];
  }

  getProducts() {
    return this.produkty;
  }

  getTotal() {
    let sum = 0;

    for (const product of this.produkty) {
      sum += product.trip.cenaJednostkowa * product.count;
    }

    return sum;
  }

  addProduct(product: Wycieczka, preferredDate = new Date()) {
    console.dir(product);

    let foundProduct = this.produkty.filter(item => item.trip[IDKEY] === product[IDKEY]);

    if (foundProduct.length === 0) {
      this.produkty.push({trip: product, count: product.ileZarezerwowano, preferredDate}); // TODO: implement preferredDate
    } else {
      foundProduct[0].count += 1;
    }
  }

  deleteTrip(product: Wycieczka) {
    this.produkty = this.produkty.filter(item => item.trip != product);
  }

  submitOrder() {
    const orderToMake = {
      products: this.produkty,
      whoOrdered: this.authService.getUser(),
      creationDate: new Date().toISOString()
    };

    console.dir(orderToMake);

    const orderId = this.firebaseService.addOrder(orderToMake);

    this.router.navigate([`/after-order/${orderId}`]);

  }
}
