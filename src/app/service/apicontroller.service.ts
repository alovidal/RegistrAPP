import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicontrollerService {

  constructor(private http: HttpClient) { }

  // Ruta de la api
  apiUrl = "https://15wd7tdg-8000.brs.devtunnels.ms/api";

  getUsers(user: string, pass: string): Observable<any> {
     const url = `${this.apiUrl}/usuarios/?username=${user}&password=${pass}`;
    return this.http.get(url);
  }

  getEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}/usuarios/?email=${email}`;
    return this.http.get(url);
  }
  
  postUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "/usuarios", data);
  }
  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(this.apiUrl + "/usuarios/" + id, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + "/usuarios/" + id);
  }
}