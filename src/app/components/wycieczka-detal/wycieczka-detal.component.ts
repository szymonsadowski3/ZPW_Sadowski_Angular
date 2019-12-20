import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WycieczkiSerwisService} from "../../services/wycieczki-serwis.service";
import {ActivatedRoute} from "@angular/router";
import {KoszykService} from "../../services/koszyk.service";
import {FirebaseService} from "../../services/firebase.service";
import {AuthService} from "../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {GALLERY_SERVE_URL, IDKEY} from '../../const';
import {LonLatCoordinatesService} from '../../services/lon.lat.coordinates.service';
import get from 'lodash/get';

declare var ol: any;

@Component({
  selector: 'wycieczka-detal-component',
  styleUrls: ['./wycieczka-detal.component.css'],
  templateUrl: 'wycieczka-detal.component.html',
})
export class WycieczkaDetalComponent implements OnInit {

  preferredDate: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  };

  didUserReserveTrip = false;
  wycieczkaId = null;

  wycieczka: any;
  ratings = [];
  alreadyRated;

  map;

  lon = 4.402464;
  lat = 51.219448;

  galleryOptions = [
    {
      width: '800px',
      height: '600px',
      thumbnailsColumns: 4,
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false
    }
  ];

  galleryImages = [
    {
      small: 'https://images.unsplash.com/photo-1550399504-8953e1a6ac87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80',
      medium: 'https://images.unsplash.com/photo-1550399504-8953e1a6ac87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      big: 'https://images.unsplash.com/photo-1550399504-8953e1a6ac87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80',
    },
    {
      small: 'https://images.unsplash.com/photo-1452784444945-3f422708fe5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80',
      medium: 'https://images.unsplash.com/photo-1452784444945-3f422708fe5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      big: 'https://images.unsplash.com/photo-1452784444945-3f422708fe5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80',
    },
    {
      small: 'https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80',
      medium: 'https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      big: 'https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80',
    },
  ];



  @Output() reservationChanged = new EventEmitter<string>();
  @Output() tripRemoved = new EventEmitter<any>();
  @Output() tripAddedToCart = new EventEmitter<any>();

  constructor(
    private wycieczkiService: WycieczkiSerwisService,
    private koszykService: KoszykService,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private coordinatesService: LonLatCoordinatesService,
  ) {
    this.wycieczka = this.getInitialBlankObject();
  }

  checkIfPersonReserveTrip(trip) {
    this.firebaseService.getAllOrders().subscribe((orders: any) => {
      const filteredOrders = orders.filter((order: any) => {
        if(order.products) {
          const tripsIds = order.products.map(product => product.trip[IDKEY]);
          return ("whoOrdered" in order) && (order.whoOrdered == this.authService.getUser()) && (tripsIds.includes(this.wycieczkaId));
        } else {
          return false;
        }
      });

      this.didUserReserveTrip = filteredOrders.length > 0;
    });
  }

  initializeMap() {
    const markerSource = new ol.source.Vector();

    const markerStyle = new ol.style.Style({
      image: new ol.style.Icon( ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        src: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/32/map-marker-icon.png'
      }))
    });

    const mapLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });

    this.map = new ol.Map({
      target: 'mapa',
      layers: [
        mapLayer,
        new ol.layer.Vector({
          source: markerSource,
          style: markerStyle,
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.lon, this.lat]),
        zoom: 8
      })
    });

    function addMarker(lon, lat) {
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326',
          'EPSG:3857')),
        name: 'Miejsce wycieczki',
        population: 4000,
      });

      markerSource.addFeature(iconFeature);
    }

    addMarker(this.lon, this.lat);
  }

  ngOnInit() {
    const wycieczkaId = this.route.snapshot.paramMap.get('id');
    this.wycieczkaId = wycieczkaId;
    this.spinner.show();
    this.firebaseService.getTrip(wycieczkaId).subscribe(response => {
      const lonLat = this.coordinatesService.getCoordinates(get(response, 'docelowyKrajWycieczki'));
      this.lon = lonLat[0];
      this.lat = lonLat[1];

      this.initializeMap();

      this.wycieczka = response;
      this.checkIfPersonReserveTrip(this.wycieczka);
      this.countRatings();
      this.alreadyRated = this.userAlreadyRated();

      if ('galleryImgs' in this.wycieczka) {
        this.galleryImages = this.wycieczka.galleryImgs.map(imageName => {
          return {
            small: `${GALLERY_SERVE_URL}/${imageName}`,
            medium: `${GALLERY_SERVE_URL}/${imageName}`,
            big: `${GALLERY_SERVE_URL}/${imageName}`,
          };
        });
      }

      this.spinner.hide();
    });
  }

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

  onTripRemoved(trip) {
    this.tripRemoved.emit(trip);
  }

  onTripAddedToCart(trip) {
    this.tripAddedToCart.emit(trip);
  }

  addRating(newRating) {
    this.firebaseService.addRating(this.wycieczka, newRating);
  }

  userAlreadyRated() {
    try {
      const ratedBy = this.wycieczka.oceny.map(ocena => ocena.ratedBy);
      return ratedBy.includes(this.authService.getUser());
    }
    catch(error) {
      return false;
    }
  }

  countRatings() {
    if(this.wycieczka.oceny) {
      const oceny = this.wycieczka.oceny.map(ocena => ocena.rating);


      this.ratings = ((oceny != undefined) && (oceny.length > 0)) ? Object.entries(oceny.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }

        return acc;
      }, {})): [];
    } else {
      return [];
    }
  }

  getInitialBlankObject() {
    return {
      id: 1,
      nazwa: "",
      docelowyKrajWycieczki: "",
      dataRozpoczecia: "",
      dataZakonczenia: "",
      cenaJednostkowa: 0,
      maxIloscMiejsc: 0,
      opis: "",
      linkDoZdj: "",
      ileZarezerwowano: 0,
      oceny: [],
    };
  }
}
