import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = {
    username: '',
    password: '',
  };

  errorMsg: string = '';

  constructor(private router: Router) {}

  validarLogin() {
    this.errorMsg = ''; // Resetea el mensaje de error
    console.log('Username:', this.user.username);
    console.log('Password:', this.user.password);

    if (this.user.username && this.user.password) {
      // Crear NavigationExtras para pasar datos
      const navigationExtras: NavigationExtras = {
        state: {
          username: this.user.username,
        },
      };
      console.log('Redirigiendo a /inicio con datos de usuario...');
      this.router.navigate(['inicio'], navigationExtras);
    } else {
      if (!this.user.username) {
        this.errorMsg = 'Usuario incorrecto.';
      } else if (!this.user.password) {
        this.errorMsg = 'Contraseña incorrecta.';
      }
      this.user.username = '';
      this.user.password = '';
    }
  }
}
