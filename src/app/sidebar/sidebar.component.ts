import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Home', icon: 'pe-7s-home', class: '' },
  { path: '/warehouses', title: 'Warehouses', icon: 'pe-7s-note2', class: '' },

  { path: '/orders', title: 'Orders', icon: 'pe-7s-box2', class: '' },
  { path: '/inventory', title: 'Inventory', icon: 'pe-7s-credit', class: '' },
  { path: '/dispatch', title: 'Dispatch', icon: 'pe-7s-clock', class: '' },

  { path: '/settings', title: 'Settings', icon: 'pe-7s-user', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }
}
