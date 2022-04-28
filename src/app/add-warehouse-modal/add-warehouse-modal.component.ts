import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Utils from 'app/helpers/Utils';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

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
    public modalRef: MdbModalRef<AddWarehouseModalComponent>
  ) {}

  ngOnInit(): void {
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
        Utils.BASE_URL + 'warehouses',
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
        },
        (err: any) => {
          console.log('Error: ', err);
        }
      );
  }
}
