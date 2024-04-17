import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getLoginInfo(): any {
    try {
      const token = sessionStorage.getItem('token');
      if(token) {
        return jwtDecode(token);
      }
    } catch (err) {
      console.log('error al traer la data de login');
    }
  }

  removeToken() {
    sessionStorage.clear();
  }
}
