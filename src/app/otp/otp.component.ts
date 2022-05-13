import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  verify() {
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
    }
  }

  verifyUser(phoneNumber: string, otp: string) {
    this.http
      .post(
        Utils.LOGIN_URL + 'login',
        { phoneNumber: phoneNumber, password: otp },
        { headers: Utils.getHeaders() }
      )
      .subscribe(
        (data) => {
          //console.log(data);
          if (data['id'] !== undefined) {
            Utils.saveUserData('phoneNumber', phoneNumber);
            Utils.saveUserData('userId', data['id']);
            Utils.saveUserData('warehouseId', data['warehouseId']);
            this.getUserData();
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
        }
      );
  }

  getUserData() {
    this.http
      .get(Utils.BASE_URL + 'user/' + localStorage.getItem('userId'))
      .subscribe(
        (data) => {
          Utils.saveUserData('assignedWarehouse', data['assignedWarehouse']);
          Utils.saveUserData('userId', data['id']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
