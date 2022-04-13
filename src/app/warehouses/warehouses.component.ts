import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['ID', 'Name', 'Country', 'City', 'Inventory'],
      dataRows: [
        ['1', 'Ruiru', 'Kenya', 'Nairobi', 'Ksh 30,600,738'],
        ['2', 'Alsoaps', 'Kenya', 'Nairobi', 'Ksh 21,301,789'],
        ['3', 'Ngong Rd', 'Kenya', 'Nairobi', 'Ksh 55,654,142'],
        ['4', 'Ongata Rongai', 'Kenya', ' Nairobi', 'Ksh 36,708,735'],
      ],
    };
  }
}
