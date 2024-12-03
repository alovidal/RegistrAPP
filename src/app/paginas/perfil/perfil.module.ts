import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';

import { HeaderModule } from 'src/app/header/header.module';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    PerfilPageRoutingModule,
    Component,
    Storage
  ],
  declarations: [PerfilPage]
})

export class PerfilPageModule {}
