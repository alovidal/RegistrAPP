import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticatorService } from 'src/app/service/authenticator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() contentId!: string;
  @Input() menuId!: string;

  mostrarBoton = true;
  mostrarAlerta = false;
  mostrarHeader = true;
  headerWidth: string = '100%';
  marginLeft: string = '0';

  constructor(
    private router:Router, 
    private menuCtrl:MenuController, 
    private auth:AuthenticatorService) {}

  cerrarSesion() {
    this.router.navigate(["/home"]).then(() => {
      this.menuCtrl.close();
      console.log("Cerrando sesión...");
    });
    this.auth.logout();
  };

  navigateTo(page: string) {
    this.router.navigate([page]);
    this.menuCtrl.close();
  }

  ngOnInit() {
  }
};