import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Utils from 'app/helpers/Utils';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  loading = false;

  loggedInUser: any = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    assignedWarehouse: '',
  };

  public settingsForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  userID: any;
  firstName: any = [];
  lastName: any = [];
  email: any = [];
  password: any = [];
  role: any = [];
  assignedWarehouse: any = [];
  phoneNumber: any = [];
  ngOnInit(): void {
    this.loading = false;

    let userId = localStorage.getItem('userId');

    if (userId === null) {
      this.router.navigate(['/']);
      this.toastr.error('Please Login First!', 'Error');
    } else {
      this.loading = true;
      //call user api to get user details and make sure user still exists
      this.http
        .get(Utils.BASE_URL + 'users/get/' + userId, {
          headers: Utils.getHeaders(),
        })
        .subscribe(
          (res: any) => {
            this.loading = false;
            this.loggedInUser = res;
            this.userID = userId;
            this.getWarehouse();
            //console.log(res);
          },
          (err: any) => {
            this.loading = false;
            this.toastr.error('Error, ' + err.error.message, 'Error');
            if (err.status === 403) {
              this.router.navigate(['/forbidden']);
            } else {
              //redirect to login page
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        );
    }

    this.settingsForm = this.formBuilder.group({
      userId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.maxLength(4)]],
      phoneNumber: [''],
      role: [''],
      assignedWarehouse: [''],
    });
  }
  updateProfile() {
    let payload = {};
    if (this.firstName !== this.settingsForm.value.firstName) {
      payload['firstName'] = this.settingsForm.value.firstName;
    }
    if (this.lastName !== this.settingsForm.value.lastName) {
      payload['lastName'] = this.settingsForm.value.lastName;
    }
    if (this.email !== this.settingsForm.value.email) {
      payload['email'] = this.settingsForm.value.email;
    }
    if (this.password !== this.settingsForm.value.password) {
      payload['password'] = this.settingsForm.value.password;
    }

    this.http
      .put(
        Utils.BASE_URL + 'users',
        {
          id: localStorage.getItem('userId'),
          email: this.settingsForm.value.email,
          firstName: this.settingsForm.value.firstName,
          lastName: this.settingsForm.value.lastName,
          password: this.settingsForm.value.password,
        },
        { headers: Utils.getHeaders() }
      )
      .subscribe(
        (data: any) => {
          //update success
          console.log('User Data: ' + data);
          window.location.reload();
        },
        (err: any) => {
          //update failed
          console.log('Error: ', err);
        }
      );
  }

  getWarehouse() {
    this.http
      .get(Utils.BASE_URL + 'warehouse/get/' + Utils.getAssignedWarehouse(), {
        headers: Utils.getHeaders(),
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.loggedInUser.assignedWarehouse =
            res.name + ' in ' + res.location;
        },
        (err: any) => {
          this.loading = false;
          this.toastr.error('Error, ' + err.error.message, 'Error');
          if (err.status === 403) {
            this.router.navigate(['/forbidden']);
          } else {
            //redirect to login page
            alert(err);
            localStorage.clear();
            this.router.navigate(['/']);
          }
        }
      );
  }
}
