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

  //a function that takes an all caps string and returns a string with first letter capitalized and the rest of the letters lowercase
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
