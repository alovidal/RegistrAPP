import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicontrollerService {

  constructor(private http: HttpClient) { }

  // Ruta de la api
  apiUrl = "http://127.0.0.1:8000/api";

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + "/usuarios");
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