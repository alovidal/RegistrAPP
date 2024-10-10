import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthenticatorService } from '../servicios/authenticator.service';

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

  mensaje = '';

  @ViewChild('animatedImage', { read: ElementRef, static: true })
  animatedImage!: ElementRef;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private auth: AuthenticatorService
  ) {}

  validarLogin() {
      this.auth
        .loginBDD(this.user.username, this.user.password)
        .then((res) => {
          if (res && res.success) { // Suponiendo que res.success indica éxito en el login
            this.mensaje = 'Conexión exitosa';
    
            let navigationExtras: NavigationExtras = {
              state: {
                username: this.user.username,
                password: this.user.password,
              },
            };
    
            // Navegar a la página 'inicio'
            this.router.navigate(['/inicio'], navigationExtras);
          } else {
            this.mensaje = 'Error en las credenciales';
          }
        })
        .catch((error) => {
          this.mensaje = 'Error en las credenciales';
        });
    }
    
  }
}
