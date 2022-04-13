import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  { path: 'phone', component: PhoneVerificationComponent },
  { path: 'otp', component: OtpVerificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
