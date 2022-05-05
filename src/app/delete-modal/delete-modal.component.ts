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

  //warehouse payload
  warehouseId: any | null = null;
  warehouseName: string | null = null;
  warehouseLocation: string | null = null;

  //inventory payload

  constructor(
    private http: HttpClient,
    public modalRef: MdbModalRef<DeleteModalComponent>
  ) {}

  ngOnInit(): void {
    console.log('Delete modal payload: ' + this.typeofPayload);
    this.warehouseId = this.payload ? this.payload[0] : null;
    this.warehouseName = this.payload ? this.payload[1] : null;
    this.warehouseLocation = this.payload ? this.payload[2] : null;
  }

  close(message?: string) {
    this.modalRef.close(message);
  }

  deleteRecord() {
    if (this.typeofPayload === 'warehouse') {
      this.deleteWarehouse();
    } else if (this.typeofPayload === 'inventory') {
      this.deleteInventory();
    }
  }

  deleteWarehouse() {
    this.http
      .delete(Utils.BASE_URL + 'warehouse/' + this.warehouseId, {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.close('Warehouse deleted successfully');
        },
        (err: any) => {
          alert('Error: ' + err);
          this.close('Error: ' + err);
        }
      );
  }

  deleteInventory() {
    console.log('Delete inventory: ' + this.payload);
    // this.http
    //   .delete(Utils.BASE_URL + 'inventory/' + this.warehouseId, {
    //     headers: Utils.getHeaders(),
    //   })
    //   .subscribe(
    //     (data: any) => {
    //       console.log(data);
    //       this.close('Inventory deleted successfully');
    //     },
    //     (err: any) => {
    //       alert('Error: ' + err);
    //       this.close('Error: ' + err);
    //     }
    //   );
  }
}
