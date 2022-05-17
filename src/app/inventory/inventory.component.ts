import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddupdateInventoryModalComponent } from 'app/addupdate-inventory-modal/addupdate-inventory-modal.component';
import { DeleteModalComponent } from 'app/delete-modal/delete-modal.component';
import Utils from 'app/helpers/Utils';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class Inventory implements OnInit {
  public tableData1: TableData;
  loading = false;
  editAllowedInventory: boolean = false;
  deleteInventory: boolean = false;
  foundInventory: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  modalRefAddUpdate: MdbModalRef<AddupdateInventoryModalComponent> | null =
    null;
  modalRefDelete: MdbModalRef<DeleteModalComponent> | null = null;
  sku: any;
  constructor(
    private http: HttpClient,
    private modalServiceAddUpdate: MdbModalService,
    private modalServiceDelete: MdbModalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.tableData1 = {
      headerRow: [
        'ID',
        'Product Name',
        'Category',
        'SKU',
        'Quantity',
        'Price',
        'Status',
      ],
      dataRows: [],
    };
    this.getInventory();
    this.getUserData();
  }
  getInventory() {
    this.http
      .get(Utils.BASE_URL + 'inventory/wh/' + Utils.getAssignedWarehouse(), {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          this.loading = false;
          //console.log(data);
          this.tableData1 = {
            headerRow: [
              'ID',
              'Product Name',
              'Category',
              'SKU',
              'Quantity',
              'Price',
              'Status',
            ],
            dataRows: data.map((inventory) => {
              return [
                inventory.sku,
                inventory.name,
                inventory.category,
                inventory.skuCode,
                inventory.quantity,
                inventory.ppu,
                Utils.capitalizeFirstLetter(inventory.status),
              ];
            }),
          };

          this.foundInventory = data.length > 0 ? true : false;
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

  deleteInitiate(rowData: any) {
    this.openModal('delete', rowData);
  }

  updateInventoryInitiate(rowData: any) {
    if (this.editAllowedInventory) {
      this.openModal('update', rowData);
    }
  }

  openModal(message: string = 'none', payLoad: any = null) {
    //if message is add it will open the add modal if delete it will open the delete modal
    if (message === 'add') {
      this.modalRefAddUpdate = this.modalServiceAddUpdate.open(
        AddupdateInventoryModalComponent,
        {
          modalClass: 'modal-dialog-centered',
        }
      );
      this.modalRefAddUpdate.onClose.subscribe((message) => {
        //set successMessage if it's Created Successfully!
        if (message === 'Added Successfully!') {
          this.successMessage = message;
          this.errorMessage = '';
        } else {
          this.successMessage = '';
          this.errorMessage = message;
        }

        //wait 3 seconds and then call getInventory()
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
          this.getInventory();
        }, 3000);
      });
    } else if (message === 'delete') {
      this.modalRefDelete = this.modalServiceDelete.open(DeleteModalComponent, {
        modalClass: 'modal-dialog-centered',
        data: { payload: payLoad, typeofPayload: 'inventory' },
      });
      this.modalRefDelete.onClose.subscribe((message) => {
        //set successMessage if it's Deleted Successfully!
        if (message === 'Deleted Successfully!') {
          this.successMessage = message;
          this.errorMessage = '';
        } else {
          this.successMessage = '';
          this.errorMessage = message;
        }

        //wait 3 seconds and then call getInventory()
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
          this.getInventory();
        }, 3000);
      });
    } else if (message === 'update') {
      this.modalRefAddUpdate = this.modalServiceAddUpdate.open(
        AddupdateInventoryModalComponent,
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

        //wait 3 seconds and then call getInventory()
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
          this.getInventory();
        }, 3000);
      });
    } else {
      console.log('Something went wrong');
    }
  }

  getUserData() {
    this.http
      .get(Utils.BASE_URL + 'users/get/' + localStorage.getItem('userId'))
      .subscribe(
        (data) => {
          //if res['role'] is "ADMIN","WH_MANAGER","SUPERVISOR" then they can delete inventory
          if (
            data['role'] === 'ADMIN' ||
            data['role'] === 'WH_MANAGER' ||
            data['role'] === 'SUPERVISOR'
          ) {
            this.deleteInventory = true;
          }

          //if role belongs to any of the following then they should be able to edit inventory item: "ADMIN","WH_MANAGER","SUPERVISOR","DISPATCH_ASSOCIATE","WH_ASSOCIATE"
          if (
            data['role'] === 'ADMIN' ||
            data['role'] === 'DISPATCH_ASSOCIATE' ||
            data['role'] === 'WH_ASSOCIATE' ||
            data['role'] === 'WH_MANAGER' ||
            data['role'] === 'SUPERVISOR'
          ) {
            this.editAllowedInventory = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
