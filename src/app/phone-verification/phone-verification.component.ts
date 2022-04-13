import { Component, OnInit } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.css'],
})
export class PhoneVerificationComponent implements OnInit {
  imageSrc = '../../assets/launcher_logo.png';
  imageAlt = 'Logo';
  constructor() {}

  ngOnInit(): void {}
}
