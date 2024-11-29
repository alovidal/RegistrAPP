import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApicontrollerService } from './../../app/service/apicontroller.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  email: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private api: ApicontrollerService
  ) {}

  private validateEmailFormat(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  // Validar y enviar correo
  async validateEmail() {
    if (!this.email) {
      this.presentAlert('Error', 'Por favor, ingresa un correo electrónico.');
    } else if (!this.validateEmailFormat(this.email)) {
      this.presentAlert('Error', 'El correo electrónico no es válido.');
    } else {
      try {
        // Llama al servicio para verificar el correo
        const response = await this.api.getEmail(this.email).toPromise();

        if (response) {
          this.presentAlert(
            'Correo Enviado',
            `Se ha enviado un correo a: ${this.email}`,
            true // Redirigir después de mostrar el mensaje
          );
        } else {
          this.presentAlert(
            'Error',
            'El correo electrónico no está registrado.'
          );
        }
      } catch (error) {
        this.presentAlert(
          'Error',
          'No se pudo enviar el correo. Intenta nuevamente más tarde.'
        );
      }
    }
  }

  async presentAlert(header: string, message: string, redirect: boolean = false) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (redirect) {
              this.navCtrl.navigateForward('home');
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
