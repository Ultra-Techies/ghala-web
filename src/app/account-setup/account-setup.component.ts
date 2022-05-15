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

  public warehouses: any;

  ngOnInit(): void {
    //console.log('Passed Data: ' + history.state.phoneNumber);
    if (history.state.phoneNumber === undefined) {
      this.router.navigate(['/']);
    }
    this.accountForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  createUser() {
    this.http
      .post(Utils.BASE_URL + 'users', {
        email: this.accountForm.value.email,
        phoneNumber: history.state.phoneNumber,
        firstName: this.accountForm.value.firstName,
        lastName: this.accountForm.value.lastName,
        password: this.accountForm.value.password,
      })
      .subscribe(
        (data) => {
          //console.log(data);
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
