import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/service/authenticator.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  username = '';
  constructor(private router: Router, private auth:AuthenticatorService) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;
    //Console.log
    //Mensaje bienvenida
  }
  cerrarSesion() {
    // El menú se quedaba abierto
    this.router.navigate(["/home"]);
    // El estado del usuario pasa a false
    this.auth.logout();
  };

  ngOnInit() {}

};
