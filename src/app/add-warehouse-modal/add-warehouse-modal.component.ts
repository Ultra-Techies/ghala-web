import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Utils from 'app/helpers/Utils';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-warehouse-modal',
  templateUrl: './add-warehouse-modal.component.html',
  styleUrls: ['./add-warehouse-modal.component.css'],
})
export class AddWarehouseModalComponent implements OnInit {
  public addWarehouseForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    public modalRef: MdbModalRef<AddWarehouseModalComponent>
  ) {}

  ngOnInit(): void {
    this.addWarehouseForm = this.formBuilder.group({
      warehouseName: ['', Validators.required],
      warehouseLocation: ['', Validators.required],
    });
  }

  close(message?: string) {
    this.modalRef.close(message);
  }

  addWarehouse() {
    this.http
      .post(
        Utils.BASE_URL + 'warehouse',
        {
          name: this.addWarehouseForm.value.warehouseName,
          location: this.addWarehouseForm.value.warehouseLocation,
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
}
