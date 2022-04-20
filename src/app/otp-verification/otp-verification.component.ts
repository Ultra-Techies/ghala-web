import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent implements OnInit {
  imageSrc = '../../assets/launcher_logo.png';
  imageAlt = 'Logo';
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  otpForm!: FormGroup;
  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });
  }
  verify() {
    alert('Verification SuccessFull');
    this.otpForm.reset();
    this.router.navigate(['account']);
  }
}
