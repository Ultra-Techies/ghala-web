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

  allowedDispatch: boolean = false;

  loading: boolean = false;

  foundDispatch: boolean = false;

  modalRefDispatch: MdbModalRef<DispatchOrderComponent> | null = null;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private modalServiceDispatch: MdbModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
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
      dataRows: [],
    };
    this.getDeliveryNotes();
    this.getUserData();
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
          this.loading = false;
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

          this.foundDispatch = data.length > 0 ? true : false;
        },
        (error) => {
          this.loading = false;
          console.log(error);
          if (error.status === 403) {
            this.router.navigate(['/forbidden']);
          }
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

    this.modalRefDispatch.onClose.subscribe((message) => {
      //set successMessage if it's Dispatched Successfully!!
      if (message === 'Dispatched Successfully!') {
        this.successMessage = message;
        this.errorMessage = '';
      } else {
        this.successMessage = '';
        this.errorMessage = message;
      }

      //wait 2 seconds and then call getDeliveryNotes()
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
        this.getDeliveryNotes();
        this.selectedORders = [];
      }, 2000);
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

  getUserData() {
    this.http
      .get(Utils.BASE_URL + 'users/get/' + localStorage.getItem('userId'))
      .subscribe(
        (data) => {
          //if res['role'] is //"ADMIN","DISPATCH_ASSOCIATE","WH_ASSOCIATE" then they can dispatch
          if (
            data['role'] === 'ADMIN' ||
            data['role'] === 'DISPATCH_ASSOCIATE' ||
            data['role'] === 'WH_ASSOCIATE'
          ) {
            this.allowedDispatch = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
