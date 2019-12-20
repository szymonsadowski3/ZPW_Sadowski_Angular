import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AplikacjaWycieczkiComponent} from './aplikacja-wycieczki.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {ListaWycieczekComponent} from './components/lista-wycieczek/lista-wycieczek.component';
import {WycieczkaComponent} from './components/wycieczka/wycieczka.component';
import {OcenaComponent} from './components/ocena/ocena.component';
import {RatingModule} from 'ng-starrating';
import {NewWycieczkaComponent} from './components/new-wycieczka/new-wycieczka.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import {WycieczkaDetalComponent} from "./components/wycieczka-detal/wycieczka-detal.component";
import {KoszykComponent} from './components/koszyk/koszyk.component';
import {AppRoutingModule} from './app-routing.module';
import {EquityFilterPipe} from "./pipes/equity-filter.pipe";
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {Angular2ImageGalleryModule} from "angular2-image-gallery";
import {AngularDateTimePickerModule} from "angular2-datetimepicker";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {HttpClientModule} from "@angular/common/http";
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {AfterOrderComponent} from './components/after-order/after-order.component';
import {ViewMyOrdersComponent} from "./components/view-my-orders/view-my-orders.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {EditWycieczkaComponent} from "./components/edit-wycieczka/edit-wycieczka.component";
import { Ng5SliderModule } from 'ng5-slider';
import { NgxFileDropModule } from 'ngx-file-drop';
import {DropFileComponent} from './components/drop-file-component/drop.file.component';
import {NgxGalleryModule} from 'ngx-gallery';
import { SocketIoModule } from 'ngx-socket-io';
import {SOCKET_IO_URL} from './const';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  providers: [
    {provide: 'Window', useValue: window}
  ],
  declarations: [
    AplikacjaWycieczkiComponent,
    HeaderComponent,
    ListaWycieczekComponent,
    WycieczkaComponent,
    OcenaComponent,
    NewWycieczkaComponent,
    KoszykComponent,
    EquityFilterPipe,
    WycieczkaDetalComponent,
    SignInComponent,
    AfterOrderComponent,
    ViewMyOrdersComponent,
    AdminPanelComponent,
    EditWycieczkaComponent,
    DropFileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    TooltipModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    Angular2ImageGalleryModule,
    AngularDateTimePickerModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgxSpinnerModule,
    AngularFireDatabaseModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    Ng5SliderModule,
    NgxFileDropModule,
    NgxGalleryModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      // maxOpened: 3,
      // autoDismiss: true
    }),
    SocketIoModule.forRoot({ url: SOCKET_IO_URL, options: {} }),
    NgxPaginationModule,
  ],
  bootstrap: [AplikacjaWycieczkiComponent]
})
export class AppModule {
}
