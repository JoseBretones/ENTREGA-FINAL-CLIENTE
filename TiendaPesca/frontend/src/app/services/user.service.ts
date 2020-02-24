import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { GLOBAL } from './global';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity;
  public token;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  signup(params) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.url + 'usuarios/login', params, httpOptions);
  }
  register(params) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.url + 'usuarios/register', params, httpOptions);
  }


  getUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    return this.http.get(this.url + 'usuarios',httpOptions);
  }

  getUserById(_id: String) {
    return this.http.get(this.url + `/${_id}`);
  }

  addUser(user: User) {
    return this.http.post(this.url, user);
  }

  editUser(user: User) {
    return this.http.put(this.url +'usuarios/' + `/${user._id}`, user);
  }

  deleteUser(_id: String) {
    return this.http.delete(this.url +'usuarios/' + `/${_id}`);
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != 'undefinded') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }
  getToken() {
    const token = localStorage.getItem('token');
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
