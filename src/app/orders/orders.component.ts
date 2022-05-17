import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'app/delete-modal/delete-modal.component';
import { DeliveryNoteComponent } from 'app/delivery-note/delivery-note.component';
import Utils from 'app/helpers/Utils';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public tableData1: TableData;
  public selectedORders: any = [];
  editAllowed: boolean = false;
  createDeliverNote: boolean = false;
  loading: boolean = false;
  foundOrders: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  modalRefCreateDN: MdbModalRef<DeliveryNoteComponent> | null = null;

  constructor(
    private http: HttpClient,
    private modalServiceCreateDN: MdbModalService,
    private modalServiceDelete: MdbModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.tableData1 = {
      headerRow: [
        'ID',
        'Delivery Date',
        'Customer',
        'Items',
        'Price',
        'Status',
      ],
      dataRows: [],
    };
    this.getOrders();

    this.getUserData();
  }
  getOrders() {
    this.selectedORders = [];
    this.http
      .get(Utils.BASE_URL + 'order/wh/' + Utils.getAssignedWarehouse(), {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.tableData1 = {
            headerRow: [
              '',
              'ID',
              'Delivery Date',
              'Customer',
              'Delivery Window',
              'Items',
              'Price',
              'Status',
            ],
            dataRows: data.map((orders) => {
              return [
                orders.id,
                Utils.formatDate(orders.due),
                orders.customerName,
                Utils.capitalizeFirstLetter(orders.deliveryWindow),
                orders.items.length,
                Utils.formatAmount(orders.value),
                Utils.capitalizeFirstLetter(orders.status),
              ];
            }),
          };
          this.foundOrders = data.length > 0 ? true : false;
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

  getUserData() {
    this.http
      .get(Utils.BASE_URL + 'users/get/' + localStorage.getItem('userId'))
      .subscribe(
        (data) => {
          Utils.saveUserData('assignedWarehouse', data['assignedWarehouse']);
          Utils.saveUserData('userId', data['id']);
          if (data['assignedWarehouse'] === null) {
            console.log('No warehouse assigned');
          } else {
            this.getOrders();
          }

          //if res['role'] is not ADMIN then set editAllowed to false else set it to true
          if (data['role'] !== 'ADMIN') {
            this.editAllowed = false;
          } else {
            this.editAllowed = true;
          }

          //if role belongs to any of the following then they should be able to creat delivery note: "ADMIN","DISPATCH_ASSOCIATE","WH_ASSOCIATE"

          if (
            data['role'] === 'ADMIN' ||
            data['role'] === 'DISPATCH_ASSOCIATE' ||
            data['role'] === 'WH_ASSOCIATE' ||
            data['role'] === 'WH_MANAGER'
          ) {
            this.createDeliverNote = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteInitiate(rowData: any) {
    this.modalRefCreateDN = this.modalServiceDelete.open(DeleteModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: { payload: rowData, typeofPayload: 'order' },
    });
    this.modalRefCreateDN.onClose.subscribe((message) => {
      //set successMessage if it's Deleted Successfully!
      if (message === 'Order deleted successfully!') {
        this.successMessage = message;
        this.errorMessage = '';
      } else {
        this.successMessage = '';
        this.errorMessage = message;
      }

      //wait 3 seconds and then call getOrders()
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
        this.getOrders();
      }, 3000);
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
  }

  openModal() {
    this.modalRefCreateDN = this.modalServiceCreateDN.open(
      DeliveryNoteComponent,
      {
        modalClass: 'modal-dialog-centered',
        data: { payload: this.selectedORders },
      }
    );

    this.modalRefCreateDN.onClose.subscribe((message) => {
      this.selectedORders = [];

      //set successMessage if it's Created Successfully!
      if (message === 'Created Successfully!') {
        this.successMessage = message;
        this.errorMessage = '';
      } else {
        this.successMessage = '';
        this.errorMessage = message;
      }

      //wait 3 seconds and then call getOrders()
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
        this.getOrders();
      }, 3000);
    });
  }
}
