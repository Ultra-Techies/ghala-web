import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Utils from 'app/helpers/Utils';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
  countries = [
    { id: 1, code: 'KE(+254)', countryCode: '+254' },
    { id: 2, code: 'TZ(+255)', countryCode: '+255' },
    { id: 3, code: 'UG(+256)', countryCode: '+256' },
  ];

  submitted = false;
  userExists = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}
  registerForm!: FormGroup;
  ngOnInit(): void {
    if (Utils.userLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.registerForm = this.formBuilder.group({
      countryCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  register() {
    let phoneNumber =
      this.countries[this.registerForm.value.countryCode - 1].countryCode +
      Utils.formatPhoneNumber(this.registerForm.value.phoneNumber);

    this.http
      .post(Utils.BASE_URL + 'users/exists', { phoneNumber: phoneNumber })
      .subscribe(
        (data) => {
          this.submitted = true;
          if (data['exists']) {
            this.userExists = true;
            this.router.navigate(['/otp'], {
              state: { phoneNumber: phoneNumber, newUser: false },
            });
          } else {
            this.userExists = false;
            this.getOtp(phoneNumber);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getOtp(phoneNumber: string) {
    this.http
      .post(
        Utils.BASE_URL + 'otp',
        { phoneNumber: phoneNumber },
        { headers: Utils.getHeaders() }
      )
      .subscribe(
        (data) => {
          //console.log(data);
          this.router.navigate(['/otp'], {
            state: { phoneNumber: phoneNumber, data: data, newUser: true },
          });
        },
        (error) => {
          console.log(error);
          alert('Something went wrong!');
        }
      );
  }
}
