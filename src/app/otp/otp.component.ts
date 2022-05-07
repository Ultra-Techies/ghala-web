import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Utils from 'app/helpers/Utils';

@Component({
  selector: 'app-verification',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}
  otpForm!: FormGroup;

  isValid = true;
  otp: string;

  ngOnInit(): void {
    console.log('State: ' + history.state.phoneNumber);
    if (history.state.phoneNumber === undefined) {
      this.router.navigate(['/']);
    }
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  verify() {
    this.isValid = false;
    //check to see if history.state exists and contains otp
    if (history.state.newUser === false) {
      this.verifyUser(history.state.phoneNumber, this.otp);
    } else if (
      history.state.newUser === true &&
      history.state.data !== undefined &&
      history.state.data.otp === this.otp
    ) {
      this.isValid = true;
      this.router.navigate(['/dashboard']);
    } else {
      //set error message
      this.otpForm.controls.otp.setErrors({
        incorrect: true,
      });
    }
  }

  verifyUser(phoneNumber: string, otp: string) {
    this.http
      .put(
        Utils.BASE_URL + 'users',
        { phoneNumber: phoneNumber, password: otp },
        { headers: Utils.getHeaders() }
      )
      .subscribe(
        (data) => {
          console.log(data);
          //if data contains verified, do nothing else redirect to dashboard
          if (data['id'] !== undefined) {
            this.router.navigate(['/dashboard']);
          } else {
            //set error message
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
}
