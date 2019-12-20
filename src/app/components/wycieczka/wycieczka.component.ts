import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {IDKEY} from 'src/app/const';
import {getTripAverageRating} from '../../utils.module';

@Component({
  selector: 'wycieczka-component',
  styleUrls: ['./wycieczka.component.css'],
  templateUrl: 'wycieczka.component.html',
})
export class WycieczkaComponent {
  @Input() wycieczka: any;
  @Input() isCheapest: boolean;
  @Input() isMostExpensive: boolean;

  @Output() reservationChanged = new EventEmitter<string>();
  @Output() tripAddedToCart = new EventEmitter<any>();

  IDKEY = IDKEY;

  constructor(private firebaseService: FirebaseService) {}

  onClickPlusButton(item) {
    if (item.ileZarezerwowano < item.maxIloscMiejsc) {
      item.ileZarezerwowano += 1;
      console.log(`Zarezerwowano miejsce na wycieczkę ${item.nazwa}`);
    } else {
      console.log(`Max ilosc miejsc na wycieczkę ${item.nazwa} zostala osiagnieta`);
    }

    this.reservationChanged.emit('added');
  }

  onClickMinusButton(item) {
    if (item.ileZarezerwowano > 0) {
      item.ileZarezerwowano -= 1;
      console.log(`Zrezygnowano z miejsca na wycieczkę ${item.nazwa}`);
    } else {
      console.log(`Nie mozna zrezygnowac z wycieczki ${item.nazwa}`);
    }

    this.reservationChanged.emit('removed');
  }

  onTripAddedToCart(trip) {
    this.tripAddedToCart.emit(trip);
  }

  getTripAvgRating(item) {
    return getTripAverageRating(item);
  }
}
