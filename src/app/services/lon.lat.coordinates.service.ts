import {Injectable} from '@angular/core';
import sample from 'lodash/sample';

@Injectable({
  providedIn: 'root'
})
export class LonLatCoordinatesService {
  lonLatCoordinates = {
    BELGIA: [4.402464, 51.219448],
    AUSTRIA: [16.373819, 48.208176],
    ANGLIA: [-0.127758, 51.507351],
    HISZPANIA: [-3.703790, 40.416775],
    EGIPT: [31.235291, 30.043489],
    NIGERIA: [3.379206, 6.524379],
    ROSJA: [37.617298, 55.755825]
  };


  getCoordinates(country) {
    const countryUpper = country.toUpperCase();
    return (countryUpper in this.lonLatCoordinates) ? this.lonLatCoordinates[countryUpper] : sample(this.lonLatCoordinates);
  }
}
