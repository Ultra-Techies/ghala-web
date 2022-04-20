import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.css'],
})
export class PhoneVerificationComponent implements OnInit {
  imageSrc = '../../assets/launcher_logo.png';
  imageAlt = 'Logo';
  countries = [
    { id: 1, code: 'KE(+254)' },
    { id: 2, code: 'TZ(+255)' },
    { id: 3, code: 'UG(+256)' },
  ];
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      countryCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
    });
  }
  register() {
    alert('Registration SuccessFull');
    this.registerForm.reset();
    this.router.navigate(['otp']);
  }
}