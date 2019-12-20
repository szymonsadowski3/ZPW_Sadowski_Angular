import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {WycieczkiSerwisService} from '../../services/wycieczki-serwis.service';
import {FirebaseService} from '../../services/firebase.service';
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {RestService} from "../../services/rest.service";
import {IDKEY} from "../../const";

@Component({
  selector: 'edit-wycieczka-component',
  styleUrls: ['./edit-wycieczka.component.css'],
  templateUrl: './edit-wycieczka.html',
})
export class EditWycieczkaComponent implements OnInit {
  modelForm: FormGroup;
  wycieczkaId;

  constructor(
    private wycieczkiService: WycieczkiSerwisService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    // INITIAL MODEL FORM
    this.modelForm = new FormGroup({
      nazwa: new FormControl(''),
      docelowyKrajWycieczki: new FormControl(''),
      dataRozpoczecia: new FormControl(''),
      dataZakonczenia: new FormControl(''),
      cenaJednostkowa: new FormControl(''),
      maxIloscMiejsc: new FormControl(''),
      opis: new FormControl(''),
      linkDoZdj: new FormControl(''),
    });
  }

  ngOnInit(): void {
      const wycieczkaId = this.route.snapshot.paramMap.get('id');
      this.wycieczkaId = wycieczkaId;
      this.spinner.show();
      this.firebaseService.getTrip(wycieczkaId).subscribe((wycieczka: any) => {
        this.modelForm = new FormGroup({
          nazwa: new FormControl(wycieczka.nazwa),
          docelowyKrajWycieczki: new FormControl(wycieczka.docelowyKrajWycieczki),
          dataRozpoczecia: new FormControl(wycieczka.dataRozpoczecia),
          dataZakonczenia: new FormControl(wycieczka.dataZakonczenia),
          cenaJednostkowa: new FormControl(wycieczka.cenaJednostkowa),
          maxIloscMiejsc: new FormControl(wycieczka.maxIloscMiejsc),
          opis: new FormControl(wycieczka.opis),
          linkDoZdj: new FormControl(wycieczka.linkDoZdj),
        });
        this.spinner.hide();
      });


  }

  onSubmit(form): void {
    const newWycieczka = {
      ...form.value,
      [IDKEY]: this.wycieczkaId
    };

    this.firebaseService.updateTrip(newWycieczka);
  }
}
