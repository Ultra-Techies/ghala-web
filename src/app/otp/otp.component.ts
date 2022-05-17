import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from 'app/helpers/Utils';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verification',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient // private toastr: ToastrService
  ) {}
  otpForm!: FormGroup;
  loading = false;
  isValid = true;
  otp: string;
  phoneNumber: string;
  newUser = true;

  ngOnInit(): void {
    if (Utils.userLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    if (history.state.phoneNumber === undefined) {
      this.router.navigate(['/']);
    }
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });
    this.newUser = history.state.newUser;
    this.loading = false;
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  verify() {
    this.loading = true;
    //check to see if history.state exists and contains otp
    if (history.state.newUser === false) {
      this.isValid = true;
      this.verifyUser(history.state.phoneNumber, this.otp);
    } else if (
      history.state.newUser === true &&
      history.state.data !== undefined &&
      history.state.data.otp === this.otp
    ) {
      this.isValid = true;
      this.router.navigate(['/account-setup'], {
        state: { phoneNumber: history.state.phoneNumber },
      });
    } else {
      this.isValid = false;
      this.otpForm.controls.otp.setErrors({
        incorrect: true,
      });
      this.loading = false;
    }
  }

  verifyUser(phoneNumber: string, otp: string) {
    //x-www-form-urlencoded header
    this.loading = true;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      }),
    };

    //pass phoneNumber and password as params
    const params = new URLSearchParams();
    params.append('phoneNumber', phoneNumber);
    params.append('password', otp);

    this.http
      .post(Utils.LOGIN_URL + 'login', params.toString(), {
        headers: httpOptions.headers,
      })
      .subscribe(
        (data) => {
          if (data['access_token'] !== undefined) {
            Utils.saveUserData('access_token', data['access_token']);
            Utils.saveUserData('refresh_token', data['refresh_token']);
            Utils.saveUserData('phoneNumber', phoneNumber);
            Utils.saveUserData('userId', data['id']);
            Utils.saveUserData('warehouseId', data['warehouseId']);

            this.getUserData(phoneNumber);
            setTimeout(() => {
              this.router.navigate(['/dashboard'], {
                state: { phoneNumber: phoneNumber },
              });
            }, 3000);
          } else {
            this.otpForm.controls.otp.setErrors({
              incorrect: true,
            });
          }
        },
        (error) => {
          console.log(error);
          alert('Something went wrong!');
          this.loading = false;
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
          Utils.saveUserData('assignedWarehouse', data['assignedWarehouse']);
          Utils.saveUserData('userId', data['id']);
          Utils.saveUserData('email', data['email']);
          Utils.saveUserData('firstName', data['firstName']);
          Utils.saveUserData('lastName', data['lastName']);
          Utils.saveUserData('assignedRole', data['role']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
