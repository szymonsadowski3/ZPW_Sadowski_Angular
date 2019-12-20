import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Wycieczka} from '../../models/wycieczka.model';
import {WycieczkiSerwisService} from '../../services/wycieczki-serwis.service';
import {FirebaseService} from '../../services/firebase.service';
import {RestService} from '../../services/rest.service';
import {FileUploadService} from '../../services/file.upload.service';

@Component({
  selector: 'new-wycieczka-component',
  styleUrls: ['./new-wycieczka.component.css'],
  templateUrl: './new-wycieczka.html',
})
export class NewWycieczkaComponent implements OnInit {
  modelForm: FormGroup;

  constructor(private wycieczkiService: WycieczkiSerwisService, private firebaseService: FirebaseService, private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.modelForm = new FormGroup({
      nazwa: new FormControl('Dwutygodniowa wycieczka do Ukrainy'),
      docelowyKrajWycieczki: new FormControl('Ukraina'),
      dataRozpoczecia: new FormControl('2020-01-01'),
      dataZakonczenia: new FormControl('2020-01-14'),
      cenaJednostkowa: new FormControl(1000),
      maxIloscMiejsc: new FormControl(5),
      opis: new FormControl('Lorem Ipsum'),
      linkDoZdj: new FormControl('https://via.placeholder.com/100/09f/fff.png'),
    });

  }

  onSubmit(form): void {
    const newWycieczka = {
      ...form.value,
      ileZarezerwowano: 0,
      oceny: [],
      galleryImgs: this.fileUploadService.getFilenames(),
    };

    this.fileUploadService.reset();

    this.firebaseService.addTrip(newWycieczka);
  }
}
