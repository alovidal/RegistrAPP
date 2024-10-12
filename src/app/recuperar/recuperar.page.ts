import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  email: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  private validateEmailFormat(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  // Función para validar el email y mostrar la notificación
  async validateEmail() {
    if (!this.email) {
      this.presentAlert('Error', 'Por favor, ingresa un correo electrónico.');
    } else if (!this.validateEmailFormat(this.email)) {
      this.presentAlert('Error', 'El correo electrónico no es válido.');
    } else {
      this.presentAlert(
        'Correo Enviado',
        `Se enviará un correo a: ${this.email}`
      );
    }
  }

  // Función para mostrar las notificaciones
  async presentAlert(header: string, message: string, redirect: boolean = false) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (redirect) {
            // Redirigir a otra página después de aceptar
            this.navCtrl.navigateForward('home');
          }
        }
      }]
    });

    await alert.present();
  }
}