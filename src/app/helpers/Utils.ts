import { HttpHeaders } from '@angular/common/http';

export default class Utils {
  //declare BASE_URL
  static BASE_URL = 'http://localhost:8080/api/';

  static getHeaders() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    return headers;
  }
}
