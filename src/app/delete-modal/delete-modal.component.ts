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
  warehouseId: any | null = null;
  warehouseName: string | null = null;
  warehouseLocation: string | null = null;

  constructor(
    private http: HttpClient,
    public modalRef: MdbModalRef<DeleteModalComponent>
  ) {}

  ngOnInit(): void {
    this.warehouseId = this.payload ? this.payload[0] : null;
    this.warehouseName = this.payload ? this.payload[1] : null;
    this.warehouseLocation = this.payload ? this.payload[2] : null;
  }

  close(message?: string) {
    this.modalRef.close(message);
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
}
