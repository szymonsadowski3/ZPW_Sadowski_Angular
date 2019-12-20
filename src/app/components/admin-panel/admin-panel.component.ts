import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {fakeWycieczki} from '../../data/fake.dane';
import {FirebaseService} from '../../services/firebase.service';
import {Wycieczka} from '../../models/wycieczka.model';
import {RestService} from '../../services/rest.service';
import {IDKEY, IS_REST} from 'src/app/const';
import {PromotionService} from '../../services/promotion.service';
import map from 'lodash/map';
import filter from 'lodash/filter';

@Component({
  selector: 'admin-panel-component',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private firebaseService: FirebaseService,
              private promotionService: PromotionService,) {
  }

  wycieczki = [];
  IDKEY = IDKEY;

  checkedTripsForPromotion = {};

  czasTrwania = 5;
  poziomObnizki = 5;

  ngOnInit() {
    this.refreshTrips();
  }

  addExampleTrips() {
    fakeWycieczki.forEach((wycieczka: any) => {
      this.firebaseService.addTrip(wycieczka);
    });
  }

  removeAllTrips() {
    this.firebaseService.deleteTrips();
  }

  refreshTrips() {
    this.spinner.show();
    this.firebaseService.getAllTrips().subscribe((products: Wycieczka[]) => {
      this.wycieczki = products;
      products.forEach(wycieczka => {
        this.checkedTripsForPromotion[wycieczka[IDKEY]] = false;
      });
      this.spinner.hide();
    });
  }

  removeTrip(wycieczka: any) {
    const observable = this.firebaseService.deleteTrip(wycieczka);
  }

  addPromotion() {
    const checkedTrips = filter(
      map(this.checkedTripsForPromotion, (value, key) => {
          return value ? key : null;
        }
      ), (val) => val !== null);

    console.dir(checkedTrips);

    this.promotionService.addPromotion(checkedTrips, this.czasTrwania, this.poziomObnizki);
  }
}
