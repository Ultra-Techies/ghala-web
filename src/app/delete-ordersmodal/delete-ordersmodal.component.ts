import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DeleteModalComponent } from 'app/delete-modal/delete-modal.component';
import Utils from 'app/helpers/Utils';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-delete-ordersmodal',
  templateUrl: './delete-ordersmodal.component.html',
  styleUrls: ['./delete-ordersmodal.component.css'],
})
export class DeleteOrdersmodalComponent implements OnInit {
  payload: string | null = null;
  id: any | null = null;
  due: string | null = null;
  deliveryWindow: string | null = null;
  customerId: string | null = null;
  value: string | null = null;
  status: string | null = null;
  items: string | null = null;

  constructor(
    private http: HttpClient,
    public modalRef: MdbModalRef<DeleteOrdersmodalComponent>
  ) {}

  ngOnInit(): void {
    this.id = this.payload ? this.payload[0] : null;
    this.due = this.payload ? this.payload[1] : null;
    this.deliveryWindow = this.payload ? this.payload[2] : null;
    this.customerId = this.payload ? this.payload[3] : null;
    this.value = this.payload ? this.payload[4] : null;
    this.status = this.payload ? this.payload[5] : null;
    this.items = this.payload ? this.payload[6] : null;
  }

  close(message?: string) {
    this.modalRef.close(message);
  }

  deleteOrder() {
    this.http
      .delete(Utils.BASE_URL + 'order/' + this.id, {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.close('Order deleted successfully');
        },
        (err: any) => {
          alert('Error: ' + err);
          this.close('Error: ' + err);
        }
      );
    this.ngOnInit();
  }
}
