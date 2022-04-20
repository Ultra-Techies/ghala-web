import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;

  constructor() {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: [
        'ID',
        'Delivery Date',
        'Customer',
        'Items',
        'Price',
        'Status',
      ],
      dataRows: [
        ['1', '13/04/2022', 'Uliza Shop', '12', 'Ksh 600,738', 'Delivered'],
        ['2', '1/05/2022', 'Mama Mboga Shop', '5', 'Ksh 301,789', 'Pending'],
        ['3', '20/04/2022', 'Alsoaps General', '26', 'Ksh 54,142', 'Pending'],
        ['4', '18/05/2022', 'Westlands Depot', ' 30', 'Ksh 78,735', 'Pending'],
      ],
    };
  }
}
