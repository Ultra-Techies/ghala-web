import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from 'app/Utils';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['ID', 'Name', 'Location'],
      dataRows: [],
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
}
