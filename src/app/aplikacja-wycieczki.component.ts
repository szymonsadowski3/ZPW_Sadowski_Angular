import {Component} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {ToastrService} from 'ngx-toastr';
import isEqual from 'lodash/isEqual';
import forEach from 'lodash/forEach';

@Component({
  selector: 'aplikacja-wycieczki',
  templateUrl: './aplikacja-wycieczki.component.html',
  styleUrls: ['./aplikacja-wycieczki.component.css']
})
export class AplikacjaWycieczkiComponent {
  constructor(private socket: Socket,
              private toastr: ToastrService) {
    this.socket.on('message', (event) => {
      console.dir(event);
      console.log(isEqual(event.currentPromotions, {}));

      if (('currentPromotions' in event) && !isEqual(event.currentPromotions, {})) {
        let message = '';

        forEach(event.currentPromotions, (value, key) => {
          message += `<a href="/wycieczka/${key}">${key}</a>: ${value}%<br>`;
        });

        this.toastr.success(message, '🔥 Nowe promocje 🔥 Kliknij id aby sprawdzić 🔥', {
          positionClass: 'toast-bottom-right',
          enableHtml: true,
          disableTimeOut: true
        });
      } else if ('finishedPromotions' in event) {
        let message = '';

        event.finishedPromotions.forEach((value) => {
          message += `${value}<br>`;
        });

        this.toastr.error(message, 'Zakończyły się promocje', {positionClass: 'toast-bottom-right', enableHtml: true, disableTimeOut: true});
      } else if (isEqual(event.currentPromotions, {})) {
        this.toastr.clear();
        console.log('here');
        this.toastr.success('🔥 Bądź uważny! Nowe promocje pojawią się tutaj 🔥', '🔥 Polowanie na promocje', {
          positionClass: 'toast-bottom-right',
          enableHtml: true,
          disableTimeOut: true
        });
      }
    });
  }
}
