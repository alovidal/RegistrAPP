import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create(); // Inicializa el almacenamiento
  }
}

