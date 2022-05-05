import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DeleteOrdersmodalComponent } from 'app/delete-ordersmodal/delete-ordersmodal.component';
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
  modalRefDelete: MdbModalRef<DeleteOrdersmodalComponent> | null = null;

  constructor(
    private http: HttpClient,
    private modalServiceAddUpdate: MdbModalService,
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
      dataRows: [['', '', '', '', '', '']],
    };
    this.getOrders();
  }
  getOrders() {
    this.http
      .get(Utils.BASE_URL + 'orders', { headers: Utils.getHeaders() })
      .subscribe((data: any) => {
        console.log(data);
        (this.tableData1 = {
          headerRow: [
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
              orders.due,
              orders.customerName,
              Utils.capitalizeFirstLetter(orders.deliveryWindow),
              orders.items,
              orders.value,

              orders.status,
            ];
          }),
        }),
          (err: any) => {
            console.log('Error: ', err);
          };
      });
  }
  deleteInitiate(rowData: any) {
    this.openModal('delete', rowData);
  }
  openModal(message: string = 'none', payLoad: any = null) {
    //if message is add it will open the add modal if delete it will open the delete modal
    // if (message === 'add') {
    //   this.modalRefAddUpdate = this.modalServiceAddUpdate.open(
    //     AddupdateInventoryModalComponent,
    //     {
    //       modalClass: 'modal-dialog-centered',
    //     }
    //   );
    //   this.modalRefAddUpdate.onClose.subscribe(() => {
    //     this.getInventory();
    //   });
    // } else if (message === 'delete') {
    this.modalRefDelete = this.modalServiceDelete.open(
      DeleteOrdersmodalComponent,
      {
        modalClass: 'modal-dialog-centered',
        data: { payload: payLoad },
      }
    );
    this.modalRefDelete.onClose.subscribe(() => {
      this.getOrders;
    });
    //   } else if (message === 'update') {
    //     this.modalRefAddUpdate = this.modalServiceAddUpdate.open(
    //       AddupdateInventoryModalComponent,
    //       {
    //         modalClass: 'modal-dialog-centered',
    //         data: { payload: payLoad },
    //       }
    //     );
    //     this.modalRefAddUpdate.onClose.subscribe((message: any = '') => {
    //       this.getOrders();
    //     });
    //   } else {
    //     console.log('Something went wrong');
    //   }
    // }
  }
}
