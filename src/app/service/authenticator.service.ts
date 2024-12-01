import { Injectable } from '@angular/core';
import { ApicontrollerService } from './apicontroller.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  connectionStatus: boolean = false;

  constructor(private api: ApicontrollerService, private storage: StorageService) {
    // Verificar si el usuario está conectado cuando la app se inicia
    this.checkConnectionStatus();
  }

  // Verifica el estado de la conexión al iniciar la aplicación
  async checkConnectionStatus() {
    const estado = await this.storage.get("estado");
    if (estado) {
      this.connectionStatus = true;
    } else {
      this.connectionStatus = false;
    }
  }

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
            if (usuarioObtenido.username === user && usuarioObtenido.password === pass) {
              console.log(usuarioObtenido);
              
              // Guardar los datos del usuario en el almacenamiento
              this.storage.set("usuario", {
                username: usuarioObtenido.username,
                email: usuarioObtenido.email,
                sede: usuarioObtenido.sede,
                asignaturas: usuarioObtenido.asignaturas,
              });
              this.storage.set("estado", true);
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
    this.storage.limpiar();
  }

  isConected() {
    return this.connectionStatus;
  }
}
