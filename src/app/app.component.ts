import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/service/authenticator.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  username= '';
  password = '';
  email = '';
  sede = '';

  constructor(
    private menu: MenuController,
    private router: Router,
    private auth: AuthenticatorService
  ) {

    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: string;
    };  
    if (state) {
      this.username = state.username || '';
    }
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
    this.menu.close();
  }

  cerrarSesion() {
    this.menu.close();
    console.log("Cerrando sesión...");
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
