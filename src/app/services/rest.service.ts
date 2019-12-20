import {Injectable} from '@angular/core';
import {Wycieczka} from '../models/wycieczka.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from "./auth.service";
import {HttpClient} from '@angular/common/http';
import {fakeWycieczki} from '../data/fake.dane';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiBaseUrl = 'http://localhost:5001';
  tripsEndpoint = '/wycieczki';
  ordersEndpoint = '/orders';

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private http: HttpClient
  ) {
  }

  getAllTrips() {
    return this.http.get(`${this.apiBaseUrl}${this.tripsEndpoint}`);
  }

  deleteTrips() {
    return this.http.delete(`${this.apiBaseUrl}${this.tripsEndpoint}`);
  }

  getTrip(id) {
    return this.http.get(`${this.apiBaseUrl}${this.tripsEndpoint}/${id}`);
  }

  deleteTrip(trip) {
    return this.http.delete(`${this.apiBaseUrl}${this.tripsEndpoint}/${trip._id}`)
  }

  addTrip(trip: any) {
    return this.http.post(`${this.apiBaseUrl}${this.tripsEndpoint}`, trip).subscribe(resp => {
      console.log(resp);
    });
  }

  addRating(trip, newRating) {
    if (!('oceny' in trip)) {
      trip['oceny'] = [];
    }

    trip['oceny'].push({
      ratedBy: this.authService.getUser(),
      rating: newRating
    });

    this.updateTrip(trip);
  }

  updateTrip(tripToUpdate) {
    return this.http.put(`${this.apiBaseUrl}${this.tripsEndpoint}/${tripToUpdate._id}`, tripToUpdate).subscribe(resp => {
      console.log(resp);
    });
  }

  addOrder(order: any) {
    return this.http.post(`${this.apiBaseUrl}${this.ordersEndpoint}`, order).subscribe(resp => {
      console.log(resp);
    });
  }

  getAllOrders() {
    return this.http.get(`${this.apiBaseUrl}${this.ordersEndpoint}`);
  }
}
