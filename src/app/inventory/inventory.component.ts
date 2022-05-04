import { Component, OnInit } from '@angular/core';
import Utils from 'app/helpers/Utils';
import { HttpClient } from '@angular/common/http';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

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
  public tableData2: TableData;

  constructor(
    private http: HttpClient,
    private modalServiceAddUpdate: MdbModalService,
    private modalServiceDelete: MdbModalService
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
      dataRows: [['', '', '', '', '', '', '']],
    };
    this.getInventory();
  }

  getInventory() {
    this.http
      .get(Utils.BASE_URL + 'allinventory', { headers: Utils.getHeaders() })
      .subscribe((data: any) => {
        console.log('Inventory Data: ' + data);
        (this.tableData1 = {
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
              'Ksh ' + inventory.ppu,
              Utils.capitalizeFirstLetter(inventory.status),
            ];
          }),
        }),
          (err: any) => {
            console.log('Error: ', err);
          };
      });
  }
}
