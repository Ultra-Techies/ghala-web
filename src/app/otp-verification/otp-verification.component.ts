import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent implements OnInit {
  imageSrc = '../../assets/launcher_logo.png';
  imageAlt = 'Logo';
  constructor() {}

  ngOnInit(): void {}
}
