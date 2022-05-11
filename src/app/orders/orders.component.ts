import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  public tableData2: TableData;
  public selectedORders: any = [];

  modalRefCreateDN: MdbModalRef<DeliveryNoteComponent> | null = null;

  constructor(
    private http: HttpClient,
    private modalServiceCreateDN: MdbModalService,
    private modalServiceDelete: MdbModalService
  ) {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: [
        'ID',
        'Delivery Date',
        'Customer',
        'Items',
        'Price',
        'Status',
      ],
      dataRows: [['', '', '', '', '', '', '']],
    };
    this.getOrders();
  }
  getOrders() {
    this.http
      .get(
        Utils.BASE_URL +
          'warehouseorders/' +
          localStorage.getItem('assignedWarehouse'),
        { headers: Utils.getHeaders() }
      )
      .subscribe((data: any) => {
        console.log(data);
        (this.tableData1 = {
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
        }),
          (err: any) => {
            console.log('Error: ', err);
          };
      });
  }
  deleteInitiate(rowData: any) {
    this.modalRefCreateDN = this.modalServiceDelete.open(DeleteModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: { payload: rowData, typeofPayload: 'order' },
    });
    this.modalRefCreateDN.onClose.subscribe(() => {
      this.getOrders();
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
    console.log('Selected Order: ' + this.selectedORders);
  }

  openModal() {
    this.modalRefCreateDN = this.modalServiceCreateDN.open(
      DeliveryNoteComponent,
      {
        modalClass: 'modal-dialog-centered',
        data: { payload: this.selectedORders },
      }
    );
    this.modalRefCreateDN.onClose.subscribe(() => {
      this.getOrders();
      this.selectedORders = [];
    });
  }
}
