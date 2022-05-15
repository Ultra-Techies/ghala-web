import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Utils from 'app/helpers/Utils';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddUpdateWarehouseModalComponent } from 'app/addupdate-warehouse-modal/addupdate-warehouse-modal.component';
import { DeleteModalComponent } from 'app/delete-modal/delete-modal.component';
import { Router } from '@angular/router';

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

  modalRefAddUpdate: MdbModalRef<AddUpdateWarehouseModalComponent> | null =
    null;
  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;

  constructor(
    private http: HttpClient,
    private modalServiceAddUpdate: MdbModalService,
    private modalServiceDelete: MdbModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['ID', 'Name', 'Location'],
      dataRows: [['', '', '']],
    };

    this.getWarehouses();
  }

  getWarehouses() {
    let heeaders = Utils.getHeaders();
    this.http
      .get(Utils.BASE_URL + 'warehouse/all', {
        headers: heeaders,
      })
      .subscribe(
        (data: any) => {
          //console.log(data);
          this.tableData1 = {
            headerRow: ['ID', 'Name', 'Location'],
            dataRows: data.map((warehouse) => {
              return [warehouse.id, warehouse.name, warehouse.location];
            }),
          };
        },
        (error) => {
          console.log(error);
          if (error.status === 403) {
            this.router.navigate(['/forbidden']);
          }
        }
      );
  }

  deleteInitiate(rowData: any) {
    this.openModal('delete', rowData);
  }

  updateWarehouseInitiate(rowData: any) {
    this.openModal('update', rowData);
  }

  openModal(message: string = 'none', payLoad: any = null) {
    //if message is add it will open the add modal if delete it will open the delete modal
    if (message === 'add') {
      this.modalRefAddUpdate = this.modalServiceAddUpdate.open(
        AddUpdateWarehouseModalComponent,
        {
          modalClass: 'modal-dialog-centered',
        }
      );
      this.modalRefAddUpdate.onClose.subscribe(() => {
        this.getWarehouses();
      });
    } else if (message === 'delete') {
      this.modalRefDelete = this.modalServiceDelete.open(DeleteModalComponent, {
        modalClass: 'modal-dialog-centered',
        data: { payload: payLoad, typeofPayload: 'warehouse' },
      });
      this.modalRefDelete.onClose.subscribe(() => {
        this.getWarehouses();
      });
    } else if (message === 'update') {
      this.modalRefAddUpdate = this.modalServiceAddUpdate.open(
        AddUpdateWarehouseModalComponent,
        {
          modalClass: 'modal-dialog-centered',
          data: { payload: payLoad },
        }
      );
      this.modalRefAddUpdate.onClose.subscribe((message: any = '') => {
        this.getWarehouses();
      });
    } else {
      console.log('Something went wrong');
    }
  }
}
