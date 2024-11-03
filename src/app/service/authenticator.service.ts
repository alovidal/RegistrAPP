import { Injectable } from '@angular/core';
import { ApicontrollerService } from './apicontroller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  connectionStatus: boolean = false;

  constructor(private api: ApicontrollerService) { }

  loginBDD(user: string, pass: string): Promise<boolean> {
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

  validarUsuario(user: string, pass: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.api.getUsers(user, pass).subscribe(
        (data) => {
          if (data.length > 0) {
            const usuarioObtenido = data[0];
            console.log(usuarioObtenido);  
            if (usuarioObtenido.username === user && usuarioObtenido.password === pass) {
              resolve(true);
              this.connectionStatus = true;
              console.log(user);
              console.log(pass);
              console.log(this.connectionStatus);
              console.log("Usuario conectado");
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
    console.log(this.connectionStatus);
    console.log("Sesión cerrada");
  }

  isConected() {
    return this.connectionStatus;
  }
}
