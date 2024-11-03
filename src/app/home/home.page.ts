import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthenticatorService } from '../service/authenticator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  user = {
    username: '',
    password: '',
  };

  errorMsg: string = '';

  @ViewChild('animatedImage', { read: ElementRef, static: true }) animatedImage!: ElementRef;

  constructor(  private animationCtrl: AnimationController,
                private auth: AuthenticatorService,
                private router: Router) {
  }

  ngAfterViewInit() {
    this.playAnimation();
  }

  playAnimation() {
    const imageAnimation = this.animationCtrl.create()
      .addElement(this.animatedImage.nativeElement)
      .duration(3000) // Duración de la animación
      .easing('ease-in-out') // Curva de aceleración/desaceleración suave
      .fromTo('opacity', 0, 1) // Efecto de fade-in
      .fromTo('transform', 'scale(0.8) rotate(0deg)', 'scale(1) rotate(0deg)'); // Efecto de escala + rotación completa

    imageAnimation.play();
  }

  validar() {
    this.auth
      .loginBDD(this.user.username, this.user.password)
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          let navigationExtras: NavigationExtras = {
            state: {
              username: this.user.username,
            },
          };
          this.router.navigate(['/inicio'], navigationExtras);
        } else {
          this.errorMsg = 'Usuario o contraseña incorrectos.';
        }
      })
      .catch((error) => {
        console.error('Error de autenticación:', error);
        this.errorMsg = 'Hubo un problema al iniciar sesión. Por favor, intenta nuevamente.';
      });
  }  
}