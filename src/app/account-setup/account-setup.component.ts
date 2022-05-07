import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Utils from 'app/helpers/Utils';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.css'],
})
export class AccountSetupComponent implements OnInit {
  accountForm!: FormGroup;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  warehouses = [
    { id: 1, name: 'Ruiru' },
    { id: 2, name: 'Rongai' },
    { id: 3, name: 'Kiambu' },
  ];

  ngOnInit(): void {
    console.log('Passed Data: ' + history.state.phoneNumber);
    if (history.state.phoneNumber === undefined) {
      this.router.navigate(['/']);
    }
    this.accountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assignedWarehouse: ['', Validators.required],
    });
  }
  submit() {
    console.log(this.accountForm.value);
    this.createUser();
  }

  createUser() {
    this.http
      .post(
        Utils.BASE_URL + 'user',
        {
          email: this.accountForm.value.email,
          phoneNumber: history.state.phoneNumber,
          assignedWarehouse: this.accountForm.value.assignedWarehouse,
          firstName: this.accountForm.value.firstName,
          lastName: this.accountForm.value.lastName,
          password: this.accountForm.value.password,
        },
        { headers: Utils.getHeaders() }
      )
      .subscribe(
        (data) => {
          console.log(data);
          if (data['id']) {
            Utils.saveUserData('userId', data['id']);
            this.router.navigate(['/dashboard']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
