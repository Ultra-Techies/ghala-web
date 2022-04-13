import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashComponent } from './splash/splash.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { AccountSetupComponent } from './account-setup/account-setup.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    PhoneVerificationComponent,
    OtpVerificationComponent,
    AccountSetupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgOtpInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
