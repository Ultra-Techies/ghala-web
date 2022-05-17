import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { HttpClient } from '@angular/common/http';
import Utils from 'app/helpers/Utils';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent implements OnInit {
  payload: string | null = null;
  typeofPayload: string | null = null;
  modalTitle: string | null = null;

  //warehouse payload
  warehouseId: any | null = null;
  warehouseName: string | null = null;
  warehouseLocation: string | null = null;

  //inventory payload
  inventoryId: any | null = null;
  inventoryName: string | null = null;

  //order payload
  orderId: any | null = null;
  orderName: string | null = null;

  constructor(
    private http: HttpClient,
    public modalRef: MdbModalRef<DeleteModalComponent>
  ) {}

  ngOnInit(): void {
    this.modalTitle = Utils.capitalizeFirstLetter(this.typeofPayload);
    if (this.typeofPayload === 'warehouse') {
      this.warehouseId = this.payload ? this.payload[0] : null;
      this.warehouseName = this.payload ? this.payload[1] : null;
      this.warehouseLocation = this.payload ? this.payload[2] : null;
    } else if (this.typeofPayload === 'inventory') {
      this.inventoryId = this.payload ? this.payload[0] : null;
      this.inventoryName = this.payload ? this.payload[1] : null;
    } else if (this.typeofPayload === 'order') {
      this.orderId = this.payload ? this.payload[0] : null;
      this.orderName = this.payload ? this.payload[2] : null;
    }
  }

  close(message?: string) {
    this.modalRef.close(message);
  }

  deleteRecord() {
    if (this.typeofPayload === 'warehouse') {
      this.deleteWarehouse();
    } else if (this.typeofPayload === 'inventory') {
      this.deleteInventory();
    } else if (this.typeofPayload === 'order') {
      this.deleteOrder();
    }
  }

  deleteWarehouse() {
    this.http
      .delete(Utils.BASE_URL + 'warehouse/' + this.warehouseId, {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          //console.log(data);
          this.close('Warehouse deleted successfully!');
        },
        (err: any) => {
          console.log(err);
          this.close('Error: ' + err);
        }
      );
  }

  deleteInventory() {
    this.http
      .delete(Utils.BASE_URL + 'inventory/' + this.inventoryId, {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          //console.log(data);
          this.close('Deleted Successfully!');
        },
        (err: any) => {
          console.log(err);
          this.close('Error: ' + err);
        }
      );
  }

  deleteOrder() {
    this.http
      .delete(Utils.BASE_URL + 'order/' + this.orderId, {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          //console.log(data);
          this.close('Order deleted successfully!');
        },
        (err: any) => {
          console.log(err);
          this.close('Error: ' + err);
        }
      );
  }
}
