import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userStorage = {
    username: '',
    email: '',
    sede: '',
  };
  constructor(private storage: StorageService) {} 
  async ionViewWillEnter() {
    const usuario = await this.storage.get("usuario");
    if (usuario) {
      this.userStorage.username = usuario.username;
      this.userStorage.email = usuario.email;
      this.userStorage.sede = usuario.sede;
    } else {
      console.error("No hay usuario en el almacenamiento");
    }
  }
  ngOnInit() {}

}
