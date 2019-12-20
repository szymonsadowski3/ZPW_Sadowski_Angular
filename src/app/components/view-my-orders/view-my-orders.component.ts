import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FirebaseService} from "../../services/firebase.service";
import {NgxSpinnerService} from "ngx-spinner";
import {IDKEY} from 'src/app/const';

@Component({
  selector: 'view-my-orders-component',
  templateUrl: './view-my-orders.component.html',
  styleUrls: ['./view-my-orders.component.css'],
})
export class ViewMyOrdersComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    // private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  orders = [];
  filteredOrders = [];

  IDKEY = IDKEY;

  ngOnInit() {
    this.spinner.show();
    this.firebaseService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
      this.getFilteredOrders();
      this.spinner.hide();
    });
  }

  getFilteredOrders() {
    this.filteredOrders = this.orders.filter((order) => {
      return ("whoOrdered" in order) && order.whoOrdered == this.authService.getUser();
    });
  }

  getTotal(produkty) {
    if (!produkty) {
      return 0;
    } else {
      let sum = 0;

      for (const product of produkty) {
        sum += product.trip.cenaJednostkowa * product.count;
      }

      return sum;
    }
  }
}
