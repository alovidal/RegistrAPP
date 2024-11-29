import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticatorService } from 'src/app/service/authenticator.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  user = {
    username: '',
    email: '',
    sede: '',
    asignaturas: [],
  };

  userStorage = {
    username: '',
    email: '',
    sede: '',
    asignaturas: [],
  };

  constructor(
    private router: Router,
    private auth: AuthenticatorService,
    private storage: StorageService
  ) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: string,
      email: string,
      sede: string, 
      asignaturas: [],
    };
    this.user.username = state.username;
    this.user.email = state.email;
    this.user.sede = state.sede;
    this.user.asignaturas = state.asignaturas;
  }

  async ionViewWillEnter() {
    const usuario = await this.storage.get("usuario");
    if (usuario) {
      this.userStorage.username = usuario.username;
      this.userStorage.email = usuario.email;
      this.userStorage.sede = usuario.sede;
      this.userStorage.asignaturas = usuario.asignaturas;
    } else {
      console.error("No hay usuario en el almacenamiento");
    }
  }
   

  calcularAsistencia(asignatura: any): string {
    if (asignatura.clasesRegistradas && asignatura.clasesRegistradas > 0) {
      const porcentaje = (asignatura.clasesAsistidas / asignatura.clasesRegistradas) * 100;
      return `${porcentaje.toFixed(2)}%`;
    }
    return " 0%";
  }
  

  ngOnInit() {
  }
}
