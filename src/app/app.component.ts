import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storage: StorageService, private router: Router) {}

  async ngOnInit() {
    const estado = await this.storage.get("estado");
    if (estado) {
      const usuarioObtenido = await this.storage.get("usuario");
      if (usuarioObtenido) {
        let navigationExtras: NavigationExtras = {
          state: {
            usurname: usuarioObtenido.username,
            email: usuarioObtenido.email,
            password: usuarioObtenido.password,
            sede: usuarioObtenido.sede,
            asignaturas: usuarioObtenido.asignaturas,
          }
        }
        this.router.navigate(["/inicio"], navigationExtras)
      } else {
        this.router.navigate(["/home"])
      };
    } else {
      this.router.navigate(["/home"])
    };
  }
}