import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css'],
})
export class DispatchComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;

  constructor() {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['Order ID', 'Assigned Driver', 'Delivery Date', 'Status'],
      dataRows: [['1', 'John Doe', '24/04/2022', 'Pending']],
    };
  }
}
