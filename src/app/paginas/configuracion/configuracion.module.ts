import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';
import { ConfiguracionPage } from './configuracion.page';
import { HeaderModule } from '../../header/header.module'; // header

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionPageRoutingModule,
    HeaderModule // header
  ],
  declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {}
