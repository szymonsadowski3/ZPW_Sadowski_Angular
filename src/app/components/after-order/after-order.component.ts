import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'after-order-component',
  templateUrl: './after-order.component.html',
  styleUrls: ['./after-order.component.css'],
})
export class AfterOrderComponent implements OnInit {
  orderId;

  constructor(private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.orderId = orderId;
  }
}
