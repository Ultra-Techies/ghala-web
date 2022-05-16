import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { VerificationComponent } from './verification/verification.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatDialogModule } from '@angular/material/dialog';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ToastrModule } from 'ngx-toastr';
import { OtpComponent } from './otp/otp.component';
import { AccountSetupComponent } from './account-setup/account-setup.component';
import { AddUpdateWarehouseModalComponent } from './addupdate-warehouse-modal/addupdate-warehouse-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { AddupdateInventoryModalComponent } from './addupdate-inventory-modal/addupdate-inventory-modal.component';
import { DeliveryNoteComponent } from './delivery-note/delivery-note.component';
import { DispatchOrderComponent } from './dispatch-order/dispatch-order.component';
import { ForbidenAccessComponent } from './forbiden-access/forbiden-access.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgOtpInputModule,
    MatDialogModule,
    MdbModalModule,
    ToastrModule.forRoot(),
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
  ],
  declarations: [
    AppComponent,
    VerificationComponent,
    OtpComponent,
    AccountSetupComponent,
    AdminLayoutComponent,
    AddUpdateWarehouseModalComponent,
    DeleteModalComponent,
    AddupdateInventoryModalComponent,
    DeliveryNoteComponent,
    DispatchOrderComponent,
    ForbidenAccessComponent,
    UpdateUserComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
