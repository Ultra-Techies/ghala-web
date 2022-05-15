import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { Warehouses } from '../../warehouses/warehouses.component';
import { OrdersComponent } from '../../orders/orders.component';
import { Inventory } from 'app/inventory/inventory.component';
import { DispatchComponent } from 'app/dispatch/dispatch.component';
import { ForbidenAccessComponent } from 'app/forbiden-access/forbiden-access.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  { path: 'settings', component: UserComponent },
  { path: 'warehouses', component: Warehouses },
  { path: 'orders', component: OrdersComponent },
  { path: 'inventory', component: Inventory },
  { path: 'dispatch', component: DispatchComponent },
  { path: 'forbidden', component: ForbidenAccessComponent },
];
