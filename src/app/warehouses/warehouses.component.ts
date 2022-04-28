import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from 'app/helpers/Utils';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddWarehouseModalComponent } from 'app/add-warehouse-modal/add-warehouse-modal.component';
import { DeleteModalComponent } from 'app/delete-modal/delete-modal.component';

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

  modalRefAdd: MdbModalRef<AddWarehouseModalComponent> | null = null;
  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;

  constructor(
    private http: HttpClient,
    private modalServiceAdd: MdbModalService,
    private modalServiceDelete: MdbModalService
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

  deleteInitiate(id: any) {
    this.openModal('delete', id);
  }
  deleteWarehouse(id: any) {
    this.http
      .delete(Utils.BASE_URL + 'warehouse/' + id, {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.getWarehouses();
          this.modalRefDelete.close();
        },
        (err: any) => {
          alert('Error: ' + err);
          this.modalRefDelete.close();
        }
      );
  }

  openModal(message: string = 'none', id: any = null) {
    //if message is add it will open the add modal if delete it will open the delete modal
    if (message === 'add') {
      this.modalRefAdd = this.modalServiceAdd.open(AddWarehouseModalComponent, {
        modalClass: 'modal-dialog-centered',
      });
      this.modalRefAdd.onClose.subscribe((message: any = '') => {
        if (message === 'submit') {
          this.getWarehouses();
        }
      });
    } else if (message === 'delete') {
      this.modalRefDelete = this.modalServiceDelete.open(DeleteModalComponent, {
        modalClass: 'modal-dialog-centered',
      });
      this.modalRefDelete.onClose.subscribe((message: any = '') => {
        if (message === 'delete') {
          this.deleteWarehouse(id);
        }
      });
    } else {
      console.log('Error: ' + message);
    }
  }
}
