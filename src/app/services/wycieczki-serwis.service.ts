import {Injectable, OnInit} from '@angular/core';
import {Wycieczka} from '../models/wycieczka.model';
import {fakeWycieczki} from '../data/fake.dane';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WycieczkiSerwisService {

  wycieczki;

  constructor(private http: HttpClient) {
    this.fetchProducts();
  }

  fetchProducts() {
    const apiUrl = "api/data";
    return this.http.get(apiUrl);
  }

  getProduct(id: number) {
    const apiUrl = `api/data/${id}`;
    return this.http.get(apiUrl);
  }

  addProduct(product: Wycieczka) {
    this.wycieczki.push(product);
  }

  deleteProduct(product: Wycieczka) {
    this.wycieczki = this.wycieczki.filter(item => item !== product);
  }
}
