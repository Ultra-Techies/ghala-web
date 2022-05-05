import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Utils from 'app/helpers/Utils';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-warehouse-modal',
  templateUrl: './addupdate-warehouse-modal.component.html',
  styleUrls: ['./addupdate-warehouse-modal.component.css'],
})
export class AddUpdateWarehouseModalComponent implements OnInit {
  public addWarehouseForm!: FormGroup;
  payload: string | null = null;
  warehouseId: any | null = null;
  warehouseName: string | null = null;
  warehouseLocation: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    public modalRef: MdbModalRef<AddUpdateWarehouseModalComponent>
  ) {}

  ngOnInit(): void {
    this.warehouseId = this.payload ? this.payload[0] : null;
    this.warehouseName = this.payload ? this.payload[1] : null;
    this.warehouseLocation = this.payload ? this.payload[2] : null;

    this.addWarehouseForm = this.formBuilder.group({
      warehouseName: ['', Validators.required],
      warehouseLocation: ['', Validators.required],
    });
  }

  close() {
    this.modalRef.close();
  }

  addWarehouse() {
    this.http
      .post(
        Utils.BASE_URL + 'warehouse',
        {
          name: this.addWarehouseForm.value.warehouseName.trim(),
          location: this.addWarehouseForm.value.warehouseLocation.trim(),
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

  updateWarehouse() {
    this.http
      .put(
        Utils.BASE_URL + 'warehouse',
        {
          id: this.warehouseId,
          name: this.addWarehouseForm.value.warehouseName.trim(),
          location: this.addWarehouseForm.value.warehouseLocation.trim(),
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
