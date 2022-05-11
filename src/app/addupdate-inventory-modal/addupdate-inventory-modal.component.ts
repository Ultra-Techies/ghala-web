import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Utils from 'app/helpers/Utils';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addupdate-inventory-modal',
  templateUrl: './addupdate-inventory-modal.component.html',
  styleUrls: ['./addupdate-inventory-modal.component.css'],
})
export class AddupdateInventoryModalComponent implements OnInit {
  public addInventoryForm!: FormGroup;
  payload: string | null = null;
  warehouseId: any | null = null;
  name: any | null = null;
  ppu: any | null = null;
  sku: any | null = null;
  status: any | null = null;
  category: any | null = null;
  quantity: any | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    public modalRef: MdbModalRef<AddupdateInventoryModalComponent>
  ) {}

  ngOnInit(): void {
    this.sku = this.payload ? this.payload[0] : null;
    this.warehouseId = this.payload ? this.payload[0] : null;
    this.name = this.payload ? this.payload[1] : null;
    this.category = this.payload ? this.payload[2] : null;
    this.ppu = this.payload ? this.payload[5] : null;
    this.quantity = this.payload ? this.payload[4] : null;
    // this.status = this.payload ? this.payload[5] : null;

    this.addInventoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      ppu: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
  close() {
    this.modalRef.close();
  }
  addInventory() {
    this.http
      .post(
        Utils.BASE_URL + 'inventory',
        {
          warehouseId: Utils.getAssignedWarehouse(),
          name: this.addInventoryForm.value.name.trim(),
          ppu: this.addInventoryForm.value.ppu.trim(),
          quantity: this.addInventoryForm.value.quantity.trim(),
          category: this.addInventoryForm.value.category.trim(),
        },
        { headers: Utils.getHeaders() }
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.close();
          this.toastr.success('Added Successfully!');
        },
        (err: any) => {
          console.log('Error: ', err);
          this.toastr.error('Something went wrong!');
        }
      );
  }
  updateInventory() {
    this.http
      .put(
        Utils.BASE_URL + 'inventory',
        {
          sku: this.sku,
          name: this.addInventoryForm.value.name.trim(),
          category: this.addInventoryForm.value.category.trim(),
          quantity: this.addInventoryForm.value.quantity,
          ppu: this.addInventoryForm.value.ppu,
          warehouseId: this.addInventoryForm.value.warehouseId,
          status: this.status,
        },
        { headers: Utils.getHeaders() }
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.close();
          this.toastr.success('Updated Successfully!');
        },
        (err: any) => {
          console.log('Error: ', err);
          this.toastr.error('Something went wrong!');
        }
      );
  }
}
