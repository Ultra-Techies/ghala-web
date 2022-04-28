import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from 'app/helpers/Utils';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddWarehouseModalComponent } from 'app/add-warehouse-modal/add-warehouse-modal.component';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css'],
})
export class Warehouses implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;

  modalRef: MdbModalRef<AddWarehouseModalComponent> | null = null;
  constructor(
    private http: HttpClient,
    private modalService: MdbModalService
  ) {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['ID', 'Name', 'Location'],
      dataRows: [['', '', '']],
    };

    this.getWarehouses();
  }

  getWarehouses() {
    this.http
      .get(Utils.BASE_URL + 'warehouses', { headers: Utils.getHeaders() })
      .subscribe((data: any) => {
        console.log(data);
        (this.tableData1 = {
          headerRow: ['ID', 'Name', 'Location'],
          dataRows: data.map((warehouse) => {
            return [warehouse.id, warehouse.name, warehouse.location];
          }),
        }),
          (err: any) => {
            console.log('Error: ', err);
          };
      });
  }

  addWarehouse() {
    this.http
      .post(
        Utils.BASE_URL + 'warehouses',
        {
          name: 'Warehouse 1',
          location: 'Location 1',
        },
        { headers: Utils.getHeaders() }
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.getWarehouses();
        },
        (err: any) => {
          console.log('Error: ', err);
        }
      );
  }

  openModal() {
    this.modalRef = this.modalService.open(AddWarehouseModalComponent, {
      modalClass: 'modal-dialog-centered',
    });

    this.modalRef.onClose.subscribe((message: any) => {
      this.ngOnInit();
    });
  }
}
