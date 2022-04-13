import { Component, OnInit } from '@angular/core';

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

  constructor() {}

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
      dataRows: [
        [
          '1',
          'Minute Maid',
          'Drinks',
          'GH032',
          '230',
          'Ksh 2,000',
          'Available',
        ],
        [
          '2',
          'Unga Maize Meal',
          'Food',
          'GH098',
          '560',
          'Ksh 2,500',
          'Available',
        ],
        [
          '3',
          'Pampers',
          'Baby Producs',
          'GH102',
          '120',
          'Ksh 1,500',
          'Available',
        ],
        [
          '4',
          'Mumias Sugar',
          'Sugar',
          ' GH304',
          '800',
          'Ksh 1,000',
          'Out of Stock',
        ],
      ],
    };
  }
}
