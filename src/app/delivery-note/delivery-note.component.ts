import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from 'app/helpers/Utils';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.css'],
})
export class DeliveryNoteComponent implements OnInit {
  payload: any[] = [];
  totalValue: number;
  errorMessage: string = '';

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    public modalRef: MdbModalRef<DeliveryNoteComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.totalValue = Utils.formatAmount(this.totalDeliveryNoteValue());
  }

  createDeliveryNote() {
    if (this.payload.length > 0) {
      this.http
        .post(
          Utils.BASE_URL + 'deliverynotes',
          {
            route:
              'route-' +
              localStorage.getItem('assignedWarehouse') +
              '-' +
              Utils.getRandomString(4),
            orderIds: this.payload.map((order) => order[0]),
            deliveryWindow: this.payload[0][3],
            warehouseId: localStorage.getItem('assignedWarehouse'),
          },
          { headers: Utils.getHeaders() }
        )
        .subscribe(
          (data: any) => {
            //console.log(data);
            this.close();
            this.payload = [];
          },
          (err: any) => {
            this.errorMessage = err;
            this.close();
            console.log('Error: ', err);
          }
        );
    }
  }

  //loop through all orders and sum the price column this.payload[0][5] by converting string to number then adding them up
  totalDeliveryNoteValue() {
    let total = 0;
    for (let i = 0; i < this.payload.length; i++) {
      total += Utils.convertCurrencyToNumber(this.payload[i][5]);
    }
    return total;
  }

  close() {
    this.modalRef.close(this.errorMessage);
  }
}
