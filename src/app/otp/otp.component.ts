import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
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
