import { HttpHeaders } from '@angular/common/http';

export default class Utils {
  //declare BASE_URL
  static BASE_URL = 'http://localhost:8080/api/';
  static LOGIN_URL = 'http://localhost:8080/';

  static getHeaders() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers = headers.set(
      'Authorization',
      'Bearer ' + this.getUserData('access_token')
    );

    headers = headers.set('Roles', this.getUserData('assignedRole'));

    return headers;
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  static formatAmount(amount) {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'KES',
    });
  }

  static formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }

  static formatPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/^0/, '');
  }

  static saveUserData(key, data) {
    localStorage.setItem(key, data);
  }

  static getUserData(key) {
    return localStorage.getItem(key);
  }

  static saveTask(keyVal, task) {
    var randomString = this.getRandomString(5);
    if (keyVal !== null) {
      randomString = keyVal;
    }
    localStorage.setItem('task-' + randomString, JSON.stringify(task));
  }

  static deleteTask(key) {
    localStorage.removeItem(key);
    //console.log('Delete: ' + key);
  }

  static checkUserData(phoneNumber) {
    if (localStorage.getItem('phoneNumber') === phoneNumber) {
      return true;
    } else {
      localStorage.clear();
      return false;
    }
  }

  static userLoggedIn() {
    if (localStorage.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  static getRandomString(length) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static getAssignedWarehouse() {
    return localStorage.getItem('assignedWarehouse');
  }

  //convert currency string back to number e.g. KES 8,100.00 to 8100.00
  static convertCurrencyToNumber(currency) {
    return parseInt(currency.replace(/,/g, '').replace('KES', ''));
  }

  static removeDecimalPlaces(number) {
    return parseInt(number);
  }

  //get warehouse name from localstorage by passing the warehouse id
  static getWarehouseName(warehouseId) {
    const warehouses = JSON.parse(localStorage.getItem('warehouses'));
    if (warehouses !== null && warehouses.length > 0) {
      for (let i = 0; i < warehouses.length; i++) {
        if (warehouses[i].id === warehouseId) {
          return warehouses[i].name;
        } else {
          return warehouseId;
        }
      }
    } else {
      return warehouseId;
    }
  }

  //get the warehouse id from localstorage by passing the warehouse name
  static getWarehouseId(warehouseName) {
    const warehouses = JSON.parse(localStorage.getItem('warehouses'));
    if (warehouses !== null && warehouses.length > 0) {
      for (let i = 0; i < warehouses.length; i++) {
        if (warehouses[i].name === warehouseName) {
          return warehouses[i].id;
        } else {
          return warehouseName;
        }
      }
    } else {
      return warehouseName;
    }
  }

  //returns an array as objects containing roles namely ADMIN,WH_MANAGER,SUPERVISOR,DISPATCH_ASSOCIATE,WH_ASSOCIATE,BASIC
  static getRoles() {
    return [
      {
        id: 1,
        name: 'ADMIN',
      },
      {
        id: 2,
        name: 'WH_MANAGER',
      },
      {
        id: 3,
        name: 'SUPERVISOR',
      },
      {
        id: 4,
        name: 'DISPATCH_ASSOCIATE',
      },
      {
        id: 5,
        name: 'WH_ASSOCIATE',
      },
      {
        id: 6,
        name: 'BASIC',
      },
    ];
  }
}
