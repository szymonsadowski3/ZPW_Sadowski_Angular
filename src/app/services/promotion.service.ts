import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PROMOTION_API_ENDPOINT, PROMOTION_API_URL} from '../const';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(private http: HttpClient) {
  }

  addPromotion(checkedTripsForPromotion, czasTrwania, poziomObnizki) {
    const objToPost = {
      checkedTripsForPromotion,
      czasTrwania,
      poziomObnizki
    };

    return this.http.post(`${PROMOTION_API_URL}${PROMOTION_API_ENDPOINT}`, objToPost).subscribe(resp => {
      console.log(resp);
    });
  }
}
