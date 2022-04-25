import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
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
