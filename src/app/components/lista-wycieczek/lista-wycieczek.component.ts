import {Component, OnInit} from '@angular/core';
import {KoszykService} from '../../services/koszyk.service';
import {WycieczkiSerwisService} from '../../services/wycieczki-serwis.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Wycieczka} from '../../models/wycieczka.model';
import {FirebaseService} from '../../services/firebase.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {IDKEY} from 'src/app/const';
import {RestService} from '../../services/rest.service';
import {average, getTripAverageRating} from '../../utils.module';
import {Socket} from 'ngx-socket-io';
import forEach from 'lodash/forEach';
import isEqual from 'lodash/isEqual';
import {ToastrService} from 'ngx-toastr';

@Component({
  styleUrls: ['./lista-wycieczek.component.css'],
  selector: 'lista-wycieczek-component',
  templateUrl: './lista-wycieczek.component.html',
})
export class ListaWycieczekComponent implements OnInit {
  filterForm: FormGroup;
  dropdownList = [];
  selectedItems;

  wycieczki;

  minPriceTrip: any;
  maxPriceTrip: any;
  sum = 0;

  IDKEY = IDKEY;

  priceRangeOptions = {
    floor: 0,
    ceil: 10000
  };

  tickOptions = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    showTicksValues: true
  };

  filterPriceMin = 1;
  filterPriceMax = 1;

  page: number = 1;

  specifiedItemsPerPage = 9;

  constructor(
    private koszykService: KoszykService,
              private wycieczkiService: WycieczkiSerwisService,
              private firebaseService: FirebaseService,
              private spinner: NgxSpinnerService,
              private socket: Socket,
              private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.spinner.show();
    this.firebaseService.getAllTrips().subscribe((products: Wycieczka[]) => {
      this.wycieczki = products;

      const countries = products.map(wycieczka => wycieczka.docelowyKrajWycieczki);
      const uniqCountries = [...new Set(countries)];
      this.dropdownList = uniqCountries.map((country, index) => {
        return {
          id: index,
          itemName: country
        };
      });

      this.findMinElement();
      this.findMaxElement();

      this.filterForm = new FormGroup({
        docelowyKrajWycieczki: new FormControl([]),
        priceMin: new FormControl(this.minPriceTrip.cenaJednostkowa),
        priceMax: new FormControl(this.maxPriceTrip.cenaJednostkowa),
        avgRating: new FormControl(4.0),
      });

      this.filterPriceMin = this.minPriceTrip.cenaJednostkowa;
      this.filterPriceMax = this.maxPriceTrip.cenaJednostkowa;

      this.priceRangeOptions.ceil = this.filterPriceMax;

      this.initializeSum();

      this.spinner.hide();
    });

    this.filterForm = this.getInitialFormGroup();

    this.selectedItems = [];
  }

  calculateSumOfReservedTrips(message) {
    console.log(message);

    this.sum = this.wycieczki.reduce((a, b) => {
      return a + b.ileZarezerwowano;
    }, 0);
  }

  addTripToCart(trip) {
    this.koszykService.addProduct(trip);
  }

  findMinElement() {
    this.minPriceTrip = this.wycieczki.reduce((prev, current) => {
      return (prev.cenaJednostkowa < current.cenaJednostkowa) ? prev : current
    });
  }

  findMaxElement() {
    this.maxPriceTrip = this.wycieczki.reduce((prev, current) => {
      return (prev.cenaJednostkowa > current.cenaJednostkowa) ? prev : current
    });
  }

  getFilteringCriteria() {
    const criteria = [];

    const searchedCountries = this.filterForm.get('docelowyKrajWycieczki').value.map(value => value.itemName.toLowerCase());

    const priceMin = this.filterForm.get('priceMin').value;
    const priceMax = this.filterForm.get('priceMax').value;
    const avgRating = this.filterForm.get('avgRating').value;

    if (searchedCountries && searchedCountries.length > 0) {
      const searchedCountryCriteria = ((item) => {
        return searchedCountries.includes(item['docelowyKrajWycieczki'].toLowerCase());
      });
      criteria.push(searchedCountryCriteria);
    }

    if ((priceMin != '') && (priceMax != '')) {
      const priceMinInt = parseInt(priceMin);
      const priceMaxInt = parseInt(priceMax);

      const priceCriteria = ((item) => {
        const isAboveBottom = item.cenaJednostkowa >= priceMinInt;
        const isBelowTop = item.cenaJednostkowa <= priceMaxInt;
        return isAboveBottom && isBelowTop;
      });
      criteria.push(priceCriteria);
    }

    if (avgRating != '') {
      const ratingCriteria = ((item) => {
        if (!item.oceny || item.oceny.length === 0) {
          return true;
        } else {
          return (!item.oceny || item.oceny.length === 0) || getTripAverageRating(item) >= avgRating;
        }
      });
      criteria.push(ratingCriteria);
    }

    return criteria;
  }

  private getInitialFormGroup() {
    return new FormGroup({
      docelowyKrajWycieczki: new FormControl([]),
      priceMin: new FormControl(0),
      priceMax: new FormControl(0),
      avgRating: new FormControl(4.0),
    });
  }

  refreshFormGroup() {
    this.filterForm.patchValue({
      priceMin: this.filterForm.get('priceMin').value,
      priceMax: this.filterForm.get('priceMax').value,
      avgRating: this.filterForm.get('avgRating').value
    });
  }

  private initializeSum() {
    let sum = 0;

    this.wycieczki.forEach(wycieczka => {
      sum += wycieczka.ileZarezerwowano;
    });

    this.sum = sum;
  }
}
