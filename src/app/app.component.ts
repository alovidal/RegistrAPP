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
      password: string;
      email: string;
      sede: string;
    };  
    if (state) {
      this.username = state.username || '';
      this.password = state.password || '';
      this.email = state.email || '';
      this.sede = state.sede || '';
    }
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
    this.menu.close();
  }

  cerrarSesion() {
    this.menu.close();
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
