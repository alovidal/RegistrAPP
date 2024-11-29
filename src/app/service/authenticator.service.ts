import { Injectable } from '@angular/core';
import { ApicontrollerService } from './apicontroller.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  connectionStatus: boolean = false;

  constructor(private api: ApicontrollerService, private storage: StorageService) {}

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
            this.storage.set("estado", false);
            reject(error);
          });
      } else {
        this.connectionStatus = false;
        this.storage.set("estado", false);
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
            if (usuarioObtenido.username === user && usuarioObtenido.password === pass) {
              this.storage.set("usuario", user);
              this.storage.set("estado", true);
              console.log(this.storage.get("usuario"));
              console.log(this.storage.get("estado"));
              console.log(usuarioObtenido);
              resolve(true);
              this.connectionStatus = true;
              console.log(this.connectionStatus);
              console.log("Usuario conectado");
            } else {
              this.storage.set("estado", false);
              resolve(false);
            } 
          } else {
            this.storage.set("estado", false);
            resolve(false);
          }
        },
        (error) => {
          this.storage.set("estado", false);
          reject(error);
        }
      );
    });
  }

  logout() {
    this.connectionStatus = false;
    console.log(this.connectionStatus);
    console.log("Sesión cerrada");
    this.storage.remove("usuario")
    this.storage.remove("estado");
    this.storage.limpiar();
  }

  isConected() {
    return this.connectionStatus;
  }
}
