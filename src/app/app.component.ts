import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/service/authenticator.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  username: string = 'Usuario'; // O la lógica que tengas para el nombre de usuario

  constructor(
    private menu: MenuController,
    private router: Router,
    private auth: AuthenticatorService // Asegúrate de que este servicio esté correctamente inyectado
  ) {}

  navigateTo(page: string) {
    this.router.navigate([page]);
    this.menu.close(); // Cierra el menú después de la navegación
  }

  cerrarSesion() {
    // Cierra el menú antes de navegar
    this.menu.close();

    // El estado del usuario pasa a false
    this.auth.logout();

    // Redirige al usuario a la página de inicio
    this.router.navigate(['/home']);
  }
}
