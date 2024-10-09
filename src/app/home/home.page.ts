import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthenticatorService } from '../servicios/authenticator.service';

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

  @ViewChild('animatedImage', { read: ElementRef, static: true })
  animatedImage!: ElementRef;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private auth: AuthenticatorService
  ) {}

  validarLogin() {
    this.errorMsg = ''; // Resetea el mensaje de error
    console.log('Username:', this.user.username);
    console.log('Password:', this.user.password);

    if (this.auth.login(this.user.username, this.user.password)) {
      // Crear NavigationExtras para pasar datos
      const navigationExtras: NavigationExtras = {
        state: {
          username: this.user.username,
        },
      };
      console.log('Redirigiendo a /inicio con datos de usuario...');
      this.router.navigate(['inicio'], navigationExtras);
      this.user.username = '';
      this.user.password = '';
    } else {
      if (!this.user.username) {
        this.errorMsg = 'Faltan casillas por rellenar.';
      } else if (!this.user.password) {
        this.errorMsg = 'Faltan casillas por rellenar.';
      }
      
      this.user.username = '';
      this.user.password = '';
    }

  }

  ngAfterViewInit() {
    this.playAnimation();
  }

  playAnimation() {
    const imageAnimation = this.animationCtrl
      .create()
      .addElement(this.animatedImage.nativeElement)
      .duration(3000) // Duración de la animación
      .easing('ease-in-out') // Curva de aceleración/desaceleración suave
      .fromTo('opacity', 0, 1) // Efecto de fade-in
      .fromTo('transform', 'scale(0.8) rotate(0deg)', 'scale(1) rotate(0deg)'); // Efecto de escala + rotación completa

    imageAnimation.play();
  }
}
