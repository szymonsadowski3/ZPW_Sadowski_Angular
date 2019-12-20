import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ocena-component',
  styleUrls: ['./ocena.component.css'],
  templateUrl: './ocena.component.html',
})
export class OcenaComponent {
  @Output() ratingAdded = new EventEmitter<any>();
  @Input() readonly;

  onRate($event) {
      this.ratingAdded.emit($event.newValue);
  }
}
