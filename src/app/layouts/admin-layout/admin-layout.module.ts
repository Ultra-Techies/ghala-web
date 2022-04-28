import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { Warehouses } from '../../warehouses/warehouses.component';
import { OrdersComponent } from 'app/orders/orders.component';
import { Inventory } from 'app/inventory/inventory.component';
import { DispatchComponent } from 'app/dispatch/dispatch.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    Warehouses,
    OrdersComponent,
    Inventory,
    DispatchComponent,
  ],
})
export class AdminLayoutModule {}
