import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from 'app/helpers/Utils';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DispatchOrderComponent } from 'app/dispatch-order/dispatch-order.component';
import { Router } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css'],
})
export class DispatchComponent implements OnInit {
  public tableData1: TableData;

  public selectedORders: any = [];

  modalRefDispatch: MdbModalRef<DispatchOrderComponent> | null = null;

  constructor(
    private http: HttpClient,
    private modalServiceDispatch: MdbModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: [
        '',
        'ID',
        'Route',
        'Orders',
        'Delivery Window',
        'Reference',
        'Status',
      ],
      dataRows: [['', '', '', '', '', '', '']],
    };
    this.getDeliveryNotes();

    //get refresh token everytime page loads
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      'Bearer ' + Utils.getUserData('refresh_token')
    );

    this.http
      .get(Utils.LOGIN_URL + 'refreshtoken', {
        headers: headers,
      })
      .subscribe(
        (data) => {
          Utils.saveUserData('refresh_token', data['refresh_token']);
          Utils.saveUserData('access_token', data['access_token']);
        },
        (error) => {
          console.log(error);
          localStorage.clear();
          this.router.navigate(['/']);
        }
      );
  }

  getDeliveryNotes() {
    this.http
      .get(
        Utils.BASE_URL + 'deliverynotes/wh/' + Utils.getAssignedWarehouse(),
        {
          headers: Utils.getHeaders(),
        }
      )
      .subscribe(
        (data: any) => {
          //console.log(data);
          this.tableData1 = {
            headerRow: [
              '',
              'ID',
              'Route',
              'Orders',
              'Delivery Window',
              'Reference',
              'Status',
            ],
            dataRows: data.map((note) => {
              return [
                note.id,
                note.route,
                note.orders.length,
                note.deliveryWindow,
                note.noteCode,
                note.status,
              ];
            }),
          };
        },
        (error) => {
          console.log(error);
        }
      );
  }

  openModal() {
    this.modalRefDispatch = this.modalServiceDispatch.open(
      DispatchOrderComponent,
      {
        modalClass: 'modal-dialog-centered',
        data: { payload: this.selectedORders },
      }
    );

    this.modalRefDispatch.onClose.subscribe(() => {
      this.getDeliveryNotes();
      this.selectedORders = [];
    });
  }

  selected(row: any) {
    if (this.selectedORders.includes(row)) {
      this.selectedORders = this.selectedORders.filter(
        (order) => order.id !== row.id
      );
    } else {
      this.selectedORders.push(row);
    }
    //console.log('Selected Order: ' + this.selectedORders);
  }
}
