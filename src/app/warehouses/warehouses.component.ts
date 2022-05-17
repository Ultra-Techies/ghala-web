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
  editAllowed: boolean = false;
  loading: boolean = false;
  foundWarehouses: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

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
    this.loading = true;
    this.tableData1 = {
      headerRow: ['ID', 'Name', 'Location'],
      dataRows: [],
    };

    this.getWarehouses();
    this.getUserData();
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
          this.loading = false;
          this.tableData1 = {
            headerRow: ['ID', 'Name', 'Location'],
            dataRows: data.map((warehouse) => {
              return [warehouse.id, warehouse.name, warehouse.location];
            }),
          };
          this.foundWarehouses = data.length > 0 ? true : false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
          if (error.status === 403) {
            this.router.navigate(['/forbidden']);
          }
        }
      );
  }

  getUserData() {
    let userId = localStorage.getItem('userId');
    this.http
      .get(Utils.BASE_URL + 'users/get/' + userId, {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (res: any) => {
          //if res['role'] is not ADMIN then set editAllowed to false else set it to true
          if (res['role'] !== 'ADMIN') {
            this.editAllowed = false;
          } else {
            this.editAllowed = true;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  deleteInitiate(rowData: any) {
    this.openModal('delete', rowData);
  }

  updateWarehouseInitiate(rowData: any) {
    if (this.editAllowed) {
      this.openModal('update', rowData);
    }
  }

  openModal(message: string = 'none', payLoad: any = null) {
    if (this.editAllowed) {
      //if message is add it will open the add modal if delete it will open the delete modal
      if (message === 'add') {
        this.modalRefAddUpdate = this.modalServiceAddUpdate.open(
          AddUpdateWarehouseModalComponent,
          {
            modalClass: 'modal-dialog-centered',
          }
        );
        this.modalRefAddUpdate.onClose.subscribe((message) => {
          //set successMessage if it's Added Successfully!
          if (message === 'Added Successfully!') {
            this.successMessage = message;
            this.errorMessage = '';
          } else {
            this.successMessage = '';
            this.errorMessage = message;
          }

          //wait 3 seconds and then call getWarehouses()
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
            this.getWarehouses();
          }, 3000);
        });
      } else if (message === 'delete') {
        this.modalRefDelete = this.modalServiceDelete.open(
          DeleteModalComponent,
          {
            modalClass: 'modal-dialog-centered',
            data: { payload: payLoad, typeofPayload: 'warehouse' },
          }
        );
        this.modalRefDelete.onClose.subscribe((message) => {
          //set successMessage if it's Deleted Successfully!
          if (message === 'Warehouse deleted successfully!') {
            this.successMessage = message;
            this.errorMessage = '';
          } else {
            this.successMessage = '';
            this.errorMessage = message;
          }

          //wait 3 seconds and then call getWarehouses()
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
            this.getWarehouses();
          }, 3000);
        });
      } else if (message === 'update') {
        this.modalRefAddUpdate = this.modalServiceAddUpdate.open(
          AddUpdateWarehouseModalComponent,
          {
            modalClass: 'modal-dialog-centered',
            data: { payload: payLoad },
          }
        );
        this.modalRefAddUpdate.onClose.subscribe((message) => {
          //set successMessage if it's Updated Successfully!
          if (message === 'Updated Successfully!') {
            this.successMessage = message;
            this.errorMessage = '';
          } else {
            this.successMessage = '';
            this.errorMessage = message;
          }

          //wait 3 seconds and then call getWarehouses()
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
            this.getWarehouses();
          }, 3000);
        });
      } else {
        console.log('Something went wrong');
      }
    }
  }
}
