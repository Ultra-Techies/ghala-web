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
  assignedRole: string = '';
  editUsersAllowed: boolean = false;
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  modalRefUpdateUser: MdbModalRef<UpdateUserComponent> | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalServiceUpdateUser: MdbModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;
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

    this.getUserData();
  }

  getUsers() {
    this.http
      .get(Utils.BASE_URL + 'users/all/', {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (data: any) => {
          this.loading = false;
          //get assignedRole from local storage. if it's not ADMIN, WH_MANAGER or SUPERVISOR the navigate to /forbidden else continue
          //this.assignedRole = localStorage.getItem('assignedRole');
          if (
            this.assignedRole === 'ADMIN' ||
            this.assignedRole === 'WH_MANAGER' ||
            this.assignedRole === 'SUPERVISOR'
          ) {
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
          } else {
            this.router.navigate(['/forbidden']);
          }
        },
        (error) => {
          this.loading = false;
          console.log(error);
          if (error.status === 403) {
            this.router.navigate(['/forbidden']);
          }
        }
      );
  }

  getUserData() {
    this.http
      .get(Utils.BASE_URL + 'users/get/' + localStorage.getItem('userId'))
      .subscribe(
        (data) => {
          this.loading = false;
          Utils.saveUserData('assignedWarehouse', data['assignedWarehouse']);
          Utils.saveUserData('userId', data['id']);
          Utils.saveUserData('assignedRole', data['role']);
          this.assignedRole = data['role'];

          this.getUsers(); //now fetch users

          //if assignedRole is not ADMIN then editUsersAllowed is false else true
          if (this.assignedRole === 'ADMIN') {
            this.editUsersAllowed = true;
          } else {
            this.editUsersAllowed = false;
          }
        },
        (error) => {
          this.loading = false;
          this.router.navigate(['/forbidden']);
          console.log(error);
        }
      );
  }

  openModal(rowData: any = null) {
    if (this.editUsersAllowed) {
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
      this.modalRefUpdateUser.onClose.subscribe((message) => {
        //set successMessage if it's User Updated Successfully!
        if (message === 'User Updated Successfully!') {
          this.successMessage = message;
          this.errorMessage = '';
        } else {
          this.successMessage = '';
          this.errorMessage = message;
        }

        //wait 3 seconds and then call getUsers()
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
          this.getUsers();
        }, 3000);
      });
    }
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
