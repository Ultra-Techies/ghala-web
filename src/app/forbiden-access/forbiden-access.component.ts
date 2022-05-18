import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Utils from 'app/helpers/Utils';

@Component({
  selector: 'app-forbiden-access',
  templateUrl: './forbiden-access.component.html',
  styleUrls: ['./forbiden-access.component.css'],
})
export class ForbidenAccessComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  errorMessage: string = '';
  assignedRole: string = '';
  assignedWarehouse: string = '';

  ngOnInit(): void {
    //this.refreshToken();
    this.getUserData(Utils.getUserData('phoneNumber'));
  }

  refreshToken() {
    //get refresh token everytime page loads
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      'Bearer ' + Utils.getUserData('refresh_token')
    );

    this.http
      .get(Utils.LOGIN_URL + 'refreshtoken', {
        headers: headers,
      })
      .subscribe(
        (data) => {
          Utils.saveUserData('refresh_token', data['refresh_token']);
          Utils.saveUserData('access_token', data['access_token']);
          //this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
          this.errorMessage = error['error'].error_message;
          //if error message has the text The Token has expired then clear local storage and redirect to login page
          if (error['error'].error_message.includes('The Token has expired')) {
            this.errorMessage = error['error'].error_message;
            this.errorMessage = 'Your session has expired. Please login again.';
            localStorage.clear();
          } else {
            this.errorMessage = error['error'].error_message;
          }
        }
      );
  }

  getUserData(phoneNumber: string) {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      'Bearer ' + Utils.getUserData('access_token')
    );
    this.http
      .post(
        Utils.BASE_URL + 'users/fetch',
        { phoneNumber: phoneNumber },
        { headers: headers }
      )
      .subscribe(
        (data) => {
          if (
            data['role'].toUpperCase() !=
            localStorage.getItem('assignedRole').toUpperCase()
          ) {
            localStorage.clear();
            this.router.navigate(['/']);
            console.log('User role has changed');
          } else {
            Utils.saveUserData('assignedWarehouse', data['assignedWarehouse']);
            Utils.saveUserData('userId', data['id']);
            Utils.saveUserData('email', data['email']);
            Utils.saveUserData('firstName', data['firstName']);
            Utils.saveUserData('lastName', data['lastName']);
            Utils.saveUserData('assignedRole', data['role']);
            this.assignedRole = localStorage.getItem('assignedRole');
            this.assignedWarehouse = Utils.getWarehouseName(
              data['assignedWarehouse']
            )
              ? Utils.getWarehouseName(data['assignedWarehouse'])
              : 'Unassigned';
          }
        },
        (error) => {
          console.log(error);
          this.errorMessage = error['error'].error_message;
        }
      );
  }

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
