import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSetupComponent } from './account-setup/account-setup.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  { path: 'phone', component: PhoneVerificationComponent },
  { path: 'otp', component: OtpVerificationComponent },
  { path: 'account', component: AccountSetupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
