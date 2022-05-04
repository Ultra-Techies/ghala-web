import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Utils from 'app/helpers/Utils';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-inventorymodal',
  templateUrl: './delete-inventorymodal.component.html',
  styleUrls: ['./delete-inventorymodal.component.css'],
})
export class DeleteInventorymodalComponent implements OnInit {
  payload: string | null = null;
  warehouseId: any | null = null;
  name: any | null = null;
  ppu: any | null = null;
  category: any | null = null;
  quantity: any | null = null;
  sku: any | null = null;
  loading = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public modalRef: MdbModalRef<DeleteInventorymodalComponent>
  ) {}

  ngOnInit(): void {
    this.sku = this.payload ? this.payload[0] : null;

    this.warehouseId = this.payload ? this.payload[0] : null;
    this.name = this.payload ? this.payload[1] : null;
    this.category = this.payload ? this.payload[2] : null;
    this.quantity = this.payload ? this.payload[3] : null;
    this.ppu = this.payload ? this.payload[4] : null;
  }

  close(message?: string) {
    this.modalRef.close(message);
  }

  deleteInventory() {
    this.http
      .delete(Utils.BASE_URL + 'inventory/' + this.sku, {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.close('Inventory deleted successfully');
        },
        (err: any) => {
          alert('Error: ' + err);
          this.close('Error: ' + err);
        }
      );
  }
  // deleteInventory() {
  //   this.loading = true;
  //   this.http.delete(Utils.BASE_URL + 'inventory/').subscribe(
  //     (res) => {
  //       this.loading = false;
  //       this.toastr.success('Product deleted Successfully!', 'Success');
  //       this.ngOnInit();
  //       // this.router.navigate(['todo']);
  //     },
  //     (err: any) => {
  //       this.loading = false;
  //       console.log('Error: ', err);
  //       this.toastr.error(
  //         'Product Delete Failed, ' + err.error.message,
  //         'Error'
  //       );
  //     }
  //   );
  // }
}
