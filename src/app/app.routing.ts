import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { VerificationComponent } from './verification/verification.component';
import { OtpComponent } from './otp/otp.component';
import { AccountSetupComponent } from './account-setup/account-setup.component';

const routes: Routes = [
  {
    path: '',
    component: VerificationComponent,
    pathMatch: 'full',
  },
  {
    path: 'otp',
    component: OtpComponent,
  },
  {
    path: 'account-setup',
    component: AccountSetupComponent,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
