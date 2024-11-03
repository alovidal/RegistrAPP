import { Injectable } from '@angular/core';
import { ApicontrollerService } from './apicontroller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  connectionStatus: boolean = false;

  constructor(private api: ApicontrollerService) { }

  loginBDD(user: String, pass: String): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (user !== "" && pass !== "") {
        this.validarUsuario(user, pass)
          .then((resultado) => {
            this.connectionStatus = resultado;
            resolve(resultado);
          })
          .catch((error) => {
            this.connectionStatus = false;
            reject(error);
          });
      } else {
        this.connectionStatus = false;
        resolve(false);  
      }
    });
  }

  validarUsuario(user: String, pass: String): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.api.getUsers().subscribe(
        (data) => {
          if (data.length > 0) {
            const usuarioObtenido = data[0];  
            if (usuarioObtenido.username === user && usuarioObtenido.password === pass) {
              resolve(true);
            } else {
              resolve(false);
            } 
          } else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  logout() {
    this.connectionStatus = false;
  }

  isConected() {
    return this.connectionStatus;
  }
}
