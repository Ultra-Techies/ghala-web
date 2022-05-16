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
      dataRows: [['', '', '']],
    };
    this.getInventory();
  }
  getInventory() {
    this.http
      .get(Utils.BASE_URL + 'inventory/wh/' + Utils.getAssignedWarehouse(), {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
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

  updateInventoryInitiate(rowData: any) {
    this.openModal('update', rowData);
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
      this.modalRefAddUpdate.onClose.subscribe(() => {
        this.getInventory();
      });
    } else if (message === 'delete') {
      this.modalRefDelete = this.modalServiceDelete.open(DeleteModalComponent, {
        modalClass: 'modal-dialog-centered',
        data: { payload: payLoad, typeofPayload: 'inventory' },
      });
      this.modalRefDelete.onClose.subscribe(() => {
        this.getInventory();
      });
    } else if (message === 'update') {
      this.modalRefAddUpdate = this.modalServiceAddUpdate.open(
        AddupdateInventoryModalComponent,
        {
          modalClass: 'modal-dialog-centered',
          data: { payload: payLoad },
        }
      );
      this.modalRefAddUpdate.onClose.subscribe((message: any = '') => {
        this.getInventory();
      });
    } else {
      console.log('Something went wrong');
    }
  }
}
