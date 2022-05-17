import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Utils from 'app/helpers/Utils';
import { UpdateUserComponent } from 'app/update-user/update-user.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css'],
})
export class ManagerUsersComponent implements OnInit {
  public tableData1: TableData;
  modalRefUpdateUser: MdbModalRef<UpdateUserComponent> | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalServiceUpdateUser: MdbModalService
  ) {}

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: [
        'ID',
        'First Name',
        'Last Name',
        'Email',
        'Phone Number',
        'Assigned Warehouse',
        'Role',
      ],
      dataRows: [],
    };

    this.getWarehouses();

    this.getUsers();
  }

  getUsers() {
    this.http
      .get(Utils.BASE_URL + 'users/all/', {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          for (let i = 0; i < data.length; i++) {
            this.tableData1.dataRows[i] = [
              data[i].id,
              data[i].firstName,
              data[i].lastName,
              data[i].email,
              data[i].phoneNumber,
              data[i].assignedWarehouse,
              data[i].role,
            ];
          }
          for (let i = 0; i < data.length; i++) {
            this.tableData1.dataRows[i] = [
              data[i].id,
              data[i].firstName,
              data[i].lastName,
              data[i].email,
              data[i].phoneNumber,
              Utils.getWarehouseName(data[i].assignedWarehouse),
              data[i].role,
            ];
          }
        },
        (error) => {
          console.log(error);
          if (error.status === 403) {
            this.router.navigate(['/forbidden']);
          }
        }
      );
  }

  openModal(rowData: any = null) {
    this.modalRefUpdateUser = this.modalServiceUpdateUser.open(
      UpdateUserComponent,
      {
        modalClass: 'modal-dialog-centered',
        data: {
          user: rowData,
          warehouses: JSON.parse(localStorage.getItem('warehouses')),
        },
      }
    );
    this.modalRefUpdateUser.onClose.subscribe(() => {
      this.getUsers();
    });
  }

  //calls the api/warehouse/all and gets all the warehouses, stores them in the local storage
  getWarehouses() {
    this.http
      .get(Utils.BASE_URL + 'warehouse/all', {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          localStorage.setItem('warehouses', JSON.stringify(data));
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
